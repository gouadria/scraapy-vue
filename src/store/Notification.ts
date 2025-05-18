import axios from '@/axios'
import User from '@/store/User'

interface NotificationsState {
  Notifications: []
}

export default {
  state: (): NotificationsState => ({
    Notifications: []
  }),

  mutations: {
    // mutation to get all Notifications
    set_Notifications(state: NotificationsState, Notifications: any) {
      state.Notifications = Notifications || []
      console.log('Notifications set in store:', state.Notifications)
    }
  },

  actions: {
    async fetchNotifications({ commit }: { commit: any }) {
      if (!User.getters.isAuthenticated) return
      try {
        const res = await axios.get('api/users/notifications/')
        // Commit the Notifications to the store
        commit('set_Notifications', res.data.results)

        console.log('Store Notifications data:', res)
      } catch (error: any) {
        if (error.response) {
          throw error.response.data.errors || error.response.data.error
        } else {
          throw error
        }
      }
    }
  },

  getters: {
    AllNotifications: (state: NotificationsState) => state.Notifications
  }
}
