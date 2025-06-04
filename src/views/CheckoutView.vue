<script lang="ts">
import { defineComponent } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { useIsTablet } from '@/composables/useIsTablet'
import navBar from '@/components/UIElements/navBar.vue'
import shippingOption from '@/components/checkout/shippingOption.vue'
import serviceOption from '@/components/checkout/serviceOption.vue'
import orderSummary from '@/components/checkout/orderSummary.vue'
import userInfo from '@/components/checkout/userInfo.vue'
import paymentDetails from '@/components/checkout/paymentDetails.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import cartItem from '@/components/cart/cartItem.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import type { Item } from '@/models/Item'
import MissingRequirements from '@/components/UIElements/popups/MissingRequirements.vue'
import ContractSign from '@/components/checkout/ContractSign.vue'
import checkoutAddress from '@/components/checkout/checkoutAddress.vue'

interface ProviderSelection {
  itemId: number
  providerId: number
  servicePrice: number
  name: string
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
  components: {
    navBar,
    footerComponant,
    shippingOption,
    serviceOption,
    orderSummary,
    paymentDetails,
    userInfo,
    cartItem,
    MainBtn,
    ContractSign,
    MissingRequirements,
    checkoutAddress
  },

  data() {
    return {
      items: this.$userStore.state.cart,
      personalInfo: {} as { [key: string]: string },
      address: {} as { [key: string]: string },
      selectedOptionId: null as number | null,
      expandedItems: {} as Record<number, boolean>,
      suggestions: {},
      isFormValid: true,
      isMobile: useIsMobile().isMobile,
      isTablet: useIsTablet().isTablet,
      anotherAddress: false,
      selectedProviders: [] as ProviderSelection[],
      userData: this.$userStore.state.user,
      error: '',
      relatedServices: [] as Array<Item>,
      selectedServices: [] as ProviderSelection[],
      missingInformation: [],
      additional_services: [] as Array<Item>,
      isSigned: false,
      contractsSignedStatus: {} as Record<number, boolean>,
      contractValidationError: '',
      showModalWarning: false,
      selectedAddress: {} as FormattedAddress,
      savedAddress: [] as FormattedAddress[],
      selectedAddressId: null as number | null,
      shippingValidationError: ''
    }
  },
  computed: {
    currentLang() {
      return this.$i18n.locale
    },
    isCartEmpty() {
      return this.$userStore.state.cart.length === 0
    },
    // persistedSelectedServices(): ProviderSelection[] {
    //   return this.items
    //     .filter((entry: any) => entry.item.parent_order_item !== undefined)
    //     .map((entry: any) => ({
    //       itemId: entry.item.parent_order_item,
    //       providerId: entry.item.id,
    //       name: entry.item.name || '',
    //       servicePrice: entry.item.servicePrice || 0,
    //       category: entry.item.category
    //     }))
    // },
    persistedSelectedServices(): ProviderSelection[] {
      return this.items
        .filter((entry: any) => entry.item.parent_order_item !== undefined)
        .map((entry: any) => ({
          itemId: entry.item.parent_order_item,
          providerId: entry.item.id,
          name: entry.item.name || '',
          servicePrice: entry.item.servicePrice || 0,
          category: entry.item.category
        }))
    },

    requireContract(): boolean[] {
      return this.items.map((item: Item) => item.item.category.require_contract)
    },

    hasRequiredContract(): boolean {
      return this.items.some(
        (cartEntry: any) =>
          cartEntry.item.category?.require_contract &&
          cartEntry.item.category.contract_text?.trim() !== ''
      )
    },
    // Get all non-empty contract texts from items that require contracts
    itemContracts(): string[] {
      return this.items
        .filter((cartEntry: any) => cartEntry.item.category?.require_contract)
        .map((cartEntry: any) => cartEntry.item.category?.contract_text?.trim())
        .filter((text) => text && text !== '') as string[]
    },

    hasContract(): boolean {
      return this.itemContracts.length > 0
    },

    allContractsSigned(): boolean {
      if (!this.hasContract) return true
      for (let i = 0; i < this.itemContracts.length; i++) {
        if (!this.contractsSignedStatus[i]) return false
      }
      return true
    },

    canSubmitOrder(): boolean {
      return (
        this.items.length > 0 &&
        (!this.hasContract || this.allContractsSigned) &&
        this.selectedOptionId !== null
      )
    }
  },

