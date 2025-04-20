"use client";
import { Textarea } from "@/components/ui/textarea";
import {
  ReservationValues,
  useReservationForm,
} from "@/hooks/use-reservation-form";
import { defaultCategoryAndCount } from "@/lib/menu-select";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { PackageOption } from "@/types/package-types";

import CheckboxMenus from "./CheckboxMenus";
import CategoryOptionsBadge from "./CategoryOptionsBadge";
import { menuItems } from "@/lib/menu-lists";
import { Label } from "@/components/ui/label";
import AddRemoveMenuQuantity from "./AddRemoveMenuQuantity";
import SelectServingSize from "./SelectServingSize";

export default function CategoryOptions({
  validateStep,
}: {
  validateStep: (step: number) => void;
}) {
  const { control, getValues, setValue, watch, clearErrors } =
    useFormContext<ReservationValues>();

  const selectedMenus = watch("selectedMenus");

  const cateringOptions = watch("cateringOptions");
  const selectedPackage = getValues("selectedPackage");
  const serviceFee = watch("serviceFee");
  const deliveryFee = watch("deliveryFee");

  const [currentPackage, setCurrentPackage] = useState<string>();
  const [categoryAndCount, setCategoryAndCount] = useState<PackageOption[]>(
    defaultCategoryAndCount
  );
  useEffect(() => {
    if (cateringOptions === "custom") {
      setCurrentPackage("");
      setValue("selectedPackage", "");
      clearErrors("selectedMenus");
      setCategoryAndCount(defaultCategoryAndCount);
      return;
    }
    if (selectedPackage) {
      const selectedPackageData = cateringPackages.find(
        (pkg) => pkg._id === selectedPackage
      );
      if (selectedPackageData) {
        setCurrentPackage(selectedPackageData.name);
        setCategoryAndCount(selectedPackageData.options);
      }
    }
  }, [cateringOptions, selectedPackage]);

  const getMenuItemName = (menuId: string) => {
    const menu = menuItems.find((item) => item._id === menuId);
    return menu ? menu.name : "";
  };

  return (
    <div className="space-y-6">
      {selectedPackage && (
        <div>
          <h3 className="font-medium mb-2">
            Available Categories for {currentPackage}
          </h3>

          <CategoryOptionsBadge
            categoryAndCount={categoryAndCount}
            selectedMenus={selectedMenus}
          />
        </div>
      )}
      <FormField
        control={control}
        name="selectedMenus"
        render={({ field }) => (
          <FormItem>
            {categoryAndCount.map(({ category, count }) => (
              <CheckboxMenus
                key={category}
                category={category}
                field={field}
                selectedMenus={selectedMenus}
                count={count}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
      {Object.keys(selectedMenus).length > 0 && !selectedPackage && (
        <FormField
          control={control}
          name="selectedMenus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Menu Quantity
              </FormLabel>
              <FormControl>
                <div className="space-y-6">
                  {Object.keys(field.value).map((category) => (
                    <div key={category} className="border-b pb-4">
                      <h3 className="text-md font-medium text-gray-700 mb-2">
                        {category}
                      </h3>
                      <ul className="space-y-2">
                        {Object.keys(field.value[category]).map((menu) => (
                          <li
                            key={menu}
                            className="flex items-center justify-between space-x-4"
                          >
                            <span>{getMenuItemName(menu)}</span>
                            <div className="flex space-x-2">
                              <AddRemoveMenuQuantity
                                value={field.value}
                                category={category}
                                menu={menu}
                                onChange={field.onChange}
                              />
                              <SelectServingSize
                                category={category}
                                menu={menu}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <FormField
        control={control}
        name="specialRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special requests or dietary requirements?"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {watch("totalPrice") > 0 && (
        <div className="flex justify-between items-end">
          <Label>{serviceFee && deliveryFee ? "Total" : "Partial"} Price</Label>
          <span className="text-green-500 text-2xl underline underline-offset-4">
            &#8369;{" "}
            {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
          </span>
        </div>
      )}
    </div>
  );
}
