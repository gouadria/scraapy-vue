<template>
  <ModalPopup :show="show" @close="emitClose" class="addbatch">
    <template v-slot:title>
      <div class="title">
        {{ $t('listings.addListing') }}
        <div class="subtitle">
          {{ stepTitles[step] || '' }}
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="content" v-if="step === 0">
        <div class="field">

          <!-- TODO: Add default value to dropdwon when unselected -->
          <label for="product-type">{{ $t('listings.category') }}</label>
          <select id="product-type" v-model="categoryGroupSelection" required>
            <option
              v-for="categoryGroup in categoryGroups"
              :key="categoryGroup.id"
              :value="categoryGroup.id"
            >
              {{ language === 'en' ? categoryGroup.name : categoryGroup.name_ar }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="product-type">{{ $t('listings.subCategory') }}</label>
          <select id="product-type" v-model="subCategorySelection" required>
            <option v-for="category in subCategories" :key="category.id" :value="category.id">
              {{ language === 'en' ? category.name : category.name_ar }}
            </option>
          </select>
        </div>
        <button class="next" @click="nextStep">{{ $t('auth.Next') }}</button>
      </div>
      <div class="content" v-if="step === 1">
        <div class="item-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-title">
              {{ $t('listings.downloadTemplate', { categoryName: selectedCategory?.name }) }}
            </div>
            <button class="download" @click="downloadTemplate">
              <img src="@/assets/svg-icons/download.svg?url" alt="download"/>
              {{ $t('listings.downloadTemplateButton') }}
            </button>
          </div>
        </div>
        <div class="divider"></div>
        <div class="item-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-title">{{ $t('listings.fillCvsFields') }}</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="item-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-title">{{ $t('listings.uploadCsv') }}</div>
            <UploadFile :type="['.csv']" @file="parseCSV($event)" showFileInfo>
              <div class="preview">
                <img src="@/assets/svg-icons/cloud.svg?url" alt="cloud" />
              </div>
            </UploadFile>
          </div>
        </div>
        <div class="divider"></div>
        <button
          class="next"
          :class="{ disabled: !uploadItems || uploadItems.length === 0 }"
          @click="nextStep"
        >
          {{ $t('auth.Next') }}
        </button>
      </div>
      <div class="content loader" v-if="step === 2">
        <img src="@/assets/svg-icons/loading.svg?url" alt="loading"/>
        <div>{{ $t('listings.processingFile') }}</div>
        <div class="retry" @click="postItems(uploadItems)">{{ $t('listings.retry') }}</div>
      </div>
    </template>
  </ModalPopup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import UploadFile from '@/components/UIElements/UploadFile.vue'
import type { CategoryGroup } from '@/models/Category'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

interface ExtraField {
  name: string
  value: string
}

interface UploadItem {
  name: string
  price: number
  extra_fields: ExtraField[]
}

export default defineComponent({
  components: {
    ModalPopup,
    UploadFile
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    categoryGroups: {
      type: Array as () => CategoryGroup[],
      required: true
    },
    isServiceListing: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup() {
    const { t } = useI18n() // Use the i18n composable to get translations

    // Make step titles reactive to language changes
    const stepTitles = computed(() => [
      t('listings.chooseProductType'),
      t('listings.downloadTemplate'),
      t('listings.processingFile')
    ])

    return {
      stepTitles
    }
  },
  data() {
    return {
      step: 0,
      categoryGroupSelection: '',
      subCategorySelection: '',
      uploadItems: [] as UploadItem[],
    }
  },
  watch: {
    show(newVal) {
      if (!newVal) {
        this.step = 0
        this.categoryGroupSelection = ''
        this.subCategorySelection = ''
      }
    }
  },
  computed: {
    subCategories() {
      if (!this.categoryGroupSelection) return []
      const categoryGroup = this.categoryGroups.find(
        (group) => group.id === this.categoryGroupSelection
      )
      return categoryGroup?.categories || []
    },
    selectedCategory() {
      if (!this.subCategorySelection) return null
      return this.subCategories.find((category) => category.id === this.subCategorySelection)
    },
    language() {
      return this.$i18n.locale === 'en' ? 'en' : 'ar'
    }
  },
  methods: {
    generateCSV() {
      const headers = ['name', 'price', 'description', 'quantity']
      headers.push(this.selectedCategory?.extra_field_types.map((field) => field.name))
      let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',')
      if (csvContent[csvContent.length - 1] === ',') {
        csvContent = csvContent.slice(0, -1)
      }
      csvContent += '\n'
      const encodedUri = encodeURI(csvContent)
      return encodedUri
    },
    downloadTemplate() {
      const link = document.createElement('a')
      link.href = this.generateCSV()
      link.download = this.selectedCategory?.name + ' template.csv'
      link.click()
    },
    parseCSV(file: File | null) {
      if (!file) {
        console.error('No file provided or file is null.')
        this.uploadItems = []
        return
      }

      if (file.type !== 'text/csv') {
        console.error('Invalid file type. Please upload a CSV file.')
        this.uploadItems = [] // Clear the upload items for invalid file types
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const fileContent = e.target?.result as string
        if (!fileContent) {
          console.error('File is empty.')
          this.uploadItems = [] // Clear the upload items for empty files
          return
        }

        const lines = fileContent.split('\n').slice(1, -1)
        const items = lines.map((line) => {
          const [name, price, description, ...extraFields] = line.split(',')
          return {
            name,
            price,
            description,
            category: this.selectedCategory?.id,
            extra_fields: extraFields.map((field, index) => ({
              name: this.selectedCategory?.extra_field_types[index].name,
              value: field
            }))
          } as UploadItem
        })

        this.uploadItems = items
      }

      reader.onerror = (error) => {
        console.error('Error reading file:', error)
        this.uploadItems = [] // Clear the upload items on error
      }

      reader.readAsText(file)
    },
    async postItems(items: UploadItem[]) {
      await this.$axios
        .post('/api/inventory/user/items/', items)
        .then(() => {
          this.categoryGroupSelection = ''
          this.subCategorySelection = ''
          this.uploadItems = []
          this.$emit('success')
        })
        .catch((error) => {
          console.log('error test', error)
          console.error('Failed to post items')
        })
    },
    nextStep() {
      if (this.step === 0 && !this.subCategorySelection) {
        // alert('Please select a product type')
        toast.info(this.$t('errorsMsgs.selectProductType'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
        return
      }
      if (this.step === 1) {
        if (!this.uploadItems || this.uploadItems.length === 0) {
          toast.info(this.$t('errorsMsgs.uploadFile'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 2000
          })
          return
        }
        this.postItems(this.uploadItems)
      }
      if (this.step < 2) {
        this.step++
      }
    },
    emitClose() {
      this.$emit('close')
    }
  }
})
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: 500;
}

.subtitle {
  font-size: 14px;
  font-weight: 400;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-size: 14px;
}

.field select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: none;
  min-width: 200px;
  width: fit-content;
}

.next {
  padding: 0.5rem 3rem;
  background-color: #15b377;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  width: fit-content;
}

.item-step {
  display: flex;
  gap: 1rem;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #15b377;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.step-title {
  font-size: 14px;
}

.download {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: white;
  outline: #e7e7e7 solid 1px;
  color: #4f4f4f;
  cursor: pointer;
}

.preview {
  padding: 0.625rem;
  border: 1px solid #d9d9d9;
  display: flex;
  border-radius: 8px;
}

.divider {
  height: 2px;
  background-color: #e7e7e7;
  width: 100%;
}

.loader {
  align-items: center;
  gap: 1rem;
}

.loader img {
  width: 50px;
  height: 50px;
  animation: spin 5s linear infinite;
}
.retry {
  cursor: pointer;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader div {
  font-size: 16px;
  color: #15b377;
}
</style>
<style>
.addbatch .modal {
  max-width: 30%;
  width: 100%;
}
</style>
