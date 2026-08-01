export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge?: string;
  commonTreatments: string[];
  avgTime: string;
  selfPayPrice: string;
}

export interface InsuranceProvider {
  name: string;
  logoText: string;
  accepted: boolean;
  notes: string;
  category: 'Commercial' | 'Government' | 'Exchange';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  reason: string;
  insurance: string;
  patientType: 'new' | 'returning';
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  phone: string;
  formattedPhone: string;
  address: string;
  suite: string;
  cityStateZip: string;
  fullAddress: string;
  hours: string;
  googleMapsEmbedUrl: string;
  googleMapsDirUrl: string;
  formspreeEndpoint: string;
  currentWaitMinutes: number;
}
