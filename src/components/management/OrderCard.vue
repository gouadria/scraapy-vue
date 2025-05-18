<script lang="ts">
import { defineComponent, shallowRef } from 'vue'

import MainBtn from '@/components/UIElements/MainBtn.vue'
import boxComponent from '@/components/UIElements/boxComponent.vue'
import CommonChip from '@/components/UIElements/common_chip.vue'
import OrderStatusDetail from '@/components/selling/order_status_detail.vue'
import OrderDetailList from '@/components/UIElements/OrderDetailsList.vue'
// Icons
import CalenderIcon from '@/assets/svg-icons/Selling/calendar.svg'
import CalenderPlusIcon from '@/assets/svg-icons/Selling/calendar-plus-02.svg'
import CalenderMinusIcon from '@/assets/svg-icons/Selling/calendar-minus-02.svg'
import CoinsIcon from '@/assets/svg-icons/Selling/coins_icon.svg'
import BankNoteIcon from '@/assets/svg-icons/Selling/bank-note-01.svg'
import ContainerIcon from '@/assets/svg-icons/containerIcon.vue'
import GridIcon from '@/assets/svg-icons/Selling/grid-01.svg'

import type { orderDetails as OrderDetailsType, items } from '@/models/order'


export default defineComponent({
  name: 'OrderCard',
  components: {
    MainBtn,
    boxComponent,
    CommonChip,
    OrderStatusDetail,
    OrderDetailList
  },
  props: {
    order: {
      type: Object as () => OrderDetailsType,
      required: true
    },
  },
  data() {
    return {
      icons: {
        calender: shallowRef(CalenderIcon),
        calenderPlus: shallowRef(CalenderPlusIcon),
        calenderMinus: shallowRef(CalenderMinusIcon),
        coins: shallowRef(CoinsIcon),
        bankNote: shallowRef(BankNoteIcon),
        container: shallowRef(ContainerIcon),
        grid: shallowRef(GridIcon)
      },
    }
  },
})
</script>
<template>
  <boxComponent>
    <template #box_content>
      <div class="order_div">
        <div class="order_status">
          <h3>{{ $t('Selling.Order') }}# {{ order.orderId.slice(-6) }}</h3>
          <CommonChip :text="order?.status ?? ''" :chipType="order?.status?.replace(' ', '').toUpperCase() ?? ''" :circle="false" />
        </div>
        <div class="divider"></div>
        <div class="order_category">
          <p>
            {{ this.$i18n.locale === 'ar' ? order?.itemCategory_ar : order?.itemCategory }}
          </p>
        </div>
        <div class="divider"></div>
        <OrderDetailList :details="order.details" />
        <div class="divider"></div>
        <OrderStatusDetail :order="order" />
        <div class="viewDetails">
          <MainBtn type="white" @click="$emit('details', order.id)">
            {{ $t('Selling.ViewDetails') }}
          </MainBtn>
        </div>
      </div>
    </template>
  </boxComponent>
</template>

<style scoped>
.order_div {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.order_status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.order_status h3 {
  color: #4f4f4f;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.order_category {
  color: #121212;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.viewDetails button {
  display: flex;
  width: 100%;
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

@media (max-width: 768px) {
  .order_div {
    justify-content: space-between;
  }
}
</style>
