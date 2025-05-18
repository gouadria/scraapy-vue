<template>
  <div class="notifications_settings">
    <div class="header">
      <div class="text">
        <h1>{{ $t('notifications.NotificationSettings') }}</h1>
        <p>{{ $t('notifications.NotificationSettingsDescription') }}</p>
      </div>
      <MainBtn type="white" @click="backButton()">
        {{ $t('notifications.BackToNotifications') }}
      </MainBtn>
    </div>

    <div class="settings">
      <div class="general_notifications">
        <div class="text">
          <h2>{{ $t('notifications.general_notifications') }}</h2>
          <p>{{ $t('notifications.general_notifications_description') }}</p>
        </div>
        <div class="toggle_buttons">
          <ToggleButton
            :isActive="generalSettings.push"
            @update:isActive="(newValue) => handleNotification('general', 'push', newValue)"
            ToggleName="Push"
          />
          <ToggleButton
            :isActive="generalSettings.email"
            @update:isActive="(newValue) => handleNotification('general', 'email', newValue)"
            ToggleName="Email"
          />
          <ToggleButton
            :isActive="generalSettings.sms"
            @update:isActive="(newValue) => handleNotification('general', 'sms', newValue)"
            ToggleName="SMS"
          />
        </div>
      </div>
      <div class="general_notifications scrap_sold">
        <div class="text">
          <h2>{{ $t('notifications.ScrapSoldNotifications') }}</h2>
          <p>{{ $t('notifications.general_notifications_description') }}</p>
        </div>
        <div class="toggle_buttons">
          <ToggleButton
            :isActive="scrapSoldSettings.push"
            @update:isActive="(newValue) => handleNotification('scrapSold', 'push', newValue)"
            ToggleName="Push"
          />
          <ToggleButton
            :isActive="scrapSoldSettings.email"
            @update:isActive="(newValue) => handleNotification('scrapSold', 'email', newValue)"
            ToggleName="Email"
          />
          <ToggleButton
            :isActive="scrapSoldSettings.sms"
            @update:isActive="(newValue) => handleNotification('scrapSold', 'sms', newValue)"
            ToggleName="SMS"
          />
        </div>
      </div>
      <div class="general_notifications service_request">
        <div class="text">
          <h2>{{ $t('notifications.ServiceRequestNotifications') }}</h2>
          <p>{{ $t('notifications.general_notifications_description') }}</p>
        </div>
        <div class="toggle_buttons">
          <ToggleButton
            :isActive="serviceRequestSettings.push"
            @update:isActive="(newValue) => handleNotification('serviceRequest', 'push', newValue)"
            ToggleName="Push"
          />
          <ToggleButton
            :isActive="serviceRequestSettings.email"
            @update:isActive="(newValue) => handleNotification('serviceRequest', 'email', newValue)"
            ToggleName="Email"
          />
          <ToggleButton
            :isActive="serviceRequestSettings.sms"
            @update:isActive="(newValue) => handleNotification('serviceRequest', 'sms', newValue)"
            ToggleName="SMS"
          />
        </div>
      </div>
      <div class="general_notifications rental_request">
        <div class="text">
          <h2>{{ $t('notifications.RentalRequestNotifications') }}</h2>
          <p>{{ $t('notifications.general_notifications_description') }}</p>
        </div>
        <div class="toggle_buttons">
          <ToggleButton
            :isActive="rentalRequestSettings.push"
            @update:isActive="(newValue) => handleNotification('rentalRequest', 'push', newValue)"
            ToggleName="Push"
          />
          <ToggleButton
            :isActive="rentalRequestSettings.email"
            @update:isActive="(newValue) => handleNotification('rentalRequest', 'email', newValue)"
            ToggleName="Email"
          />
          <ToggleButton
            :isActive="rentalRequestSettings.sms"
            @update:isActive="(newValue) => handleNotification('rentalRequest', 'sms', newValue)"
            ToggleName="SMS"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import ToggleButton from './toggle_button.vue'

export default defineComponent({
  components: {
    MainBtn,
    ToggleButton
  },
  props: {
    backButton: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  data() {
    return {
      generalSettings: { push: false, email: false, sms: false },
      scrapSoldSettings: { push: true, email: true, sms: false },
      serviceRequestSettings: { push: true, email: true, sms: true },
      rentalRequestSettings: { push: true, email: true, sms: true }
    }
  },
  methods: {
    async fetchSettings() {
      try {
        const response = await this.$axios.get('api/users/fetchSettings/')
        const settings = response.data.results
        // Adjust mapping based on your API response structure
        this.generalSettings = settings.general || this.generalSettings
        this.scrapSoldSettings = settings.scrapSold || this.scrapSoldSettings
        this.serviceRequestSettings = settings.serviceRequest || this.serviceRequestSettings
        this.rentalRequestSettings = settings.rentalRequest || this.rentalRequestSettings
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    },
    handleNotification(category: string, type: string, newValue: boolean) {
      // Update the specific category and toggle type
      ;(this as any)[`${category}Settings`][type] = newValue
      console.log(`Updated ${category} ${type} to ${newValue}`)
      // Optionally, add API call to save the setting here
    }
  },
  mounted() {
    this.fetchSettings()
  }
})
</script>

<style scoped>
.notifications_settings {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}
.header {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7e7e7;
}
.header .text {
  display: flex;
  flex-direction: column;
}
.settings {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.general_notifications {
  display: flex;
  flex-direction: row;
  gap: 64px;
  width: 100%;

  /* justify-content: space-between; */
}
.toggle_buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.general_notifications .text {
  max-width: 280px;
}
.general_notifications .text h2 {
  color: #344054;
  font-size: 14px;
  font-weight: 600;
}
.general_notifications .text p {
  color: #475467;
  font-size: 14px;
  font-weight: 400;
}
</style>
