<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, shallowRef } from 'vue'
import boxComponent from '@/components/UIElements/boxComponent.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import MapElement from '@/components/UIElements/MapElement.vue'
import OrderDetailsList from '@/components/UIElements/OrderDetailsList.vue'
import trackingBar from '@/components/UIElements/trackingBar.vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import inputField from '@/components/UIElements/inputField.vue'
import ToggleButton from '@/components/UIElements/toggle_button.vue'

// packages
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import calender from '@/assets/svg-icons/Selling/calendar.svg'
import clock from '@/assets/svg-icons/Selling/clock.svg'
import bankNote from '@/assets/svg-icons/Selling/bank-note-01.svg'
import containerIcon from '@/assets/svg-icons/containerIcon.vue'
import location from '@/assets/svg-icons/location.svg'
import phoneCall from '@/assets/svg-icons/Selling/phone-call-01.svg'
import userIcon from '@/assets/svg-icons/Selling/user-01.svg'
import globalLocation from '@/assets/svg-icons/Selling/globe-05.svg'
import reviewingActionIcon from '@/assets//svg-icons//Selling/fast-forward.svg'
import PreparingActionIcon from '@/assets/svg-icons/Selling/check.svg'
import buildingIcon from '@/assets//svg-icons//Selling/building-07.svg'
import carIcon from '@/assets//svg-icons//Selling/car-01.svg'
import backIcon from '@/assets/svg-icons/chevron-left.svg'
import TickIcon from '@/assets/svg-icons/tick_icon.svg'

// Types
import type { orderDetails as OrderDetailsType, items } from '@/models/order'

