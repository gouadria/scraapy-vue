<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'complete': []
}>()

// Create refs for each input field
const inputRefs = ref<(HTMLInputElement | null)[]>([null, null, null, null, null, null])
const otpValues = ref<string[]>(['', '', '', '', '', ''])

// Computed property for the combined OTP value
const otpValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  }
})

// Watch for changes in otpValues and update the combined value
watch(otpValues, (newValues) => {
  otpValue.value = newValues.join('')
  if (newValues.every(v => v !== '') && newValues.length === 6) {
    emit('complete')
  }
}, { deep: true })

// Watch for changes in the combined value and update individual inputs
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    const chars = newValue.split('')
    otpValues.value = [
      chars[0] || '',
      chars[1] || '',
      chars[2] || '',
      chars[3] || '',
      chars[4] || '',
      chars[5] || ''
    ]
  } else {
    otpValues.value = ['', '', '', '', '', '']
  }
}, { immediate: true })

// Handle input
function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  // Only allow one character per input
  if (value.length > 1) {
    otpValues.value[index] = value[value.length - 1]
  }
  
  // Move to next input if current input has a value
  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

// Handle keydown
function handleKeyDown(index: number, event: KeyboardEvent) {
  // Move to previous input on backspace if current input is empty
  if (event.key === 'Backspace' && !otpValues.value[index] && index > 0) {
    otpValues.value[index - 1] = ''
    inputRefs.value[index - 1]?.focus()
  }
}

// Handle paste
function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  
  if (!event.clipboardData) return
  
  const pastedData = event.clipboardData.getData('text')
  const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('')
  
  digits.forEach((digit, index) => {
    if (index < 6) {
      otpValues.value[index] = digit
    }
  })
  
  // Focus on the next empty input or the last input
  const nextEmptyIndex = otpValues.value.findIndex(v => v === '')
  if (nextEmptyIndex !== -1) {
    inputRefs.value[nextEmptyIndex]?.focus()
  } else {
    inputRefs.value[5]?.focus()
  }
}

// Focus the first input on mount
onMounted(() => {
  inputRefs.value[0]?.focus()
})
</script>

<template>
  <div>
    <label class="form-label">{{ $t('auth.verificationCode') }}</label>
    <div class="otp-input-container" style="direction: ltr">
      <input
        v-for="(_, index) in 6"
        :key="index"
        type="text"
        inputmode="numeric"
        maxlength="6"
        v-model="otpValues[index]"
        @input="handleInput(index, $event)"
        @keydown="handleKeyDown(index, $event)"
        @paste="handlePaste"
        class="otp-input"
        autocomplete="one-time-code"
        :ref="el => inputRefs[index] = el as HTMLInputElement"
      />
    </div>
  </div>
</template>