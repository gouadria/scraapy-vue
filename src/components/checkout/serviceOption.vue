<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import sarIcon from '@/assets/svg-icons/SAR.svg'
import inputField from '@/components/UIElements/inputField.vue'
import serviceProvider from '@/components/checkout/serviceProvider.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default defineComponent({
  components: {
    inputField,
    serviceProvider,
    MainBtn
  },

  props: {
    itemId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    selectedService: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isActive: false,
      isCheckboxChecked: false,
      selectedProvider: null as any | null,
      inviromentUrl: import.meta.env.VITE_API_URL,
      sarIcon: shallowRef(sarIcon)
    }
  },

  watch: {
    // Watch for changes in selectedService prop
    selectedService: {
      immediate: true,
      handler(newSelectedService) {
        // Check if there's a service selected for this category
        const hasSelectedService = newSelectedService.some((service: any) => {
          return this.option.serviceProviders.some(
            (provider: any) => provider.id === service.providerId && this.itemId === service.itemId
          )
        })

        // Update checkbox and provider state
        if (hasSelectedService) {
          this.isCheckboxChecked = true
          // Find and set the selected provider
          const selectedService = newSelectedService.find(
            (service: any) => service.itemId === this.itemId
          )
          if (selectedService) {
            this.selectedProvider = this.option.serviceProviders.find(
              (provider: any) => provider.id === selectedService.providerId
            )
          }
        } else {
          this.isCheckboxChecked = false
          this.selectedProvider = null
        }
      }
    }
  },

  methods: {
    handleUpdate(value: boolean) {
      if (value === false) {
        this.$emit('selectedProvider', {
          providerId: null,
          servicePrice: 0,
          name: '',
          itemId: this.itemId
        })
        this.selectedProvider = null
        this.isActive = false
      } else {
        this.isCheckboxChecked = true
        this.isActive = true
      }
    },

    handleSelectProvider(provider: any) {
      this.$emit('selectedProvider', {
        providerId: provider.id,
        servicePrice: provider.price,
        name: provider.name,
        itemId: this.itemId,
        category: provider.category
      })

      this.selectedProvider = provider
      this.isActive = false
      this.isCheckboxChecked = true
    },

    handleEdit() {
      this.selectedProvider = null
      this.isActive = true
      this.isCheckboxChecked = true
    }
  }
})
</script>

<template>
  <div class="service-item">
    <inputField type="checkbox" :value="isCheckboxChecked" @update="handleUpdate" />

    <div class="service-item-wrapper">
      <div class="service-details">
        <div class="service-title">
          <h3>{{ name }}</h3>
          <p>
            {{ $t('checkout.StartingFrom') }} {{ price }}
            <component class="SAR green" :is="sarIcon" />
          </p>
        </div>
        <p>{{ description }}</p>

        <div v-if="selectedProvider" class="selected-service-provider">
          <div class="name-wrapper">
            <p>
              {{ selectedProvider.name }} - <component class="SAR green" :is="sarIcon" />
              {{ selectedProvider.price }}
            </p>
          </div>
          <MainBtn type="edit-btn" @click="handleEdit" />
        </div>
      </div>

      <div class="service-providers-container">
        <transition name="slide-fade">
          <h2 v-if="isActive"> {{ $t('checkout.chooseService') }} </h2>
        </transition>
        <transition name="expand">
          <div v-if="isActive && option" class="service-providers">
            <serviceProvider
              v-for="provider in option.serviceProviders"
              :key="provider.id"
              :logoSrc="provider.owner_image"
              :name="provider.name"
              :price="provider.price"
              @click="handleSelectProvider(provider)"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-item {
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid var(--Dark-50, #f6f6f6);
  align-items: flex-start;
}

.service-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.service-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.service-title h3 {
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.service-title p {
  color: var(--Secondary---500, #15b377);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}
.service-title p svg {
  width: 16px;
  height: 16px;
}
.service-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}

.service-providers-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.service-providers-container h2 {
  color: var(--Secondary---500, #15b377);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.service-providers {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  overflow: hidden;
  transition:
    max-height 0.9s ease-out,
    opacity 0.2s ease-out;
}

.selected-service-provider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name-wrapper {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 8px;
  border: 1px solid var(--Dark-50, #f6f6f6);
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.9s ease-in,
    opacity 0.2s ease-in;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
