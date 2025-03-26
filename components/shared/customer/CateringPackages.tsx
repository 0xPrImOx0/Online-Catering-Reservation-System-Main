"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ChevronRight } from "lucide-react";
import {
  CateringPackageProps,
  EventType,
  // PlatedPackage,
  ServiceType,
} from "@/types/package-types";
import {
  buffetPackages,
  platedPackages,
  eventPackages,
  eventTypes,
} from "@/lib/customer/packages-metadata";
import { Button } from "@/components/ui/button";
import PackageCard from "./PackageCard";
import EventTypeCard from "./EventTypeCard";
import CustomPackageForm from "./CustomPacakgeForm";
import ImageDialog from "../ImageDialog";

export default function CateringPackages() {
  const [activeTab, setActiveTab] = useState("buffet");
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    null
  );
  const [serviceType, setServiceType] = useState<ServiceType>("Buffet");
  // const { imageDialog, openImageDialog, closeImageDialog } = useImageDialog();

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
        className="flex-1 hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
      >
        {title}
      </TabsTrigger>
    );
  };

  return (
    <div className="container mx-auto pb-8">
      <h1 className="text-5xl font-bold text-center mb-4">
        <span className="capitalize">{activeTab}</span> Packages
      </h1>

      <p className="text-center text-muted-foreground mb-8">
        Authentic filipino {activeTab} cuisine for your special events and
        celebrations
      </p>

      <Tabs
        defaultValue="buffet"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="text-foreground overflow-x-auto scrollbar-thin w-full justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
          <TabsTriggerStyle value="buffet" title="Buffet Packages" />
          <TabsTriggerStyle value="plated course" title="Plated Course" />
          <TabsTriggerStyle value="event" title="Event Packages" />
          <TabsTriggerStyle value="custom" title="Custom Packages" />
        </TabsList>

        <TabsContent value="buffet" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buffetPackages.map((pkg) => (
              <PackageCard key={pkg.id} item={pkg} />
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
              <PackageCard key={pkg.id} item={pkg} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="event" className="mt-6 sm:mx-0 lg:mx-8 xl:mx-20">
          {selectedEventType ? (
            <>
              <div className="flex items-center mb-2">
                <Button
                  variant="ghost"
                  className="flex text-base items-center gap-1 self-start -px-4"
                  onClick={() => setSelectedEventType(null)}
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Event Types
                </Button>
              </div>
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-2xl font-bold ml-4">
                  {selectedEventType} Packages
                </h2>
              </div>

              <div className="mb-10 space-y-10">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    variant={serviceType === "Buffet" ? "default" : "outline"}
                    onClick={() => setServiceType("Buffet")}
                  >
                    Buffet Service
                  </Button>
                  <Button
                    variant={serviceType === "Plated" ? "default" : "outline"}
                    onClick={() => setServiceType("Plated")}
                  >
                    Plated Service
                  </Button>
                </div>

                {serviceType === "Plated" && (
                  <div className="p-4 bg-muted rounded-lg flex items-start gap-3 mb-4">
                    <Info className="size-5  text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Plated Service Fee</h3>
                      <p className="text-sm text-muted-foreground">
                        Plated service includes an additional fee of ₱100 per
                        hour for professional waitstaff service. This fee is
                        already included in the displayed price per person.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {eventPackages[selectedEventType].map((pkg) => {
                  // Create a modified package with service fee if plated service is selected
                  const displayPkg =
                    serviceType === "Plated" && pkg.serviceHours
                      ? {
                          ...pkg,
                          pricePerPax:
                            pkg.pricePerPax +
                            (100 * pkg?.serviceHours) / pkg.minimumPax,
                          name: pkg.name + " (Plated Service)",
                          inclusions: [
                            ...pkg.inclusions,
                            `${pkg.serviceHours} hours of table service`,
                            "Professional waitstaff",
                            "Table-side service",
                            "Course-by-course serving",
                          ],
                          // Add the missing properties required by PlatedPackage type
                          serviceCharge: 100 * pkg?.serviceHours,
                          recommendedPax: pkg.minimumPax,
                          maximumPax: pkg.minimumPax * 2, // Setting a reasonable maximum as 2x the minimum
                        }
                      : pkg;

                  return (
                    <PackageCard
                      key={pkg.id}
                      item={pkg}
                      // openImageDialog={openImageDialog}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {eventTypes.map((eventType) => (
                <EventTypeCard
                  key={eventType}
                  eventType={eventType}
                  onSelect={setSelectedEventType}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <CustomPackageForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
