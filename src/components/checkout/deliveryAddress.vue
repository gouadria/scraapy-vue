<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'
import MapElement from '@/components/UIElements/MapElement.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export default defineComponent({
  name: 'AddressForm',
  components: {
    MapElement,
    inputField,
    MainBtn
  },
  props: {
    type: {
      type: String,
      default: 'address'
    },
    addressName: {
      type: Boolean,
      default: true
    },
    address: {
      type: Object,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    extra_inputs: {
      type: Boolean,
      default: true,
      required: false
    },
    deletable: {
      type: Boolean,
      default: false,
      required: false
    },
    checkout: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['update', 'deleteAddress', 'addressSelected'],
  setup() {
    return { v$: useVuelidate(), scoped: true }
  },
  data() {
    return {
      id: this.address?.id || '',
      addressNameStr: this.address?.addressName || '',
      latitude: this.address?.latitude || 0,
      longitude: this.address?.longitude || 0,
      addressLine1: this.address?.addressLine1 || '',
      addressLine2: this.address?.addressLine2 || '',
      province: this.address?.province || '',
      city: this.address?.city || '',
      zipCode: this.address?.zipCode || '',
      country: this.address?.country || '',
      contactName: this.address?.contactName || '',
      contactNumber: this.address?.contactNumber || '',
      isSaved: this.address ? true : false,
      animationStage: this.address ? 5 : 0,
      intervalId: null as number | null,
      selected: this.isSelected,
      validateContact: {},
      contactError: null as string | null
    }
  },

  watch: {
    isSelected(newValue) {
      this.selected = newValue
    }
  },
  computed: {
    computedAddress() {
      return {
        id: this.id,
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        city: this.city,
        province: this.province,
        zipCode: this.zipCode,
        country: this.country,
        latitude: this.latitude,
        longitude: this.longitude
      }
    }
  },
  validations() {
    const rules = {}
    if (this.required) {
      rules.addressLine1 = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }
      rules.province = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }
      rules.city = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }
      rules.zipCode = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }
      ;(rules.country = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }),
        (rules.contactName = {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        }),
        (rules.contactNumber = {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
          minLength: helpers.withMessage(
            () => this.$t('validations.minLength', { min: 10 }),
            minLength(10)
          ),
          maxLength: helpers.withMessage(
            () => this.$t('validations.maxLength', { max: 10 }),
            maxLength(10)
          )
        })
    }
    return rules
  },
  methods: {
    handleAddressSelection(value: boolean) {
      if (this.contactError) {
        return
      }
      this.selected = value
      if (value) {
        const addressData = {
          id: this.address?.id,
          addressName: this.addressNameStr,
          latitude: this.latitude,
          longitude: this.longitude,
          addressLine1: this.addressLine1,
          addressLine2: this.addressLine2,
          province: this.province,
          city: this.city,
          zipCode: this.zipCode,
          country: this.country,
          contactName: this.contactName,
          contactNumber: this.contactNumber
        }
        this.$emit('addressSelected', addressData)
      }
    },
    validateContactUpdate() {
      if (this.validateContact == {} || this.validateContact === null) {
        this.contactError = null
        return
      }
      this.contactError =
        this.validateContact.valid && this.validateContact.possible
          ? null
          : this.$t('validations.invalidPhoneNumber')
    },
    updateAddressFields(addressComponents: AddressComponent[]) {
      const contactNumber = this.validateContact.number
      if (contactNumber) {
        console.log('Contact Number:', contactNumber)
        this.contactNumber = contactNumber
      }
      const clean_address = addressComponents.reduce(
        (acc, component) => {
          acc[component.types[0]] = component.long_name
          return acc
        },
        {} as Record<string, string>
      )

      // Only set ID if it doesn't already exist
      if (!this.id && clean_address.id) {
        this.id = clean_address.id
      }

      // Update other fields regardless of existing ID
      this.latitude = clean_address.lat
      this.longitude = clean_address.lng
      this.addressLine1 = clean_address.street_number ? clean_address.street_number + ' ' : ''
      this.addressLine1 += clean_address.route || ''
      this.addressLine2 = clean_address.political || clean_address.neighborhood
      this.city = clean_address.locality
      this.province = clean_address.administrative_area_level_1
      this.zipCode = clean_address.postal_code
      this.country = clean_address.country
      this.contactName = clean_address.contact_name || ''
      this.contactNumber = clean_address.contact_number || ''
    },

    updateStage() {
      this.animationStage += 1
      if (this.animationStage === 4) {
        this.isSaved = true
      } else if (this.animationStage === 5) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },

    submitForm() {
      const contactNumber = this.validateContact.number
      if (contactNumber) {
        console.log('Contact Number:', contactNumber)
        this.contactNumber = contactNumber
      }

      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }
      if (!this.addressNameStr) {
        this.addressNameStr = this.city
      }

      const formData = {
        id: this.id,
        addressName: this.addressNameStr,
        latitude: this.latitude,
        longitude: this.longitude,
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        province: this.province,
        city: this.city,
        zipCode: this.zipCode,
        country: this.country,
        contactName: this.contactName,
        contactNumber: this.contactNumber
      }
      this.$emit('update', formData)
      if (this.intervalId) return
      this.intervalId = setInterval(this.updateStage, 200)
    },
    editAddress() {
      this.isSaved = false
      this.animationStage = 0
      this.v$.$reset()
    },

    deleteAddress() {
      this.$emit('deleteAddress')
    }
  }
})
</script>

