<template>
  <div class="additional_documents">
    <div class="header">
      <div class="back" @click="backButton">
        <img src="@/assets/svg-icons/chevron-left.svg?url" alt="image"/>
        {{ $t('listings.back') }}
      </div>
      <div class="text">
        <div class="page_title">
          <h1>{{ $t('legalInformation.AdditionalDocuments') }}</h1>
          <p>{{ $t('legalInformation.AdditionalDocumentsText') }}</p>
        </div>
        <MainBtn @click="toggelAddDocuments" type="blue">
          {{ $t('legalInformation.AddDocument') }}
        </MainBtn>
      </div>
    </div>
    <div class="divider"></div>

    <div class="documents_list">
      <EasyDataTable
        :headers="headers"
        :items="additionalDocuments"
        no-hover
        :hide-footer="true"
        table-class-name="customize-table"
      >
        <template #empty-message>
          <a>nothing here</a>
        </template>
        <template #item-File="{ File }">
          <a Download :href="File.file">{{ File.name }}</a>
        </template>
      </EasyDataTable>
    </div>
    <ModalComponent
      :modal-active="openAdditionalDocuments"
      :closeActive="true"
      @close="toggelAddDocuments"
      class="add_additional_documents"
    >
      <div class="information">
        <h2>{{ $t('legalInformation.add_additional_documents') }}</h2>
        <p>{{ $t('legalInformation.add_additional_documentsText') }}</p>
      </div>
      <div class="divider"></div>
      <div class="input">
        <inputField
          :label="$t('legalInformation.DocumentName')"
          :placeholder="$t('legalInformation.DocumentNamePlaceHolder')"
          :value="documentName"
          @update="documentName = $event"
          required
        />
      </div>
      <div class="file_uploader">
        <label>{{ $t('legalInformation.UploadDocument') }}</label>
        <UploadFile :type="['.pdf']" @file="uploadVatPDF" showFileInfo />
      </div>
      <div class="divider"></div>
      <div class="action">
        <MainBtn @click="ValidateDocuments" type="green">
          {{ $t('legalInformation.Validate') }}
        </MainBtn>
      </div>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import type { PropType } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import inputField from '@/components/UIElements/inputField.vue'
import ModalComponent from '@/components/UIElements/ModalComponent.vue'
import UploadFile from '@/components/UIElements/UploadFile.vue'
import plusIcon from '@/assets/svg-icons/listings/plus_add.svg'
import { useVuelidate } from '@vuelidate/core'
import type { BusinessLegalDetails } from '@/models/businessLegalDetails'

export default defineComponent({
  name: 'AdditionalDocuments',
  components: {
    MainBtn,
    inputField,
    ModalComponent,
    UploadFile
  },
  props: {
    backButton: {
      type: Function as PropType<() => void>,
      required: true
    },
    documents: {
      type: Object as PropType<BusinessLegalDetails>,
      required: true
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      additionalDocuments: [
        {
          DateUploaded: '2026-01-01',
          DocumentName: 'Example Document',
          File: {
            name: 'Baladiya approval.pdf',
            file: 'link to file'
          }
        },
        {
          DateUploaded: '2025-01-01',
          DocumentName: 'Example Document',
          File: {
            name: 'Baladiya approval.pdf',
            file: 'link to file'
          }
        }
      ] as BusinessLegalDetails[],
      openAdditionalDocuments: false,
      documentName: '',
      plusIcon: shallowRef(plusIcon),
      headers: [
        { text: 'Date Uploaded', value: 'DateUploaded', sortable: true },
        { text: 'Document Name', value: 'DocumentName' },
        { text: 'Download Document', value: 'File' }
      ]
    }
  },
  methods: {
    ValidateDocuments() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        console.log(this.v$.$errors)
        return
      }
      this.toggelAddDocuments()
    },
    toggelAddDocuments() {
      this.openAdditionalDocuments = !this.openAdditionalDocuments
      if (!this.openAdditionalDocuments) {
        this.documentName = ''
      }
    },
    uploadVatPDF(file: any) {
      console.log('Uploaded file:', file)
    }
  },
  mounted() {
    console.log(this.documents)
  }
})
</script>

<style scoped>
.additional_documents {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-direction: column;
  padding-bottom: 20px;
}
.header .text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.text h1 {
  color: #121212;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}
.box_title {
  color: #121212;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.text p {
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.back {
  cursor: pointer;
}
.documents_list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
}
.customize-table {
  --easy-table-border: 1px solid #e7e7e7;
  --easy-table-row-border: 1px solid #dee2e6;
  --easy-table-header-background-color: #f6f6f6;
  --easy-table-header-font-color: #4f4f4f;
  --easy-table-header-height: 50px;
  --easy-table-body-row-height: 70px;
  --easy-table-body-row-font-size: 14px;
  --easy-table-header-font-size: 14px;
  --easy-table-header-font-weight: 700;
  --easy-table-body-row-font-color: #4f4f4f;
  --easy-table-body-row-font-weight: 700;
  --easy-table-body-row-background-color: #fff;
  --easy-table-body-row-hover-background-color: #f5f5f5;
  border-radius: 12px;
  --easy-table-footer-height: 50px;
  --easy-table-border-radius: 12px;
}

.customize-table a {
  color: #15b377;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
}
</style>
<style>
.vue3-easy-data-table__main {
  min-height: unset !important;
}
.vue3-easy-data-table__footer {
}
/* .vue3-easy-data-table {
  border-radius: 12px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
} */
</style>
