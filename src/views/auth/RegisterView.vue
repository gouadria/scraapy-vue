<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, UserType } from '@/store/auth'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import UserTypeTabs from '@/components/new/auth/UserTypeTabs.vue'
import IndividualForm from '@/components/new/auth/IndividualForm.vue'
import BusinessForm from '@/components/new/auth/BusinessForm.vue'
import Button from '@/components/new/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const userType = ref<UserType>('individual')
const isRegistering = ref(false)
const registrationError = ref('')
const showForm = ref(false)

// Handle user type change
function changeUserType(type: UserType) {
  userType.value = type
  showForm.value = true
}

// Handle form submission
async function handleRegistration(formData: any) {
  try {
    isRegistering.value = true
    registrationError.value = ''
    
    // Set registration data in store
    authStore.setRegistration({
      userType: userType.value,
      ...formData
    })
    
    // Register user
    const success = await authStore.registerUser()
    console.log(success)
    if (success) {
      // Redirect to login
      router.push('/auth/login')
    } else {
      registrationError.value = 'Registration failed. Please try again.'
    }
  } catch (error) {
    console.error('Registration error:', error)
    registrationError.value = 'An error occurred during registration. Please try again.'
  } finally {
    isRegistering.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <button 
        @click="router.push('/auth/login')" 
        class="flex items-center text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
      >

        <svg v-if="this.$i18n.locale == 'en'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <svg v-if="this.$i18n.locale == 'ar'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 19.5L15.75 12 8.25 4.5" />
        </svg>
        {{ $t('auth.BackToLogin') }}
      </button>
      
      <div class="auth-header">
        <h1 class="auth-title">{{ $t('auth.signupTitle') }}</h1>
        <p class="auth-subtitle">{{ $t('auth.chooseTypeAccount') }}</p>
      </div>
      
      <UserTypeTabs
        :selected-type="userType"
        @change="changeUserType"
      />
      
      <div v-if="showForm" class="transition-all duration-300">
        <IndividualForm 
          v-if="userType === 'individual'"
          @submit="handleRegistration"
          :is-submitting="isRegistering"
        />
        
        <BusinessForm
          v-else
          @submit="handleRegistration"
          :is-submitting="isRegistering"
        />
        
        <div v-if="registrationError" class="mt-4 text-center text-error-500 text-sm">
          {{ registrationError }}
        </div>
        
        <div class="auth-footer">
          <p>
            {{ $t('auth.alreadyHaveAccount') }}
            <router-link to="/auth/login" class="auth-footer-link">{{ $t('auth.login') }}</router-link>
          </p>
        </div>
      </div>
      
      <div v-else class="text-center text-neutral-500 mt-6">
        {{ $t('auth.pleaseSelectType') }}
      </div>
    </div>
  </div>
</template>