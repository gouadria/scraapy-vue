export interface Image {
  id: string
  image: string
  is_thumbnail: boolean
}

export interface Field {
  value: string
  name: string
  type_icon: string
}
export interface License {
  id: string
  name: string
  description: string
  file: File | string
  expirationDate: string
}

export interface Item {
  id: string
  name: string
  images: Image[]
  price: number
  price_unit: string
  category: {
    id: string
    category_group: {
      id: string
      name: string
      name_ar: string
      status: string
      category_type: string
    }
    name: string
    name_ar: string
    price_unit: string
    price_unit_ar: string
    extra_field_types: Field[]
    sub_items_type: null | string
    category_type: string
  }
  category_type: string
  extra_fields: Field[]
  owner_image: string
  description: string
  quantity: string
  longitude: string
  latitude: string
  address_line1: string
  address_line2: string
  city: string
  province: string
  zip_code: string
  country: string
  owner_name: string
  on_site_pickup: boolean
  on_site_contact_name: string | null
  on_site_contact_phone: string | null
  minimum_selling_quantity: string
  status: string | null
  staff_note: string | null
  owner_id: string
  VehicleMake: string
  VehicleModel: string
  ModelYear: string
  with_driver: boolean | string
  certifications: {
    id: string
    name: string
    description: string
    approved: boolean
  }
  aramcoApproved: boolean
  maadenApproved: boolean
  scecoApproved: boolean
  isoApproved: boolean
  sabicApproved: boolean
  mwanApproved: boolean
  oshApproved: boolean
  PricePerUnit: number
  PriceChargedPer: string
  deliveryPrice: string
  auto_accept_orders: Boolean
  PriceperUnit: string
  Pricechargedper: string
  fleet: {
    id: string
    name: string
    make: string
    model: string
    modelYear: string
    withDriver: boolean
    file: File | string
    numberPlate: string
    license: License
    expirationDate: string
  }[]
}

// export interface RentalListing {
//   id?: string
//   address: string
//   categoryGroupSelection?: string
//   subCategorySelection?: string
//   latitude: string
//   longitude: string
//   ModelYear: string
//   with_driver: boolean
//   price: number
//   Pricechargedper: string
//   DeliveryPrice: number
//   fleet: Fleet
//   sub_items: Fleet[]
//   name: string
//   description: string
//   aramcoApproved: boolean
//   maadenApproved: boolean
//   scecoApproved: boolean
//   isoApproved: boolean
//   sabicApproved: boolean
//   mwanApproved: boolean
//   oshaApproved: boolean
// }
interface CategoryGroup {
  id: number
  name: string
  name_ar: string
  icon: string
  group_type: string
  status: string
}

interface Category {
  id: number
  name: string
  name_ar: string
  price_unit: string
  price_unit_ar: string | null
  extra_field_types: any[]
  sub_item_type: string
  status: string
  category_group: CategoryGroup
  legal_requirements: any[]
  hide_price: boolean
  require_contract: boolean
  contract_text: string | null
}
export interface RentalListing {
  id?: number
  name: string
  images: Image[]
  price: string
  price_unit: string
  price_after_discount: number
  category: Category
  discount: string
  mds_document: string | null
  category_type: string
  extra_fields: []
  sub_items: Fleet[]
  owner_name: string
  owner_image: string
  status: string
  description: string
  longitude: string
  latitude: string
  address_line1: string
  address_line2: string
  city: string
  province: string
  zip_code: string
  country: string
  on_site_pickup: boolean
  quantity: number | null
  minimum_selling_quantity: number
  on_site_contact_phone: string
  on_site_contact_name: string | null
  categoryGroupSelection?: string
  subCategorySelection?: string
  Pricechargedper?: string
  DeliveryPrice?: string
  aramcoApproved?: boolean
  sabicApproved?: boolean
  maadenApproved?: boolean
  scecoApproved?: boolean
  mwanApproved?: boolean
  isoApproved?: boolean
  oshaApproved?: boolean
  fleet: Fleet
  make?: string
  model?: string
  model_year?: string
  with_driver?: string  | string
}
export interface Fleet {
  id?: string
  value?: string
  numberPlate?: string
  equipmentLicenseExpiry?: string | null
  equipmentLicense?: File | null
  driversLicenseExpiry?: string | null
  driversLicense?: File | null
  driverIdExpiry?: string | null
  driverId?: File | null
  AramcoCertificateExpiry?: string | null
  AramcoCertificate?: File | null
  MaadenCertificateExpiry?: string | null
  MaadenCertificate?: File | null
  SCECOCertificateExpiry?: string | null
  SCECOCertificate?: File | null
  ISOCertificateExpiry?: string | null
  ISOCertificate?: File | null
  SabicCertificateExpiry?: string | null
  SabicCertificate?: File | null
  MwanCertificateExpiry?: string | null
  MwanCertificate?: File | null
  OSHACertificateExpiry?: string | null
  OSHACertificate?: File | null
  images?: Image[]
}

export interface Image {
  id?: string
  image: string
  is_thumbnail: boolean
}

interface FleetValidations {
  numberPlate: { required: any }
  equipmentLicenseExpiry: { required: any }
  equipmentLicense: { required: any }
  images: { required: any; minLength: any; maxLength: any }
  driversLicenseExpiry?: { required: any } // Optional
  driversLicense?: { required: any } // Optional
  driverIdExpiry?: { required: any } // Optional
  driverId?: { required: any } // Optional
  AramcoCertificateExpiry?: { required: any } // Optional
  AramcoCertificate?: { required: any } // Optional
  MaadenCertificateExpiry?: { required: any } // Optional
  MaadenCertificate?: { required: any } // Optional
  SCECOCertificateExpiry?: { required: any } // Optional
  SCECOCertificate?: { required: any } // Optional
  ISOCertificate?: { required: any } // Optional
  ISOCertificateExpiry?: { required: any } // Optional
  MwanCertificate?: { required: any } // Optional
  MwanCertificateExpiry?: { required: any }
  SabicCertificate?: { required: any }
  SabicCertificateExpiry?: { required: any }
  OSHACertificateExpiry?: { required: any }
  OSHACertificate?: { required: any }
}
interface ItemDataValidations {
  fleet: FleetValidations
}

export interface ValidationsStructure {
  itemData: ItemDataValidations
}
