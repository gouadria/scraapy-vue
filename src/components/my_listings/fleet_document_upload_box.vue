<script lang="ts">
import type { PropType, Component } from 'vue'
import UploadFile from '../UIElements/UploadFile.vue'
import DatePickerInput from '../UIElements/DatePickerInput.vue'

export default {
  name: 'FleetDocumentUploadCard',
  components: { UploadFile, DatePickerInput },
  props: {
    icon: {
      type: String as PropType<Component>,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: false
    },
    file: {
      type: File as PropType<File | null>,
      required: false,
      default: null
    },
    fileError: {
      type: Boolean,
      required: false,
      default: false
    },
    fileMSG: {
      type: String,
      required: false
    },
    expiryMSG: {
      type: String,
      required: false
    },
    expiryError: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:file', 'update:expiryDate'],
  data() {
    return {
      localExpiryDate: this.expiryDate || '', // Initialize with the existing expiry date
      localFile: this.file || null // Initialize with the existing file
    }
  },
  watch: {
    localExpiryDate(newDate: string) {
      this.$emit('update:expiryDate', newDate) // Emit the updated expiry date
    },
    localFile(newFile: File | null) {
      this.$emit('update:file', newFile) // Emit the updated file
    }
  },
  methods: {
    // Method to handle file upload
    uploadPDF(file: File) {
      this.localFile = file // Update the local file
    }
  }
}
</script>

<template>
  <div
    class="container fleet_document_upload_container"
    :class="[fileError ? 'hasError' : '', expiryError ? 'hasError' : '']"
  >
    <h1>{{ title }}*</h1>
    <!-- Pass the existing file to UploadFile -->
    <!-- <UploadFile :type="['.pdf']" @file="uploadPDF($event)" :existingFile="localFile" showFileInfo /> -->
    <UploadFile :type="['.pdf']" @file="uploadPDF($event)" :existingFile="localFile" showFileInfo />
    <div class="expiry_box">
      <h2>{{ $t('listings.ExpiryDate') }}</h2>
      <DatePickerInput v-model="localExpiryDate" />
    </div>
    <span class="errMSG" v-if="expiryError"> {{ expiryMSG }} </span>
    <span class="errMSG" v-else-if="fileError">{{ fileMSG }}</span>
  </div>
</template>

<style scoped>
.container {
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
}

.fleet_document_upload_container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 16px;
  justify-items: flex-start;
}

.fleet_document_upload_container h1 {
  color: var(--Dark-950, #121212);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.upload_container {
  padding: 8px 24px;
  text-align: center;
}

.upload_container p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.upload_container span {
  color: var(--Secondary---500, #15b377);
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
}

.expiry_box {
  display: flex;
  gap: 12px;
  align-items: center;
}

.expiry_box h2 {
  color: var(--Dark-700, #4f4f4f);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
}

.date_picker {
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
}

.date_picker p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

@media (max-width: 956px) {
  .expiry_box h2 {
    white-space: unset;
  }
  .expiry_box .date_picker {
    max-width: 70%;
  }
}

@media (max-width: 400px) {
  .expiry_box {
    flex-direction: column;
    align-items: flex-start;
  }
  .expiry_box .date_picker {
    max-width: unset;
  }
}
.hasError {
  border: 1px solid #ff6b6b;
}
.errMSG,
.hasError span {
  color: red;
}
</style>
