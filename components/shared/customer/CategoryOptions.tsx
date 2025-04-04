"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { menuItems } from "@/lib/menu-lists";
import { categories } from "@/lib/menu-select";
import { CategoryProps, MenuItem } from "@/types/menu-types";
import { FormData } from "@/types/package-types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoryOptions({
  formData,
  setFormData,
}: {
  formData: {
    selectedMenus: Record<CategoryProps, string[]>;
    specialRequests: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
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

  // Then your handleMenuSelection function is mostly fine, just make sure to handle if the category property doesn't exist yet:
  const handleMenuSelection = (
    category: CategoryProps,
    menuId: string,
    selected: boolean
  ) => {
    setFormData((prev) => {
      const currentSelection = prev.selectedMenus[category] || [];
      let newSelection;
      if (selected) {
        newSelection = [...currentSelection, menuId];
      } else {
        newSelection = currentSelection.filter((id: string) => id !== menuId);
      }
      return {
        ...prev,
        selectedMenus: {
          ...prev.selectedMenus,
          [category]: newSelection,
        },
      };
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="font-medium">{category} Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getMenusByCategory(category).map((menu: MenuItem) => (
              <div key={menu._id} className="flex items-start space-x-2">
                <Checkbox
                  id={`menu-${menu._id}`}
                  onCheckedChange={(checked) => {
                    handleMenuSelection(category, menu._id, checked as boolean);
                  }}
                  checked={(
                    formData.selectedMenus[category as CategoryProps] || []
                  ).includes(menu._id)}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor={`dish-${menu._id}`} className="font-medium">
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
      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requests or dietary requirements?"
          value={formData.specialRequests}
          onChange={(e) => handleFormChange("specialRequests", e.target.value)}
        />
      </div>
    </div>
  );
}
