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
  
  // In a real app, these would connect to an API
  async function verifyOtp(): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    await axios.post('/api/otp/verify-otp-token/', { phone: +966557780674, otp: otp.value }).then((e) => {
      console.log(e)
    })

    return false
  }
  
  async function registerUser(): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    await axios.post('/api/users/', { name: registration.value.userType == "business" ? registration.value.businessName : registration.value.fullName, email: registration.value.email, contact_number: registration.value.phone, password: '123456789', user_type: registration.value.userType}).then((response) => {
      console.log(response.status)
      if(response.status == 201){
        console.log('done')
        return true
      }else{
        console.log('error')
        return false
      }
    }).then((result) => {
      console.log('Result:', result) // result is either true or false
    }).catch((error) => {
      console.error('Network or server error:', error)
      return false
    })

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