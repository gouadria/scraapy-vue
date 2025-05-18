<template>
  <div class="contract_signe">
    <div class="signe">
      <div class="signe-link-wrapper">
        <div class="checkbox-input-wrapper">
          <inputField
            type="checkbox"
            :value="signed"
            @update="handleUpdate('signed', $event)"
            :error="v$.signed?.$errors[0]?.$message"
            required
            :disabled="signed != true"
          />
        </div>
        <div class="signe-link">
          <p>{{ $t('checkout.contractSign') }}</p>
          &nbsp;
          <a @click="toggelModal">{{ $t('checkout.theContract') }}</a>
        </div>
      </div>
    </div>
    <ContractModal
      :showContract="showContract"
      :document="document"
      @closeModal="toggelModal"
      @contractAgree="
        () => {
          showContract = !showContract
          signed = true
          $emit('signedContract', signed)
          emitValidationState()
        }
      "
    />
  </div>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import inputField from '../UIElements/inputField.vue'
import ContractModal from '@/components/checkout/ContractModal.vue'

export default {
  name: 'ContractSign',
  components: {
    inputField,
    ContractModal
  },
  props: {
    document: {
      type: String,
      required: true
    }
  },
  validations() {
    return {
      signed: {
        required: helpers.withMessage(() => this.$t('validation.requiredField'), required)
      }
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      showContract: false,
      signed: false
    }
  },
  methods: {
    handleUpdate(field, value) {
      this[field] = value
      this.v$[field].$touch()
      this.emitValidationState()
    },
    toggelModal() {
      this.showContract = !this.showContract
    },
    emitValidationState() {
      this.$emit('validation-state', {
        isValid: !this.v$.$invalid
      })
    }
  },
  watch: {
    signed() {
      this.emitValidationState()
    }
  }
}
</script>

<style scoped>
.contract_signe {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.signe {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.signe-link-wrapper {
  display: flex;
  gap: 12px;
}

.checkbox-input-wrapper {
  display: flex;
  align-items: center;
}

.signe-link {
  display: flex;
  align-items: center;
}

.signe-link p {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.signe-link a {
  color: var(--Dark-700, #4f4f4f);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
