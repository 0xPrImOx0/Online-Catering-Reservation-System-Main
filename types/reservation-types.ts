import { useReservationForm } from "@/hooks/use-reservation-form";
import { PackageCategory } from "./package-types";

//Reservation Related Types
export type reservationType = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    isRegistered: boolean;
  };
  eventDate: Date | string | number;
  totalPrice: number;
  status: string;
  createdDate: Date | null;
  guests: number;
  address: string;
  specialInstructions: string;
  items: { name: string; quantity: number; price: number }[];
  payment: {
    status: string;
    date: Date | null;
    amount: number;
  };
  isUrgent: boolean;
};

export interface ReservationItem {
  fullName: string;
  email: string;
  contactNumber: number;
  eventType: string;
  eventDate: Date;
  eventTime: string;
  guestCount: number;
  venue: string;
  serviceType: string;
  serviceHours: string;
  selectedPackage: string;
  selectedMenus: Record<PackageCategory, string[]>;
  specialRequests: string;
}

export type ReservationTableProps = {
  reservations: reservationType[];
  dashboard?: boolean;
};

export interface BookNowProps {
  formHook: ReturnType<typeof useReservationForm>;
}

export type SelectServiceModeProps = {
  showSelectServiceMode: boolean;
  setShowSelectServiceMode: (open: boolean) => void;
};
