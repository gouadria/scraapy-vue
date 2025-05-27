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
  <div class="layout">
    <navBar />

    <main class="page-wrapper">
      <div class="header-progress">
        <h1 class="page-title">Sell Scrap</h1>
        <ProgressBar :percentage="60 " />
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

        <div class="buttons-container">
          <button class="btn btn-secondary" @click="handlePrevious">← Previous</button>
          <button 
            class="btn btn-primary" 
            :disabled="!isOtpComplete" 
            :class="{ disabled: !isOtpComplete }"
            @click="handleNext"
          >
            Next
          </button>
        </div>
      </div>
    </main>

    <footerComponant />
  </div>
</template>

<style>

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