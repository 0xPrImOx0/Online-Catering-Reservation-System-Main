import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";

export default function PackageChangeWarning({
  setShowSelectServiceMode,
}: {
  setShowSelectServiceMode?: (show: boolean) => void;
}) {
  const { getValues } = useFormContext<ReservationValues>();
  const serviceMode = getValues("serviceMode");
  return (
    <div>
      <Separator className="my-8" />
      <div
        className={
          "mb-4 p-4 border border-muted-foreground rounded-lg flex items-start gap-3 relative"
        }
      >
        <Info className="w-20 sm:w-14 md:w-10 lg:w-6 relative" />
        <div className="space-y-2">
          <h3 className="font-medium">
            {serviceMode === "event"
              ? "You are booking a Predefined Event Package"
              : "You are creating a Custom Package"}
          </h3>
          <p className="text-sm text-muted-foreground text-justify max-w-[1000px]">
            {serviceMode === "event"
              ? "This form is for booking a predefined event package. If you'd like to create your own package instead, click the button below."
              : "This form is for creating a personalized catering package tailored to your needs. If you'd like to switch to a predefined event package, click the button below."}
          </p>
          <div className="w-full flex gap-2 justify-end">
            {/* <Button
            variant="ghost"
            className=""
            size="sm"
            onClick={() => setShowSelectServiceMode(true)}
          >
            Close
          </Button> */}
            <Button size="sm" onClick={() => setShowSelectServiceMode?.(true)}>
              {serviceMode === "event"
                ? "Switch to Custom Package"
                : "Switch to Event Package"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
