import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import { CategoryProps, MenuItem } from "@/types/menu-types";
import React from "react";

export default function CheckboxMenus({
  category,
  field,
  count,
  selectedMenus,
}: {
  category: CategoryProps;
  field: any;
  count: number;
  selectedMenus: any;
}) {
  const { handleCheckboxChange } = useReservationForm();
  // Function to get dishes by category
  const getMenusByCategory = (category: CategoryProps) => {
    return menuItems.filter((menu: MenuItem) => menu.category === category);
  };
  return (
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
                  handleCheckboxChange(checked, field, category, menu, count)
                }
              />
            </FormControl>
            <div className="grid gap-1.5">
              <Label htmlFor={menu._id} className="font-medium">
                {menu.name}
              </Label>
              <p className="text-sm text-muted-foreground">
                {menu.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedMenus[category]?.length >= count && (
        <p className="text-sm text-destructive">
          You can only select up to {count} items for {category}.
        </p>
      )}
    </div>
  );
}
