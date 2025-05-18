<template>
  <div class="certificate-container">
    <!-- Header Section -->
    <div class="certificate_info">
      <div class="certificate_header">
        <div class="title_section">
          <div class="title">
            <h2>{{ $t('certificate.certificateTitle') }}</h2>
            <p>
              {{ certificateType ? $t('certificate.NonHazardous') : $t('certificate.Hazardous') }}
            </p>
          </div>
          <ul class="certificate_numb">
            <li>
              <span>{{ $t('certificate.CertificateNo') }}</span> : {{ certificateData.certNumber }}
            </li>
            <li>
              <span>
                {{ $t('certificate.issuedDate') }}
              </span>
              :
              {{ formatDate(new Date(certificateData.Date)) }}
            </li>
          </ul>
        </div>
        <div class="logo_section">
          <div class="logo-icon" @click="$router.push({ name: 'home' })">
            <img src="@/assets/svg-icons/logo-sqaure.svg?url" alt="logo" />
          </div>
          <div class="logo-name-container">
            <div v-if="$i18n.locale === 'en'" class="logo-name">
              <img src="@/assets/svg-icons/logo-name.svg?url" alt="logo" />
            </div>

            <div v-if="$i18n.locale === 'ar'" class="logo-name">
              <img src="@/assets/svg-icons/logo-name-ar.svg?url" alt="logo" />
            </div>
          </div>
        </div>
      </div>

      <!-- Certificate Info -->
      <div class="info-grid">
        <div class="grid-row" v-for="(item, index) in certificateInfo" :key="index">
          <div class="grid-label">{{ item.label }}</div>
          <div class="grid-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <EasyDataTable
      v-if="items && items.length > 0"
      :headers="headers"
      :items="items"
      :rows-per-page="1"
      :hide-footer="true"
      table-class-name="customize-table"
      border-cell
    />

    <footer class="footer">
      <div class="qr_code">
        <!-- <img src="@/assets/svg-icons/qr-code.svg?url" alt="QR code" /> -->
      </div>
      <div class="footer-text">
        <p>
          {{ $t('certificate.bahidName') }}
        </p>
        <p>
          <span>{{ $t('certificate.cr') }}</span> 9517536482
        </p>
        <p>
          <span>{{ $t('certificate.Address') }}</span>
        </p>
        <p>
          <span>{{ $t('certificate.Phone') }}</span> +966 123456789
        </p>
        <p>
          <span>{{ $t('certificate.Email') }} </span> Contact@scraapy.sa
        </p>
        <p>
          <span>{{ $t('certificate.Website') }}</span> scraapy.sa
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

interface CertificateData {
  certNumber: string
  generator: string
  agreementNumber: string
  location: string
  mobile: string
  vehicleRegistration: string
  unit: string
  weight: string
  qasNumber: string
  productName: string
  Date: string
}

export default defineComponent({
  name: 'CertificateInfo',
  components: {
    EasyDataTable
  },
  props: {
    certNumber: {
      type: String,
      default: 'HWDCOI-2025/00'
    },
    agreementNumber: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    weight: {
      type: String,
      default: ''
    },
    qasNumber: {
      type: String,
      default: ''
    },
    productName: {
      type: String,
      default: ''
    },
    Date: {
      type: String,
      default: ''
    },
    certificateType: {
      type: Boolean,
      default: false
    },
    ContainerMaterials: {
      type: String,
      default: ''
    },
    Treatment: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      headers: [
        { text: 'Product name', value: 'Productname' },
        { text: 'Physical Form', value: 'PhysicalForm' },
        { text: 'CAS#', value: 'CAS' },
        { text: 'Container Material', value: 'ContainerMaterial' },
        { text: 'Weight of Waste', value: 'Weight' },
        { text: 'Unit', value: 'Unit' },
        { text: 'Treatment', value: 'Treatment' }
      ],
      items: [
        {
          Productname: this.data.name,
          PhysicalForm: this.data.id,
          CAS: 30,
          ContainerMaterial: 'G',
          Weight: 20,
          Unit: 'Davidson',
          Treatment: 'Dispose'
        }
      ]
    }
  },
  computed: {
    certificateData() {
      return {
        certNumber: this.certNumber,
        agreementNumber: this.agreementNumber,
        location: this.location,
        mobile: this.mobile,
        unit: this.unit,
        weight: this.weight,
        qasNumber: this.qasNumber,
        productName: this.productName,
        Date: this.Date,
        ContainerMaterials: this.ContainerMaterials ?? '',
        Treatment: this.Treatment
      }
    },
    certificateInfo() {
      return [
        { label: 'Certificate No. ', value: this.certificateData.certNumber },
        { label: 'Date', value: this.certificateData.Date },
        { label: 'Agreement Number', value: this.certificateData.agreementNumber },
        { label: 'Location', value: this.certificateData.location },
        { label: 'Mobile #', value: this.certificateData.mobile }
      ]
    },
    productTable() {
      return [
        { value: this.certificateData.productName },
        { value: this.certificateData.qasNumber },
        { value: this.certificateData.unit },
        { value: this.certificateData.ContainerMaterials },
        { value: this.certificateData.weight },
        { value: this.certificateData.unit },
        { value: this.certificateData.Treatment }
      ]
    }
  },
  methods: {
    formatDate(date: Date): string {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  }
})
</script>

