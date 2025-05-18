<template>
  <ModalPopup :show="closeModal" @close="closeFunction">
    <template v-slot:content>
      <div class="error_content">
        <div class="error_modal_top_icon">
          <ErrorIcon />
        </div>
        <div class="message">
          <h2>{{ $t('documentMS.Error') }}</h2>
          <p class="err_message" v-html="message"></p>
        </div>

        <MainBtn type="red" @click="closeFunction">
          {{ $t('documentMS.close') }}
        </MainBtn>
      </div>
    </template>
  </ModalPopup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalPopup from '@/components/UIElements/ModalPopup.vue'
import ErrorIcon from '@/assets/documents_svg/ErrorIcon.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
export default defineComponent({
  name: 'ErrorModal',
  components: {
    ModalPopup,
    ErrorIcon,
    MainBtn
  },

  props: {
    closeModal: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const closeFunction = () => {
      console.log('Button clicked!')
      emit('close')
    }

    return {
      closeFunction
    }
  },

  emits: ['close']
})
</script>

<style scoped>
.error_modal {
  display: flex;
  width: 100%;
}

.error_modal_top_icon {
  display: flex;
  width: 56px;
  height: 56px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #fee4e2;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.error_content {
  padding: 30px 20px;
  gap: 24px;
}
.error_content,
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.message {
  gap: 8px;
}
.message h2 {
  color: #101828;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
.message .err_message {
  color: #475467;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}
</style>
<style>
.error_modal .modal-content {
  width: 360px;
  max-width: 360px;
}
</style>
