export type CustomerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: Date;
  totalReservations: number;
  totalSpent: number;
  lastReservation: Date;
};

export type ConcernType = {
  id: string;
  customerId: string | null;
  customerName: string;
  message: string;
  submittedAt: Date;
  status: string;
  isRegistered: boolean;
};
