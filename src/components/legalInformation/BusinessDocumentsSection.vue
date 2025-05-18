<template>
  <div class="Business_box">
    <div class="box_title">
      <BusinessDocumentsIcon />
      {{ $t('legalInformation.BusinessDocuments') }}
    </div>
    <div class="input_group">
      <inputField
        :label="$t('legalInformation.CommercialRegistration')"
        :placeholder="$t('legalInformation.enterCommercialRegistration')"
        :error="v$.LegalInformation?.cr_number?.$errors[0]?.$message"
        :value="LegalInformation.cr_number"
        @update="LegalInformation.cr_number = $event"
        required
      />

      <inputField
        :label="$t('legalInformation.ValueAddedTax')"
        :placeholder="$t('legalInformation.PleaseValueAddedTax')"
        :error="v$.LegalInformation?.vat_number?.$errors[0]?.$message"
        :value="LegalInformation.vat_number"
        @update="LegalInformation.vat_number = $event"
        required
      />
    </div>
    <div class="divider"></div>
    <div class="upload_documents">
      <div class="box_title">
        <uploadIcon />
        {{ $t('legalInformation.uploadeDocuments') }}
      </div>

      <div class="input_group">
        <!-- CR Document Upload -->
        <div class="file_uploader">
          <label>{{ $t('legalInformation.cr_File') }}</label>
          <UploadFile
            :type="['.pdf']"
            @file="uploadCrPDF($event)"
            v-if="!LegalInformation.cr_document"
            showFileInfo
          />
          <div class="file" v-else>
            <div class="icon_title">
              <uplodedIcon />
              <p>{{ $t('legalInformation.cr_File') }}</p>
            </div>
            <div
              @click.prevent="removeCrPDF(LegalInformation.cr_document)"
              class="remove"
              v-if="isCrDocumentAFile"
            >
              <trashIcon />
            </div>
          </div>
        </div>

        <!-- VAT Document Upload -->
        <div class="file_uploader">
          <label>{{ $t('legalInformation.Vat_File') }}</label>
          <UploadFile
            :type="['.pdf']"
            @file="uploadVatPDF($event)"
            v-if="!LegalInformation.vat_document"
            showFileInfo
          />
          <div class="file" v-else>
            <div class="icon_title">
              <uplodedIcon />
              <p>{{ $t('legalInformation.Vat_File') }}</p>
            </div>
            <div
              @click.prevent="removeVatPDF(LegalInformation.vat_document)"
              class="remove"
              v-if="isVatDocumentAFile"
            >
              <trashIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import inputField from '../UIElements/inputField.vue'
import UploadFile from '../UIElements/UploadFile.vue'
import BusinessDocumentsIcon from '@/assets/svg-icons/listings/BusinessDocumentsIcon.vue'
import uploadIcon from '@/assets/svg-icons/uploadIcon.vue'
import uplodedIcon from '@/assets/svg-icons/uplodedIcon.vue'
import trashIcon from '@/assets/svg-icons/trashIcon.vue'
import type { BusinessLegalDetails } from '@/models/businessLegalDetails'

export default defineComponent({
  name: 'BusinessDocumentsSection',
  components: {
    inputField,
    UploadFile,
    BusinessDocumentsIcon,
    uploadIcon,
    uplodedIcon,
    trashIcon
  },
  props: {
    LegalInformation: {
      type: Object as PropType<BusinessLegalDetails>,
      required: true
    },
    v$: {
      type: Object,
      required: true
    }
  },
  computed: {
    isCrDocumentAFile(): boolean {
      return this.LegalInformation.cr_document instanceof File
    },
    isVatDocumentAFile(): boolean {
      return this.LegalInformation.vat_document instanceof File
    }
  },
  methods: {
    uploadCrPDF(file: File) {
      this.$emit('upload-cr', file)
    },
    uploadVatPDF(file: File) {
      this.$emit('upload-vat', file)
    },
    removeCrPDF(file: File | null | string) {
      this.$emit('remove-cr', file)
    },
    removeVatPDF(file: File | null | string) {
      this.$emit('remove-vat', file)
    }
  },
})
</script>

<style scoped>
.Business_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}
.Business_box .box_title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.input_group {
  width: 100%;
  display: flex;
  gap: 20px;
}
.input_group .input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.input_group .input label {
  color: #454545;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.upload_documents {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.input-item {
  width: 100%;
}
.upload_documents .file_uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.file_uploader .file {
  display: flex;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #f2f4f7;
}
.file_uploader .file .icon_title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.file_uploader .file .remove {
  cursor: pointer;
  padding: 4px;
}
</style>