  methods: {
    fetchGeoAPI() {
      let url = '/api/billing/checkout/geo/'
      let ids = this.items.map((item: Item) => 'item_ids=' + item.item.id)
      url += '?' + ids.join('&')
      const province = this.selectedAddress.province || ''
      const longitude = this.selectedAddress.longitude || ''
      const latitude = this.selectedAddress.latitude || ''
      url += '&province=' + province
      url += '&longitude=' + longitude
      url += '&latitude=' + latitude

      this.$axios
        .get(url)
        .then((response: any) => {
          this.suggestions = response.data.data
          this.selectFirstValidShippingOption() // Call to select a valid option
          this.additional_services = response.data.data.additional_services
        })
        .catch((error: any) => {
          // console.error(error);
        })
    },

    /** Automatically select the first shipping option with a non-null price */
    selectFirstValidShippingOption() {
      if (this.suggestions.shipping_options?.length) {
        const firstValidOption = this.suggestions.shipping_options.find(
          (option: any) => option.price != null
        )
        this.selectedOptionId = firstValidOption ? firstValidOption.id : null
        console.log(firstValidOption)
        console.log(this.selectedOptionId)
      }
    },

    /** Handle shipping option selection, ensuring only valid options are selected */
    onShippingSelected(optionId: number) {
      const selectedOption = this.suggestions.shipping_options.find(
        (option: any) => option.id === optionId
      )
      if (selectedOption && selectedOption.price != null) {
        this.selectedOptionId = optionId
        this.shippingValidationError = ''
        console.log('Selected shipping option:', selectedOption)
      } else {
        this.shippingValidationError = 'Please select a valid shipping option.'
        console.log('Invalid shipping option selected:', optionId)
      }
    },

    selectSavedAddress(address: FormattedAddress) {
      Object.assign(this.selectedAddress, address)
      this.fetchGeoAPI()
    },

    toggleItemServices(itemId: number) {
      const cartEntry = this.items.find((entry: any) => entry.item.id === itemId)
      if (cartEntry && cartEntry.item.category?.id) {
        const relatedServices = this.getRelatedServices(cartEntry.item.id)
        if (Object.keys(relatedServices).length > 0) {
          this.expandedItems[itemId] = !this.expandedItems[itemId]
        } else {
          this.expandedItems[itemId] = false
        }
      }
    },

    hasSelectedServicesForItem(itemId: number): boolean {
      return this.selectedServices.some((service) => service.itemId === itemId)
    },

    handleSelectedProvider(provider: ProviderSelection) {
      if (provider.providerId) {
        const existingIndex = this.selectedServices.findIndex(
          (service) => service.itemId === provider.itemId
        )
        if (existingIndex >= 0) {
          this.selectedServices[existingIndex] = provider
        } else {
          this.selectedServices.push(provider)
          this.fetchGeoAPI()
        }
        this.$userStore.dispatch('addItemToCart', {
          item: {
            parent_order_item: provider.itemId,
            id: provider.providerId,
            price: provider.servicePrice,
            name: provider.name,
            category: provider.category
          },
          quantity: 1
        })
        this.fetchGeoAPI()
      } else {
        this.selectedServices = this.selectedServices.filter(
          (service) => service.itemId !== provider.itemId
        )
        const cartEntryToRemove = this.$userStore.state.cart.find(
          (cartEntry: any) => cartEntry.item.parent_order_item === provider.itemId
        )
        this.fetchGeoAPI()
        if (cartEntryToRemove) {
          this.$userStore.commit('removeItemFromCart', cartEntryToRemove.item)
          this.items = this.$userStore.state.cart
          this.fetchGeoAPI()
        }
      }
    },

    handleSignedContract(index: number, signed: boolean) {
      this.contractsSignedStatus[index] = signed
      if (!this.allContractsSigned) {
        this.contractValidationError = this.$t('checkout.reviewAndSign')
      } else {
        this.contractValidationError = ''
      }
    },

    handleValidationState(index: number, validationState: { isValid: boolean }) {
      this.contractsSignedStatus[index] = validationState.isValid
      if (!this.allContractsSigned) {
        this.contractValidationError = this.$t('checkout.reviewAndSign')
      } else {
        this.contractValidationError = ''
      }
    },
submitOrder(paymentDetails: { [key: string]: string }) {
  if (this.hasContract && !this.allContractsSigned) {
    this.contractValidationError = this.$t('checkout.reviewAndSign')
    return
  }

  // Vérifie si on peut soumettre
  if (!this.canSubmitOrder) {
    if (this.selectedOptionId === null) {
      this.shippingValidationError = 'Please select a shipping option before submitting.'
    }
    return
  }

  // 🔽 Ajoute la vérification de la quantité ici
  const hasInvalidQuantity = this.$userStore.state.cart.some(
    (entry: any) => !entry.quantity || entry.quantity < 1
  )
  if (hasInvalidQuantity) {
    this.error = "Certains articles ont une quantité invalide."
    return
  }

  const items = this.$userStore.state.cart.map(({ item, quantity }) => {
    if (item.parent_order_item !== undefined) {
      return { parent_order_item: item.parent_order_item, item: item.id }
    }
    return item.category_type === 'service'
      ? { item: item.id }
      : { item: item.id, order_quantity: quantity }
  })

  const { addressLine1, addressLine2, city, province, zipCode, country } = this.selectedAddress
  this.$axios
    .post('/api/billing/orders/', {
      items,
      signedContract: this.allContractsSigned,
      delivery_address_line1: addressLine1,
      delivery_address_line2: addressLine2,
      delivery_city: city,
      delivery_province: province,
      delivery_zip_code: zipCode,
      delivery_country: country,
      longitude: this.selectedAddress.longitude,
      latitude: this.selectedAddress.latitude,
      addressName: this.selectedAddress.addressName,
      shipping_option: this.selectedOptionId,
      ...paymentDetails
    })
    .then((response) => {
      const { payment_url } = response.data.data
      window.location.replace(payment_url)
    })
    .catch((error) => {
      console.error('Payment failed', error)
    })
},


    removeItemFromCart(item: Item) {
      const itemId = item.id
      const additionalServices = this.$userStore.state.cart.filter(
        (cartEntry: any) => cartEntry.item.parent_order_item === itemId
      )
      additionalServices.forEach((serviceEntry: any) => {
        this.$userStore.commit('removeItemFromCart', serviceEntry.item)
      })
      this.$userStore.commit('removeItemFromCart', item)
      this.items = this.$userStore.state.cart
      this.fetchGeoAPI()
    },

    newShippingAddress(optionID: any) {
      this.anotherAddress = !this.anotherAddress
    },

    hasServiceData(serviceList: any[]): boolean {
      return Array.isArray(serviceList) && serviceList.length > 0
    },

    getRelatedServices(itemId: string) {
      if (this.additional_services.length === 0 || !itemId) return []
      let item_additional_services = this.additional_services[itemId] || []
      item_additional_services = Object.fromEntries(
        Object.entries(item_additional_services).filter(
          ([_, value]) => Array.isArray(value) && value.length > 0
        )
      )
      return item_additional_services
    },

    getMinPrice(serviceArray: any[]): number {
      if (!Array.isArray(serviceArray) || serviceArray.length === 0) return 0
      const prices = serviceArray.map((srv) => parseFloat(srv.price)).filter((p) => !isNaN(p))
      return prices.length > 0 ? Math.min(...prices) : 0
    },

    async checkRequirments() {
      let id = this.items.map((item: Item) => item.item.category.id)
      try {
        const response = await this.$axios.post(`api/users/business-profile/missingdata/`, { id })
        this.missingInformation = response.data.flatMap((item) => item.LegalRequirements)
        if (this.missingInformation.length > 0) {
          this.openWarningsModal()
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },

    openWarningsModal() {
      this.showModalWarning = !this.showModalWarning
    },

    formatKey(key: string): string {
      return key.replace(/([A-Z])/g, ' $1').trim()
    },

    GoToLegalInformation() {
      const missingRequirements = this.missingInformation.map((missing) => missing.name)
      this.router.push({
        name: 'management',
        params: { page: 'Account', subPage: 'legalInformation' },
        query: { missing: JSON.stringify(missingRequirements) }
      })
      this.showModalWarning = !this.showModalWarning
    }
  },

  mounted() {
    this.checkRequirments()
    console.log(this.selectedAddress)
    this.fetchGeoAPI()
  }
})
</script>

<template>
  <navBar />

