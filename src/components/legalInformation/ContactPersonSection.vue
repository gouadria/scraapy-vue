<template>
  <div class="Business_box">
    <div class="box_title">
      <userCheckIcon />
      {{ $t('legalInformation.ContactPersonDetails') }}
    </div>
    <div class="input_group">
      <inputField
        :label="$t('legalInformation.PersonName')"
        :placeholder="$t('legalInformation.PositionPleaceHolder')"
        :error="v$.LegalInformation?.primary_contact_person_name?.$errors[0]?.$message"
        :value="LegalInformation.primary_contact_person_name"
        @update="LegalInformation.primary_contact_person_name = $event"
        required
        :class="{ highlight: missingDetails.includes('contant_person_name') }"
      />
      <inputField
        :label="$t('legalInformation.PersonPosition')"
        :placeholder="$t('legalInformation.PersonPosition')"
        :error="v$.LegalInformation?.primary_contact_person_position?.$errors[0]?.$message"
        :value="LegalInformation.primary_contact_person_position"
        @update="LegalInformation.primary_contact_person_position = $event"
        required
      />
    </div>
    <div class="input_group">
      <inputField
        :label="$t('legalInformation.PhoneNumber')"
        type="phone"
        :placeholder="$t('legalInformation.mentionednumber')"
        :error="v$.LegalInformation?.primary_contact_person_contact_number?.$errors[0]?.$message"
        :value="LegalInformation.primary_contact_person_contact_number"
        @update="LegalInformation.primary_contact_person_contact_number = $event"
        @validate="emitContactValidation"
        required
      />
      <inputField
        :label="$t('legalInformation.EmailAddress')"
        :placeholder="$t('legalInformation.mentionedEmailAddress')"
        :error="v$.LegalInformation?.primary_contact_person_email_address?.$errors[0]?.$message"
        :value="LegalInformation.primary_contact_person_email_address"
        @update="LegalInformation.primary_contact_person_email_address = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import inputField from '../UIElements/inputField.vue'
import userCheckIcon from '@/assets/svg-icons/listings/userCheckIcon.vue'
import type { BusinessLegalDetails } from '@/models/businessLegalDetails'

export default defineComponent({
  name: 'ContactPersonSection',
  components: {
    inputField,
    userCheckIcon
  },
  props: {
    LegalInformation: {
      type: Object as PropType<BusinessLegalDetails>,
      required: true
    },
    v$: {
      type: Object,
      required: true
    },
    missingDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitContactValidation(contact: any) {
      this.$emit('update-contact', contact)
    }
  },
  mounted() {
    console.log('missing data', this.missingDetails)
  }
})
</script>

<style scoped>
.Business_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}
.Business_box .box_title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.input_group {
  width: 100%;
  display: flex;
  gap: 20px;
}
.input_group .input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.input_group .input label {
  color: #454545;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-item {
  width: 100%;
}
.highlight {
  border-radius: 8px;
  border: 1px solid #fda29b;
  background: #fff;
  box-shadow:
    0px 1px 2px 0px rgba(16, 24, 40, 0.05),
    0px 0px 0px 4px rgba(240, 68, 56, 0.24);
  padding: 6px;
}
.highlight:hover {
  background-color: rgba(rgba(240, 68, 56, 0.24), 0.15);
}
</style>
