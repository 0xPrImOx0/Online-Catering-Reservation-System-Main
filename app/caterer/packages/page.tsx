"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/components/shared/SearchInput";
import AddPackageDialog from "@/components/shared/caterer/AddPackageForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatererPackageCard } from "@/components/shared/caterer/CatererPackageCard";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import type { CateringPackagesProps } from "@/types/package-types";

export default function PackageManagement() {
  // Simple state for dialog visibility
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [eventServiceType, setEventServiceType] = useState<"Buffet" | "Plated">(
    "Buffet"
  );

  // Filter packages based on packageType and eventType
  const buffetPackages = useMemo(() => {
    return cateringPackages
      .filter((pkg) => pkg.packageType === "BuffetPlated" && pkg.available)
      .filter((pkg) => pkg.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const platedPackages = useMemo(() => {
    return cateringPackages
      .filter((pkg) => pkg.packageType === "BuffetPlated" && pkg.available)
      .filter((pkg) => pkg.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  // Group event packages by eventType
  const eventPackages = useMemo(() => {
    const filteredPackages = cateringPackages
      .filter((pkg) => pkg.packageType === "Event" && pkg.available)
      .filter((pkg) => pkg.name.toLowerCase().includes(query.toLowerCase()));

    return {
      Birthday: filteredPackages.filter((pkg) => pkg.eventType === "Birthday"),
      Wedding: filteredPackages.filter((pkg) => pkg.eventType === "Wedding"),
      Corporate: filteredPackages.filter(
        (pkg) => pkg.eventType === "Corporate"
      ),
      Graduation: filteredPackages.filter(
        (pkg) => pkg.eventType === "Graduation"
      ),
    };
  }, [query]);

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

  // Filter inclusions based on service type
  const getFilteredInclusions = (
    pkg: CateringPackagesProps,
    serviceType: "Buffet" | "Plated"
  ) => {
    return pkg.inclusions.filter(
      (inclusion) =>
        inclusion.typeOfCustomer === "Both" ||
        inclusion.typeOfCustomer === serviceType
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
              <CatererPackageCard key={pkg.name} item={pkg} />
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
              <CatererPackageCard key={pkg.name} item={pkg} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="event" className="space-y-6">
          {/* Sub-tabs for Event Packages */}
          <Tabs
            defaultValue="Buffet"
            className="w-full"
            onValueChange={(value) =>
              setEventServiceType(value as "Buffet" | "Plated")
            }
          >
            <TabsList className="mb-6">
              <TabsTrigger value="Buffet">Buffet Service</TabsTrigger>
              <TabsTrigger value="Plated">Plated Service</TabsTrigger>
            </TabsList>

            <TabsContent value="Buffet" className="space-y-10">
              {Object.entries(eventPackages).map(
                ([eventType, packages]) =>
                  packages.length > 0 && (
                    <div key={eventType} className="space-y-4">
                      <h4 className="text-xl font-medium">{eventType}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                          <CatererPackageCard
                            key={pkg.name}
                            item={{
                              ...pkg,
                              inclusions: getFilteredInclusions(pkg, "Buffet"),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )
              )}
            </TabsContent>

            <TabsContent value="Plated" className="space-y-10">
              <div className="mb-4 p-4 bg-muted rounded-lg flex items-start gap-3">
                <Info className="w-20 sm:w-14 md:w-10 lg:w-6 relative" />
                <div className="space-y-2">
                  <h3 className="font-medium">Plated Service for Events</h3>
                  <p className="text-sm text-muted-foreground text-justify">
                    Our plated event packages include professional waitstaff who
                    will serve each course directly to your guests&apos; tables.
                    An additional service fee of ₱100 per hour is included in
                    the price per person.
                  </p>
                </div>
              </div>

              {Object.entries(eventPackages).map(
                ([eventType, packages]) =>
                  packages.length > 0 && (
                    <div key={eventType} className="space-y-4">
                      <h4 className="text-xl font-medium">{eventType}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                          <CatererPackageCard
                            key={pkg.name}
                            item={{
                              ...pkg,
                              inclusions: getFilteredInclusions(pkg, "Plated"),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )
              )}
            </TabsContent>
          </Tabs>
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
