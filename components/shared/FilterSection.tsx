"use client";
import { useState } from "react";
import SearchInput from "./SearchInput";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { selectorItems } from "@/lib/menu-select";
import CustomSelect from "./CustomSelect";

export default function FilterSection() {
  const [query, setQuery] = useState("");
  const [openFilter, setOpenFilter] = useState(true);
  return (
    <section className="mb-8 space-y-8">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholderTitle="Search Menus"
          />
          <Button variant={"outline"}>
            <Filter /> Filter
          </Button>
        </div>
        <CustomSelect
          defaultValue="default"
          placeholder="Sort By"
          size="md"
          items={selectorItems}
        />
      </div>
      {openFilter && (
        <div>
          <CustomSelect
            defaultValue="default"
            placeholder="Sort By"
            size="md"
            items={selectorItems}
          />
          <CustomSelect
            defaultValue="default"
            placeholder="Sort By"
            items={selectorItems}
          />
          <CustomSelect
            defaultValue="default"
            placeholder="Sort By"
            items={selectorItems}
          />
        </div>
      )}
    </section>
  );
}
