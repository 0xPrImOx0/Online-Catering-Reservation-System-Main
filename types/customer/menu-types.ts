import { SetStateBoolean } from "../global-types";

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
  item: MenuItem;
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
