import { CategoryProps } from "@/types/menu-types";
import {
  Soup,
  Salad,
  Beef,
  HamIcon as Bacon,
  SoupIcon as Noodles,
  BirdIcon as Chicken,
  Fish,
  CarrotIcon as Vegetable,
  Cake,
  Coffee,
  type LucideIcon,
} from "lucide-react";

export function getCategoryIcon(category: CategoryProps): LucideIcon {
  const icons: Record<CategoryProps, LucideIcon> = {
    Soup: Soup,
    Salad: Salad,
    Beef: Beef,
    Pork: Bacon,
    Noodle: Noodles,
    Chicken: Chicken,
    Seafood: Fish,
    Vegetable: Vegetable,
    Dessert: Cake,
    Beverage: Coffee,
  };

  return icons[category];
}
