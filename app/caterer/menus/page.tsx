"use client";

import { useState } from "react";
import { selectorItems } from "./metadata";
import MenuGridMode from "@/components/shared/caterer/MenuGridMode";
import MenuListMode from "@/components/shared/caterer/MenuListMode";
import MenuInfoDialog from "@/components/shared/caterer/MenuInfoDialog";
import AddMenuDialog from "@/components/shared/caterer/AddMenuDialog";
import EditMenuDialog from "@/components/shared/caterer/EditMenuDialog";
import DeleteMenuDialog from "@/components/shared/caterer/DeleteMenuDialog";
import SearchInput from "@/components/shared/SearchInput";
import CustomSelect from "@/components/shared/CustomSelect";
import ViewModeButtons from "@/components/shared/ViewModeButtons";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { menuItems } from "@/lib/menu-metadata";

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
    <main className="flex-1 overflow-auto space-y-8 px-1">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((menuItem) => (
            <MenuGridMode
              key={menuItem.id}
              menuItem={menuItem}
              setCurrentMenu={setCurrentMenu}
              setIsEditMenuOpen={setIsEditMenuOpen}
              setIsDetailsOpen={setIsDetailsOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {menuItems.map((menuItem) => (
            <MenuListMode
              key={menuItem.id}
              menuItem={menuItem}
              setCurrentMenu={setCurrentMenu}
              setIsEditMenuOpen={setIsEditMenuOpen}
              setIsDetailsOpen={setIsDetailsOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          ))}
        </div>
      )}

      {/* Menu Details Dialog */}
      <MenuInfoDialog
        currentMenu={currentMenu}
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsEditMenuOpen={setIsEditMenuOpen}
      />

      {/* Add Menu Dialog */}
      <AddMenuDialog
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
      />

      {/* Edit Menu Dialog */}
      <EditMenuDialog
        currentMenu={currentMenu}
        isEditMenuOpen={isEditMenuOpen}
        setIsEditMenuOpen={setIsEditMenuOpen}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteMenuDialog
        currentMenu={currentMenu}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </main>
  );
}