  <main class="max-width padded" v-auto-animate>
    <div class="checkout-header">
      <h1>{{ $t('checkout.header') }}</h1>
    </div>

    <div v-if="isCartEmpty" class="empty-state">
      <img src="@/assets/svg-icons/checkout/emptyCart.svg?url" alt="Empty Cart" />
      <span>{{ $t('checkout.emptyCart') }}</span>
      <MainBtn
        class="back-to-shop"
        type="green"
        @click="$router.push({ name: 'marketplace', query: { tab: 'product' } })"
      >
        {{ $t('checkout.goBackToShop') }}
      </MainBtn>
    </div>

    <div v-if="!isCartEmpty" class="checkout-container">
      <div class="checkout-details">
        <userInfo @update="personalInfo = $event" />

        <div class="details-section-container">
          <div class="header">
            <h2>{{ $t('checkout.shippingHeader') }}</h2>
            <p>{{ $t('checkout.shippingSubHeader') }}</p>
          </div>

          <div class="options-container" v-if="suggestions?.shipping_options?.length">
            <shippingOption
              v-for="option in suggestions.shipping_options"
              :identifier="option.id.toString()"
              :key="option.id"
              :id="option.id"
              :name="this.$i18n.locale == 'ar' ? option.name_ar : option.name"
              :price="option.price"
              :description="this.$i18n.locale == 'ar' ? option.detail_ar : option.detail"
              :selected="option.id === selectedOptionId"
              @selected-option="onShippingSelected"
            />
          </div>
          <p v-if="shippingValidationError" class="error-message">
            {{ shippingValidationError }}
          </p>
        </div>

