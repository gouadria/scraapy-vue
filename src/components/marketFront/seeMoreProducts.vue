<script lang="ts">
import { defineComponent } from 'vue'
import type { Item } from '@/models/Item'
import ItemCard from '../UIElements/ItemCard.vue'

interface ApiResponse {
  results: Item[]
  next: string | null
}

// Define available sort options
type SortOption = {
  label: string
  value: string
}
// <seeMoreProducts v-if="showSeeMore" :moreProducts="selectedProducts" @close="closeSeeMore" />

// Define filter options interface
interface FilterOption {
  label: string
  value: string | number
}

export default defineComponent({
  name: 'moreProductList',

  components: { ItemCard },

  emits: ['close'],

  props: {
    moreProducts: {
      type: Array as () => Item[],
      required: true
    },
    apiEndpoint: {
      type: String,
      required: true
    },
    initialFilters: {
      type: Object as () => Record<string, any>,
      default: () => ({})
    }
  },

  data() {
    return {
      items: [] as Item[],
      page: 1,
      isLoading: false,
      hasMore: true,
      observer: null as IntersectionObserver | null,
      // Sorting
      sortBy: 'newest',
      sortOptions: [
        { label: 'Newest', value: '' },
        { label: 'Oldest', value: 'oldest' },
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' }
      ] as SortOption[],
      // Filtering
      filters: { ...this.initialFilters },
      filterOptions: {
        category: [
          { label: 'All', value: '' },
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' }
          // Add more categories as needed
        ],
        price_range: [
          { label: 'All', value: '' },
          { label: 'Under $50', value: '0-50' },
          { label: '$50 - $100', value: '50-100' },
          { label: '$100+', value: '100-' }
        ]
      }
    }
  },

  mounted() {
    window.scrollTo(0, 0);
    this.items = [...this.moreProducts]
    this.setupIntersectionObserver()
  },

  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },

  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.isLoading && this.hasMore) {
            this.loadMore()
          }
        },
        { threshold: 0.5 }
      )

      const loaderElement = this.$refs.loader as HTMLElement
      if (loaderElement) {
        this.observer.observe(loaderElement)
      }
    },

    async loadMore() {
      if (this.isLoading || !this.hasMore) return

      this.isLoading = true

      try {
        const queryParams = {
          page: this.page + 1,
          sort: this.sortBy,
          ...this.filters
        }

        const response = await this.$axios.get<ApiResponse>(this.apiEndpoint, {
          params: queryParams
        })

        const newItems = response.data.results

        if (newItems.length > 0) {
          this.items.push(...newItems)
          this.page++
        }

        this.hasMore = Boolean(response.data.next)
      } catch (error) {
        console.error('Error loading more items:', error)
      } finally {
        this.isLoading = false
      }
    },

    async handleFilterChange(filterType: string, value: string | number) {
      this.filters[filterType] = value
      await this.resetAndReload()
    },

    async handleSortChange(value: string) {
      this.sortBy = value
      await this.resetAndReload()
    },

    async resetAndReload() {
      this.items = []
      this.page = 1
      this.hasMore = true
      try {
        const queryParams = {
          page: 1,
          sort: this.sortBy,
          ...this.filters
        }

        const response = await this.$axios.get<ApiResponse>(this.apiEndpoint, {
          params: queryParams
        })

        this.items = response.data.results
        this.hasMore = Boolean(response.data.next)
      } catch (error) {
        console.error('Error reloading items:', error)
      }
    },

    clearFilters() {
      this.filters = { ...this.initialFilters }
      this.sortBy = 'newest'
      this.resetAndReload()
    }
  }
})
</script>

<template>
  <div class="see_more">
    <div class="header">
      <div class="back" @click="$emit('close')">
        <img src="@/assets/svg-icons/chevron-left.svg?url" alt="back" />
        {{ $t('listings.back') }}
      </div>
    </div>

    <!-- Filters and Sort Section -->
    <div class="filters-section">
      <!-- Sort Dropdown -->
      <select v-model="sortBy" @change="handleSortChange($event.target.value)" class="sort-select">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Filter Dropdowns -->
      <div class="filter-group">
        <select
          v-for="(options, filterType) in filterOptions"
          :key="filterType"
          :value="filters[filterType]"
          @change="handleFilterChange(filterType, $event.target.value)"
          class="filter-select"
        >
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <!-- Clear Filters Button -->
        <button @click="clearFilters" class="clear-filters">
          {{ $t('listings.clearFilters') }}
        </button>
      </div>
    </div>

    <div class="moreProductList">
      <ItemCard type="product" v-for="item in items" :key="item.id" :item="item" />

      <!-- Loading indicator -->
      <div v-if="hasMore" ref="loader" class="loader-container">
        <div class="loader">
          <div class="dot-pulse">
            <div class="dot-pulse__dot"></div>
          </div>
        </div>
      </div>

      <!-- End of results message -->
      <div v-else-if="items.length > 0" class="end-message">
        {{ $t('listings.noMoreItems') }}
      </div>

      <!-- No results message -->
      <div v-else class="no-results">
        {{ $t('listings.noResults') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Previous styles remain the same */

.filters-section {
  position: sticky;
  top: 60px;
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 1;
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sort-select,
.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 120px;
}

.clear-filters {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.clear-filters:hover {
  background-color: #e5e7eb;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}


.header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}

.back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

.back img {
  width: 20px;
  height: 20px;
}

.moreProductList {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Loader container */
.loader-container {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

/* Animated dots loader */
.dot-pulse {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #3b82f6;
  animation: dot-pulse 1s infinite linear;
}

.dot-pulse__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #3b82f6;
}

.dot-pulse__dot:nth-child(1) {
  animation: dot-pulse-dot 1s infinite;
}

@keyframes dot-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.3);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dot-pulse-dot {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.end-message {
  grid-column: 1 / -1;
  text-align: center;
  color: #666;
  padding: 2rem;
  font-size: 0.9rem;
}

.see_more {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0;
}
.moreProductList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.header .back {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
</style>
