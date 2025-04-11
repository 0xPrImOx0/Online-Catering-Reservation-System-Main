"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import { categories } from "@/lib/menu-select";
import { CategoryProps, MenuItem } from "@/types/menu-types";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
// import axios from "axios";
// import { useEffect, useState } from "react";

export default function CategoryOptions() {
  // const destructuredId = id ? id[0] : "";
  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<ReservationValues>();
  const [newCategories, setNewCategories] = useState(categories);
  // const prefix = id.slice(0, 3);
  // const numberPart = parseInt(id[0].split("-")[1], 10);
  // const newCategories = cateringPackages[6].options;
  // const [menus, setMenus] = useState([]);

  // useEffect(() => {
  //   const getMenus = async () => {
  //     const response = await axios.get("http://localhost:5500/api/menus");
  //     setMenus(response.data.data);
  //   };
  //   getMenus();
  // }, []);

  // Function to get dishes by category
  const getMenusByCategory = (category: CategoryProps) => {
    return menuItems.filter((menu: MenuItem) => menu.category === category);
  };

  return (
    <div className="space-y-6">
      {/* {numberPart} */}
      <FormField
        control={control}
        name="selectedMenus"
        render={({ field }) => (
          <FormItem>
            {newCategories.map((category) => (
              <div key={category} className="space-y-2">
                <FormLabel className="font-medium text-base">
                  {category} Options
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getMenusByCategory(category).map((menu) => (
                    <div key={menu._id} className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          id={`menu-${menu._id}`}
                          checked={field.value[category]?.includes(menu._id)}
                          onCheckedChange={(checked) => {
                            const updatedMenus = checked
                              ? [...(field.value[category] || []), menu._id]
                              : field.value[category].filter(
                                  (id) => id !== menu._id
                                );
                            field.onChange({
                              ...field.value,
                              [category]: updatedMenus,
                            });
                          }}
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