interface Step {
  label: string
  value: string
  message: string
  action: {
    label: string
    handler: string
    class: string
    icon: string
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
    ToggleButton
  },
  props: {
    orderDetails: {
      type: Object as PropType<OrderDetailsType>,
      required: true,
      default: () => ({})
    },
    category: {
      type: String,
      required: false,
      default: 'productSold'
    }
  },
  data() {
    return {
      autoAcceptOrders: false,
      searchQuery: '',
      inventoryDetails: [
        {
          value: this.$props.orderDetails.createOrderTime,
          iconUrl: shallowRef(calender),
          span: this.$t('Selling.OrderTime')
        },
        {
          value: this.$props.orderDetails.createOrderDate,
          iconUrl: shallowRef(clock),
          span: this.$t('Selling.EndDate')
        },
        {
          value: this.$props.orderDetails.total_price,
          iconUrl: shallowRef(containerIcon),
          span: this.$t('Selling.OrderedQuantity')
        },
        {
          value: this.$props.orderDetails.total_price,
          iconUrl: shallowRef(bankNote),
          span: this.$props.orderDetails.price_unit
        }
      ],
      InventoryTracking: [
        {
          value:
            this.$props.orderDetails.itemQuantity +
            this.$props.orderDetails.availableQuantity +
            ' ' +
            this.$props.orderDetails.price_unit,
          iconUrl: shallowRef(containerIcon),
          span: this.$t('Selling.QuantityAvailable'),
          parentClass: 'icon_purple'
        },
        {
          value: this.$props.orderDetails.itemQuantity + ' ' + this.$props.orderDetails.price_unit,
          iconUrl: shallowRef(containerIcon),
          span: this.$t('Selling.ThisOrder'),
          parentClass: 'icon_red'
        },
        {
          value:
            this.$props.orderDetails.availableQuantity + ' ' + this.$props.orderDetails.price_unit,
          iconUrl: shallowRef(containerIcon),
          span: this.$t('Selling.QuantityRemaining'),
          parentClass: 'icon_green'
        }
      ],
      PickupAddress: [
        {
          value: this.$props.orderDetails.deliveryAddress,
          iconUrl: shallowRef(location),
          parentClass: 'box_text'
        },
        {
          value: this.$props.orderDetails.deliveryCity,
          iconUrl: shallowRef(globalLocation),
          parentClass: 'box_text'
        },
        {
          value: 'Abdullah Al Dossary',
          iconUrl: shallowRef(userIcon),
          parentClass: 'box_text'
        },
        {
          value: '+966 56 879 2154',
          iconUrl: shallowRef(phoneCall),
          parentClass: 'box_text'
        }
      ],
      currentStep: 0,
      stepTitles: [
        {
          label: this.$t('Selling.Reviewing'),
          value: 'reviewing',
          message: this.$t('Selling.ReviewingMSG'),
          action: {
            label: this.$t('Selling.ReviewingAction'),
            handler: 'handleReviewAction',
            class: 'Reviewing_Action',
            icon: shallowRef(reviewingActionIcon)
          }
        },
        {
          label: this.$t('Selling.Preparing'),
          value: 'preparing',
          message: this.$t('Selling.PreparingMSG'),
          action: {
            label: this.$t('Selling.PreparingAction'),
            handler: 'handlePreparationAction',
            class: 'Preparing_Action',
            icon: shallowRef(PreparingActionIcon)
          }
        },
        {
          label: this.$t('Selling.Ready'),
          value: 'ready',
          message: this.$t('Selling.ReadyMSG'),
          action: {
            label: this.$t('Selling.ReadyAction'),
            handler: 'handleReadyAction',
            class: 'Ready_Action',
            icon: shallowRef(PreparingActionIcon)
          }
        },
        {
          label: this.$t('Selling.Shipped'),
          value: 'shipped',
          message: this.$t('Selling.ShippedMSG'),
          action: {
            label: this.$t('Selling.ShippedAction'),
            handler: 'handleShipmentAction',
            class: 'Shipped_Action',
            icon: shallowRef(PreparingActionIcon)
          }
        },
        {
          label: this.$t('Selling.Complete'),
          value: 'complete',
          message: this.$t('Selling.CompleteMSG'),
          action: {
            label: 'View Details',
            handler: 'handleCompletionAction',
            class: 'Complete_Action',
            icon: shallowRef(PreparingActionIcon)
          }
        }
      ] as Step[],

      headers: [
        { text: 'Unit', value: 'unit' },
        { text: 'Unit Price', value: 'unitPrice' },
        { text: 'Unit Quantity', value: 'unitQuantity' },
        { text: 'Value', value: 'value' }
      ],

      items: [
        {
          unit: this.$props.orderDetails.itemName,
          unitPrice: this.$props.orderDetails.itemPrice + ' ' + this.$props.orderDetails.price_unit,
          unitQuantity:
            this.$props.orderDetails.itemQuantity + ' ' + this.$props.orderDetails.price_unit,
          value: this.$props.orderDetails.total_price + ' ' + this.$t('Selling.SAR')
        }
      ],
      buildingIcon: shallowRef(buildingIcon),
      carIcon: shallowRef(carIcon),
      calenderIcon: shallowRef(calender),
      backIcon: shallowRef(backIcon),
      TickIcon: shallowRef(TickIcon),
      showUploadLicense: false,
    }
  },
  computed: {
    getCurrentStepMessage(): string {
      console.log('Current Step', this.currentStep)
      return this.stepTitles[this.currentStep]?.message || ''
    },

    getCurrentActionLabel(): string {
      return this.stepTitles[this.currentStep]?.action.label || ''
    },
    getCurrentActionClass(): string {
      return this.stepTitles[this.currentStep]?.action.class
    },
    getCurrentActionIcon(): string {
      return this.stepTitles[this.currentStep]?.action.icon
    },

    previousStepTitle() {
      if (this.currentStep > 0) {
        return this.stepTitles[this.currentStep - 1]
      } else {
        return null
      }
    },

    nextStepTitle() {
      if (this.currentStep < this.stepTitles.length - 1) {
        return this.stepTitles[this.currentStep + 1]
      } else {
        return null
      }
    },
    nextStepDisabled() {
      return this.currentStep === this.stepTitles.length - 1
    },
    previousStepDisabled() {
      return this.currentStep === 0
    }
  },
  watch: {},
  methods: {
    handleToggle() {
      console.log('Toggled', this.autoAcceptOrders)
    },
    documentsSearch() {
      console.log('Search Query', this.searchQuery)
    },
    SortByLatest() {
      console.log('Sort by Latest')
    },
    handleStepClick(index: number): void {
      this.currentStep = index
      console.log('Step clicked', index)
    },
    handleCurrentStepAction(): void {
      const currentStep = this.stepTitles[this.currentStep]
      if (currentStep && currentStep.action) {
        const handler = currentStep.action.handler
        if (typeof this[handler] === 'function') {
          this[handler]()
        }
      }
    },
    // Step-specific action handlers
    handleReviewAction(): void {
      console.log('Review action triggered')
      this.currentStep = this.currentStep + 1
    },

    handlePreparationAction(): void {
      console.log('Preparation action triggered')
      this.currentStep = this.currentStep + 1
    },

    handleReadyAction(): void {
      this.currentStep = this.currentStep + 1
      console.log('Ready action triggered')
    },

    handleShipmentAction(): void {
      // this.currentStep = this.currentStep + 1
      console.log('Track shipment triggered')
    },

    handleCompletionAction(): void {
      this.currentStep = this.currentStep + 1
      console.log('View details triggered')
    },
    handleClose() {
      this.$emit('back')
    },

    emitClose() {
      this.$emit('close')
    }
  },
  mounted() {
    console.log('orderDetails', this.orderDetails)
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
      <div class="Auto_Accept_Orders">
        <p>{{ $t('Selling.AutoAcceptOrders') }}</p>
        <ToggleButton v-model:isActive="autoAcceptOrders" :onToggle="handleToggle" />
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
                  this.$i18n.locale === 'ar'
                    ? orderDetails?.itemCategory_ar
                    : orderDetails?.itemCategory
                }}
              </h3>
              <router-link to="#">{{ $t('Selling.GotoProductPage') }} ></router-link>
            </div>
          </template>
        </boxComponent>
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">
                {{ category === 'rentedOut' ? $t('Selling.orderDetails') : $t('Selling.Details') }}
              </h6>
              <OrderDetailsList :details="inventoryDetails" />
            </div>
          </template>
        </boxComponent>
        <boxComponent v-if="category == 'productSold'">
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">{{ $t('Selling.InventoryTracking') }}</h6>
              <OrderDetailsList :details="InventoryTracking" />
            </div>
          </template>
        </boxComponent>
        <boxComponent v-if="category == 'productBought'">
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

              <!-- <OrderDetailsList :details="InventoryTracking" /> -->
            </div>
          </template>
        </boxComponent>

        <boxComponent v-if="category === 'rentedOut'">
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">{{ $t('Selling.InventoryTracking') }}</h6>
              <OrderDetailsList :details="InventoryTracking" />
            </div>
          </template>
        </boxComponent>
      </div>
      <!--  -->
      <div class="list">
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box" v-auto-animate>
              <div class="box_title">
                <h6 class="box_title">{{ $t('Selling.PickupAddress') }}</h6>
                <p>{{ $t('Selling.PickupAddressText') }}</p>
              </div>
              <div class="divider"></div>
              <!-- currentStep -->
              <div class="bluer_details" v-if="currentStep === 0 && category === 'rentedOut'">
                <img src="" alt="" />
              </div>
              <div class="pickupDetails" v-else>
                <OrderDetailsList :details="PickupAddress" />
                <div class="divider"></div>
                <div class="map_container">
                  <div class="box_title">
                    <h6 class="box_title">{{ $t('Selling.PickupAddress') }}</h6>
                    <p>{{ $t('Selling.PickupAddressText') }}</p>
                  </div>
                  <MapElement />
                </div>
              </div>
            </div>
          </template>
        </boxComponent>
      </div>
      <!--  -->
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
                  :currentStep="currentStep"
                  @step-click="handleStepClick"
                />
              </div>
              <div class="step_message">
                <p>{{ getCurrentStepMessage }}</p>
              </div>
              <div class="step_actions" v-if="currentStep < 4">
                <MainBtn
                  type="green"
                  @click="handleCurrentStepAction"
                  :class="getCurrentActionClass"
                  class="action_btn"
                >
                  {{ getCurrentActionLabel }}
                  <div>
                    <component :is="getCurrentActionIcon" />
                  </div>
                </MainBtn>
              </div>
            </div>
          </template>
        </boxComponent>
      </div>
      <!--  -->
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
        <!-- Summary Table -->
        <div class="summary_table">
          <div class="summary_row Subtotal">
            <div>{{$t('cart.Subtotal')}}</div>
            <div>SAR171,000.00</div>
          </div>

          <div class="summary_row VAT">
            <div>{{$t('cart.VAT')}} (15%)</div>
            <div>SAR171,000.00</div>
          </div>

          <div class="summary_row total">
            <div>{{$t('cart.TOTAL')}}</div>
            <div>SAR171,000.00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.Auto_Accept_Orders {
  display: flex;
  align-items: center;
  gap: 8px;
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
