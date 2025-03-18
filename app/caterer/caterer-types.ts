import { Dispatch, SetStateAction } from "react";

// Menu Item Related Props
type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string;
  image: string;
  lastUpdated: string;
  timesOrdered: number;
  inPackages: number;
  rating: number;
  likes: number;
};

export type MenuItemsProps = {
  menuItems: MenuItem[];
  setCurrentMenu: Dispatch<SetStateAction<MenuItem>>;
  setIsEditMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export type MenuInfoDialogProps = {
  currentMenu: MenuItem;
  isDetailsOpen: boolean;
  setIsDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddMenuDialogProps = {
  isAddMenuOpen: boolean;
  setIsAddMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type EditMenuDialogProps = {
  currentMenu: MenuItem;
  isEditMenuOpen: boolean;
  setIsEditMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type DeleteMenuDialogProps = {
  currentMenu: MenuItem;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export type HeaderWithAddButtonProps = {
  title: string;
  setIsAddInstanceOpen: Dispatch<SetStateAction<boolean>>;
};

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
