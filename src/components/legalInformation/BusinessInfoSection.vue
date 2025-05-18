<template>
  <div class="Business_box">
    <div class="box_title">
      <img src="@/assets/svg-icons/profile-menu/addresses.svg?url" alt="" />
      {{ $t('legalInformation.businessName') }}
    </div>
    <div class="input_group">
      <deliveryAddress
        :addressName="false"
        :address="address"
        :required="true"
        @update="handleAddressUpdate"
      />
    </div>
    <div class="input_group">
      <inputField
        :label="$t('legalInformation.PhoneNumber')"
        :placeholder="$t('legalInformation.PhoneNumber')"
        :value="profileInformation.contact_number"
        @update="profileInformation.contact_number = $event"
        disabled
      />
      <inputField
        :label="$t('legalInformation.EmailAddress')"
        :placeholder="$t('legalInformation.EmailAddress')"
        :value="profileInformation.email"
        @update="profileInformation.email = $event"
        disabled
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import inputField from '../UIElements/inputField.vue'
import deliveryAddress from '../checkout/deliveryAddress.vue'
import type { BusinessLegalDetails } from '@/models/businessLegalDetails'

export default defineComponent({
  name: 'BusinessInfoSection',
  components: {
    inputField,
    deliveryAddress
  },
  props: {
    profileInformation: {
      type: Object as PropType<{ contact_number: string; email: string }>,
      required: true
    },
    LegalInformation: {
      type: Object as PropType<BusinessLegalDetails>,
      required: true
    }
  },
  computed: {
    address() {
      if (!this.LegalInformation.address_line1) return null
      return {
        addressLine1: this.LegalInformation.address_line1,
        addressLine2: this.LegalInformation.address_line2,
        city: this.LegalInformation.city,
        province: this.LegalInformation.province,
        zipCode: this.LegalInformation.zip_code,
        country: this.LegalInformation.country,
        latitude: this.LegalInformation.latitude,
        longitude: this.LegalInformation.longitude
      }
    }
  },
  methods: {
    handleAddressUpdate(address: any) {
      this.$emit('update-address', address)
    }
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
</style>
