<template>
  <VueDatePicker
    v-model="selectedDate"
    :placeholder="placeholderDatePicker"
    :time-picker="isTime"
    :is-24="false"
  />
</template>

<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<{
    modelValue: string | null
    modelPlaceholder?: string
    isTime?: boolean
  }>(),
  {
    modelValue: null,
    modelPlaceholder: ''
  }
)

const selectedDate = ref(props.modelValue || '')
const placeholderDatePicker = ref(props.modelPlaceholder)

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Watch for changes to selectedDate and emit the formatted date
watch(selectedDate, (newValue) => {
  const formattedDate = newValue ? formatDate(new Date(newValue)) : ''
  emit('update:modelValue', formattedDate)
})
</script>

<style>
.row .dp__input,
.tow_row .dp__input {
  padding: 9px 34px !important;
}
</style>
