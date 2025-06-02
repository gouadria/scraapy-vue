<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import sarIcon from '@/assets/svg-icons/SAR.svg'
import type { Item } from '@/models/Item'
import UploadFile from '@/components/UIElements/UploadFile.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import approvalBadge from '@/components/UIElements/approvalBadge.vue'
import DeleteModal from '@/components/UIElements/delete_modal.vue'
import QuantityIcon from '@/assets/svg-icons/card-icons/Quantity.svg?url'
import { toast } from 'vue3-toastify'
import axios from 'axios';


export default defineComponent({
  name: 'ItemCard',
  components: {
    UploadFile,
    MainBtn,
    approvalBadge,
    DeleteModal
  },
  props: {
    item: {
      type: Object as () => Item,
      required: true
    },
    showBadge: Boolean,
    enableUpload: Boolean,
    vendorActions: Boolean,
    staffActions: Boolean,
    displayVendor: Boolean,
    serviceDelete: Boolean,
    driver: Boolean,
    approvalClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      deleteDocModal: false,
      sarIcon: shallowRef(sarIcon)
    }
  },
  computed: {
    thumbnail() {
      const images = this.item?.images || []
      if (images.length === 0) return null
      const img = images.find(image => image?.is_thumbnail) || images[0]
      if (img && img.image && !img.image.startsWith('http')) {
        return { ...img, image: `${import.meta.env.VITE_API_BASE_URL || ''}${img.image}` }
      }
      return img
    },
    showActions() {
      return this.staffActions || this.vendorActions
    },
    getCurrency() {
      return (this.item?.price_unit || '').split('/')
    },
    filteredFields() {
      const fieldsByType = {
        product: ['Weight', 'Quantity', 'Location'],
        rental: ['Make', 'Model', 'Quantity', 'Location'],
        service: ['Provider', 'Location']
      }

      const extra_fields = this.item.extra_fields.filter((field: any) =>
        fieldsByType[this.item.category_type]?.includes(field.type.name)
      )

      if (fieldsByType[this.item.category_type]?.includes('Quantity')) {
        extra_fields.push({
          value: this.item.quantity,
          type: {
            name: 'Quantity',
            icon: QuantityIcon
          }
        })
      }

      return extra_fields
    }
  },
  methods: {
    openEditPage() {
      this.$emit('approvalClick', this.item)
    },
    handleClickItem() {
      if (
        !this.item.category?.hide_price ||
        (this.$userStore.getters.hasBusinessProfile && this.item.category?.hide_price)
      ) {
        if (!this.showActions && this.item?.id) {
          this.$router.push({ name: 'product-detail', params: { id: this.item.id } })
        }
      } else {
        toast.error(this.$t('errorsMsgs.pleaseFixErrors'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      }
    },
    OpenDeleteModal() {
      this.deleteDocModal = !this.deleteDocModal
    },
    async deleteItem() {
      if (!this.item?.id) return

      try {
        await this.$axios.delete(`/api/inventory/user/items/${this.item.id}/`)
        this.$emit('delete', this.item.id)
      } catch (error) {
        console.error('Failed to delete item:', error)
      }
    },
    async deleteDriver() {
      if (!this.item?.id) return

      try {
        await this.$axios.delete(`/api/driver/${this.item.id}/`)
        this.$emit('delete', this.item.id)
      } catch (error) {
        console.error('Failed to delete item:', error)
      }
    },
    emitGeneratePassword() {
      this.$emit('generatePassword', this.item.id)
    },
   async uploadImage(file: File) {
  if (!file) {
    console.error("No file provided to uploadImage");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('image', file); // Clé attendue par le backend

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    const response = await axios.post(
      `https://vmi2584358.contaboserver.net/api/inventory/user/items/${this.item.id}/images/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}` // ✅ NE PAS mettre 'Content-Type'
        }
      }
    );

    console.log("Image uploaded successfully:", response.data);
    // Eventuel rafraîchissement ou mise à jour ici

  } catch (error) {
    console.error("Failed to upload image:", error.response?.data || error.message);
  }
},

    async approveItem() {
      if (!this.item?.id) return

      try {
        await this.$axios.post(`/api/inventory/staff/${this.item.id}/approve/`)
        this.$emit('approve', this.item.id)
      } catch (error) {
        console.error('Failed to approve item:', error)
      }
    }
  }
})
</script>

