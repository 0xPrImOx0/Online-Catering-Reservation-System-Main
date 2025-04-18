"use client";
import { useState, useRef, useEffect } from "react";
import type { FilterSectionProps } from "@/types/component-types";
import type { AllergenProps, CategoryProps } from "@/types/menu-types";
import { categorySelect } from "@/lib/menu-select";
import { useClickOutside } from "@/hooks/ues-click-outside";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SearchInput from "../SearchInput";
import { X } from "lucide-react";
import { getCategoryIcon } from "@/lib/menu-category-badges";
import { getColorClasses } from "./MenuCategoryBadge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilterDialog } from "./FilterDialog";
import { FilterDrawer } from "./FilterDrawer";

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
  const isMobile = useMediaQuery("(max-width: 640px)");

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

  const filterProps = {
    filters,
    updateFilter,
    priceRange,
    setPriceRange,
    excludedAllergens,
    toggleAllergen,
    handleClearFilters,
    setOpenFilter,
  };

  return (
    <section className="mb-8 relative">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative">
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholderTitle="for dishes..."
            iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
            inputStyle="pl-10 pr-10 py-5 rounded-full border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            hasFilter={true}
            activeFilterCount={getActiveFilterCount()}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
        </div>

        {/* Horizontally scrollable category selector */}
        <div
          ref={categoriesRef}
          className={"mt-4 flex overflow-x-auto pb-2 gap-2 scrollbar-hide"}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categorySelect.map((category) => {
            const Icon = getCategoryIcon(
              (category.value.charAt(0).toUpperCase() +
                category.value.slice(1).toLowerCase()) as CategoryProps
            );

            return (
              <Button
                key={category.value}
                variant={
                  filters.category ===
                  (category.value === "all" ? "" : category.value)
                    ? "default"
                    : "outline"
                }
                onClick={() => updateFilter("category", category.value)}
                className={
                  "flex flex-col items-center justify-center p-3 rounded-lg transition-colors md:min-w-32 md:h-32"
                }
              >
                <div className="mb-2 items-center justify-center hidden md:flex">
                  <Icon
                    strokeWidth={1}
                    style={{
                      width: "35px",
                      height: "35px",
                      background: "transparent", // Set fill to transparent
                    }}
                    className={`${getColorClasses(
                      (category.value.charAt(0).toUpperCase() +
                        category.value.slice(1).toLowerCase()) as CategoryProps
                    )} bg-transparent`}
                  />
                </div>
                <span className="text-sm font-medium">{category.title}</span>
              </Button>
            );
          })}
        </div>

        {/* Use Dialog for desktop and Drawer for mobile */}
        {isMobile ? (
          <FilterDrawer
            open={openFilter}
            onOpenChange={setOpenFilter}
            {...filterProps}
          />
        ) : (
          <FilterDialog
            open={openFilter}
            onOpenChange={setOpenFilter}
            {...filterProps}
          />
        )}

        {getActiveFilterCount() > 0 && !openFilter && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.category && (
              <Badge variant="outline" className="bg-background">
                {filters.category}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("category", "all")}
                />
              </Badge>
            )}
            {filters.available && (
              <Badge variant="outline" className="bg-background">
                Available Only
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("available", "")}
                />
              </Badge>
            )}
            {filters.spicy && (
              <Badge variant="outline" className="bg-background">
                Spicy
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("spicy", "")}
                />
              </Badge>
            )}
            {excludedAllergens.map((allergen) => (
              <Badge key={allergen} variant="outline" className="bg-background">
                No {allergen}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => toggleAllergen(allergen)}
                />
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 500) && (
              <Badge variant="outline" className="bg-background">
                ₱{priceRange[0]} - ₱{priceRange[1]}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => setPriceRange([0, 500])}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="custom"
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
