"use client"

import { FormField, FormItem } from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { useFormContext } from "react-hook-form";
import MiniCateringPackageCard from "./MiniCateringPackageCard";
import { useEffect } from "react";

export default function PackageSelection() {
  const { control, watch, setValue } = useFormContext<ReservationValues>();
  const packageSelection = watch("selectedPackage");
  useEffect(() => {
    const selectedPackage = cateringPackages.find((pkg) => pkg._id === packageSelection);
    if (selectedPackage) {
      // Update the form with the selected package details
      setValue("eventType", selectedPackage?.eventType ?? "");
    }
  }, [packageSelection])
  
  return (
    <section>
      <div className="space-y-3">
        {/* <h3 className="font-medium text-base">Main Cuisine Packages</h3> */}
        <FormField
          control={control}
          name="selectedPackage"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 gap-4 space-y-0">
              {cateringPackages.map((pkg) => (
                <MiniCateringPackageCard
                  pkg={pkg}
                  field={field}
                  key={pkg._id}
                />
              ))}
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
