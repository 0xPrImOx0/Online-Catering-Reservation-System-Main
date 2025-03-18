"use client";

import { useState } from "react";
import { Grid, List, PlusIcon, Search, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { menuItems } from "./metadata";
import MenuGridMode from "@/components/shared/caterer/MenuGridMode";
import MenuListMode from "@/components/shared/caterer/MenuListMode";
import MenuInfoDialog from "@/components/shared/caterer/MenuInfoDialog";
import AddMenuDialog from "@/components/shared/caterer/AddMenuDialog";
import EditMenuDialog from "@/components/shared/caterer/EditMenuDialog";
import DeleteMenuDialog from "@/components/shared/caterer/DeleteMenuDialog";
import SearchInput from "@/components/shared/SearchInput";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Menus</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size={"landing"}
            onClick={() => setIsAddMenuOpen((prev) => !prev)}
          >
            <PlusIcon strokeWidth={2.5} className="min-w-5 min-h-5" />
            Create Menu
          </Button>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput query={query} setQuery={setQuery} />
        {/* <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search dishes..." className="pl-10" />
        </div> */}
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <SortAsc className="mr-2 h-4 w-4" />
                <span>Sort By</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low-High)</SelectItem>
              <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              <SelectItem value="ordered-desc">Most Ordered</SelectItem>
              <SelectItem value="ordered-asc">Least Ordered</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      {viewMode === "grid" ? (
        <MenuGridMode
          menuItems={menuItems}
          setCurrentMenu={setCurrentMenu}
          setIsEditMenuOpen={setIsEditMenuOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        />
      ) : (
        <MenuListMode
          menuItems={menuItems}
          setCurrentMenu={setCurrentMenu}
          setIsEditMenuOpen={setIsEditMenuOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        />
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
