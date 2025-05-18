<template>
  <div class="doc_view">
    <div class="doc_container">
      <div class="pdf-controls" v-if="data?.file"></div>
      <vue-pdf-app :config="config"  :pdf="pdfUrl" class="pdfAPP" />
    </div>
  </div>
</template>

<script lang="ts">
import VuePdfApp from 'vue3-pdf-app'
import 'vue3-pdf-app/dist/icons/main.css'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

export default defineComponent({
  components: {
    VuePdfApp
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: false
    }
  },
  setup() {
    const store = useStore()
    const { t } = useI18n()

    return {
      store,
      t
    }
  },
  data() {
    return {
      pdfUrl: this.data,
      // pdfUrl: null as string | null,
      isDownloading: false
    }
  },
  watch: {
    'data.file': {
      handler: 'loadPdf',
      immediate: true
    }
  },
  methods: {
    async loadPdf() {
      try {
        if (this.data?.file) {
          const fullUrl = `${import.meta.env.VITE_API_URL}${this.data.file}`
          await this.store.dispatch('fetchPdfBlob', {
            fileUrl: fullUrl,
            download: false
          })
          this.pdfUrl = this.store.getters.getCurrentPdfUrl
        }
      } catch (error) {
        console.log('Error loading PDF', error)
      }
    },
    async downloadPdf() {
      try {
        if (!this.data?.file) {
          toast.error('This is an error toast!', {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }

        this.isDownloading = true
        const fullUrl = `${import.meta.env.VITE_API_URL}${this.data.file}`
        await this.store.dispatch('fetchPdfBlob', {
          fileUrl: fullUrl,
          download: true,
          fileName: `${this.data.title || 'document'}.pdf`
        })
      } catch (error) {
        console.error('Download failed:', error)
      } finally {
        this.isDownloading = false
      }
    }
  },
  mounted() {
    this.loadPdf()
    console.log('PDF URL:', this.pdfUrl)
  },
  beforeUnmount() {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl)
    }
  }
})
</script>

<style scoped>
.doc_view {
  position: relative;
  height: 100%;
}

.pdf-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}

.download-btn {
  background-color: #4a5568;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.download-btn:hover {
  background-color: #2d3748;
}

.download-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.doc_container {
  position: relative;
}
</style>
<style scoped>
.doc_container {
  margin: 0 auto;
  box-shadow: 0px 2px 14.5px 4px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  height: 100%;
}

.pdfAPP {
  width: 100%;
  height: 100%;
  background-color: #fff !important;
}

</style>
<style>
.pdfAPP .page{
  border-image: none !important;
}
</style>