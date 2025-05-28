<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import navBar from '@/components/UIElements/navBar.vue';
import footerComponant from '@/components/UIElements/footerComponant.vue';
import ProgressBar from '@/components/selling_scrap/ProgressBar.vue';
import OtpInput from '@/components/selling_scrap/OtpInput.vue';

const route = useRoute();
const router = useRouter();

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const progress = ref(60);

const phone = ref('');
const ready = ref(false); // 👈 Indique si on peut afficher la page

// ✅ Récupération du téléphone
if (route.query.phone) {
  phone.value = route.query.phone as string;
  localStorage.setItem('userPhone', phone.value);
  ready.value = true;
} else {
  const storedPhone = localStorage.getItem('userPhone');
  if (storedPhone) {
    phone.value = storedPhone;
    ready.value = true;
  } else {
    alert('Phone number is missing');
    router.push('/');
  }
}

const otpValue = ref(['', '', '', '', '', '']);
const isOtpComplete = computed(() => otpValue.value.every(digit => digit !== ''));

function handleOtpChange(otp: string[]) {
  otpValue.value = otp;
}

async function handleNext() {
  if (!isOtpComplete.value) {
    alert('Please enter the complete OTP');
    return;
  }

  const otpCode = otpValue.value.join('');

  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + 'api/otp/verify/', {
      phone: phone.value,
      otp: otpCode
    });

    console.log('OTP verified:', response.data);
    router.push('/location-picker'); // 🔁 Redirige vers l’étape suivante

  } catch (error: any) {
    console.error('OTP verification failed:', error);
    alert('Invalid OTP. Please try again.');
  }
}

function handlePrevious() {
  router.back();
}

function resendOtp() {
  alert('New OTP has been sent to your mobile number');
}
</script>

<template>
  <div class="app">
    <navBar />
    <main class="main-content">
      <div class="scrap-selection">
        <div class="selection-header">
          <h1 class="selection-title">{{ t('selling_scrap.sell_scrap') }}</h1>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ progress }}%</span>
          </div>
        </div>

        <div class="card">
          <div class="instructions">
            <label class="checkbox-label">
              <input type="checkbox" checked disabled />
              <span>Enter the <strong>OTP</strong> received on mobile number</span>
            </label>
          </div>

          <OtpInput @update="handleOtpChange" />

          <div class="resend-text">
            Didn't receive the OTP? 
            <button class="resend-btn" @click="resendOtp">Click to resend</button>
          </div>

        </div>

        <div class="nav-buttons">
          <button class="button button-previous" @click="handlePrevious">
            <span v-if="t('auth.lang') == 'en'" class="button-icon">←</span>
            <span v-if="t('auth.lang') == 'ar'" class="button-icon">→</span>
            {{ t('selling_scrap.previous') }}
          </button>
          <button class="button button-next" :disabled="!isOtpComplete" 
              :class="{ disabled: !isOtpComplete }"
              @click="handleNext">
            {{ t('selling_scrap.next') }}
          </button>
        </div>
        
      </div>
    </main>
    <footerComponant />
  </div>
</template>

<style>
.scrap-selection {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .selection-header {
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .selection-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .progress-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .progress-bar {
    width: 200px;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: #16b277;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }

  .selection-content {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 32px;
  }

  .step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #16b277;
    color: white;
  }

  .step-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .accent {
    color: #16b277;
  }

  .scrap-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 992px) {
    .scrap-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .scrap-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .progress-bar {
      width: 150px;
    }
  }

  @media (max-width: 576px) {
    .scrap-grid {
      grid-template-columns: 1fr;
    }
    
    .selection-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .progress-container {
      width: 100%;
    }
    
    .progress-bar {
      flex: 1;
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

  /* old */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

navBar, footerComponant {
  width: 100%;
}

.page-wrapper {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  color: #222;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-progress {
  display: flex;

  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
}

.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
  padding: 30px 25px;
}

.instructions {
  margin-bottom: 18px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #444;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  accent-color: #22c55e;
  cursor: not-allowed;
}

.checkbox-label strong {
  color: #22c55e;
  font-weight: 700;
}

.resend-text {
  margin-top: 12px;
  font-size: 0.9rem;
  color: #666;
}

.resend-btn {
  background: none;
  border: none;
  color: #22c55e;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-left: 5px;
  text-decoration: underline;
  font-size: 0.9rem;
}

.resend-btn:hover {
  color: #16a34a;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 28px;
}

.btn {
  padding: 10px 28px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #22c55e;
  color: white;
}

.btn-primary:hover:not(.disabled) {
  background-color: #16a34a;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #555;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>