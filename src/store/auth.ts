import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/axios'

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
  crNumber?: string
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
  
  // Getters
  const isLoggedIn = computed(() => false) // This would connect to actual auth state
  const credentialType = computed(() => credentials.value?.isEmail ? 'email' : 'phone')
  
  // Actions
  function setCredentials(newCredentials: AuthCredentials) {
    credentials.value = newCredentials
  }
  
  function setOtp(newOtp: string) {
    otp.value = newOtp
  }
  
  function setRegistration(data: Partial<UserRegistration>) {
    registration.value = { ...registration.value, ...data }
  }
  
  // In a real app, these would connect to an API
  async function verifyOtp(): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return otp.value === '123456' // For demonstration - in a real app this would verify with backend
  }
  
  async function registerUser(): Promise<boolean> {
    try {
      const response = await axios.post('/api/users/', {
        "name": registration.value.userType === 'business' ? registration.value.businessName : registration.value.fullName,
        "email": registration.value.email,
        "contact_number": registration.value.phone,
        "password": "11111111",
        "user_type": registration.value.userType,
        "business_sub_type": registration.value.businessType,
        "cr_number": registration.value.crNumber,
        "address_line1": "anis",
        "city": "anis",
        "province": "anis",
        "zip_code": "12345",
        "country": "saudi arabia"
      })

      // console.log('Register response:', response)
      return response.status === 201
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }
  
  async function requestOtp(): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('OTP requested for:', credentials.value)
    return true
  }
  
  return {
    credentials,
    otp,
    registration,
    isLoggedIn,
    credentialType,
    setCredentials,
    setOtp,
    setRegistration,
    verifyOtp,
    registerUser,
    requestOtp
  }
})