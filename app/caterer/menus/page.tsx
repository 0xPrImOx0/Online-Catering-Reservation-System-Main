"use client";

import { useState } from "react";
import { selectorItems } from "./metadata";
import MenuListCard from "@/components/shared/caterer/MenuListCard";
import DeleteMenuDialog from "@/components/shared/caterer/DeleteMenuDialog";
import SearchInput from "@/components/shared/SearchInput";
import CustomSelect from "@/components/shared/CustomSelect";
import ViewModeButtons from "@/components/shared/ViewModeButtons";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { menuItems } from "@/lib/menu-metadata";
import { MenuCard } from "@/components/shared/MenuCard";

export default function MenuManagement() {
  // State responsible for opening/closing the dialogs for dialog visibility
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentMenu, setCurrentMenu] = useState(menuItems[0]);
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

      {/* Menu Items Grid */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* {menuItems.map((menuItem) => (
            <MenuListCard
              key={menuItem.id}
              menuItem={menuItem}
              setCurrentMenu={setCurrentMenu}
              setIsEditMenuOpen={setIsEditMenuOpen}
              setIsDetailsOpen={setIsDetailsOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          ))} */}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteMenuDialog
        currentMenu={currentMenu}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </main>
  );
}
