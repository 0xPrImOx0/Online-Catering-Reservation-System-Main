"use client";

import { useState } from "react";
import SearchInput from "@/components/shared/SearchInput";
import AddPackageDialog from "@/components/shared/caterer/AddPackageForm";
import {
  buffetPackages,
  eventPackages,
  platedPackages,
} from "@/lib/customer/packages-metadata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatererPackageCard } from "@/components/shared/caterer/CatererPackageCard";

export default function PackageManagement() {
  // Simple state for dialog visibility
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [query, setQuery] = useState("");

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
    <main className="space-y-8 max-w-[1440px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-4">Packages</h1>

      {/* Search and View Controls */}
      <Tabs defaultValue="buffet" className="w-full">
        <div className="flex justify-between mb-6">
          <TabsList className="text-foreground justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 max-sm:hidden">
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
        </div>

        <TabsContent value="buffet" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {buffetPackages.map((pkg) => (
              <CatererPackageCard key={pkg.id} item={pkg} />
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
              <CatererPackageCard key={pkg.id} item={pkg} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="event" className="space-y-10">
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Birthdays</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPackages.Birthday.map((pkg) => (
                <CatererPackageCard key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Corporate</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPackages.Corporate.map((pkg) => (
                <CatererPackageCard key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Graduation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPackages.Graduation.map((pkg) => (
                <CatererPackageCard key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Wedding</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventPackages.Wedding.map((pkg) => (
                <CatererPackageCard key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Add Package Dialog */}
        <AddPackageDialog
          isAddPackageOpen={isAddPackageOpen}
          setIsAddPackageOpen={setIsAddPackageOpen}
        />
      </Tabs>
    </main>
  );
}
