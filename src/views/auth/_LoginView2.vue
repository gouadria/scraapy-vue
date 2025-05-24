<script setup lang="ts">

import '@/style.css'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import LoginMethodTabs from '@/components/new/auth/LoginMethodTabs.vue'
import TextInput from '@/components/new/ui/TextInput.vue'
import Button from '@/components/new/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const loginMethod = ref<'email' | 'phone'>('email')

// Form validation schema for email
const emailSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required')
})

// Form validation schema for phone
const phoneSchema = yup.object({
  phone: yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required')
})

// Setup form with dynamic schema
const { handleSubmit, resetForm } = useForm({
  validationSchema: computed(() => loginMethod.value === 'email' ? emailSchema : phoneSchema)
})

// Form fields
const { value: emailValue, errorMessage: emailError } = useField<string>('email')
const { value: phoneValue, errorMessage: phoneError } = useField<string>('phone')

// Handle login method change
function changeLoginMethod(method: 'email' | 'phone') {
  loginMethod.value = method
  resetForm()
}

// Handle form submission
const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    
    // Set credentials in store
    authStore.setCredentials({
      emailOrPhone: loginMethod.value === 'email' ? values.email : values.phone,
      isEmail: loginMethod.value === 'email'
    }).then(async () => {
        // Request OTP
        await authStore.requestOtp()
    
    
        // Navigate to verification page
        router.push('/auth/otp')
    })
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">{{ $t('auth.loginTitle') }}</h1>
        <p class="auth-subtitle">{{ $t('auth.welcomeBack') }}</p>
      </div>
      
      <LoginMethodTabs
        :selected-method="loginMethod"
        @change="changeLoginMethod"
      />
      
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div v-if="loginMethod === 'email'">
          <TextInput
            v-model="emailValue"
            :label="$t('auth.email')"
            placeholder="your@email.com"
            type="email"
            :error="emailError"
            autocomplete="email"
          />
        </div>
        
        <div v-else>
          <TextInput
            v-model="phoneValue"
            :label="$t('auth.phone')"
            placeholder="+966xxxxxxxxx"
            type="tel"
            :error="phoneError"
            autocomplete="tel"
          />
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          :loading="isLoading"
          full-width
        >
          {{ $t('auth.loginButton') }}
        </Button>
      </form>
      
      <div class="auth-footer">
        <p>
          {{ $t('auth.noAccount') }}
          <router-link to="/auth/register" class="auth-footer-link">{{ $t('auth.signUp') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>