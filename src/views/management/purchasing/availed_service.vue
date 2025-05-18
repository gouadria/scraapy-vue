<script lang="ts">
import { defineComponent } from 'vue'

// Component imports
import boxComponent from '@/components/UIElements/boxComponent.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import dropDownComponent from '@/components/UIElements/dropDownComponent.vue'
import CommonChip from '@/components/UIElements/common_chip.vue'
import orderDetails from '@/views/management/selling/orderDetails/productDetails.vue'
import OrderStatusDetail from '@/components/selling/order_status_detail.vue'
import OrderDetailList from '@/components/UIElements/OrderDetailsList.vue'

// Icons
import CalenderIcon from '@/assets/svg-icons/Selling/calendar.svg'
import CoinsIcon from '@/assets/svg-icons/Selling/coins_icon.svg'
import BankNoteIcon from '@/assets/svg-icons/Selling/bank-note-01.svg'
import ContainerIcon from '@/assets/svg-icons/containerIcon.vue'

// Types
import type { orderDetails as OrderDetailsType, items } from '@/models/order'

interface Option {
  value: string
  label: string
}

export default defineComponent({
  name: 'RentedOut',
  components: {
    boxComponent,
    inputField,
    orderDetails,
    MainBtn,
    dropDownComponent,
    CommonChip,
    OrderStatusDetail,
    OrderDetailList
  },
  data() {
    return {
      // Order-related state
      orderList: [] as OrderDetailsType[],
      orderDetails: null as OrderDetailsType | null,
      category: 'productSold',

      // Search and filter state
      searchQuery: '',
      searchTimeout: null as NodeJS.Timeout | null,
      selectedFilter: '',
      selectedSort: 'latest',

      // Pagination state
      currentPage: 1,
      itemsPerPage: 12,
      hasMoreItems: true,

      // Loading and error state
      isLoading: false,
      error: null as string | null,

      // Icons
      icons: {
        calender: CalenderIcon,
        coins: CoinsIcon,
        bankNote: BankNoteIcon,
        container: ContainerIcon
      },

      // Dropdown options
      sortOptions: [
        { value: 'latest', label: this.$t('sortOptions.latest') },
        { value: 'oldest', label: this.$t('sortOptions.oldest') }
        // { value: 'priceLow', label: this.$t('sortOptions.priceLow') },
        // { value: 'priceHigh', label: this.$t('sortOptions.priceHigh') }
      ] as Option[],

      filterOptions: [
        { value: '', label: this.$t('filterOptions.All') },
        { value: 'pending', label: this.$t('filterOptions.Pending') },
        // { value: 'accepted', label: this.$t('filterOptions.accepted') },
        // { value: 'rejected', label: this.$t('filterOptions.Rejected') },
        // { value: 'completed', label: this.$t('filterOptions.Completed') },
        // { value: 'cancelled', label: this.$t('filterOptions.Cancelled') },
        { value: 'paid', label: this.$t('filterOptions.paid') },
        { value: 'notpaid', label: this.$t('filterOptions.notpaid') }
      ] as Option[]
    }
  },
  methods: {
    // Fetch orders with advanced filtering and pagination
    async fetchOrders() {
      if (this.isLoading) return

      this.isLoading = true
      this.error = null

      try {
        const params = {
          group_type: 'service',
          page: this.currentPage,
          query: this.searchQuery,
          status: this.selectedFilter,
          sort: this.selectedSort,
          per_page: this.itemsPerPage
        }
        const fullUrl = `${this.$axios.defaults.baseURL}api/billing/orders/?${new URLSearchParams(params).toString()}`
        console.log('Request URL:', fullUrl)

        const response = await this.$axios.get('api/billing/orders/', { params })
        const data = response.data.results
        console.log(response)
        // Transform the data to include items with order details
        const transformedOrders = data.flatMap((order: OrderDetailsType) => {
          return order.items.map((item: items) => ({
            // Order-level data
            orderId: order.id,
            buyer: order.buyer,
            status: order.status,
            createdAt: order.created_at,
            paymentDate: order.payment_date,
            deliveryAddress: `${order.delivery_address_line1}, ${order.delivery_address_line2}`,
            deliveryCity: order.delivery_city,
            deliveryCountry: order.delivery_country,
            // Item-level data
            itemId: item.id,
            itemName: item.name,
            itemPrice: item.price,
            itemCategory: item.category.name,
            itemCategory_ar: item.category.name_ar,
            itemQuantity: item.order_quantity,
            itemDescription: item.description,
            payment_date: this.getFormattedDate(order.payment_date),
            payment_time: this.getFormattedTime(order.payment_date),
            payment_id: order.payment_id,
            price_unit: item.category.price_unit,
            total_price: item.total_price,
            total_discount: item.total_discount,
            availableQuantity: item.quantity,
            createOrderTime: this.getFormattedTime(order.created_at),
            createOrderDate: this.getFormattedDate(order.created_at)
          }))
        })

        // Update order list with pagination logic
        if (this.currentPage === 1) {
          this.orderList = transformedOrders
        } else {
          this.orderList = [...this.orderList, ...transformedOrders]
        }

        console.log(this.orderList)
        this.hasMoreItems = data.length === this.itemsPerPage
      } catch (err) {
        this.error = 'Failed to fetch data. Please try again.'
        console.error('API Error:', err)
      } finally {
        this.isLoading = false
      }
    },
    getFormattedDate(dateTimeString: any) {
      const date = new Date(dateTimeString)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    getFormattedTime(dateTimeString: any) {
      const date = new Date(dateTimeString)
      const hours = date.getHours()
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const formattedHours = hours % 12 || 12
      return `${formattedHours}:${minutes} ${ampm}`
    },
    // Debounced search method
    handleSearch() {
      // Clear existing timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      // Debounce search
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1
        this.orderList = []
        this.fetchOrders()
      }, 300)
    },

    // Sort order handler
    handleSortOrder(option: Option) {
      this.selectedSort = option.value
      this.currentPage = 1
      this.orderList = []
      this.fetchOrders()
    },

    // Filter order handler
    handleFilterOrder(option: Option) {
      this.selectedFilter = option.value
      this.currentPage = 1
      this.orderList = []
      this.fetchOrders()
    },

    // View order details
    handleViewDetails(orderId: number) {
      this.orderDetails = this.orderList.find((order) => order.id === orderId) || null
    },

    // Go back from order details
    goBack() {
      this.orderDetails = null
    },

    // Scroll-based pagination
    handleScroll() {
      const bottomOfWindow = window.innerHeight + window.pageYOffset
      const bottomOfDocument = document.documentElement.offsetHeight

      if (bottomOfWindow >= bottomOfDocument - 1000 && !this.isLoading && this.hasMoreItems) {
        this.currentPage++
        this.fetchOrders()
      }
    },

    // Retry fetch on error
    retryFetch() {
      this.fetchOrders()
    }
  },
  watch: {
    // Watch search query for automatic searching
    searchQuery() {
      this.handleSearch()
    }
  },
  mounted() {
    // Fetch initial orders and add scroll listener
    this.fetchOrders()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    // Clean up scroll listener and search timeout
    window.removeEventListener('scroll', this.handleScroll)
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
  },
  activated() {
    // Rehydrate data if component is cached and list is empty
    if (this.orderList.length === 0) {
      this.fetchOrders()
    }
  }
})
</script>

