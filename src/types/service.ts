
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  provider?: string;
  rating?: number;
  reviews?: number;
  experience?: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  items: ServiceItem[];
}

export interface Appointment {
  id: string;
  service: string;
  professional: string;
  bookingDate: string;
  completionDate?: string;
  phone: string;
  status: 'Completed' | 'Scheduled' | 'Pending';
}
