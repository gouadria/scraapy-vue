<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'

export default defineComponent({
  name: 'UpdatePassword',
  components: {
    ModalPopup
  },
  props: {
    show: Boolean
  }
})
</script>
<template>
  <ModalPopup
    :show="show"
    headerIcon="/src/assets/svg-icons/success.svg?url"
    @close="$emit('close')"
    class="modal_success"
  >
    <div class="header">
      <slot name="headerIcon"></slot>
    </div>
    <template v-slot:content>
      <h1>{{ $t('listings.UpdatedSuccessfull') }}</h1>
      <span>{{ $t('listings.updatedSuccessfullMSG') }}</span>
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
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
}

.subtitle {
  color: var(--Dark-700, #4f4f4f);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

h1 {
  color: var(--Gray-700, #344054);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

span {
  color: var(--Gray-600, #475467);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.condition {
  display: flex;
  gap: 8px;
  align-items: center;
}

.condition.valid img {
  filter: invert(20%) sepia(100%) saturate(3673%) hue-rotate(101deg) brightness(97%) contrast(104%);
}

.btn-group {
  display: flex;
  justify-content: flex-end;
}
</style>
<style>
.modal_success .modal .content {
  align-items: center;
}
</style>
