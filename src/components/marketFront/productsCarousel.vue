<script lang="ts">
import { defineComponent } from 'vue'
import xCarousel from '@/components/UIElements/xCarousel.vue'
import ItemCard from '@/components/UIElements/ItemCard.vue'
import type { Item } from '@/models/Item'

export default defineComponent({
  name: 'productsCarousel',
  components: {
    xCarousel,
    ItemCard
  },
  props: {
    items: {
      type: Object as () => Item[],
      required: true
    },
    seeMore: {
      type: Boolean,
      default: true
    }
  },
  emits: ['see-more-clicked'],
  methods: {
    handleSeeMoreClick() {
      this.$emit('see-more-clicked', this.items)
    }
  }

  // TODO: Add filter logic for product type
})
</script>

<template>
  <div class="products-carousel">
    <div class="products-carousel-header">
      <h1>
        <slot>Products</slot>
      </h1>
      <button class="see-more-btn" v-if="seeMore" @click="handleSeeMoreClick">
        <p>{{ $t('btns.seeMore') }}</p>
        <!-- chevron right svg -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 20 20"
          fill="none"
          :class="{ 'rtl-chevron': $i18n.locale === 'ar' }"
        >
          <path
            d="M8.33337 13.9991L11.6667 10.6658L8.33337 7.33246"
            stroke="#0B3241"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="products-carousel-container">
      <xCarousel state="navs">
        <ItemCard type="product" v-for="item in items" :key="item.id" :item="item" />
      </xCarousel>
    </div>
  </div>
</template>

<style scoped>
.products-carousel {
  display: flex;
  flex-direction: column;
  /* margin-top: 2rem; */
}

.products-carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.products-carousel-header h1 {
  color: var(--Dark-950, #121212);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

.products-carousel-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.see-more-btn {
  display: flex;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
}

.see-more-btn p {
  color: #0b3241;
  font-size: 14px;
  font-weight: 600;
}

.rtl-chevron {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .products-carousel {
    margin-top: 0;
  }
}
</style>
