import { useMenuForm } from "@/hooks/use-menu-form";
import { SetStateBoolean } from "./global-types";
import { CateringPackageProps } from "./package-types";

export type ServingSize = 6 | 10 | 15 | 20;

// Define the types
export type CategoryProps =
  | "Soup"
  | "Salad"
  | "Beef"
  | "Pork"
  | "Noodle"
  | "Chicken"
  | "Seafood"
  | "Vegetable"
  | "Dessert"
  | "Beverage";

export type AllergenProps =
  | "Milk"
  | "Eggs"
  | "Fish"
  | "Shellfish"
  | "Tree nuts"
  | "Peanuts"
  | "Wheat"
  | "Soybeans"
  | "Sesame"
  | "Gluten"
  | "Mustard"
  | "Celery"
  | "Lupin"
  | "Molluscs"
  | "Sulphites"
  | "Soy"
  | "Nuts";
// Update the interfaces to match the new data structure
export interface NutritionInfo {
  calories: string; // Now includes "kcal" unit
  protein: string; // Now includes "g" unit
  fat: string; // Now includes "g" unit
  carbs: string; // Now includes "g" unit
  sodium: string; // Now includes "mg" unit
  fiber: string; // Now includes "g" unit
  sugar: string; // Now includes "g" unit
  cholesterol: string; // Now includes "mg" unit
}

export interface PriceInfo {
  minimumPax: number;
  maximumPax: number;
  price: number;
  discount: number;
}

export interface MenuItem {
  id: number;
  name: string;
  category: CategoryProps;
  available: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: AllergenProps[];
  preparationMethod: string;
  prices: PriceInfo[]; // Now an array of price tiers
  regularPricePerPax: number;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  spicy: boolean;
  perServing: string; // New property for serving size
  nutritionInfo: NutritionInfo;
}

export interface MenuCardProps {
  item: MenuItem;
}

export interface PaginatedMenuProps {
  items: MenuItem[];
}

export type CalculationParams = {
  regularPricePerPax: number;
  price: number;
  servingSize: number;
};

export type StarSize = "small" | "medium" | "large";

export interface MenuDetailsDialogProps {
  item: MenuItem;
  children: React.ReactNode;
}

export interface MenuImageDialogProps {
  item: MenuItem | CateringPackageProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface CategoryBadgeProps {
  category: CategoryProps;
  size?: "small" | "medium";
}

export interface AddMenuDialogProps {
  isAddMenuOpen: boolean;
  setIsAddMenuOpen: SetStateBoolean;
}

export interface EditMenuDialogProps {
  isEditMenuOpen: boolean;
  setIsEditMenuOpen: SetStateBoolean;
  item: MenuItem;
}

export interface AddPackageDialogProps {
  isAddPackageOpen: boolean;
  setIsAddPackageOpen: SetStateBoolean;
}

export interface EditPackageDialogProps {
  isEditPackageOpen: boolean;
  setIsEditPackageOpen: SetStateBoolean;
}

export type DeleteMenuDialogProps = {
  item: MenuItem;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: SetStateBoolean;
};

export type HeaderWithAddButtonProps = {
  title: string;
  setIsAddInstanceOpen: SetStateBoolean;
};

export const allergens: AllergenProps[] = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Gluten",
  "Mustard",
  "Celery",
  "Lupin",
  "Molluscs",
  "Sulphites",
  "Soy",
  "Nuts",
];

export const predefinedPaxRanges = [
  { min: 4, max: 6 },
  { min: 8, max: 10 },
  { min: 13, max: 15 },
  { min: 18, max: 20 },
];

export const categories: CategoryProps[] = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

export const nutritionUnits = {
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbs: "g",
  sodium: "mg",
  fiber: "g",
  sugar: "g",
  cholesterol: "mg",
};

export const addMenuFormSteps = [
  {
    id: "basic-info",
    title: "Basic Info",
    description: "Enter the basic details about your menu item",
  },
  {
    id: "ingredients-allergens",
    title: "Ingredients & Allergens",
    description: "Add ingredients and select allergens present in this item",
  },
  {
    id: "preparation",
    title: "Preparation",
    description: "Describe how this menu item is prepared",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Set the pricing tiers for this menu item",
  },
  {
    id: "nutrition",
    title: "Nutrition",
    description: "Add nutrition information for this menu item",
  },
  {
    id: "image",
    title: "Image",
    description: "Upload or provide a URL for the menu item image",
  },
  {
    id: "review",
    title: "Review",
  },
];

export interface AddMenuFormProps {
  formHook: ReturnType<typeof useMenuForm>;
}
