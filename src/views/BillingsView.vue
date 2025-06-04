<template>
  <div class="documents_view">
    <SideList
      v-show="showList"
      :options="documentTypes"
      :buttonText="$t('documentMS.create')"
      :listData="billing"
      :selectedOption="selectedDocumentType"
      @option-selected="handleOptionSelected"
      @search="handleSearch"
      @select-doc="selectDocument"
      @filter-change="handleFilterChange"
      buttonClass="add_new"
      @handleLoadMoreDocuments="handleLoadMoreDocuments"
      :loading="loading"
    />

    <!-- Document Viewer Section  -->
    <Transition name="fade" mode="out-in">
      <div class="document_viewer" v-show="showViewer" v-if="billing.length > 0">
        <BillingViewer
          v-if="selectedDocument"
          :billing="selectedDocument"
          :documentTypes="translatedOptions"
          @goBackToList="goBackToList"
        />
      </div>
      <noDataBox
        v-else
        class="no_data_box"
        :title="$t('documentMS.nodocuments')"
        :icon="FileIcon"
      />
    </Transition>

    <ErrorModal :closeModal="erroModalActive" :message="errorMessage" @close="toggelModalError" />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useStore } from 'vuex'
import type { Invoice } from '@/models/invoice'
import SideList from '@/components/Documents/SideList.vue'
import BillingViewer from '@/billings/BillingViewer.vue'
import FileIcon from '@/assets/documents_svg/FileIcon.vue'
import { useIsMobile } from '@/composables/useIsMobile'
import noDataBox from '@/components/UIElements/no_data_box.vue'
import ErrorModal from '@/components/UIElements/ErrorModal.vue'
import type { orderDetails } from '@/models/order'
interface Option {
  value: string
  label: string
}

export default defineComponent({
  name: 'BillingMNSView',
  components: {
    BillingViewer,
    noDataBox,
    ErrorModal,
    SideList
  },
  data() {
    return {
      addDocModal: false,
      billing: [] as orderDetails[],
      selectedDocument: null as Invoice | null,
      // documentTypes: [
      //   {
      //     value: 'Purchasing Invoices',
      //     label: this.$t('documentMS.Purchasing Invoices') as string
      //   },
      //   { value: 'Selling Invoices', label: this.$t('documentMS.Selling Invoices') as string },
      //   { value: 'lab test reports', label: this.$t('documentMS.lab test reports') as string },
      //   {
      //     value: 'demolition site inspection',
      //     label: this.$t('documentMS.demolition site inspection') as string
      //   },
      //   { value: 'inspection reports', label: this.$t('documentMS.inspection reports') as string },
      //   { value: 'Other Documents', label: this.$t('documentMS.Other Documents') as string }
      // ] as Option[],
      selectedDocumentType: null as Option | null,
      store: useStore(),
      isMobile: useIsMobile(),
      FileIcon: shallowRef(FileIcon),
      erroModalActive: false,
      errorMessage: '',
      page: 1,
      pagesCount: 1,
      itemsPerPage: 10,
      isLoading: false,
      error: null as string | null,
      hasMoreItems: false
    }
  },
  computed: {
    // translatedOptions(): Option[] {
    //   return this.documentTypes.map((type: any) => ({
    //     label: this.$t(`documentMS.${type.value}` as string),
    //     value: type.value
    //   }))
    // },
    showList() {
      return this.isMobile || !this.selectedDocument
    },
    showViewer() {
      return !this.isMobile || this.selectedDocument
    }
  },
  methods: {
    toggelModalError() {
      this.erroModalActive = !this.erroModalActive
    },
    handleOptionSelected(option: Option) {
      this.selectedDocumentType = option
    },
    selectDocument(doc: Invoice) {
      this.selectedDocument = doc
    },
    goBackToList() {
      this.selectedDocument = null
    },
    handleSearch(searchQuery: string) {
      console.log('Search query:', searchQuery)
    },
    async fetchBills() {
  if (this.isLoading) return

  this.isLoading = true
  this.error = null

  const getParams = new URLSearchParams(window.location.search)
  const params = {
    page: getParams.get('page') || 1,
    query: getParams.get('search') || '',
    status: getParams.get('filter') || '',
    sort: getParams.get('sort') || '',
    per_page: this.itemsPerPage
  }

  try {
    const response = await this.$axios.get('api/billing/', { params })
    console.log('API response:', response.data)

    const results = Array.isArray(response.data) ? response.data : []
    if (!Array.isArray(results)) {
      throw new Error('Malformed API response: results is not an array')
    }

    const page = getParams.get('page') ? Number(getParams.get('page')) : 1
    if (page === 1) {
      this.billing = results
    } else {
      this.billing = [...this.billing, ...results]
    }

    this.hasMoreItems = results.length === this.itemsPerPage
  } catch (err) {
    this.error = 'Failed to fetch data. Please try again.'
    console.error('API Error:', err)
  } finally {
    this.isLoading = false
  }
},
    async fetchDocuments(selectedType: string) {
      if (this.isLoading) return
      this.isLoading = true
      try {
        const response = await this.store.dispatch('fetchDocuments', {
          type: selectedType,
          page: this.page
        })

        // Delay processing the response
        if (this.page > 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }

        this.pagesCount = Math.ceil(response.data.count / 12)
        this.billing =
          this.page === 1 ? response.data.results : [...this.billing, ...response.data.results]
      } catch (error) {
        console.error('Error fetching billing:', error)
        this.errorMessage = this.$t('errorsMsgs.something_went_wrong')
        this.toggelModalError()
      } finally {
        this.isLoading = false
      }
    },

    handleLoadMoreDocuments(this: any) {
      if (this.page < this.pagesCount) {
        this.page++
        this.fetchDocuments(this.selectedDocumentType?.value || '')
      }
    },

    handleFilterChange(filters: any) {
      console.log('Filters changed:', filters)
    }
  },
  watch: {
    selectedDocumentType(newType) {
      if (newType) {
        this.page = 1
        this.fetchDocuments(newType.value)
      }
    }
  },
  async created() {
    this.fetchBills()
    // await this.store.dispatch('getDocumentTypes')
    // const types = this.store.getters.getDocumentTypes.type
    // this.documentTypes = types.map((type: string) => ({
    //   label: type,
    //   value: type
    // }))
    // this.selectedDocumentType = this.documentTypes[0] || null
  }
})
</script>

<style scoped>
.documents_view {
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
}

.document_viewer {
  width: 70%;
  display: flex;
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
