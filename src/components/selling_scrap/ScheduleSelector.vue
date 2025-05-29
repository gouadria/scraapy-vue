<script setup lang="ts">
import { ref } from 'vue';

const selectedOption = ref('now');

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const selectOption = (option: string) => {
  selectedOption.value = option;
};
</script>

<template>
  <div class="schedule-selector">
    <div class="schedule-header">
      <div class="schedule-icon">🕒</div>
      <h2>{{ t('selling_scrap.whatTimeShould') }}</h2>
    </div>
    
    <div class="schedule-options">
      <button 
        class="schedule-option" 
        :class="{ active: selectedOption === 'now' }"
        @click="selectOption('now')"
      >
        {{ t('selling_scrap.now') }}
      </button>
      
      <button 
        class="schedule-option" 
        :class="{ active: selectedOption === 'later' }"
        @click="selectOption('later')"
      >
        {{ t('selling_scrap.scheduleForLater') }}
      </button>
    </div>
    
    <div v-if="selectedOption === 'later'" class="date-time-picker">
      <div class="date-picker">
        <label for="date">{{ t('selling_scrap.date') }}</label>
        <input type="date" id="date" min="2025-01-01" />
      </div>
      
      <div class="time-picker">
        <label for="time">{{ t('selling_scrap.time') }}</label>
        <input type="time" id="time" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-selector {
  margin-bottom: 24px;
}

.schedule-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.schedule-icon {
  font-size: 20px;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.schedule-options {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.schedule-option {
  padding: 10px 16px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background-color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.schedule-option.active {
  background-color: #00A67E;
  color: white;
  border-color: #00A67E;
}

.date-time-picker {
  display: flex;
  gap: 16px;
  max-width: 550px;
  animation: fadeIn 0.3s ease;
}

.date-picker, .time-picker {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #666;
}

input[type="date"], input[type="time"] {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>