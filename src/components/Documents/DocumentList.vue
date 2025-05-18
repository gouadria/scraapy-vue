<template>
  <div class="document-list" v-if="listData.length > 0">
    <transition name="fade" mode="out-in">
      <div class="controls" v-show="hasSelectedDocs">
        <h6>
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
          {{ $t('documentMS.All') }}
        </h6>
        <button @click="downloadSelected" :disabled="isDownloading" class="download-btn">
          <img src="@/assets/documents_svg/download.svg?url" alt="download" />
          {{ $t('documentMS.Download') }}
        </button>
      </div>
    </transition>

    <ul class="doc_links">
      <li
        v-for="(list, index) in listData"
        :key="index"
        :class="{
          active: list === selectedDoc,
          showing_versions: isViewingVersions(list)
        }"
        @click="selectDoc(list)"
      >
        <div class="doc_info">
          <div class="list_container">
            <!-- We should display this feature if there is a "Download All" option available -->
            <!-- <div class="input">
              <input
                type="checkbox"
                v-model="selectedDocs"
                :value="list"
                @change="updateSelection"
                @click.stop
                :disabled="isDownloading"
              />
            </div> -->
            <div class="info" v-if="list.data">
              {{ list.id.slice(0, 8) }}
              <!-- <h3 class="doc-title">{{ list?.id }}</h3>
              <span class="created-by">
                {{ $t('documentMS.CreatedBy') }}: {{ list.buyer.name }}
              </span>
              <div class="tenant_date" v-if="list">
                <span> {{ formatDate(new Date(list.payment_date)) }} </span>
              </div> -->
            </div>
            <div class="info" v-else>
              {{ list.id.slice(0, 8) }}
            </div>
          </div>
          <div class="date_status">
            {{ formatDate(new Date(list.created_at)) }}
          </div>
        </div>
      </li>
      <!-- Skeleton Loading -->
      <template v-if="loading">
        <SkeletonLoader type="wave-line" :items="1" :duration="1" class="skeleton_loading" />
      </template>
    </ul>
  </div>
  <div class="no_documents" v-else>
    <p>{{ $t('documentMS.noDocuments') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
// import type { List } from '@/models/Documents'
import { useIsMobile } from '@/composables/useIsMobile'
// import commonChip from '@/components/UIElements/common_chip.vue'
import { useI18n } from 'vue-i18n'
import SkeletonLoader from '@/components/UIElements/SkeletonLoader.vue'
import type { orderDetails } from '@/models/order'
export default defineComponent({
  name: 'DocumentList',
  components: { SkeletonLoader },
  props: {
    listData: {
      type: Array as () => orderDetails[],
      required: true,
      default: () => []
    },
    viewVersions: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectDoc'],
  data() {
    return {
      selectedDocs: [] as orderDetails[],
      selectAll: false,
      selectedDoc: null as orderDetails | null,
      isDownloading: false,
      isMobile: useIsMobile().isMobile,
      versions: this.listData,
      store: useStore()
    }
  },
  computed: {
    hasSelectedDocs(): boolean {
      return this.selectedDocs.length > 0
    }
  },
  watch: {
    selectAll(newVal: boolean) {
      this.toggleSelectAll()
    },
    listData: {
      handler: 'initializeSelection',
      immediate: true
    }
  },
  methods: {
    toggleSelectAll() {
      this.selectedDocs = this.selectAll ? [...this.listData] : []
    },
    updateSelection() {
      this.selectAll = this.selectedDocs.length === this.listData.length
    },
    async downloadSelected() {
      if (this.isDownloading) return

      try {
        this.isDownloading = true
        const filesToDownload = this.selectedDocs.map((list) => ({
          url: list.file,
          fileName: `${list.title}.pdf`
        }))

        await this.store.dispatch('downloadMultipleFiles', filesToDownload)
      } catch (error) {
        console.error('Download failed:', error)
        // Handle error (show notification, etc.)
      } finally {
        this.isDownloading = false
      }
    },
    selectDoc(doc: orderDetails) {
      this.selectedDoc = doc || {}
      this.$emit('selectDoc', doc)
    },
    isViewingVersions(list: orderDetails): boolean {
      return this.viewVersions && list === this.selectedDoc
    },
    formatDocumentIssueDate(issueDate: Date): string {
      const { t } = useI18n()
      const now = new Date()
      const diff = now.getTime() - issueDate.getTime()

      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))

      if (minutes < 60) {
        return `${minutes} ${t('documentMS.minutes')}`
      } else if (hours < 24) {
        return `${hours} ${t('documentMS.hours')}`
      } else if (days <= 5) {
        return `${days} ${t('documentMS.day')}${days > 1 ? '' : ''}`
      } else if (weeks <= 4) {
        return `${weeks} ${t('documentMS.week')}${weeks > 1 ? '' : ''}`
      } else if (months <= 12) {
        return `${months} ${t('documentMS.month')}${months > 1 ? '' : ''}`
      } else {
        return issueDate.toLocaleDateString()
      }
    },
    initializeSelection() {
      if (!this.isMobile) {
        if (this.listData.length > 0) {
          this.selectedDoc = this.listData[0]
          this.$emit('selectDoc', this.listData[0])
        }
      } else {
        // this.selectedDocs = this.listData;
      }
    },
    formatDate(date: Date): string {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  mounted() {
    this.initializeSelection()
  }
})
</script>
<style scoped>
.document-list .doc_links {
  list-style: none;
  padding: 0;
  width: 100%;
  position: relative;
}
.skeleton_loading {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 100%;
  width: 100%;
}
.document-list .doc_links li {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  width: 100%;
  border-bottom: 1px solid #eaecf0;
  cursor: pointer;
  justify-content: space-between;
}
.document-list .doc_links li .doc_info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 13px;
  width: 100%;
  justify-content: space-between;
}
.doc_info .info h3 {
  font-size: 14px;
  font-weight: 600;
  color: #344054;
}
.doc_info .info span {
  font-size: 14px;
  color: #667085;
  font-weight: 500;
}
.document-list .doc_links li .doc_info .list_container {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  /* width: 100%; */
}
.document-list .doc_links li time {
  font-size: 14px;
  color: #475467;
  font-weight: 400;
  min-width: 20%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  white-space: nowrap;
}
.active {
  background: #f2f4f7;
}
.document-list {
  width: 100%;
  height: 100%;
  border-left: 1px solid #eaecf0;
}
.document-list li input {
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Version list styling */
.no-versions {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #667085;
  font-size: 14px;
  font-weight: 300;
}
.version-list {
  display: flex;
  gap: 20px;
  flex-direction: column;
  padding: 0;
  list-style: none;
  position: relative;
}
.document-list .doc_links li .version-list li {
  padding: 0 16px;
}
.version-item {
  position: relative;
  padding: 12px 0 12px 24px;
  border-right: 2px solid #e5e7eb;
  border-bottom: none !important;
}

.version-dot {
  position: absolute;
  right: -5px;
  top: -10px;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 50%;
}

.version-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.version-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 24px;
  height: 24px;
  background-color: #e5e7eb;
  border-radius: 50%;
}

.version-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.version-author {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.version-date {
  font-size: 12px;
  color: #666;
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.date_status {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}
.bill_amount {
  color: #475467;
  font-size: 14px;
  font-weight: 400;
}
.tenant_date {
  display: flex;
  gap: 4px;
}
</style>

<style>
.controls input[type='checkbox'],
.input input[type='checkbox'] {
  position: relative;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  cursor: pointer;
  line-height: 0;
  margin: 0 0.6em 0 0;
  outline: 0;
  padding: 0 !important;
  vertical-align: text-top;
  height: 20px;
  width: 20px;
  appearance: none;
  opacity: 0.5;
}
.controls input,
.input input[type='checkbox']:hover {
  opacity: 1;
}
.controls input[type='checkbox']:checked,
.input input[type='checkbox']:checked {
  background-color: #fbac48;
  border-color: #fbac48;
  opacity: 1;
}
.controls input[type='checkbox']:before,
.input input[type='checkbox']:before {
  content: '';
  position: absolute;
  right: 50%;
  top: 50%;
  width: 4px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  margin: -1px -1px 0 -1px;
  transform: rotate(45deg) translate(-50%, -50%);
  z-index: 2;
}
.controls {
  justify-content: space-between;
  padding: 16px;
  display: flex;
  align-items: center;
}
.controls h6 {
  font-size: 14px;
  color: #101828;
  font-weight: 600;
  display: flex;
  gap: 14px;
}
.controls button {
  border: none;
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  color: #344054;
  font-weight: 600;
  font-size: 14px;
}
.no_documents {
  text-align: center;
}
</style>
