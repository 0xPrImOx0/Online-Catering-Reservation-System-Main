"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, X } from "lucide-react";
import { EventType, eventTypes, ServiceType } from "@/types/package-types";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { Button } from "@/components/ui/button";
import CustomerPackageCard from "./CustomerPackageCard";
import EventTypeCard from "./EventTypeCard";
import CustomPackageForm from "./CustomPacakgeForm";
import clsx from "clsx";
import SelectedEventContainer from "./SelectedEventContainer";

export default function CateringPackages() {
  const [activeTab, setActiveTab] = useState<string>("Buffet");
  const [isPlated, setIsPlated] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<EventType>(
    "Birthday"
  );
  const buffetPlatedPackages = cateringPackages.filter(
    (pkg) => pkg.packageType === "BuffetPlated"
  );

  useEffect(() => {
    activeTab === "Plated" ? setIsPlated(true) : setIsPlated(false);
  }, [activeTab]);

  const [closePlatedWarning, setClosePlatedWarning] = useState(false);

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
    <div className="mx-[5%]">
      <div className="">
        <h1 className="text-5xl font-bold mb-4">
          <span className="capitalize">{activeTab}</span> Packages
        </h1>

        <p className="text-muted-foreground mb-10">
          Authentic filipino {activeTab} cuisine for your special events and
          celebrations
        </p>
      </div>

      <Tabs
        defaultValue="Buffet"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="text-foreground overflow-x-auto scrollbar-thin w-full justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
          <TabsTriggerStyle value="Buffet" title="Buffet Packages" />
          <TabsTriggerStyle value="Plated" title="Plated Course" />
          <TabsTriggerStyle value="Event" title="Event Packages" />
          <TabsTriggerStyle value="Custom" title="Create Your Own Package" />
        </TabsList>

        <TabsContent value="Buffet" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buffetPlatedPackages.map((pkg, index) => (
              <CustomerPackageCard key={index} item={pkg} isPlated={isPlated} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Plated" className="mt-6 space-y-8">
          <div
            className={clsx(
              "mb-4 p-4 bg-yellow-50 border-2 border-amber-400 rounded-lg flex items-start gap-3 relative",
              {
                hidden: closePlatedWarning,
              }
            )}
          >
            <Button
              className="absolute right-4 top-4 text-muted-foreground"
              variant={"ghost"}
              size={"custom"}
              onClick={() => setClosePlatedWarning((prev) => !prev)}
            >
              <X className="min-w-5 min-h-5" />
            </Button>
            <Info className="w-20 sm:w-14 md:w-10 lg:w-6 relative text-yellow-500" />
            <div className="space-y-2">
              <h3 className="font-medium">Plated Course Service</h3>
              <p className="text-sm text-foreground text-justify max-w-[1000px]">
                Our plated course packages include professional waitstaff who
                will serve each course directly to your guests&apos; tables. An
                additional service fee of ₱100 per hour is included in the price
                per person.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buffetPlatedPackages.map((pkg, index) => (
              <CustomerPackageCard key={index} item={pkg} isPlated={isPlated} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Event" className="mt-0">
           <SelectedEventContainer
              selectedEventType={selectedEventType}
              setSelectedEventType={setSelectedEventType}
              isPlated={isPlated}
              cateringPackages={cateringPackages}
            />
          {/* {selectedEventType ? (
           
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {eventTypes.map((eventType) => (
                <EventTypeCard
                  key={eventType}
                  eventType={eventType}
                  onSelect={setSelectedEventType}
                />
              ))}
            </div> */}
          {/* )} */}
        </TabsContent>
        <TabsContent value="Custom" className="mt-12 sm:mx-0 lg:mx-8 xl:mx-20">
          <CustomPackageForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
