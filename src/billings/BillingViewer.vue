<script lang="ts">
import FileIcon from '@/assets/svg-icons/FileIcon.vue'
import type { Invoice } from '@/models/invoice'
import noDataBox from '@/components/UIElements/no_data_box.vue'
import invoiceTemplate from './invoiceTemplate.vue'
import { defineComponent } from 'vue'
import GlobalNavigation from '@/components/Documents/GlobalNavigation.vue'
import ActionsComponent from '@/components/Documents/ActionsComponent.vue'
import { toast } from 'vue3-toastify'

import { generatePDF } from '@/views/utils/pdfUtils'

// Local instruction
interface DropdownOption {
  value: string
  text: string
}

export default defineComponent({
  name: 'BillingViewer',

  components: {
    noDataBox,
    GlobalNavigation,
    ActionsComponent,
    invoiceTemplate
  },

  props: {
    billing: {
      type: Object as () => Invoice,
      required: true
    }
  },

  emits: ['goBackToList'],

  data() {
    return {
      config: {
        secondaryToolbar: false,
        toolbar: false,
        sidebar: false,
        pageScale: false,
        billing: {} as Invoice
      },
      selectedBilling: this.billing || ({} as Invoice),
      dropdownOptions: [] as DropdownOption[],
      FileIcon: FileIcon,
      user_lang: this.$i18n.locale,
      baseURL: import.meta.env.VITE_API_URL
    }
  },
  watch: {
    billing: {
      immediate: true,
      handler(newVal: Invoice) {
        this.selectedBilling = newVal || ({} as Invoice)
      }
    }
  },
  computed: {
    isBilling(): boolean {
      return this.billing && Object.keys(this.billing).length > 0
    }
  },

  methods: {
    goBackToList(): void {
      this.$emit('goBackToList')
    },

    // Download the Selected Billing
    async downloadInvoice(): Promise<void> {
      try {
        // Find the element to convert to PDF
        const printElement = document.getElementById('printMe')
        console.log(printElement)
        if (!printElement) {
          toast.error(this.$t('billing.downloadError'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }

        // Generate PDF
        const pdf = await generatePDF.fromHTML(
          printElement,
          `invoice_${this.selectedBilling.id}.pdf`
        )

        // Save PDF
        pdf.save(`invoice_${this.selectedBilling.id}.pdf`)

        // Optional: Show success toast
        toast.success(this.$t('billing.downloadSuccess'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      } catch (error) {
        console.error('Error downloading billing:', error)
        toast.error(this.$t('billing.downloadError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      }
    },

    // Print the Invoice
    async printInvoice() {
      try {
        const printElement = document.getElementById('printMe')
        if (!printElement) {
          toast.error(this.$t('billing.downloadError'), {
            position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
            autoClose: 3000
          })
          return
        }

        // Temporary solution to force single page print
        const originalStyle = printElement.getAttribute('style') || ''
        printElement.setAttribute(
          'style',
          `
      ${originalStyle};
      width: 100%;
      max-width: 210mm;
      overflow: hidden;
      page-break-inside: avoid !important;
    `
        )
        // Trigger print
        window.print()

        // Restore original style
        printElement.setAttribute('style', originalStyle)
      } catch (error) {
        console.error('Error printing invoice:', error)
        toast.error(this.$t('billing.printError'), {
          position: this.$i18n.locale === 'ar' ? 'top-left' : 'top-right',
          autoClose: 3000
        })
      }
    }
  }
})
</script>

<template>
  <div class="billing-viewer">
    <div class="no_billing" v-if="!billing">
      <noDataBox
        title="No Billings"
        buttonText="Create New"
        :buttonClick="() => {}"
        :icon="FileIcon"
      />
    </div>
    <div class="is_billing" v-else>
      <div class="viewer_head">
        <GlobalNavigation
          :title="billing.items[0].name || 'Unknown Tenant'"
          :renter-name="billing.id || 'Unknown Title'"
          @goBackToList="goBackToList"
          class="no-print"
        />
        <ActionsComponent
          @triggerPrint="printInvoice"
          @downloadBillings="downloadInvoice"
          class="no-print"
        />
      </div>

      <div :dir="user_lang" class="print-container">
        <invoice-template :billing="billing" id="printMe" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.billing-viewer {
  width: 100%;
  background-color: #fff;
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  height: 100%;
}
.no_billing {
  display: flex;
  align-items: center;
  justify-content: center;
}
.is_billing {
  height: 100%;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.print-container {
  max-height: 100%;
  padding: 16px;
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
<style>
.dropdown_menu .option {
  padding: 10px 6px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.dropdown_menu .option:hover {
  background: #f9fafb;
}
#invoice-template[dir='ar'] {
  direction: rtl;
  text-align: right;
}
#invoice-template[dir='en'] {
  direction: ltr;
  text-align: left;
}
.share_doc_modal .modal-content {
  max-width: 360px;
  padding: 30px 20px;
}
.viewer_head {
  display: flex;
  flex-direction: column;
  /* overflow-x: scroll; */
}
@media (max-width: 1200px) {
  .viewer_head {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 12px;
  }
  .print-container {
    overflow-y: scroll;
  }
}
@media (max-width: 768px) {
  .print-container {
    overflow: scroll;
  }
}
@media print {
  .print-container {
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .nav-container {
    display: none !important;
  }
  .Toastify__toast {
    display: none !important;
  }
}
</style>
