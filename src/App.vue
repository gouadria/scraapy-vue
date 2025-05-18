<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import Loading from '@/components/UIElements/commonLoading.vue'
import { toast } from 'vue3-toastify'

interface Notification {
  id: string
  title: string
  description: string
  created_at: string
  is_read: boolean
}

export default defineComponent({
  name: 'App',
  components: { Loading },
  data() {
    return {
      store: useStore(),
      delayedLoading: false,
      timer: null as ReturnType<typeof setTimeout> | null,
      Notifications: [] as Notification[],
      notificationInterval: null as ReturnType<typeof setInterval> | null,
      // This array holds the IDs of notifications that have been displayed already.
      displayedNotificationIds: [] as string[]
    }
  },
  computed: {
    loading() {
      return this.store.state.loading.loading
    }
  },
  watch: {
    '$i18n.locale'(newVal) {
      document.documentElement.setAttribute('dir', newVal === 'ar' ? 'rtl' : 'ltr')
      localStorage.setItem('lang', newVal)
    },
    loading(newVal) {
      if (newVal) {
        this.timer = setTimeout(() => {
          this.delayedLoading = true
        }, 3000)
      } else {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.delayedLoading = false
      }
    }
  },
  methods: {
    async getNotifications() {
      try {
        await this.store.dispatch('fetchNotifications')
        const fetchedNotifications: Notification[] = this.store.getters.AllNotifications
        // Filter out any notifications that have already been shown.
        const newNotifications = fetchedNotifications.filter(
          (notification) => !this.displayedNotificationIds.includes(notification.id)
        )

        // Show toast for each new notification and mark them as displayed.
        newNotifications.forEach((notification) => {
          toast.info(`${notification.title}\n${notification.description}`, {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 5000, // Close after 5 seconds
            closeOnClick: true
          })
          // Add this notification to the displayed list.
          this.displayedNotificationIds.push(notification.id)
        })

        // Optionally update localStorage with the updated list:
        localStorage.setItem(
          'displayedNotificationIds',
          JSON.stringify(this.displayedNotificationIds)
        )

        // Update the Notifications array if you need to render them elsewhere
        // Here, we only store notifications that have not been shown before.
        this.Notifications = newNotifications
        console.log('Displayed Notifications:', this.Notifications)
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
        toast.error('Failed to load notifications')
      }
    }
  },
  mounted() {
    // Set language based on localStorage or use default ('ar')
    this.$i18n.locale = localStorage.getItem('lang') || 'ar'

    // Load list of already displayed notification IDs from localStorage, if available
    const storedIds = localStorage.getItem('displayedNotificationIds')
    this.displayedNotificationIds = storedIds ? JSON.parse(storedIds) : []

    // Initial fetch of notifications
    this.getNotifications()

    // Set interval to fetch notifications every 5 minutes (350,000ms)
    this.notificationInterval = setInterval(() => {
      this.getNotifications()
    }, 350000)
  },
  beforeUnmount() {
    // Clean up the interval and timer
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval)
    }
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
})
</script>

<template>
  <transition name="fade" mode="out-in" appear>
    <div v-if="delayedLoading" class="loading_overlay">
      <Loading />
    </div>
  </transition>

  <router-view />
</template>

<style>
.loading_overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
