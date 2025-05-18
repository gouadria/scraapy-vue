<!-- gridLayout.vue -->
<script lang="ts">
import { defineComponent } from 'vue'
import ItemCard from '@/components/UIElements/ItemCard.vue'
import type { Item } from '@/models/Item'

export default defineComponent({
  name: 'gridLayout',
  components: {
    ItemCard
  },
  props: {
    items: {
      type: Object as () => Item[],
      required: true
    }
  }
})
</script>

<template>
  <div class="grid-layout max-width">
    <ItemCard
      type="product"
      v-for="item in items.filter((i) => i !== null && i !== undefined)"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  gap: var(--carousel-gap, clamp(8px, calc(1.11vw + 4px), 20px));
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
}

.grid-layout .item {
  width: 100%;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
