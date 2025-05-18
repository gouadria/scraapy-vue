<script lang="ts">
import { defineComponent } from 'vue'
import boxComponent from '@/components/UIElements/boxComponent.vue'
import ToggleButton from '@/components/UIElements/toggle_button.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import dropDownComponent from '@/components/UIElements/dropDownComponent.vue'
import CommonChip from '@/components/UIElements/common_chip.vue'
import { useRouter } from 'vue-router'
import servicesDetails from '@/views/management/vendor/orderDetails/servicesDetails.vue'
import type { orderDetails as OrderDetailsType } from '@/models/order'
import OrderStatusDetail from '@/components/selling/order_status_detail.vue'
export default defineComponent({
  name: 'RentedOut',
  components: {
    boxComponent,
    inputField,
    ToggleButton,
    servicesDetails,
    MainBtn,
    dropDownComponent,
    CommonChip,
    OrderStatusDetail
  },
  data() {
    return {
      orderList: [
        {
          id: 4,
          title: 'Document 1',
          order_number: '1234567890',
          OrderDate: '2022-01-01',
          status: 'Accepted',
          Cubic_Yard: 100,
          price: 1000,
          start_date: '2022-01-01',
          end_date: '2022-01-31',
          quantity: 7,
          category: 'Category 1',
          subCategory: 'Construction Waste Bin',
          weight: '100',
          OrderTime: '10:00 AM',
          FinancialDetails: [
            {
              unit: 'Stainless Steel Scrap',
              Unit_Price: 1000,
              Unit_Quantity: 10000,
              Value: 1000
            },
            {
              unit: 'Plastic Scrap',
              Unit_Price: 500,
              Unit_Quantity: 5000,
              Value: 500
            }
          ]
        },
        {
          id: 3,
          title: 'Document 1',
          order_number: '1234567890',
          OrderDate: '2022-01-01',
          status: 'Cancelled',
          Cubic_Yard: 100,
          price: 1000,
          start_date: '2022-01-01',
          end_date: '2022-01-31',
          quantity: 7,
          category: 'Category 1',
          subCategory: 'Composting Machine',
          weight: '500',
          OrderTime: '6:20 PM'
        },
        {
          id: 3,
          title: 'Document 1',
          order_number: '1234567890',
          OrderDate: '2022-01-01',
          status: 'Cancelled',
          Cubic_Yard: 100,
          price: 1000,
          start_date: '2022-01-01',
          end_date: '2022-01-31',
          quantity: 7,
          category: 'Category 1',
          subCategory: 'Composting Machine',
          weight: '500',
          OrderTime: '6:20 PM'
        },
        {
          id: 3,
          title: 'Document 1',
          order_number: '1234567890',
          OrderDate: '2022-01-01',
          status: 'Cancelled',
          Cubic_Yard: 100,
          price: 1000,
          start_date: '2022-01-01',
          end_date: '2022-01-31',
          quantity: 7,
          category: 'Category 1',
          subCategory: 'Composting Machine',
          weight: '500',
          OrderTime: '6:20 PM'
        },
        {
          id: 3,
          title: 'Document 1',
          order_number: '1234567890',
          OrderDate: '2022-01-01',
          status: 'Cancelled',
          Cubic_Yard: 100,
          price: 1000,
          start_date: '2022-01-01',
          end_date: '2022-01-31',
          quantity: 7,
          category: 'Category 1',
          subCategory: 'Composting Machine',
          weight: '500',
          OrderTime: '6:20 PM'
        }
      ] as OrderDetailsType[],
      autoAcceptOrders: false,
      searchQuery: '',
      orderdetails: null as OrderDetailsType | null,
      category: 'productSold'
    }
  },
  methods: {
    handleToggle() {
      console.log('Toggled', this.autoAcceptOrders)
    },
    documentsSearch() {
      console.log('Search Query', this.searchQuery)
    },
    SortByLatest() {
      console.log('Sort by Latest')
    },
    handleViewDetails(orderId: number) {
      this.orderdetails = this.orderList.find((order) => order.id === orderId) || null
      console.log('View Details', this.orderdetails)
    },
    goBack() {
      this.orderdetails = null
    },
    handleDelete(orderId: number) {
      console.log('Delete order with ID:', orderId)
    }
  }
})
</script>

