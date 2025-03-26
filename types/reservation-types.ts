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

export type ReservationTableProps = {
  reservations: reservationType[];
  dashboard?: boolean;
};