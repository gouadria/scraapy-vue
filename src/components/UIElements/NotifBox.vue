<script lang="ts">
import { defineComponent, PropType } from 'vue'
import redNotification from '@/assets/svg-icons/notifications/red.png'
import yellowNotification from '@/assets/svg-icons/notifications/yellow.png'
import greenNotification from '@/assets/svg-icons/notifications/green.png'

export default defineComponent({
  name: 'NotifBox',
  props: {
    notifications: {
      type: Array as PropType<
        Array<{
          id: number
          type: 'alert' | 'warning' | 'notification'
          title: string
          description: string
          actionLink?: string
          actionText?: string
        }>
      >,
      required: true
    }
  },
  data() {
    return {
      icons: {
        alert: redNotification,
        warning: yellowNotification,
        notification: greenNotification
      }
    }
  },
  methods: {
    hideNotification(id: number) {
      this.$emit('hide', id)
    }
  }
})
</script>

<template>
  <div class="notification-wrapper">
    <transition-group name="fade" tag="div" class="notification-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification-item">
        <div class="icon-content-wrapper">
          <div class="icon">
            <img :src="notification.type ? icons[notification.type] : icons.warning" alt="notification icon" />
          </div>
          <div class="content">
            <div class="title">
              <slot name="title">
                <h3>{{ notification.title }}</h3>
              </slot>
              <slot name="subtitle">
                <p>{{ notification.description }}</p>
              </slot>
            </div>
            <slot name="action">
              <div class="action" v-if="notification.actionLink">
                <a :href="notification.actionLink">
                  {{ $t('notifications.takeAction') || 'Hide' }}
                </a>
              </div>
            </slot>
          </div>
        </div>
        <div class="hide" @click="hideNotification(notification.id)">
          <img src="@/assets/svg-icons/close.svg?url" alt="close" />
        </div>
      </div>
    </transition-group>
    <transition name="fade">
      <div v-if="notifications.length === 0" class="no-items">
        <h1>{{ $t('notifications.noNotifications') }}</h1>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.notification-wrapper,
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.notification-item {
  display: flex;
  padding: 16px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 25px;
  border-radius: 12px;
  border: 1px solid var(--Dark-200, #d1d1d1);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.icon-content-wrapper {
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title h3 {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.title p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

/* slotted link css*/
:slotted(a) {
  color: var(--Secondary---500, #15b377);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
