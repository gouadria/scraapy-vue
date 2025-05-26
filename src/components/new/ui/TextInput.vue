<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  autocomplete?: string
  maxlength?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div>
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type || 'text'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="form-input"
      :class="{ 'border-error-500 focus:border-error-500 focus:ring-error-100': error }"
      :maxlength="maxlength"
    />
    <p v-if="error" class="form-error">{{ error }}</p>
  </div>
</template>