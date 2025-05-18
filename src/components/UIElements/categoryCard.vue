<script lang="ts">
import { defineComponent } from 'vue'
import { CategoryGroup } from '@/models/Category'
import Tr from '@/plugins/i18n/translation'

export default defineComponent({
  name: 'categoryCard',
  props: {
    categoryGroup: {
      type: Object as () => CategoryGroup,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lang() {
      return Tr.currentLanguage
    }
  }
})
</script>

<template>
  <div class="category-card" v-if="categoryGroup.icon">
    <div class="category-card-img" :class="{ small }">
      <img draggable="false" :src="categoryGroup.icon" :alt="categoryGroup.name" />
    </div>
    <div class="category-card-title">
      <p>
        {{ lang === 'ar' ? categoryGroup.name_ar : categoryGroup.name }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  padding: 15px;
  gap: 10px;
  cursor: pointer;
  border-radius: 12px;
  background: var(--Dark-50, #f6f6f6);
  flex-shrink: 0;
}

.category-card-img {
  width: 32px;
  height: 32px;
}

.category-card-img.small {
  min-width: 18px;
  min-height: 18px;
  max-width: 18px;
  max-height: 18px;
}

.category-card-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.category-card-title p {
  color: var(--Blue-950, #0b3241);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

@media (max-width: 768px) {
  .category-card {
    flex-direction: row;
    padding: 8px 10px;
    align-items: center;
    justify-content: center;
  }

  .category-card-title p {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
