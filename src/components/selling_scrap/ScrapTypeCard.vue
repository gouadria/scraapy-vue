<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps<{
  type: {
    id: string;
    name: string;
    description: string;
    icon: string;
  }
}>();
</script>

<template>
  <div class="scrap-type-card">
    <div class="icon-container" :class="type.id">
      <img :src="type.icon" alt="icon" width="36" height="36" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ t('auth.lang') == 'en' ? type.name : type.name_ar }}</h3>
      <p class="card-description">{{ type.description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Garde ton CSS tel quel */
.scrap-type-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
}

.scrap-type-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
}

.card-content {
  flex: 1;
}

.card-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

/* Tu peux garder tes classes colorées si tu veux */
</style>

