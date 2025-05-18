<template>
  <div class="invoice" v-if="billing">
    <div class="invoice_header">
      <div class="header_text">
        <h1>{{ $t(`invoice.${billing.bill_type}`) }}</h1>
        <p>{{ $t('invoice.Invoice_No') }}: {{ billing.id }}</p>
        <p>
          {{ $t('invoice.issue_date') }}:
          <strong>{{ formatDate(billing.created_at) }}</strong>
        </p>
        <p v-if="billing.due_date">
          {{ $t('invoice.due_date') }}:
          <strong>{{ formatDate(billing.due_date) }}</strong>
        </p>
      </div>
      <div class="user_logo">
        <img src="@/assets/logo.svg?url" alt="invoice.user_logo" />
      </div>
    </div>

    <div class="invoice_details">
      <p>
        <strong>{{ $t('invoice.Customer_Name') }}</strong
        >{{ billing.buyer?.name }}
      </p>
      <p v-if="billing.buyer.contact_number">
        <strong>{{ $t('invoice.contact_number') }}</strong
        >{{ billing.buyer.contact_number }}
      </p>
      <p v-if="billing.contract_number">
        <strong>{{ $t('invoice.contract_number') }}</strong
        >{{ billing.contract_number }}
      </p>
      <p v-if="billing.buyer?.cr_number">
        <strong>{{ $t('invoice.cr') }}</strong
        >{{ billing.buyer?.cr_number }}
      </p>
      <p v-if="billing.delivery_city">
        <strong>{{ $t('invoice.national_address') }}</strong
        >{{ billing.delivery_city + ' ' + billing.delivery_province }}
      </p>

      <p v-if="billing.vat">
        <strong>{{ $t('invoice.tax_id_number') }}</strong
        >{{ billing }}
      </p>
      <p v-if="billing.cr">
        <strong>{{ $t('invoice.cr') }}</strong
        >{{ billing }}
      </p>
    </div>

    <!-- Services Section -->
    <div class="invoice_services">
      <div class="services_header">
        <div>{{ $t('invoice.service') }}</div>
        <div>{{ $t('invoice.Qty') }}</div>
        <div>{{ $t('invoice.valueexcludestax') }}</div>
        <div>{{ $t('invoice.Tax') }} %</div>
        <div>{{ $t('invoice.total') }}</div>
      </div>
      <div class="services_body">
        <div class="service_row" v-for="(item, index) in billing.items" :key="index">
          <div>{{ item.name }}</div>
          <div>{{ item.order_quantity }}</div>
          <div>{{ item.price }}</div>
          <div>15%</div>
          <div>{{ (item.price * item.quantity * 1.15).toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <div class="totals">
      <div class="total_container">
        <p>
          <strong>{{ $t('invoice.Total_before_tax') }}</strong>
          <!-- {{ billing.total_price.toFixed(2) }} -->
        </p>
        <p>
          <strong>{{ $t('invoice.discount') }}</strong
          ><span>{{ billing.total_discount }}</span>
        </p>
        <p v-if="billing?.tax_amount">
          <strong>{{ $t('invoice.Tax') }} (15%)</strong>
          {{ billing?.tax_amount.toFixed(2) }}
        </p>
        <p>
          <strong>{{ $t('invoice.total') + ' (' + $t('invoice.SAR') + ')' }}</strong>
          <span class="grand_total">{{ billing.total_with_tax.toFixed(2) }}</span>
        </p>
      </div>
    </div>

    <div class="invoice_footer">
      <div class="contact_info" v-if="companyInfo">
        <p>
          <strong>{{ companyInfo?.name }}</strong>
        </p>
        <p>
          <strong>{{ $t('invoice.cr') }} : </strong>{{ companyInfo?.business_profile.cr_number }}
        </p>
        <p>{{ companyInfo.national_address }}</p>
        <p>
          <strong>{{ $t('invoice.tax_id_number') }}: </strong
          >{{ companyInfo?.business_profile.vat_number }}
        </p>
        <p>
          <strong>{{ $t('invoice.contact_number') }}: </strong>{{ companyInfo.contact_number }}
        </p>
        <p>
          <strong>{{ $t('invoice.email') }}: </strong>{{ companyInfo.email }}
        </p>
      </div>
    </div>

    <div class="qr_code">
      <qrcode-vue :value="billing.zatca_qr" :size="122" level="H" renderAs="svg" />
      <p>This QR code is encoded as per ZATCA e-invoicing requirements</p>
      <p>
        رمز الإستجابة السريعة مشفرة بحسب متطلبات هيئة الزكاة والضريبة والجمارك للفوترة الإلكترونية
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { useStore } from 'vuex'
import type { Invoice } from '@/models/invoice'
export default defineComponent({
  components: {
    QrcodeVue
  },
  props: {
    billing: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      companyInfo: {} as Invoice,
      store: useStore(),
      mainUrl: import.meta.env.VITE_API_URL
    }
  },
  methods: {
    formatDate(inputDate: string): string {
      const date = new Date(inputDate)
      const day = date.getUTCDate()
      const month = date.getUTCMonth() + 1
      const year = date.getUTCFullYear()
      return `${month}/${day}/${year}`
    }
  },
  mounted() {
    this.companyInfo = this.$userStore.state.user
  },
  created() {
    this.companyInfo = this.$userStore.state.user
    console.log(this.companyInfo)
  }
})
</script>

<style scoped>
.header_text {
  display: flexbox;
  flex-direction: column;
  gap: 4px;
}

.invoice {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
  padding: 16px 20px;
  gap: 16px;
  box-shadow: 0px 2px 14.5px 4px rgba(0, 0, 0, 0.15);
  min-height: 800px;
  max-width: 595px;
}
.invoice_header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.invoice_header .user_logo {
  max-width: 130px;
  max-height: 50px;
}

.invoice_header .user_logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.invoice_header .header_text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.invoice_header .header_text h1 {
  color: #16171b;
  font-size: 20px;
  font-weight: 700;
}
.invoice_header .header_text p {
  color: #6e7689;
  font-size: 10px;
  font-weight: 300;
}
.invoice_header .header_text p strong {
  color: #16171b;
}
.invoice_details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  width: 100%;
}
.invoice_details p {
  border: 1px solid #f2f4f7;
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-size: 10px;
  font-weight: 300;
  align-items: center;
}
.invoice_details p strong {
  background: #f2f4f7;
  color: #16171b;
  min-width: 15%;
  font-weight: 700;
  padding: 2px;
}
.invoice_services {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.services_header {
  padding: 2px;
}
.services_header,
.service_row {
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 1fr 2fr;
  gap: 10px;
}
.services_body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.services_header {
  background-color: #f2f4f7;
  font-weight: bold;
}
.services_header div {
  color: #6e7689;
  font-size: 10px;
  font-weight: 300;
  text-align: center;
}
.services_header div:first-child {
  color: #16171b;
  font-weight: 700;
  text-align: start;
}
.service_row {
  border: 1px solid #f2f4f7;
}
.service_row div {
  padding: 2px;
  text-align: center;
  color: #16171b;
  font-size: 11px;
  font-weight: 300;
}
.service_row div:first-child {
  text-align: start;
}
.totals {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.total_container {
  background: #f2f4f7;
  width: 40%;
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
}
.total_container p {
  color: #6e7689;
  font-size: 10px;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
}
.currency {
  color: #16171b;
  font-weight: 700;
}
.invoice_footer {
  display: flex;
  justify-content: space-between;
  width: 40%;
  padding-top: 20px;
}
.contact_info.ar {
  align-items: flex-start;
}
.contact_info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}
.contact_info p {
  color: #373a43;
  font-size: 10px;
  font-weight: 300;
  text-align: right;
}
.contact_info.ar p {
  text-align: right;
}
.english .contact_info.ar p {
  text-align: left;
}

.total_container p .grand_total {
  font-size: 16px;
  font-weight: 700;
  color: #16171b;
}
.qr_code {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  align-items: flex-end;
}
.qr_code img {
  width: 100px;
  height: 100px;
}
.qr_code p {
  color: #16171b;
  font-size: 9px;
  font-weight: 300;
}

@media (max-width: 768px) {
  .invoice {
    min-height: 900px;
  }
  .invoice_footer,
  .total_container {
    width: 100%;
  }
  .total_container p .grand_total {
    font-size: 14px;
  }
  .qr_code {
    align-items: center;
    text-align: center;
  }
  .qr_code svg {
    width: 40%;
  }
}
</style>
<style>
@media print {
  .invoice {
    width: 100%;
    min-height: 100%;
    height: 100%;
  }
  .sidebar,
  .navbar,
  .navbar_mobile,
  .viewer_head {
    display: none !important;
  }
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  #invoice-template,
  #invoice-template * {
    visibility: visible;
    min-height: 100%;
  }

  #invoice-template {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .total_container {
    background: #f2f4f7;
    width: 40%;
    padding: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
