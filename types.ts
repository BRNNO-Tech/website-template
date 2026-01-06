
export enum PackageType {
  EXTERIOR = 'EXTERIOR',
  INTERIOR = 'INTERIOR',
  FULL = 'FULL',
  ADDON = 'ADDON'
}

export interface DetailPackage {
  id: string;
  name: string;
  type: PackageType;
  price: string;
  description: string;
  features: string[];
  image: string;
}

export interface BookingDetails {
  customerName: string;
  email: string;
  phone: string;
  carInfo: string;
  serviceId: string;
  date: string;
  message?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  before: string;
  after: string;
  category: 'Interior' | 'Exterior' | 'Paint Correction';
}
