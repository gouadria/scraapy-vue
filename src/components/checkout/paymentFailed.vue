<template>
  <div class="payment_failed">
    <div class="faild_icon">
      <img src="@/assets/svg-icons/checkout/card.svg?url" alt="payment failed icon" />
    </div>
    <div class="faild_message">
      <h1>{{ $t('checkout.paymentFailed') }}</h1>
      <p>{{ $t('checkout.paymentFailedText') }}</p>
    </div>
    <MainBtn type="green" @click="$router.back()">{{ $t('checkout.goBack') }}</MainBtn>
  </div>
</template>

<script setup lang="ts">
import MainBtn from '../UIElements/MainBtn.vue'
</script>

<style scoped>
.payment_failed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fff;
  gap: 16px;
}
.faild_message {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faild_message h1 {
  color: #667085;
  font-size: 30px;
  font-weight: 500;
}
.faild_message p {
  color: #98a2b3;
  font-size: 20px;
  font-weight: 400;
}
</style>