<template>
  <!-- services Details Modal -->
  <servicesDetails
    v-if="orderdetails !== null"
    :orderDetails="orderdetails"
    @back="orderdetails = null"
    :category="category"
  />

  <!-- Main Content -->
  <div class="provideService" v-else>
    <div class="header">
      <div class="text">
        <h1>{{ $t('Selling.provideService') }}</h1>
        <p>{{ $t('Selling.provideServiceTesxt') }}</p>
      </div>
      <div class="Auto_Accept_Orders">
        <ToggleButton v-model:isActive="autoAcceptOrders" :onToggle="handleToggle" />
      </div>
    </div>
    <div class="filter_search">
      <inputField
        type="search"
        :placeholder="$t('nav.search')"
        :value="searchQuery"
        @update="searchQuery = $event"
        @input="documentsSearch"
      />
      <MainBtn type="whit" @click="SortByLatest">
        <img src="../../../assets/svg-icons/Selling/switch-vertical-01.svg" alt="switch-vertical" />
        {{ $t('Selling.SortBy') }}
      </MainBtn>
      <MainBtn type="whit">
        <dropDownComponent class="doc_dropdown_menu" :isArowIcon="true">
          <!--
        :options="options"
        @option-selected="handleOptionSelected"
        -->
          <template #button-content>
            <div class="button_text">
              <img src="../../../assets/svg-icons//Selling//filter-lines.svg" alt="filterIcon" />
              {{ $t('Selling.FilterBy') }}
            </div>
          </template>
          <template #dropdown-items>
            <!-- I Will Add Options Here...  -->
          </template>
        </dropDownComponent>
      </MainBtn>
    </div>
    <div class="order_list">
      <boxComponent v-for="order in orderList" :key="order.id">
        <template v-slot:box_content>
          <div class="order_div">
            <div class="order_status">
              <h3>{{ $t('Selling.Order') }}# {{ order.order_number }}</h3>
              <CommonChip
                :text="order.status"
                :chipType="order.status.replace(' ', '').toUpperCase()"
                :circle="false"
              />
            </div>
            <div class="divider"></div>
            <div class="order_category">
              <p>{{ order.subCategory }}</p>
            </div>
            <div class="divider"></div>
            <ul class="order_details">
              <li>
                <img src="../../../assets//svg-icons/Selling/grid-01.svg" alt="grid Icon" />
                <p>
                  {{ $t('Selling.CubicYard') }}: {{ order.Cubic_Yard }} | {{ order.weight }}
                  {{ $t('Selling.KG') }}
                </p>
              </li>
              <li>
                <img
                  src="../../../assets//svg-icons/Selling/calendar-plus-02.svg"
                  alt="start_date Icon"
                />
                <p>
                  {{ order.start_date }} <span>{{ $t('Selling.StartDate') }}</span>
                </p>
              </li>
              <li>
                <img
                  src="../../../assets//svg-icons/Selling/calendar-minus-02.svg"
                  alt="end_date Icon"
                />
                <p>
                  {{ order.end_date }} <span>{{ $t('Selling.EndDate') }}</span>
                </p>
              </li>
              <li>
                <img src="../../../assets//svg-icons/Selling/container.svg" alt="quantity Icon" />
                <p>
                  {{ order.quantity }} <span>{{ $t('Selling.Quantity') }}</span>
                </p>
              </li>
              <li>
                <img
                  src="../../../assets//svg-icons/Selling/bank-note-01.svg"
                  alt="bank-note Icon"
                />
                <p>
                  {{ $t('Selling.SAR') }}: $ {{ order.price }}
                  <span>{{ $t('Selling.PerDay') }}</span>
                </p>
              </li>
            </ul>
            <div class="divider"></div>
            <OrderStatusDetail :order="order" />
            <div class="viewDetails">
              <MainBtn type="whit" @click="handleViewDetails(order.id)">
                {{ $t('Selling.ViewDetails') }}
              </MainBtn>
            </div>
          </div>
        </template>
      </boxComponent>
    </div>
  </div>
</template>

<style scoped>
.provideService {
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
}

.order_div {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.order_status {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-between;
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
  font-size: 16px;
  font-weight: 600;
  color: #4f4f4f;
}
.order_details li p span {
  font-size: 14px;
  font-weight: 400;
  color: #b0b0b0;
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
}
@media (max-width: 768px) {
  .order_status h3 {
    font-size: 1rem;
  }

  .order_details li {
    font-size: 0.875rem;
  }

  .viewDetails {
    margin-top: 0.5rem;
  }
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
