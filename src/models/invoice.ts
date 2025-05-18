export interface tenant {
  id: string
  name: string
  contact: string
  rentalPeriod: string
  contractNumber: string
  address: string
  vat_number: string
  commercial_registration: string
}

export interface Service {
  name: string
  quantity: number
  unitPrice: number
  taxRate: number
  total: number
  price: number
}

export interface Invoice {
  id: string
  company_logo?: string
  uploaded_by?: string
  tenant: tenant
  contract_number?: string
  title?: string
  total_price: number
  discount_on_total: number
  tax_amount: number
  total_with_tax: number
  type: string
  services: Service[]
  status: string
  issue_date: string
  due_date: string
  uploaded_at: string
  tax_id_number: number
  discount: number
  zatca_qr: string
  invoice_number: string
  isDue: boolean
  national_address: string
  notes: string
  related_to: string
}
