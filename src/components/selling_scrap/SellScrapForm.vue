<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import ProgressBar from '@/components/selling_scrap/ProgressBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const progress = ref(90);
const selectedBank = ref('');
const accountHolderName = ref('');
const ibanNumber = ref('');

const banks = ref([
  'Al-Rajhi Bank',
  'Saudi National Bank',
  'Riyad Bank',
  'Al-Ahli Bank',
  'Emirates NBD',
  'HSBC Saudi Arabia'
]);

// Sauvegarder automatiquement dans localStorage à chaque changement
watchEffect(() => {
  const bankData = {
    selectedBank: selectedBank.value,
    accountHolderName: accountHolderName.value,
    ibanNumber: ibanNumber.value
  };

  localStorage.setItem('bankInfo', JSON.stringify(bankData));
});

const goToPrevious = () => {
  router.back();
  console.log('Navigate to previous step');
};

const goToNext = () => {
     router.push({
      path: '/sell-scrap-confirmation',
      
    });
  console.log('Navigate to next step');
};
</script>

<template>
  <div class="sell-scrap-container">
    <h1 class="page-title">Sell Scrap</h1>
    
    <ProgressBar :progress="progress" />
    
    <div class="form-card">
      <div class="form-header">
        <div class="iban-icon">
          <span>💳</span>
        </div>
        <div class="iban-text">
          <p>Provide your <strong>IBAN</strong> Number to receive money</p>
        </div>
      </div>
      
      <form @submit.prevent="goToNext">
        <div class="form-group">
          <label for="bank">Bank Name</label>
          <div class="select-wrapper">
            <select id="bank" v-model="selectedBank">
              <option v-for="bank in banks" :key="bank" :value="bank">{{ bank }}</option>
            </select>
            <div class="select-arrow">▼</div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="accountHolder">Account Holder Full Name</label>
          <input 
            type="text" 
            id="accountHolder" 
            v-model="accountHolderName" 
            autocomplete="name"
          />
        </div>
        
        <div class="form-group">
          <label for="iban">IBAN Number</label>
          <input 
            type="text" 
            id="iban" 
            v-model="ibanNumber" 
            autocomplete="off"
          />
        </div>
        
        <div class="form-actions">
          <button type="button" class="button-secondary" @click="goToPrevious">
            <span class="icon">←</span> Previous
          </button>
          <button type="submit" class="button-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>
.sell-scrap-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-top: 24px;
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.iban-icon {
  width: 40px;
  height: 40px;
  background-color: var(--neutral-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.iban-text p {
  font-size: 15px;
  color: var(--neutral-700);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--neutral-600);
  margin-bottom: 8px;
}

input, select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--neutral-300);
  border-radius: 8px;
  font-size: 15px;
}

.select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: var(--neutral-500);
}

select {
  appearance: none;
  padding-right: 40px;
  background-color: white;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
}

.button-secondary {
  background-color: var(--neutral-100);
  color: var(--neutral-700);
  border: 1px solid var(--neutral-300);
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-secondary:hover {
  background-color: var(--neutral-200);
}

.button-primary {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button-primary:hover {
  background-color: var(--primary-dark);
}

.icon {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    gap: 16px;
  }
  
  .button-secondary, .button-primary {
    width: 100%;
    justify-content: center;
  }
}
</style>