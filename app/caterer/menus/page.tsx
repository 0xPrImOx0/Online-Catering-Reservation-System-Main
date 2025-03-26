"use client";

import { useState } from "react";
import DeleteMenuDialog from "@/components/shared/caterer/DeleteMenuDialog";
import SearchInput from "@/components/shared/SearchInput";
import CustomSelect from "@/components/shared/CustomSelect";
import ViewModeButtons from "@/components/shared/ViewModeButtons";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { menuItems } from "@/lib/menu-lists";
import { MenuCard } from "@/components/shared/MenuCard";
import { AddMenuDialog } from "@/components/shared/caterer/AddMenuDialog";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
import { selectorItems } from "../../../lib/caterer/packages-metadata";

export default function MenuManagement() {
  // State responsible for opening/closing the dialogs for dialog visibility
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  return (
    <main className="space-y-8">
      <HeaderWithAddButton
        title="Menu"
        setIsAddInstanceOpen={setIsAddMenuOpen}
      />

      {/* Search and View Controls */}
      <div className="flex justify-between mb-6">
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
      </div>

      <PaginatedMenus items={menuItems} />

      <AddMenuDialog
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
      />
    </main>
  );
}
