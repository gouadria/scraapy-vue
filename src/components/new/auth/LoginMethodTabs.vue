<script setup lang="ts">
defineProps<{
  selectedMethod: 'email' | 'phone'
}>()

const emit = defineEmits<{
  change: [method: 'email' | 'phone']
}>()
</script>

<template>
  <div class="tab-buttons">
    <button 
      type="button"
      class="tab-button"
      :class="selectedMethod === 'email' ? 'tab-button-active' : 'tab-button-inactive'"
      @click="emit('change', 'email')"
    >
      {{ $t('auth.email') }}
    </button>
    <button 
      type="button"
      class="tab-button"
      :class="selectedMethod === 'phone' ? 'tab-button-active' : 'tab-button-inactive'"
      @click="emit('change', 'phone')"
    >
      {{ $t('auth.phone') }}
    </button>
  </div>
</template>