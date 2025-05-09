import Menu from "@schemas/menu.schema.js";
import { CreateMenuProps, UpdateMenuByIdProps } from "@TStypes/menu.type.js";

export const createMenu: CreateMenuProps = async (data) => {
  const payload = {
    name: data.name,
    category: data.category,
    available: data.available,
    spicy: data.spicy,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    ingredients: data.ingredients,
    allergens: data.allergens,
    preparationMethod: data.preparationMethod,
    regularPricePerPax: data.regularPricePerPax,
    prices: data.prices,
    imageUrl: data?.imageUrl,
    perServing: data.perServing,
    nutritionInfo: data?.nutritionInfo,
  };

  return await Menu.create(payload);
};

export const updateMenuById: UpdateMenuByIdProps = async (id, data) => {
  const updatedData = {
    name: data.name,
    category: data.category,
    available: data.available,
    spicy: data.spicy,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    ingredients: data.ingredients,
    allergens: data.allergens,
    preparationMethod: data.preparationMethod,
    regularPricePerPax: data.regularPricePerPax,
    prices: data.prices,
    imageUrl: data.imageUrl,
    perServing: data.perServing,
    nutritionInfo: data.nutritionInfo,
  };

  return await Menu.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};
