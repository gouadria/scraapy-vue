<script lang="ts">
import { defineComponent } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import inputField from '@/components/UIElements/inputField.vue'
import categories from '@/components/marketFront/categories.vue'
import productsCarousel from '@/components/marketFront/productsCarousel.vue'
import trustedBy from '@/components/marketFront/trustedBy.vue'
import type { Item } from '@/models/Item'
import type { CategoryGroup } from '@/models/Category'

// Types
interface MarketChoices {
  [key: string]: Item[]
}

interface ApiResponse {
  results: Item[]
}

export default defineComponent({
  name: 'MarketPlace',
  components: {
    navBar,
    categories,
    footerComponant,
    inputField,
    productsCarousel,
    trustedBy
  },
  data() {
    return {
      categoryGroups: {},
      isMobile: useIsMobile().isMobile,
      page_carousels: {
        product: [
          {
            title: "HomeView.mostSold",
            search: new URLSearchParams("sort=most_sold"),
          },
          {
            title: "HomeView.scraapy",
            search: new URLSearchParams("sort=relavance&seller=Bahid"),
          },
          {
            title: "HomeView.allProducts",
            search: new URLSearchParams("sort=relavance"),
          }
        ],
        rental: [
          {
            title: "HomeView.rental",
            search: new URLSearchParams("sort=relavance&type=rental"),
          },
          {
            title: "HomeView.bestSellingRental",
            search: new URLSearchParams("sort=most_sold&type=rental"),
          },
          {
            title: "HomeView.fleets",
            search: new URLSearchParams("sort=relavance&type=rental"),
          }
        ],
        service: [
          {
            title: "HomeView.service",
            search: new URLSearchParams("sort=relavance&type=service"),
          },
          {
            title: "HomeView.bestSellingServices",
            search: new URLSearchParams("sort=most_sold&type=service"),
          },
          {
            title: "HomeView.highValueServices",
            search: new URLSearchParams("sort=price_desc&type=service"),
          }
        ],
      },
    }
  },
  computed: {
    activeTab(): string {
      return (this.$route.query.tab as string) || 'product'
    },
  },
  methods: {
    async fetchApi() {
      try {
        const response = await this.$axios.get('/api/inventory/home/')
        this.categoryGroups = response.data.data.categories
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    },
    async fetchMarketData() {
      let carousels = this.page_carousels[this.activeTab]
      for (const carousel of carousels) {
        try {
          const { data } = await this.$axios.get<ApiResponse>('/api/inventory/items/', {
            params: carousel.search
          })
          carousel.items = data.results
        } catch (error) {
          console.error('Market data fetch error:', error)
        }
      }
    },
    handleSearch(query: string): void {
      this.$router.push({ name: 'search', query: { query: query } })
    },
    handleSeeMore(index: number) {
      let query = this.page_carousels[this.activeTab][index].search
      if (query) {
        this.$router.push({ name: 'search', query: Object.fromEntries(query) })
      } else {
        console.error('No query found for carousel index:', index)
      }
    },
  },
  watch: {
    '$route.query.tab': {
      handler() {
        this.fetchMarketData()
      },
      immediate: true,
    }
  },
  async mounted() {
    await Promise.all([this.fetchMarketData(), this.fetchApi()])
  },
})
</script>

<template>
  <navBar />
  <main class="max-width padded" v-auto-animate>
    <div class="marketPlace">
      <inputField
        v-if="isMobile"
        type="search"
        :placeholder="$t('nav.search')"
        class="search_field"
        @submit="handleSearch"
      />

      <categories :categoryGroups="categoryGroups[activeTab]" />

      <template
        v-for="(carousel, index) in page_carousels[activeTab].filter(carousel => carousel.items?.length)"
        :key="carousel.title"
      >
        <productsCarousel
          v-if="carousel.items"
          :items="carousel.items"
          :title="carousel.title"
          @see-more-clicked="handleSeeMore(index)"
        >
          {{ $t(carousel.title) }}
        </productsCarousel>
        <trustedBy v-if="activeTab === 'product' && index === 1" />
      </template>
    </div>
  </main>
  <footerComponant />
</template>

<style scoped>
main {
  margin: 0px auto;
}

.test_wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.items_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.marketPlace {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .marketPlace {
    gap: 15px;
  }
  
}

.search_field {
  margin-top: 20px;
}
</style>
