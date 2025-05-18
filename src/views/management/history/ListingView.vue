<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import FilterRow from '@/components/management/FilterRow.vue'
import OrderCard from '@/components/management/OrderCard.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import ListingDetailView from '@/views/management/history/ListingDetailView.vue'
import ToggleButton from '@/components/UIElements/toggle_button.vue'

// SVG Icons
import CalenderIcon from '@/assets/svg-icons/Selling/calendar.svg'
import CalenderPlusIcon from '@/assets/svg-icons/Selling/calendar-plus-02.svg'
import CalenderMinusIcon from '@/assets/svg-icons/Selling/calendar-minus-02.svg'
import CoinsIcon from '@/assets/svg-icons/Selling/coins_icon.svg'
import BankNoteIcon from '@/assets/svg-icons/Selling/bank-note-01.svg'
import ContainerIcon from '@/assets/svg-icons/containerIcon.vue'
import GridIcon from '@/assets/svg-icons/Selling/grid-01.svg'

import type { orderDetails as OrderDetailsType, items } from '@/models/order'

export default defineComponent({
  name: 'HistoryListing',
  components: {
    FilterRow,
    OrderCard,
    ListingDetailView,
    MainBtn,
    ToggleButton
  },
  data() {
    return {
      orderList: [] as OrderDetailsType[],
      orderDetails: null as OrderDetailsType | null,
      itemsPerPage: 10,
      currentPage: 1,
      isLoading: false,
      error: null as string | null,
      hasMoreItems: false,
      icons: {
        calender: shallowRef(CalenderIcon),
        calenderPlus: shallowRef(CalenderPlusIcon),
        calenderMinus: shallowRef(CalenderMinusIcon),
        coins: shallowRef(CoinsIcon),
        bankNote: shallowRef(BankNoteIcon),
        container: shallowRef(ContainerIcon),
        grid: shallowRef(GridIcon)
      },
      auto_accept: false
    }
  },
  computed: {
    pageType() {
      const subPage = this.$route.params.subPage
      const businessProfile = this.$userStore.state.user?.business_profile || {}
      const types: {
        [key: string]: {
          category: string
          type: string
          title: string
          subtitle: string
          auto_accept?: boolean
        }
      } = {
        'products-sold': {
          category: 'product',
          type: 'sold',
          title: this.$t('Selling.ProductsSold'),
          subtitle: 'Selling.products_sold_description',
          auto_accept: businessProfile.product_auto_accept || false
        },
        'rented-out': {
          category: 'rental',
          type: 'sold',
          title: this.$t('Selling.rentedOut'),
          subtitle: 'Selling.rentedOutP',
          auto_accept: businessProfile.rental_auto_accept || false
        },
        'services-provided': {
          category: 'service',
          type: 'sold',
          title: this.$t('listings.provideService'),
          subtitle: 'Selling.provideServiceTesxt',
          auto_accept: businessProfile.service_auto_accept || false
        },
        'products-bought': {
          category: 'product',
          type: 'bought',
          title: this.$t('Buying.buyingTitle'),
          subtitle: 'Buying.buyingSubTitle'
        },
        'rented-in': {
          category: 'rental',
          type: 'bought',
          title: this.$t('Buying.rentingTitle'),
          subtitle: 'Buying.rentingSubTitle'
        },
        'services-availed': {
          category: 'service',
          type: 'bought',
          title: this.$t('Buying.serviceTitle'),
          subtitle: 'Buying.serviceSubTitle'
        }
      }
      if (!types[subPage]) {
        this.$router.push({ name: 'management' })
        return null
      }
      return types[subPage]
    }
  },
  methods: {
    async fetchOrders() {
      if (this.isLoading || !this.pageType) return

      this.isLoading = true
      this.error = null

      const getParams = new URLSearchParams(window.location.search)
      const params = {
        group_type: this.pageType.category,
        type: this.pageType.type,
        page: getParams.get('page') || this.currentPage,
        query: getParams.get('search') || '',
        status: getParams.get('filter') || '',
        sort: getParams.get('sort') || '',
        per_page: this.itemsPerPage
      }

      try {
        const response = await this.$axios.get('api/billing/orders/', { params })
        const data = response.data.results
        console.log('api/billing/orders/', { params })
        console.log('Response:', response)
        const transformedOrders = data.flatMap((order: OrderDetailsType) => {
          return order.items.map((item: items) => ({
            orderId: order.id,
            buyer: order.buyer,
            createdAt: order.created_at,
            paymentDate: order.payment_date,
            itemId: item.itemID,
            orderItemId: item.id,
            itemName: item.name,
            itemPrice: item.price,
            itemCategory: item.category.name,
            itemCategory_ar: item.category.name_ar,
            itemQuantity: item.order_quantity,
            itemDescription: item.description,
            payment_date: this.getFormattedDate(order.payment_date || ''),
            payment_time: this.getFormattedTime(order.payment_date || ''),
            payment_id: order.payment_id,
            price_unit: item.category.price_unit,
            total_price: item.total_price,
            total_discount: item.total_discount,
            availableQuantity: item.quantity,
            createOrderTime: this.getFormattedTime(order.created_at),
            createOrderDate: this.getFormattedDate(order.created_at),
            details: shallowRef(this.getItemDetails(order, item)),
            tracking: item.tracking,
            longitude: item.latitude ?? null,
            latitude: item.latitude ?? null,
            address_line1: item.address_line1,
            address_line2: item.address_line2,
            city: item.city,
            country: item.country,
            zip_code: item.zip_code,
            province: item.province,
            status: item.tracking?.status || 'unknown'
          }))
        })

        this.orderList =
          this.currentPage === 1 ? transformedOrders : [...this.orderList, ...transformedOrders]
        this.hasMoreItems = data.length === this.itemsPerPage
        console.log(this.orderList)
      } catch (err) {
        this.error = 'Failed to fetch data. Please try again.'
        console.error('API Error:', err)
      } finally {
        this.isLoading = false
      }
    },
    getFormattedDate(dateTimeString: string) {
      if (!dateTimeString) return ''
      const date = new Date(dateTimeString)
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    getFormattedTime(dateTimeString: string) {
      if (!dateTimeString) return ''
      const date = new Date(dateTimeString)
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    },
    getItemDetails(order: any, item: items) {
      const subPage = this.$route.params.subPage as string
      if (['products-sold', 'products-bought'].includes(subPage)) {
        return [
          {
            iconUrl: this.icons.container,
            value: item.order_quantity,
            span: this.$t('Selling.Quantity')
          },
          {
            iconUrl: this.icons.bankNote,
            value: item.price,
            span: `${this.$t('Selling.per')} ${item.category.price_unit}`
          },
          {
            iconUrl: this.icons.calender,
            value: this.getFormattedDate(order.created_at),
            span: this.$t('Selling.date')
          },
          {
            iconUrl: this.icons.coins,
            value: `${item.total_price} ${item.category.price_unit}`,
            span: this.$t('Selling.total')
          }
        ]
      } else if (['rented-out', 'rented-in'].includes(subPage)) {
        return [
          { iconUrl: this.icons.grid, value: item.order_quantity, span: '' },
          {
            iconUrl: this.icons.calenderPlus,
            value: order.start_date || '',
            span: this.$t('Selling.StartDate')
          },
          {
            iconUrl: this.icons.calenderMinus,
            value: order.end_date || '',
            span: this.$t('Selling.EndDate')
          },
          {
            iconUrl: this.icons.container,
            value: item.order_quantity,
            span: this.$t('Selling.Quantity')
          },
          {
            iconUrl: this.icons.bankNote,
            value: `${this.$t('Selling.SAR')}: ${order.itemPrice || ''}`,
            span: this.$t('Selling.PerDay')
          }
        ]
      } else if (['services-provided', 'services-availed'].includes(subPage)) {
        return [
          {
            iconUrl: this.icons.calender,
            value: this.getFormattedDate(order.created_at),
            span: this.$t('Selling.date')
          },
          {
            iconUrl: this.icons.coins,
            value: `${item.total_price} ${order.price_unit || ''}`,
            span: this.$t('Selling.total')
          }
        ]
      }
      return []
    },
    handleViewDetails(orderId: string) {
      const selectedOrder = this.orderList.find((order) => order.orderId === orderId)
      this.orderDetails = selectedOrder || null
      if (!selectedOrder) {
        console.error(`Order with ID ${orderId} not found in orderList`)
      } else {
        console.log('Selected order details:', this.orderDetails)
      }
    },
    debounce(func: Function, wait: number) {
      let timeout: number
      return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
      }
    },
    handleScroll() {
      this.debounce(() => {
        const bottomOfWindow = window.innerHeight + window.pageYOffset
        const bottomOfDocument = document.documentElement.offsetHeight
        if (bottomOfWindow >= bottomOfDocument - 1000 && !this.isLoading && this.hasMoreItems) {
          this.currentPage++
          this.fetchOrders()
        }
      }, 200)()
    },
    handleTrackingUpdate(updatedTracking: any) {
      this.fetchOrders()
    },
    async handleAutoAcceptOrders(newValue: boolean) {
      console.log('Toggle clicked, new value:', newValue)
      const fieldMap = {
        product: 'product_auto_accept',
        rental: 'rental_auto_accept',
        service: 'service_auto_accept'
      }
      const field = fieldMap[this.pageType.category]
      if (!field) return

      try {
        // Patch the business profile via store action
        const response = await this.$userStore.dispatch('patchBusinessProfile', {
          business_profile: { [field]: newValue }
        })
        // Update the local auto_accept state
        this.auto_accept = newValue
        // Safely log the updated property using optional chaining
        console.log('Store updated:', this.$userStore.state.user?.business_profile?.[field])
        console.log('API response:', response)
      } catch (error) {
        console.error('Failed to update:', error)
      }
    }
  },
  watch: {
    $route(to) {
      this.orderDetails = null
      this.currentPage = 1
      this.fetchOrders()
    },
    'pageType.auto_accept'(newVal) {
      console.log('auto_accept changed to:', newVal)
    }
  },
  mounted() {
    this.fetchOrders()
    window.addEventListener('scroll', this.handleScroll)
    this.auto_accept = this.pageType.auto_accept || false
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
})
</script>

<template>
  <!-- Order Details Modal -->
  <ListingDetailView
    v-if="orderDetails !== null"
    :orderDetails="orderDetails"
    @update:tracking="handleTrackingUpdate"
    @back="orderDetails = null"
  />

  <!-- Main Content -->
  <div v-else class="container">
    <div class="header">
      <div class="text">
        <h1>{{ pageType.title }}</h1>
        <p>{{ $t(pageType.subtitle) }}</p>
      </div>

      <!-- Auto Accept Toggle (only shown for pages with auto_accept) -->
      <div v-if="pageType.auto_accept !== undefined" class="Auto_Accept_Orders">
        <p>{{ $t('Selling.AutoAcceptOrders') }}</p>
        <ToggleButton :isActive="auto_accept" @update:isActive="handleAutoAcceptOrders" />
      </div>
    </div>

    <FilterRow />

    <!-- Order List -->
    <div class="order_list">
      <OrderCard
        v-for="order in orderList"
        :key="order.orderId"
        :order="order"
        @details="handleViewDetails(order.orderId)"
      />
    </div>

    <!-- Loading and Error Handling -->
    <div v-if="isLoading" class="loading">
      {{ $t('Selling.loading') }}
    </div>
    <div v-if="error" class="error">
      {{ error }}
      <MainBtn @click="fetchOrders">{{ $t('Selling.retry') }}</MainBtn>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  gap: 24px;
}

.header {
  display: flex;
  padding-bottom: 18px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  align-self: stretch;
  border-bottom: 0.8px solid #e7e7e7;
}
.Auto_Accept_Orders {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header .text h1 {
  font-size: 18px;
  font-weight: 600;
  color: #121212;
}

.header .text p {
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
}

.order_list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
}

@media (max-width: 768px) {
  .order_list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1200px) {
  .order_list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 1400px) {
  .order_list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
