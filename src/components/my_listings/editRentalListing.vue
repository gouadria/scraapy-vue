<script lang="ts">
import { defineComponent } from 'vue'
import inputField from '@/components/UIElements/inputField.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'
import DropDown from '@/components/UIElements/DropDown.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import type { RentalListing, Fleet, ValidationsStructure } from '@/models/Item'
import type { CategoryGroup, Category } from '@/models/Category'
import deliveryAddress from '@/components/checkout/deliveryAddress.vue'
import progressBar from '@/components/UIElements/progressBar.vue'
import stepTitle from '@/components/my_listings/step_title.vue'
import toggleButton from '@/components/my_listings/appToggle.vue'
import certificateCheckbox from '@/components/my_listings/certificate_checkbox.vue'
import FleetCard from '@/components/my_listings/fleet_card.vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import FleetDocumentUploadCard from './fleet_document_upload_box.vue'
import DeleteModal from '../UIElements/delete_modal.vue'
import { toast } from 'vue3-toastify'
// Icons
import EssentialsIcon from '@/assets/svg-icons/EssentialsIcon.vue'
import certificationIcon from '@/assets/svg-icons/check-verified-02.svg'
import FleetIcon from '@/assets/svg-icons/fleet.svg'
import DeleteIcon from '@/assets/svg-icons/delete_button.svg'
import bankNotIcon from '@/assets/svg-icons/Selling/bank-note-01.svg'
import truckDelivery from '@/assets/svg-icons/listings/rent-out.svg'
import boxComponent from '../UIElements/boxComponent.vue'
import plusIcon from '@/assets/svg-icons/listings/plus.svg'
import layoutaltIcon from '@/assets/svg-icons/listings/layout-alt-03.svg'
interface Certificate {
  id: number
  name: string
  description: string
  isChecked: boolean
}
export default defineComponent({
  components: {
    inputField,
    MainBtn,
    DropDown,
    deliveryAddress,
    progressBar,
    stepTitle,
    toggleButton,
    certificateCheckbox,
    FleetCard,
    ModalPopup,
    boxComponent,
    FleetDocumentUploadCard,
    DeleteModal
  },
  emits: ['save', 'close'],
  props: {
    categoryGroups: {
      type: Array as () => CategoryGroup[],
      required: true
    },
    item: {
      type: Object as () => RentalListing,
      required: true
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      itemData: {} as RentalListing,
      currentFleet: {} as Fleet,
      isEditMode: false,
      tmpImages: [] as File[],
      step: 0,
      categoryGroupSelection: null as CategoryGroup | null,
      selectedCategory: null as Category | null,
      otherCategory: false,
      otherSubCategory: false,
      otherVehicleMake: false,
      otherVehicleModel: false,
      otherModelYear: false,
      AddNewFleetModal: false,
      deleteDocModal: false,
      selectedFleetId: null as string | null,
      editingFleetId: '',
      extraFieldErrors: {} as Record<string, string>,
      selectedMake: null as string | null,
      stepTitles: [
        this.$t('ListingSteps.Essentials'),
        this.$t('ListingSteps.Certifications'),
        this.$t('ListingSteps.Price'),
        this.$t('ListingSteps.Fleet'),
        this.$t('ListingSteps.Details'),
        this.$t('ListingSteps.Complete')
      ],
      EssentialsIcon,
      certificationIcon,
      FleetIcon,
      DeleteIcon,
      layoutaltIcon,
      bankNotIcon,
      truckDelivery,
      Pricechargedper: [
        { label: this.$t('listings.PerDay'), value: 'per_day' },
        { label: this.$t('listings.PerMonth'), value: 'per_month' },
        { label: this.$t('listings.PerYear'), value: 'per_year' }
      ],
      ViewFleetModal: false,
      plusIcon,
      AddNew: {},
      certificates: [],
      originalImages: [] as any[],
      AllCertificates: [] as any[]
    }
  },
  validations() {
    let extraFieldValidations =
      this.selectedCategory?.extra_field_types?.reduce((acc, field) => {
        acc[field.name] = {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        }
        return acc
      }, {}) || {}

    if (this.step === 0) {
      return {
        itemData: {
          categoryGroupSelection: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          subCategorySelection: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          make: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          model: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          model_year: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          extra_fields: extraFieldValidations
        }
      }
    }

    // Step 1 validations
    if (this.step === 1) {
      return {
        itemData: {} // No validations for step 1
      }
    }

    // Step 2 validations
    if (this.step === 2) {
      return {
        itemData: {
          price: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          Pricechargedper: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          DeliveryPrice: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
        }
      }
    }

    // Step 3 validations
    if (this.step === 3) {
      const fleetValidations: any = {
        numberPlate: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        equipmentLicenseExpiry: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        equipmentLicense: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        images: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        }
      }

      // Add validations for each selected certificate
      this.certificates.forEach((cert) => {
        if (cert.isChecked) {
          const expiryField = this.getExpiryField(cert)
          const fileField = this.getFileField(cert)

          fleetValidations[expiryField] = {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
          fleetValidations[fileField] = {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
        }
      })

      // Add driver validations if needed
      if (this.itemData.extra_fields?.['with driver']) {
        const driverValidations = {
          driverIdExpiry: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          driverId: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          driversLicenseExpiry: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          },
          driversLicense: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
        }

        Object.assign(fleetValidations, driverValidations)
      }

      return {
        itemData: {
          fleet: fleetValidations
        }
      }
    }
    // Step 4 validations
    if (this.step === 4) {
      return {
        itemData: {
          name: {
            required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          }
          // description: {
          //   required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
          // }
        }
      }
    }

    // Step 5 validations
    if (this.step === 5) {
      return {
        itemData: {} // No validations for step 5
      }
    }
  },

  computed: {
    imgDropdownOptions() {
      if (!this.itemData.id) {
        return [{ value: 'delete', label: this.$t('listings.delete') }]
      }
      return [
        { value: 'thumbnail', label: this.$t('listings.setThumbnail') },
        { value: 'delete', label: this.$t('listings.delete') }
      ]
    },
    hasUnsavedChanges() {
      return JSON.stringify(this.itemData) !== JSON.stringify(this.item)
    },
    categoryOptions() {
      const options = this.categoryGroups.map((group) => ({
        value: group.id,
        label: this.$i18n.locale === 'ar' ? group.name_ar : group.name
      }))
      options.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })

      return options
    },
    modalOptions() {
      const options = this.categoryGroups.map((group) => ({
        value: group.id,
        label: this.$i18n.locale === 'ar' ? group.name_ar : group.name
      }))
      options.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })

      return options
    },
    yearsOptions() {
      const options = this.selectedCategory.map((group) => ({
        value: group.id,
        label: this.$i18n.locale === 'ar' ? group.name_ar : group.name
      }))
      options.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })

      return options
    },
    withDriver() {
      // get the value of with_driver from selected category
      return this.selectedCategory?.extra_field_types?.name === 'with driver' || false
    },
    subCategoryOptions() {
      if (!this.categoryGroupSelection) {
        return [
          {
            value: 'other',
            label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
          }
        ]
      }
      const options = this.categoryGroupSelection.categories.map((subcategory) => ({
        value: subcategory.id,
        label: this.$i18n.locale === 'ar' ? subcategory.name_ar : subcategory.name
      }))

      options.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })

      return options
    },
    address() {
      if (!this.itemData.address_line1) return null
      return {
        addressLine1: this.itemData.address_line1,
        addressLine2: this.itemData.address_line2,
        city: this.itemData.city,
        province: this.itemData.province,
        zipCode: this.itemData.zip_code,
        country: this.itemData.country,
        contactName: this.itemData.on_site_contact_name,
        contactNumber: this.itemData.on_site_contact_phone,
        latitude: this.itemData.latitude,
        longitude: this.itemData.longitude,
        on_site_contact_phone: this.itemData.on_site_contact,
        on_site_contact_name: this.itemData.on_site_contact_name
      }
    },
    // Vehicle Make Options
    vehicleMakeOptions() {
      // Check if selectedCategory or vehicle_specs is missing or empty
      if (
        !this.selectedCategory ||
        !this.selectedCategory.vehicle_specs ||
        this.selectedCategory.vehicle_specs.length === 0
      ) {
        return [
          {
            value: 'other',
            label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
          }
        ]
      }

      // Create an array of makes from vehicle_specs
      const makes = this.selectedCategory.vehicle_specs.map((vehicle) => vehicle.make)
      // Remove duplicates
      const uniqueMakes = [...new Set(makes)]

      // Map the makes into option objects
      const makeOptions = uniqueMakes.map((make) => ({
        value: make,
        label: make
      }))

      // Always push the 'other' option
      makeOptions.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })

      return makeOptions
    },

    // Vehicle Model Options
    vehicleModelOptions() {
      // Check if no category, vehicle specs, or selected make exists; then return only the "Other" option.
      if (!this.selectedCategory || !this.selectedCategory.vehicle_specs || !this.selectedMake) {
        return [
          {
            value: 'other',
            label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
          }
        ]
      }
      // Filter vehicle specs to match the selected make
      const vehiclesForMake = this.selectedCategory.vehicle_specs.filter(
        (vehicle: any) => vehicle.make === this.selectedMake
      )
      // Extract models from the filtered vehicle specs
      const models = vehiclesForMake.map((vehicle: any) => vehicle.model)
      // Remove duplicates
      const uniqueModels = [...new Set(models)]
      // Map models to the option format
      const modelOptions = uniqueModels.map((model) => ({
        value: model,
        label: model
      }))
      // Append the "Other" option
      modelOptions.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })
      return modelOptions
    },

    // Vehicle Year Options
    vehicleYearOptions() {
      // Check if no category, vehicle specs, or selected make exists; then return only the "Other" option.
      if (!this.selectedCategory || !this.selectedCategory.vehicle_specs || !this.selectedMake) {
        return [
          {
            value: 'other',
            label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
          }
        ]
      }
      // Filter vehicle specs to match the selected make
      const vehiclesForMake = this.selectedCategory.vehicle_specs.filter(
        (vehicle: any) => vehicle.make === this.selectedMake
      )
      // Extract model years from the filtered vehicle specs
      const years = vehiclesForMake.map((vehicle: any) => vehicle.model_year)
      // Remove duplicates
      const uniqueYears = [...new Set(years)]
      // Map years to the option format
      const yearOptions = uniqueYears.map((year) => ({
        value: year,
        label: year
      }))
      // Append the "Other" option
      yearOptions.push({
        value: 'other',
        label: this.$i18n.locale === 'ar' ? 'أخرى' : 'Other'
      })
      return yearOptions
    },

    selectedCertificates(): Certificate[] {
      return this.certificates.filter((certificate) => {
        console.log('Certificate:', {
          name: certificate.name,
          isChecked: certificate.isChecked
        })

        return (
          certificate.isChecked &&
          certificate.name !== 'driverId' &&
          certificate.name !== 'driversLicense'
        )
      })
    }
  },

  watch: {
    item: {
      handler(newItem) {
        this.initializeData(newItem)
      },
      deep: true
    }
  },
  methods: {
    initializeData(item: RentalListing = this.item) {
      this.itemData = {
        ...this.getDefaultItemData(),
        ...JSON.parse(JSON.stringify(item)),
        extra_fields: item.extra_fields
          ? Object.fromEntries(item.extra_fields.map((field) => [field.name, field.value]))
          : {},
        fleet: {
          ...this.getDefaultFleet(),
          ...(item.fleet || {})
        }
      }
      this.categoryGroupSelection =
        this.categoryGroups.find((g) => g.id === item.category?.category_group.id) || null
      this.selectedCategory = item.category || null
      this.isEditMode = !!item.id

      this.itemData.categoryGroupSelection = this.categoryGroupSelection?.id || ''
      this.itemData.subCategorySelection = this.selectedCategory?.id || ''
    },
    getDefaultItemData(): RentalListing {
      return {
        name: '',
        images: [],
        price: '',
        price_unit: 'SAR/day',
        price_after_discount: 0,
        category: {} as Category,
        discount: '0.00',
        mds_document: null,
        category_type: 'rental',
        extra_fields: [],
        sub_items: [],
        owner_name: '',
        owner_image: '',
        status: 'pending',
        description: '',
        longitude: '',
        latitude: '',
        address_line1: '',
        address_line2: '',
        city: '',
        province: '',
        zip_code: '',
        country: '',
        on_site_pickup: false,
        quantity: null,
        minimum_selling_quantity: 0,
        on_site_contact_phone: '',
        on_site_contact_name: null,
        aramcoApproved: false,
        sabicApproved: false,
        maadenApproved: false,
        scecoApproved: false,
        mwanApproved: false,
        isoApproved: false,
        oshaApproved: false,
        fleet: this.getDefaultFleet()
      }
    },
    getDefaultFleet(): Fleet {
      return {
        numberPlate: '',
        with_driver: false,
        equipmentLicenseExpiry: null,
        equipmentLicense: null,
        images: []
      }
    },
    handleAddressUpdate(address: any) {
      this.itemData.address_line1 = address.addressLine1
      this.itemData.address_line2 = address.addressLine2
      this.itemData.city = address.city
      this.itemData.province = address.province
      this.itemData.zip_code = address.zipCode
      this.itemData.country = address.country
      this.itemData.on_site_contact_name = address.contactName
      this.itemData.on_site_contact_phone = address.contactNumber
      this.itemData.latitude = address.latitude
      ;(this.itemData.longitude = address.longitude),
        (this.itemData.on_site_contact = address.on_site_contact_phone)
      this.itemData.on_site_contact_name = address.on_site_contact_name
    },
    addNewFleet() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
        return
      }
      if (!this.itemData.sub_items) {
        this.itemData.sub_items = []
      }
      const tmpId = `tmp_${Date.now()}`
      const newFleet = {
        ...this.itemData.fleet,
        id: tmpId,
        value: tmpId,
        temp_value: tmpId,
        images: this.tmpImages.map((file, index) => ({
          id: index,
          image: file,
          is_thumbnail: index === 0
        }))
      }
      this.itemData.sub_items.push(newFleet)
      this.AddNewFleetModal = false
    },

    resetAddFleet() {
      this.itemData.fleet = {
        id: '',
        numberPlate: '',
        equipmentLicenseExpiry: null,
        equipmentLicense: null,
        driversLicenseExpiry: null,
        driversLicense: null,
        driverIdExpiry: null,
        driverId: null,
        AramcoCertificateExpiry: null,
        AramcoCertificate: null,
        MaadenCertificateExpiry: null,
        MaadenCertificate: null,
        SCECOCertificateExpiry: null,
        SCECOCertificate: null,
        ISOCertificateExpiry: null,
        ISOCertificate: null,
        SabicCertificateExpiry: null,
        SabicCertificate: null,
        MwanCertificateExpiry: null,
        MwanCertificate: null,
        OSHACertificateExpiry: null,
        OSHACertificate: null,
        images: []
      }
      this.tmpImages = []
      this.v$.$reset()
    },
    nextStep() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
        console.log(this.v$.$errors)
        console.log('item data', this.itemData)
        return
      }
      console.log('item data', this.itemData)
      console.log(' validations error: ' + this.v$.$errors)
      if (this.step < 5) this.step++
    },
    backStep() {
      if (this.step != 0) {
        this.step--
      }
    },
    handleCategoryChange(val: string) {
      if (val === 'other') {
        // User selected "Other" for category
        this.otherCategory = true
        this.otherSubCategory = false
        this.categoryGroupSelection = null
        this.selectedCategory = null
        this.itemData.category = ''
      } else {
        // User selected a category from the dropdown
        this.otherCategory = false
        this.otherSubCategory = false
        const group = this.categoryGroups.find((g) => g.id === val) || null
        this.categoryGroupSelection = group
        console.log(this.categoryGroupSelection)
        this.selectedCategory = group?.categories[0] || null
        this.itemData.categoryGroupSelection = val
        this.itemData.categoryGroup = val
        this.itemData.category = ''
        this.itemData.sub_category = ''
        // Reset any validation errors
        if (this.v$) {
          this.v$.$reset()
        }
      }
    },
    handleSubCategoryChange(val: string) {
      if (val === 'other') {
        // User selected "Other" for subcategory
        this.otherSubCategory = true
        this.selectedCategory = null
        this.itemData.subCategorySelection = null
        // this.itemData.sub_category = ''
      } else {
        // User selected a subcategory from the dropdown
        this.otherSubCategory = false
        if (this.categoryGroupSelection) {
          this.selectedCategory =
            this.categoryGroupSelection.categories.find((subcategory) => subcategory.id === val) ||
            null
        }
        console.log(this.selectedCategory)
        this.itemData.subCategorySelection = val
        this.itemData.category = val
        // this.itemData.sub_category = ''
      }
    },
    setExtraField(name: string, value: string) {
      if (!this.itemData.extra_fields) {
        this.itemData.extra_fields = {}
      }
      if (value === '') {
        delete this.itemData.extra_fields[name]
      } else {
        this.itemData.extra_fields[name] = value
      }
      // Trigger validation
      this.$nextTick(() => {
        this.v$.itemData.extra_fields[name]?.$touch()
      })
    },
    handleotherVehicleMake(val: string) {
      console.log('Vehicle Make selected:', val)
      if (val === 'other') {
        this.otherVehicleMake = true
        this.selectedMake = '' // Reset selectedMake for 'other' case
      } else {
        this.otherVehicleMake = false
        this.itemData.make = val
        this.selectedMake = val // Update selectedMake to the chosen make
      }
    },
    handleotherVehicleModel(val: string) {
      if (val === 'other') {
        this.otherVehicleModel = true
      } else {
        this.otherVehicleModel = false
        this.itemData.model = val
      }
    },
    handleotherModelYear(val: string) {
      if (val === 'other') {
        this.otherModelYear = true
      } else {
        this.otherModelYear = false
        this.itemData.model_year = val
      }
    },

    async uploadImage(id?: number) {
      // upload image to server
      const files = this.tmpImages
      this.tmpImages = []
      if (!files.length) {
        return
      }
      if (files.length > 10) {
        files.splice(10)
      }
      const item_id = id || this.item.id
      for (const file of files) {
        const formData = new FormData()
        formData.append('images', file)
        await this.$axios
          .post('/api/inventory/user/items/' + item_id + '/images/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            this.itemData.fleet.images = res.data.images
            this.$emit('save', res.data)
          })
          .catch((err) => {
            console.error(err)
            console.error('Failed to upload image')
          })
      }
      return
    },

    openFilePicker() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'png, jpg, jpeg'
      input.multiple = true
      input.onchange = (e) => {
        this.tmpImages = this.tmpImages.concat(
          Array.from((e.target as HTMLInputElement).files || [])
        )
        if (!this.itemData.id) {
          this.itemData.fleet.images = this.tmpImages.map((file) => ({
            id: this.tmpImages.indexOf(file),
            image: URL.createObjectURL(file)
          }))
        } else {
          this.uploadImage()
        }
      }
      input.click()
    },

    handleImageOption(imageID: number, option: string) {
      if (option === 'thumbnail') {
        this.setThumbnail(imageID)
      } else if (option === 'delete') {
        this.deleteImage(imageID)
      }
    },

    async setThumbnail(imageID: number) {
      // set thumbnail image for new item
      if (!this.itemData.id) {
        this.itemData.fleet.images.forEach((image) => {
          image.is_thumbnail = image.id === imageID
        })
        return
      }
      // set thumbnail image for existing item
      await this.$axios
        .patch('/api/inventory/user/items/' + this.item.id + '/images/' + imageID + '/', {
          is_thumbnail: true
        })
        .then((res) => {
          this.itemData.fleet.images.forEach((image) => {
            image.is_thumbnail = image.id === imageID
          })
        })
        .catch(() => {
          console.error('Failed to set thumbnail')
        })
    },

    async deleteImage(imageID: number) {
      // delete image for new item
      if (!this.itemData.id) {
        this.tmpImages = this.tmpImages.filter((file, index) => index !== imageID)
        this.itemData.fleet.images = this.tmpImages.map((file, index) => ({
          id: index,
          image: URL.createObjectURL(file)
        }))
        if (this.itemData.fleet.images.length === 0) {
          delete this.itemData.fleet.images
        }
        return
      }
      // delete image for existing item
      await this.$axios
        .delete('/api/inventory/user/items/' + this.item.id + '/images/' + imageID + '/')
        .then(() => {
          this.itemData.fleet.images = this.itemData.fleet.images.filter(
            (image) => image.id !== imageID
          )
        })
        .catch(() => {
          console.error('Failed to delete image')
        })
    },
    getChangedData(payload: RentalListing) {
      const changed = {}
      for (const key in payload) {
        if (JSON.stringify(payload[key]) !== JSON.stringify(this.item[key])) {
          changed[key] = payload[key]
        }
      }
      return changed
    },

    // get the certificate's from the backend
    async fetchCertificates() {
      try {
        const response = await this.$axios.get('/api/inventory/certificates/')
        // Filter out the certificate with type === 'equipmentLicense'
        this.certificates = response.data.message.filter(
          (cert: any) =>
            cert.name !== 'equipmentLicense' &&
            cert.name !== 'driversLicense' &&
            cert.name !== 'driverId'
        )
        this.AllCertificates = response.data.message
        console.log('certificates:', this.certificates)
      } catch (error) {
        console.error('Failed to fetch certificates:', error)
      }
    },

    updateCertificateSelection(certificate: Certificate, value: boolean) {
      certificate.isChecked = value
      console.log('Selected certificates:', this.selectedCertificates)
    },
    getExpiryField(cert: Certificate) {
      return `Expiry_${cert.name}`
    },
    getFileField(cert: Certificate) {
      console.log('File field:', this.itemData.fleet)
      return `${cert.name}`
    },
    async createListing(payload: RentalListing) {
      const response = await this.$axios.post('/api/inventory/user/items/', [payload])

      // ✨ اربط الـ temp_value بالـ id الحقيقي
      const savedSubItems = response.data.data[0].sub_items

      this.itemData.sub_items.forEach((localSubItem) => {
        const matched = savedSubItems.find(
          (saved: any) => saved.temp_value === localSubItem.temp_value
        )
        console.log(matched)
        if (matched) {
          localSubItem.id = matched.id
          localSubItem.value = matched.id
        }
      })

      // ✅ ارفع الملفات إن وجدت
      if (this.itemData.sub_items && this.itemData.sub_items.length > 0) {
        console.log('Uploading sub-items ', this.itemData.sub_items)
        await this.uploadSubItems(this.itemData.sub_items)
      }

      this.$emit('save', this.itemData)
      // this.step++
      console.log('step finished', this.step)
    },

    // async uploadSubItems(subItems: any[]) {
    //   console.log('Uploading sub-items ', subItems)
    //   try {
    //     const formData = new FormData()

    //     // Add base subitem data (e.g. subitem IDs)
    //     const subItemsData = subItems.map((subItem) => ({
    //       subitem_id: subItem.id || subItem.value
    //     }))
    //     formData.append('subitems', JSON.stringify(subItemsData))

    //     for (const subItem of subItems) {
    //       const subitemId = subItem.id || subItem.value

    //       // 1️⃣ Upload images
    //       for (const [index, image] of subItem.images.entries()) {
    //         const response = await fetch(image.image)
    //         const blob = await response.blob()
    //         const extension = blob.type.split('/')[1] || 'bin'
    //         const newFilename = `${subitemId}_images_${index}.${extension}`
    //         const file = new File([blob], newFilename, { type: blob.type })

    //         formData.append(`${subitemId}_images`, file)
    //       }
    //       // Keys to skip from being appended
    //       const excludedKeys = new Set([
    //         'id',
    //         'value',
    //         'numberPlate',
    //         'with_driver',
    //         'model',
    //         'model_year',
    //         'make',
    //         'temp_value'
    //       ])

    //       // 2️⃣ Dynamically handle all other fields
    //       for (const [key, value] of Object.entries(subItem)) {
    //         // Skip `images` array
    //         if (key === 'images' || excludedKeys.has(key)) continue

    //         const fieldKey = `certificate_type_${subitemId}_${key}`

    //         // If it's a File, rename and append
    //         if (value instanceof File) {
    //           const extension = value.name.split('.').pop() || 'bin'
    //           const renamedFile = new File([value], `${fieldKey}.${extension}`, {
    //             type: value.type
    //           })
    //           formData.append(fieldKey, renamedFile)
    //         }
    //         // If it's a primitive (string, number, boolean, date), append directly
    //         else if (
    //           typeof value === 'string' ||
    //           typeof value === 'number' ||
    //           typeof value === 'boolean'
    //         ) {
    //           formData.append(fieldKey, value.toString())
    //         }
    //         // If it's an object (e.g., `{}`), JSON stringify
    //         else if (typeof value === 'object' && value !== null) {
    //           formData.append(fieldKey, JSON.stringify(value))
    //         }
    //       }
    //     }

    //     // Debug
    //     for (const [key, val] of formData.entries()) {
    //       console.log(`${key}:`, val)
    //     }

    //     // Send to API
    //     const response = await this.$axios.post('/api/inventory/user/items/item-files/', formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' }
    //     })

    //     console.log('✅ Sub-items uploaded successfully:', response.data)
    //   } catch (error) {
    //     console.error('❌ Failed to upload sub-items:', error)
    //   }
    // },

    async uploadSubItems(savedSubItemsValues: any[]) {
      try {
        const subItemsToUpload = this.itemData.sub_items.filter(
          (subItem) => !savedSubItemsValues.includes(subItem.value)
        )

        const formData = new FormData()
        const subItemsData = subItemsToUpload.map((subItem) => ({
          subitem_id: subItem.id || subItem.value
        }))
        formData.append('subitems', JSON.stringify(subItemsData))

        for (const subItem of subItemsToUpload) {
          for (const [fieldName, fieldValue] of Object.entries(subItem)) {
            if (['value', 'id', 'make', 'model', 'model_year', 'numberPlate'].includes(fieldName))
              continue

            // رفع الصور العادية
            if (fieldName === 'images') {
              for (const [index, image] of (fieldValue as any[]).entries()) {
                let file = image.image

                if (typeof file === 'string' && file.startsWith('blob:')) {
                  const response = await fetch(file)
                  const blob = await response.blob()
                  file = new File([blob], `image_${index}`, { type: blob.type })
                }

                if (file instanceof File) {
                  const newFileName = `image_${subItem.id}_${index + 1}`
                  formData.append(newFileName, file, newFileName)
                }
              }
            } else {
              let file = fieldValue

              if (typeof file === 'object' && file?.file instanceof File) {
                file = file.file
              }

              if (typeof file === 'string' && file.startsWith('blob:')) {
                const response = await fetch(file)
                const blob = await response.blob()
                file = new File([blob], `file_${fieldName}`, { type: blob.type })
              }

              if (file instanceof File) {
                const newFileName = `files_${subItem.id}_${fieldName}`
                formData.append(newFileName, file)

                const expiry = subItem[`Expiry_${fieldName}`] || null
                console.log(`Expiry_${fieldName}:`, expiry)
                // const certificateTypeMapping: Record<string, number> = {
                //   AramcoCertificate: 1,
                //   MaadenCertificate: 2,
                //   SCECOCertificate: 3,
                //   ISOCertificate: 4,
                //   SABICCertification: 5,
                //   MwanCertificate: 6,
                //   OSHACertificate: 7,
                //   equipmentLicense: 8,
                //   driverId: 9,
                //   driversLicense: 10
                // }
                const certificateTypeMapping: Record<string, number> = {
                  ...Object.fromEntries(
                    this.AllCertificates.map((cert: { id: number; name: string }) => [
                      cert.name,
                      cert.id
                    ])
                  )
                }
                console.log('Certificate Type Mapping:', certificateTypeMapping)
                const certificateTypeId = certificateTypeMapping[fieldName] || null
                console.log(`Certificate Type ID for ${fieldName}:`, certificateTypeId)
                if (expiry) {
                  console.log(`Expiry for ${fieldName}:`, expiry)
                  formData.append(`expiry_date_files_${subItem.id}_${fieldName}`, expiry)
                }

                if (certificateTypeId) {
                  console.log(`certificate_type_${subItem.id}_${fieldName}`, certificateTypeId)
                  formData.append(`certificate_type_${subItem.id}_${fieldName}`, certificateTypeId)
                }
              }
            }
          }
        }

        // Add metadata
        formData.append(
          'data',
          JSON.stringify({
            sub_items: subItemsToUpload.map((subItem) => ({
              value: subItem.value,
              numberPlate: subItem.numberPlate,
              ...Object.fromEntries(
                Object.entries(subItem).filter(
                  ([key]) =>
                    !['images', 'equipmentLicense', 'AramcoCertificate', 'ISOCertificate'].includes(
                      key
                    ) && typeof subItem[key] !== 'object'
                )
              )
            }))
          })
        )

        // this.logFormData(formData)

        await this.$axios.post(`/api/inventory/user/items/item-files/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.step = 5
      } catch (error) {
        console.error('Upload failed:', error)
      }
    },
    async updateListing(payload: RentalListing) {
      const changedData = this.getChangedData(payload)
      const response = await this.$axios.patch(
        `/api/inventory/user/items/${this.item.id}/`,
        changedData
      )
      this.itemData = response.data
      if (this.tmpImages.length) {
        await this.uploadImage()
      }
      toast.success(this.$t('listings.saveSuccess'), {
        position: this.$i18n.locale === 'ar' ? 'top-right' : 'top-left',
        autoClose: 2000
      })
    },
    resetFleetForm() {
      return {
        id: '',
        make: '',
        model: '',
        model_year: '',
        numberPlate: '',
        with_driver: false,
        equipmentLicenseExpiry: null,
        equipmentLicense: null,
        images: []
      }
    },

    openFleetModal() {
      if (!this.isEditMode) {
        this.itemData.fleet = this.resetFleetForm()
        console.log('Reset fleet:', this.itemData.fleet)
      }
      this.AddNewFleetModal = true
      this.v$.$reset()
    },
    closeModal() {
      this.AddNewFleetModal = !this.AddNewFleetModal
      this.resetAddFleet()
    },
    openDeleteFleet(fleetId: any) {
      if (fleetId) {
        this.selectedFleetId = fleetId
      }
      this.deleteDocModal = !this.deleteDocModal
    },
    closeFleetModal() {
      this.AddNewFleetModal = false
      this.isEditMode = false
      this.editingFleetId = ''
      this.resetAddFleet()
    },
    deleteFleet() {
      if (this.selectedFleetId) {
        const fleetIndex = this.itemData.sub_items.findIndex(
          (fleet) => fleet.id === this.selectedFleetId
        )
        if (fleetIndex !== -1) {
          this.itemData.sub_items.splice(fleetIndex, 1)
          this.selectedFleetId = null
          this.deleteDocModal = false
        } else {
          console.warn('Fleet not found with the selected ID:', this.selectedFleetId)
        }
      } else {
        console.warn('No fleet selected for deletion.')
      }
    },
    EditFleet(fleetId: string) {
      this.isEditMode = true
      this.editingFleetId = fleetId
      const fleetToEdit = this.itemData.sub_items.find((fleet) => fleet.id === fleetId)
      if (fleetToEdit) {
        // Use the fleet object directly so edits update it immediately
        this.itemData.fleet = fleetToEdit
        this.openFleetModal()
      }
    },
    saveEditedFleet() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
        return
      }
      // No need to replace the item in the array as it was modified directly
      this.AddNewFleetModal = false
    },

    preparePayload() {
      const payload = { ...this.itemData }
      delete payload.price_after_discount
      delete payload.owner_name
      delete payload.owner_image
      payload.extra_fields = Object.entries(payload.extra_fields || {}).map(([key, value]) => ({
        name: key,
        // value: value === true ? 'true' : 'false'
        value: value !== null && value !== undefined ? String(value) : ''
      }))

      // Format sub_items
      payload.sub_items = payload.sub_items.map((fleet) => ({
        value: fleet.id || fleet.numberPlate || Date.now().toString(),
        ...fleet
      }))
      console.log('this is payload', payload)
      return payload
    },

    debounce(func: Function, wait: number) {
      let timeout: NodeJS.Timeout
      return function (this: any, ...args: any[]) {
        const later = () => {
          clearTimeout(timeout)
          func.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },
    async handleSave() {
      try {
        this.v$.$touch()

        if (this.v$.$invalid) {
          toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
            position: this.$i18n.locale === 'ar' ? 'top-right' : 'top-left',
            autoClose: 3000
          })
          return
        }

        if (!this.hasUnsavedChanges) {
          toast.info(this.$t('errorsMsgs.noChanges'), {
            position: this.$i18n.locale === 'ar' ? 'top-right' : 'top-left',
            autoClose: 2000
          })
          return
        }

        const payload = this.preparePayload()

        if (this.itemData.id) {
          console.log('this is edit payload', payload)
          await this.updateListing(payload)
        } else {
          console.log('Add New payload', payload)
          await this.createListing(payload)
        }
        // this.step = 5
        this.$emit('save', this.itemData)
        // this.step = 5
      } catch (error) {
        console.log(error)
        toast.error(this.$t('errorsMsgs.requestError'), {
          position: this.$i18n.locale === 'ar' ? 'top-right' : 'top-left',
          autoClose: 3000
        })
      }
    }
  },
  created() {
    this.initializeData(), this.fetchCertificates()
  }
})
</script>
<template>
  <div class="edit_rental_listing" v-auto-animate>
    <div class="header">
      <div class="header_text">
        <div class="back" @click="$emit('close')">
          <img src="@/assets/svg-icons/chevron-left.svg?url" alt="chevron" />
          {{ $t('listings.back') }}
        </div>
        <div class="title">
          {{ itemData.id ? $t('listings.editListing') : $t('listings.addListing') }}
        </div>
      </div>
      <progressBar :currentStep="step" :steps="stepTitles" />
    </div>

    <section class="Essentials step_section" v-if="step === 0">
      <stepTitle
        :title="$t('ListingSteps.Essentials')"
        :subTitle="$t('ListingSteps.EssentialsText')"
        :icon="EssentialsIcon"
      />
      <div class="input-item">
        <deliveryAddress
          :addressName="false"
          :address="address"
          :required="true"
          @update="handleAddressUpdate"
          v-auto-animate
        />
      </div>
      <div class="input-group">
        <inputField
          type="dropdown"
          :label="$t('listings.category')"
          :placeholder="$t('listings.selectCategory')"
          :options="categoryOptions"
          :value="categoryGroupSelection?.id || (otherCategory ? 'other' : '')"
          @update="handleCategoryChange"
          :error="v$.itemData.categoryGroupSelection?.$errors[0]?.$message"
          required
        />
      </div>
      <div class="input-group" v-if="!otherCategory">
        <inputField
          type="dropdown"
          :label="$t('listings.subCategory')"
          :placeholder="$t('listings.selectSubcategory')"
          :options="subCategoryOptions"
          :value="selectedCategory?.id || (otherSubCategory ? 'other' : '')"
          @update="handleSubCategoryChange"
          :error="v$.itemData.subCategorySelection?.$errors[0]?.$message"
          required
        />
      </div>
      <div v-if="otherCategory || otherSubCategory" class="input-group box other">
        <span>{{ $t('listings.addNewCategory') }}</span>
        <inputField
          v-if="!otherSubCategory"
          :label="$t('listings.category')"
          type="text"
          :value="itemData.categoryGroupSelection"
          :placeholder="$t('listings.enterCategory')"
          :error="v$.itemData.categoryGroupSelection?.$errors[0]?.$message"
          required
          class="full-width"
          @update="itemData.categoryGroupSelection = $event"
        />
        <inputField
          :label="$t('listings.subCategory')"
          type="text"
          :value="itemData.subCategorySelection"
          :placeholder="$t('listings.enterSubCategory')"
          :error="v$.itemData.subCategorySelection?.$errors[0]?.$message"
          required
          class="full-width"
          @update="itemData.subCategorySelection = $event"
        />
      </div>

      <div class="input-group">
        <inputField
          type="dropdown"
          :label="$t('listings.VehicleMake')"
          :placeholder="$t('listings.VehicleMake')"
          :options="vehicleMakeOptions"
          :value="itemData.make"
          :error="v$.itemData?.make?.$errors[0]?.$message"
          @update="handleotherVehicleMake"
          required
        />
      </div>

      <div v-if="otherVehicleMake" class="input-group box other">
        <span>{{ $t('listings.VehicleMake') }}</span>
        <inputField
          type="text"
          :value="itemData.make"
          :placeholder="$t('listings.VehicleMake')"
          :error="v$.itemData?.make?.$errors[0]?.$message"
          @update="itemData.make = $event"
          required
          class="full-width"
        />
      </div>

      <div class="input-group">
        <inputField
          type="dropdown"
          :label="$t('listings.VehicleModel')"
          :placeholder="$t('listings.VehicleModel')"
          :options="vehicleModelOptions"
          :value="itemData.model"
          :error="v$.itemData?.model?.$errors[0]?.$message"
          @update="handleotherVehicleModel"
          required
        />
        <!-- model_year -->
      </div>
      <div v-if="otherVehicleModel" class="input-group box other">
        <span>{{ $t('listings.VehicleModel') }}</span>
        <inputField
          type="text"
          :value="itemData.model"
          :placeholder="$t('listings.VehicleModel')"
          :error="v$.itemData.model?.$errors[0]?.$message"
          @update="itemData.model = $event"
          required
          class="full-width"
        />
      </div>
      <div class="input-group">
        <inputField
          type="dropdown"
          :label="$t('listings.ModelYear')"
          :placeholder="$t('listings.ModelYear')"
          :options="vehicleYearOptions"
          :value="itemData.model_year"
          :error="v$.itemData.model_year?.$errors[0]?.$message"
          @update="handleotherModelYear"
          required
        />
      </div>
      <div v-if="otherModelYear" class="input-group box other">
        <span>{{ $t('listings.ModelYear') }}</span>
        <inputField
          type="text"
          :value="itemData.model_year"
          :placeholder="$t('listings.ModelYear')"
          :error="v$.itemData?.model_year?.$errors[0]?.$message"
          @update="itemData.model_year = $event"
          required
          class="full-width"
        />
      </div>
      <div class="addExtra_items">
        <div
          class="input-group input_tow_group"
          v-for="field in selectedCategory?.extra_field_types"
          :key="field.name"
        >
          <!-- Regular Extra Fields -->
          <inputField
            v-if="field.name !== 'with driver'"
            :label="field.name === 'MDS' ? $t('listings.MDSSubtitle') : field.name"
            :value="itemData.extra_fields[field.name] || ''"
            :class="{ mds_field: field.name === 'MDS' }"
            :labelImage="field.name === 'MDS' ? MDSIcon : ''"
            :type="field.name === 'MDS' ? 'file' : 'text'"
            :placeholder="$t('listings.enterValue')"
            :error="v$.itemData.extra_fields[field.name]?.$errors[0]?.$message"
            required
            @update="setExtraField(field.name, $event)"
          />
          <!-- 'With Driver' Toggle -->
          <div class="input-group" v-if="field.name === 'with driver'">
            <toggleButton
              label="With driver*"
              optionOne="Yes"
              optionTwo="No"
              v-model="itemData.extra_fields[field.name]"
            />
            <span class="validation_errors" v-if="v$.itemData.extra_fields[field.name]?.$error">
              {{ v$.itemData.extra_fields[field.name]?.$errors[0]?.$message }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="Certifications step_section" v-if="step === 1">
      <stepTitle
        :title="$t('ListingSteps.Certifications')"
        :subTitle="$t('ListingSteps.CertificationsText')"
        :icon="certificationIcon"
        :bar__fill="false"
      />

      <certificateCheckbox
        v-for="certificate in certificates"
        :key="certificate.id"
        :isChecked="certificate.isChecked"
        :title="certificate.name"
        :subTitle="certificate.description"
        @update:isChecked="(value) => updateCertificateSelection(certificate, value)"
      />
    </section>

    <section class="Price step_section" v-if="step === 2">
      <stepTitle
        :title="$t('ListingSteps.Price')"
        :subTitle="$t('ListingSteps.PriceText')"
        :icon="bankNotIcon"
      />
      <div class="price_item">
        <inputField
          :label="$t('listings.PriceperUnit')"
          :value="itemData.price"
          type="number"
          :placeholder="$t('listings.PriceperUnit')"
          :error="v$.itemData.price?.$errors[0]?.$message"
          required
          @update="itemData.price = $event"
        />
        <inputField
          :label="$t('listings.Pricechargedper')"
          type="dropdown"
          :placeholder="$t('listings.Pricechargedper')"
          :error="v$.itemData.Pricechargedper?.$errors[0]?.$message"
          :options="Pricechargedper"
          :value="itemData.Pricechargedper"
          @update="itemData.Pricechargedper = $event"
          required
        />
      </div>
      <div class="price_item_group">
        <stepTitle
          :title="$t('listings.Delivery')"
          :subTitle="$t('listings.DeliveryMSG')"
          :icon="truckDelivery"
        />
        <inputField
          :label="$t('Selling.SAR')"
          :value="itemData.DeliveryPrice"
          type="number"
          :placeholder="$t('Selling.SAR')"
          :error="v$.itemData.DeliveryPrice?.$errors[0]?.$message"
          required
          @update="itemData.DeliveryPrice = $event"
        />
      </div>
    </section>
    <section class="Fleet step_section" v-if="step === 3">
      <stepTitle
        :title="$t('ListingSteps.Fleet')"
        :subTitle="$t('ListingSteps.FleetText')"
        :icon="FleetIcon"
        :bar__fill="false"
      />

      <div class="fleet_container">
        <div class="row">
          <FleetCard
            class="col-12 col-md-6 col-lg-4"
            v-for="item in itemData.sub_items"
            :key="item.id"
            :vehicleNumber="item.numberPlate"
            :vehicleName="item.model"
            :icon="DeleteIcon"
            :removeFleetCard="() => openDeleteFleet(item.id)"
            :editFleet="() => EditFleet(item.id)"
          />
          <boxComponent class="add_new_fleet col-12 col-md-6 col-lg-4" @click="openFleetModal">
            <template v-slot:box_content>
              <div class="icon_circel">
                <img src="@/assets/svg-icons/listings/plus.svg?url" alt="plus" />
              </div>
              <div class="h4">{{ $t('listings.ADDUNIT') }}</div>
            </template>
          </boxComponent>
        </div>
      </div>
      <ModalPopup
        :show="AddNewFleetModal"
        @close="closeFleetModal"
        v-auto-animate
        class="modal_new_fleet"
      >
        <template v-slot:title>
          <div class="header">
            <h2>{{ $t('listings.Addunittofleet') }}</h2>
            <p>{{ $t('listings.AddunittofleetText') }}</p>
          </div>
        </template>

        <template v-slot:content>
          <div class="price_item">
            <inputField
              :label="$t('listings.Make')"
              :value="itemData.make"
              type="text"
              :placeholder="$t('listings.Make')"
              required
              @update="itemData.make = $event"
              :error="v$.itemData?.make?.$errors[0]?.$message"
              disabled
            />
            <inputField
              :label="$t('listings.Model')"
              :value="itemData?.model"
              type="text"
              :placeholder="$t('listings.Model')"
              :error="v$.itemData?.fleet?.model?.$errors[0]?.$message"
              required
              @update="itemData.model = $event"
              disabled
            />
          </div>
          <div class="price_item">
            <inputField
              :label="$t('listings.ModelYear')"
              :value="itemData?.model_year"
              type="text"
              :placeholder="$t('listings.ModelYear')"
              :error="v$.itemData?.model_year?.$errors[0]?.$message"
              required
              @update="itemData.model_year = $event"
              disabled
            />
            <inputField
              :label="$t('listings.PlateNumber')"
              :value="itemData.fleet?.numberPlate"
              type="text"
              :placeholder="$t('listings.PlateNumber')"
              :error="v$.itemData?.fleet?.numberPlate?.$errors[0]?.$message"
              required
              @update="itemData.fleet.numberPlate = $event"
            />
          </div>
          <div class="row">
            <!-- Always show Equipment License -->
            <FleetDocumentUploadCard
              :title="$t('listings.EquipmentLicense')"
              @update:expiryDate="itemData.fleet.equipmentLicenseExpiry = $event"
              @update:file="itemData.fleet.equipmentLicense = $event"
              class="col-6"
              :expiryError="v$.itemData?.fleet?.equipmentLicenseExpiry?.$errors[0]?.$message"
              :expiryMSG="v$.itemData?.fleet?.equipmentLicenseExpiry?.$errors[0]?.$message"
              :fileError="v$.itemData?.fleet?.equipmentLicense?.$errors[0]?.$message"
              :fileMSG="v$.itemData?.fleet?.equipmentLicense?.$errors[0]?.$message"
              :file="itemData.fleet.equipmentLicense"
              :expiryDate="itemData.fleet.equipmentLicenseExpiry"
            />

            <!-- Dynamic Certificates -->
            <FleetDocumentUploadCard
              v-for="cert in certificates.filter((c) => c.isChecked)"
              :key="cert.id"
              :title="$t(`listings.${cert.name}`)"
              @update:expiryDate="itemData.fleet[getExpiryField(cert)] = $event"
              @update:file="itemData.fleet[getFileField(cert)] = $event"
              class="col-6"
              :expiryError="v$.itemData?.fleet?.[getExpiryField(cert)]?.$errors[0]?.$message"
              :expiryMSG="v$.itemData?.fleet?.[getExpiryField(cert)]?.$errors[0]?.$message"
              :fileError="v$.itemData?.fleet?.[getFileField(cert)]?.$errors[0]?.$message"
              :fileMSG="v$.itemData?.fleet?.[getFileField(cert)]?.$errors[0]?.$message"
              :file="itemData.fleet[getFileField(cert)]"
              :expiryDate="itemData.fleet[getExpiryField(cert)]"
            />
            <!-- if ther is with deriver in extra field  itemData.extra_fields-->
            <FleetDocumentUploadCard
              v-if="itemData.extra_fields['with driver']"
              :title="$t('listings.DriversID')"
              @update:expiryDate="itemData.fleet.driverIdExpiry = $event"
              @update:file="itemData.fleet.driverId = $event"
              class="col-6"
              :expiryError="v$.itemData?.fleet.driverIdExpiry?.$errors[0]?.$message"
              :expiryMSG="v$.itemData?.fleet?.driverId?.$errors[0]?.$message"
              :fileError="v$.itemData?.fleet?.driverId?.$errors[0]?.$message"
              :fileMSG="v$.itemData?.fleet?.driverIdExpiry?.$errors[0]?.$message"
              :file="itemData.fleet.driverId"
              :expiryDate="itemData.fleet.driverIdExpiry"
            />
            <FleetDocumentUploadCard
              v-if="itemData.extra_fields['with driver']"
              :title="$t('listings.DriversLicense')"
              @update:expiryDate="itemData.fleet.driversLicenseExpiry = $event"
              @update:file="itemData.fleet.driversLicense = $event"
              class="col-6"
              :expiryError="v$.itemData?.fleet.driversLicenseExpiry?.$errors[0]?.$message"
              :expiryMSG="v$.itemData?.fleet?.driverId?.$errors[0]?.$message"
              :fileError="v$.itemData?.fleet?.driversLicense?.$errors[0]?.$message"
              :fileMSG="v$.itemData?.fleet?.driversLicenseExpiry?.$errors[0]?.$message"
              :file="itemData.fleet.driversLicense"
              :expiryDate="itemData.fleet.driversLicenseExpiry"
            />
          </div>
          <div class="divider"></div>

          <div class="image-group">
            <div class="image-group-header">
              <div class="image-icon">
                <img src="@/assets/svg-icons/camera-plus.svg?url" alt="camera plus" />
              </div>
              <div
                class="image-title"
                :class="{ error_validation: v$.itemData?.fleet?.images?.$errors[0]?.$message }"
              >
                {{ $t('listings.pictures') }}
              </div>
              <div
                class="image-subtitle"
                :class="{ error_validation: v$.itemData?.fleet?.images?.$errors[0]?.$message }"
              >
                {{ $t('listings.imageRequirements') }}
              </div>
            </div>
            <div class="image-upload-btn">
              <MainBtn @click="openFilePicker">
                <div class="btn-content">
                  <img src="@/assets/svg-icons/cloud.svg?url" alt="cloud" />
                  {{ $t('listings.upload') }}
                </div>
              </MainBtn>
            </div>
            <div class="image-preview-list">
              <div class="image-preview" v-for="image in itemData.fleet.images" :key="image.id">
                <div class="image-badge" v-if="image.is_thumbnail">
                  <div class="badge-content">{{ $t('listings.thumbnail') }}</div>
                </div>
                <DropDown
                  :options="imgDropdownOptions"
                  @update:modelValue="handleImageOption(image.id, $event)"
                >
                  <template v-slot:trigger>
                    <div class="image-option">
                      <img src="@/assets/svg-icons/ellipsis.svg?url" alt="ellipsis" />
                    </div>
                  </template>
                </DropDown>
                <img :src="image.image" alt="Fleet Image" />
              </div>
            </div>
          </div>
          <div v-if="v$.itemData?.fleet?.images?.$errors[0]?.$message" class="error_validation">
            {{ v$.itemData?.fleet?.images?.$errors[0]?.$message }}
          </div>
          <div class="divider"></div>
          <div class="AddUnit_action">
            <MainBtn type="green" v-if="!isEditMode" @click="addNewFleet">{{
              $t('listings.AddUnit')
            }}</MainBtn>
            <MainBtn type="green" v-if="isEditMode" @click="saveEditedFleet">{{
              $t('listings.EditUnit')
            }}</MainBtn>
          </div>
        </template>
      </ModalPopup>
    </section>
    <section class="Details step_section" v-if="step === 4">
      <stepTitle
        :title="$t('ListingSteps.Details')"
        :subTitle="$t('ListingSteps.DetailsText')"
        :icon="layoutaltIcon"
        :bar__fill="false"
      />
      <div class="input-group">
        <inputField
          :label="$t('listings.title')"
          :value="itemData.name"
          type="text"
          :placeholder="$t('listings.enterTitle')"
          :error="v$.itemData.name?.$errors[0]?.$message"
          required
          :maxlength="100"
          @update="itemData.name = $event"
        />
      </div>
      <div class="input-group">
        <inputField
          :label="$t('listings.description')"
          :value="itemData.description"
          type="textarea"
          :placeholder="$t('listings.enterDescription')"
          :maxlength="2000"
          @update="itemData.description = $event"
        />
      </div>
    </section>
    <section class="Complete step_section" v-if="step === 5">
      <div class="success-header">
        <div class="success-title">
          <div class="success-header-icon">
            <img src="@/assets/svg-icons/checkmark.svg?url" alt="checkmark" />
          </div>
          {{ itemData.id ? $t('listings.editListing') : $t('listings.listingAdded') }}
        </div>
        <div class="success-header-subtitle">
          {{ itemData.id ? $t('listings.listingEditSuccess') : $t('listings.listingAddSuccess') }}
        </div>
        <div class="btn-group">
          <MainBtn type="green" @click="$emit('close')">
            <div class="btn-content">{{ $t('listings.backToMyListings') }}</div>
          </MainBtn>
        </div>
      </div>
    </section>
    <div class="divider"></div>
    <div class="steps_actions" v-if="step != 5">
      <MainBtn @click="backStep" v-if="step > 0">{{ $t('listings.previous') }}</MainBtn>
      <MainBtn v-if="step < 4" type="green" @click="nextStep">{{ $t('listings.Next') }}</MainBtn>
      <MainBtn v-if="step >= 4" type="green" :disabled="!hasUnsavedChanges" @click="handleSave">
        <div class="btn-content">
          {{ itemData.id ? $t('listings.saveChanges') : $t('listings.addListing') }}
        </div>
      </MainBtn>
    </div>
    <DeleteModal
      :isActive="deleteDocModal"
      :title="$t('listings.confirmDelete')"
      :subTitle="$t('listings.DeleteConfirmation')"
      :onClickCancel="deleteDocModal"
      :onClickButton="deleteFleet"
    />
  </div>
</template>

<style scoped>
.header_text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edit_rental_listing {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 20px;
}
.edit_rental_listing .header {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
}
.edit_rental_listing .progress-bar {
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
  max-width: unset;
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

/* .divider {
  border-bottom: 1px solid #e0e0e0;
} */

.banner {
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  gap: 15px;
  border-radius: 12px;
  border: 2px solid #f79009;
  background: #d2f9e3;
  margin-bottom: 10px;
}

.banner-title {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--Dark-950, #121212);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.banner-img {
  width: 30px;
  height: 30px;
}

.banner-img img {
  width: 100%;
  height: 100%;
  filter: invert(63%) sepia(73%) saturate(2903%) hue-rotate(359deg) brightness(102%) contrast(94%);
}

.banner-content {
  color: var(--Dark-900, #3d3d3d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.image-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-group-header {
  display: flex;
  gap: 10px;
}

.image-icon {
  width: 28px;
  height: 28px;
}

.image-icon img {
  width: 100%;
  height: 100%;
}

.image-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  color: #4f4f4f;
}

.image-subtitle {
  color: #888;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.image-preview-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-preview {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.image-badge {
  position: absolute;
  width: 100px;
  box-sizing: border-box;
  background-color: #15b377;
  transform: rotateZ(-45deg);
  top: 0;
  left: 0;
  transform-origin: 60px 45px;
  text-align: center;
}

.badge-content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}

.image-option {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  border-radius: 0px 11px 0px 6px;
  background: rgba(0, 0, 0, 0.6);
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.btn-item,
.image-upload-btn {
  width: min-content;
}

.btn-content {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
  white-space: nowrap;
}

.option-box {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid var(--Gray-200, #eaecf0);
  background: var(--Base-White, #fff);
  padding: 16px;
  width: 100%;
  max-width: 740px;
}

.option-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.option-info h3 {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.option-info span {
  color: var(--Dark-500, #6d6d6d);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.validation_errors {
  display: flex;
  padding-top: 12px;
  color: red;
}
@media (max-width: 1024px) {
  .edit_rental_listing .header {
    flex-direction: column;
    width: 100%;
  }
  .edit_rental_listing .progress-bar {
    max-width: 100%;
  }
  .step_section {
    max-width: 100%;
  }
}
@media (max-width: 768px) {
  .modal_new_fleet .row {
    flex-direction: column;
    width: 100%;
  }
  .modal_new_fleet .row .col-6 {
    width: 100%;
  }
  .image-preview-list .image-preview {
    width: 140px;
    height: 140px;
  }
  .Price .price_item {
    flex-direction: column;
  }
}
</style>
<style>
.modal_new_fleet .modal {
  max-width: unset;
  height: 90%;
  overflow-y: scroll;
  width: 60%;
}
.modal_new_fleet .modal .header {
  border-bottom: 1px solid #e0e0e0;
  align-items: flex-start;
}
.modal_new_fleet .price_item input:disabled {
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  background: #f9fafb;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.modal_new_fleet .modal .content {
  gap: 30px;
}
@media (min-width: 768px) and (max-width: 1024px) {
  .modal_new_fleet .modal {
    width: 80%;
  }
}
@media (max-width: 768px) {
  .modal_new_fleet .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .progress .label {
    display: none;
  }
}
</style>
