export interface BusinessLegalDetails {
  officialFullName: string
  registeredAddress: string
  operationalAddress?: string
  officialPhoneNumber: string
  officialEmailAddress: string
  primaryContactPerson: {
    name: string
    position: string
    contactNumber: string
    emailAddress: string
  }
  businessDocuments: {
    commercialRegistrationNumber: string
    valueAddedTaxNumber?: string
  }

  address_line1: string
  address_line2: string
  city: string
  province: string
  zip_code: string
  country: string
  legal_form: string
  latitude: string
  longitude: string
  additional_documents: []
  address: string
  cr_document: string | File | null
  cr_number: string
  id: number
  mwan_license_document: string | File | null
  mwan_license_number: string | number
  primary_contact_person_contact_number: string
  primary_contact_person_email_address: string
  primary_contact_person_name: string
  primary_contact_person_position: string
  status: string
  vat_document: string | File | null
  vat_number: string
}
