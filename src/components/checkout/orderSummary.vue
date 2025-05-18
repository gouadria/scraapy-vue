<script>
import SarIcon from '@/assets/svg-icons/SAR.svg';

export default {
  components: {
    SarIcon
  },
  props: {
    items: { type: Array, required: true },
    shipping: { type: Number, default: 0 }
  },
  data() {
    return {
      cartItems: this.$userStore.state.cart || []
    }
  },
  computed: {
    allAdditionalServices() {
      if (!this.cartItems) return [];
      return this.cartItems
        .filter(cartItem => cartItem.item.parent_order_item !== undefined)
        .map(cartItem => cartItem.item);
    },
    subtotal() {
      return this.items.reduce(
        (total, item) => total + item.item.price * item.quantity,
        0
      );
    },
    vat() {
      return this.subtotal * 0.15;
    },
    grandTotal() {
      return this.subtotal + this.shipping + this.vat;
    }
  },
  methods: {
    formatCurrency(value) {
      const numValue =
        typeof value === 'number' ? value : parseFloat(value);
      return isNaN(numValue)
        ? '0.00'
        : numValue
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  },
  mounted() {
    console.log('additional services', this.allAdditionalServices);
  }
}
</script>

<template>
  <div class="summary-container">
    <!-- Order Summary Title -->
    <div class="summary-item">
      <h2>{{ $t('OrderSummary.title') }}</h2>
    </div>

    <!-- Subtotal -->
    <div class="summary-item">
      <p class="summary-item-label">{{ $t('OrderSummary.subTotal') }}</p>
      <p class="summary-item-amount">
        <SarIcon class="SAR black" />
        {{ formatCurrency(subtotal) }}
      </p>
    </div>

    <!-- Shipping -->
    <div class="summary-item">
      <p class="summary-item-label">{{ $t('OrderSummary.shipping') }}</p>
      <p class="summary-item-amount">
        <SarIcon class="SAR black" />
        {{ formatCurrency(shipping) }}
      </p>
    </div>

    <!-- VAT -->
    <div class="summary-item">
      <p class="summary-item-label">{{ $t('OrderSummary.vat') }}</p>
      <p class="summary-item-amount">
        <SarIcon class="SAR black" />
        {{ formatCurrency(vat) }}
      </p>
    </div>

    <!-- Additional Services (if needed)
    <template v-if="allAdditionalServices.length > 0">
      <div class="summary-item service-header">
        <p class="summary-item-label">{{ $t('OrderSummary.additionalServices') }}</p>
      </div>
      <div v-for="(service, index) in allAdditionalServices" :key="index" class="summary-item">
        <p class="summary-item-label">{{ service.name }}</p>
        <p class="summary-item-amount">
          <SarIcon class="SAR black" />
          {{ formatCurrency(service.price) }}
        </p>
      </div>
    </template> -->

    <!-- Divider before total -->
    <div class="summary-divider"></div>

    <!-- Grand Total -->
    <div class="summary-item total">
      <p class="summary-item-label grand">{{ $t('OrderSummary.total') }}</p>
      <p class="summary-item-amount grand">
        <SarIcon class="SAR black" />
        {{ formatCurrency(grandTotal) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: #fff;
}

.summary-container h2 {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.summary-item {
  display: flex;
  padding: 12px 0px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-bottom: 1px solid var(--Dark-50, #f6f6f6);
}

.summary-item-label,
.summary-item-amount {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.summary-item-amount {
  font-weight: 400;
}

.summary-item:last-child {
  border-bottom: none;
}

.grand {
  font-weight: 600;
}
</style>
