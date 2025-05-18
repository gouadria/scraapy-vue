<template>
  <AddListing
    :show="showModal"
    :categoryGroups="categoryGroups?.data || []"
    @close="showModal = false"
    @success="
      () => {
        showModal = false
        updateItems()
      }
    "
  />

  <EditItemPage
    v-if="editItem !== null"
    :item="editItem"
    :categoryGroups="categoryGroups?.data || []"
    @close="editItem = null"
    @save="updateItems"
  />

  <div class="items-list" v-else>
    <div class="top_page_header">
      <h2>{{ $t('listings.sellProducts') }}</h2>
      <p>{{ $t('listings.sellProductsText') }}</p>
    </div>
    <div class="divider"></div>
    <div class="header">
      <div class="title">
        {{ listings.length || $t('listings.no') }} {{ $t('listings.listings') }}
      </div>
      <div class="title-actions">
        <DropDown
          :options="[
            // { value: 'batch', label: $t('listings.batchListing') },
            { value: 'single', label: $t('listings.singleListing') }
          ]"
          @update:modelValue="handleAddListing"
          :disabled="!categoryGroups?.data?.length"
        >
          <template v-slot:trigger>
            <MainBtn type="green" :disabled="!categoryGroups?.data?.length">
              {{ $t('listings.addListing') }}
            </MainBtn>
          </template>
        </DropDown>
      </div>
    </div>
    <div class="items">
      <div class="no-items" v-if="!listings.length && !loading">
        {{ $t('listings.noProductListings') }}
      </div>
      <template v-else>
        <div
          v-for="item in listings"
          :key="item.id"
          class="item-wrapper"
          :class="{ 'fade-in': item.isNew }"
        >
          <ItemCard
            :item="item"
            enableUpload
            vendorActions
            showBadge
            @delete="handleDeleteItem"
            @upload-image="handleUpdateItem"
            @edit="handleEditItem"
          />
        </div>
      </template>
      <div ref="infiniteScroll" class="infinite-scroll-sentinel"></div>
      <div class="loading-indicator" v-if="loading">
        <div class="spinner"></div>
        <span>{{ $t('errorsMsgs.LoadingMoreItems') }}</span>
      </div>
      <div class="end-message" v-if="!nextPageUrl && listings.length">
        {{ $t('errorsMsgs.NoMoreItems') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemCard from '@/components/UIElements/ItemCard.vue'
import DropDown from '@/components/UIElements/DropDown.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import AddListing from '@/components/modals/AddListing.vue'
import EditItemPage from '@/views/management/EditItemPage.vue'
import type { Item } from '@/models/Item'
import type { CategoryGroup } from '@/models/Category'
import { toast } from 'vue3-toastify'

interface CategoryResponse {
  message: string
  data: CategoryGroup[]
  errors: any[]
  warnings: any[]
}

export default defineComponent({
  name: 'SellProductPage',
  components: {
    ItemCard,
    DropDown,
    MainBtn,
    AddListing,
    EditItemPage
  },
  data() {
    return {
      listings: [] as Item[],
      showModal: false as boolean,
      editItem: null as Item | null,
      categoryGroups: null as CategoryResponse | null,
      nextPageUrl: '/api/inventory/user/items/?category_group=product' as string | null,
      loading: false as boolean,
      observer: null as IntersectionObserver | null
    }
  },
  methods: {
    // Debounce function to limit fetch calls
    debounce(fn: Function, delay: number) {
      let timeoutId: ReturnType<typeof setTimeout>
      return (...args: any[]) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delay)
      }
    },

    async fetchItems() {
      if (!this.nextPageUrl || this.loading) return
      this.loading = true
      try {
        const response = await this.$axios.get(this.nextPageUrl)
        const newItems = response.data.results.map((item: Item) => ({ ...item, isNew: true }))
        this.listings.push(...newItems)
        this.nextPageUrl = response.data.next

        // Remove the 'isNew' flag after animation completes (e.g., 1s)
        setTimeout(() => {
          this.listings.forEach((item) => delete item.isNew)
        }, 1000)
      } catch (error) {
        console.error('Failed to fetch items:', error)
        toast.error(this.$t('errorsMsgs.something_went_wrong'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      } finally {
        this.loading = false
      }
    },

    setupIntersectionObserver() {
      const sentinel = this.$refs.infiniteScroll as HTMLElement
      if (!sentinel) return

      // Debounced fetchItems
      const debouncedFetchItems = this.debounce(this.fetchItems, 300)

      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.loading) {
            debouncedFetchItems()
          }
        },
        {
          root: null,
          threshold: 0.1 // Trigger slightly before sentinel is fully visible
        }
      )
      this.observer.observe(sentinel)
    },

    async fetchCategories() {
      try {
        const response = await this.$axios.get<CategoryResponse>(
          '/api/inventory/categories/?type=product'
        )
        this.categoryGroups = response.data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },

    handleAddListing(type: string) {
      if (type === 'batch') {
        this.showModal = true
      } else {
        this.editItem = {} as Item
      }
    },

    handleEditItem(id: number | string) {
      this.editItem = this.listings.find((item) => item.id === id) || null
    },

    handleDeleteItem(id: number | string) {
      this.listings = this.listings.filter((item) => item.id !== id)
    },

    async handleUpdateItem(itemPromise: Promise<Item>) {
      const item = await itemPromise
      const index = this.listings.findIndex((i) => i.id === item.id)
      if (index === -1) {
        this.listings.push(item)
      } else {
        this.listings[index] = item
      }
    },
    async updateItems() {
      this.loading = true
      try {
        const response = await this.$axios.get('/api/inventory/user/items/?category_group=product')
        const newItems = response.data.results.map((item: Item) => ({ ...item, isNew: true }))
        // Replace the existing list
        this.listings = newItems
        this.nextPageUrl = response.data.next

        setTimeout(() => {
          this.listings.forEach((item) => delete item.isNew)
        }, 1000)
        console.log('Fetched items from success:', response)
      } catch (error) {
        console.error('Failed to fetch items:', error)
        toast.error(this.$t('errorsMsgs.something_went_wrong'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 2000
        })
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchItems()
    this.fetchCategories()
    this.setupIntersectionObserver()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
})
</script>

<style scoped>
.items-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 30px;
}

.items {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.item-wrapper {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #15b377;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

.end-message {
  text-align: center;
  padding: 20px;
  color: #666;
  width: 100%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-items {
  margin: 2rem 0;
  font-size: 24px;
  color: #888888;
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

.top_page_header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 0.8px solid var(--Dark-100, #e7e7e7);
  padding-bottom: 18px;
}

.top_page_header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #121212;
}

.top_page_header p {
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
}
</style>
