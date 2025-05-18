export interface buyer {
  id: number
  name: string
  email: string
  cr_number: string
  contact_number: string
}

export interface items {
  id: number
  name: string
  name_ar: string
  description: string
  price: string
  quantity: number
  order_quantity: string
  on_site_pickup: boolean
  category: {
    id: number
    name: string
    name_ar: string
    extra_field_types: any[]
    price_unit: string
  }
  sub_item_type: null | string
  extra_fields: any[]
  extra_field_types: any[]
  mds_document: null | string
  itemPrice: string
  total_price: number
  total_discount: number
  payment_time: string
  address_line1: string
  address_line2: string
}

export interface orderDetails {
  id: number
  orderId: string
  title: string
  order_number: string
  OrderDate: string
  status: string
  Cubic_Yard: number
  price: number
  start_date: string
  end_date: string
  quantity: number
  category: string
  subCategory: string
  weight: string
  OrderTime: string
  payment_date: string
  payment_id: string
  zatca_qr: string
  is_delivery: boolean
  buyer: buyer
  items: items[]
  itemCategory: string
  itemCategory_ar: string
  created_at: string
  delivery_address_line1: string
  delivery_address_line2: string
  delivery_city: string
  delivery_country: string
  province: string
  zip_code: string
  price_unit: string
  tax_amount: number
  total_discount: number
  total_price: number
  total_price_after_discount: number
  total_with_tax: number
  createOrderTime: string
  createOrderDate: string
  itemQuantity: string
  availableQuantity: string
  deliveryCity: string
  deliveryAddress: string
  deliveryCountry: string
  deliveryProvince: string
  deliveryZipCode: string
  itemName: string
  bill_type: string
  tracking: {
    status: string
    steps: {
      [key: string]: string
    }[]
  }[]
  longitude: string
  latitude: string
}
