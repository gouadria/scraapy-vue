<template>
  <div class="legal_information" v-auto-animate>
    <div class="legalComponent" v-if="legalComponent">
      <div class="header">
        <h1>{{ $t('legalInformation.LegalInformation') }}</h1>
        <p>{{ $t('legalInformation.LegalInformationMSG') }}</p>
      </div>
      <div class="divider"></div>
      <div class="add_row" :class="{ highlight: shouldHighlightLegalDetails }">
        <div class="information">
          <h2>{{ $t('legalInformation.LegalDetails') }}</h2>
          <p>{{ $t('legalInformation.LegalDetailsText') }}</p>
        </div>
        <div class="action">
          <MainBtn @click="toggleAddBusinessLegalDetails" type="blue">
            {{ $t('legalInformation.add') }}
          </MainBtn>
        </div>
      </div>
      <div class="divider"></div>
      <div class="add_row" :class="{ highlight: isMwanMissing }">
        <div class="information">
          <h2>{{ $t('legalInformation.MWANLicense') }}</h2>
          <p>{{ $t('legalInformation.MWANLicenseText') }}</p>
        </div>
        <div class="action">
          <MainBtn @click="openAddMwanLicense" type="blue">
            {{ $t('legalInformation.add') }}
          </MainBtn>
        </div>
      </div>
      <div class="divider"></div>
      <div class="add_row" :class="{ highlight: isMissing('AdditionalDocuments') }">
        <div class="information">
          <h2>{{ $t('legalInformation.AdditionalDocuments') }}</h2>
          <p>{{ $t('legalInformation.AdditionalDocumentsText') }}</p>
        </div>
        <div class="documents_action">
          <MainBtn @click="openAdditionalDocuments" type="blue" class="add">
            <component :is="plusIcon"></component>
          </MainBtn>
          <MainBtn @click="toggleAdditionalDocuments" type="white">
            {{ $t('legalInformation.ViewAdded') }}
          </MainBtn>
        </div>
      </div>
    </div>

    <!-- conditions -->
    <div v-if="addBusinessLegalDetails" class="business_detials">
      <BusinessDetails
        :backButton="toggleAddBusinessLegalDetails"
        :legalDetails="legalDetails"
        :profileDetails="userInformation"
        :missingDetails="otherMissingDetails"
      />
    </div>

    <div v-if="viewAdditionalDocuments" class="additional_documents">
      <additionalDocuments
        :backButton="toggleAdditionalDocuments"
        :profileDetails="userInformation"
        :documents="items"
      />
    </div>

    <ModalComponent
      :modal-active="addMwanLicense"
      :closeActive="true"
      @close="openAddMwanLicense"
      class="add_mwan_license"
    >
      <div class="information">
        <h2>{{ $t('legalInformation.AddMWANLicense') }}</h2>
        <p>{{ $t('legalInformation.AddMWANLicenseText') }}</p>
      </div>
      <div class="divider"></div>
      <div class="input">
        <inputField
          :label="$t('legalInformation.MWANLicenseNumber')"
          :placeholder="$t('legalInformation.issuedMWANLicense')"
          :value="legalDetails.mwan_license_number"
          @update="legalDetails.mwan_license_number = $event"
          required
        />
        <span>{{ $t('legalInformation.MWANLicenseNumberDigit') }}</span>
      </div>
      <div class="file_uploader">
        <label for="">{{ $t('legalInformation.UploadMWANLicense') }}</label>
        <UploadFile
          :type="['.pdf']"
          v-if="!legalDetails.mwan_license_document"
          @file="uploadMwanPDF($event)"
          showFileInfo
        />
        <div class="file" v-else>
          <div class="icon_title">
            <uplodedIcon />
            <p>{{ $t('legalInformation.MWANLicense') }}</p>
          </div>
          <!-- <div @click.prevent="removeCrPDF(LegalInformation.cr_document)" class="remove">
            <trashIcon />
          </div> -->
        </div>
      </div>
      <div class="divider"></div>
      <div class="action">
        <div class="warning">
          <warningIcon />
          {{ $t('legalInformation.verifiedInformationMessage') }}
        </div>
        <MainBtn @click="ValidateMwanLicense" type="blue">
          {{ $t('legalInformation.Validate') }}
        </MainBtn>
      </div>
    </ModalComponent>

    <ModalComponent
      :modal-active="AdditionalDocuments"
      :closeActive="true"
      @close="openAdditionalDocuments"
      class="add_additional_documents"
    >
      <div class="information">
        <h2>{{ $t('legalInformation.add_additional_documents') }}</h2>
        <p>{{ $t('legalInformation.add_additional_documentsText') }}</p>
      </div>
      <div class="divider"></div>
      <div class="input">
        <inputField
          :label="$t('legalInformation.DocumentName')"
          :placeholder="$t('legalInformation.DocumentNamePlaceHolder')"
          :value="legalDetails.additional_documents"
          @update="legalDetails.additional_documents = $event"
          required
        />
      </div>
      <div class="file_uploader">
        <label for="">{{ $t('legalInformation.UploadDocument') }}</label>
        <UploadFile :type="['.pdf']" @file="uploadVatPDF($event)" showFileInfo />
      </div>
      <div class="divider"></div>
      <div class="action">
        <MainBtn @click="ValidateMwanLicense" type="blue">
          {{ $t('legalInformation.Validate') }}
        </MainBtn>
      </div>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { shallowRef } from 'vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import { toast } from 'vue3-toastify'
