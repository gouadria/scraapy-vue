<script lang="ts">
import { defineComponent } from 'vue'
import { Item } from '@/models/Item'

export default defineComponent({
  name: 'productInfoHeader',

  props: {
    item: {
      type: Object as () => Item,
      required: true
    }
  },
  methods: {
    backButton() {
      this.$router.back()
    }
  }
})
</script>
<template>
  <div class="info-header">
    <div class="header">
      <h3>{{ $i18n.locale === 'ar'? item.category?.name_ar : item.category?.name }}</h3>
      <div class="back" @click="backButton">
        {{ $t('listings.back') }}
        <img src="@/assets/svg-icons/chevron-left.svg?url" alt="back icon" />
      </div>
      <!-- <img src="@/assets/svg-icons/share.svg?url" alt="share product" /> -->
    </div>
    <div class="name-id">
      <h1>{{ item.name }}</h1>
      <!-- I have disabled it until we can discuss it with the back-end team -->
      <!-- <p>{{ $t('product.ListingID') }}: {{ item.id }}</p> -->
    </div>
  </div>
</template>

<style scoped>
.info-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--Dark-100, #e7e7e7);
  padding-bottom: 10px;
}

.header h3 {
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
  color: #0b3241;
}

.name-id {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name-id h1 {
  color: #121212;
  font-size: clamp(0.875rem, 0.6667rem + 0.9259vw, 1.5rem);
  font-weight: 500;
  line-height: 32px;
}

.name-id p {
  color: #6d6d6d;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
.back {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
html[dir='ltr'] .back img {
  transform: rotate(180deg);
}
@media (max-width: 768px) {
  .info-header {
    gap: 10px;
  }

  .name-id {
    gap: 5px;
  }

  .name-id h1 {
    line-height: 20px;
  }
}
</style>
