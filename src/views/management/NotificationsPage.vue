<script lang="ts">
import { defineComponent } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import NotifBox from '@/components/UIElements/NotifBox.vue'
import NotificationSettings from '@/components/UIElements/NotificationSettings.vue'
export default defineComponent({
  components: {
    MainBtn,
    NotifBox,
    NotificationSettings
  },
  data() {
    return {
      notifications: [],
      showSettings: false,
      showNotification: true
    }
  },
  methods: {
    async fetchNotification() {
      try {
        const response = await this.$axios.get('api/users/notifications/')
        console.log('Notifications:', response)
        this.notifications = response.data.results
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    },
    async hideNotification(id: number) {
      this.notifications = this.notifications.filter((notif) => notif.id !== id)
      try {
        const response = await this.$axios.patch('api/users/notifications/', { id: id })
        console.log('Notifications:', response)
        // this.notifications = response.data.results
        this.fetchNotification()
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    },
    toggleSettings() {
      this.showSettings = !this.showSettings
      this.showNotification = !this.showNotification
      console.log('Settings:', this.showSettings)
      console.log('Settings:', this.showNotification)
    }
  },
  mounted() {
    this.fetchNotification()
  }
})
</script>

<template>
  <div class="showNotification_page" v-auto-animate>
    <div class="notifications_list" v-if="showNotification">
      <div class="notifications-header">
        <div class="title">
          <h1>{{ $t('notifications.title') }}</h1>
          <p>{{ $t('notifications.subtitle') }}</p>
        </div>
        <MainBtn type="white" @click="toggleSettings()" v-if="false">
          {{ $t('notifications.settings') }}
        </MainBtn>
      </div>
      <NotifBox :notifications="notifications" @hide="hideNotification" />
    </div>
    <div v-if="showSettings" class="Notification_settings">
      <NotificationSettings :backButton="toggleSettings" />
    </div>
  </div>
</template>

<style scoped>
.showNotification_page,
.notifications_list {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
}
.notifications-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--Dark-100, #e7e7e7);
  padding-bottom: 16px;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title h1 {
  color: var(--Dark-950, #121212);
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}

.title p {
  overflow: hidden;
  color: var(--Dark-700, #4f4f4f);
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.Notification_settings {
  min-height: 100%;
}
</style>
