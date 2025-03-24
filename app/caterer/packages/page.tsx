"use client";

import { useState } from "react";
import {
  availableMenus,
  cateringPackages,
  selectorItems,
} from "../../../lib/caterer/packages-metadata";
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
import {
  buffetPackages,
  eventPackages,
  eventTypes,
  platedPackages,
} from "@/lib/customer/packages-metadata";
import PackageCard from "@/components/shared/customer/PackageCard";
import { useImageDialog } from "@/components/shared/customer/PackageImageDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CateringPackage,
  EventType,
  PlatedPackage,
  ServiceType,
} from "@/types/customer/package-types";
import { Info, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventTypeCard from "@/components/shared/customer/EventTypeCard";

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
  const [activeTab, setActiveTab] = useState("buffet");
  const [serviceType, setServiceType] = useState<ServiceType>("Buffet");
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    null
  );

  const { imageDialog, openImageDialog, closeImageDialog } = useImageDialog();

  const TabsTriggerStyle = ({
    value,
    title,
  }: {
    value: string;
    title: string;
  }) => {
    return (
      <TabsTrigger
        value={value}
        className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
      >
        {title}
      </TabsTrigger>
    );
  };
  return (
    <main className="flex-1 overflow-auto px-1">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Packages</h1>

      {/* Search and View Controls */}
      <Tabs
        defaultValue="buffet"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between mb-6">
          <TabsList className="text-foreground justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
            <TabsTriggerStyle value="buffet" title="Buffet Packages" />
            <TabsTriggerStyle value="plated course" title="Plated Course" />
            <TabsTriggerStyle value="event" title="Event Packages" />
          </TabsList>
          <div className="flex gap-4">
            <SearchInput
              query={query}
              setQuery={setQuery}
              placeholderTitle="packages"
            />
            <Button
              variant="outline"
              className=""
              onClick={() => setIsAddPackageOpen((prev) => !prev)}
            >
              <PlusIcon
                strokeWidth={2.5}
                className="min-w-5 min-h-5 text-muted-foreground"
              />
              Create Package
            </Button>
          </div>
          {/* <div className="flex gap-4">
          <CustomSelect
            defaultValue="buffet"
            placeholder="Sort By"
            items={selectorItems}
          />
          <ViewModeButtons viewMode={viewMode} setViewMode={setViewMode} />
        </div> */}
        </div>

        <TabsContent value="buffet" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buffetPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                openImageDialog={openImageDialog}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="plated course" className="mt-6 space-y-8">
          <div className="mb-4 p-4 bg-muted rounded-lg flex items-start gap-3">
            <Info className="w-20 sm:w-14 md:w-10 lg:w-6 relative" />
            <div className="space-y-2">
              <h3 className="font-medium">Plated Course Service</h3>
              <p className="text-sm text-muted-foreground text-justify">
                Our plated course packages include professional waitstaff who
                will serve each course directly to your guests&apos; tables. An
                additional service fee of ₱100 per hour is included in the price
                per person.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platedPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                openImageDialog={openImageDialog}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="event" className="mt-6 sm:mx-0 lg:mx-8 xl:mx-20">
          <div>HI</div>
        </TabsContent>

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
      </Tabs>
    </main>
  );
}
