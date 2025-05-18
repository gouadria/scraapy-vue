<template>
  <div class="contract_modal">
    <ModalComponent :modal-active="showContract" :closeActive="true" @close="toggelContractModal"
      class="add_additional_documents">
      <div class="sign_header">
        <h2>{{ $t('checkout.theContract') }}</h2>
        <p>{{ $t('checkout.contractSubTitle') }}</p>
      </div>
      <div class="contract">
        <Markdown class="width-padding" :source="document || ''" />
      </div>
      <div class="signe_link">
        <MainBtn @click="contractAgree" type="green">
          {{ $t('checkout.agreeContractTerms') }}
        </MainBtn>
        <MainBtn @click="toggelContractModal" type="red"> {{ $t('checkout.close') }} </MainBtn>
      </div>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalComponent from '../UIElements/ModalComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import MainBtn from '../UIElements/MainBtn.vue'
import Markdown from 'vue3-markdown-it'

export default defineComponent({
  name: 'contractSigne',
  components: {
    ModalComponent,
    MainBtn,
    Markdown
  },
  props: {
    document: {
      type: String,
      required: true
    },
    showContract: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      signe: false,
      closeModal: false,
      source: '# Hello World!'
    }
  },
  methods: {
    toggelContractModal() {
      this.$emit('closeModal')
    },
    contractAgree() {
      this.$emit('contractAgree')
    }
  }
})
</script>

<style scoped>
.contract_modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.width-padding {
  width: 100%;
  padding: 10px;
}

.signe_link {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.signe_link button {
  width: 100%;
}

.contract {
  display: flex;
  min-height: 50dvh;
  max-height: 100%;
  overflow-y: scroll;
  direction: rtl;

}


/* TODO:Uncomment the following lines if you want to apply RTL styles for Arabic language */

/* html[lang="ar"] .contract { */
/*   direction: rtl; */
/* } */
</style>
<style>
.add_additional_documents .modal-content {
  max-height: 80%;
}
</style>