        <div class="saved_address">
          <checkoutAddress @addressSelected="selectSavedAddress" />
        </div>

        <div class="ContractSign" v-if="hasRequiredContract">
          <ContractSign
            v-for="(contract, index) in itemContracts"
            :key="index"
            :document="contract"
            @signedContract="handleSignedContract(index, $event)"
            @validation-state="handleValidationState(index, $event)"
          />
          <p v-auto-animate v-if="contractValidationError" class="error-message">
            {{ contractValidationError }}
          </p>
        </div>

        <div class="details-section-container">
          <div class="header" v-if="items.length > 0">
            <h2>
              {{
                `${$t('checkout.servicesHeader')} ( ${items.length} ${$t('checkout.Products')} )`
              }}
            </h2>
          </div>

          <div class="services-container" v-for="cartEntry in items" :key="cartEntry.item.id">
            <div
              @click="toggleItemServices(cartEntry.item.id)"
              v-if="!cartEntry.item.parent_order_item"
            >
              <cartItem
                type="checkout"
                :item="cartEntry.item"
                :orderQuantity="cartEntry.quantity"
                @removeItemFromCart="removeItemFromCart"
                :servicesOpend="expandedItems[cartEntry.item.id]"
                :hideAdditional="Object.keys(getRelatedServices(cartEntry.item.id)).length == 0"
              />
            </div>
            <transition name="expand">
              <div v-if="expandedItems[cartEntry.item.id]" class="data">
                <template
                  v-if="
                    cartEntry.item && Object.keys(getRelatedServices(cartEntry.item.id)).length > 0
                  "
                >
                  <div
                    v-for="(serviceList, categoryName) in getRelatedServices(
                      cartEntry.item.id || 0
                    )"
                    :key="categoryName"
                  >
                    <serviceOption
                      :itemId="cartEntry.item.id"
                      :name="categoryName"
                      :price="getMinPrice(serviceList)"
                      :description="''"
                      :option="{
                        serviceProviders: serviceList.map((item) => ({
                          id: item.id,
                          name: item.name,
                          price: parseFloat(item.price),
                          owner_image: item.images?.[0]?.image || '',
                          category: item.category
                        }))
                      }"
                      :selectedService="persistedSelectedServices"
                      @selectedProvider="handleSelectedProvider"
                    />
                  </div>
                </template>
                <div v-else>
                  {{ $t('checkout.noRelatedServices') }}
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div v-if="isMobile || isTablet" class="payment-details mobile">
          <order-summary
            :items="items"
            :shipping="
              suggestions?.shipping_options?.find((option) => option.id === selectedOptionId)?.price
            "
          />
          <paymentDetails @update="submitOrder" :disabled="!canSubmitOrder" />
        </div>
      </div>

      <div v-if="!isMobile && !isTablet" class="payment-details">
        <order-summary
          :items="items"
          :shipping="
            suggestions?.shipping_options?.find((option) => option.id === selectedOptionId)?.price
          "
        />
        <paymentDetails @update="submitOrder" :disabled="!canSubmitOrder" />
      </div>
    </div>
  </main>

  <MissingRequirements
    :showModal="showModalWarning"
    :missingInformation="missingInformation"
    :openWarningsModal="openWarningsModal"
  />
  <footerComponant v-if="!isMobile" />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: var(--carousel-gap, clamp(10px, calc(1.11vw + 4px), 50px));
  margin: 0 auto 5rem auto;
}

