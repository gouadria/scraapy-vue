<template>
  <div class="item">
    <div
      class="item-image"
      :class="{ 'checkout-image': type === 'checkout' }"
      @click="handleClickItem"
    >
      <img
        draggable="false"
        :src="item.images[0]?.image"
        v-if="item.images && item.images.length > 0"
        alt="item-image"
      />

      <img draggable="false" src="@/assets/placeholder-item.jpeg" alt="item-image" v-else />
    </div>

    <div class="card-content">
      <div class="name-rate-delete-wrapper">
        <div class="name-rate-wrapper">
          <div class="name" :class="{ 'checkout-name': type === 'checkout' }">{{ item.name }}</div>
          <div class="price" v-if="type === 'cart'">
            {{ item.price }}
            <component class="SAR" :is="sarIcon" />

            <div class="price_unit">
              <span>
                <sub>{{ getCurrency[0] }} <component class="SAR" :is="sarIcon" /></sub>
              </span>
              <span v-if="getCurrency.length > 1">/</span>
              <span class="unit" v-if="getCurrency.length > 1">{{ getCurrency[1] }}</span>
            </div>
          </div>
        </div>

        <div
          class="delete-item"
          @click="handleRemoveItem"
          v-if="type === 'checkout' && !hideRemove"
        >
          <img src="@/assets/svg-icons/delete.svg?url" alt="delete" />
        </div>
      </div>

      <DropDown :options="amountOptions" v-model="selectedAmount" v-if="type === 'cart'" />

      <div class="fields" v-if="type === 'checkout' && filteredFields.length > 0">
        <div class="field" v-for="field in filteredFields" :key="field.type.name">
          <img :src="field.type.icon" alt="icon" v-if="field.type.icon" />
          <div class="field-value">{{ field.value }}</div>
        </div>
      </div>

      <div class="quantity">
        <img src="@/assets/svg-icons/Selling/container.svg?url" alt="decrement" />
        <div class="quantity">
          {{ orderQuantity }} <span>{{ item.price_unit }} </span>
        </div>
      </div>

      <div class="total-vendor-img-wrapper">
        <div class="price rewe" :class="{ 'checkout-price': type === 'checkout' }">
          <span
            >{{ item.price }}
            <span>
              <component class="SAR green" :is="sarIcon" />
            </span>
            {{ getCurrency[0] }}
          </span>
        </div>
        <div class="vendor-image" v-if="type !== 'checkout'">
          <img draggable="false" :src="item.owner_image" alt="vendor" v-if="item.owner_image" />
          <img
            draggable="false"
            src="@/assets/svg-icons/vendor-placeholder.svg?url"
            alt="vendor"
            v-else
          />
        </div>
        <div
          class="open_additional_service"
          :class="{ opend: servicesOpend }"
          v-if="type === 'checkout' && !hideAdditional"
        >
          <p>
            {{ $t('checkout.AdditionalServices') }}
            <img src="@/assets/svg-icons/checkout/chevron-up.svg?url" alt="chevron icon" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import sarIcon from '@/assets/svg-icons/SAR.svg'
import type { PropType } from 'vue'
import type { Item } from '@/models/Item'
import DropDown from '@/components/UIElements/DropDown.vue'

export default defineComponent({
  name: 'ItemCard',
  components: {
    DropDown
  },

  data() {
    return {
      amountOptions: [
        { value: '1', label: '10 kg' },
        { value: '2', label: '20 kg' },
        { value: '3', label: '30 kg' }
      ],
      selectedAmount: null,
      sarIcon: shallowRef(sarIcon)
    }
  },
  props: {
    item: {
      type: Object as () => Item,
      required: true
    },
    type: {
      type: String as PropType<'cart' | 'checkout'>,
      default: 'cart'
    },
    orderQuantity: {
      type: Number,
      default: 0
    },
    hideRemove: {
      type: Boolean,
      default: false,
      required: false
    },
    servicesOpend: {
      type: Boolean,
      default: false,
      required: false
    },
    hideAdditional: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    getCurrency() {
      if (typeof this.item.price_unit !== 'string') {
        return [] // Or return a default value if needed
      }
      return this.item.price_unit.split('/')
    },
    filteredFields() {
      // Ensure extra_fields is an array before calling filter
      if (!Array.isArray(this.item.extra_fields)) {
        return []
      }

      // Return only the fields with type 'inventory count' and 'weight'
      return this.item.extra_fields.filter((field) =>
        ['inventory count', 'weight'].includes(field.type.name.toLowerCase())
      )
    }
  },
  methods: {
    handleRemoveItem() {
      this.$emit('removeItemFromCart', this.item)
    },
    handleClickItem() {
      // go to product details page
      this.$router.push({
        name: 'product-detail',
        params: { id: this.item.id }
      })
      console.log(this.item.id)
    }
  },
  mounted() {
    console.log('mounted', this.item)
  }
})
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  position: relative;
  padding: 4px 4px 4px 12px;
}

