"use client";

import { useState } from "react";
import { availableMenus, cateringPackages, selectorItems } from "./metadata";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import SearchInput from "@/components/shared/SearchInput";
import CustomSelect from "@/components/shared/CustomSelect";
import ViewModeButtons from "@/components/shared/ViewModeButtons";
import PackageGridMode from "@/components/shared/caterer/PackageGridMode";
import PackageListMode from "@/components/shared/caterer/PackageListMode";
import PackageDetails from "@/components/shared/caterer/PackageDetails";
import AddPackageDialog from "@/components/shared/caterer/AddPackageDialog";
import EditPackageDialog from "@/components/shared/caterer/EditPackageDialog";
import DeletePackageDialog from "@/components/shared/caterer/DeletePackageDialog";

export default function PackageManagement() {
  // Simple state for dialog visibility
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPackage, setCurrentPackage] = useState(cateringPackages[0]);
  const [selectedMenus, setSelectedMenus] = useState<number[]>([]);
  const [query, setQuery] = useState("");

  return (
    <main className="flex-1 overflow-auto space-y-8 px-1">
      <HeaderWithAddButton
        title="Packages"
        setIsAddInstanceOpen={setIsAddPackageOpen}
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

      {/* Packages Grid */}
      {viewMode === "grid" ? (
        <PackageGridMode
          cateringPackages={cateringPackages}
          setCurrentPackage={setCurrentPackage}
          setIsEditPackageOpen={setIsEditPackageOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          setIsDetailsOpen={setIsDetailsOpen}
        />
      ) : (
        <PackageListMode
          cateringPackages={cateringPackages}
          setCurrentPackage={setCurrentPackage}
          setIsEditPackageOpen={setIsEditPackageOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          setIsDetailsOpen={setIsDetailsOpen}
        />
      )}

      {/* Package Details Dialog */}
      <PackageDetails
        currentPackage={currentPackage}
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsEditPackageOpen={setIsEditPackageOpen}
      />

      {/* Add Package Dialog */}
      <AddPackageDialog
        availableMenus={availableMenus}
        isAddPackageOpen={isAddPackageOpen}
        setIsAddPackageOpen={setIsAddPackageOpen}
        selectedMenus={selectedMenus}
        setSelectedMenus={setSelectedMenus}
      />

      {/* Edit Package Dialog */}
      <EditPackageDialog
        currentPackage={currentPackage}
        isEditPackageOpen={isEditPackageOpen}
        setIsEditPackageOpen={setIsEditPackageOpen}
        availableMenus={availableMenus}
      />

      {/* Delete Confirmation Dialog */}
      <DeletePackageDialog
        currentPackage={currentPackage}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </main>
  );
}
