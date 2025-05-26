<script setup lang="ts">
import '@/assets/style-auth.css'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import Button from '@/components/new/ui/Button.vue'
import OtpInput from '@/components/new/auth/OtpInput.vue'
import User from '@/store/User'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter()
const authStore = useAuthStore()

const userStore = User
// Redirect if no credentials
onMounted(() => {
  if (!authStore.credentials) {
    router.replace('/auth/login')
  }
})

const credentials = computed(() => authStore.credentials)
const credentialType = computed(() => authStore.credentialType)
const otpCode = ref('')
const isVerifying = ref(false)
const verificationError = ref('')
const resendCooldown = ref(0)
const resendInterval = ref<number | null>(null)

const otp_phone = localStorage.getItem('otp_phone')

// Timer for resend cooldown
function startResendTimer() {
  resendCooldown.value = 30
  resendInterval.value = window.setInterval(() => {
    if (resendCooldown.value > 0) {
      resendCooldown.value--
    } else {
      if (resendInterval.value) {
        clearInterval(resendInterval.value)
        resendInterval.value = null
      }
    }
  }, 1000)
}

// Start timer on component mount
onMounted(() => {
  startResendTimer()
})

// Clean up on component unmount
onUnmounted(() => {
  if (resendInterval.value) {
    clearInterval(resendInterval.value)
  }
})

// Handle OTP verification
async function verifyOtp() {
  if (otpCode.value.length !== 6) {
    verificationError.value = t('auth.enter6')
    return
  }

  try {
    isVerifying.value = true
    verificationError.value = ''
    
    // Set OTP in store
    authStore.setOtp(otpCode.value)
    
    // Verify OTP
    // const success = await authStore.verifyOtp()
    let success = false;
    await userStore.dispatch('verify_otp', {
      phone: otp_phone,
      otp: otpCode.value
    })
      router.push('/marketplace')
  } catch (error) {
    if (error.message === '404') {
      verificationError.value = t('auth.verificationError')
    } else if (error.message === '500' || error.message === 'No response from server') {
      verificationError.value = t('auth.verificationInError')
    }  else {
      // Other errors (like network issues, server errors)
      verificationError.value = t('auth.verificationInError')
    }
  } finally {
    isVerifying.value = false
  }
}

// Resend OTP
async function resendOtp() {
  if (resendCooldown.value > 0) return
  
  try {
    await authStore.requestOtp()
    startResendTimer()
  } catch (error) {
    console.error('Resend OTP error:', error)
  }
}

// Go back to login
function goBackToLogin() {
  router.push('/auth/login')
}
</script>

<template>
  <div>
    <div style="margin-left: auto; margin-right: auto; width: 100%; max-width: 10rem; margin-top: 35px; margin-bottom: 20px;">
      <img @click="router.push({ name: 'home' })" src="@/assets/logo.svg?url" alt="logo" style="width: 160px; height: 66px;" />
    </div>
    <div class="auth-card">
      <button 
        @click="goBackToLogin" 
        class="flex items-center text-neutral-600 hover:text-neutral-900 mb-4 transition-colors">
        <svg v-if="t('auth.lang') == 'en'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <svg v-if="t('auth.lang') == 'ar'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 19.5L15.75 12 8.25 4.5" />
        </svg>
        {{ t('auth.BackToLogin') }}
      </button>
      
      <div class="auth-header">
        <h1 class="auth-title">{{ t('auth.verification') }}</h1>
        <p class="auth-subtitle" v-if="credentials">
          {{ t('auth.WeveSentverificationCodeTo') }} 
          <span class="font-medium">{{ '0' + otp_phone?.slice(4) }}</span>
        </p>
      </div>
      
      <div class="space-y-6">
        <OtpInput v-model="otpCode" @complete="verifyOtp" />
        
        <div v-if="verificationError" class="text-center text-error-500 text-sm">
          {{ verificationError }}
        </div>
        
        <Button 
          variant="primary" 
          :loading="isVerifying" 
          :disabled="otpCode.length !== 6"
          full-width
          @click="verifyOtp"
        >
          {{ t('auth.verify') }}
        </Button>
        
        <div class="text-center">
          <p class="text-sm text-neutral-500 mb-1">{{ t('auth.DidntReceiveTheCode') }}</p>
          <button 
            @click="resendOtp" 
            class="text-primary-500 font-medium text-sm hover:text-primary-600 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
            :disabled="resendCooldown > 0"
          >
            {{ resendCooldown > 0 ? `${t('auth.resendIn')} ${resendCooldown}${t('auth.s')}` : t('auth.resendCode') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>