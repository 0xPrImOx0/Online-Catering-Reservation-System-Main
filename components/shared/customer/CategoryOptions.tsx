"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ReservationValues,
  useReservationForm,
} from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import { defaultCategoryAndCount } from "@/lib/menu-select";
import { CategoryProps, MenuItem } from "@/types/menu-types";
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
import { CheckCircle } from "lucide-react";
import clsx from "clsx";

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

  // Function to get dishes by category
  const getMenusByCategory = (category: CategoryProps) => {
    return menuItems.filter((menu: MenuItem) => menu.category === category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">
          Available Categories for {currentPackage}
        </h3>
        <div className="gap-3 flex items-center">
          {categoryAndCount.map(({ category, count }) => {
            let isLimitReached =
              (selectedMenus[category]?.length || 0) >= count;
            return (
              <Badge
                variant={"outline"}
                className={clsx(
                  "",
                  isLimitReached
                    ? "bg-green-500 border-green-500 text-background space-x-2"
                    : "border-green-500 "
                )}
                key={category}
                title={
                  isLimitReached
                    ? `You have reached the limit of ${count} items for ${category}.`
                    : `You can select up to ${count} items for ${category}.`
                }
              >
                {isLimitReached && <CheckCircle className="w-4 h-4" />}
                <span className="">{`${count} ${category}`}</span>
              </Badge>
            );
          })}
        </div>
      </div>
      <FormField
        control={control}
        name="selectedMenus"
        render={({ field }) => (
          <FormItem>
            {categoryAndCount.map(({ category, count }) => (
              <div key={category} className="space-y-2">
                <FormLabel className="font-medium text-base">
                  {category} Options
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getMenusByCategory(category).map((menu) => (
                    <div key={menu._id} className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          id={menu._id}
                          checked={field.value[category]?.includes(menu._id)}
                          disabled={
                            !field.value[category]?.includes(menu._id) && // Allow unchecking
                            field.value[category]?.length >= count // Disable if limit is reached
                          }
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              checked,
                              field,
                              category,
                              menu,
                              count
                            )
                          }
                        />
                      </FormControl>
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor={`menu-${menu._id}`}
                          className="font-medium"
                        >
                          {menu.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {menu.shortDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {field.value[category]?.length >= count && (
                  <p className="text-sm text-destructive">
                    You can only select up to {count} items for {category}.
                  </p>
                )}
              </div>
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
