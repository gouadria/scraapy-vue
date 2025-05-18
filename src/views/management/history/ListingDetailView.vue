<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import boxComponent from '@/components/UIElements/boxComponent.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import MapElement from '@/components/UIElements/MapElement.vue'
import OrderDetailsList from '@/components/UIElements/OrderDetailsList.vue'
import trackingBar from '@/components/UIElements/trackingBar.vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import inputField from '@/components/UIElements/inputField.vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import UploadFile from '@/components/UIElements/UploadFile.vue'
// Icons
import containerIcon from '@/assets/svg-icons/containerIcon.vue'
import location from '@/assets/svg-icons/location.svg'
import phoneCall from '@/assets/svg-icons/Selling/phone-call-01.svg'
import userIcon from '@/assets/svg-icons/Selling/user-01.svg'
import globalLocation from '@/assets/svg-icons/Selling/globe-05.svg'
import reviewingActionIcon from '@/assets/svg-icons/Selling/fast-forward.svg'
import PreparingActionIcon from '@/assets/svg-icons/Selling/check.svg'

// Types
import type { orderDetails as OrderDetailsType } from '@/models/order'

interface Step {
  label: string
  value: string
  message: string
  sellerMessage: string
  buyerMessage: string
  role: string
  action: {
    sellerLabel: string
    buyerLabel: string
    handler: string
    class: string
    icon: any
  }
}

