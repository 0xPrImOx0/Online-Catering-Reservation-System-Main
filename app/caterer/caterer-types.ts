import { Dispatch, SetStateAction } from "react";

// Menu Item Related Props
export type MenuItem = {
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
