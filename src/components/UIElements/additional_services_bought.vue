<script lang="ts">
export default {
  name: 'AdditionalServicesBought'
}
</script>

<template>    
  <div class="header">
    <h1 class="header_title">{{ $t('Selling.additional_services_bought') }}</h1>
    <div class="service">
      <img src="@/assets/svg-icons/tick_icon.svg" alt="" />
      <p>{{ $t('Selling.lab_test') }}</p>
      <img src="@/assets/svg-icons/tick_icon.svg" alt="" />
    </div>
    <div class="service">
      <img src="@/assets/svg-icons/tick_icon.svg" alt="" />
      <p>{{ $t('Selling.weighing') }}</p>
      <img src="@/assets/svg-icons/tick_icon.svg" alt="" />
    </div>
    <div class="service">
      <img src="@/assets/svg-icons/tick_icon.svg" alt="" />
      <p>{{ $t('Selling.loading_unloading') }}</p>
      <img src="@/assets/svg-icons/tick_icon.svg" alt="" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: flex-start;
}

.header_title{
    color: #6D6D6D;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
}

.service {
  display: flex;
  gap: 10px;
}
</style>
