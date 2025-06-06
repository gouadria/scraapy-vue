<template>
  <div class="left-section">
    <h1 class="page-title">{{ t('selling_scrap.knowYouBetter') }}</h1>
    <p class="page-description">{{ t('selling_scrap.dKnowYouBetter') }}</p>
    
    <div 
      class="option-card" 
      :class="selectedType === 'individual' ? 'selected' : 'unselected'"
      @click="selectType('individual')"
    >
      <div class="option-icon" :class="t('auth.lang') == 'ar' ? 'margin-left11' : 'margin-right11'">👤</div>
      <span 
        class="option-text"
        :class="selectedType === 'individual' ? 'selected' : 'unselected'"
      >
        {{ t('selling_scrap.individual') }}
      </span>
      <div 
        class="checkbox"
        :class="[
          selectedType === 'individual' ? 'selected' : 'unselected',
          { 'margin-right' : $t('auth.lang') === 'ar' },
          { 'margin-left' : $t('auth.lang') !== 'ar' }
        ]"
      >
        <span v-if="selectedType === 'individual'" class="check-icon">✓</span>
      </div>
    </div>
    
    
   <button 
  class="next-button" 
  :class="{ 'active': selectedType }"
  :disabled="!selectedType"
  @click="handleNextClick"
>
  <span class="next-button-text" :class="t('auth.lang') == 'ar' ? 'margin-left8' : 'margin-right8'">{{ t('selling_scrap.next') }}</span>
  <span class="next-icon" v-if="t('auth.lang') == 'en'">→</span>
  <span class="next-icon" v-if="t('auth.lang') == 'ar'">←</span>
</button>

    
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserType } from '@/types';
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const router = useRouter();



const emit = defineEmits<{
  (e: 'user-type-selected', userType: UserType): void
}>();

const selectedType = ref<UserType | null>(null);
const errorMessage = ref('');

const selectType = (type: UserType) => {
  selectedType.value = type;
  errorMessage.value = '';
};

const handleNextClick = () => {
  if (selectedType.value) {
    localStorage.setItem('user_type', selectedType.value);

    emit('user-type-selected', selectedType.value);
    router.push('/scrap-category'); // ✅ utilise router
  } else {
    errorMessage.value = 'Must choose your type of user';
  }
};

</script>

<style scoped>
.left-section {
  width: 50%;
  padding: 50px 130px 50px 80px
}

.page-title {
  font-size: 30px;
  font-weight: 600;
  line-height: 37px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.page-description {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.option-card {
  height: 64px;
  width: 450px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid 
}

.option-card.selected {
  border: 1px solid #16b277;
  background-color: #edfcf3;
}

.option-card.unselected {
  background-color: white;
  border: 1px solid gainsboro;
}

.option-card.unselected:hover {
  border-color: #b0b0b0;
}

.option-icon {
  font-size: 20px;
}

.option-text {
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.option-text.selected {
  color: #032b1f;
}

.option-text.unselected {
  color: var(--text-secondary);
}

.checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro
}

.margin-left{
  margin-left: auto;
}

.margin-right{
  margin-right: auto;
}

.margin-left8{
  margin-left: 8px;
}

.margin-right8{
  margin-right: 8px;
}

.margin-left11{
  margin-left: 11px;
}

.margin-right11{
  margin-right: 11px;
}

.checkbox.selected {
  background-color: #16b277;
  border: 1px solid #16b277;
  color: white;
}

.checkbox.unselected {
  border: 1px solid gainsboro;
}

.check-icon {
  color: white;
  font-size: 14px;
}

.next-button {
  background-color: #16b277;
  border: 1px solid #16b277;
  border-radius: 8px;
  height: 44px;
  width: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  transition: background-color 0.2s ease;
}

.next-button:hover {
  background-color: #0e9a62;
}

.next-button-text {
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: white;
  margin-right: 8px;
}

.next-icon {
  color: white;
}

.error-message {
  color: #ff3b30;
  font-weight: 600;
  margin-top: 10px;
}

@media (max-width: 1200px) {
  .left-section {
    width: 100%;
    padding: 15px;
    margin-bottom: 50px;
  }
  
  .option-card {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 24px;
    line-height: 30px;
  }
  
  .option-card {
    height: auto;
    padding: 15px 20px;
  }
}
.next-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  border-color: #ccc;
}

.next-button.active {
  background-color: #16b277;
  border: 1px solid #16b277;
}

</style>