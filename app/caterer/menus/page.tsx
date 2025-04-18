"use client";

import { useState } from "react";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { AddMenuDialog } from "@/components/shared/caterer/AddMenuForm";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
export default function Page() {
  // State responsible for opening/closing the dialogs for dialog visibility
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const [query, setQuery] = useState("");

  return (
    <main className="space-y-8 px-6 max-w-[1440px] mx-auto">
      <HeaderWithAddButton
        title="Menu"
        setIsAddInstanceOpen={setIsAddMenuOpen}
      />

      {/* Search and View Controls */}
      {/* <div className="flex justify-between mb-6">
        <SearchInput
          query={query}
          setQuery={setQuery}
          placeholderTitle="menus"
        />
        <div className="flex gap-4">
          <CustomSelect
            defaultValue="default"
            placeholder="Sort By"
            items={selectorItems}
          />
          <ViewModeButtons viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div> */}

      <PaginatedMenus />

      <AddMenuDialog
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
      />
    </main>
  );
}
