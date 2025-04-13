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
import { Badge } from "@/components/ui/badge";
import { PackageOption } from "@/types/package-types";

import CheckboxMenus from "./CheckboxMenus";
import CategoryOptionsBadge from "./CategoryOptionsBadge";

export default function CategoryOptions() {
  const { control, getValues, watch } = useFormContext<ReservationValues>();
  const { handleCheckboxChange } = useReservationForm();
  const selectedMenus = watch("selectedMenus");
  const selectedPackage = getValues("selectedPackage");
  const [currentPackage, setCurrentPackage] = useState<string>();
  const [categoryAndCount, setCategoryAndCount] = useState<PackageOption[]>(
    defaultCategoryAndCount
  );

  useEffect(() => {
    if (selectedPackage) {
      const selectedPackageData = cateringPackages.find(
        (pkg) => pkg._id === selectedPackage
      );
      if (selectedPackageData) {
        setCurrentPackage(selectedPackageData.name);
        setCategoryAndCount(selectedPackageData.options);
      }
    }
  }, [selectedPackage]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">
          Available Categories for {currentPackage}
        </h3>
        <CategoryOptionsBadge
          categoryAndCount={categoryAndCount}
          selectedMenus={selectedMenus}
        />
      </div>
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
    </div>
  );
}
