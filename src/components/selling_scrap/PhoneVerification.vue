<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const emit = defineEmits(['next', 'previous'])
const router = useRouter()

const mobileNumber = ref('')
const highlightMobile = ref(false)

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const validateMobile = () => {
  const valid = mobileNumber.value.length >= 10
  console.log('validateMobile:', valid, 'mobileNumber:', mobileNumber.value)
  return valid
}

const sendOtp = async () => {
  console.log('sendOtp called')

  if (!validateMobile()) {
    console.log('Validation failed - either mobile invalid or checkbox not checked')
    alert('Please enter a valid 10-digit mobile number and accept the terms.')
    return
  }

  try {
    console.log('Sending OTP to:', mobileNumber.value)
    const response = await axios.post(import.meta.env.VITE_API_URL + 'api/otp/send/', {
      phone: mobileNumber.value
    })
    console.log('OTP sent successfully:', response.data)

    if (response.data.message?.toLowerCase().includes('otp sent')) {
      console.log('Redirecting to /otp')
      router.push({ path: '/otp', query: { phone: mobileNumber.value } })

      emit('next') // Émet l’événement next après succès
    } else {
      alert('OTP not sent. Please try again.')
    }

  } catch (error) {
    console.error('Error sending OTP:', error)
    alert('Failed to send OTP. Please try again.')
  }
}
</script>

<template>
  <div class="form-card">
    <div class="form-group verification-form">
      <div class="checkbox-container">
        <label for="mobileVerification">
          {{ t('selling_scrap.enterYourMobile') }} <span class="highlight"></span>
        </label>
      </div>

      <div class="input-group">
        <label for="mobile">{{ t('selling_scrap.phoneNumber') }}</label>
        <input
          type="tel"
          id="mobile"
          v-model="mobileNumber"
          placeholder="05xxxxxxxx"
          :class="{ 'highlight-input': highlightMobile }"
          @focus="highlightMobile = true"
          @blur="highlightMobile = false"
        />
      </div>

      <p class="info-text">
        {{ t('selling_scrap.mobileNumberVerify') }}
      </p>
    </div>
  </div>

  <div class="nav-buttons">
    <button class="button button-previous" @click="$emit('previous')">
      <span v-if="t('auth.lang') == 'en'" class="button-icon">←</span>
      <span v-if="t('auth.lang') == 'ar'" class="button-icon">→</span>
      {{ t('selling_scrap.previous') }}
    </button>
    <button class="button button-next" @click="sendOtp" 
    :disabled="!validateMobile()">
      {{ t('selling_scrap.next') }}
    </button>
  </div>
</template>


<style scoped>
  .verification-form {
    max-width: 600px;
  }

  .form-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #1a202c;
  }

  .form-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 24px;
    margin-bottom: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .checkbox-container input[type="checkbox"] {
    margin-top: 4px;
  }

  .checkbox-container label {
    font-size: 15px;
    color: #4a5568;
  }

  .highlight {
    color: #10B981;
    font-weight: 600;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-group label {
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
  }

  .input-group input {
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s ease;
  }

  .input-group input:focus {
    outline: none;
    border-color: #10B981;
  }

  .highlight-input {
    border-color: #10B981 !important;
  }

  .info-text {
    font-size: 13px;
    color: #718096;
    margin: 0;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: #10B981;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #059669;
  }

  .btn-primary:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: white;
    color: #4a5568;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background-color: #f7fafc;
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