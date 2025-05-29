<script setup lang="ts">
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import TextInput from '@/components/new/ui/TextInput.vue'
import Button from '@/components/new/ui/Button.vue'
import ModalPopup from '@/components/UIElements/NewModalPopup.vue'
import OtpInput from '@/components/new/auth/OtpInput.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Store
import User from '@/store/User'
const userStore = User

const props = defineProps<{
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  submit: [data: any]
}>()

const businessTypeKeys = [
  'supplier',
  'contractor',
  'industrial_sector',
  'commercial_sector',
  'service_sector'
]

// Form validation schema
const validationSchema = yup.object({
  businessName: yup.string().required(t('validations.businessNameRequired')).min(10, t('validations.businessName')),
  businessType: yup.string().required(t('validations.BusinessTypeRequired')),
  email: yup.string().email(t('validations.email')).required(t('validations.emailRequired')),
  phone: yup.string()
    .matches(/^05\d{8}$/, t('validations.phone'))
    .required(t('validations.phoneRequired')),
  crNumber: yup.string()
  .matches(/^1\d{9}$/, t('validations.crNumber'))
  .required(t('validations.crNumberRequired'))
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
const { value: crNumber, errorMessage: crNumberError } = useField<string>('crNumber')

// Modal & OTP state
const showOtpModal = ref(false)
const otpCode = ref('')
const isVerifying = ref(false)
const isPhoneVerified = ref(false)
const isError = ref(false)
const isErrorOtp = ref(false)
const errorMsg = ref<string | null>(null)


// Send OTP to phone
async function sendOtp() {
  if (!phone.value){
    errorMsg.value = t('validations.phoneNumberEmpty')
    isError.value = true
    return
  }else if(phoneError.value){
    errorMsg.value = t('validations.phoneNumberError')
    isError.value = true
    return
  }else{
    isError.value = false
  }

  try {
    // Simulate API call (replace with real one)
    const result = await userStore.dispatch('sendOtp', {
      phone: '+966' + phone.value.slice(1)
    })

    if (result?.success) {
      showOtpModal.value = true
    }

  } catch (error) {
    errorMsg.value = t('validations.failedToSendCode')
    isError.value = true
  }
}

// Verify OTP
async function verifyOtp() {
  if (otpCode.value.length !== 6) {
    alert(t('auth.enter6'))
    return
  }

  try {
    isVerifying.value = true

    // Call your store action to verify OTP
    await userStore.dispatch('verify', {
      phone: '+966' + phone.value.slice(1),
      otp: otpCode.value
    })

    // Success
    isPhoneVerified.value = true
    showOtpModal.value = false

  } catch (error) {
    errorMsg.value = t('auth.verificationError')
    isErrorOtp.value = true
  } finally {
    isVerifying.value = false
  }
}


// Handle form submission
const onSubmit = handleSubmit((values) => {
  if (!isPhoneVerified.value) {
    errorMsg.value = t('validations.phoneNotVerify')
    isError.value = true
    return
  }

  const updatedValues = {
    businessName: values.businessName,
    businessType: values.businessType,
    email: values.email,
    phone: '+966' + values.phone.slice(1),
    crNumber: values.crNumber,
    addressLine1: "anis",
    city: "anis",
    province: "anis",
    zipCode: "12345",
    country: "saudi arabia"
  }

  emit('submit', updatedValues)
})
</script>

<template>
  <p v-if="isError" class="error-alert">{{ errorMsg }}</p>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <TextInput
      v-model="businessName"
      :label="$t('auth.fullBusinessName')"
      :placeholder="$t('auth.fullBusinessName')"
      :error="businessNameError"
      autocomplete="organization"
    />

    <TextInput
      v-model="crNumber"
      :label="$t('auth.CRNumber')"
      placeholder="1xxxxxxxxx"
      type="tel"
      :error="crNumberError"
      autocomplete="tel"
      maxlength="10"
      class="flex-grow"
    />
    
    <div>
      <label class="form-label">{{ $t('auth.businessType') }}</label>
      <select
        v-model="businessType"
        class="form-input"
        :class="{ 'border-error-500 focus:border-error-500 focus:ring-error-100': businessTypeError }"
      >
        <option value="" disabled selected>{{ $t('auth.select') }} {{ $t('auth.businessType') }}</option>
        <option v-for="key in businessTypeKeys" :key="key" :value="key">
          {{ t('auth.'+key) }}
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
    
    <div class="flex items-center gap-2">
      <TextInput
        v-model="phone"
        :label="$t('auth.phone')"
        placeholder="05xxxxxxxx"
        type="tel"
        :error="phoneError"
        autocomplete="tel"
        maxlength="10"
        class="flex-grow"
        style="flex-basis: 0; flex-grow: 4;" 
      />

      <Button
        type="button"
        variant="secondary"
        size="sm"
        @click="sendOtp"
        :disabled="isPhoneVerified.value"
        class="mt-6"
        style="flex: 0 0 20%;"
      >
        {{ isPhoneVerified ? '✔' : $t('auth.verify') }}
      </Button>
    </div>
    
    <Button 
      type="submit" 
      variant="primary" 
      :loading="isSubmitting"
      full-width
    >
      {{ $t('auth.createBusinessAccount') }}
    </Button>

    <ModalPopup :show="showOtpModal" :close="showOtpModal">
        <template v-slot:title>
          <div class="title-wrapper">
            <div class="title">
              <h1>{{ t('auth.verification') }}</h1>
              <p>{{ t('auth.WeveSentverificationCodeTo') }} 
                <span style="color: grey;font-weight: bold;">{{ phone }}</span>
              </p>
            </div>
          </div>
        </template>
        <template v-slot:content>
          <p v-if="isErrorOtp" class="error-alert">{{ errorMsg }}</p>
          
          <OtpInput v-model="otpCode" @complete="verifyOtp" />

          <div class="flex justify-end gap-2 mt-6 mr-6">
            <Button
              type="button"
              variant="secondary"
              @click="showOtpModal = false"
              :disabled="isVerifying"
            >
              {{ $t('auth.cancel') }}
            </Button>
            <Button
              type="button"
              variant="primary"
              @click="verifyOtp"
              :loading="isVerifying"
            >
              {{ $t('auth.verify') }}
            </Button>
          </div>
        </template>
    </ModalPopup>
  </form>
</template>

<style scoped>
  .error-alert {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
    padding: 10px;
    margin: 0 0 10px 0;
    border-radius: 0.5rem;
  }
</style>