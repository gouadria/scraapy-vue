<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    logoSrc: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
})
</script>

<template>
  <div class="service-provider">
    <div class="service-provider-img">
      <img class="logo" :src="logoSrc" alt="Service Provider Logo" />
    </div>

    <p class="name">{{ name }}</p>
    <p class="price">{{ $t('Selling.SAR') }} {{ price }}</p>
  </div>
</template>

<style scoped>
.service-provider {
  width: 100%;
  max-width: 172px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--Dark-50, #f6f6f6);
}

.service-provider-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 98px;
}

.service-provider-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.service-provider .name {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.service-provider .price {
  color: var(--Secondary---500, #15b377);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}
</style>