<template>
  <div class="item" @click="handleClickItem">
    <approvalBadge :status="item.status || ''" :showBadge="showBadge" />

    <div class="item-image" @click="openEditPage()" v-if="!driver">
      <img
        draggable="false"
        :src="thumbnail?.image"
        v-if="item?.images?.length > 0 && thumbnail?.image"
        alt="item-image"
      />

      <uploadFile
        :type="['.png', '.jpg', '.jpeg']"
        @file="uploadImage"
        backgroundColor="#D4D2D2"
        v-else-if="enableUpload"
      >
        <div class="upload-image-title">{{ $t('itemCard.NoImage') }}</div>
      </uploadFile>

      <img draggable="false" src="@/assets/placeholder-item.jpeg" alt="item-image" v-else />
    </div>

    <div class="item-image" @click="openEditPage()" v-else>
      <img draggable="false" src="@/assets/svg-icons/image.png" alt="item-image" />
    </div>

    <div class="card-content" @click="openEditPage()">
      <div class="name-image-price-wrapper">
        <div class="name-image-wrapper" :class="driver ? 'driver-mode' : ''">
          <div class="name">{{ item.name }}</div>
          <div class="driver_id" v-if="driver">{{ item.id_number }}</div>

          <div v-if="displayVendor" class="vendor-image">
            <img
              draggable="false"
              :src="item.owner_image"
              alt="vendor"
              v-if="item.owner_image"
            />
            <img
              draggable="false"
              src="@/assets/svg-icons/vendor-placeholder.svg?url"
              alt="vendor"
              v-else
            />
          </div>
        </div>

        <template
          v-if="!item.category?.hide_price || ($userStore.getters.hasBusinessProfile && item.category?.hide_price)"
        >
          <div class="price" v-if="!driver">
            {{ item.price }}
            <div class="price_unit">
              <component class="SAR" :is="sarIcon" />
              <span class="unit" v-if="item.category">
                {{
                  $i18n.locale === 'ar'
                    ? item.category?.price_unit_ar || item.category?.price_unit
                    : item.category?.price_unit || item.category?.price_unit_ar
                }}
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="login-to-view" style="font-size: medium">
            {{ $t('itemCard.LoginToViewPrice') }}
          </div>
        </template>
      </div>

      <div class="divider"></div>

      <span class="description" v-if="item.category_type === 'service'">
        {{ item.description }}
      </span>

      <div class="availble" v-if="item.category_type !== 'service' && !driver">
        <img src="@/assets/svg-icons/Selling/container.svg?url" :alt="item.city + ' icon'" />
        <p>
          {{ item.quantity }} <span> {{ $t('HomeView.Available') }}</span>
        </p>
      </div>

      <div class="location field" v-if="item.city">
        <img src="@/assets/svg-icons/location.svg?url" alt="Location" />
        <div class="field-value">
          {{ item.city }}
          <div class="field-type">{{ $t('Selling.Location') }}</div>
        </div>
      </div>

      <div class="driver_data" v-if="driver">
        <ul>
          <li>
            <img src="@/assets/svg-icons/@, at.svg?url" alt="Email" />
            <span>{{ item.email }}</span>
          </li>
          <li>
            <img src="@/assets/svg-icons/phone-call-01.svg?url" alt="Phone" />
            <span>{{ item.contact_number }}</span>
          </li>
          <li>
            <img src="@/assets/svg-icons/rent_icon.svg?url" alt="Driver" />
            <span>{{ item.make }} {{ item.model }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>
.item {
  display: flex;
  width: clamp(200px, calc(8vw + 125px), 240px);
  min-width: 200px;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  position: relative;
  overflow: hidden;
  justify-content: flex-start;
}

/* .item:hover {
  border-radius: 12px;
  box-shadow: 2px 2px 40px -8px rgba(0, 0, 0, 0.25);
} */
.item-image {
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  min-height: 176px;
  max-height: 176px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-image-title {
  font-size: 16px;
}

.card-content {
  width: 100%;
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.name-image-price-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.name-image-wrapper {
  width: 100%;
  justify-content: space-between;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.vendor-image {
  height: auto;
  min-width: 60px;
}

.vendor-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
.generat_password button {
  width: 100%;
}
.name {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--Dark-950, #121212);
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  white-space: wrap;
  word-break: break-word;
}
.name-image-wrapper.driver-mode {
  flex-direction: column;
}
.name-image-wrapper.driver-mode .name {
  min-height: unset;
}
.name-image-wrapper.driver-mode .driver_id {
  color: #15b377;
  font-size: 20px;
  font-weight: 700;
}
.price {
  display: flex;
  font-size: clamp(14px, calc(0.56vw + 12px), 20px);
  color: #15b377;
  gap: 5px;
  color: var(--Secondary---500, #15b377);
  font-weight: 700;
  line-height: 30px;
}
.driver_data {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.driver_data ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.driver_data ul li {
  display: flex;
  gap: 10px;
  align-items: center;
}
.driver_data ul li span {
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 600;
}
.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: var(--Dark-700, #4f4f4f);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.price_unit {
  font-size: clamp(8px, calc(0.74vw + 9.33px), 14px);
  font-weight: 600;
  color: #b0b0b0;
  display: flex;
  gap: 6px;
}

.unit {
  font-weight: 600;
}

/* .price_unit sub {
  vertical-align: super;
  font-size: clamp(8px, calc(0.74vw + 9.33px), 12px);
  color: var(--Dark-300, #b0b0b0);
  font-weight: 600;
} */

.divider {
  border-top: 1px solid #e7e7e7;
  width: 100%;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.field-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--Dark-700, #4f4f4f);
  font-size: clamp(12px, calc(0.19vw + 11.33px), 14px);
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
}

.field-type {
  font-size: 12px;
  color: #b0b0b0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: space-around;
}

.btn-img {
  width: 20px;
  height: 20px;
}

.btn-img img {
  width: 100%;
  height: 100%;
}

.availble {
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
}

.availble p {
  display: flex;
  align-items: center;
  gap: 6px;
}

.availble p span {
  color: #b0b0b0;
  font-size: 12px;
  font-weight: 400;
}
.login-to-view {
  display: flex;
  color: #15b377;
  gap: 5px;
  color: var(--Secondary---500, #15b377);
  font-weight: 700;
  line-height: 30px;
  font-size: medium;
}
@media (max-width: 768px) {
  .item-image {
    height: 112px;
  }
}
@media (min-width: 768px) {
  .item {
    min-width: clamp(190px, calc(8vw + 125px), 240px);
  }
}
</style>
