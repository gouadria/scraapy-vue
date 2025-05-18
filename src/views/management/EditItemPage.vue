<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import inputField from '@/components/UIElements/inputField.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength, minLength } from '@vuelidate/validators'
import DropDown from '@/components/UIElements/DropDown.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import type { Item } from '@/models/Item'
import type { CategoryGroup } from '@/models/Category'
import deliveryAddress from '@/components/checkout/deliveryAddress.vue'
import { toast } from 'vue3-toastify'
import ModalComponent from '@/components/UIElements/ModalComponent.vue'
import { useRouter } from 'vue-router'
import ArrowLeftIcon from '@/assets/svg-icons/arrow-left.svg?component'
import MissingRequirements from '@/components/UIElements/popups/MissingRequirements.vue'
import MDSIcon from '@/assets/svg-icons/file-check-02.svg?url'
import priceIcon from '@/assets/svg-icons/bank-note-02.svg'
export default defineComponent({
  components: {
    inputField,
    MainBtn,
    DropDown,
    deliveryAddress,
    ModalComponent,
    ArrowLeftIcon,
    MissingRequirements
  },
  setup() {
    return { v$: useVuelidate() }
  },
  emits: ['save', 'close', 'assem'],
  props: {
    categoryGroups: {
      type: Array as () => CategoryGroup[],
      default: () => [],
      required: false
    },
    item: {
      type: Object as () => Item,
      required: true
    },
    serviceText: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      itemData: this.handleItemData(),
      categoryGroupSelection:
        this.categoryGroups && this.categoryGroups.length ? this.categoryGroups[0] : null,
      selectedCategory: null,
      tmpImages: [] as File[],
      completed: false,
      otherCategory: false,
      otherSubCategory: false,
      isSubmitting: false,
      extraFieldErrors: {} as Record<string, string>,
      isActive: false,
      router: useRouter(),
      missingRequirements: {},
      isOtherCategory: true,
      missingInformation: [],
      // use markRow for image
      MDSIcon: shallowRef(MDSIcon),
      priceIcon: shallowRef(priceIcon)
    }
  },
  validations() {
    const validations = {
      itemData: {
        name: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        price: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },
        description: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
        },

        images: {
          required: helpers.withMessage(() => this.$t('validations.requiredField'), required),
          minLength: helpers.withMessage(
            () => this.$t('validations.minLength', { min: 1 }),
            minLength(1)
          ),
          maxLength: helpers.withMessage(
            () => this.$t('validations.maxImages', { max: 10 }),
            maxLength(10)
          )
        }
      }
    }

    // Add quantity validation only if categoryType is 'product'
    if (this.categoryType === 'product') {
      validations.itemData.quantity = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }
    }

    if (!this.selectedCategory?.extra_field_types?.name === 'weight') {
      validations.itemData.minimum_selling_quantity = {
        required: helpers.withMessage(() => this.$t('validations.requiredField'), required)
      }
    }
    return validations
  },

  computed: {
    missingKeys(): string[] {
      return Object.keys(this.missingRequirements)
    },
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

    subCategoryOptions() {
      if (!this.categoryGroupSelection) {
        return []
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
        latitude: this.itemData.latitude,
        longitude: this.itemData.longitude,
        addressLine1: this.itemData.address_line1,
        addressLine2: this.itemData.address_line2,
        city: this.itemData.city,
        province: this.itemData.province,
        zipCode: this.itemData.zip_code,
        country: this.itemData.country,
        contactName: this.itemData.on_site_contact_name,
        contactNumber: this.itemData.on_site_contact_phone
      }
    },
    categoryType() {
      const pageName = this.$route.params.subPage

      switch (pageName) {
        case 'sell-product':
          return 'product'
        case 'service-listings':
          return 'service'
        case 'rental-listings':
          return 'rental'
        default:
          return null // or some default value
      }
    }
  },

  methods: {
    handleItemData() {
      const clean_data = JSON.parse(JSON.stringify(this.item))

      const clean_extra_fields = clean_data.extra_fields?.map((field) => {
        return {
          name: field.type.name,
          value: field.value
        }
      })
      clean_data.extra_fields = clean_extra_fields
      return clean_data
    },
    initializeCategory() {
      if (this.item.category?.id) {
        // Find the category group that contains the item's category
        const categoryId = this.item.category.id
        const group = this.categoryGroups.find((g) =>
          g.categories.some((cat) => cat.id === categoryId)
        )
        if (group) {
          this.categoryGroupSelection = group
          this.selectedCategory = group.categories.find((cat) => cat.id === categoryId) || null
          this.itemData.category_group = group.id
          this.itemData.category = categoryId
        } else {
          // Handle case where category is not found in categoryGroups
          this.otherCategory = true
          this.itemData.category_group = this.item.category.name
          this.selectedCategory = this.item.category
        }
      }
    },
    handleAddressUpdate(address: any) {
      this.itemData.longitude = address.longitude
      this.itemData.latitude = address.latitude
      this.itemData.address_line1 = address.addressLine1
      this.itemData.address_line2 = address.addressLine2
      this.itemData.city = address.city
      this.itemData.province = address.province
      this.itemData.zip_code = address.zipCode
      this.itemData.country = address.country
      this.itemData.on_site_contact_name = address.contactName
      this.itemData.on_site_contact_phone = address.contactNumber
    },

    handleCategoryChange(val: string) {
      if (val === 'other') {
        this.otherCategory = true
        this.otherSubCategory = false
        this.categoryGroupSelection = null
        this.selectedCategory = null
        console.log(this.categoryGroupSelection)
        this.isOtherCategory = true
        this.itemData.category_group = ''
      } else {
        this.otherCategory = false
        this.otherSubCategory = false
        const group = this.categoryGroups.find((g) => g.id === val) || null
        this.categoryGroupSelection = group
        this.selectedCategory = group?.categories[0] || this.itemData.category || null
        console.log(this.categoryGroupSelection)
        this.missingRequirements = this.categoryGroupSelection.requirments || {}
        // console.log(this.businessCanPost())
        if (!this.businessCanPost()) {
          console.log('he cant post')
          this.openWarningsModal()
        } else {
          console.log('he can not post')
        }
        //add category id to item data
        this.itemData.category_group = val
        console.log(this.itemData.category_group)
      }
    },
    missingInfo() {
      const state = this.$userStore.state
      const missingData = []
      const businessProfile = state.user?.business_profile || {}
      // console.log(this.categoryGroupSelection.requirements)

      if (this.missingInformation?.cr_number && businessProfile.cr_number === null) {
        // return text
        missingData.push({ title: 'Company Registration Number', value: 'cr_number' })
      }
      if (this.missingInformation?.vat_document && businessProfile.vat_document === null) {
        // return text
        missingData.push({
          title: 'VAT Document',
          value: 'vat_document'
        })
      }
      if (this.missingInformation?.vat_number && businessProfile.vat_number === null) {
        // return text
        missingData.push({
          title: 'VAT Number',
          value: 'vat_number'
        })
      }
      if (this.missingInformation?.cr_document && businessProfile.cr_document === null) {
        // return text
        missingData.push({
          title: 'Company Registration Document',
          value: 'cr_document'
        })
      }
      if (
        this.missingInformation?.mwan_license_document &&
        businessProfile.mwan_license_document === null
      ) {
        // return text
        missingData.push({
          title: 'MWAN License Document',
          value: 'mwan_license_document'
        })
      }
      if (
        this.missingInformation?.mwan_license_number &&
        businessProfile.mwan_license_number === null
      ) {
        // return text
        missingData.push({
          title: 'MWAN License Number',
          value: 'mwan_license_number'
        })
      }
      console.log(missingData)
      return missingData
    },
    businessCanPost() {
      return this.missingInformation.length === 0
    },
    async checkRequirments(id: any) {
      try {
        const response = await this.$axios.post(`api/users/business-profile/missingdata/`, {
          id: [id]
        })
        console.log('Missing Data:', response.data[0].LegalRequirements)
        // Assuming the response contains a field indicating missing data
        if (response.data && response.data.length > 0) {
          this.missingInformation = response.data[0].LegalRequirements
          console.log('Missing Data:', this.missingInformation)
          if (this.missingInformation.length > 0) {
            this.openWarningsModal()
          }
        } else {
          this.missingInformation = []
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
    handleSubCategoryChange(val: string) {
      if (val === 'other') {
        this.otherSubCategory = true
        this.selectedCategory = null
        this.isOtherCategory = true
        this.itemData.category = ''
      } else {
        this.otherSubCategory = false
        if (this.categoryGroupSelection) {
          this.selectedCategory =
            this.categoryGroupSelection.categories.find((subcategory) => subcategory.id === val) ||
            null
        }
        this.itemData.category = val
        this.checkRequirments(val)
      }
    },
    openWarningsModal() {
      this.isActive = !this.isActive
    },
    formatKey(key: string): string {
      return key.replace(/([A-Z])/g, ' $1').trim()
    },
    GoToLegalInformation() {
      // const missingRequirements = this.missingInfo().map((missing) => missing.value)
      const missingRequirements = this.missingInformation.map((missing) => missing.name)
      console.log('Missing Requirements:', missingRequirements)
      this.router.push({
        name: 'management',
        params: {
          page: 'Account',
          subPage: 'legalInformation'
        },
        query: {
          missing: JSON.stringify(missingRequirements)
        }
      })
      this.isActive = !this.isActive
    },
    setExtraField(name: string, value: string) {
      if (!this.itemData.extra_fields) {
        this.itemData.extra_fields = []
      }
      const extraField = this.itemData.extra_fields.find((extraField) => extraField.name === name)
      if (extraField && value === '') {
        this.itemData.extra_fields = this.itemData.extra_fields.filter(
          (extraField) => extraField.name !== name
        )
      } else {
        if (extraField) {
          extraField.value = value
        } else {
          this.itemData.extra_fields.push({ name, value })
        }
      }
      if (this.v$.$dirty) {
        if (value === '') {
          this.extraFieldErrors[name] = this.$t('validations.requiredField')
          console.log(this.extraFieldErrors[name])
        } else {
          this.extraFieldErrors[name] = ''
        }
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
        formData.append('image', file)
        console.log(formData)
        await this.$axios
          .post('/api/inventory/user/items/' + item_id + '/images/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res: any) => {
            this.itemData.images = res.data.message.images
            this.$emit('save', res.data)
          })
          .catch((err: any) => {
            console.error(err)
            console.error('Failed to upload image')
          })
      }
      return
    },

    uploadMDSPDF(file: File) {
      this.setExtraField('MDS', file)
      this.itemData.MDS = file
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
          this.itemData.images = this.tmpImages.map((file) => ({
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
        this.itemData.images.forEach((image) => {
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
          this.itemData.images.forEach((image) => {
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
        this.itemData.images = this.tmpImages.map((file, index) => ({
          id: index,
          image: URL.createObjectURL(file)
        }))
        if (this.itemData.images.length === 0) {
          delete this.itemData.images
        }
        return
      }
      // delete image for existing item
      await this.$axios
        .delete('/api/inventory/user/items/' + this.item.id + '/images/' + imageID + '/')
        .then(() => {
          this.itemData.images = this.itemData.images.filter((image) => image.id !== imageID)
        })
        .catch(() => {
          console.error('Failed to delete image')
        })
    },
    async addListing() {
      const data = {}
      // Add category type from computed property
      this.itemData.category_type = this.categoryType
      for (const key in this.itemData) {
        if (key === 'images') continue
        if (key === 'extra_fields') {
          data[key] = (this.itemData[key] || []).map((extraField) => ({
            name: extraField.name,
            value: extraField.value
          }))
          continue
        }
        data[key] = this.itemData[key]
      }
      if (!data.category) {
        data['category'] = this.selectedCategory.id
      }

      console.log(this.itemData)
      await this.$axios
        .post('/api/inventory/user/items/', [data])
        .then((response) => {
          console.log(response)
          const createdItem = response.data?.data[0]
          console.log(createdItem)
          if (!createdItem || !createdItem.id) {
            throw new Error('Invalid API response: Missing item ID')
          }

          if (this.tmpImages.length) {
            this.uploadImage(createdItem.id)
          }
          this.$emit('save', createdItem)
          toast.success(this.$t('listings.saveSuccess'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 2000
          })
          this.isSubmitting = true
          console.log(this.itemData)
        })
        .catch((error) => {
          console.error('Failed to add listing', error)
          toast.error(this.$t('errorsMsgs.requestError'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
        })
    },

    async saveChanges() {
      // remove all fields that are not changed and remove images send as json
      console.log(this.itemData)
      const data = {}
      for (const key in this.itemData) {
        if (key === 'images') continue
        if (key === 'extra_fields') {
          data[key] = this.itemData[key].map((extraField) => ({
            name: extraField.name,
            value: extraField.value
          }))
          continue
        }
        if (this.itemData[key] !== this.item[key]) {
          data[key] = this.itemData[key]
        }
      }
      console.log(data)
      // add category_type to the data
      data['category_type'] = this.itemData.category_type
      data['id'] = this.itemData.id

      await this.$axios
        .patch('/api/inventory/user/items/' + this.item.id + '/', data)
        .then((response) => {
          this.itemData = response.data
          if (this.tmpImages.length) {
            this.uploadImage()
          }
          toast.success(this.$t('listings.saveSuccess'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 2000
          })
          this.isSubmitting = true
          this.$emit('save', response.data.data[0])
        })
        .catch(() => {
          console.error('Failed to save changes')
        })
    },

    async handleSave() {
      if (this.isSubmitting) return

      try {
        this.v$.$touch()
        // Safely handle extra fields validation
        for (const field of this.selectedCategory?.extra_field_types || []) {
          // Check if the field is defined in the extra_fields array
          const extraField = this.itemData.extra_fields?.find(
            (extraField) => extraField.name === field.name && extraField.value !== ''
          )
          if (!extraField) {
            this.extraFieldErrors[field.name] = this.$t('validations.requiredField')
          } else {
            this.extraFieldErrors[field.name] = ''
          }
        }

        if (
          this.v$.$errors.length > 0 ||
          Object.values(this.extraFieldErrors).some((error) => error)
        ) {
          console.log('validation errors', this.v$.$errors)
          toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }

        if (!this.hasUnsavedChanges) {
          toast.info(this.$t('errorsMsgs.noChanges'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 2000
          })
          return
        }

        if (this.itemData?.id) {
          console.log(this.itemData)
          await this.saveChanges()
        } else {
          console.log(this.itemData)
          await this.addListing()
        }
      } catch (error) {
        console.error('Error in handleSave:', error)
        toast.error(this.$t('errorsMsgs.requestError'), {
          position: 'top-right',
          autoClose: 3000
        })
      }
    },
    // Find the category by ID from categoryGroups
    findCategoryById(categoryId: string) {
      for (const group of this.categoryGroups) {
        const category = group.categories.find((cat) => cat.id === categoryId)
        if (category) {
          return category
        }
      }
      return null
    },

    // Update the category in itemData
    updateCategory() {
      if (this.itemData.id && this.itemData.category) {
        const categoryId = this.itemData.category
        const foundCategory = this.findCategoryById(categoryId)

        if (foundCategory) {
          this.selectedCategory = foundCategory
          this.categoryGroupSelection = this.categoryGroups.find((group) =>
            group.categories.some((cat) => cat.id === categoryId)
          )
          console.log(this.selectedCategory)
        }
      }
      console.log(this.selectedCategory)
    }
  },
  mounted() {
    this.updateCategory()
    this.selectedCategory = this.categoryGroupSelection
    this.initializeCategory()
  }
})
</script>
<template>
  <div class="edit-item" v-if="isSubmitting">
    <div class="success-header">
      <div class="success-title">
        <div class="success-header-icon">
          <img src="@/assets/svg-icons/checkmark.svg?url" alt="checkmark icon" />
        </div>
        {{ itemData.id ? $t('listings.editListing') : $t('listings.listingAdded') }}
      </div>
      <div class="success-header-subtitle">
        {{ itemData.id ? $t('listings.listingEditSuccess') : $t('listings.listingAddSuccess') }}
      </div>
      <div class="btn-group">
        <MainBtn
          type="green"
          @click="
            () => {
              $emit('close')
            }
          "
        >
          <div class="btn-content">{{ $t('listings.backToMyListings') }}</div>
        </MainBtn>
      </div>
    </div>
  </div>
  <div class="edit-item" v-else>
    <div class="header">
      <div class="back" @click="$emit('close')">
        <ArrowLeftIcon class="icon" />
        {{ $t('listings.back') }}
      </div>
      <div class="title" v-if="!serviceText">
        {{ itemData.id ? $t('listings.editListing') : $t('listings.addListing') }}
      </div>
      <div class="title" v-else>
        {{ itemData.id ? $t('listings.editService') : $t('listings.addService') }}
      </div>
    </div>
    <div class="divider"></div>
    <div class="banner" v-if="item.status === 'rejected' && item.staff_note">
      <div class="banner-title">
        <div class="banner-img">
          <img src="@/assets/svg-icons/alert.svg?url" alt="alert icon" />
        </div>
        {{ $t('listings.reasonForRejection') }}
      </div>
      <div class="banner-content">
        {{ item.staff_note }}
      </div>
    </div>
    <div class="content">
      <div class="input-group">
        <div class="input-item">
          <deliveryAddress
            :addressName="false"
            :address="address"
            :required="true"
            @update="handleAddressUpdate"
            :disabled="disabled"
          />
        </div>
      </div>
      <div class="section">
        <div class="section-header">
          <img src="@/assets/svg-icons/handOver.svg?url" alt="handover icon" />
          <div class="header-text">
            <h1>
              {{ $t('handOver.title') }}
            </h1>
            <span>
              {{ $t('handOver.subtitle') }}
            </span>
          </div>
        </div>
        <div class="option-box">
          <inputField
            :value="itemData.on_site_pickup"
            type="checkbox"
            @update="itemData.on_site_pickup = $event"
            :disabled="disabled"
          />
          <div class="option-info">
            <!-- <h3>{{ $t('handOver.optionTitle') }}</h3> -->
            <span>{{
              serviceText ? $t('handOver.serviceDescroption') : $t('handOver.optionDescription')
            }}</span>
          </div>
        </div>
      </div>

      <div class="input-group">
        <inputField
          type="dropdown"
          :label="$t('listings.category')"
          :placeholder="$t('listings.selectCategory')"
          :options="categoryOptions"
          :value="categoryGroupSelection?.id || (otherCategory ? 'other' : '')"
          @update="handleCategoryChange"
          required
          :disabled="disabled"
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
          required
          :disabled="disabled"
        />
      </div>
      <div v-if="otherCategory || otherSubCategory" class="input-group box other">
        <span>{{ $t('listings.addNewCategory') }}</span>
        <inputField
          v-if="!otherSubCategory"
          :label="$t('listings.category')"
          type="text"
          :value="itemData.category_group"
          :placeholder="$t('listings.enterCategory')"
          :error="v$.itemData.category_group?.$errors[0]?.$message"
          required
          class="full-width"
          @update="itemData.category_group = $event"
          :disabled="disabled"
        />
        <inputField
          :label="$t('listings.subCategory')"
          type="text"
          :value="itemData.category?.name"
          :placeholder="$t('listings.enterSubCategory')"
          :error="v$.itemData.category?.$errors[0]?.$message"
          required
          class="full-width"
          @update="itemData.category = $event"
          :disabled="disabled"
        />
      </div>

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
          :disabled="disabled"
        />
      </div>
      <div class="input-group">
        <inputField
          :label="$t('listings.description')"
          :value="itemData.description"
          type="textarea"
          :placeholder="$t('listings.enterDescription')"
          :error="v$.itemData.description?.$errors[0]?.$message"
          required
          :maxlength="2000"
          @update="itemData.description = $event"
          :disabled="disabled"
        />
      </div>
      <div class="divider input-group" v-if="categoryType === 'product'"></div>
      <div class="label_sec input-group" v-if="categoryType === 'product'">
        <img src="@/assets/svg-icons/fleet.svg?url" alt="" />
        <h4>{{ $t('listings.Inventory') }}</h4>
        <span>{{ $t('listings.labelSubtitle') }}</span>
      </div>
      <div class="input-group input_tow_group" v-if="categoryType === 'product'">
        <inputField
          :label="$t('listings.amount')"
          :value="itemData.quantity"
          type="text"
          :placeholder="$t('listings.enterAmount')"
          :error="v$.itemData.quantity?.$errors[0]?.$message"
          required
          @update="itemData.quantity = $event"
          :disabled="disabled"
        />
        <!-- :error="v$.itemData.quantity?.$errors[0]?.$message" -->
        <inputField
          :class="[isOtherCategory ? 'disabledPerInput' : '', 'perInputField']"
          :label="$t('listings.per')"
          :value="itemData?.price_unit || selectedCategory?.price_unit"
          type="text"
          :placeholder="$t('listings.per')"
          @update="itemData.category.price_unit = $event"
          :disabled="isOtherCategory"
        />
      </div>
      <div class="input-group" v-if="categoryType === 'product'">
        <inputField
          :label="$t('listings.minimumQuantity')"
          :value="itemData.minimum_selling_quantity"
          type="text"
          :placeholder="$t('listings.minimumQuantity')"
          :error="v$.itemData.minimum_selling_quantity?.$errors[0]?.$message"
          required
          @update="itemData.minimum_selling_quantity = $event"
          :disabled="disabled"
        />
      </div>

      <div class="divider input-group"></div>
      <div class="label_sec input-group">
        <component :is="priceIcon" class="label_sec_svg" />
        <h4>{{ $t('listings.price') }}</h4>
        <span>{{ $t('listings.labelSubtitle') }}</span>
      </div>

      <div class="input-group input_tow_group">
        <inputField
          :label="$t('listings.price')"
          :value="itemData.price"
          type="text"
          :placeholder="$t('listings.enterPrice')"
          :error="v$.itemData.price?.$errors[0]?.$message"
          required
          @update="itemData.price = $event"
          :disabled="disabled"
        />

        <inputField
          :class="[isOtherCategory ? 'disabledPerInput' : '', 'perInputField']"
          :label="$t('listings.per')"
          :value="itemData?.price_unit || selectedCategory?.price_unit"
          type="text"
          :placeholder="$t('listings.per')"
          required
          @update="itemData.price_unit = $event"
          :disabled="isOtherCategory"
        />
      </div>
      <div class="addExtra_items">
        <div
          class="input-group input_tow_group"
          v-for="field in selectedCategory?.extra_field_types"
          :key="field.name"
        >
          <inputField
            :label="field.name === 'MDS' ? $t('listings.MDSSubtitle') : field.name"
            :value="
              itemData.extra_fields?.find((extraField: any) => extraField.name === field.name)
                ?.value || ''
            "
            :class="{ mds_field: field.name === 'MDS' }"
            :labelImage="field.name === 'MDS' ? MDSIcon : ''"
            :type="field.name === 'MDS' ? 'file' : 'text'"
            :placeholder="$t('listings.enterValue')"
            :error="extraFieldErrors[field.name]"
            required
            @upload="uploadMDSPDF"
            @update="setExtraField(field.name, $event)"
            :disabled="disabled"
          />
          <inputField
            v-if="selectedCategory?.extra_field_types[0].name === 'weight'"
            :class="[isOtherCategory ? 'disabledPerInput' : '', 'perInputField']"
            :label="$t('listings.per')"
            :value="selectedCategory?.price_unit || selectedCategory?.price_unit"
            type="text"
            :placeholder="$t('listings.per')"
            required
            @update="itemData.category.price_unit = $event"
            :disabled="isOtherCategory"
          />
        </div>
        <div class="input-group" v-if="selectedCategory?.extra_field_types?.name === 'weight'">
          <inputField
            :label="$t('listings.minimumQuantity')"
            :value="itemData.minimum_selling_quantity"
            type="text"
            :placeholder="$t('listings.minimumQuantity')"
            :error="v$.itemData.minimum_selling_quantity?.$errors[0]?.$message"
            required
            @update="itemData.minimum_selling_quantity = $event"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="divider"></div>
      <div class="image-group">
        <div class="image-group-header">
          <div class="image-icon">
            <img src="@/assets/svg-icons/camera-plus.svg?url" alt="camera icon" />
          </div>
          <div class="image-title">{{ $t('listings.pictures') }}</div>
          <div
            class="image-subtitle"
            :class="{ error_validation: v$.itemData?.images?.$errors[0]?.$message }"
          >
            {{ $t('listings.imageRequirements') }}
          </div>
        </div>
        <div
          class="image-upload-btn"
          :class="{ error_validation: v$.itemData?.images?.$errors[0]?.$message }"
        >
          <MainBtn @click="openFilePicker" v-if="!disabled">
            <div class="btn-content">
              <img src="@/assets/svg-icons/cloud.svg?url" alt="upload icon" />
              {{ $t('listings.upload') }}
            </div>
          </MainBtn>
        </div>
        <div class="image-preview-list">
          <div class="image-preview" v-for="image in itemData.images" :key="image.id">
            <div class="image-badge" v-if="image.is_thumbnail">
              <div class="badge-content">{{ $t('listings.thumbnail') }}</div>
            </div>
            <DropDown
              :options="imgDropdownOptions"
              @update:modelValue="handleImageOption(image.id, $event)"
              v-if="!disabled"
            >
              <template v-slot:trigger>
                <div class="image-option">
                  <img src="@/assets/svg-icons/ellipsis.svg?url" alt="ellipsis" />
                </div>
              </template>
            </DropDown>
            <img :src="image.image" alt="image" />
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="unsaved-changes" v-if="hasUnsavedChanges">
        {{ $t('listings.unsavedChanges') }}
      </div>
      <div class="btn-group" v-if="!disabled">
        <div class="btn-item">
          <MainBtn type="green" :disabled="!hasUnsavedChanges" @click="handleSave">
            <div class="btn-content">
              {{ itemData.id ? $t('listings.saveChanges') : $t('listings.addListing') }}
            </div>
          </MainBtn>
        </div>
        <div class="btn-item">
          <MainBtn
            type="cancel"
            @click="this.itemData = JSON.parse(JSON.stringify(this.item))"
            v-if="hasUnsavedChanges"
          >
            <div class="btn-content">{{ $t('listings.reset') }}</div>
          </MainBtn>
        </div>
      </div>
    </div>
    <MissingRequirements
      :showModal="isActive"
      :missingInformation="missingInformation"
      :openWarningsModal="openWarningsModal"
    />
  </div>
</template>

<style scoped>
[lang='ar'] .back .icon {
  transform: rotate(180deg);
  stroke: #b0b0b0;
}

.edit-item {
  padding-bottom: 30px;
}

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
  gap: 4px;
  border-bottom: 0.8px solid var(--Dark-100, #e7e7e7);
  padding-bottom: 18px;
}

.input-group,
.section {
  max-width: 540px;
}

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
.label_sec {
  display: flex;
  gap: 10px;
  align-items: center;
}
.addExtra_items {
  display: flex;
  gap: 24px;
  flex-direction: column;
}
.label_sec h4 {
  color: #4f4f4f;
  font-size: 18px;
  font-weight: 500;
}
.label_sec span {
  color: #888;
  font-size: 18px;
  font-weight: 400;
}
.input_tow_group {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
}
.input_tow_group .input-item {
  width: 100%;
}
.perInputField {
  width: 100%;
  max-width: 100px;
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

.error_validation {
  color: #f04438;
}

.mds_field {
  gap: 20px;
}
</style>
<style>
.edit-item input {
  border-radius: 8px;
}
.disabledPerInput input {
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: #ededed;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
</style>
