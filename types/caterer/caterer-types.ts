import { MenuItem } from "@/types/customer/menu-types";
import { SetStateBoolean } from "@/types/global-types";
import { Dispatch, SetStateAction } from "react";
import { CateringPackageProps, PackageCardProps } from "../customer/package-types";

//Customer Related Types
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

export type MenuItemsProps = {
  menuItem: MenuItem;
  setCurrentMenu: Dispatch<SetStateAction<MenuItem>>;
  setIsEditMenuOpen: SetStateBoolean;
  setIsDetailsOpen: SetStateBoolean;
  setIsDeleteDialogOpen: SetStateBoolean;
};

export type MenuInfoDialogProps = {
  currentMenu: MenuItem;
  isDetailsOpen: boolean;
  setIsDetailsOpen: SetStateBoolean;
  setIsEditMenuOpen: SetStateBoolean;
};

export type EditMenuDialogProps = {
  currentMenu: MenuItem;
  isEditMenuOpen: boolean;
  setIsEditMenuOpen: SetStateBoolean;
};

export type DeleteMenuDialogProps = {
  currentMenu: MenuItem;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: SetStateBoolean;
};

export type HeaderWithAddButtonProps = {
  title: string;
  setIsAddInstanceOpen: SetStateBoolean;
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

//Packages Related Props

type PackageMenuItem = {
  id: number;
  name: string;
  price: number;
};

export type PackageItem = {
  id: number;
  name: string;
  eventType: string;
  totalPrice: number;
  description: string;
  image: string;
  lastUpdated: string;
  numberOfOrders: number;
  revenueGenerated: number;
  lastOrdered: string;
  menus: PackageMenuItem[];
};

export type PackageGridModeProps = {
  cateringPackages: PackageItem[];
  setCurrentPackage: Dispatch<SetStateAction<PackageItem>>;
  setIsEditPackageOpen: SetStateBoolean;
  setIsDeleteDialogOpen: SetStateBoolean;
  setIsDetailsOpen: SetStateBoolean;
};

export type PackageDetailsProps = {
  currentPackage: PackageItem;
  isDetailsOpen: boolean;
  setIsDetailsOpen: SetStateBoolean;
  setIsEditPackageOpen: SetStateBoolean;
};

export type AddPackageDialogProps = {
  availableMenus: PackageMenuItem[];
  isAddPackageOpen: boolean;
  setIsAddPackageOpen: SetStateBoolean;
  setSelectedMenus: Dispatch<SetStateAction<number[]>>;
  selectedMenus: number[];
};

export type EditPackageDialogProps = {
  currentPackage: PackageItem;
  isEditPackageOpen: boolean;
  setIsEditPackageOpen: SetStateBoolean;
  availableMenus: PackageMenuItem[];
};

export type DeletePackageDialogProps = {
  item: CateringPackageProps;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: SetStateBoolean;
};