.checkout-header {
  display: flex;
  padding: 30px 0px;
  align-items: center;
  gap: 35px;
}

.details-section-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
}

.options-container {
  display: flex;
  justify-content: space-between;
  /* padding: 20px 0; */
  gap: 16px;
}

.checkout-header h1 {
  color: var(--Blue-950, #0b3241);
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
}

.checkout-container {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.selected_services {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.checkout-details {
  display: flex;
  width: 100%;
  max-width: 730px;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
}

.header h2 {
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

/* services css - Should be removed to it's own component -*/
.services-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 372px;
  overflow-y: scroll;
}

.product-list.tablet {
  max-height: 100%;
  flex-direction: row;
  overflow-y: auto;
  padding: 16px 0;
  scrollbar-color: #1a4b5f;
  scrollbar-width: thin;
}

.product-list.tablet::-webkit-scrollbar-track {
  background: #1a4b5f;
  color: #1a4b5f;
  background-color: #1a4b5f;
}

.payment-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 402px;
  padding: 40px 12px;
}

.payment-details.mobile {
  max-width: 100%;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.9s ease-in,
    opacity 0.2s ease-in;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.add_new_address {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.add_new_address a {
  color: #0b3241;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 508px;
  margin: 0 auto;
}

.empty-state span {
  color: var(--Dark-950, #121212);
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
}

.back-to-shop {
  width: 100%;
}

@media (max-width: 768px) {
  main {
    margin-top: 16px;
  }

  .checkout-header {
    padding: 0;
  }
  .checkout-header h1 {
    color: var(--Dark-950, #121212);
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
  }
}
.error-message {
  color: #f04438;
  font-size: 14px;
  font-weight: 400;
}

.saved_address {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 6px;
}
</style>
