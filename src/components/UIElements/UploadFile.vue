<template>
  <div class="upload-container">
    <div
      class="upload"
      @drop.prevent="handleDrop"
      @dragover.prevent="highlightDiv = true"
      @dragleave.prevent="highlightDiv = false"
      :class="{ highlight: highlightDiv }"
      :style="{ backgroundColor }"
    >
      <slot></slot>
      <div class="title">
        <div class="click-here" @click="openFilePicker">
          {{ $t('settings.clickToUpload') }}
        </div>
        &nbsp; {{ $t('settings.orDragDrop') }}
      </div>
      <div class="sub">
        {{ fileTypesString }}
      </div>
    </div>
    <div class="file-info" v-if="(file || existingFile) && showFileInfo">
      <img src="@/assets/svg-icons/csv-file.svg?url" />
      <div class="details">
        <div class="name">{{ (file || existingFile)?.name }}</div>
        <div class="size">{{ humanFileSize((file || existingFile)?.size) }}</div>
      </div>
      <button @click="removeFile">
        <img src="@/assets/svg-icons/close.svg?url" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UploadFile',
  props: {
    type: {
      type: Array as () => string[],
      required: false
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'white'
    },
    showFileInfo: {
      type: Boolean,
      required: false,
      default: false
    },
    existingFile: {
      type: File as () => File | null,
      default: null
    }
  },
  data() {
    return {
      file: null as File | null,
      highlightDiv: false
    }
  },
  watch: {
    file() {
      this.$emit('file', this.file)
    },
    existingFile(newFile: File | null) {
      // Update the file data property when the existingFile prop changes
      this.file = newFile
    }
  },
  computed: {
    fileTypesString() {
      if (!this.type || this.type.length === 0) {
        return 'Any'
      }
      return this.type?.join(', ') + ' file format (max. 20MB)'
    }
  },
  methods: {
    handleDrop(e: DragEvent) {
      const file = e.dataTransfer?.files?.[0]
      if (file) {
        this.file = file
      }
      this.highlightDiv = false
    },
    uploadFile(e: Event) {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (file) {
        this.file = file
      }
    },
    openFilePicker() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = this.type?.join(',') || '*'
      input.onchange = (e) => {
        this.uploadFile(e)
      }
      input.click()
    },
    humanFileSize(bytes: number) {
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i]
    },
    removeFile() {
      this.file = null
      this.$emit('file', null)
      console.log('File removed.')
    }
  },
  created() {
    // Initialize the file with the existingFile prop
    this.file = this.existingFile
  }
})
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid #e7e7e7;
  border-radius: 12px;
  padding: 1rem;
  box-sizing: border-box;
}

.highlight {
  border-color: #15b377;
}

.title {
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.click-here {
  color: #15b377;
  cursor: pointer;
}

.sub {
  font-size: 12px;
  color: #4f4f4f;
  text-align: center;
}

.file-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 1rem;
}

.details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

button {
  display: flex;
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