import BusinessDetails from '@/components/legalInformation/BusinessLegalDetails.vue'
import type { BusinessLegalDetails } from '@/models/businessLegalDetails'
import ModalComponent from '@/components/UIElements/ModalComponent.vue'
import inputField from '@/components/UIElements/inputField.vue'
import UploadFile from '@/components/UIElements/UploadFile.vue'
import warningIcon from '@/assets/svg-icons/warningIcon.vue'
import additionalDocuments from '@/components/legalInformation/additionalDocuments.vue'
import plusIcon from '@/assets/svg-icons/listings/plus_add.svg'
import trashIcon from '@/assets/svg-icons/trashIcon.vue'

export default {
  name: 'LegalInformation',
  components: {
    MainBtn,
    BusinessDetails,
    ModalComponent,
    inputField,
    UploadFile,
    warningIcon,
    additionalDocuments,
    trashIcon
  },
  data() {
    return {
      userInformation: this.$userStore.state.user,
      addBusinessLegalDetails: false,
      AddMwanLicense: false,
      AdditionalDocuments: false,
      legalComponent: true,
      legalDetails: {} as BusinessLegalDetails,
      missingRequirements: [] as string[],
      missingBusinessDetails: [] as string[], // Track missing business-related details separately
      isMwanMissing: false, // Track if MWAN is missing
      otherMissingDetails: [] as string[], // Store other missing details
      addMwanLicense: false,
      viewAdditionalDocuments: false,
      plusIcon: shallowRef(plusIcon),
      items: [
        {
          player: 'Stephen Curry',
          team: 'GSW',
          number: 30
        },
        {
          player: 'Lebron James',
          team: 'LAL',
          number: 6
        },
        {
          player: 'Kevin Durant',
          team: 'BKN',
          number: 7
        }
      ]
    }
  },
  created() {
    this.fetchLegalDetails()
    this.parseMissingRequirements()
  },
  computed: {
    shouldHighlightLegalDetails() {
      return this.otherMissingDetails.length > 0
    }
  },
  methods: {
    async fetchLegalDetails() {
      try {
        const response = await this.$axios.get<BusinessLegalDetails[]>(
          'api/users/business-profile/'
        )
        console.log(response)
        this.legalDetails = response.data
        console.log(response)
        console.log('Items fetched successfully:', this.legalDetails)
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    },
    openAddMwanLicense() {
      this.addMwanLicense = !this.addMwanLicense
    },
    toggleAddBusinessLegalDetails() {
      this.addBusinessLegalDetails = !this.addBusinessLegalDetails
      this.legalComponent = !this.legalComponent
    },
    toggleAddMwanLicense() {
      this.AddMwanLicense = !this.AddMwanLicense
    },
    parseMissingRequirements(): void {
      const missingQuery = this.$route.query.missing

      if (!missingQuery) {
        this.missingRequirements = []
        return
      }

      try {
        let missingData: string[]

        if (typeof missingQuery === 'string') {
          // Try to parse JSON array if it looks like one
          missingData = JSON.parse(decodeURIComponent(missingQuery))
        } else if (Array.isArray(missingQuery)) {
          // If Vue Router already parsed it as an array, decode each item
          missingData = missingQuery.map((item) => decodeURIComponent(item.toString()))
        } else {
          // Fallback to treating it as a single value
          missingData = [decodeURIComponent(missingQuery.toString())]
        }

        this.missingRequirements = missingData
        this.isMwanMissing = this.missingRequirements.includes('mwan license')
        this.otherMissingDetails = this.missingRequirements.filter(
          (item) => item !== 'mwan license'
        )
        console.log(this.otherMissingDetails)
      } catch (error) {
        console.error('Failed to parse missing requirements:', error)
        this.missingRequirements = []
        this.otherMissingDetails = []
      }
    },

    isMissing(requirement: string): boolean {
      return this.missingRequirements.includes(requirement)
    },
    uploadMwanPDF(file: any) {
      this.legalDetails.mwan_license_document = file
    },
    ValidateMwanLicense() {
      let business_profile = {
        mwan_license_number: this.legalDetails.mwan_license_number,
        // mwan_license_document: this.legalDetails.mwan_license_document
        // send the license document if it's a file only
        mwan_license_document:
          this.legalDetails.mwan_license_document instanceof File
            ? this.legalDetails.mwan_license_document
            : null
      }
      this.$userStore
        .dispatch('patchBusinessProfile', { business_profile })
        .then(() => {
          console.log('User updated successfully')
          toast.success(this.$t('legalInformation.ValidatefileUploaded'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          this.openAddMwanLicense()
        })
        .catch((error) => {
          console.error('Failed to update user:', error)
          toast.error(this.$t('legalInformation.ValidatefileUploadFailed'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
        })
    },
    openAdditionalDocuments() {
      this.AdditionalDocuments = !this.AdditionalDocuments
    },
    toggleAdditionalDocuments() {
      this.viewAdditionalDocuments = !this.viewAdditionalDocuments
      this.legalComponent = !this.legalComponent
    }
  }
}
</script>

<style scoped>
.legal_information {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
h1,
h2 {
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

p {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.add_row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.legalComponent {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  gap: 20px;
}
.business_detials {
  min-height: 100%;
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
.add_additional_documents,
.add_mwan_license {
  display: flex;
  flex-direction: column;
}
.add_additional_documents .action,
.add_mwan_license .action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.documents_action {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}
.add_mwan_license .warning {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #f79009;
  font-size: 12px;
  font-weight: 400;
}
.add_mwan_license .input span {
  padding-top: 6px;
  color: #6d6d6d;
  font-size: 14px;
  font-weight: 400;
}
.add_mwan_license .file_uploader {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.file_uploader .file {
  display: flex;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #f2f4f7;
}
.file_uploader .file .icon_title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.file_uploader .file .remove {
  cursor: pointer;
  padding: 4px;
}
</style>
<style>
.add_additional_documents .modal-content,
.add_mwan_license .modal-content {
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 2px 5px 100px 5px rgba(0, 0, 0, 0.25);
  max-width: 50%;
}
.add_additional_documents .input-item input,
.add_mwan_license .input .input-item input {
  border-radius: 8px;
}
</style>
