"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { cateringPackages, options } from "@/lib/customer/packages-metadata";
import { useFormContext } from "react-hook-form";
import MiniCateringPackageCard from "./MiniCateringPackageCard";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import clsx from "clsx";

interface PackageSelectionProps {
  showPackageSelection: boolean;
}

export default function PackageSelection({
  showPackageSelection,
}: PackageSelectionProps) {
  const { control, watch, setValue } = useFormContext<ReservationValues>();
  const packageSelection = watch("selectedPackage");

  useEffect(() => {
    const selectedPackage = cateringPackages.find(
      (pkg) => pkg._id === packageSelection
    );
    if (selectedPackage) {
      // Update the form with the selected package details
      setValue("eventType", selectedPackage?.eventType ?? "");
    }
  }, [packageSelection]);

  return (
    <section>
      <div className="space-y-3">
        {!showPackageSelection && (
          <FormField
            control={control}
            name="cateringOptions"
            render={({ field }) => (
              <FormItem className="flex gap-4 space-y-0  max-sm:flex-col">
                {options.map((option) => (
                  <FormControl key={option.value} className="flex-1">
                    <Card
                      onClick={() => field.onChange(option.value)}
                      className={clsx(
                        "flex-1 cursor-pointer border-2 transition-all",
                        {
                          "border-green-500": field.value === option.value,
                        }
                      )}
                    >
                      <CardHeader className="p-0">
                        <Image
                          src={option.imageUrl}
                          alt={option.label}
                          width={200}
                          height={200}
                          className="w-full h-40 rounded-t-lg mb-2 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="mt-4 space-y-2">
                        <CardTitle>{option.label}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </FormControl>
                ))}
              </FormItem>
            )}
          />
        )}
        {/* <h3 className="font-medium text-base">Main Cuisine Packages</h3> */}
        {showPackageSelection && (
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
        )}
      </div>
    </section>
  );
}