<template>
  <div :class="['address-container', { saved: isSaved }, `stage-${animationStage}`]">
    <h2>{{ $t('deliveryAddress.dropPin') }}</h2>

    <MapElement
      :gSearch="!isSaved"
      :zoomBtns="!isSaved"
      @address-changed="updateAddressFields"
      :address="address"
      :isSaved="isSaved"
      :updateMarker="!isSaved"
      class="map"
      :type="type"
    />

    <transition name="fade-transform" mode="out-in" v-auto-animate>
      <div class="form-container" v-if="!isSaved" key="edit-form">
        <div class="address-form">
          <div class="form-field full-width" v-if="type === 'address'">
            <inputField
              v-if="addressName"
              :label="$t('deliveryAddress.addressName')"
              :placeholder="$t('deliveryAddress.addressName')"
              :value="addressNameStr"
              @update="addressNameStr = $event"
              required
            />
          </div>

          <div class="form-field" v-if="type === 'address'">
            <inputField
              :label="$t('deliveryAddress.addressLine1')"
              :placeholder="$t('deliveryAddress.enterAddress')"
              :value="addressLine1"
              :error="v$.addressLine1?.$errors[0]?.$message"
              @update="addressLine1 = $event"
              required
            />
          </div>

          <div class="form-field" v-if="type === 'address'">
            <inputField
              :label="$t('deliveryAddress.addressLine2')"
              :placeholder="$t('deliveryAddress.enterAddress')"
              :error="v$.addressLine2?.$errors[0]?.$message"
              :value="addressLine2"
              @update="addressLine2 = $event"
            />
          </div>

          <div class="form-field">
            <inputField
              :label="$t('deliveryAddress.city')"
              :placeholder="$t('deliveryAddress.enterCity')"
              :error="v$.city?.$errors[0]?.$message"
              :value="city"
              @update="city = $event"
              required
            />
          </div>

          <div class="form-field" v-if="type === 'address'">
            <inputField
              :label="$t('deliveryAddress.province')"
              :placeholder="$t('deliveryAddress.enterProvince')"
              :error="v$.province?.$errors[0]?.$message"
              :value="province"
              @update="province = $event"
              required
            />
          </div>

          <div class="form-field" v-if="type === 'address'">
            <inputField
              :label="$t('deliveryAddress.zipCode')"
              :placeholder="$t('deliveryAddress.enterZipCode')"
              :error="v$.zipCode?.$errors[0]?.$message"
              :value="zipCode"
              @update="zipCode = $event"
              required
            />
          </div>

          <div class="form-field" v-if="type === 'address'">
            <inputField
              :label="$t('deliveryAddress.country')"
              :placeholder="$t('deliveryAddress.enterCountry')"
              :error="v$.country?.$errors[0]?.$message"
              :value="country"
              @update="country = $event"
              required
            />
          </div>

          <div class="form-field" v-if="type === 'address' && extra_inputs">
            <inputField
              :label="$t('deliveryAddress.contactName')"
              :placeholder="$t('deliveryAddress.enterContactName')"
              :value="contactName"
              :error="v$.contactName?.$errors[0]?.$message"
              @update="contactName = $event"
            />
          </div>

          <div class="form-field" v-if="type === 'address' && extra_inputs">
            <inputField
              :label="$t('deliveryAddress.contactNumber')"
              :placeholder="$t('deliveryAddress.enterContactNumber')"
              :value="contactNumber"
              @update="contactNumber = $event"
              :error="v$.contactNumber?.$errors[0]?.$message"
              @validate="validateContactUpdate = $event"
            />
          </div>

          <div class="form-actions full-width">
            <MainBtn type="green" @click="submitForm">
              {{ $t('deliveryAddress.saveAddress') }}
            </MainBtn>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-transform" mode="out-in">
      <div v-if="isSaved" key="display-form" class="isSaved_box">
        <div class="address-display">
          <div class="header">
            <h3>{{ addressNameStr }}</h3>
            <inputField
              v-if="checkout"
              type="checkbox"
              :value="selected"
              @update="handleAddressSelection"
              name="delivery-address"
            />
          </div>

          <div class="address-wrapper">
            <p v-if="type === 'address'">{{ addressLine1 }}</p>
            <p v-if="type === 'address' && addressLine2">{{ addressLine2 }}</p>
            <p>
              {{ city }}
              <span v-if="type === 'address'">
                , {{ province }}, {{ zipCode }}, {{ country }}
              </span>
            </p>
          </div>
          <p v-if="type === 'address' && contactName">{{ contactName }}</p>
          <p v-if="type === 'address' && contactNumber">{{ contactNumber }}</p>
        </div>
        <div class="btn-wrapper" v-auto-animate v-if="!disabled">
          <MainBtn v-if="isSaved" type="white" @click="editAddress">
            {{ $t('deliveryAddress.edit') }}
            <!-- {{ type === 'address' ? $t('deliveryAddress.Address') : 'deliveryAddress.City' }} -->
            <img src="@/assets/svg-icons/edit.svg?url" alt="" />
          </MainBtn>
          <MainBtn v-if="deletable" @click="deleteAddress">
            <img src="@/assets/documents_svg/trash.svg?url" alt="" />
          </MainBtn>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.address-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px 16px;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid var(--Dark-50, #f6f6f6);
  width: 100%;
  transition: all 0.3s ease;
  overflow: hidden;
}
/* .address-container.saved {
  flex-direction: row;
} */
.address-container.saved.stage-5 {
  margin-bottom: 6px;
}

