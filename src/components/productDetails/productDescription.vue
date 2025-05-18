<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductDescription',
  props: {
    description: {
      type: String,
      required: true
    }
  }
})
</script>
<template>
  <div class="product-description-container">
    <h1>{{ $t('product.Description') }}:</h1>
    <p>
      {{ description }}
    </p>
  </div>
</template>
<style scoped>
.product-description-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.product-description-container h1 {
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
}

.product-description-container p {
  color: var(--Dark-700, #4f4f4f);
  text-align: justify;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
</style>
