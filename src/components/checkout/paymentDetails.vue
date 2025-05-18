<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

const NAME_REGEX = /^[A-Za-z'`~.\-\s]{1,48}$/


const requiredMsg = (fieldName: string) =>
  helpers.withMessage(() => `${fieldName} is required`, required)


const fullNamePattern = helpers.withMessage(
  () =>
    'Name must contain only letters or these characters: spaces, \' (quote), ` (backtick), ~, ., and -. Max length: 48.',
  (value) => !value || NAME_REGEX.test(value)
)


const numericOnly = helpers.withMessage(
  () => 'This field must be numbers only',
  (value) => !value || /^\d+$/.test(value)
)

const cardNumericOnly = helpers.withMessage(
  () => 'Card number must be numbers only',
  (value) => !value || /^\d+$/.test(value.replace(/\s/g, ''))
)

const luhnCheck = helpers.withMessage(
  () => 'Invalid card number',
  (value) => {
    if (!value) return true
    value = value.replace(/\s/g, '')
    let sum = 0
    for (let i = 0; i < value.length; i++) {
      let cardNum = parseInt(value[i])
      if ((value.length - i) % 2 === 0) {
        cardNum *= 2
        if (cardNum > 9) {
          cardNum -= 9
        }
      }
      sum += cardNum
    }
    return sum % 10 === 0
  }
)

const cardNumberLength = helpers.withMessage(
  () => 'Card number must be 16 digits',
  (value) => !!value && value.replace(/\s/g, '').length === 16
)

const expiryDatePattern = helpers.withMessage(
  () => 'Expiry date must be in MM/YY format',
  (value) => !value || /^(0[1-9]|1[0-2])\/\d{2}$/.test(value.replace(/\s/g, ''))
)


const cvcLength = helpers.withMessage(
  () => 'CVC code must be 3 digits',
  (value) => !!value && value.length === 3
)

export default defineComponent({
  name: 'PaymentDetails',
  components: {
    inputField,
    MainBtn
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  data() {
    return {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvcCode: ''
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  validations() {
    return {
      cardName: {
        required: requiredMsg('Card Name'),
        fullNamePattern
      },
      cardNumber: {
        required: requiredMsg('Card Number'),
        cardNumericOnly,
        cardNumberLength,
        luhnCheck
      },
      expiryDate: {
        required: requiredMsg('Expiry Date'),
        expiryDatePattern
      },
      cvcCode: {
        required: requiredMsg('CVC Code'),
        numericOnly,
        cvcLength
      }
    }
  },
  methods: {
    updateAndPay() {
      let data = {
        name: this.cardName,
        number: this.cardNumber.replace(/\s/g, ''),
        month: this.expiryDate.replace(/\s/g, '').slice(0, 2),
        year: '20' + this.expiryDate.replace(/\s/g, '').slice(3, 5),
        cvc: this.cvcCode
      }
      this.$emit('update', data)
    },
    async processPayment() {
      const items = this.$userStore.state.cart.map((citem) => ({
        item: citem.item.id,
        order_quantity: citem.quantity
      }))
      const name = this.cardName
      const number = this.cardNumber.replace(/\s/g, '')
      const month = this.expiryDate.replace(/\s/g, '').slice(0, 2)
      const year = '20' + this.expiryDate.replace(/\s/g, '').slice(3, 5)
      const cvc = this.cvcCode

      this.$axios.post('/api/billing/orders/', {
        items,
        name,
        number,
        month,
        year,
        cvc,
        delivery_address_line1: "address 1",
        delivery_address_line2: "address 2",
        delivery_city: "city",
        delivery_province: "province",
        delivery_zip_code: "12345",
        delivery_country: "country"
      })
        .then((response) => {
          const payment_url = response.data.data.payment_url
          window.location.replace(payment_url)
        })
        .catch((error) => {
          console.error('Payment failed', error)
        })
    },
    validatePayment() {
      this.v$.$validate()
      if (this.v$.$error && !this.disabled) {
        return
      }
      this.updateAndPay()
      //this.processPayment()
    }
  }
})
</script>

<template>
  <div class="paymnet-box-container">
    <div class="payment-box-header">
      <h3>{{ $t('PaymentDetails.title') }}</h3>
    </div>
    <div class="paymnent-box-inputs">
      <!-- Card Name -->
      <inputField :label="$t('PaymentDetails.cardName')" :placeholder="$t('PaymentDetails.cardNameLabel')"
        :value="cardName" :error="v$.cardName?.$errors[0]?.$message" @update="cardName = $event" required />

      <!-- Card Number -->
      <inputField type="cardNumber" :label="$t('PaymentDetails.cardNumber')"
        :placeholder="$t('PaymentDetails.cardNumberLabel')" :value="cardNumber"
        :error="v$.cardNumber?.$errors[0]?.$message" @update="cardNumber = $event" required />

      <div class="date-security">
        <div class="date-wrapper">
          <!-- Expiry Date -->
          <inputField type="expiryDate" :label="$t('PaymentDetails.expiryDate')" placeholder="MM / YY"
            :value="expiryDate" :error="v$.expiryDate?.$errors[0]?.$message" @update="expiryDate = $event" required />
        </div>

        <!-- CVC Code -->
        <inputField type="cvcCode" :label="$t('PaymentDetails.cvc')" :placeholder="$t('PaymentDetails.cvcLabel')"
          :value="cvcCode" :error="v$.cvcCode?.$errors[0]?.$message" @update="cvcCode = $event" required />
      </div>

      <div class="security-message">
        <img src="@/assets/svg-icons/lock.svg?url" alt="lock" />
        <p>{{ $t('PaymentDetails.securityMessage') }}</p>
      </div>

      <MainBtn type="green" class="checkout-btn" @click="validatePayment" :disabled="disabled">
        <div class="btn-container">
          <img src="@/assets/svg-icons/credit-card.svg?url" alt="credit card" />
          <span class="btn-text">{{ $t('PaymentDetails.payNow') }}</span>
        </div>
        <img class="arrow" src="@/assets/svg-icons/arrow-right.svg?url" alt="arrow right" />
      </MainBtn>
    </div>
  </div>
</template>

<style scoped>
html[lang="ar"] .arrow {
  transform: rotate(180deg);
}

.paymnet-box-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid var(--Dark-100, #E7E7E7);
}

.payment-box-header {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid var(--Dark-50, #F6F6F6);
  border-radius: 15px;
  padding-bottom: 10px;
}

.payment-box-header h3 {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.paymnent-box-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.date-security {
  display: flex;
  gap: 20px;
}

.security-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #52525C;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.checkout-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.btn-text {
  color: var(--White, #fff);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
}
</style>
