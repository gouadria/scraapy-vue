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
import axios from 'axios'


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
      categoryGroups: {} as Record<string, CategoryGroup[]>,
      isMobile: useIsMobile().isMobile,
      page_carousels: {
        product: [
          {
            title: "HomeView.mostSold",
            search: new URLSearchParams("sort=most_sold"),
            items: [] as Item[]
          },
          {
            title: "HomeView.scraapy",
            search: new URLSearchParams("sort=relavance&seller=Bahid"),
            items: [] as Item[]
          },
          {
            title: "HomeView.allProducts",
            search: new URLSearchParams("sort=relavance"),
            items: [] as Item[]
          }
        ],
        rental: [
          {
            title: "HomeView.rental",
            search: new URLSearchParams("sort=relavance&type=rental"),
            items: [] as Item[]
          },
          {
            title: "HomeView.bestSellingRental",
            search: new URLSearchParams("sort=most_sold&type=rental"),
            items: [] as Item[]
          },
          {
            title: "HomeView.fleets",
            search: new URLSearchParams("sort=relavance&type=rental"),
            items: [] as Item[]
          }
        ],
        service: [
          {
            title: "HomeView.service",
            search: new URLSearchParams("sort=relavance&type=service"),
            items: [] as Item[]
          },
          {
            title: "HomeView.bestSellingServices",
            search: new URLSearchParams("sort=most_sold&type=service"),
            items: [] as Item[]
          },
          {
            title: "HomeView.highValueServices",
            search: new URLSearchParams("sort=price_desc&type=service"),
            items: [] as Item[]
          }
        ],
      }
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
        if (response?.data?.data?.categories) {
          this.categoryGroups = response.data.data.categories
        } else {
          this.categoryGroups = {}
          console.warn('Categories data missing or empty in API response')
        }
      } catch (error) {
        console.error('Failed to fetch categories', error)
        this.categoryGroups = {}
      }
    },
   async fetchMarketData() {
  const tab = this.activeTab
  const carousels = this.page_carousels[tab]

  await Promise.all(
    carousels.map(async (carousel) => {
      try {
        const response = await axios.get(`https://38.242.237.116/api/inventory/items/?${carousel.search.toString()}`);
        carousel.items = response.data.data || []
      } catch (error) {
        console.error(`Erreur récupération items pour ${carousel.title}:`, error)
        carousel.items = []
      }
    })
  )
},
    handleSearch(query: string): void {
      this.$router.push({ name: 'search', query: { query } })
    },
    handleSeeMore(index: number): void {
      const query = this.page_carousels[this.activeTab][index].search
      if (query) {
        this.$router.push({ name: 'search', query: Object.fromEntries(query.entries()) })
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

      <categories :categoryGroups="categoryGroups[activeTab] ?? []" />

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