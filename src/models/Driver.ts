export interface Driver {
  id: number
  name: string
  email: string
  status: string;
  id_number: string;
  contact_number?: string | null;
  make: string;
  model: string;
  model_year: string;
  plate_number: string;
  driver_id_file?: File | string | null;
  driver_id_expiry?: string | null;
  license_file?: File | string | null;
  license_expiry?: string | null;
  vehicle_registration_file?: File | string | null;
  vehicle_registration_expiry?: string | null;
  insurance_file?: File | string | null;
  insurance_expiry?: string | null;
}
