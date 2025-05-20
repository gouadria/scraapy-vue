<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import TextInput from '../ui/TextInput.vue'
import Button from '../ui/Button.vue'

const props = defineProps<{
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  submit: [data: any]
}>()

// Form validation schema
const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required')
})

// Setup form
const { handleSubmit } = useForm({
  validationSchema
})

// Form fields
const { value: fullName, errorMessage: fullNameError } = useField<string>('fullName')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: phone, errorMessage: phoneError } = useField<string>('phone')

// Handle form submission
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <TextInput
      v-model="fullName"
      :label="$t('auth.fullName')"
      :placeholder="$t('auth.fullName')"
      :error="fullNameError"
      autocomplete="name"
    />
    
    <TextInput
      v-model="email"
      :label="$t('auth.email')"
      placeholder="your@email.com"
      type="email"
      :error="emailError"
      autocomplete="email"
    />
    
    <TextInput
      v-model="phone"
      :label="$t('auth.phone')"
      placeholder="+966xxxxxxxxx"
      type="tel"
      :error="phoneError"
      autocomplete="tel"
    />
    
    <Button 
      type="submit" 
      variant="primary" 
      :loading="isSubmitting"
      full-width
    >
      {{ $t('auth.signupTitle') }}
    </Button>
  </form>
</template>