<style scoped>
.certificate-container {
  max-width: 1200px;
  /* overflow: scroll; */
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
}
.certificate_info {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.certificate_header {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 14px;
  justify-content: space-between;
  padding: 16px;
}
.title_section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.title_section h2 {
  font-size: clamp(0.75rem, -0.0568rem + 3.4091vw, 1.5rem);
  font-weight: 600;
  color: #16171b;
}
.title_section p {
  font-size: clamp(0.75rem, -0.0227rem + 2.6136vw, 1.25rem);
  font-weight: 600;
  color: #6d6d6d;
}
.certificate_header .logo_section {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
}
.certificate_numb {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style-type: none;
  padding: 0;
}
.certificate_numb li {
  font-size: clamp(0.75rem, -0.1136rem + 1.8182vw, 0.85rem);
  color: #16171b;
  font-weight: 400;
}
.certificate_numb li span {
  font-size: clamp(0.75rem, -0.1136rem + 1.8182vw, 0.85rem);
  color: #6e7689;
  font-weight: 300;
}
/* Info Grid */
.info-grid {
  display: flex;
  flex-direction: column;
  gap: 10.42px;
}

.grid-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: #fff;
  gap: 10px;
  width: 100%;
}

.grid-label,
.grid-value {
  padding: clamp(0.75rem, 1.364vw - 0.023rem, 0.85rem);
  font-size: clamp(0.75rem, -0.1136rem + 1.8182vw, 0.85rem);
  display: flex;
  align-items: center;
}

.grid-label {
  border-radius: 2px;
  background: #f2f4f7;
  color: #16171b;
  font-weight: 600;
}
.grid-value {
  border-radius: 2px;
  background: #fff;
  color: #16171b;
  font-weight: 400;
  border: 2.084px solid #f2f4f7;
}

/* Table */
.logo-name img {
  width: clamp(2.75rem, 6.477vw - 0.045rem, 4.3rem);
}
.logo-icon img {
  width: clamp(2.25rem, 6.477vw - 0.045rem, 4.3rem);
}
.customize-table {
  --easy-table-border: 1px solid #dee2e6;
  --easy-table-row-border: 1px solid #dee2e6;
  --easy-table-header-background-color: #136a83;
  --easy-table-header-font-color: #fff;
  --easy-table-header-height: 50px;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: clamp(0.75rem, -0.1136rem + 1.8182vw, 0.85rem);
  --easy-table-header-font-size: clamp(0.75rem, -0.1136rem + 1.8182vw, 0.85rem);
  --easy-table-header-font-weight: 700;
  --easy-table-body-row-font-color: #424242;
  --easy-table-body-row-background-color: #fff;
  --easy-table-body-row-hover-background-color: #f5f5f5;
  --easy-table-border-radius: 20px;
  border-radius: 10px 10px;
  border-bottom: 0;
}
/* Footer */
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 100px;
}
.footer-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.footer-text p {
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-text p,
.footer-text p span {
  font-size: clamp(0.5rem, -0.0682rem + 1.5909vw, 0.85rem);
  font-weight: 400;
  color: #6e7689;
}
.footer-text p {
  color: #373a43;
}
</style>
