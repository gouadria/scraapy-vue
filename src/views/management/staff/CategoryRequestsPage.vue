<template>
  <div class="product_requests" v-auto-animate>
    <RejectReason :show="!!rejectItem" @submit="handleRejectItem" @close="closeRejectModal" />

    <div class="header">
      <div class="title">
        {{ categories.length || $t('management.no') }} {{ $t('management.pendingRequests') }}
      </div>
      <div class="title-actions">
        <MainBtn v-if="items !== null" type="cancel" @click="clearItems">
          {{ $t('management.back') }}
        </MainBtn>
      </div>
    </div>

    <!-- Category Inputs when a category is selected -->
    <div v-if="items !== null" class="items">
      <div class="request">
        <div class="row">
          <inputField
            :label="$t('listings.categoryEn')"
            type="text"
            :placeholder="$t('listings.enterCategoryEn')"
            :value="items[0]?.category_group?.name"
            @update="(value) => updateField('category_group.name', value)"
            :error="v$.selectedItem.category_group.name.$errors[0]?.$message"
            required
          />
          <inputField
            :label="$t('listings.categoryAr')"
            type="text"
            :placeholder="$t('listings.enterCategoryAr')"
            :value="items[0]?.category_group?.name_ar"
            @update="(value) => updateField('category_group.name_ar', value)"
            :error="v$.selectedItem.category_group?.name_ar?.$errors[0]?.$message"
            required
          />
        </div>
        <div class="row">
          <inputField
            :label="$t('listings.subCategoryEn')"
            type="text"
            :placeholder="$t('listings.enterSubCategoryEn')"
            :value="items[0]?.name"
            @update="(value) => updateField('name', value)"
            :error="v$.selectedItem.name?.$errors[0]?.$message"
            required
          />
          <inputField
            :label="$t('listings.subCategoryAr')"
            type="text"
            :placeholder="$t('listings.enterSubCategoryAr')"
            :value="items[0]?.name_ar"
            @update="(value) => updateField('name_ar', value)"
            :error="v$.selectedItem.name_ar?.$errors[0]?.$message"
            required
          />
        </div>
        <div class="row">
          <inputField
            :label="$t('management.enterUnitPriceEn')"
            type="text"
            :placeholder="$t('management.enterUnitPriceEn')"
            :value="items[0]?.price_unit"
            @update="(value) => updateField('price_unit', value)"
            :error="v$.selectedItem.price_unit?.$errors[0]?.$message"
            required
          />
          <inputField
            :label="$t('management.enterUnitPriceAr')"
            type="text"
            :placeholder="$t('management.enterUnitPriceAr')"
            :value="items[0]?.price_unit_ar"
            @update="(value) => updateField('price_unit_ar', value)"
            :error="v$.selectedItem.price_unit_ar?.$errors[0]?.$message"
            required
          />
        </div>

        <div class="request-actions">
          <MainBtn type="green" @click="handleApproveRequest">
            {{ $t('itemCard.Approve') }}
          </MainBtn>
          <MainBtn type="cancel" @click="rejectItem = items[0]">
            {{ $t('itemCard.Reject') }}
          </MainBtn>
        </div>
      </div>
    </div>

    <!-- Categories List (Shown when no category is selected) -->
    <div v-else class="categories">
      <div v-if="!categories.length" class="no-items">
        {{ $t('management.noPendingRequests') }}
      </div>
      <div
        v-for="category in categories"
        :key="category.category_group.id"
        class="item"
        @click="openCategory(category)"
      >
        <div class="icon">
          <img
            v-if="!category.category_group.icon"
            src="@/assets/svg-icons/vendor-placeholder.svg?url"
            alt="icon"
          />
          <img v-else :src="category.category_group.icon" alt="icon" />
        </div>
        <div class="content">
          <div class="name">
            {{
              $i18n.locale === 'ar' ? category.category_group.name_ar : category.category_group.name
            }}
          </div>
          <div class="details">
            {{ $t('management.RequestCategories') }}
          </div>
        </div>
        <div class="actions">
          <img src="@/assets/svg-icons/chevron-right.svg?url" alt="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import RejectReason from '@/components/modals/RejectReason.vue'
