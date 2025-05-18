<template>
  <div class="saved_address">
    <div class="header">
      <h1>{{ $t('legalInformation.savedAddress') }}</h1>
      <p>{{ $t('legalInformation.savedAddressText') }}</p>
    </div>

    <div class="address">
      <deliveryAddress
        v-for="address in formattedAddresses"
        :class="[selectedAddressId === address.id ? 'selected' : '']"
        :key="address.id"
        :address="address"
        :deletable="true"
        :addressName="true"
        :required="true"
        @update="updateAddress(address)"
        @deleteAddress="openDeleteModal(address.id)"
      />

      <MainBtn @click="toggleAddAddressModal" type="green" class="mt-4">
        {{ $t('legalInformation.addNew') }}
      </MainBtn>
    </div>

    <!-- Add Address Modal -->
    <ModalComponent
      :modal-active="isActive"
      :closeActive="true"
      @close="toggleAddAddressModal"
      class="add_saved_address"
    >
      <deliveryAddress
        :key="modalKey"
        :addressName="true"
        :address="editingAddress"
        :required="true"
        :extra_inputs="true"
        @update="saveAddress"
      />
    </ModalComponent>

    <!-- Delete Confirmation Modal -->
    <DeleteModal
      :isActive="deleteDocModal"
      :title="$t('listings.confirmDelete')"
      :subTitle="$t('legalInformation.confirmDelete')"
      :onClickCancel="closeDeleteModal"
      :onClickButton="deleteAddress"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalComponent from '../UIElements/ModalComponent.vue'
import deliveryAddress from '../checkout/deliveryAddress.vue'
import MainBtn from '../UIElements/MainBtn.vue'
import DeleteModal from '../UIElements/delete_modal.vue'

interface BaseAddress {
  address_line1: string
  address_line2: string
  city: string
  province: string
  zip_code: string
  country: string
  name: string
  latitude: number | string
  longitude: number | string
  on_site_contact_name: string
  on_site_contact_phone: string
}

interface Address extends BaseAddress {
  id?: number
}

interface FormattedAddress {
  id?: number
  addressName: string
  addressLine1: string
  addressLine2: string
  city: string
  province: string
  zipCode: string
  country: string
  longitude: number | string
  latitude: number | string
  contactName: string
  contactNumber: string
}

export default defineComponent({
  name: 'SavedAddress',

  components: {
    deliveryAddress,
    ModalComponent,
    MainBtn,
    DeleteModal
  },

  // emits: ['addressSelected'],

  data() {
    return {
      isActive: false,
      savedAddress: [] as Address[],
      deleteDocModal: false,
      addressIdToDelete: null as number | null,
      selectedAddressId: null as number | null,
      editingAddress: null as FormattedAddress | null,
      isCheckoutMode: true,
      modalKey: 0
    }
  },

  computed: {
    formattedAddresses(): FormattedAddress[] {
      if (!Array.isArray(this.savedAddress)) return []
      return this.savedAddress.map((addr) => ({
        id: addr.id,
        addressName: addr.name,
        addressLine1: addr.address_line1,
        addressLine2: addr.address_line2,
        city: addr.city,
        province: addr.province,
        zipCode: addr.zip_code,
        country: addr.country,
        longitude: addr.longitude,
        latitude: addr.latitude,
        contactName: addr.on_site_contact_name,
        contactNumber: addr.on_site_contact_phone
      }))
    }
  },

  methods: {
    async fetchAddress() {
      try {
        const response = await this.$axios.get('/api/users/address/')
        this.savedAddress = response.data.data
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    },

    toggleAddAddressModal() {
      this.isActive = !this.isActive
      if (!this.isActive) {
        // When closing the modal, reset the editingAddress prop
        this.editingAddress = null
        // Update the modalKey to force a remount of the deliveryAddress
        this.modalKey++
      }
    },
    updateAddress(address: FormattedAddress) {
      this.saveAddress(address)
    },

    formatAddressForApi(address: FormattedAddress): Partial<Address> {
      return {
        id: address.id,
        name: address.addressName,
        address_line1: address.addressLine1,
        address_line2: address.addressLine2,
        city: address.city,
        province: address.province,
        zip_code: address.zipCode,
        country: address.country,
        longitude: address.longitude,
        latitude: address.latitude,
        on_site_contact_name: address.contactName,
        on_site_contact_phone: address.contactNumber
      }
    },

    openDeleteModal(addressId: number) {
      this.addressIdToDelete = addressId
      this.deleteDocModal = true
    },

    closeDeleteModal() {
      this.deleteDocModal = false
      this.addressIdToDelete = null
    },

    async deleteAddress() {
      if (!this.addressIdToDelete) return
      try {
        await this.$axios.delete(`/api/users/address/${this.addressIdToDelete}/`)
        // Update local state
        this.savedAddress = this.savedAddress.filter((addr) => addr.id !== this.addressIdToDelete)
        // Reset selected address if deleted
        if (this.selectedAddressId === this.addressIdToDelete) {
          this.selectedAddressId = null
          this.$emit('addressSelected', null)
        }
        this.closeDeleteModal()
      } catch (error) {
        console.error('Error deleting address:', error)
      }
    },

    async saveAddress(address: FormattedAddress) {
      const formattedAddress = this.formatAddressForApi(address)
      try {
        if (address.id) {
          const response = await this.$axios.patch(
            `/api/users/address/${address.id}/`,
            formattedAddress
          )
        } else {
          const response = await this.$axios.post('/api/users/address/', formattedAddress)
        }
        this.toggleAddAddressModal()
        await this.fetchAddress()
        this.isActive = false
      } catch (error) {
        console.error('Error saving address:', error)
      }
    }
  },

  mounted() {
    this.fetchAddress()
  }
})
</script>

<style scoped>
.saved_address {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

.header h1 {
  color: #121212;
  font-size: 18px;
  font-weight: 600;
}

.header p {
  color: #4f4f4f;
  font-weight: 400;
  font-size: 14px;
}

.address {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
.address_box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.selected {
  border: 1px solid #15b377;
}
</style>
<style>
.add_saved_address .modal-content {
  padding: 30px;
}

.add_saved_address .modal-content .address-container {
  padding: 0;
  border-radius: 0;
  border: none;
}
</style>
