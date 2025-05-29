<template>
  <form @submit.prevent="submitForm" class="registration-form">  
    <div class="content-card">
      <div class="success-indicator">
        <div class="checkmark-circle">✓</div>
        <h2>{{ t('selling_scrap.scrapPickupRequested') }}</h2>
      </div>
      
      <div class="message">
        <p>
          {{ t('selling_scrap.dScrapPickupRequested') }}
        </p>
      </div>
      
      <div class="form-group">
        <label for="fullName">{{ t('selling_scrap.fullName') }}</label>
        <div class="input-wrapper">
          <span class="input-icon">👤</span>
          <input 
            type="text" 
            id="fullName" 
            v-model="formData.fullName" 
            :placeholder="t('selling_scrap.enterYourName')"
            :class="{ 'error': formErrors.fullName }"
          />
        </div>
        <span v-if="formErrors.fullName" class="error-message">{{ formErrors.fullName }}</span>
      </div>
      
      <div class="form-group">
        <label for="email">{{ t('selling_scrap.email') }}</label>
        <div class="input-wrapper">
          <span class="input-icon">✉️</span>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            :placeholder="t('selling_scrap.enterYourEmail')"
            :class="{ 'error': formErrors.email }"
          />
        </div>
        <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
      </div>
      
      <div class="form-group checkbox">
        <input 
          type="checkbox" 
          id="terms" 
          v-model="formData.termsAccepted"
          :class="{ 'error': formErrors.termsAccepted }"
        />
        <label for="terms">{{ t('selling_scrap.accept') }} <a href="#" class="terms-link">{{ t('selling_scrap.termsConditions') }}</a></label>
        <span v-if="formErrors.termsAccepted" class="error-message">{{ formErrors.termsAccepted }}</span>
      </div>
    </div>

    <div class="nav-buttons">
      <button class="button button-previous" @click="goToPrevious">
        <span v-if="t('auth.lang') == 'en'" class="button-icon">←</span>
        <span v-if="t('auth.lang') == 'ar'" class="button-icon">→</span>
        {{ t('selling_scrap.previous') }}
      </button>
      <button type="submit" class="button button-next">
        {{ t('selling_scrap.next') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['submit']);

const router = useRouter();

const progressPercent = ref('100%');

const formData = reactive({
  fullName: '',
  email: '',
  termsAccepted: false
});

const formErrors = reactive({
  fullName: '',
  email: '',
  termsAccepted: ''
});

const validateForm = (): boolean => {
  let isValid = true;
  
  // Reset errors
  formErrors.fullName = '';
  formErrors.email = '';
  formErrors.termsAccepted = '';
  
  // Validate name
  if (!formData.fullName.trim()) {
    formErrors.fullName = 'Full name is required';
    isValid = false;
  }
  
  // Validate email
  if (!formData.email.trim()) {
    formErrors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    formErrors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate terms
  if (!formData.termsAccepted) {
    formErrors.termsAccepted = 'You must accept the Terms & Conditions';
    isValid = false;
  }
  
  return isValid;
};

const submitForm = () => {
  if (validateForm()) {
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      termsAccepted: formData.termsAccepted
    };
    
    localStorage.setItem('scrapUserData', JSON.stringify(payload));
    emit('submit', payload); // ← Émet vers le parent

    alert('Account created successfully!');
    goToNext();

    formData.fullName = '';
    formData.email = '';
    formData.termsAccepted = false;
  }
};


const goToPrevious = () => {
  router.back();
  console.log('Navigate to previous step');
};
const goToNext = () => {
     router.push({
      path: '/confirmation',
      
    });
  console.log('Navigate to next step');
};
</script>

<style scoped>
.sell-scrap {
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.progress-container {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: var(--light-gray);
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--primary-light), var(--primary-color));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary-color);
}

.content-card {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.success-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkmark-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--success);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 24px;
}

.success-indicator h2 {
  font-size: 1.4rem;
  color: var(--text-color);
  text-align: center;
}

.message {
  margin-bottom: 2rem;
}

.message p {
  color: var(--secondary-text);
  line-height: 1.6;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  color: var(--secondary-text);
  font-size: 16px;
}

.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 0.75rem;
  border-radius: 4px;
  border: 2px solid var(--border-color);
  outline: none;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.form-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-group input.error {
  border-color: var(--error);
}

.error-message {
  color: var(--error);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.checkbox label {
  margin-bottom: 0;
}

.terms-link {
  color: var(--primary-color);
  text-decoration: underline;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
  border: none;
}

.prev-button {
  background-color: var(--light-gray);
  color: var(--text-color);
}

.prev-button:hover {
  background-color: var(--border-color);
}

.next-button {
  background-color: var(--primary-color);
  color: var(--white);
}

.next-button:hover {
  background-color: var(--primary-dark);
}

@media (max-width: 576px) {
  .content-card {
    padding: 1.5rem;
  }
  
  .success-indicator h2 {
    font-size: 1.2rem;
  }
  
  .message p {
    font-size: 0.9rem;
  }

  .navigation-buttons {
    flex-direction: column;
  }
}

.nav-buttons {
    display: flex;
    justify-content: space-between;
    margin: 32px 0;
  }

  .button {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .button-previous {
    background-color: white;
    color: #333;
    border: 1px solid #ddd;
  }

  .button-previous:hover {
    background-color: #f5f5f5;
  }

  .button-next {
    background-color: #18A77A;
    color: white;
    border: none;
  }

  .button-next:hover {
    background-color: #148f68;
  }

  .button-icon {
    margin: 0 4px;
  }
</style>