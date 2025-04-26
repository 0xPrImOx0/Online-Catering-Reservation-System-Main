"use client";
import { useState } from "react";
import SearchInput from "./SearchInput";
import { Button } from "../ui/button";
import { Filter, FilterX } from "lucide-react";
import {
  allergensSelect,
  categorySelect,
  selectorItems,
} from "@/lib/menu-select";
import CustomSelect from "./CustomSelect";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { FilterSectionProps } from "@/types/component-types";

export default function FilterSection({
  query = "",
  setQuery,
  filters,
  setFilters,
}: FilterSectionProps) {
  const { category, allergens, sortBy } = filters;
  const [openFilter, setOpenFilter] = useState(false);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value, // Dynamically update the specific key
    }));
  };
  return (
    <section className="mb-8 space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholderTitle="Search Menus"
          />
          <Button
            variant={"outline"}
            onClick={() => setOpenFilter((prev) => !prev)}
          >
            <Filter /> {!openFilter ? "Additional" : "Close"} Filter
          </Button>
          {(category || allergens || sortBy) && (
            <Button
              variant={"outline"}
              onClick={() =>
                setFilters({ category: "", allergens: "", sortBy: "" })
              }
            >
              <FilterX /> Clear Filters
            </Button>
          )}
        </div>
      </div>
      {openFilter && (
        <div className="gap-4 flex overflow-y-auto">
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-normal">Menu Category</Label>
            <CustomSelect
              defaultValue={categorySelect[0].value}
              placeholder="Find Category"
              items={categorySelect}
              value={category}
              onValueChange={(value) => updateFilter("category", value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-normal">Allergens</Label>
            <CustomSelect
              defaultValue={allergensSelect[0].value}
              placeholder="Find Allergen"
              items={allergensSelect}
              value={allergens}
              onValueChange={(value) => updateFilter("allergens", value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-normal">Sort By</Label>
            <CustomSelect
              defaultValue={selectorItems[0].value}
              placeholder="Sort By"
              items={selectorItems}
              value={sortBy}
              onValueChange={(value) => updateFilter("sortBy", value)}
            />
          </div>
        </div>
      )}
      <Separator className="flex-1" />
    </section>
  );
}
