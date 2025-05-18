<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, sameAs } from '@vuelidate/validators'
import inputField from '../UIElements/inputField.vue'
import MainBtn from '../UIElements/MainBtn.vue'
import Terms from '@/views/auth/Terms.vue'
import BusinessDocumentsSection from '../legalInformation/BusinessDocumentsSection.vue'
interface unregisterUser {
  name: string
  department: string
  email: string
  phone: string
  address: string
  id_number: string
  BusinessName: string
  CRIssueDate: string
  CRNumber: string
  cr_document: File | null | string
  vat_document: File | null | string
}

export default {
  name: 'userInformation',
  components: { inputField, Terms, BusinessDocumentsSection },
  data() {
    return {
      unregisterUser: {} as unregisterUser,
      showTerms: false
    }
  },
  watch: {
    unregisterUser: {
      handler() {
        this.$emit('update', this.unregisterUser)
      },
      deep: true
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  methods: {
    handleUpdate(field: any, value: any) {
      this.v$[field].$touch()
      this[field] = value
    },
    uploadCrPDF(file: File) {
      console.log('Uploaded CR PDF:', file)
    },
    uploadVatPDF(file: File) {
      console.log('Uploaded VAT PDF:', file)
    },
    removeCrPDF(file: File | null | string) {
      if (file) this.unregisterUser.cr_document = null
      // toast.info(this.$t('legalInformation.fileRemoved'))
    },
    removeVatPDF(file: File | null | string) {
      if (file) this.unregisterUser.vat_document = null
      // toast.info(this.$t('legalInformation.fileRemoved'))
    }
  },
  validations() {
    return {
      unregisterUser: {
        officialFullName: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        terms: {
          sameAs: helpers.withMessage(() => this.$t('validations.terms'), sameAs(true))
        }
      }
    }
  },
  computed: {
    currentLang() {
      return this.$i18n.locale
    }
  }
}
</script>
<template>
  <div class="unregister_users" v-if="!this.$userStore.getters.isAuthenticated">
    <div class="header">
      <h2>{{ $t('checkout.Generalinformation') }}</h2>
      <p>{{ $t('checkout.GeneralinformationText') }}</p>
    </div>
    <div class="general_information">
      <div class="input_group">
        <!-- Name Field -->
        <inputField
          :label="$t('unregister_users.name')"
          :placeholder="$t('unregister_users.name')"
          :error="v$.unregisterUser?.name?.$errors[0]?.$message"
          :value="unregisterUser.name"
          @update="unregisterUser.name = $event"
          required
        />
      </div>

      <div class="input_group">
        <inputField
          :label="$t('unregister_users.id_number')"
          :placeholder="$t('unregister_users.id_number')"
          :error="v$.unregisterUser?.id_number?.$errors[0]?.$message"
          :value="unregisterUser.id_number"
          @update="unregisterUser.id_number = $event"
          required
        />
      </div>

      <div class="input_group">
        <inputField
          :label="$t('unregister_users.EmailAddress')"
          :placeholder="$t('unregister_users.EmailAddress')"
          :error="v$.unregisterUser?.email?.$errors[0]?.$message"
          :value="unregisterUser.email"
          @update="unregisterUser.email = $event"
          required
        />
        <inputField
          :label="$t('unregister_users.phoneNumber')"
          :placeholder="$t('unregister_users.phoneNumber')"
          :error="v$.unregisterUser?.phone?.$errors[0]?.$message"
          :value="unregisterUser.phone"
          @update="unregisterUser.phone = $event"
          required
        />
      </div>

      <div class="input_group">
        <!-- Department Field -->
        <inputField
          :label="$t('unregister_users.Department')"
          :placeholder="$t('unregister_users.Department')"
          :error="v$.unregisterUser?.department?.$errors[0]?.$message"
          :value="unregisterUser.department"
          @update="unregisterUser.department = $event"
          required
        />
      </div>
    </div>
    <div class="divider"></div>
    <div class="header">
      <h2>{{ $t('unregister_users.BusinessDetails') }}</h2>
      <p>{{ $t('unregister_users.BusinessDetailsSubtitle') }}</p>
    </div>
    <div class="businessDetails">
      <div class="input_group">
        <inputField
          :label="$t('unregister_users.BusinessName')"
          :placeholder="$t('unregister_users.BusinessName')"
          :error="v$.unregisterUser?.BusinessName?.$errors[0]?.$message"
          :value="unregisterUser.BusinessName"
          @update="unregisterUser.BusinessName = $event"
          required
        />
      </div>
      <div class="input_group">
        <inputField
          :label="$t('unregister_users.CRNumber')"
          :placeholder="$t('unregister_users.CRNumber')"
          :error="v$.unregisterUser?.CRNumber?.$errors[0]?.$message"
          :value="unregisterUser.CRNumber"
          @update="unregisterUser.CRNumber = $event"
          required
        />
      </div>
      <!-- Business Documents Section -->
      <BusinessDocumentsSection
        :LegalInformation="unregisterUser"
        :v$="v$"
        @upload-cr="uploadCrPDF"
        @upload-vat="uploadVatPDF"
        @remove-cr="removeCrPDF"
        @remove-vat="removeVatPDF"
      />
    </div>
    <div class="terms">
      <div class="terms-link-wrapper">
        <div class="checkbox-input-wrapper">
          <inputField type="checkbox" :value="terms" @update="handleUpdate('terms', $event)" />
        </div>
        <div class="terms-link">
          <p>{{ $t('unregister_users.agreeToTerms') }}</p>
          &nbsp;
          <a @click="showTerms = true">{{ $t('auth.terms') }}</a>
        </div>
      </div>
    </div>
  </div>
  <Terms
    :show="showTerms"
    @close="showTerms = false"
    @acceptTerms="
      () => {
        showTerms = false
        terms = true
      }
    "
  />
</template>
<style scoped>
.header h1,
h2 {
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.header p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.unregister_users {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.unregister_users .businessDetails,
.unregister_users .general_information {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.unregister_users .input_group {
  display: flex;
  gap: 16px;
  width: 100%;
}

.unregister_users .input_group .input-item {
  width: 100%;
  border-radius: 8px;
}

.unregister_users .input_group .input-item input {
  border-radius: 8px;
  border: 1px solid #f6f6f6;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.terms {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.terms-link-wrapper {
  display: flex;
  gap: 12px;
}

.checkbox-input-wrapper {
  display: flex;
  align-items: center;
}

.terms-link {
  display: flex;
  align-items: center;
}

.terms-link p {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.terms-link a {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
}
</style>
