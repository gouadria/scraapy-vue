<script lang="ts">
import type { PropType } from 'vue'
import { shallowRef } from 'vue'
import boxComponent from '@/components/UIElements/boxComponent.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import type { orderDetails } from '@/models/order'
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
import HouerGlass from '@/assets/svg-icons/Selling/hourglass-01.svg'
import sunset from '@/assets/svg-icons/Selling/sunset.svg'
import sunrise from '@/assets/svg-icons/Selling/sunrise.svg'
import CheckIcon from '@/assets/svg-icons/Selling/check.svg'
import CloseIcon from '@/assets/svg-icons/Selling/x-close.svg'

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
  rejectAction: {
    label: string
    handler: string
    class: string
    icon: string
  }
}
interface Vehicle {
  id: number
  numberPlate: string
  label: string
  carName: string
  category: string
  img: string
  license: {
    id: number
    name: string
    number: string
    expirationDate: string
    type: string
    file: string | File
    icon: string
  }[]
  driver: {
    id: number
    name: string
    phoneNumber: string
    driverID: string | File
    driverLicenseLink: string | File
  }
}
export default {
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
      type: Object as PropType<orderDetails>,
      required: true,
      default: () => ({})
    },
    category: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      autoAcceptOrders: false,
      searchQuery: '',
      openReplaceAssets: false,
      inventoryDetails: [
        {
          value: this.$props.orderDetails.OrderDate,
          iconUrl: shallowRef(calender),
          span: this.$t('Selling.OrderTime')
        },
        {
          value: this.$props.orderDetails.OrderTime,
          iconUrl: shallowRef(clock),
          span: this.$t('Selling.EndDate')
        },
        {
          value: this.$props.orderDetails.quantity,
          iconUrl: shallowRef(containerIcon),
          span: this.$t('Selling.OrderedQuantity')
        },
        {
          value: this.$props.orderDetails.price,
          iconUrl: shallowRef(bankNote),
          span: this.$t('Selling.PricePerKG')
        }
      ],
      productDetails: [
        {
          value: 'Mercedes',
          iconUrl: shallowRef(carIcon),
          span: this.$t('Selling.carMaker')
        },
        {
          value: '2009',
          iconUrl: shallowRef(calender),
          span: this.$t('Selling.ModelYear')
        }
      ],
      RentingTenure: [
        {
          value: '07 February 2024 | 16:00',
          iconUrl: shallowRef(sunset),
          span: this.$t('Selling.Start')
        },
        {
          value: '06 March 2024 | 16:00',
          iconUrl: shallowRef(sunrise),
          span: this.$t('Selling.End')
        },
        {
          value: '30',
          iconUrl: shallowRef(HouerGlass),
          span: this.$t('Selling.TotalDays'),
          parentClass: 'icon_green'
        }
      ],
      PickupAddress: [
        {
          value: '14 Street, Ash Shumaliyah',
          iconUrl: shallowRef(location),
          parentClass: 'box_text'
        },
        {
          value: 'Al Khobar, Saudi Arabia',
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
          label: this.$t('Selling.PendingAcceptance'),
          value: 'reviewing',
          message: this.$t('Selling.PendingAcceptanceMSG'),
          action: {
            label: this.$t('Selling.AcceptOrder'),
            handler: 'handleReviewAction',
            class: 'Reviewing_Action',
            icon: shallowRef(CheckIcon)
          },
          rejectAction: {
            label: this.$t('Selling.AcceptOrder'),
            handler: 'handleReviewAction',
            class: 'Reviewing_Action',
            icon: shallowRef(CloseIcon)
          }
        },
        {
          label: this.$t('Selling.Accepted'),
          value: 'preparing',
          message: this.$t('Selling.AcceptedMSG'),
          action: {
            label: this.$t('Selling.PreparingAction'),
            handler: 'handlePreparationAction',
            class: 'Preparing_Action',
            icon: shallowRef(PreparingActionIcon)
          }
        },
        {
          label: this.$t('Selling.WithTenant'),
          value: 'ready',
          message: this.$t('Selling.WithTenantMSG'),
          action: {
            label: this.$t('Selling.ReadyAction'),
            handler: 'handleReadyAction',
            class: 'Ready_Action',
            icon: shallowRef(PreparingActionIcon)
          }
        },
        {
          label: this.$t('Selling.Returned'),
          value: 'shipped',
          message: this.$t('Selling.ReturnedMSG'),
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
          message: this.$t('Selling.rentCompleteMSG'),
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
          unit: 'Hydraulic Excavator-8212 NKJ',
          unitPrice: 'SAR950.00',
          unitQuantity: '30 Days',
          value: 'SAR28,500.00'
        },
        {
          unit: 'Hydraulic Excavator-708 BNE',
          unitPrice: 'SAR950.00',
          unitQuantity: '30 Days',
          value: 'SAR28,500.00'
        },
        {
          unit: 'Hydraulic Excavator-6263 KBJ',
          unitPrice: 'SAR950.00',
          unitQuantity: '30 Days',
          value: 'SAR28,500.00'
        },
        {
          unit: 'Hydraulic Excavator-9580 LVJ',
          unitPrice: 'SAR950.00',
          unitQuantity: '30 Days',
          value: 'SAR28,500.00'
        },
        {
          unit: 'Hydraulic Excavator-4966 ADD',
          unitPrice: 'SAR950.00',
          unitQuantity: '30 Days',
          value: 'SAR28,500.00'
        },
        {
          unit: 'Hydraulic Excavator-5829 BKR',
          unitPrice: 'SAR950.00',
          unitQuantity: '30 Days',
          value: 'SAR28,500.00'
        }
      ],

      footer: [
        { label: 'Subtotal', value: 'SAR 171,000.00' },
        { label: 'VAT', value: '15%', extra: 'SAR 25,650.00' },
        { label: 'TOTAL', value: 'SAR 196,650.00' }
      ],
      AssignedAssets: [
        {
          id: 1,
          numberPlate: '9781 BNE ',
          label: '9781 HLR - Abarth 20020',
          carName: 'Bentley 2016',
          category: 'Hydraulic Excavator',
          img: '../../../assets/services-image-1.png',
          license: [
            {
              id: 1,
              name: 'Equipment License',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 2,
              name: 'Aramco Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 3,
              name: 'Sabic Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 4,
              name: 'OSHA Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 6,
              name: 'ISO 9001 Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            }
          ],
          driver: {
            id: 2,
            name: 'mohamed Ali',
            phoneNumber: '0564558763',
            driverID: '7862314986',
            driverLicenseLink: 'assets/driver-1.jpg'
          }
        },
        {
          id: 2,
          numberPlate: '5565 KBJ',
          label: '5565 HLR - Mercedes Benz 2016',
          carName: 'Mercedes Benz 2016',
          category: 'Hydraulic Excavator',
          img: '../../../assets/services-image-2.png',
          license: [
            {
              id: 1,
              name: 'Equipment License',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 2,
              name: 'Aramco Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 3,
              name: 'Sabic Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 4,
              name: 'OSHA Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 6,
              name: 'ISO 9001 Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            }
          ],
          driver: {
            id: 3,
            name: 'mohamed Khaled',
            phoneNumber: '0564558763',
            driverID: '7862314986',
            driverLicenseLink: 'assets/driver-1.jpg'
          }
        },
        {
          id: 3,
          numberPlate: '5565 HLR',
          label: '5565 HLR - Bentley 2016',
          carName: 'Bentley 2016',
          category: 'Hydraulic Excavator',
          img: '../../../assets/services-image-3.png',
          license: [
            {
              id: 1,
              name: 'Equipment License',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 2,
              name: 'Aramco Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 3,
              name: 'Sabic Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 4,
              name: 'OSHA Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 6,
              name: 'ISO 9001 Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            }
          ],
          driver: {
            id: 5,
            name: 'mohamed Ahmed',
            phoneNumber: '0564558763',
            driverID: '7862314986',
            driverLicenseLink: 'assets/driver-1.jpg'
          }
        },
        {
          id: 4,
          numberPlate: '5747 BKR',
          label: '5747 HLR',
          carName: 'BMW 2019',
          category: 'Hydraulic Excavator',
          img: '../../../assets/services-image-2.png',
          license: [
            {
              id: 1,
              name: 'Equipment License',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 2,
              name: 'Aramco Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 3,
              name: 'Sabic Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 4,
              name: 'OSHA Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 6,
              name: 'ISO 9001 Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            }
          ],
          driver: {
            id: 4,
            name: 'mohamed Tamer',
            phoneNumber: '0564558763',
            driverID: '7862314986',
            driverLicenseLink: 'assets/driver-1.jpg'
          }
        },
        {
          id: 5,
          numberPlate: '5781 KBJ',
          label: '5781 HLR - Mercedes Actross 2009',
          carName: 'Mercedes Actross 2009',
          category: 'Hydraulic Excavator',
          img: '../../../assets/services-image-1.png',
          license: [
            {
              id: 1,
              name: 'Equipment License',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 2,
              name: 'Aramco Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 3,
              name: 'Sabic Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 4,
              name: 'OSHA Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 6,
              name: 'ISO 9001 Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            }
          ],
          driver: {
            id: 1,
            name: 'mohamed Elhadad',
            phoneNumber: '0564558763',
            driverID: '7862314986',
            driverLicenseLink: 'assets/driver-1.jpg'
          }
        },
        {
          id: 6,
          numberPlate: '9999 BKR ',
          label: '9999 HLR - New Car 2023',
          carName: 'New Car 2023',
          category: 'Hydraulic Excavator',
          img: '../../../assets/services-image-3.png',
          license: [
            {
              id: 1,
              name: 'Equipment License',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 2,
              name: 'Aramco Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 3,
              name: 'Sabic Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 4,
              name: 'OSHA Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            },
            {
              id: 6,
              name: 'ISO 9001 Certified',
              number: '211234',
              expirationDate: '2023-01-01',
              type: 'Technical',
              file: 'assets/license-1.pdf'
            }
          ],
          driver: {
            id: 1,
            name: 'mohamed Assem',
            phoneNumber: '0564558763',
            driverID: '7862314986',
            driverLicenseLink: 'assets/driver-1.jpg'
          }
        }
      ] as Vehicle[],
      replacedAssets: '',
      availableProduct: [
        { numberPlate: '9781 HLR - Abarth 20020', label: '9781 HLR - Abarth 20020' },
        { numberPlate: '5565 HLR - Mercedes Benz 2016', label: '5565 HLR - Mercedes Benz 2016' },
        { numberPlate: '5565 HLR - Bentley 2016', label: '5565 HLR - Bentley 2016' },
        { numberPlate: '5565 HLR - Mercedes Benz 2016', label: '5565 HLR - Mercedes Benz 2016' },
        { numberPlate: '5747 HLR - BMW  2019', label: '5747 HLR - BMW  2019' },
        {
          numberPlate: '5781 HLR - Mercedes Actross 2009',
          label: '5781 HLR - Mercedes Actross 2009'
        }
      ],
      editAsset: {} as Vehicle,
      openDetailsModal: false,
      buildingIcon: buildingIcon,
      carIcon: carIcon,
      calenderIcon: calender,
      showUploadLicense: false
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

    openReplaceModal(asset: any) {
      this.openReplaceAssets = !this.openReplaceAssets
      this.editAsset = { ...asset }
    },
    emitClose() {
      this.$emit('close')
    },
    reblaceUnit(unit: any) {
      console.log('Replaced Unit triggered', unit)
    },
    saveReplace() {
      console.log('Before Edit Asset:', this.editAsset)
    },
    openDetialsModal(id: any) {
      this.editAsset = { ...(this.AssignedAssets.find((asset) => asset.id === id) || {}) }
      console.log('After Edit Asset:', this.editAsset)
      this.openDetailsModal = !this.openDetailsModal
    },
    changeDriver(driver: any) {
      console.log('Change Driver triggered', driver)
      driver.driverID = ''
      driver.driverLicenseLink = ''
    },

    // Handle file upload for driverID or driverLicenseLink
    handleFileUpload(event: Event, type: 'driverID' | 'driverLicenseLink') {
      const input = event.target as HTMLInputElement

      if (input.files && input.files.length > 0) {
        const file = input.files[0]

        // Validate file type and size
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg']
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!allowedTypes.includes(file.type)) {
          console.error('Invalid file type. Please upload a PDF or JPG file.')
          return
        }

        if (file.size > maxSize) {
          console.error('File size exceeds the maximum limit of 5MB.')
          return
        }

        // Update the editAsset.driver object with the file name
        this.editAsset.driver = {
          ...this.editAsset.driver, // Spread existing properties
          [type]: file.name // Update the specific property
        }

        console.log(`File uploaded for ${type}:`, file)
        console.log('Updated editAsset:', this.editAsset)
        this.uploadFile(file) // Call the uploadFile method to upload the file
      }
    },
    uploadFile(file: File) {
      console.log('Uploading file:', file)
      //  Upload to a server using fetch or axios
    }
  }
}
</script>
<template>
  <div class="productDetails" v-auto-animate>
    <div class="header goback">
      <div class="text">
        <h6 @click="handleClose">
          <img class="dir" src="../../../../assets/svg-icons/chevron-left.svg" alt="Go Back" />
          {{ $t('Selling.GoBack') }}
        </h6>
        <h1>{{ $t('Selling.Order') }} # {{ orderDetails.order_number }}</h1>
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
                {{ orderDetails.subCategory }}
              </h3>
              <router-link to="#">{{ $t('Selling.GotoProductPage') }} ></router-link>
            </div>
          </template>
        </boxComponent>
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">
                {{ $t('Selling.orderDetails') }}
              </h6>
              <OrderDetailsList :details="inventoryDetails" />
            </div>
          </template>
        </boxComponent>
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">{{ $t('Selling.ProductDetails') }}</h6>
              <OrderDetailsList :details="productDetails" />
            </div>
          </template>
        </boxComponent>
        <!-- RentingTenure -->
        <boxComponent>
          <template v-slot:box_content>
            <div class="order_box">
              <h6 class="box_title">{{ $t('Selling.RentingTenure') }}</h6>
              <OrderDetailsList :details="RentingTenure" />
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
              <div class="bluer_details" v-if="currentStep === 0 && category != 'rentedIn'">
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

    <div class="Assigned_Assets">
      <div class="title">
        <h2>{{ $t('Selling.AssignedAssets') }}</h2>
        <p>{{ $t('Selling.AssignedAssetsText') }}</p>
        <div class="divider"></div>
      </div>
      <div class="row">
        <boxComponent class="col-lg-4 asset_box" v-for="asset in AssignedAssets" :key="asset.id">
          <template v-slot:box_content>
            <div class="top_box">
              <h1 class="numberPlate">{{ asset.numberPlate }}</h1>
              <MainBtn type="wight" @click="openReplaceModal(asset)">{{
                $t('Selling.Replace')
              }}</MainBtn>
            </div>
            <p>{{ asset.category }}</p>
            <div class="action_btns" @click="openDetialsModal(asset.id)">
              {{ $t('Selling.ViewDetails') }} >
            </div>
          </template>
        </boxComponent>
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
        <!-- Summary Table -->
        <div class="summary_table">
          <div class="summary_row Subtotal">
            <div>Subtotal</div>
            <div>SAR171,000.00</div>
          </div>

          <div class="summary_row VAT">
            <div>VAT (15%)</div>
            <div>SAR171,000.00</div>
          </div>

          <div class="summary_row total">
            <div>Subtotal</div>
            <div>SAR171,000.00</div>
          </div>
        </div>
      </div>
    </div>

    <ModalPopup :show="openReplaceAssets" @close="openReplaceModal" class="ReplaceUnit">
      <template v-slot:title>
        <div class="header">
          <h2>{{ $t('Selling.ReplaceUnit') }}</h2>
          <p>{{ $t('Selling.ReplaceUnitText') }}</p>
        </div>
      </template>

      <template v-slot:content>
        <div class="modal_content">
          <inputField
            type="dropdown"
            :label="$t('Selling.ChooseUnit')"
            :placeholder="$t('Selling.ChooseUnit')"
            :options="availableProduct"
            :value="replacedAssets"
            required
          />
          <MainBtn type="green" @click="saveReplace">
            {{ $t('Selling.Replace') }}
          </MainBtn>
        </div>
      </template>
    </ModalPopup>

    <!-- openDetialsModal -->
    <ModalPopup
      :show="openDetailsModal"
      @close="openDetialsModal"
      class="ViewDetailsModal"
      v-auto-animate
    >
      <template v-slot:title>
        <div class="header">
          <div class="text">
            <h2 class="numberPlate">{{ editAsset.numberPlate }}</h2>
            <p>{{ editAsset.category }}</p>
          </div>
          <MainBtn type="wight" @click="openReplaceModal">{{ $t('Selling.Replace') }}</MainBtn>
        </div>
      </template>

      <template v-slot:content>
        <div class="edit_modal_content">
          <div class="divider"></div>
          <div class="edit_row">
            <div class="product_img">
              <img
                src="@/assets/svg-icons//Selling//500a0b8c3d96096416b0b3da3de25f3d.jpeg"
                alt="product_img"
              />
            </div>
            <div class="product_details">
              <boxComponent>
                <template v-slot:box_content>
                  <OrderDetailsList
                    :details="[
                      {
                        label: editAsset.carName,
                        span: $t('Selling.carMaker'),
                        iconUrl: buildingIcon
                      },
                      {
                        label: editAsset.carName,
                        span: $t('Selling.carModel'),
                        iconUrl: carIcon
                      },
                      {
                        label: editAsset.carName,
                        span: $t('Selling.ModelYear'),
                        iconUrl: calenderIcon
                      }
                    ]"
                  />
                </template>
              </boxComponent>

              <boxComponent class="license_box">
                <template v-slot:box_content>
                  <ul v-if="Array.isArray(editAsset.license)" class="license_list">
                    <li v-for="licen in editAsset.license" :key="licen.id">
                      <div class="label">
                        <img src="@/assets/svg-icons/Selling/building-07.svg" alt="" />
                        <h5>{{ licen.name }}</h5>
                      </div>
                      <img
                        src="@/assets//svg-icons//Selling/download-01.svg"
                        alt=""
                        class="download_license"
                      />
                    </li>
                  </ul>
                </template>
              </boxComponent>
            </div>
          </div>
          <div class="driver_data">
            <boxComponent class="license_box">
              <template v-slot:box_content>
                <ul class="license_list">
                  <li>
                    <div class="label">
                      <img src=".././../../../assets//svg-icons//Selling//user-01.svg" alt="user" />
                      <h3>{{ $t('Selling.Driver') }}</h3>
                    </div>
                    <MainBtn @click="changeDriver(editAsset.driver)">
                      {{ $t('Selling.ChangeDriver') }}
                    </MainBtn>
                  </li>

                  <li>
                    <div class="label">
                      <img src=".././../../../assets/svg-icons/Selling/building-07.svg" alt="" />
                      <h5>{{ $t('Selling.DriverID') }}</h5>
                    </div>
                    <Transition name="slide-up">
                      <img
                        v-if="editAsset.driver?.driverID"
                        src=".././../../../assets//svg-icons//Selling/download-01.svg"
                        alt=""
                        class="download_license"
                      />
                      <div class="upload_license" v-else>
                        <label for="">.pdf / .png / .jpg [Max: 5MB]</label>
                        <label for="driver-id-upload" class="custom-file-upload">
                          {{ $t('Selling.Upload') }}
                        </label>
                        <input
                          id="driver-id-upload"
                          type="file"
                          @change="handleFileUpload($event, 'driverID')"
                          accept=".pdf,.jpg,.jpeg"
                        />
                      </div>
                    </Transition>
                  </li>

                  <li v-auto-animate>
                    <div class="label">
                      <img src=".././../../../assets/svg-icons/Selling/building-07.svg" alt="" />
                      <h5>{{ $t('Selling.DriverLicense') }}</h5>
                    </div>
                    <img
                      v-if="editAsset.driver?.driverLicenseLink"
                      src=".././../../../assets//svg-icons//Selling/download-01.svg"
                      alt=""
                      class="download_license"
                    />
                    <div class="upload_license" v-else>
                      <label for="">.pdf / .png / .jpg [Max: 5MB]</label>
                      <label for="driver-license-upload" class="custom-file-upload">
                        {{ $t('Selling.Upload') }}
                      </label>
                      <input
                        id="driver-license-upload"
                        type="file"
                        @change="handleFileUpload($event, 'driverLicenseLink')"
                        accept=".pdf,.jpg,.jpeg"
                      />
                    </div>
                  </li>
                </ul>
              </template>
            </boxComponent>
          </div>
        </div>
      </template>
    </ModalPopup>
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
.goback .text h6 {
  display: flex;
  align-items: center;
  gap: 4px;
}
.header .text h6 {
  font-size: 14px;
  font-weight: 400;
  color: #6d6d6d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
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
.Auto_Accept_Orders {
  display: flex;
  align-items: center;
  gap: 8px;
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
.pickupDetails {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  width: calc(100% / 4);
  display: flex;
  font-size: 16px;
  font-weight: 600;
  color: #3d3d3d;
}
.summary_table .summary_row div:first-child {
  min-width: 43%;
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
/* Summary Table Styling */

.Assigned_Assets {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
.Assigned_Assets .title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.Assigned_Assets .title h1 {
  font-size: 18px;
  font-weight: 600;
  color: #3d3d3d;
}
.Assigned_Assets .title p {
  font-size: 14px;
  font-weight: 400;
  color: #6d6d6d;
}
.Assets_lits {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.numberPlate {
  color: #136a83;
  font-size: 24px;
  font-weight: 700;
}
.asset_box p {
  color: #15b377;
  font-size: 14px;
  font-weight: 500;
}
.asset_box .action_btns {
  color: #136a83;
  font-size: 12px;
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;
}

.top_box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.top_box button {
  color: #4f4f4f;
  font-size: 12px;
  font-weight: 600;
}
.ReplaceUnit .header {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0;
}
.ReplaceUnit {
  z-index: 1001;
}
.modal_content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 30px;
}
.col {
  position: relative;
  width: 100%;
}
@media (min-width: 300px) and (max-width: 782px) {
  .col-lg-4 {
    width: calc(100%);
  }
}
@media (min-width: 782px) and (max-width: 991.99px) {
  .col-lg-4 {
    width: calc(100%);
  }
}

@media (min-width: 992px) and (max-width: 1199.99px) {
  .col-lg-4 {
    width: calc(50% - 15.5px);
  }
}
@media (min-width: 1200px) {
  .Assigned_Assets .row {
    gap: 16px;
  }
  .col-lg-4 {
    width: calc(33.333333% - 20px);
  }
}
.ViewDetailsModal .header {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: none;
}
.edit_row {
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  justify-content: space-between;
  flex-direction: row;
}
.edit_row .product_img {
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 8px;
  width: 60%;
  max-height: 396px;
  border: 2px solid #e7e7e7;
}
.edit_row .product_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
}
.edit_row .product_details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 40%;
}
.license_list {
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
  width: 100%;
}
.license_list li {
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;
  border-bottom: 1px solid var(--Dark-100, #e7e7e7);
}
.license_list li:last-child {
  border: none;
}
.license_box {
  padding: 0;
}
.license_list li .label {
  display: flex;
  align-items: center;
  gap: 12px;
}
.license_list li .label h5 {
  font-size: 14px;
  font-weight: 600;
  color: #3d3d3d;
}
.download_license {
  cursor: pointer;
}
.upload_license {
  display: flex;
  align-items: center;
  gap: 16px;
}
.upload_license label {
  color: #4f4f4f;
  font-size: 12px;
  font-weight: 400;
}
input[type='file'] {
  display: none;
}

.custom-file-upload {
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
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
.ReplaceUnit .modal {
  max-width: unset;
  padding: 30px;
}
.ReplaceUnit .header {
  align-items: flex-start;
}
.ViewDetailsModal .modal {
  gap: 24px;
  max-width: 80%;
  min-width: 60%;
}
</style>
