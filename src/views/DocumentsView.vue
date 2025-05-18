<template>
  <div class="documents_view">
    <SideList
      v-show="showList"
      :options="documentTypes"
      :buttonText="$t('documentMS.create')"
      :listData="documents"
      :selectedOption="selectedDocumentType"
      @option-selected="handleOptionSelected"
      @search="handleSearch"
      @select-doc="selectDocument"
      @filter-change="handleFilterChange"
      buttonClass="add_new"
      @handleLoadMoreDocuments="handleLoadMoreDocuments"
      :loading="loading"
    >
    </SideList>

    <!-- Document Viewer Section  -->
    <Transition name="fade" mode="out-in">
      <div class="document_viewer" v-show="showViewer" v-if="documents && documents.length > 0">
        <DocumentViewer
          v-if="selectedDocument"
          :selectedDocument="selectedDocument"
          @goBackToList="goBackToList"
        />
        <noDataBox
          v-else
          class="no_data_box"
          :title="$t('documentMS.selectDocument')"
          :icon="FileIcon"
        />
      </div>
      <noDataBox
        v-else
        class="no_data_box"
        :title="$t('documentMS.nodocuments')"
        :icon="FileIcon"
      />
    </Transition>

    <ErrorModal :closeModal="errorModalActive" :message="errorMessage" @close="toggleModalError" />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import type { Invoice } from '@/models/invoice'
import SideList from '@/components/Documents/SideList.vue'
import FileIcon from '@/assets/documents_svg/FileIcon.vue'
import { useIsMobile } from '@/composables/useIsMobile'
import noDataBox from '@/components/UIElements/no_data_box.vue'
import ErrorModal from '@/components/UIElements/ErrorModal.vue'
import type { order } from '@/models/order'
import { toast } from 'vue3-toastify'

interface Option {
  value: string
  label: string
}

