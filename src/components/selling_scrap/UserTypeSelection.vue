<template>
  <div class="left-section">
    <h1 class="page-title">Let's Get to Know You Better</h1>
    <p class="page-description">
      By letting us know you, we can provide you with a more personalized 
      experience and ensure the pricing fits your specific needs.
    </p>
    
    <div 
      class="option-card" 
      :class="selectedType === 'individual' ? 'selected' : 'unselected'"
      @click="selectType('individual')"
    >
      <div class="option-icon">👤</div>
      <span 
        class="option-text"
        :class="selectedType === 'individual' ? 'selected' : 'unselected'"
      >
        I am an Individual
      </span>
      <div 
        class="checkbox"
        :class="selectedType === 'individual' ? 'selected' : 'unselected'"
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
  <span class="next-button-text">Next</span>
  <span class="next-icon">→</span>
</button>

    
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserType } from '@/types';
import { useRouter } from 'vue-router';


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
  padding: 50px 80px;
  /* padding-right: 50px; */
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
  margin-right: 11px;
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
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro
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
    padding-right: 0;
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