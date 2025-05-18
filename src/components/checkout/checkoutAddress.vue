<template>
  <div
    :class="[savedAddress.length > 2 ? 'scrolling' : '', 'checkout_address']"
    v-if="$userStore.getters.isAuthenticated"
  >
    <div class="header" v-if="savedAddress.length != 0">
      <h1>{{ $t('legalInformation.savedAddress') }}</h1>
      <p>{{ $t('legalInformation.savedAddressText') }}</p>
    </div>

    <!-- Display a message if no addresses exist -->
    <div v-if="savedAddress.length === 0" class="no-addresses">
      <p>{{ $t('checkout.noAddresses') }}</p>
      <div class="add_new_address">
        {{ $t('checkout.addNewAddress') }}
        <a @click="toggleAddAddressModal">{{ $t('checkout.clickHere') }}</a>
      </div>
    </div>

    <!-- Display addresses if they exist -->
    <div v-else class="address_box">
      <div class="address">
        <deliveryAddress
          v-for="address in formattedAddresses"
          :key="address.id"
          :class="{ selected: selectedAddressId === address.id }"
          :address="address"
          :checkout="isCheckoutMode"
          :isSelected="selectedAddressId === address.id"
          :deletable="true"
          :addressName="true"
          :required="true"
          @addressSelected="handleAddressSelection"
          @update="updateAddress"
          @deleteAddress="openDeleteModal(address.id)"
        />
      </div>
    </div>

    <!-- Add New Address Button -->
    <div class="add_new_address" v-if="savedAddress.length != 0">
      {{ $t('checkout.addNewAddress') }}
      <a @click="toggleAddAddressModal">{{ $t('checkout.clickHere') }}</a>
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
    DeleteModal
  },

  emits: ['addressSelected'],

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
        on_site_contact_name: addr.on_site_contact_name,
        on_site_contact_phone: addr.on_site_contact_phone
      }))
    }
  },

  methods: {
    async fetchAddress() {
      try {
        const response = await this.$axios.get('/api/users/address/')
        console.log('API Response:', response.data)

        // Handle cases where response.data.data is an empty object or not an array
        if (Array.isArray(response.data.data)) {
          this.savedAddress = response.data.data
        } else if (
          response.data.data &&
          typeof response.data.data === 'object' &&
          Object.keys(response.data.data).length === 0
        ) {
          // If response.data.data is an empty object, set savedAddress to an empty array
          this.savedAddress = []
        } else {
          console.error('Unexpected data format:', response.data.data)
          this.savedAddress = [] // Fallback to an empty array
        }

        // Auto-select the first address if available and none is selected yet
        if (!this.selectedAddressId && this.savedAddress.length > 0) {
          this.selectedAddressId = this.savedAddress[0].id
          const firstAddress = this.formattedAddresses[0]
          console.log('firstAddress', firstAddress)
          this.$emit('addressSelected', firstAddress)
        }
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
    handleAddressSelection(address: FormattedAddress) {
      // Toggle selection: unselect if already selected.
      if (this.selectedAddressId === address.id) {
        this.selectedAddressId = null
        this.$emit('addressSelected', null)
      } else {
        this.selectedAddressId = address.id
        this.$emit('addressSelected', address)
      }
    },

    updateAddress(address: FormattedAddress) {
      this.editingAddress = address
      this.saveAddress(address)
      this.$emit('addressSelected', address)
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
        // Remove deleted address from local state.
        this.savedAddress = this.savedAddress.filter((addr) => addr.id !== this.addressIdToDelete)
        // If the deleted address was selected, unselect it.
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
          await this.$axios.patch(`/api/users/address/${address.id}/`, formattedAddress)
        } else {
          await this.$axios.post('/api/users/address/', formattedAddress)
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
.checkout_address {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 541px;
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
  width: 100%;
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
.scrolling .address_box {
  padding: 0px 10px;
  max-height: 25rem;
  overflow-y: scroll;
}
.scrolling .address_box {
  overflow-y: auto;
}

.scrolling .address_box::-webkit-scrollbar {
  display: none;
  transition: opacity 0.3s ease-in-out;
}

.scrolling .address_box:hover::-webkit-scrollbar {
  opacity: 1;
}

.selected {
  border: 1px solid #15b377;
}
.add_new_address a {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
<style>
.add_saved_address .modal-content {
  padding: 30px;
  min-height: 50dvh;
}

.add_saved_address .modal-content .address-container {
  padding: 0;
  border-radius: 0;
  border: none;
}
.no-addresses {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.checkout_address .address-container {
  /* max-height: 176px; */
}
.checkout_address .map-container {
  /* min-height: 156px; */
}
</style>