export default defineComponent({
  name: 'provideService',
  components: {
    boxComponent,
    MapElement,
    trackingBar,
    OrderDetailsList,
    MainBtn,
    EasyDataTable,
    ModalPopup,
    inputField,
    UploadFile
  },
  props: {
    orderDetails: {
      type: Object as PropType<OrderDetailsType>,
      required: true
    }
  },
  data() {
    return {
      autoAcceptOrders: false,
      currentStep: 0,
      stepTitles: [] as Step[],
      showUploadLicense: false,
      headers: [
        { text: 'Unit', value: 'unit' },
        { text: 'Unit Price', value: 'unitPrice' },
        { text: 'Unit Quantity', value: 'unitQuantity' },
        { text: 'Value', value: 'value' }
      ],
      items: [] as any[],
      sellerName: '',
      buyerName: this.orderDetails.buyer.name,
      userRole: '', // 'seller' or 'buyer' based on route,
      require_file: false,
      isFileUploaded: false
    }
  },
  computed: {
    category(): string {
      const page = this.$route.params.subPage
      return (
        {
          'products-sold': 'productSold',
          'products-bought': 'productBought',
          'rented-out': 'rentedOut'
        }[page as string] || ''
      )
    },
    address() {
      return {
        addressLine1: this.orderDetails.address_line1,
        addressLine2: this.orderDetails.address_line2,
        city: this.orderDetails.city,
        province: this.orderDetails.province,
        zipCode: this.orderDetails.zip_code,
        country: this.orderDetails.country,
        latitude: this.orderDetails.latitude,
        longitude: this.orderDetails.longitude
      }
    },
    InventoryTracking() {
      return [
        {
          value: `${this.orderDetails.itemQuantity + this.orderDetails.availableQuantity} ${this.orderDetails.price_unit}`,
          iconUrl: containerIcon,
          span: this.$t('Selling.QuantityAvailable'),
          parentClass: 'icon_purple'
        },
        {
          value: `${this.orderDetails.itemQuantity} ${this.orderDetails.price_unit}`,
          iconUrl: containerIcon,
          span: this.$t('Selling.ThisOrder'),
          parentClass: 'icon_red'
        },
        {
          value: `${this.orderDetails.availableQuantity} ${this.orderDetails.price_unit}`,
          iconUrl: containerIcon,
          span: this.$t('Selling.QuantityRemaining'),
          parentClass: 'icon_green'
        }
      ]
    },
    PickupAddress() {
      return [
        { value: this.orderDetails.address_line1, iconUrl: location, parentClass: 'box_text' },
        { value: this.orderDetails.city, iconUrl: globalLocation, parentClass: 'box_text' },
        { value: this.buyerName, iconUrl: userIcon, parentClass: 'box_text' },
        {
          value: this.orderDetails.buyer.contact_number,
          iconUrl: phoneCall,
          parentClass: 'box_text'
        }
      ]
    },
    activeStep(): string {
      return this.orderDetails.tracking.status
    },
    totalSteps(): number {
      return this.orderDetails.tracking.steps.length
    },
    currentStepData() {
      return {
        message: this.stepTitles[this.currentStep]?.message || '',
        sellerMessage: this.stepTitles[this.currentStep]?.sellerMessage || '',
        buyerMessage: this.stepTitles[this.currentStep]?.buyerMessage || '',
        sellerLabel: this.stepTitles[this.currentStep]?.action?.sellerLabel || '',
        buyerLabel: this.stepTitles[this.currentStep]?.action?.buyerLabel || '',
        driverMessage: this.stepTitles[this.currentStep]?.message || '',
        actionLabel: this.stepTitles[this.currentStep]?.action?.sellerLabel || '',
        actionClass: this.stepTitles[this.currentStep]?.action?.class || '',
        actionIcon: this.stepTitles[this.currentStep]?.action?.icon || null,
        role: this.stepTitles[this.currentStep]?.role || ''
      }
    },
    isActionDisabled(): boolean {
      const currentStepRole = this.stepTitles[this.currentStep]?.role
      if (!currentStepRole) return false
      return this.userRole !== currentStepRole
    },
    isRequireFileUpload(): boolean {
      return this.require_file
    }
  },
  watch: {
    'orderDetails.tracking': {
      handler(newVal) {
        this.buildStepTitles(newVal)
        this.updateItems()
      },
      immediate: true,
      deep: true
    },
    '$route.path': {
      handler(newPath) {
        this.setUserRole(newPath)
      },
      immediate: true
    },
    currentStep(newVal, oldVal) {
      // Reset isFileUploaded when the step changes
      if (newVal !== oldVal) {
        this.isFileUploaded = false
      }
    }
  },
  methods: {
    setUserRole(path: string) {
      if (path.includes('/management/Selling/')) {
        this.userRole = 'seller'
        this.sellerName = 'Current User'
      } else if (path.includes('/management/Purchasing/')) {
        this.userRole = 'buyer'
        this.sellerName = 'Other Party'
      }
    },
    updateItems() {
      this.items = [
        {
          unit: this.orderDetails.itemName,
          unitPrice: `${this.orderDetails.itemPrice} ${this.orderDetails.price_unit}`,
          unitQuantity: `${this.orderDetails.itemQuantity} ${this.orderDetails.price_unit}`,
          value: `${this.orderDetails.total_price} ${this.$t('Selling.SAR')}`
        }
      ]
    },
    buildStepTitles(trackingData: any) {
      const stepMapping: Record<string, Omit<Step, 'value' | 'role'>> = {
        reviewing: {
          label: this.$t('Selling.Reviewing'),
          message: this.$t('Selling.ReviewingMSG'),
          sellerMessage: this.$t('Selling.ReviewingMSG'),
          buyerMessage: this.$t('purchasing.ReviewingMSG'),
          action: {
            buyerLabel: this.$t('purchasing.NoAction'),
            sellerLabel: this.$t('Selling.ReviewingAction'),
            handler: 'handleStepAction',
            class: 'Reviewing_Action',
            icon: reviewingActionIcon
          }
        },
        preparing: {
          label: this.$t('Selling.Preparing'),
          message: this.$t('Selling.PreparingMSG'),
          sellerMessage: this.$t('Selling.PreparingMSG'),
          buyerMessage: this.$t('purchasing.PreparingMSG'),
          action: {
            buyerLabel: this.$t('purchasing.NoAction'),
            sellerLabel: this.$t('Selling.PreparingAction'),
            handler: 'handleStepAction',
            class: 'Preparing_Action',
            icon: PreparingActionIcon
          }
        },
        ready: {
          label: this.$t('Selling.Ready'),
          message: this.$t('Selling.ReadyMSG'),
          sellerMessage: this.$t('Selling.ReadyMSG'),
          buyerMessage: this.$t('purchasing.ReadyMSG'),
          action: {
            sellerLabel: this.$t('Selling.ReadyAction'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: 'Ready_Action',
            icon: PreparingActionIcon
          }
        },
        shipped: {
          label: this.$t('Selling.Shipped'),
          message: this.$t('Selling.ShippedMSG'),
          sellerMessage: this.$t('Selling.ShippedMSG'),
          buyerMessage: this.$t('purchasing.ShippedMSG'),
          action: {
            sellerLabel: this.$t('Selling.Shipped'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : '',
            icon: PreparingActionIcon
          }
        },
        handoff: {
          label: this.$t('Selling.handoff'),
          message: this.$t('Selling.ShippedMSG'),
          sellerMessage: this.$t('purchasing.receivedMSG'),
          buyerMessage: this.$t('purchasing.receivedMSG'),
          action: {
            sellerLabel: this.$t('purchasing.NoAction'),
            buyerLabel: this.$t('purchasing.OrderReceived'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        received: {
          label: this.$t('Selling.received'),
          message: this.$t('Selling.ShippedMSG'),
          sellerMessage: this.$t('purchasing.receivedMSG'),
          buyerMessage: this.$t('purchasing.receivedMSG'),
          action: {
            sellerLabel: this.$t('purchasing.NoAction'),
            buyerLabel: this.$t('purchasing.OrderReceived'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        inspecting: {
          label: this.$t('Selling.inspecting'),
          message: this.$t('Selling.inspectingMSG'),
          sellerMessage: this.$t('purchasing.inspectingMSG'),
          buyerMessage: this.$t('Selling.inspectingMSG'),
          action: {
            sellerLabel: this.$t('purchasing.inspecting'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        obtained: {
          label: this.$t('Selling.Obtained'),
          message: this.$t('Selling.ObtainedMSG'),
          sellerMessage: this.$t('Selling.ObtainedMSG'),
          buyerMessage: this.$t('purchasing.NoAction'),
          action: {
            sellerLabel: this.$t('Selling.ObtainedLabel'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        started_journey: {
          label: this.$t('Selling.startedJourney'),
          message: this.$t('Selling.startedJourneyMSG'),
          sellerMessage: this.$t('purchasing.NoAction'),
          buyerMessage: this.$t('purchasing.NoAction'),
          action: {
            sellerLabel: this.$t('purchasing.NoAction'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        picked_up: {
          label: this.$t('Selling.pickedUp'),
          message: this.$t('Selling.pickedUpMSG'),
          sellerMessage: this.$t('purchasing.NoAction'),
          buyerMessage: this.$t('purchasing.NoAction'),
          action: {
            sellerLabel: this.$t('purchasing.NoAction'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        dropped_off: {
          label: this.$t('Selling.droppedOff'),
          message: this.$t('Selling.droppedOffMSG'),
          sellerMessage: this.$t('purchasing.NoAction'),
          buyerMessage: this.$t('purchasing.NoAction'),
          action: {
            sellerLabel: this.$t('purchasing.NoAction'),
            buyerLabel: this.$t('purchasing.NoAction'),
            handler: 'handleStepAction',
            class: this.userRole === 'buyer' ? 'Shipped_Action' : 'received_Action',
            icon: PreparingActionIcon
          }
        },
        complete: {
          label: this.$t('Selling.Complete'),
          message: this.$t('Selling.CompleteMSG'),
          sellerMessage: this.$t('Selling.CompleteMSG'),
          buyerMessage: this.$t('purchasing.CompleteMSG'),
          action: {
            sellerLabel: 'complete',
            buyerLabel: 'complete',
            handler: 'handleCompletionAction',
            class: 'Complete_Action',
            icon: PreparingActionIcon
          }
        }
      }

      if (trackingData && Array.isArray(trackingData.steps)) {
        this.stepTitles = trackingData.steps.map(([status, role]: [string, string]) => ({
          value: status,
          role,
          ...stepMapping[status]
        }))
        this.currentStep = trackingData.steps.findIndex(
          ([s]: [string, string]) => s === trackingData.status
        )
      }
    },

    async updateTracking() {
      try {
        const response = await this.$axios.post(
          `/api/billing/orders/${this.orderDetails.orderId}/`,
          {
            order_item_id: this.orderDetails.orderItemId
          }
        )

        // Extract data from the response structure you showed
        if (response.data && response.data.data) {
          // Update the require_file property from the nested data
          this.require_file = response.data.data.require_file || false

          console.log('Updated require_file:', this.require_file)
        }

        // // Continue with the rest of your processing
        // this.buildStepTitles(this.orderDetails.tracking)

        // Emit the update with the updated require_file
        this.$emit('update:tracking', {
          status: this.activeStep,
          steps: this.orderDetails.tracking.steps
        })

        return response.data
      } catch (error) {
        console.error('Error updating tracking:', error)
        throw error
      }
    },
    async handleAction() {
      if (this.isActionDisabled || (this.isRequireFileUpload && !this.isFileUploaded)) return
      const handler = this.stepTitles[this.currentStep]?.action.handler
      if (handler && typeof this[handler] === 'function') {
        await this[handler]()
        await this.updateTracking()
      }
    },
    async handleStepAction() {
      if (this.currentStep < this.totalSteps - 1) this.currentStep++
    },
    async handleReceivedAction() {
      if (this.userRole === 'buyer') {
        if (this.currentStep < this.totalSteps - 1) this.currentStep++
      }
      this.handleCompletionAction()
    },
    handleCompletionAction() {
      this.currentStep++
    },
    handleClose() {
      this.$emit('back')
    },
    formatCurrency(value: number): string {
      return `SAR ${parseFloat(value.toString())
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    },
    getRoleLabel(role: string): string {
      if (role === 'seller') return `Seller: ${this.sellerName || 'Unknown'}`
      if (role === 'buyer') return `Buyer: ${this.buyerName}`
      return 'Completed'
    },
    async uploadeReport(file: File) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await this.$axios.post(
          `api/billing/orderitem/report/${this.orderDetails.orderItemId}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (response.status === 200) {
          this.isFileUploaded = true
          console.log('File uploaded successfully')
        } else {
          console.error('File upload failed:', response.data.message)
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  },
  mounted() {
    // console.log('mounted data tracking ', this.isRequireFileUpload)
  }
})
</script>

<template>
  <div class="productDetails">
    <div class="header">
      <div class="text">
        <h6 @click="handleClose">
          <img class="dir" src="@/assets/svg-icons/chevron-left.svg?url" alt="Go Back" />
          {{ $t('Selling.GoBack') }}
        </h6>
        <h1>{{ $t('Selling.Order') }} # {{ orderDetails.orderId.slice(-10) }}</h1>
      </div>
    </div>

    <div class="order_list_details">
      <div class="list">
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box product">
              <h6 class="box_title">{{ $t('Selling.Product') }}</h6>
              <h3>
                {{
                  $i18n.locale === 'ar' ? orderDetails?.itemCategory_ar : orderDetails?.itemCategory
                }}
              </h3>
              <router-link :to="{ name: 'product-detail', params: { id: orderDetails.itemId } }">
                {{ $t('Selling.GotoProductPage') }} >
              </router-link>
            </div>
          </template>
        </boxComponent>
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">
                {{ category === 'rentedOut' ? $t('Selling.orderDetails') : $t('Selling.Details') }}
              </h6>
              <OrderDetailsList :details="orderDetails.details" />
            </div>
          </template>
        </boxComponent>
        <boxComponent v-if="category === 'productSold' || category === 'rentedOut'">
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">{{ $t('Selling.InventoryTracking') }}</h6>
              <OrderDetailsList :details="InventoryTracking" />
            </div>
          </template>
        </boxComponent>
        <boxComponent v-if="category === 'productBought'">
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">{{ $t('Selling.additional_services_bought') }}</h6>
              <div class="service">
                <img src="@/assets/svg-icons/tick_icon.svg?url" alt="" />
                <p>{{ $t('Selling.lab_test') }}</p>
                <img src="@/assets/svg-icons/share_icon.svg?url" alt="" />
              </div>
              <div class="service">
                <img src="@/assets/svg-icons/tick_icon.svg?url" alt="" />
                <p>{{ $t('Selling.weighing') }}</p>
                <img src="@/assets/svg-icons/share_icon.svg?url" alt="" />
              </div>
              <div class="service">
                <img src="@/assets/svg-icons/tick_icon.svg?url" alt="" />
                <p>{{ $t('Selling.loading_unloading') }}</p>
                <img src="@/assets/svg-icons/share_icon.svg?url" alt="" />
              </div>
            </div>
          </template>
        </boxComponent>
      </div>

      <div class="list">
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box" v-auto-animate>
              <div class="box_title">
                <h6 class="box_title">{{ $t('Selling.PickupAddress') }}</h6>
                <p>{{ $t('Selling.PickupAddressText') }}</p>
              </div>
              <div class="divider"></div>
              <div class="pickupDetails" v-if="currentStep > 0 || category !== 'rentedOut'">
                <OrderDetailsList :details="PickupAddress" />
                <div class="divider"></div>
                <div class="map_container">
                  <div class="box_title">
                    <h6 class="box_title">{{ $t('Selling.PickupAddress') }}</h6>
                    <p>{{ $t('Selling.PickupAddressText') }}</p>
                  </div>
                  <MapElement :gSearch="false" :zoomBtns="false" :address="address" />
                </div>
              </div>
            </div>
          </template>
        </boxComponent>
      </div>

      <div class="list">
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box">
              <div class="box_title">
                <h6>{{ $t('Selling.OrderTracking') }}</h6>
                <p>{{ $t('Selling.PickupAddressText') }}</p>
              </div>
              <div class="divider"></div>
              <div class="live_tracking">
                <trackingBar
                  :steps="stepTitles"
                  :current-step="currentStep"
                  :user-role="userRole"
                />
              </div>
              <div class="step_message">
                <p v-if="userRole === 'seller'" class="seller-message">
                  {{ currentStepData.sellerMessage }}
                </p>
                <p v-else-if="userRole === 'buyer'" class="buyer-message">
                  {{ currentStepData.buyerMessage }}
                </p>
              </div>
              <div class="step_actions" v-if="currentStep < totalSteps - 1">
                <MainBtn
                  type="green"
                  @click="handleAction"
                  :class="currentStepData.actionClass"
                  class="action_btn"
                  :disabled="isActionDisabled || (isRequireFileUpload && !isFileUploaded)"
                >
                  {{
                    userRole === 'buyer' ? currentStepData.buyerLabel : currentStepData.sellerLabel
                  }}
                  <component :is="currentStepData.actionIcon" />
                </MainBtn>
                <UploadFile
                  :type="['.pdf']"
                  @file="uploadeReport"
                  showFileInfo
                  v-if="isRequireFileUpload && !isActionDisabled"
                />
              </div>
            </div>
          </template>
        </boxComponent>
      </div>
    </div>
  </div>

  <div class="financial_details">
    <div class="title">
      <h2>{{ $t('Selling.FinancialDetails') }}</h2>
      <div class="divider"></div>
    </div>
    <div class="financial_table">
      <EasyDataTable
        :headers="headers"
        :items="items"
        :rows-per-page="5"
        :hide-footer="true"
        table-class-name="customize-table"
      />
      <div class="summary_table">
        <div class="summary_row Subtotal">
          <div>{{ $t('cart.Subtotal') }}</div>
          <div>{{ formatCurrency(orderDetails.itemPrice) }}</div>
        </div>
        <div class="summary_row VAT">
          <div>{{ $t('cart.VAT') }} (15%)</div>
          <div>{{ formatCurrency(orderDetails.itemPrice * 0.15) }}</div>
        </div>
        <div class="summary_row total">
          <div>{{ $t('cart.TOTAL') }}</div>
          <div>{{ formatCurrency(orderDetails.itemPrice * 1.15) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.role-info {
  font-size: 0.9em;
  color: #666;
  margin-top: 5px;
}

.productDetails {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  gap: 48px;
}

.header {
  display: flex;
  padding-bottom: 18px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  align-self: stretch;
  border-bottom: 0.8px solid #e7e7e7;
}

.header .text h6 {
  font-size: 14px;
  font-weight: 400;
  color: #6d6d6d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.header .text h1 {
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
}

.button_text {
  display: flex;
  align-items: center;
  gap: 4px;
}

.order_list_details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

@media (max-width: 768px) {
  .order_list_details {
    grid-template-columns: 1fr;
  }

  .order_div {
    justify-content: space-between;
  }
}

@media (max-width: 1200px) {
  .order_list_details {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 1400px) {
  .order_list_details {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

.pickupDetails {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: column;
}

.list .common_box {
  width: 100%;
}

.order_box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.order_box.product {
  gap: 4px;
}

.order_box.product h3 {
  color: #121212;
  font-size: 18px;
  font-weight: 600;
}

.order_box.product a {
  color: #136a83;
  font-size: 14px;
  font-weight: 400;
  text-decoration-line: underline;
}

.box_title h6,
.order_box h6 {
  color: #6d6d6d;
  font-size: 14px;
  font-weight: 400;
}

.map_container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.box_title p {
  color: #4f4f4f;
  font-size: 12px;
  font-weight: 400;
}

.bluer_details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.step_actions {
  display: flex;
  gap: 16px;
  flex-direction: column;
}
.step_actions button {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 16px;
}

.step_actions button div {
  display: flex;
  align-items: center;
}

.Shipped_Action {
  color: #888;
  border-radius: 8px;
  border: 1px solid #d1d1d1;
  background: #e7e7e7;
  cursor: not-allowed;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.financial_details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.financial_details .title {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}

.customize-table {
  --easy-table-border: 1px solid #dee2e6;
  --easy-table-row-border: 1px solid #dee2e6;
  --easy-table-header-background-color: #136a83;
  --easy-table-header-font-color: #fff;
  --easy-table-header-height: 50px;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;
  --easy-table-header-font-size: 14px;
  --easy-table-header-font-weight: 700;
  --easy-table-body-row-font-color: #424242;
  --easy-table-body-row-background-color: #fff;
  --easy-table-body-row-hover-background-color: #f5f5f5;
  --easy-table-border-radius: 20px;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 0;
}

/* Summary Table Styling */
.summary_table {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.summary_table .summary_row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary_table .summary_row div {
  padding: 12px 10px;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  color: #3d3d3d;
}

.Subtotal {
  border: 1px solid #ddd;
  background: #e7e7e7;
}

.VAT {
  border-top: 0.5px solid var(--Dark-100, #e7e7e7);
  border-right: 0.5px solid var(--Dark-100, #e7e7e7);
  border-left: 0.5px solid var(--Dark-100, #e7e7e7);
}

.total {
  border-top: 0.5px solid var(--Secondary---500, #15b377);
  border-right: 0.5px solid var(--Secondary---500, #15b377);
  background: var(--Secondary---500, #15b377);
  border-radius: 0px 0 10px 10px;
  color: #fff;
}

.summary_table .summary_row.total div {
  color: #fff;
}

.summary_table .summary_row.VAT div {
  font-weight: 400;
  color: #4f4f4f;
}

.service {
  display: flex;
  gap: 10px;
  align-items: center;
}

.service img {
  width: 17px;
  height: 17px;
}

/* Summary Table Styling */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 30px;
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
</style>

<style>
.order_box .list_details li div p.icon_purple,
.icon_purple path {
  stroke: #136a83;
  color: #136a83;
}

.order_box .list_details li div p.icon_red,
.icon_red path {
  stroke: #f04438;
  color: #f04438;
}

.order_box .list_details li div p.icon_green,
.icon_green path {
  stroke: #15b377;
  color: #15b377;
}

.order_box .list_details li div p.box_text {
  font-weight: 500;
  color: #4f4f4f;
}

.customize-table .vue3-easy-data-table__main {
  border-radius: 10px 10px 0px 0px;
}

@media (max-width: 992px) {
  .customize-table .vue3-easy-data-table__body tr td:first-child {
    min-width: 230px;
  }
}
</style>
