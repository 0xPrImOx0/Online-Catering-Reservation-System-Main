import { CategoryProps } from "@/types/customer/menu-types";
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

export function getCategoryBadgeColor(category: CategoryProps): string {
  const colors: Record<
    CategoryProps,
    { bg: string; text: string; border: string }
  > = {
    Soup: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      border: "border-amber-200",
    },
    Salad: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
    },
    Beef: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    Pork: {
      bg: "bg-pink-100",
      text: "text-pink-800",
      border: "border-pink-200",
    },
    Noodle: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    Chicken: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
    },
    Seafood: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    Vegetable: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-200",
    },
    Dessert: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
    },
    Beverage: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
    },
  };

  return `${colors[category].bg} ${colors[category].text} ${colors[category].border}`;
}

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
