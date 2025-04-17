"use client";
import { useState, useRef, useEffect } from "react";
import type { FilterSectionProps } from "@/types/component-types";
import type { AllergenProps } from "@/types/menu-types";
import {
  categorySelect,
  allergensSelect,
  selectorItems,
} from "@/lib/menu-select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useClickOutside } from "@/hooks/ues-click-outside";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CustomSelect from "../CustomSelect";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function FilterSection({
  query = "",
  setQuery,
  filters,
  setFilters,
}: FilterSectionProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [excludedAllergens, setExcludedAllergens] = useState<AllergenProps[]>(
    []
  );
  const filterRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when filter panel is open
  useEffect(() => {
    if (openFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openFilter]);

  // Close filter panel when clicking outside
  useClickOutside(filterRef, () => {
    if (openFilter) setOpenFilter(false);
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value === "default" ? "" : value,
    }));
  };

  const toggleAllergen = (allergen: AllergenProps) => {
    if (excludedAllergens.includes(allergen)) {
      setExcludedAllergens(
        excludedAllergens.filter((prev) => prev !== allergen)
      );
    } else {
      setExcludedAllergens([...excludedAllergens, allergen]);
    }
  };

  // Update filters when excluded allergens change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      excludedAllergens: excludedAllergens,
    }));
  }, [excludedAllergens, setFilters]);

  // Update filters when price range changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }));
  }, [priceRange, setFilters]);

  const handleClearFilters = () => {
    setFilters({
      category: "",
      allergens: "",
      sortBy: "",
      excludedAllergens: [],
      minPrice: 0,
      maxPrice: 500,
      available: false,
      spicy: false,
    });
    setPriceRange([0, 500]);
    setExcludedAllergens([]);
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.allergens) count++;
    if (filters.sortBy) count++;
    if (excludedAllergens.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 500) count++;
    if (filters.available) count++;
    if (filters.spicy) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Get count of menu items per category
  const getCategoryCount = (category: string) => {
    // This would typically come from your data
    // For now, just return a placeholder
    return category || "2 items";
  };

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    all: "/placeholder.svg?height=24&width=24",
    soup: "/placeholder.svg?height=24&width=24",
    salad: "/placeholder.svg?height=24&width=24",
    beef: "/placeholder.svg?height=24&width=24",
    pork: "/placeholder.svg?height=24&width=24",
    noodle: "/placeholder.svg?height=24&width=24",
    chicken: "/placeholder.svg?height=24&width=24",
    seafood: "/placeholder.svg?height=24&width=24",
    vegetable: "/placeholder.svg?height=24&width=24",
    dessert: "/placeholder.svg?height=24&width=24",
    beverage: "/placeholder.svg?height=24&width=24",
  };

  return (
    <section className="mb-8 relative">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 py-6 rounded-full border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <SlidersHorizontal
                className={cn(
                  "h-5 w-5",
                  openFilter ? "text-green-500" : "text-gray-500"
                )}
              />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center bg-green-500 text-white text-xs rounded-full w-4 h-4">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Horizontally scrollable category selector */}
        <div
          ref={categoriesRef}
          className={cn(
            "mt-4 flex overflow-x-auto pb-2 gap-2 scrollbar-hide",
            openFilter ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categorySelect.map((category) => (
            <button
              key={category.value}
              onClick={() => updateFilter("category", category.value)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-lg transition-colors min-w-[100px]",
                filters.category ===
                  (category.value === "all" ? "" : category.value)
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              )}
            >
              <div className="w-8 h-8 mb-2 items-center justify-center hidden sm:flex">
                <Image
                  src={
                    categoryIcons[category.value] ||
                    "/placeholder.svg?height=24&width=24"
                  }
                  alt={category.title}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-sm font-medium">{category.title}</span>
              <span className="text-xs opacity-70 hidden sm:inline">
                {getCategoryCount(category.value)}
              </span>
            </button>
          ))}
        </div>

        {openFilter && (
          <>
            {/* Overlay for entire screen */}
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setOpenFilter(false)}
            />

            {/* Filter panel */}
            <div
              ref={filterRef}
              className={cn(
                "fixed z-50 bg-white border border-gray-200 shadow-lg",
                "transition-all duration-200 ease-in-out",
                "inset-x-0 top-[72px] bottom-0 md:top-auto md:bottom-auto", // Full height excluding search bar
                "md:absolute md:mt-2 md:w-full md:rounded-lg",
                "flex flex-col"
              )}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenFilter(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto flex-1 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <Label className="text-sm font-medium">
                        Available Only
                      </Label>
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

                  <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
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

                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Label className="text-sm font-medium">
                      Exclude Allergens
                    </Label>
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

              <div className="flex justify-end p-4 border-t mt-auto">
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    className="flex-1 md:flex-none"
                    onClick={() => setOpenFilter(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="flex-1 md:flex-none"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeFilterCount > 0 && !openFilter && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.category && (
              <Badge variant="outline" className="bg-gray-100">
                {filters.category}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("category", "all")}
                />
              </Badge>
            )}
            {filters.available && (
              <Badge variant="outline" className="bg-gray-100">
                Available Only
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("available", "")}
                />
              </Badge>
            )}
            {filters.spicy && (
              <Badge variant="outline" className="bg-gray-100">
                Spicy
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("spicy", "")}
                />
              </Badge>
            )}
            {excludedAllergens.map((allergen) => (
              <Badge key={allergen} variant="outline" className="bg-gray-100">
                No {allergen}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => toggleAllergen(allergen)}
                />
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 500) && (
              <Badge variant="outline" className="bg-gray-100">
                ₱{priceRange[0]} - ₱{priceRange[1]}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => setPriceRange([0, 500])}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-red-500 hover:text-red-700"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
      <Separator className="mt-6" />
    </section>
  );
}
