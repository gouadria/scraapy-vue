import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from '@/axios'
import SuccessMessageVue from '@/components/modals/SuccessMessage.vue'

const refreshInterval = 15 * 60 * 1000
const tokenTTL = 11 * 60 * 60 * 1000
interface BusinessProfile {
  vat_document?: File | null
  cr_document?: File | null
  [key: string]: any
}
interface BusinessProfile {
  commercial_registration: string
  image: string
  status: string
  product_auto_accept: boolean
  service_auto_accept: boolean
  rental_auto_accept: boolean
}

interface User {
  name: string
  email: string
  business_profile: BusinessProfile | null
  user_type: string
  contact_number: string
}

interface State {
  user: User | null
  token: string | null
  expiry: string | null
  user_timestamp: number | null
  intervalId: number | null
  cart: any[]
}

interface PresistState {
  user: User | null
  token: string | null
  expiry: string | null
  user_timestamp: number | null
  cart: any[] | null
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: State): PresistState => ({
    user: state.user,
    token: state.token,
    expiry: state.expiry,
    user_timestamp: state.user_timestamp,
    cart: state.cart
  })
})

const instance = createStore({
  plugins: [vuexLocal.plugin],
  state: {
    user: null,
    token: null,
    expiry: null,
    user_timestamp: null,
    intervalId: null,
    cart: []
  } as State,
  getters: {
    isAuthenticated(state) {
     return state.token !== null
    },
    isIndividual(state, getters) {
      return getters.isAuthenticated && state.user?.user_type === 'individual'
    },
    isBusiness(state, getters) {
      return getters.isAuthenticated && state.user?.user_type === 'business'
    },
    isStaff(state, getters) {
      return getters.isAuthenticated && state.user?.user_type === 'staff'
    },
    hasBusinessProfile(state, getters) {
      return getters.isAuthenticated && state.user?.business_profile !== null
    }
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
      state.user_timestamp = Date.now()
      if (state.expiry !== null) {
        const expiry = Date.parse(state.expiry)
        const now = Date.now()
        const timeLeft = expiry - now
        if (timeLeft < tokenTTL) {
          state.expiry = new Date(now + tokenTTL).toISOString()
        }
      }
    },
    setBusinessProfile(state: State, user: User) {
      if (state.user) {
        state.user.business_profile = user.business_profile
        console.log('Updated user:', state)
      }
    },
    setToken(state: State, token: string): void {
      state.token = token
    },
    setExpiry(state: State, expiry: string): void {
      state.expiry = expiry
    },
    setIntervalId(state: State, intervalId: number): void {
      state.intervalId = intervalId
    },
    clearState(state: State): void {
      state.user = null
      state.token = null
      state.expiry = null
      // clear interval
      clearInterval(state.intervalId)
      state.intervalId = null
    },
    startInterval(state: State) {
      if (state.user === null) {
        this.dispatch('getUser')
      }
      const intervalId = setInterval(() => {
        this.dispatch('getUser')
      }, refreshInterval)
      state.intervalId = intervalId
    },
    addItemToCart(state: State, data) {
      const fillter = state.cart.filter((c) => c.item.id === data.item.id)
      if (fillter.length === 0) {
        state.cart.push({
          quantity: data.quantity,
          item: data.item,
          start_date: data.start_date,
          end_date: data.end_date
        })
        console.log('state.cart', state.cart)
      } else {
        fillter[0].quantity += data.quantity
      }
    },
    removeItemFromCart(state: State, item: any) {
      state.cart = state.cart.filter((c: any) => c.item.id !== item.id)
    },
    clearCart(state: State) {
      state.cart = []
    }
  },
  actions: {
    async googleLoginRedirect({ commit }) {
      const redirect_uri = window.location.origin + '/auth/google/callback/'
      await axios
        .get('/api/users/social/o/google-oauth2/', {
          params: { redirect_uri },
          withCredentials: true
        })
        .then((response) => {
          window.location.href = response.data.authorization_url
        })
    },
    async loginGoogle({ commit }, { state, code }) {
      await axios
        .post(
          '/api/users/social/o/google-oauth2/',
          { state, code },
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
          }
        )
        .then((response) => {
          commit('setToken', response.data.token)
          commit('setExpiry', response.data.expiry)
          commit('setUser', response.data.user)

          commit('startInterval')
        })
    },
    async login({ commit }, { email, password }) {
      await axios.post('/api/users/token/login/', { email, password }).then((response) => {
        commit('setToken', response.data.token)
        commit('setExpiry', response.data.expiry)
        commit('setUser', response.data.user)
        console.log(response.data.token)
        console.log(response.data.expiry)
        console.log(response.data.user)
        commit('startInterval')
      })
    },
    async login2({ commit }, { email_or_phone }) {
      try {
        const response = await axios.post('/api/otp/login/', { email_or_phone })
    
        // ✅ Return structured result
        return {
          success: true,
          phone: response.data.phone
        }
      } catch (error) {
        if (error.response) {
          // Server responded with status code 400
          // console.error('Server responded with:', error.response.data)
          if(error.response.status === 400){
            throw new Error('400')
          }else{
            throw new Error('500')
          }
        } else if (error.request) {
          // No response received
          // console.error('No response received:', error.request)
          throw new Error('No response from server')
        } else {
          // Something else happened
          // console.error('Error:', error.message)
          throw new Error('An unknown error occurred')
        }
      }
      
    },
    async logout({ commit }) {
      await axios.post('/api/users/token/logout/').then(() => {
        commit('clearState')
        commit('clearCart')
      })
    },
    async forgotPassword({ commit }, { email }) {
      await axios.post('/api/users/reset_password/', { email })
    },
    async resetPassword({ commit }, { uid, token, new_password }) {
      await axios.post('/api/users/reset_password_confirm/', { uid, token, new_password })
    },
    async activateUser({ commit }, { uid, token }) {
      await axios.post('/api/users/activation/', { uid, token }).then((response) => {
        commit('clearState')
        commit('setToken', response.data.token)
        commit('setExpiry', response.data.expiry)
        commit('setUser', response.data.user)
        commit('startInterval')
      })
    },
    // async registerUser({ commit }, { name, email, password, user_type }) {
    //   await axios.post('/api/users/', { name, email, password, user_type })
    // },
    async registerUser({ commit }, { name, email, contact_number, password, user_type }) {
      await axios.post('/api/users/', { name, email, contact_number, password, user_type })
    },
    async sendOtp({ commit }, { phone }) {
      await axios.post('/api/otp/send/', { phone })
    
        // ✅ Return structured result
        return {
          success: true,
        }
    },
    async verify({ commit }, { phone, otp }) {
      await axios.post('/api/otp/verify/', { phone, otp })
    },
    async verify_otp({ commit }, { phone, otp }) {
      try {
        await axios.post('/api/otp/verify-otp-token/', { phone, otp }).then((response) => {
          commit('setToken', response.data.token)
          commit('setExpiry', response.data.expiry)
          commit('setUser', response.data.user)
          console.log(response.data.token)
          // console.log(response.data.expiry)
          // console.log(response.data.user)
          commit('startInterval')
        })
      } catch (error) {
        if (error.response) {
          // Server responded with status code 400
          // console.error('Server responded with:', error.response.data)
          if(error.response.status === 404){
            throw new Error('404')
          }else{
            throw new Error('500')
          }
        } else if (error.request) {
          // No response received
          // console.error('No response received:', error.request)
          throw new Error('No response from server')
        } else {
          // Something else happened
          // console.error('Error:', error.message)
          throw new Error('An unknown error occurred')
        }
      }
    },
    // async registerBusinessProfile({ commit }, { cr_number }) {
    //   await axios.post('/api/users/business-profile/cr_number', { cr_number }).then((response) => {
    //     commit('setUser', response.data)
    //   })
    //   //catch
    //   .catch(error){
    //     console.error('Error registering business profile:', error)
    //   }
    // },
    async registerBusinessProfile({ commit }, { cr_number }) {
      try {
        const response = await axios.post('/api/users/business-profile/', {
          cr_number
        })

        commit('setUser', response.data.data)
      } catch (error) {
        console.error('Error registering business profile:', error.response.data.errors[0])
        throw error.response.data.errors[0].type
      }
    },
    async patchBusinessProfile(
      { commit }: { commit: any },
      { business_profile }: { business_profile: BusinessProfile }
    ) {
      try {
        // Create a FormData object
        const formData = new FormData()

        // Append each field from business_profile to formData
        Object.entries(business_profile).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            // Handle file uploads correctly
            if (value instanceof File || value instanceof Blob) {
              formData.append(key, value)
            } else {
              formData.append(key, value.toString()) // Convert non-file values to strings
            }
          }
        })
        console.log(formData)
        const response = await axios.patch('/api/users/business-profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        commit('setBusinessProfile', response.data)
        console.log('Business profile updated:', response.data)
      } catch (error) {
        console.error('Failed to update business profile:', error)
      }
    },

    // const formData = new FormData()

    // // Append PDF files separately if they exist
    // if (business_profile.vat_document) {
    //   formData.append('vat_document', business_profile.vat_document)
    // }
    // if (business_profile.cr_document) {
    //   formData.append('cr_document', business_profile.cr_document)
    // }
    // console.log(formData)
    // // Append other fields as strings
    // Object.keys(business_profile).forEach((key) => {
    //   const value = business_profile[key]
    //   if (
    //     key !== 'vat_document' &&
    //     key !== 'cr_document' &&
    //     value !== undefined &&
    //     value !== null
    //   ) {
    //     formData.append(key, String(value))
    //   }
    // })
    // console.log(formData)
    // Send the request
    async patchUser({ commit }, { user }) {
      // await axios.patch('/api/users/me/', user).then((response) => {
      //   commit('setUser', response.data)
      // })
    },
    async updatePassword({ commit }, { new_password, current_password }) {
      await axios.post('/api/users/set_password/', { new_password, current_password })
    },
    async deleteAccount({ commit }, { current_password }) {
      // await axios.delete('/api/users/me/', { data: { current_password } }).then(() => {
      //   commit('clearState')
      // })
    },
    async getUser({ commit }) {
      // await axios.get('/api/users/me/').then((response) => {
      //   commit('setUser', response.data)
      // })
    },
    async clearCart({ commit }) {
      await commit('clearCart')
    },
    addItemToCart({ commit }, { item, quantity, start_date, end_date }) {
      commit('addItemToCart', { item, quantity, start_date, end_date })
    },
    async removeItemFromCart({ commit }, { item, quantity, start_date, end_date }) {
      await commit('removeItemFromCart', { item, quantity, start_date, end_date })
    }
  }
})

async function init() {
  if (instance.getters.isAuthenticated) {
    await instance
      .dispatch('getUser')
      .then(() => {
        instance.commit('startInterval')
        console.log('Interval started')
      })
      .catch((response) => {
        if (response.status === 401) instance.commit('clearState')
      })
  }
}

init()

export default instance
