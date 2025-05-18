<template>
  <div class="Business_Legal_Details">
    <div class="header">
      <div class="text">
        <h1>{{ $t('legalInformation.LegalInformation') }}</h1>
        <p>{{ $t('legalInformation.LegalInformationMSG') }}</p>
      </div>
      <MainBtn @click="backButton" type="blue">
        {{ $t('legalInformation.back') }}
      </MainBtn>
    </div>
    <div class="divider"></div>
    <div class="form_details">
      <!-- Business Info Section -->
      <BusinessInfoSection
        :profileInformation="profileInformation"
        :LegalInformation="LegalInformation"
        @update-address="handleAddressUpdate"
        :missingDetails="missingDetails"
      />

      <div class="divider"></div>

      <!-- Contact Person Section -->
      <ContactPersonSection
        :LegalInformation="LegalInformation"
        :v$="v$"
        @update-contact="validateContactUpdate"
        :missingDetails="missingDetails"
      />

      <div class="divider"></div>

      <!-- Business Documents Section -->
      <BusinessDocumentsSection
        :LegalInformation="LegalInformation"
        :v$="v$"
        @upload-cr="uploadCrPDF"
        @upload-vat="uploadVatPDF"
        @remove-cr="removeCrPDF"
        @remove-vat="removeVatPDF"
        :missingDetails="missingDetails"
      />

      <div class="divider"></div>

      <!-- Actions -->
      <div class="actions">
        <MainBtn @click="editLegalInformation" type="green">
          {{ $t('legalInformation.add') }}
        </MainBtn>
      </div>
    </div>

    <!-- Modal Component -->
    <ModalComponent
      :modal-active="isActive"
      :closeActive="true"
      @close="openAddAddress"
      class="add_new_address"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import BusinessInfoSection from './BusinessInfoSection.vue'
import ContactPersonSection from './ContactPersonSection.vue'
import BusinessDocumentsSection from './BusinessDocumentsSection.vue'
import ModalComponent from '../UIElements/ModalComponent.vue'
import type { BusinessLegalDetails } from '@/models/businessLegalDetails'

export default defineComponent({
  name: 'Business_Legal_Details',
  components: {
    MainBtn,
    BusinessInfoSection,
    ContactPersonSection,
    BusinessDocumentsSection,
    ModalComponent
  },
  props: {
    backButton: {
      type: Function as PropType<() => void>,
      required: true
    },
    legalDetails: {
      type: Object as PropType<BusinessLegalDetails>,
      required: true
    },
    profileDetails: {
      type: Object,
      required: true
    },
    missingDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      LegalInformation: { ...this.legalDetails } as BusinessLegalDetails,
      profileInformation: { ...this.profileDetails },
      isActive: false,
      validateContact: {},
      contactError: null as string | null,
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      LegalInformation: {
        cr_number: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        vat_number: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        primary_contact_person_name: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        primary_contact_person_position: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        primary_contact_person_contact_number: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        primary_contact_person_email_address: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        }
      }
    }
  },
  methods: {
    // Utility function to compute differences between two objects
    getChangedFields(original: any, modified: any) {
      const changes: any = {}
      for (const key in modified) {
        if (Object.prototype.hasOwnProperty.call(modified, key)) {
          // Handle nested objects or special cases if needed
          if (JSON.stringify(original[key]) !== JSON.stringify(modified[key])) {
            changes[key] = modified[key]
          }
        }
      }
      return changes
    },
    async editLegalInformation() {
      try {
        // Touch validation and check for errors as you already do
        this.v$.$touch()
        if (this.v$.$invalid) {
          toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }
        if (this.contactError) {
          toast.error(this.$t('errorsMsgs.invalidContact'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }

        // Update contact number if needed
        this.LegalInformation.primary_contact_person_contact_number = this.validateContact.number

        // Create a diff object by comparing with original legal details (passed as prop)
        const changes: Partial<BusinessLegalDetails> = {}
        for (const key in this.LegalInformation) {
          // Using strict equality; for nested objects, consider a deep comparison method
          if (this.LegalInformation[key] !== this.legalDetails[key]) {
            changes[key] = this.LegalInformation[key]
          }
        }
        console.log('Changes:', changes)
        // Dispatch the patch action with only the changes
        if (Object.keys(changes).length === 0) {
          toast.info(this.$t('legalInformation.noChanges'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }
        await this.$userStore.dispatch('patchBusinessProfile', {
          business_profile: changes
        })

        toast.success(this.$t('legalInformation.legalInformationAdded'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      } catch (error) {
        console.error('Error adding legal information:', error)
        toast.error(this.$t('errorsMsgs.somethingWentWrong'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      }
    },
    openAddAddress() {
      this.isActive = !this.isActive
    },
    handleAddressUpdate(address: any) {
      this.LegalInformation = {
        ...this.LegalInformation,
        address_line1: address.addressLine1,
        address_line2: address.addressLine2,
        city: address.city,
        province: address.province,
        zip_code: address.zipCode,
        country: address.country,
        latitude: address.latitude,
        longitude: address.longitude
      }
    },
    uploadCrPDF(file: File) {
      console.log('Uploaded CR PDF:', file)
      this.LegalInformation.cr_document = file
    },
    uploadVatPDF(file: File) {
      console.log('Uploaded VAT PDF:', file)
      this.LegalInformation.vat_document = file
    },
    removeCrPDF(file: File | null | string) {
      if (file) this.LegalInformation.cr_document = null
      toast.info(this.$t('legalInformation.fileRemoved'), {
        position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
        autoClose: 3000
      })
    },
    removeVatPDF(file: File | null | string) {
      if (file) this.LegalInformation.vat_document = null
      toast.info(this.$t('legalInformation.fileRemoved'), {
        position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
        autoClose: 3000
      })
    },
    validateContactUpdate(contact: any) {
      this.validateContact = contact
      this.contactError =
        contact.valid && contact.possible ? null : this.$t('validations.invalidPhoneNumber')
    }
  }
})
</script>

<style scoped>
.Business_Legal_Details {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  gap: 25px;
  margin-bottom: 77px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text h1 {
  color: var(--Dark-950, #121212);
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}
.box_title {
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.text p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.form_details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
}
</style>
