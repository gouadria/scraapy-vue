<script lang="ts">
import { defineComponent } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile.ts'
import navBar from '@/components/UIElements/navBar.vue'
import cartItem from '@/components/cart/cartItem.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'

export default defineComponent({
  components: {
    navBar,
    cartItem,
    MainBtn,
    footerComponant
  },
  data() {
    return {
      items: [] as Item[]
    }
  },
  methods: {
    async fetchApi() {
      await this.$axios
        .get('/api/inventory/items/')
        .then((response) => {
          this.items = response.data
        })
        .catch(() => {
          console.error('Failed to fetch items')
        })
    }
  },
  mounted() {
    this.fetchApi()
  },
  setup() {
    const { isMobile } = useIsMobile()

    return { isMobile }
  }
})
</script>
<template>
  <navBar />

  <main class="max-width padded">
    <div class="cart-header">
      <h1>
        {{ $t('cart.YourShoppingCart') }}
      </h1>
      <span class="items-counter"> ( {{ items.length }} {{ $t('cart.items') }} ) </span>
    </div>

    <div class="cart-items-container">
      <div class="cart-items-wrapper">
        <cartItem type="cart" v-for="item in items" :key="item.id" :item="item" />
      </div>

      <div class="checkout-container">
        <div class="subtotal-wrapper">
          <div class="subtotal">
            <span>{{ $t('cart.Subtotal') }}</span>
            <span>SAR 258,500</span>
          </div>

          <span class="vat"> {{ $t('cart.vatMessage') }} </span>
        </div>

        <MainBtn type="green" class="checkout-btn">
          <div class="btn-container">
            <img src="@/assets/svg-icons/credit-card.svg?url" alt="credit card" />
            <span class="btn-text">
              {{ $t('cart.Checkout') }}
            </span>
          </div>
          <img src="@/assets/svg-icons/arrow-right.svg?url" alt="arrow right" />
        </MainBtn>
        <MainBtn type="white">{{ $t('cart.ContinueShopping') }}</MainBtn>
      </div>
    </div>
  </main>

  <footerComponant v-if="!isMobile" />
</template>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: var(--carousel-gap, clamp(10px, calc(1.11vw + 4px), 50px));
  margin: 10px auto;
}

.cart-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
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

.cart-items-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
}

.btn-text {
  color: var(--White, #fff);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
}

.cart-header h1 {
  color: var(--Blue-950, #0b3241);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
}

.cart-header .items-counter {
  color: var(--Dark-500, #6d6d6d);
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
}

.cart-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
  max-width: 551px;
}

.checkout-container {
  width: 100%;
  max-width: 512px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.subtotal-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
}

.subtotal {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.subtotal span {
  color: var(--Dark-950, #121212);
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
}

@media (max-width: 768px) {
  .cart-header {
    margin-top: 14px;
    margin-bottom: 14px;
  }

  .cart-header h1 {
    color: var(--Blue-950, #0b3241);
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
  }

  .cart-header .items-counter {
    color: var(--Dark-500, #6d6d6d);
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
  }

  .cart-items-wrapper {
    max-width: 100%;
    gap: 16px;
  }

  .cart-items-container {
    flex-direction: column;
    margin-bottom: 50vh;
  }

  .checkout-container {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: var(--White, #fff);

    max-width: 100%;
  }

  .subtotal span {
    font-size: 14px;
    line-height: 20px;
    /* 142.857% */
  }

  .vat {
    align-self: center;
  }

  .checkout-btn {
    padding: 12px 20px;
    border-radius: 8px;
  }
}
</style>
