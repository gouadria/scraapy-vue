<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default defineComponent({
  name: 'UpdatePassword',
  components: {
    ModalPopup,
    MainBtn
  },
  props: {
    show: Boolean
  }
})
</script>
<template>
  <ModalPopup :show="show" @close="$emit('close')">
    <template v-slot:title>
      <div class="title-wrapper">
        <div class="title">
          <img src="@/assets/svg-icons/logo-sqaure.svg?url" />
          {{ $t('terms.title') }}
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="terms">
        <span>
          {{ $t('terms.intro') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading1') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content1') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading2') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content2') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading3') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content3') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading4') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content4') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading5') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content5') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading6') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content6') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading7') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content7') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading8') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content8') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading9') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content9') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading10') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content10') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading11') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content11') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading12') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content12') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading13') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content13') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading14') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content14') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading15') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content15') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading16') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content16') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading17') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content17') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading18') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content18') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading19') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content19') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading20') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content20') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading21') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content21') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading22') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content22') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading23') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content23') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading24') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content24') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading25') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content25') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading26') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content26') }}
        </span>
        <span class="terms-heading">
          {{ $t('terms.heading27') }}
        </span>
        <span class="terms-content">
          {{ $t('terms.content27') }}
        </span>
      </div>

      <MainBtn type="green" @click="$emit('acceptTerms')">
        {{ $t('terms.accept') }}
      </MainBtn>
    </template>
  </ModalPopup>
</template>

<style scoped>
.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--Dark-950, #121212);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
}

.terms {
  display: flex;
  flex-direction: column;
  padding: 22px 12px 22px 24px;
  align-items: flex-start;
  gap: 28px;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  max-height: 436px;
  overflow-y: scroll;
}

.terms-heading,
.terms-content {
  color: var(--Dark-900, #3d3d3d);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.terms-content {
  font-weight: 400;
}
</style>
