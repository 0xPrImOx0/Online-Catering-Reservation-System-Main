import { Button } from "@/components/ui/button";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { EventType, eventTypes } from "@/types/package-types";
import { ChevronRight, Info } from "lucide-react";
import CustomerPackageCard from "./CustomerPackageCard";
import { SelectedEventContainerProps } from "@/types/component-types";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

export default function SelectedEventContainer({
  selectedEventType,
  setSelectedEventType,
  serviceType,
  setServiceType,
  eventPackages,
}: SelectedEventContainerProps) {
  return (
    <div className="flex gap-12">
      <div className="border-r p-4">
        <div className="flex flex-col space-y-4">
          {eventTypes.map((event) => (
            <Button
              variant={"default"}
              size={"default"}
              className={clsx("font-medium rounded-sm", {
                "border-2 border-foreground": selectedEventType === event,
              })}
              key={event}
            >
              <span className="text-left">{event}</span>
            </Button>
          ))}
        </div>
        <Separator className="mt-24 mb-4" />
        <div className="flex flex-col space-y-4">
          {["Buffet", "Plated"].map((type) => (
            <Button
              variant={"default"}
              size={"default"}
              className={clsx("font-medium rounded-sm", {
                "border-2 border-foreground": type === "Buffet",
              })}
              key={type}
            >
              <span className="text-left">{type}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* <div className="flex items-center mb-2">
        <Button
          variant="ghost"
          className="flex text-base items-center gap-1 self-start -px-4"
          onClick={() => setSelectedEventType("")}
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
                Plated service includes an additional fee of ₱100 per hour for
                professional waitstaff service. This fee is already included in
                the displayed price per person.
              </p>
            </div>
          </div>
        )}
      </div> */}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {eventPackages.map((pkg, index) => {
          return (
            <CustomerPackageCard
              key={index}
              item={pkg}
              isPlated={serviceType}
            />
          );
        })}
      </div>
    </div>
  );
}
