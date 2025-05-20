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

const businessTypes = [
  'Product Supplier',
  'Contractor Supplier',
  'Factory',
  'Service Provider',
  'Company',
  'Establishment'
]

// Form validation schema
const validationSchema = yup.object({
  businessName: yup.string().required('Business name is required'),
  businessType: yup.string().required('Business type is required'),
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
const { value: businessName, errorMessage: businessNameError } = useField<string>('businessName')
const { value: businessType, errorMessage: businessTypeError } = useField<string>('businessType')
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
      v-model="businessName"
      :label="$t('auth.fullBusinessName')"
      :placeholder="$t('auth.fullBusinessName')"
      :error="businessNameError"
      autocomplete="organization"
    />
    
    <div>
      <label class="form-label">{{ $t('auth.businessType') }}</label>
      <select
        v-model="businessType"
        class="form-input"
        :class="{ 'border-error-500 focus:border-error-500 focus:ring-error-100': businessTypeError }"
      >
        <option value="" disabled selected>{{ $t('auth.select') }} {{ $t('auth.businessType') }}</option>
        <option v-for="type in businessTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
      <p v-if="businessTypeError" class="form-error">{{ businessTypeError }}</p>
    </div>
    
    <TextInput
      v-model="email"
      :label="$t('auth.email')"
      placeholder="contact@business.com"
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
      {{ $t('auth.createBusinessAccount') }}
    </Button>
  </form>
</template>