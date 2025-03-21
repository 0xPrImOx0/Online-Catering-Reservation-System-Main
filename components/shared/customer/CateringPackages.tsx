"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ChevronRight } from "lucide-react";
import { EventType } from "@/types/customer/package-types";
import {
  buffetPackages,
  platedPackages,
  eventPackages,
  eventTypes,
} from "@/app/(customer)/packages/packages-metadata";
import PackageCard from "./components/PackageCard";
import EventTypeCard from "./components/EventTypeCard";
import CustomPackageForm from "./components/CustomPackageForm";
import ImageDialog, { useImageDialog } from "./components/ImageDialog";
import "./styles/catering-styles.css";
import { Button } from "@/components/ui/button";

type ServiceType = "Buffet" | "Plated";

export default function CateringPackages() {
  const [activeTab, setActiveTab] = useState("buffet");
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    null
  );
  const [serviceType, setServiceType] = useState<ServiceType>("Buffet");
  const { imageDialog, openImageDialog, closeImageDialog } = useImageDialog();

  return (
    <div className="container mx-auto px-4 py-8">
      <ImageDialog
        imageDialog={imageDialog}
        closeImageDialog={closeImageDialog}
      />

      <h1 className="text-3xl font-bold text-center mb-2">
        Filipino Catering Packages
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Authentic Filipino cuisine for your special events and celebrations
      </p>

      <Tabs
        defaultValue="buffet"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="flex flex-wrap justify-center mb-6 gap-2">
          <TabsTrigger value="buffet">Buffet Packages</TabsTrigger>
          <TabsTrigger value="plated">Plated Course Packages</TabsTrigger>
          <TabsTrigger value="event">Event Packages</TabsTrigger>
          <TabsTrigger value="custom">Custom Package</TabsTrigger>
        </TabsList>

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

        <TabsContent value="plated" className="mt-6">
          <div className="mb-4 p-4 bg-muted rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Plated Course Service</h3>
              <p className="text-sm text-muted-foreground">
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

        <TabsContent value="event" className="mt-6">
          {selectedEventType ? (
            <>
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1"
                  onClick={() => setSelectedEventType(null)}
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Event Types
                </Button>
                <h2 className="text-xl font-bold ml-4">
                  {selectedEventType} Packages
                </h2>
              </div>

              <div className="mb-6">
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
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {eventPackages[selectedEventType].map((pkg) => {
                  // Create a modified package with service fee if plated service is selected
                  const displayPkg =
                    serviceType === "Plated"
                      ? {
                          ...pkg,
                          pricePerPax:
                            pkg.pricePerPax +
                            (100 * pkg.serviceHours) / pkg.minimumPax,
                          name: pkg.name + " (Plated Service)",
                          inclusions: [
                            ...pkg.inclusions,
                            `${pkg.serviceHours} hours of table service`,
                            "Professional waitstaff",
                            "Table-side service",
                            "Course-by-course serving",
                          ],
                        }
                      : pkg;

                  return (
                    <PackageCard
                      key={pkg.id}
                      pkg={displayPkg}
                      openImageDialog={openImageDialog}
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
