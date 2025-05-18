<template>
  <ModalPopup :show="show" @close="$emit('close')">
    <template v-slot:title>
      <div class="title">
        {{ $t('management.ProvideReason') }}
      </div>
    </template>
    <template v-slot:content>
      <div class="subtitle">
        {{ $t('management.ReasonSubtitle') }}
      </div>
      <div class="content">
        <inputField
          type="textarea"
          :label="$t('management.typeTheReason')"
          :value="reason"
          :rows="11"
          @update="reason = $event"
        />
      </div>
      <div class="btn-group">
        <MainBtn type="red" @click="$emit('submit', reason)">
          {{ $t('management.RejectListing') }}
        </MainBtn>
      </div>
    </template>
  </ModalPopup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default defineComponent({
  name: 'DeleteAccount',
  components: {
    ModalPopup,
    inputField,
    MainBtn
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      reason: ''
    }
  }
})
</script>

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
  font-weight: 600;
  line-height: 38px;
}

.title img {
  width: 45px;
  height: 50px;
}

.subtitle {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  max-width: 400px;
}

.content {
  display: flex;
  flex-direction: column;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
