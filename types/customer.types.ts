import { MenuItem } from "@/types/menu-types";
import { SetStateBoolean } from "@/types/global-types";
import { Dispatch, SetStateAction } from "react";

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
