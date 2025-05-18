<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import sarIcon from '@/assets/svg-icons/SAR.svg'
import type { Item } from '@/models/Item'
import { useIsMobile } from '@/composables/useIsMobile'
import { useIsTablet } from '@/composables/useIsTablet'
import sellerInfo from '@/components/productDetails/sellerInfo.vue'
import productInfoHeader from '@/components/productDetails/productInfoHeader.vue'
import orderActions from '@/components/productDetails/orderActions.vue'

export default defineComponent({
  name: 'ProductInfo',
  components: {
    sellerInfo,
    productInfoHeader,
    orderActions
  },
  props: {
    item: {
      type: Object as () => Item,
      required: true
    }
  },
  data() {
    return {
      sarIcon: shallowRef(sarIcon)
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    const { isTablet } = useIsTablet()

    return { isMobile, isTablet }
  }
})
</script>
<template>
  <div class="product-info-container">
    <div class="details">
      <productInfoHeader :item="item" v-if="!isMobile" />

      <div class="price-info">
        <div class="price">
          <img src="@/assets/svg-icons/bank-note-01.svg?url" alt="Bank note icon" />
          <h1>
            {{ item.price }}
          </h1>
          <span class="price_unit">
            <span class="unit_text">
              <component class="SAR" :is="sarIcon" />
            </span>
            <span class="unit">
              {{
                $i18n.locale === 'ar'
                  ? item.category?.price_unit_ar || item.category?.price_unit
                  : item.category?.price_unit || item.category?.price_unit_ar
              }}
            </span>
          </span>
        </div>

        <div class="info">
          <ul class="location_info">
            <li v-if="item.category_type !== 'service' && item.quantity">
              <img
                src="@/assets/svg-icons/Selling/container.svg?url"
                :alt="item.city + ' ' + 'icon'"
              />
              <p>
                {{ item.quantity }} <span>{{ $t('HomeView.Available') }}</span>
              </p>
            </li>
            <!-- <li v-if="item.minimum_selling_quantity">
              <img
                src="@/assets/svg-icons/weight.svg?url"
                :alt="item.minimum_selling_quantity + ' ' + 'icon'"
              />
              <p>
                {{ item.minimum_selling_quantity }} <span>{{ $t('HomeView.Available') }}</span>
              </p>
            </li> -->
            <li>
              <img src="@/assets/svg-icons/location.svg?url" :alt="item.city + ' ' + 'icon'" />
              <p>
                {{ item.city }} <span>{{ item.country }}</span>
              </p>
            </li>
          </ul>
          <div class="info-item" v-for="extra_field in item.extra_fields" :key="extra_field.name">
            <img
              :src="extra_field.type.icon"
              :alt="extra_field.type.name"
              v-if="extra_field.type.icon"
            />
            <img
              v-else
              src="@/assets/svg-icons/Selling/container.svg?url"
              :alt="extra_field.type.name + ' ' + 'icon'"
            />
            <div class="info-text-container" v-if="!extra_field.type.name === 'MDS'">
              <p class="info-text">{{ extra_field.value }}</p>
              <p class="info-subtext">{{ extra_field.type.name }}</p>
            </div>
            <div class="info-text-container" v-else>
              <p class="info-subtext">{{ extra_field.type.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <orderActions :item="item" />
    </div>

    <sellerInfo :item="item" />
  </div>
</template>

<style scoped>
.product-info-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 30px;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
}

.location_info {
  display: flex;
  gap: 10px;
  list-style-type: none;
  flex-direction: column;
  width: 100%;
  padding: 0;
}

.location_info li {
  display: flex;
  gap: 6px;
  align-items: center;
}

.location_info li p {
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  gap: 6px;
  align-items: center;
}

.location_info li span {
  color: #b0b0b0;
  font-size: 14px;
  font-weight: 400;
}

.SARSARlocation_info li span {
  color: #b0b0b0;
  font-size: 14px;
  font-weight: 400;
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 490px;
}

.price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price img {
  max-width: 40px;
  max-height: 40px;
}

.price h1 {
  color: var(--Secondary---500, #15b377);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin: 0;
}

.price_unit {
  color: #b0b0b0;
  font-size: 16px;
  display: flex;
  gap: 2px;
}

.price_unit .unit_text {
  vertical-align: super;
  font-size: 16px;
  font-weight: 600;
}

.unit_text img {
  width: 20px;
  height: 20px;
}

.price_unit .unit {
  color: #b0b0b0;
  font-size: 20px;
  font-weight: 600;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 14px 16px;
}

.info-item {
  display: flex;
  gap: 6px;
}

.info-text-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.info-text {
  color: var(--Dark-700, #4f4f4f);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  white-space: nowrap;
}

.info-subtext {
  color: var(--Dark-300, #b0b0b0);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
</style>
