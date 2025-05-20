import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/axios'
import { computed } from 'vue'

export type UserType = 'individual' | 'business'

export interface AuthCredentials {
  emailOrPhone: string
  isEmail: boolean
}

export interface UserRegistration {
  userType: UserType
  fullName?: string
  email: string
  phone: string
  businessName?: string
  businessType?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const credentials = ref<AuthCredentials | null>(null)
  const otp = ref<string>('')
  const registration = ref<UserRegistration>({
    userType: 'individual',
    email: '',
    phone: '',
  })
  const token = ref<string | null>(null)
  const user = ref<any | null>(null)
  const expiry = ref<string | null>(null)

  // Simulated getters
  const isLoggedIn = computed(() => !!token.value)
  
  // Actions
  async function setCredentials(newCredentials: AuthCredentials) {
    credentials.value = newCredentials
    await axios.post('/api/otp/login/', { email_or_phone: newCredentials.emailOrPhone })
  }
  
  function setOtp(newOtp: string) {
    otp.value = newOtp
  }
  
  function setRegistration(data: Partial<UserRegistration>) {
    registration.value = { ...registration.value, ...data }
  }

  async function verifyOtp() {
    try {
      const response = await axios.post('/api/otp/verify-otp-token/', {
        phone: credentials.value?.emailOrPhone,
        otp: otp.value
      })

      if (response.status === 200) {
        // ✅ Update state directly instead of using commit
        token.value = response.data.token
        expiry.value = response.data.expiry
        user.value = response.data.user
        console.log('Token:', token.value)
        return true
      }

      return false
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }
  
  async function registerUser(): Promise<boolean> {
    try {
      const response = await axios.post('/api/users/', {
        name: registration.value.userType === 'business' ? registration.value.businessName : registration.value.fullName,
        email: registration.value.email,
        contact_number: registration.value.phone,
        password: '123456789',
        user_type: registration.value.userType
      })

      console.log('Register response:', response)
      return response.status === 201
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }
  
  async function requestOtp(): Promise<boolean> {
    console.log('OTP requested for:', credentials.value)
    return true
  }
  
  return {
    credentials,
    otp,
    registration,
    isLoggedIn,
    token,
    user,
    expiry,
    setCredentials,
    setOtp,
    setRegistration,
    verifyOtp,
    registerUser,
    requestOtp
  }
})