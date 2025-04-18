"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categorySelect,
  allergensSelect,
  selectorItems,
} from "@/lib/menu-select";
import type { AllergenProps } from "@/types/menu-types";
import { useEffect } from "react";
import { FilterComponentProps } from "./FilterDialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import CustomSelect from "../CustomSelect";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FilterDrawer({
  open,
  onOpenChange,
  filters,
  updateFilter,
  priceRange,
  setPriceRange,
  excludedAllergens,
  toggleAllergen,
  handleClearFilters,
}: FilterComponentProps) {
  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Menu Filters</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Menu Category</Label>
              <CustomSelect
                defaultValue="all"
                placeholder="Find Category"
                items={categorySelect}
                value={filters.category || "all"}
                onValueChange={(value) => updateFilter("category", value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Sort By</Label>
              <CustomSelect
                defaultValue="default"
                placeholder="Sort By"
                items={selectorItems}
                value={filters.sortBy || "default"}
                onValueChange={(value) => updateFilter("sortBy", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Available Only</Label>
                <Switch
                  checked={filters.available}
                  onCheckedChange={(checked) =>
                    updateFilter("available", checked ? "true" : "")
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Spicy</Label>
                <Switch
                  checked={filters.spicy}
                  onCheckedChange={(checked) =>
                    updateFilter("spicy", checked ? "true" : "")
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">
                Price Range (₱{priceRange[0]} - ₱{priceRange[1]})
              </Label>
              <Slider
                defaultValue={[0, 500]}
                min={0}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Exclude Allergens</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {allergensSelect.slice(1).map((allergen) => (
                  <Badge
                    key={allergen.value}
                    variant={
                      excludedAllergens.includes(
                        allergen.value as AllergenProps
                      )
                        ? "default"
                        : "outline"
                    }
                    className={cn(
                      "cursor-pointer",
                      excludedAllergens.includes(
                        allergen.value as AllergenProps
                      )
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "hover:bg-gray-100"
                    )}
                    onClick={() =>
                      toggleAllergen(allergen.value as AllergenProps)
                    }
                  >
                    {excludedAllergens.includes(
                      allergen.value as AllergenProps
                    ) && <X className="mr-1 h-3 w-3" />}
                    {allergen.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button className="flex-1" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