<template>
  <!-- Order Details Modal -->
  <orderDetails
    v-if="orderDetails !== null"
    :orderDetails="orderDetails"
    @back="orderDetails = null"
    :category="category"
  />

  <!-- Main Content -->
  <div v-else class="rentedOut">
    <div class="header">
      <div class="text">
        <h1>{{ $t('Selling.products_sold') }}</h1>
        <p>{{ $t('Selling.products_sold_description') }}</p>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="filter_search">
      <inputField
        type="search"
        :placeholder="$t('nav.search')"
        :value="searchQuery"
        @update="searchQuery = $event"
        @input="handleSearch"
      />

      <!-- Sort Dropdown -->
      <MainBtn type="white">
        <dropDownComponent
          class="doc_dropdown_menu"
          :options="sortOptions"
          @option-selected="handleSortOrder"
        >
          <template #button-content>
            <div class="button_text">
              <img src="@/assets/svg-icons/Selling/filter-lines.svg?url" alt="sort icon" />
              {{ $t('Selling.SortBy') }}
            </div>
          </template>
        </dropDownComponent>
      </MainBtn>

      <!-- Filter Dropdown -->
      <MainBtn type="white">
        <dropDownComponent
          class="doc_dropdown_menu"
          :options="filterOptions"
          @option-selected="handleFilterOrder"
        >
          <template #button-content>
            <div class="button_text">
              <img
                src="@/assets/svg-icons/Selling/switch-vertical-01.svg?url"
                alt="filter icon"
              />
              {{ $t('Selling.FilterBy') }}
            </div>
          </template>
        </dropDownComponent>
      </MainBtn>
    </div>

    <!-- Order List -->
    <div class="order_list">
      <boxComponent v-for="order in orderList" :key="order.id">
        <template #box_content>
          <div class="order_div">
            <div class="order_status">
              <h3>{{ $t('Selling.Order') }}# {{ order.orderId.slice(-6) }}</h3>
              <CommonChip
                :text="order.status"
                :chipType="order.status.replace(' ', '').toUpperCase()"
                :circle="false"
              />
            </div>
            <div class="divider"></div>
            <div class="order_category">
              <p>
                {{ this.$i18n.locale === 'ar' ? order?.itemCategory_ar : order?.itemCategory }}
              </p>
            </div>
            <div class="divider"></div>

            <OrderDetailList
              :details="[
                {
                  iconUrl: icons.container,
                  value: `${order.itemQuantity} `,
                  span: $t('Selling.Quantity')
                },
                {
                  iconUrl: icons.bankNote,
                  value: `${order.itemPrice}`,
                  span: `${$t('Selling.per')} ${order.price_unit}`
                },
                {
                  iconUrl: icons.calender,
                  value: order.createOrderDate,
                  span: $t('Selling.date')
                },
                {
                  iconUrl: icons.coins,
                  value: `${order.total_price} ${order.price_unit}`,
                  span: $t('Selling.total')
                }
              ]"
            />
            <div class="divider"></div>
            <OrderStatusDetail :order="order" />
            <div class="viewDetails">
              <MainBtn type="white" @click="handleViewDetails(order.id)">
                {{ $t('Selling.ViewDetails') }}
              </MainBtn>
            </div>
          </div>
        </template>
      </boxComponent>
    </div>

    <!-- Loading and Error Handling -->
    <div v-if="isLoading" class="loading">
      {{ $t('common.loading') }}
    </div>
    <div v-if="error" class="error">
      {{ error }}
      <MainBtn @click="retryFetch">{{ $t('common.retry') }}</MainBtn>
    </div>
  </div>
</template>

<style scoped>
.rentedOut {
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
.filter_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}
.button_text {
  display: flex;
  align-items: center;
  gap: 4px;
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
  .order_div {
    justify-content: space-between;
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
.order_div {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.order_status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.order_status h3 {
  color: #4f4f4f;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.order_category {
  color: #121212;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.order_details {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order_details li {
  display: flex;
  height: 25px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}

.order_details li p {
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.order_details li p span {
  color: #b0b0b0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.order_details li img {
  width: 24px;
  height: 24px;
}
.order_action {
  display: flex;
  gap: 8px;
}
.order_action button:first-child {
  width: 30%;
}
.order_action button {
  width: 100%;
}
.viewDetails button {
  display: flex;
  width: 100%;
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>
<style>
.filter_search .input-item {
  width: 100%;
}
.filter_search .dropdown_menu {
  top: 170%;
  right: -20px;
}
</style>
