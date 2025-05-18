<script lang="ts">
import { defineComponent } from 'vue'
import type { Item } from '@/models/Item'
import { useIsMobile } from '@/composables/useIsMobile'
import { useIsTablet } from '@/composables/useIsTablet'
import navBar from '@/components/UIElements/navBar.vue'
import imageCarousel from '@/components/productDetails/imageCarousel.vue'
import productInfo from '@/components/productDetails/productInfo.vue'
import sellerInfo from '@/components/productDetails/sellerInfo.vue'
import productDescription from '@/components/productDetails/productDescription.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import productsCarousel from '@/components/marketFront/productsCarousel.vue'
import productInfoHeader from '@/components/productDetails/productInfoHeader.vue'

export default defineComponent({
  components: {
    navBar,
    imageCarousel,
    productInfo,
    productDescription,
    productsCarousel,
    footerComponant,
    productInfoHeader
  },
  data() {
    return {
      items: [] as Item[],
      item: {} as Item
    }
  },
  watch: {
    $route() {
      this.fetchItem()
    }
  },
  methods: {
    async fetchApi() {
      await this.$axios
        .get('/api/inventory/items/')
        .then((response) => {
          this.items = response.data.results || []
          console.log(response)
        })
        .catch(() => {
          console.error('Failed to fetch items')
        })
    },
    async fetchItem() {
      const item_id = this.$route.params.id
      await this.$axios
        .get(`/api/inventory/items/${item_id}/`)
        .then((response) => {
          this.item = response.data.data
          console.log(this.item)
        })
        .catch(() => {
          console.error('Failed to fetch item')
        })
    }
  },

  mounted() {
    this.fetchApi()
    this.fetchItem()
  },
  setup() {
    const { isMobile } = useIsMobile()
    const { isTablet } = useIsTablet()

    return { isMobile, isTablet }
  }
})
</script>
<template>
  <navBar />

  <main class="max-width padded">
    <div class="product-details-container">
      <productInfoHeader :item="item" v-if="isMobile" />
      <div class="image-carousel-wrapper">
        <imageCarousel :images="item.images" />
        <!-- <sellerInfo :item="item" v-if="isTablet" /> -->
      </div>
      <div class="product-info-wrapper">
        <product-info :item="item" />
      </div>
    </div>
    <productDescription :description="item.description || ''" />
    <productsCarousel :items="items" :seeMore="false">
      <span class="carousel-header">{{ $t('product.SuggestedProducts') }}: </span>
    </productsCarousel>
  </main>

  <footerComponant />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px auto;
  width: 100%;
}

.product-details-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: nowrap;
  width: 100%;
}

.product-info-wrapper {
  width: 100%;
}

.image-carousel-wrapper {
  width: 100%;
  min-width: 50%;
  max-width: 760px;
}

.carousel-header {
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
}

@media (max-width: 1000px) {
  .image-carousel-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .padded {
    padding: 0 40px;
  }
}

@media (max-width: 848px) {
  .image-carousel-wrapper {
    min-width: 0;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .padded {
    padding: 0 20px;
  }

  .image-carousel-wrapper,
  .product-info-wrapper {
    flex: 1 1 100%;
  }

  .product-details-container {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