.btn-wrapper {
  /* max-width: 117px; */
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.form-container {
  width: 100%;
}

.address-form {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  max-height: 1000px;
  opacity: 1;
  overflow: hidden;
}

h2 {
  opacity: 1;
}

.address-container.stage-1 h2,
.address-container.stage-2 h2,
.address-container.stage-3 h2,
.address-container.stage-4 h2,
.address-container.stage-5 h2 {
  display: none;
}

.address-container.stage-1 .address-form,
.address-container.stage-2 .address-form,
.address-container.stage-3 .address-form {
  max-height: 0;
  opacity: 0;
}

.address-container.stage-4,
.address-container.stage-5 {
  flex-direction: row;
}

.address-container.stage-4 .address-form {
  max-height: 1000px;
  opacity: 1;
  display: flex;
  flex-direction: column;
}

.address-display {
  display: flex;
  flex-direction: column;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  width: 100%;
  height: 100%;
}
.isSaved_box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}
.address-container.stage-5 .address-display {
  opacity: 1;
}

.address-container.saved .map {
  max-width: 210px;
  min-width: 150px;
}

.address-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 15px 0;
}

.address-container.saved .address-form {
  gap: 5px;
}

.address-container.saved h3 {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

h2 {
  color: #121212;
  font-size: 14px;
  font-weight: 500;
}

.map {
  height: 100%;
  transition: all 1s ease;
}

.address-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
}

.form-field {
  grid-column: span 1;
}

.full-width {
  grid-column: span 2;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.form-actions.full-width {
  grid-column: span 2;
}

@media (max-width: 600px) {
  .address-form {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }

  .address-form .form-field {
    grid-column: span 2;
  }
  .address-container.saved h3 {
    font-size: 14px;
  }

  .address-wrapper p {
    color: var(--Dark-700, #4f4f4f);
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