.item-image {
  overflow: hidden;
  border-radius: 8px;
  min-width: 230px;
  width: 100%;
  max-width: 230px;
  align-self: stretch;
  max-height: 175px;
  cursor: pointer;
}

.checkout-image {
  min-width: 153.333px;
  max-width: 153.333px;
  max-height: 118.333px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  gap: 10px;
}

.name-rate-delete-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 0;
  /* Allow children to shrink */
}

.name-image-wrapper {
  width: 100%;
  justify-content: space-between;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.vendor-image {
  /* width: clamp(26px, calc(2.22vw + 28px), 36px); */
  height: 24px;
  width: 24px;
}

.vendor-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  border-radius: 50%;
}

.name-rate-wrapper,
.name,
.price,
.delete-item {
  min-width: 0;
}

.price span {
  font-weight: 700;
}

.price,
.delete-item {
  flex-shrink: 0;
}

.name-rate-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  max-width: 220px;
}

.name {
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--Dark-950, #121212);
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
}

.checkout-name {
  font-size: 14px;
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

.checkout-price {
  font-size: 12px;
}

.price_unit {
  font-size: clamp(8px, calc(0.74vw + 9.33px), 14px);
  font-weight: 600;
  color: #b0b0b0;
}

.unit {
  font-weight: 600;
}

.price_unit sub {
  vertical-align: super;
  font-size: clamp(8px, calc(0.74vw + 9.33px), 12px);
  color: var(--Dark-300, #b0b0b0);
  font-weight: 600;
}

.delete-item {
  display: flex;
  padding: 10px 10px 0 2px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  /* border: 1px solid var(--Dark-50, #f6f6f6);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05); */
}
.quantity {
  display: flex;
  gap: 5px;
  align-items: center;
}
.quantity span {
  font-size: 12px;
  font-weight: 600;
  color: #4f4f4f;
}
.total-vendor-img-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .item {
    width: 100%;
    min-height: 125px;
  }

  .card-content {
    display: flex;
    padding: 8px 8px 4px 8px;
    align-self: stretch;
    gap: 6px;
  }

  .item-image {
    min-width: 140px;
    max-width: 140px;
    min-height: 0;
  }

  .name {
    color: var(--Dark-950, #121212);
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    white-space: wrap;
  }

  .vendor-image {
    width: 26px;
    height: 26px;
  }

  .cart-items-wrapper {
    max-width: 100%;
  }
}

.fields {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}

.field {
  display: flex;
  gap: 4px;
  align-items: center;
}

.field-value {
  color: var(--Dark-700, #4f4f4f);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  /* 150% */
}

@media (max-width: 768px) {
  .item {
    min-width: clamp(130px, calc(8vw + 125px), 240px);
    padding: 0;
  }
}
.open_additional_service {
  display: flex;
  align-items: center;
  gap: 5px;
}
.open_additional_service p {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  color: #15b377;
  font-size: 12px;
  font-weight: 500;
}
html[dir='rtl'] .open_additional_service p {
  font-weight: 600;
}
.open_additional_service img {
  width: 18px;
  height: 18px;
  transform: rotate(0deg);
  transition: all 0.4s ease-in-out;
}
.open_additional_service.opend img {
  transform: rotate(180deg);
}
</style>
