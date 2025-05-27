export interface Material {
  name: string;
  rate: number;
  currency: string;
  unit: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ScrapEstimation {
  amount: number;
  currency: string;
}