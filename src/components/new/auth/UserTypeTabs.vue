<script setup lang="ts">
import { UserType } from '@/store/auth'

defineProps<{
  selectedType: UserType
}>()

const emit = defineEmits<{
  change: [type: UserType]
}>()
</script>

<template>
  <div class="tab-buttons mb-6">
    <button 
      type="button"
      class="tab-button"
      :class="selectedType === 'individual' ? 'tab-button-active' : 'tab-button-inactive'"
      @click="emit('change', 'individual')"
    >
      {{ $t('auth.Individual') }}
    </button>
    <button 
      type="button"
      class="tab-button"
      :class="selectedType === 'business' ? 'tab-button-active' : 'tab-button-inactive'"
      @click="emit('change', 'business')"
    >
      {{ $t('auth.Business') }}
    </button>
  </div>
</template>