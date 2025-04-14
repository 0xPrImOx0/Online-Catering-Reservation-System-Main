"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { cateringPackages } from "@/lib/customer/packages-metadata";
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

export default function PackageSelection() {
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

  const options = [
    {
      label: "Event Catering",
      value: "event",
      description: "Plan your perfect event with our predefined packages.",
      imageUrl:
        "https://www.travelwisconsin.com/uploads/places/ac/ac77b893-b6c0-4bb7-ba38-33a1b285c3d7-431017935_914661377327082_7598367058503880550_n.jpg",
      bg: "border-yellow-500",
    },
    {
      label: "Catering on Demand",
      value: "custom",
      description:
        "Order your dishes for delivery or pickup, whenever you want.",
      imageUrl:
        "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*jQSVrNafdz4IW5D7",
      bg: "border-green-500",
    },
  ];

  return (
    <section>
      <div className="space-y-3">
        <FormField
          control={control}
          name="serviceMode"
          render={({ field }) => (
            <FormItem className="flex gap-4 space-y-0  max-sm:flex-col">
              {options.map((option) => (
                <FormControl key={option.value} className="flex-1">
                  <Card
                    onClick={() => field.onChange(option.value)}
                    className={`flex-1 cursor-pointer border-2 transition-all ${
                      field.value === option.value && option.bg
                    }`}
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
        {/* <h3 className="font-medium text-base">Main Cuisine Packages</h3> */}
        {/* <FormField
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
        /> */}
      </div>
    </section>
  );
}