export default defineComponent({
  name: 'DocumentsView',
  components: {
    DocumentViewer: defineAsyncComponent(() => import('@/components/Documents/DocumentViewer.vue')),
    noDataBox,
    ErrorModal,
    SideList
  },
  data() {
    return {
      documents: [] as Invoice[],
      selectedDocument: null as Invoice | null,
      selectedDocumentType: null as Option | null,
      store: useStore(),
      isMobile: useIsMobile(),
      FileIcon: shallowRef(FileIcon),
      errorModalActive: false,
      errorMessage: '',
      page: 1,
      pagesCount: 1,
      itemsPerPage: 10,
      isLoading: false,
      error: null as string | null,
      hasMoreItems: false,
      documentTypes: [
        { value: '', label: this.$t('Filter.all') },
        { value: 'json', label: this.$t('Filter.certificates') },
        { value: 'file', label: this.$t('Filter.documents') },
        { value: 'markdown', label: this.$t('Filter.markdown') }
      ],
      loading: false,
      fetchTimeout: null as any | null,
      searchQuery: '' as string,
      currentFilters: {
        start_date: '' as string,
        end_date: '' as string
      }
    }
  },
  computed: {
    showList() {
      return this.isMobile || !this.selectedDocument
    },
    showViewer() {
      return !this.isMobile || this.selectedDocument
    }
  },
  methods: {
    toggleModalError() {
      this.errorModalActive = !this.errorModalActive
    },

    handleOptionSelected(option: Option) {
      this.selectedDocumentType = option
    },

    selectDocument(doc: Invoice) {
      this.selectedDocument = doc
    },

    goBackToList() {
      this.selectedDocument = null
      console.log('Go back to list')
    },
    handleSearch(searchQuery: string) {
      this.searchQuery = searchQuery
      this.page = 1
      this.fetchDocumentsWithDebounce(
        this.selectedDocumentType?.value || '',
        searchQuery,
        this.currentFilters.start_date,
        this.currentFilters.end_date
      )
      console.log('Search query:', searchQuery)
    },

    handleFilterChange(filters: any) {
      this.currentFilters.start_date = filters.start_date || ''
      this.currentFilters.end_date = filters.end_date || ''
      this.page = 1
      this.fetchDocumentsWithDebounce(
        this.selectedDocumentType?.value || '',
        this.searchQuery,
        this.currentFilters.start_date,
        this.currentFilters.end_date
      )
      console.log('Filters:', filters)
    },

    // Throttle/debounce search to prevent excessive API calls
    fetchDocumentsWithDebounce: function (
      docType: string,
      searchQuery: string = '',
      start_date: string = '',
      end_date: string = ''
    ) {
      if (this.fetchTimeout) {
        clearTimeout(this.fetchTimeout)
      }

      this.fetchTimeout = setTimeout(() => {
        this.fetchDocuments(docType, searchQuery, start_date, end_date)
      }, 300)
    },

    async fetchDocuments(
      selectedType: string,
      searchQuery: string = '',
      start_date: string = '',
      end_date: string = ''
    ) {
      if (this.isLoading) return

      this.loading = true
      this.isLoading = true
      this.error = null

      const getParams = new URLSearchParams(window.location.search)
      const params = {
        page: this.page,
        query: searchQuery || getParams.get('search') || '',
        status: getParams.get('filter') || '',
        sort: getParams.get('sort') || '',
        per_page: this.itemsPerPage,
        type: selectedType || '',
        start_date: start_date || getParams.get('start_date') || '',
        end_date: end_date || getParams.get('end_date') || ''
      }

      try {
        console.log('API For Search: ', 'api/document/user-documents/', { params })
        const response = await this.$axios.get('api/document/user-documents/', { params })
        console.log('API For Search: ', 'api/document/user-documents/', { params })
        console.log('response to test: ', response)
        // Safe access to response data with proper error handling
        if (response?.data?.results) {
          const data = response.data.results

          if (this.page === 1) {
            this.documents = data
          } else {
            this.documents = [...this.documents, ...data]
          }

          this.hasMoreItems = data.length === this.itemsPerPage

          // Update pagesCount if pagination info is available
          if (response.data.meta?.last_page) {
            this.pagesCount = response.data.meta.last_page
          }

          // Auto-select first document if none selected and in non-mobile view
          if (!this.selectedDocument && this.documents.length > 0 && !this.isMobile.isMobile) {
            this.selectedDocument = this.documents[0]
          }

          // Store the data in cache
          this.cacheDocuments(selectedType || 'all', data)
        } else {
          // Handle case where data is not available
          this.documents = []
          toast.info(this.$t('documentMS.noDocumentsFound'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
        }
      } catch (err) {
        console.error('API Error:', err)
        this.error = 'Failed to fetch data. Please try again.'
        toast.error(this.$t('documentMS.fetchError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      } finally {
        this.isLoading = false
        this.loading = false
      }
    },

    handleLoadMoreDocuments() {
      if (!this.isLoading && this.hasMoreItems) {
        this.page++
        this.fetchDocuments(
          this.selectedDocumentType?.value || '',
          this.searchQuery,
          this.currentFilters.start_date,
          this.currentFilters.end_date
        )
      }
    },

    // Cache API response data
    cacheDocuments(documentType: string, data: any) {
      localStorage.setItem(
        `documents_${documentType}`,
        JSON.stringify({
          timestamp: Date.now(),
          data: data
        })
      )
    },

    // Get cached documents (with optional expiration)
    getCachedDocuments(documentType: string) {
      const cached = localStorage.getItem(`documents_${documentType}`)
      if (!cached) return null

      const { timestamp, data } = JSON.parse(cached)
      // Cache expiration: 5 minutes (300000 ms)
      if (Date.now() - timestamp > 300000) {
        localStorage.removeItem(`documents_${documentType}`)
        return null
      }

      return data
    }
  },
  watch: {
    selectedDocumentType(newType) {
      if (newType) {
        this.page = 1
        this.selectedDocument = null
        const cachedData = this.getCachedDocuments(newType.value || 'all')
        if (cachedData) {
          this.documents = cachedData
          if (this.documents.length > 0 && !this.isMobile.isMobile) {
            this.selectedDocument = this.documents[0]
          }
        } else {
          this.fetchDocuments(
            newType.value,
            this.searchQuery,
            this.currentFilters.start_date,
            this.currentFilters.end_date
          )
        }
      }
    }
  },
  created() {
    // Initialize with default document type if available
    if (this.documentTypes.length > 0) {
      this.selectedDocumentType = this.documentTypes[0]
    }
    this.fetchDocuments('')
  },
  beforeUnmount() {
    // Clear any pending timeouts
    if (this.fetchTimeout) {
      clearTimeout(this.fetchTimeout)
    }
  }
})
</script>

<style scoped>
.documents_view {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  height: 100dvh;
}

.document_viewer {
  width: 70%;
  display: flex;
  min-height: 100%;
  height: 100%;
}
.noDataBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Base transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide and fade combination for main views */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.box.no_data_box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
/* Mobile specific transitions */
@media (max-width: 1200px) {
  .document_viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    min-height: 100% !important;
  }

  .slide-doc-fade-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-doc-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
<style>
.no_data_box svg path {
  stroke: #000000;
}
</style>
