import { CategoryProps } from "@/types/customer/menu-types";

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

type AllergenProps = {
  id: string;
  text: string;
};

export const allergens: AllergenProps[] = [
  { id: "1", text: "Milk" },
  { id: "2", text: "Eggs" },
  { id: "3", text: "Fish" },
  { id: "4", text: "Shellfish" },
  { id: "5", text: "Tree nuts" },
  { id: "6", text: "Peanuts" },
  { id: "7", text: "Wheat" },
  { id: "8", text: "Soybeans" },
  { id: "9", text: "Sesame" },
  { id: "10", text: "Gluten" },
  { id: "11", text: "Mustard" },
  { id: "12", text: "Celery" },
  { id: "13", text: "Lupin" },
  { id: "14", text: "Molluscs" },
  { id: "15", text: "Sulphites" },
  { id: "16", text: "Soy" },
  { id: "17", text: "Nuts" },
];

export const selectorItems = [
  { value: "default", title: "Default" },
  { value: "name-asc", title: "Name (A-Z)" },
  { value: "name-desc", title: "Name (Z-A)" },
  { value: "price-asc", title: "Price (Low - High)" },
  { value: "price-desc", title: "Price (High - Low)" },
  { value: "ordered-desc", title: "Most Ordered" },
  { value: "ordered-asc", title: "Least Ordered" },
];
