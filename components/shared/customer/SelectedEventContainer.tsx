"use client";

import { Button } from "@/components/ui/button";
import { EventType, eventTypes } from "@/types/package-types";
import CustomerPackageCard from "./CustomerPackageCard";
import { SelectedEventContainerProps } from "@/types/component-types";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import PlatedWarning from "../PlatedWarning";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function SelectedEventContainer({
  cateringPackages,
}: SelectedEventContainerProps) {
  const [serviceType, setServiceType] = useState("Buffet");
  const [selectedEventType, setSelectedEventType] = useState<EventType>("All");
  const [isPlated, setIsPlated] = useState(false);
  const [changeEventMobile, setChangeEventMobile] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsPlated(serviceType === "Plated");
    setChangeEventMobile(false);
  }, [serviceType, selectedEventType]);

  const eventPackages =
    selectedEventType === "All"
      ? cateringPackages.filter((pkg) => pkg.packageType === "Event")
      : cateringPackages.filter(
          (pkg) =>
            pkg.packageType === "Event" && pkg.eventType === selectedEventType
        );

  const pkgDescriptions = [
    {
      event: "All",
      description:
        "Celebrate your special day with our delicious Filipino cuisine.",
    },
    {
      event: "Birthday",
      description:
        "Celebrate your special day with our delicious Filipino cuisine.",
    },
    {
      event: "Wedding",
      description:
        "Make your wedding reception memorable with our exquisite catering services.",
    },
    {
      event: "Corporate",
      description:
        "Impress your colleagues and clients with our professional catering.",
    },
    {
      event: "Graduation",
      description:
        "Celebrate academic achievements with our special graduation packages.",
    },
  ];

  return (
    <div
      className={cn(
        "flex gap-10 relative min-h-screen overflow-y-auto",
        isMobile && "flex-col gap-0"
      )}
    >
      <div className={clsx("mt-4 -mb-3 w-full", !isMobile && "hidden")}>
        <Button
          className=""
          onClick={() => setChangeEventMobile((prev) => !prev)}
          size={"custom"}
          variant={"link"}
        >
          <Menu className="min-h-5 min-w-5 ml-auto" /> Change Event Type
        </Button>
      </div>
      <div
        className={clsx(
          "border border-t-0 rounded-lg rounded-t-none p-4 min-w-[200px] bg-background z-10",
          isMobile ? "absolute top-0 left-0 right-0" : "relative",
          !changeEventMobile && isMobile && "hidden"
        )}
      >
        {isMobile && (
          <Button
            className="max-w-fit ml-auto text-destructive "
            onClick={() => setChangeEventMobile((prev) => !prev)}
            size={"custom"}
            variant={"link"}
          >
            <X className="min-h-5 min-w-5" /> Close
          </Button>
        )}
        <div>
          <Label className="text-muted-foreground">Event Types</Label>
          <div className="flex flex-col items-s space-y-4 mt-4">
            <Button
              variant={selectedEventType === "All" ? "default" : "ghost"}
              className={clsx("font-medium rounded-sm justify-start", {
                "text-muted-foreground": selectedEventType !== "All",
              })}
              onClick={() => setSelectedEventType("All")}
            >
              <span className="text-left">All</span>
            </Button>
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
      <div className="space-y-8">
        <div className="mt-6 space-y-5">
          <div className="relative">
            {selectedEventType === "All" && (
              <h3 className="text-4xl font-semibold">All Packages</h3>
            )}
            {eventTypes.map((event, index) => (
              <h3 className="text-4xl font-semibold" key={index}>
                {event === selectedEventType && `${event} Packages`}
              </h3>
            ))}
            {pkgDescriptions.map(({ event, description }, index) => (
              <p className="text-sm text-muted-foreground mt-2" key={index}>
                {selectedEventType === event && description}
              </p>
            ))}
            {/* <Info className="absolute top-0 right-0" /> */}
          </div>
          <PlatedWarning isPlated={serviceType === "Plated"} />
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {eventPackages.map((pkg, index) => {
            return (
              <CustomerPackageCard key={index} item={pkg} isPlated={isPlated} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
