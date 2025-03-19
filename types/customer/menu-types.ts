export type ServingSize = 30 | 50 | 100;

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

export interface MenuItem {
  id: number;
  name: string;
  category: CategoryProps[];
  available: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: string[];
  preparationMethod: string;
  prices: {
    [key in ServingSize]: number;
  };
  regularPricePerPax: number;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  spicy: boolean;
  nutritionalInfo: {
    [key: string]: string;
  };
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
