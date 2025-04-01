"use client";

import { Button } from "@/components/ui/button";
import { eventTypes } from "@/types/package-types";
import CustomerPackageCard from "./CustomerPackageCard";
import { SelectedEventContainerProps } from "@/types/component-types";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function SelectedEventContainer({
  selectedEventType,
  setSelectedEventType,
  cateringPackages,
}: SelectedEventContainerProps) {
  const [serviceType, setServiceType] = useState("Buffet");
  const [isPlated, setIsPlated] = useState(false);
  useEffect(() => {
    serviceType === "Plated" ? setIsPlated(true) : setIsPlated(false);
  }, [serviceType]);

  const eventPackages = cateringPackages.filter(
    (pkg) => pkg.packageType === "Event" && pkg.eventType === selectedEventType
  );

  return (
    <div className="flex gap-10 ">
      <div className="border border-t-0 rounded-lg rounded-t-none p-4 min-w-[200px]">
        <Label className="text-muted-foreground">Event Types</Label>
        <div className="flex flex-col items-s space-y-4 mt-4">
          {eventTypes.map((event) => (
            <Button
              variant={selectedEventType === event ? "default" : "ghost"}
              className={clsx("font-medium rounded-sm justify-start", {
                "text-muted-foreground": selectedEventType !== event,
              })}
              onClick={() => setSelectedEventType(event)}
              key={event}
            >
              <span className="text-left">{event}</span>
            </Button>
          ))}
        </div>
        <Separator className="mt-16 mb-4" />
        <div className="flex flex-col space-y-4">
          <Label className="text-muted-foreground">Package Types</Label>
          {["Buffet", "Plated"].map((type) => (
            <Button
              variant={type === serviceType ? "default" : "ghost"}
              className={clsx("font-medium rounded-sm justify-start", {
                "text-muted-foreground": type !== serviceType,
              })}
              onClick={() => setServiceType(type)}
              key={type}
            >
              <span className="text-left">{type}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        {eventPackages.map((pkg, index) => {
          return (
            <CustomerPackageCard key={index} item={pkg} isPlated={isPlated} />
          );
        })}
      </div>
    </div>
  );
}