import { toast } from 'vue3-toastify'
import inputField from '@/components/UIElements/inputField.vue'

interface Category {
  id: number
  name: string
  name_ar: string
  category_group: string
  icon: string | null
  status: string
  group_type: string
}

interface CategoryItem {
  category_group: Category
  id: number
  name: string
  name_ar: string
  price_unit: string
  price_unit_ar: string
  status: string
  sub_item_type: string
}

export default defineComponent({
  name: 'PendingRequests',
  components: { RejectReason, MainBtn, inputField },
  data() {
    return {
      categories: [] as CategoryItem[],
      items: null as CategoryItem[] | null,
      rejectItem: null as CategoryItem | null
    }
  },
  computed: {
    // Return the selected item (first in the array) or an empty object.
    selectedItem(): CategoryItem | {} {
      return this.items && this.items.length ? this.items[0] : {}
    }
  },
  validations() {
    return {
      selectedItem: {
        category_group: {
          name: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          name_ar: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
        },
        name: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        name_ar: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        price_unit: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        price_unit_ar: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        }
      }
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  methods: {
    async fetchApi() {
      const type = this.$route.params.subPage
      try {
        const { data } = await this.$axios.get('/api/inventory/staff/category/pending/')
        this.categories = data.message || []
        console.log('data', data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        this.categories = []
      }
    },
    openCategory(category: CategoryItem) {
      this.items = [category]
      this.v$.$reset() // Reset validation state when opening a new category
    },
    updateField(field: string, value: string) {
      if (this.items && this.items[0]) {
        const fields = field.split('.')
        if (fields.length === 1) {
          this.items[0][fields[0]] = value
        } else if (fields.length === 2) {
          this.items[0][fields[0]][fields[1]] = value
        }
        // Validate the field after update
        this.v$.$touch()
      }
    },
    async handleApproveRequest() {
      this.v$.$touch() // Mark all fields as touched to trigger validation
      if (this.v$.$invalid) {
        console.log(this.v$.$errors)
        toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
        return
      }
      if (!this.items || !this.items[0]) return
      try {
        const response = await this.$axios.post(
          `/api/inventory/staff/category/approve/${this.items[0].id}/`,
          { ...this.items[0] }
        )
        if (response.status === 200) {
          toast.success(this.$t('management.categoryApproved'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 2000
          })
          this.removeItem(this.items[0].id)
        } else {
          toast.error(this.$t('management.approveError'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 2000
          })
        }
      } catch (error) {
        console.error('Error approving item:', error)
        toast.error(this.$t('management.approveError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      } finally {
        this.items = null
      }
    },
    async handleRejectItem(reason: string) {
      if (!this.rejectItem) return
      try {
        await this.$axios.post(`/api/inventory/staff/category/reject/${this.rejectItem.id}/`, {
          staff_note: reason
        })
        toast.success(this.$t('management.categoryRejected'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
        this.removeItem(this.rejectItem.id)
      } catch (error) {
        console.error('Error rejecting item:', error)
        toast.error(this.$t('management.toastRejectError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      } finally {
        this.rejectItem = null
      }
    },
    removeItem(id: number) {
      this.items = this.items?.filter((item) => item.id !== id) || null
      toast.success(this.$t('management.toastRemoveSuccess'), {
        position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
        autoClose: 2000
      })
      if (this.items?.length === 0) {
        this.clearItems()
      }
    },
    clearItems() {
      this.items = null
      this.fetchApi()
    },
    closeRejectModal() {
      this.rejectItem = null
    }
  },
  mounted() {
    this.fetchApi()
  }
})
</script>

<style scoped>
.product_requests {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: 500;
}
.item {
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
}

.icon {
  width: 100px;
  height: 64px;
  border-radius: 8px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.content {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  font-size: 18px;
}

.content .name {
  font-weight: 600;
  line-height: 28px;
}

.content .details {
  font-weight: 500;
  color: #15b377;
}
.row {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  width: 100%;
}
.input-item {
  width: 100%;
}
.items {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.request {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
}
.request-actions {
  display: flex;
  width: 230px;
  height: 61px;
  align-items: center;
  gap: 10px;
}
</style>
