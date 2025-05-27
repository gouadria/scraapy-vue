<template>
  <div class="rates-ticker">
    <span class="rates-ticker-label">Today's Rates</span>
    <div class="rates-divider"></div>
    <div class="rates-container">
      <span 
        v-for="(rate, index) in rates" 
        :key="index" 
        class="rate-item"
      >
        {{ rate.material }}: <span class="rate-value">SAR {{ rate.value }}/{{ rate.unit }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rate } from '@/types';

defineProps<{
  rates: Rate[]
}>();
</script>

<style scoped>
.rates-ticker {
  background-color: var(--primary-dark);
  height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 80px;
  overflow-x: auto;
  white-space: nowrap;
}

.rates-ticker-label {
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  color: var(--text-light);
  margin-right: 20px;
}

.rates-divider {
  background-color: var(--primary-light);
  width: 1px;
  height: 19px;
  margin: 0 20px;
}

.rates-container {
  display: flex;
  overflow-x: auto;
}

.rate-item {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #edfdfe;
  margin-right: 20px;
}

.rate-value {
  color: var(--success-green);
  font-weight: 400;
  line-height: 20px;
}

@media (max-width: 768px) {
  .rates-ticker {
    padding: 0 20px;
  }
}
</style>