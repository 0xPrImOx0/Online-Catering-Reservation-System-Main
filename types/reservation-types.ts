import { useReservationForm } from "@/hooks/use-reservation-form";
import { PackageCategory, ServiceType } from "./package-types";

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
  contactNumber: string;
  eventType: string;
  eventDate: Date;
  eventTime: string;
  guestCount: number;
  venue: string;
  cateringOptions: "event" | "custom";
  serviceType: ServiceType;
  serviceHours?: string;
  selectedPackage: string;
  selectedMenus: Record<PackageCategory, Record<string, number>>;
  specialRequests?: string;
  deliveryOption: "Pickup" | "Delivery";
  deliveryAddress?: string;
  deliveryInstructions?: string;
}

export type ReservationTableProps = {
  reservations: reservationType[];
  dashboard?: boolean;
};

export interface BookNowProps {
  formHook: ReturnType<typeof useReservationForm>;
}

export type SelectcateringOptionsProps = {
  showSelectcateringOptions: boolean;
  setShowSelectcateringOptions: (open: boolean) => void;
};
