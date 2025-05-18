<script lang="ts">
import { defineComponent } from 'vue'
import inputField from '@/components/UIElements/inputField.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, email } from '@vuelidate/validators'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import type { Driver } from '@/models/Driver'
import progressBar from '@/components/UIElements/progressBar.vue'
import stepTitle from '@/components/my_listings/step_title.vue'
import FleetDocumentUploadCard from './fleet_document_upload_box.vue'
import { toast } from 'vue3-toastify'
import rentIcon from '@/assets/svg-icons/rent_icon.svg'
// Icons
import EssentialsIcon from '@/assets/svg-icons/EssentialsIcon.vue'
import FleetIcon from '@/assets/svg-icons/fleet.svg'
import DeleteIcon from '@/assets/svg-icons/delete_button.svg'
import bankNotIcon from '@/assets/svg-icons/Selling/bank-note-01.svg'
import truckDelivery from '@/assets/svg-icons/listings/rent-out.svg'
import plusIcon from '@/assets/svg-icons/listings/plus.svg'
import layoutaltIcon from '@/assets/svg-icons/listings/layout-alt-03.svg'
import attachmentIcon from '@/assets/svg-icons/attachment.svg'
export default defineComponent({
  components: {
    inputField,
    MainBtn,
    progressBar,
    stepTitle,
    FleetDocumentUploadCard
  },
  emits: ['save', 'close'],
  props: {
    Driver: {
      type: Object as () => Driver,
      required: true
    }
  },
  data() {
    return {
      DriverData: {} as Driver,
      v$: useVuelidate(),
      isEditMode: false,
      tmpImages: [] as File[],
      step: 0,
      stepTitles: [
        this.$t('addDriver.DriverDetails'),
        this.$t('addDriver.VehicleDetails'),
        this.$t('addDriver.Documents'),
        this.$t('ListingSteps.Complete')
      ],
      EssentialsIcon,
      rentIcon,
      FleetIcon,
      DeleteIcon,
      layoutaltIcon,
      bankNotIcon,
      truckDelivery,
      attachmentIcon,
      plusIcon,
      selectedMake: ''
    }
  },
  validations() {
    if (this.step === 0) {
      return {
        DriverData: {
          name: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          email: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
            email: helpers.withMessage(() => this.$t('validations.email'), email)
          },
          id_number: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
            minLength: helpers.withMessage(
              () => this.$t('validations.minLength', { min: 10 }),
              minLength(10)
            ),
            maxLength: helpers.withMessage(
              () => this.$t('validations.maxLength', { max: 10 }),
              maxLength(20)
            )
          },
          contact_number: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
            minLength: helpers.withMessage(
              () => this.$t('validations.minLength', { min: 10 }),
              minLength(10)
            ),
            maxLength: helpers.withMessage(
              () => this.$t('validations.maxLength', { max: 10 }),
              maxLength(20)
            )
          }
        }
      }
    }

    if (this.step === 1) {
      return {
        DriverData: {
          make: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          model: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          model_year: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          plate_number: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
        }
      }
    }

    if (this.step === 2) {
      return {
        DriverData: {
          driver_id_file: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          driver_id_expiry: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          license_file: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          license_expiry: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          insurance_file: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          insurance_expiry: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          vehicle_registration_file: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          vehicle_registration_expiry: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
        }
      }
    }
    return {}
  },
  methods: {
    nextStep() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
        console.log(this.v$.$errors)
        console.log('DriverData', this.DriverData)
        return
      }
      if (this.step < 2) {
        this.step++
      } else if (this.step === 2) {
        this.createDriver()
      }
    },
    backStep() {
      if (this.step != 0) {
        this.step--
      }
    },
    async createDriver() {
      try {
        // Validate the entire form before submission
        this.v$.$touch()
        if (this.v$.$invalid) {
          toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }

        // Create FormData for multipart/form-data payload
        const formData = new FormData()
        formData.append('name', this.DriverData.name)
        formData.append('email', this.DriverData.email)
        formData.append('id_number', this.DriverData.id_number)
        if (this.DriverData.contact_number) {
          formData.append('contact_number', this.DriverData.contact_number)
        }
        formData.append('make', this.DriverData.make)
        formData.append('model', this.DriverData.model)
        formData.append('model_year', this.DriverData.model_year)
        formData.append('plate_number', this.DriverData.plate_number)

        // Append file fields if they are File instances
        if (this.DriverData.driver_id_file instanceof File) {
          formData.append('driver_id_file', this.DriverData.driver_id_file)
        }
        if (this.DriverData.driver_id_expiry) {
          formData.append('driver_id_expiry', this.DriverData.driver_id_expiry)
        }
        if (this.DriverData.license_file instanceof File) {
          formData.append('license_file', this.DriverData.license_file)
        }
        if (this.DriverData.license_expiry) {
          formData.append('license_expiry', this.DriverData.license_expiry)
        }
        if (this.DriverData.vehicle_registration_file instanceof File) {
          formData.append('vehicle_registration_file', this.DriverData.vehicle_registration_file)
        }
        if (this.DriverData.vehicle_registration_expiry) {
          formData.append(
            'vehicle_registration_expiry',
            this.DriverData.vehicle_registration_expiry
          )
        }
        if (this.DriverData.insurance_file instanceof File) {
          formData.append('insurance_file', this.DriverData.insurance_file)
        }
        if (this.DriverData.insurance_expiry) {
          formData.append('insurance_expiry', this.DriverData.insurance_expiry)
        }

        // Make POST request to api/driver/create
        const response = await this.$axios.post('/api/driver/create/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // Success handling
        toast.success(this.$t('addDriver.DriverSuccessfullyAdded'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
        console.log('Driver created successfully:', response)
        this.DriverData = { ...this.DriverData, ...response.data } // Update with response data
        this.step = 3 // Move to success step
        this.$emit('save', this.DriverData) // Notify parent component
      } catch (error: any) {
        console.error('Error creating driver:', error)
        const errorMessage = error.response?.data?.message || this.$t('errorsMsgs.genericError')
        toast.error(errorMessage, {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      }
    }
  }
})
</script>
<template>
  <div class="create_driver" v-auto-animate>
    <div class="header">
      <div class="header_text">
        <div class="back" @click="$emit('close')">
          <img src="@/assets/svg-icons/chevron-left.svg?url" alt="chevron" />
          {{ $t('listings.back') }}
        </div>
        <div class="title">
          {{ DriverData.id ? $t('addDriver.DriverEdit') : $t('addDriver.AddDriver') }}
        </div>
      </div>
      <progressBar :currentStep="step" :steps="stepTitles" />
    </div>

    <section class="Essentials step_section" v-if="step === 0">
      <stepTitle
        :title="$t('addDriver.DriverDetails')"
        :subTitle="$t('addDriver.DriverDetailsSubTitle')"
        :icon="EssentialsIcon"
      />

      <inputField
        :label="$t('addDriver.fullName')"
        :value="DriverData.name"
        type="text"
        :placeholder="$t('addDriver.fullName')"
        :error="v$.DriverData.name?.$errors[0]?.$message"
        required
        @update="DriverData.name = $event"
      />

      <inputField
        :label="$t('addDriver.IDNumber')"
        :value="DriverData.id_number"
        type="text"
        :placeholder="$t('addDriver.IDNumber')"
        :error="v$.DriverData.id_number?.$errors[0]?.$message"
        required
        @update="DriverData.id_number = $event"
      />

      <inputField
        :label="$t('addDriver.emailAddress')"
        :value="DriverData.email"
        type="text"
        :placeholder="$t('addDriver.emailAddress')"
        :error="v$.DriverData.email?.$errors[0]?.$message"
        required
        @update="DriverData.email = $event"
      />

      <inputField
        :label="$t('addDriver.MobileNumber')"
        :value="DriverData.contact_number"
        type="text"
        :placeholder="$t('addDriver.MobileNumber')"
        :error="v$.DriverData.contact_number?.$errors[0]?.$message"
        required
        @update="DriverData.contact_number = $event"
      />
    </section>

    <section class="Price step_section" v-if="step === 1">
      <stepTitle
        :title="$t('ListingSteps.Price')"
        :subTitle="$t('ListingSteps.PriceText')"
        :icon="rentIcon"
      />

      <div class="input-group">
        <inputField
          type="text"
          :label="$t('listings.VehicleMake')"
          :placeholder="$t('listings.VehicleMake')"
          :value="selectedMake"
          :error="v$.DriverData?.make?.$errors[0]?.$message"
          @update="DriverData.make = $event"
          required
        />
      </div>

      <div class="input-group">
        <inputField
          type="text"
          :label="$t('listings.VehicleModel')"
          :placeholder="$t('listings.VehicleModel')"
          :value="DriverData.model"
          :error="v$.DriverData?.model?.$errors[0]?.$message"
          @update="DriverData.model = $event"
          required
        />
      </div>

      <div class="input-group">
        <inputField
          type="text"
          :label="$t('listings.ModelYear')"
          :placeholder="$t('listings.ModelYear')"
          :value="DriverData.model_year"
          :error="v$.DriverData?.model_year?.$errors[0]?.$message"
          @update="DriverData.model_year = $event"
          required
        />
      </div>

      <inputField
        :label="$t('listings.PlateNumber')"
        :value="DriverData.plate_number"
        type="text"
        :placeholder="$t('listings.PlateNumber')"
        :error="v$.DriverData?.plate_number?.$errors[0]?.$message"
        required
        @update="DriverData.plate_number = $event"
      />
    </section>

    <section class="Fleet step_section" v-if="step === 2">
      <stepTitle
        :title="$t('addDriver.AttachDocuments')"
        :subTitle="$t('addDriver.AttachSubTitle')"
        :icon="attachmentIcon"
        :bar__fill="false"
      />

      <div class="row">
        <FleetDocumentUploadCard
          :title="$t('listings.DriversID')"
          @update:expiryDate="DriverData.driver_id_expiry = $event"
          @update:file="DriverData.driver_id_file = $event"
          class="col-6"
          :expiryError="v$.DriverData?.driver_id_expiry?.$errors[0]?.$message"
          :expiryMSG="v$.DriverData?.driver_id_file?.$errors[0]?.$message"
          :fileError="v$.DriverData?.driver_id_file?.$errors[0]?.$message"
          :fileMSG="v$.DriverData?.driver_id_expiry?.$errors[0]?.$message"
          :file="DriverData.driver_id_file"
          :expiryDate="DriverData.driver_id_expiry"
        />
        <FleetDocumentUploadCard
          :title="$t('listings.DriversLicense')"
          @update:expiryDate="DriverData.license_expiry = $event"
          @update:file="DriverData.license_file = $event"
          class="col-6"
          :expiryError="v$.DriverData?.license_expiry?.$errors[0]?.$message"
          :expiryMSG="v$.DriverData?.license_file?.$errors[0]?.$message"
          :fileError="v$.DriverData?.license_file?.$errors[0]?.$message"
          :fileMSG="v$.DriverData?.license_expiry?.$errors[0]?.$message"
          :file="DriverData.license_file"
          :expiryDate="DriverData.license_expiry"
        />
      </div>

      <div class="row">
        <FleetDocumentUploadCard
          :title="$t('addDriver.VehicleInsurance')"
          @update:expiryDate="DriverData.insurance_expiry = $event"
          @update:file="DriverData.insurance_file = $event"
          class="col-6"
          :expiryError="v$.DriverData?.insurance_expiry?.$errors[0]?.$message"
          :expiryMSG="v$.DriverData?.insurance_file?.$errors[0]?.$message"
          :fileError="v$.DriverData?.insurance_file?.$errors[0]?.$message"
          :fileMSG="v$.DriverData?.insurance_expiry?.$errors[0]?.$message"
          :file="DriverData.insurance_file"
          :expiryDate="DriverData.insurance_expiry"
        />
        <FleetDocumentUploadCard
          :title="$t('addDriver.VehicleRegistration')"
          @update:expiryDate="DriverData.vehicle_registration_expiry = $event"
          @update:file="DriverData.vehicle_registration_file = $event"
          class="col-6"
          :expiryError="v$.DriverData?.vehicle_registration_expiry?.$errors[0]?.$message"
          :expiryMSG="v$.DriverData?.vehicle_registration_file?.$errors[0]?.$message"
          :fileError="v$.DriverData?.vehicle_registration_file?.$errors[0]?.$message"
          :fileMSG="v$.DriverData?.vehicle_registration_expiry?.$errors[0]?.$message"
          :file="DriverData.vehicle_registration_file"
          :expiryDate="DriverData.vehicle_registration_expiry"
        />
      </div>
    </section>
    <section class="Complete step_section" v-if="step === 3">
      <div class="success-header">
        <div class="success-title">
          <div class="success-header-icon">
            <img src="@/assets/svg-icons/checkmark.svg?url" alt="checkmark" />
          </div>
          {{ DriverData.id ? $t('addDriver.DriverEdit') : $t('addDriver.DriverAdded') }}
        </div>
        <div class="success-header-subtitle">
          {{
            DriverData.id
              ? $t('addDriver.DriverEditSuccess')
              : $t('addDriver.DriverSuccessfullyAdded')
          }}
        </div>
        <div class="btn-group">
          <MainBtn type="green" @click="$emit('close')">
            <div class="btn-content">{{ $t('addDriver.BackLogistics') }}</div>
          </MainBtn>
        </div>
      </div>
    </section>
    <div class="divider"></div>
    <div class="steps_actions" v-if="step != 3">
      <MainBtn @click="backStep" v-if="step > 0">{{ $t('listings.previous') }}</MainBtn>
      <MainBtn type="green" @click="nextStep">
        {{ step < 2 ? $t('listings.Next') : $t('listings.addListing') }}
      </MainBtn>
    </div>
  </div>
</template>

<style scoped>
.header_text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.create_driver {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 20px;
}
.create_driver .header {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
}
.create_driver .progress-bar {
  max-width: 60%;
}
.step_section {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 540px;
}
.input-group {
  width: 100%;
}
.input-item {
  width: 100%;
}
.steps_actions {
  display: flex;
  gap: 12px;
}
.steps_actions button {
  padding: 12px 50px;
}
.Price.step_section {
  gap: 32px;
}
.price_item {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.price_item_group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.Fleet.step_section {
  max-width: 50rem;
}
.add_new_fleet {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 20px;
  cursor: pointer;
}
.add_new_fleet .icon_circel {
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 44px;
  border: 2px solid #e7e7e7;
  background: #fff;
}
.fleet_container {
  display: flex;
  width: 100%;
  gap: 30px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 30px;
  width: 100%;
}
.col {
  position: relative;
  width: 100%;
}
.col-12 {
  width: 100%;
}
.col-6 {
  width: calc(50% - 15px);
}
.col-4 {
  width: calc(33.333333% - 20px);
}
.col-3 {
  width: calc(25% - 22.5px);
}

@media (min-width: 768px) {
  .col-md-6 {
    width: calc(50% - 15px);
  }
  .col-md-4 {
    width: calc(33.333333% - 20px);
  }
  .col-md-3 {
    width: calc(25% - 22.5px);
  }
}

@media (min-width: 992px) {
  .col-lg-6 {
    width: calc(50% - 15px);
  }
  .col-lg-4 {
    width: calc(33.333333% - 20px);
  }
  .col-lg-3 {
    width: calc(25% - 22.5px);
  }
}

.modal_new_fleet .modal .header {
  display: flex;
  flex-direction: column;
  border: none;
}
.fleetDocuments {
  display: flex;
  flex-direction: wrap;
}
.AddUnit_action {
  display: flex;
}
/* End New Steps Code */
.success-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.success-title {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--Dark-950, #121212);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

.success-header-icon {
  width: 50px;
  height: 50px;
}

.success-header-icon img {
  width: 100%;
  height: 100%;
}

.success-header-subtitle {
  color: var(--Dark-700, #4f4f4f);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e7e7e7;
}

/* .input-group,
.section {
  max-width: 540px;
} */

.input-group.box {
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
}

.full-width {
  width: 100%;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
}

.section h1 {
  color: var(--Dark-700, #4f4f4f);
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
}

.section span {
  color: var(--Dark-500, #6d6d6d);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.title {
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #b0b0b0;
}

html[dir='rtl'] .back img {
  transform: rotate(180deg);
}
.unsaved-changes {
  color: #f04438;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
}
.error_validation {
  color: #f04438;
}
.btn-group {
  display: flex;
  gap: 1rem;
}

.btn-content {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
  white-space: nowrap;
}
.validation_errors {
  display: flex;
  padding-top: 12px;
  color: red;
}
@media (max-width: 1024px) {
  .create_driver .header {
    flex-direction: column;
    width: 100%;
  }
  .create_driver .progress-bar {
    max-width: 100%;
  }
  .step_section {
    max-width: 100%;
  }
}
@media (max-width: 768px) {
  .Price .price_item {
    flex-direction: column;
  }
}
</style>
