"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import { CategoryProps, MenuItem } from "@/types/menu-types";
import React, { useState } from "react";
import ImageDialog from "../ImageDialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <>
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
              <div className="flex flex-col justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"custom"}
                        variant={"link"}
                        className="font-medium max-w-fit -mt-1"
                        onClick={() => {
                          setActiveMenu(menu._id);
                          setIsImageDialogOpen(true);
                        }}
                      >
                        {menu.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-sm text-muted-foreground">
                  {menu.shortDescription}
                </p>
                {isImageDialogOpen && activeMenu === menu._id && (
                  <ImageDialog
                    item={menu}
                    isImageDialogOpen={isImageDialogOpen}
                    setIsImageDialogOpen={setIsImageDialogOpen}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {selectedMenus[category]?.length >= count && (
          <p className="text-xs text-muted-foreground italic">
            *You can only select up to {count} item/s for {category}.*
          </p>
        )}
      </div>
    </>
  );
}
