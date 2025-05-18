<template>
  <div class="service_requests" v-auto-animate>
    <RejectReason :show="!!rejectItem" @submit="handleRejectItem" @close="closeRejectModal" />

    <div class="header">
      <div class="title">
        {{ vendors.length || $t('management.no') }} {{ $t('management.pendingRequests') }}
      </div>
      <div class="title-actions">
        <MainBtn v-if="items !== null" type="cancel" @click="clearItems">
          {{ $t('management.back') }}
        </MainBtn>
      </div>
    </div>

    <div v-if="items !== null" class="items">
      <!-- Show ItemCards only when showEditPage is false -->
      <div v-if="!showEditPage">
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          staffActions
          @approve="removeItem(item.id)"
          @reject="openRejectModal(item)"
          @approvalClick="openEditPage(item)"
        />
      </div>

      <!-- Show EditItemPage when showEditPage is true -->
      <EditItemPage
        v-if="showEditPage && selectedItem"
        :item="selectedItem"
        :disabled="true"
        @close="closeEditPage"
        :categoryGroups="categoryGroups"
      />
    </div>

    <div v-else class="vendors">
      <div v-if="!vendors.length" class="no-items">
        {{ $t('management.noPendingRequests') }}
      </div>
      <div
        v-for="vendor in vendors"
        :key="vendor.business_profile?.cr_number"
        class="item"
        @click="fetchItems(vendor.business_profile?.cr_number)"
      >
        <div class="icon">
          <img v-if="!vendor.image" src="@/assets/svg-icons/vendor-placeholder.svg" alt="image" />
          <img v-else :src="vendor?.image" alt="image" />
        </div>
        <div class="content">
          <div class="name">{{ vendor.name }}</div>
          <div class="details">
            {{ vendor.pending_items }} {{ $t('management.listingRequests') }}
          </div>
        </div>
        <div class="actions">
          <img src="@/assets/svg-icons/chevron-right.svg?url" alt="image" />
        </div>
      </div>
    </div>
    <div class="no_requests"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import ItemCard from '@/components/UIElements/ItemCard.vue'
import RejectReason from '@/components/modals/RejectReason.vue'
import { toast } from 'vue3-toastify'
import EditItemPage from '../EditItemPage.vue'
interface BusinessProfile {
  cr_number: string
  image?: string
  status: string
}

interface User {
  name: string
  email: string
  business_profile: BusinessProfile
  pending_items: number
}

interface Field {
  value: string
  name: string
  type_icon: string
}

interface Item {
  id: string
  name: string
  image: string
  price: number
  price_unit: string
  category: string
  extra_fields: Field[]
  owner_image: string
  status: string
}

export default defineComponent({
  name: 'PendingRequests',
  components: { RejectReason, MainBtn, ItemCard, EditItemPage },
  data() {
    return {
      vendors: [] as User[],
      items: null as Item[] | null,
      rejectItem: null as Item | null,
      selectedItem: null as Item | null,
      showEditPage: false,
      categoryGroups: [] as any[]
    }
  },
  watch: {
    $route: 'fetchApi'
  },
  methods: {
    async fetchApi() {
      const type = this.$route.params.subPage
      console.log(type)
      try {
        const res = await this.$axios.get(`/api/inventory/staff/?type=${type}`)
        this.vendors = res.data.message || []
        console.log(res)
      } catch (error) {
        console.error('Error fetching vendors:', error)
        this.vendors = []
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.get(
          '/api/inventory/categories/?type=service'
        )
        this.categoryGroups = response.data.data
        console.log(response)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
    async fetchItems(cr_number: string) {
      const type = this.$route.params.subPage
      try {
        const { data } = await this.$axios.get(
          `/api/inventory/staff/${cr_number}/items/?type=${type}`
        )
        this.items = data.data
        console.log(data)
      } catch (error) {
        console.error('Error fetching items:', error)
        this.items = []
        toast.error(this.$t('management.toastFetchItemsError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      }
    },
    async handleRejectItem(reason: string) {
      if (!this.rejectItem) return

      try {
        await this.$axios.post(`/api/inventory/staff/${this.rejectItem.id}/reject/`, {
          staff_note: reason
        })
        toast.success(this.$t('management.vendorApproved'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
        this.removeItem(this.rejectItem.id)
      } catch (error) {
        console.error('Error rejecting item:', error)
        toast.error(this.$t('management.rejectError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      } finally {
        this.rejectItem = null
      }
    },
    removeItem(id: string) {
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
      // toast.info(this.$t('management.toastClearItems'));
    },
    openRejectModal(item: Item) {
      this.rejectItem = item
    },
    closeRejectModal() {
      this.rejectItem = null
    },
    openEditPage(item: Item) {
      console.log(item)
      this.selectedItem = item
      this.showEditPage = true
    },

    closeEditPage() {
      this.selectedItem = null
      this.showEditPage = false
    }
  },
  mounted() {
    this.fetchApi()
  }
})
</script>

<style scoped>
.service_requests {
  overflow: hidden;
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

.no-items {
  margin: 2rem 0;
  font-size: 24px;
  color: #888888;
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

.items {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  transition: opacity 0.3s;
}
.items.edit-open {
  opacity: 0.5;
  pointer-events: none;
}
</style>
