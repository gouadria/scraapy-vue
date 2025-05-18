<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import CheckVerifiedIcon from '@/assets/svg-icons/check_verified_icon.svg'
import CheckCircleIcon from '@/assets/svg-icons/check_circle_icon.svg'
import ForbiddenIcon from '@/assets/svg-icons/forbidden_icon.svg'
import RejectedIcon from '@/assets/svg-icons/rejected_icon.svg'

import ReviewingIcon from '@/assets/svg-icons/reviewing_icon.svg'
import PreparingIcon from '@/assets/svg-icons/package_prepare_icon.svg'
import ReadyIcon from '@/assets/svg-icons/package_ready_icon.svg'
import ShippedIcon from '@/assets/svg-icons/shipped_icon.svg'
import paidIcon from '@/assets/svg-icons/paidIcon.vue'

import type { orderDetails as OrderDetailsType } from '@/models/order'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'OrderStatusDetail',
  props: {
    order: {
      type: Object as PropType<OrderDetailsType>,
      required: true
    }
  },
  data() {
    return {
      CheckVerifiedIcon: shallowRef(CheckVerifiedIcon),
      CheckCircleIcon: shallowRef(CheckCircleIcon),
      ForbiddenIcon: shallowRef(ForbiddenIcon),
      RejectedIcon: shallowRef(RejectedIcon),
      ReviewingIcon: shallowRef(ReviewingIcon),
      PreparingIcon: shallowRef(PreparingIcon),
      ReadyIcon: shallowRef(ReadyIcon),
      ShippedIcon: shallowRef(ShippedIcon),
      paidIcon: shallowRef(paidIcon),

      status: this.order.status.replace(' ', '').toUpperCase()
    }
  },
  methods: {}
})
</script>
<template>
  <div
    v-if="
      status === 'REVIEWING' ||
      status === 'COMPLETED' ||
      status === 'ACCEPTED' ||
      status === 'REJECTED' ||
      status === 'CANCELLED' ||
      status === 'PENDING' ||
      status === 'PREPARING' ||
      status === 'READY' ||
      status === 'SHIPPED' ||
      status === 'PAID'
    "
    class="detail_container"
  >
    <div class="detail_icon">
      <component v-if="status === 'COMPLETED'" :is="CheckVerifiedIcon"></component>
      <component v-if="status === 'ACCEPTED'" :is="CheckCircleIcon"></component>
      <component v-if="status === 'CANCELLED'" :is="ForbiddenIcon"></component>
      <component v-if="status === 'REJECTED'" :is="RejectedIcon"></component>

      <component v-if="status === 'REVIEWING'" :is="ReviewingIcon"></component>
      <component v-if="status === 'PENDING'" :is="ReviewingIcon"></component>
      <component v-if="status === 'PREPARING'" :is="PreparingIcon"></component>
      <component v-if="status === 'READY'" :is="ReadyIcon"></component>
      <component v-if="status === 'SHIPPED'" :is="ShippedIcon"></component>
      <component v-if="status === 'PAID'" :is="paidIcon"></component>
    </div>
    <div
      class="detail_heading"
      :class="{
        detail_heading_green:
          status === 'PAID' || status === 'COMPLETED' || status === 'READY' || status === 'SHIPPED',
        detail_heading_dark_blue: status === 'ACCEPTED' || status === 'PREPARING',
        detail_heading_orange: status === 'PENDING' || status === 'REVIEWING'
      }"
    >
      <h1 v-if="status === 'REVIEWING'">{{ $t('status.reviewingTheOrder') }}</h1>
      <h1 v-if="status === 'COMPLETED'">{{ $t('Selling.Completed') }}</h1>
      <h1 v-if="status === 'ACCEPTED'">{{ $t('Selling.RequestAcceptedByYou') }}</h1>
      <h1 v-if="status === 'CANCELLED'">{{ $t('Selling.RequestCancelled') }}</h1>
      <h1 v-if="status === 'REJECTED'">{{ $t('Selling.RequestRejected') }}</h1>

      <h1 v-if="status === 'PENDING'">{{ $t('status.reviewingTheOrder') }}</h1>
      <h1 v-if="status === 'PREPARING'">{{ $t('status.preparingTheOrder') }}</h1>
      <h1 v-if="status === 'READY'">{{ $t('status.readyToOrder') }}</h1>
      <h1 v-if="status === 'SHIPPED'">{{ $t('status.haveShipped') }}</h1>
      <h1 v-if="status === 'PAID'">{{ $t('status.customerPaid') }}</h1>

      <!-- <p v-if="status === 'COMPLETED'">Returned on 21 January 2023 - 07:14</p> -->
      <!-- <p v-if="status === 'ACCEPTED'">Handover on 04 February 2024 - 06:00</p> -->
      <!-- <p v-if="status === 'CANCELLED'">Cancelled on 10 June 2023 - 15:18</p> -->
      <!-- <p v-if="status === 'REJECTED'">Rejected on 03 August 2023 - 13:26</p> -->

      <!-- <p v-if="status === 'PENDING'">View details to update the status</p>
      <p v-if="status === 'PREPARING'">Started preparing on 04 February 2024</p>
      <p v-if="status === 'READY'">Ready on 04 February 2024 - 06:00</p>
      <p v-if="status === 'SHIPPED'">YShipped on 21 January 2023 - 07:14</p> -->
      <p v-if="status === 'PAID'">
        {{ $t('status.ReceivedOn') }}{{ ' ' + order.payment_date + '-' + order.payment_time }}
      </p>
    </div>
  </div>
  <!-- <div v-else-if="status === 'REVIEWING'" class="detail_container">
    <button class="button reject_button">Reject</button>
    <button class="button accept_button">Accept</button>
  </div> -->
  <div v-else class="detail_container_with_tenant">
    <!-- <div class="progress_bar">
      <div class="progress"></div>
    </div>
    <h1>08 Days Remaining</h1> -->
  </div>
</template>

<style scoped>
.detail_container {
  display: flex;
  gap: 10px;
  justify-items: flex-start;
}

.detail_heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
}

.detail_heading h1 {
  color: #f04438;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.detail_heading p {
  color: #4f4f4f;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.detail_heading_orange h1 {
  color: #f79009;
}

.detail_heading_green h1 {
  color: #15b377;
}

.detail_heading_dark_blue h1 {
  color: #136a83;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 12px 20px;
  color: var(--White, #fff);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 8px;
  border: none;
}

.reject_button {
  width: 30%;
  background-color: #f04438;
}

.accept_button {
  width: 70%;
  background-color: #15b377;
}

.detail_container_with_tenant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail_container_with_tenant h1 {
  color: #15b377;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.progress_bar {
  height: 8px;
  border-radius: 4px;
  border: 1px solid #e7e7e7;
  background: #eaecf0;
}

.progress {
  height: 8px;
  width: 70%;
  border-radius: 4px;
  background: #15b377;
}
</style>
