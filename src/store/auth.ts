import type { ActionContext } from 'vuex'
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

export interface Login2State {
  credentials: AuthCredentials | null
  otp: string
  registration: UserRegistration
  token: string | null
  user: any | null
  expiry: string | null
}

const state: Login2State = {
  credentials: null,
  otp: '',
  registration: {
    userType: 'individual',
    email: '',
    phone: '',
  },
  token: null,
  user: null,
  expiry: null,
}

const getters = {
  isLoggedIn: (state: Login2State) => !!state.token,
}

const mutations = {
  SET_CREDENTIALS(state: Login2State, payload: AuthCredentials) {
    state.credentials = payload
  },
  SET_OTP(state: Login2State, otp: string) {
    state.otp = otp
  },
  SET_REGISTRATION(state: Login2State, data: Partial<UserRegistration>) {
    state.registration = { ...state.registration, ...data }
  },
  SET_TOKEN(state: Login2State, token: string) {
    state.token = token
  },
  SET_USER(state: Login2State, user: any) {
    state.user = user
  },
  SET_EXPIRY(state: Login2State, expiry: string) {
    state.expiry = expiry
  },
}

const actions = {
  async setCredentials({ commit }: ActionContext<Login2State, any>, newCredentials: AuthCredentials) {
    commit('SET_CREDENTIALS', newCredentials)
    await axios.post('/api/otp/login/', { email_or_phone: newCredentials.emailOrPhone })
  },

  setOtp({ commit }: ActionContext<Login2State, any>, newOtp: string) {
    commit('SET_OTP', newOtp)
  },

  setRegistration({ commit }: ActionContext<Login2State, any>, data: Partial<UserRegistration>) {
    commit('SET_REGISTRATION', data)
  },

  async verifyOtp({ commit, state }: ActionContext<Login2State, any>) {
    try {
      const response = await axios.post('/api/otp/verify-otp-token/', {
        phone: state.credentials?.emailOrPhone,
        otp: state.otp,
      })

      if (response.status === 200) {
        commit('SET_TOKEN', response.data.token)
        commit('SET_EXPIRY', response.data.expiry)
        commit('SET_USER', response.data.user)
        console.log('Token:', response.data.token)
        return true
      }

      return false
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  },

  async registerUser({ state }: ActionContext<Login2State, any>): Promise<boolean> {
    try {
      const response = await axios.post('/api/users/', {
        name: state.registration.userType === 'business' ? state.registration.businessName : state.registration.fullName,
        email: state.registration.email,
        contact_number: state.registration.phone,
        password: '11111111',
        user_type: state.registration.userType,
      })

      console.log('Register response:', response)
      return response.status === 201
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  },

  async requestOtp({ state }: ActionContext<Login2State, any>): Promise<boolean> {
    console.log('OTP requested for:', state.credentials)
    return true
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
