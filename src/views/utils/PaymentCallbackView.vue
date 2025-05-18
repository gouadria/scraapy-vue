<script lang="ts">
import { defineComponent } from 'vue'
import orderSummary from '@/components/checkout/orderSummary.vue'
import cartItem from '@/components/cart/cartItem.vue'
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import completeIcon from '@/assets/svg-icons/checkout/completeIcon.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import paymentFailed from '@/components/checkout/paymentFailed.vue'

export default defineComponent({
  components: {
    orderSummary,
    cartItem,
    navBar,
    completeIcon,
    footerComponant,
    MainBtn,
    paymentFailed
  },

  data() {
    return {
      items: this.$userStore.state.cart,
      userEmail: this.$userStore.state?.user?.email,
      paymentStatus: 'pending'
    }
  },
  methods: {
    goToMarketPlace() {
      this.$router.push('/marketplace')
      this.$userStore.dispatch('clearCart')
    },
    goToPurchase() {
      this.$router.push({
        name: 'management',
        params: {
          page: 'Purchasing',
          subPage: 'products-bought'
        }
      })
      this.$userStore.dispatch('clearCart')
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const status = urlParams.get('status')
    const message = urlParams.get('message')
    console.log(id, status, message)
    this.$axios
      .post('/api/billing/payment/callback/', {
        id,
        status,
        message
      })
      .then((response) => {
        console.log(response)
        console.log('Cart After user Pay', this.$userStore.getters)

        this.paymentStatus = 'success'
      })
      .catch((error) => {
        console.log(error)
        this.paymentStatus = 'failed'
      })
    this.$userStore.dispatch('clearCart')
    console.log('Cart After user Pay', this.$userStore.state.cart)
  }
})
</script>
<template>
  <div class="full" v-if="paymentStatus === 'success'">
    <navBar />
    <main class="max-width padded">
      <div class="order_complete">
        <div class="complete_message">
          <div class="row">
            <div class="icon">
              <completeIcon />
            </div>
            <div class="message">
              <h2>{{ $t('OrderSummary.OrderComplete') }}</h2>
              <p>
                <span class="order_number">#532569614</span>
                Your order confirmation email has been sent to {{ userEmail }}. You can track the
                order from your purchasing history. Invoice is available in documents. Thank You!
              </p>
            </div>
          </div>
          <div class="action">
            <MainBtn type="green" @click="goToMarketPlace">
              {{ $t('OrderSummary.ContinueShopping') }}
            </MainBtn>
            <MainBtn type="white" @click="goToPurchase">
              {{ $t('OrderSummary.GoToPurchasing') }}
            </MainBtn>
          </div>
        </div>
        <div class="summary">
          <div class="product-list">
            <cartItem
              type="checkout"
              v-for="it in items"
              :key="it.item.id"
              :item="it.item"
              :orderQuantity="it.quantity"
              :hideRemove="true"
            />
          </div>
          <order-summary :items="items" :shipping="100" />
        </div>
      </div>
    </main>
    <footerComponant />
  </div>
  <paymentFailed v-else-if="paymentStatus === 'failed'" />
</template>
<style scoped>
.full {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
.order_complete {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  min-height: 70dvh;
  padding-top: 70px;
}
.summary {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 30%;
}

.complete_message {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 32px;
}
.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.message h2 {
  color: #121212;
  font-size: 36px;
  font-weight: 600;
}
.message p {
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  width: 100%;
  gap: 8px;
  flex-direction: column;
}
.message .order_number {
  color: #4f4f4f;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  width: 100%;
}
.action {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: space-between;
}
.action button {
  width: 50%;
}
</style>
