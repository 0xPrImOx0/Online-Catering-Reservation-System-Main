"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import Image from "next/image";
import type { CateringPackage, PlatedPackage } from "../types/catering-types";
import BookNowButton from "./BookNowButton";
import { filipinoDishes } from "../filipino-dishes";
import { PackageDetailsDialogProps } from "@/types/customer/package-types";

export default function PackageDialog({
  pkg,
  open,
  onOpenChange,
}: PackageDetailsDialogProps) {
  const isPlated = "serviceHours" in pkg;
  const isAvailable = true; // Assuming all packages are available by default

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full p-0 h-[90vh] flex flex-col">
        {/* Image Section */}
        <div className="relative w-full" style={{ height: "35%" }}>
          <Image
            src={pkg.imageUrl || "/placeholder.svg"}
            alt={pkg.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant={isAvailable ? "default" : "destructive"}
              className={
                isAvailable
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-500"
              }
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Title and Description Section */}
        <div className="p-6 bg-background">
          <h2 className="text-2xl font-bold">{pkg.name}</h2>
          <p className="text-muted-foreground mt-2">{pkg.description}</p>

          <div className="flex justify-between items-center mt-4 bg-primary text-primary-foreground p-4 rounded-lg">
            <div>
              <span className="text-xl font-bold">
                ₱{pkg.pricePerPax.toLocaleString()} per pax
              </span>
              {isPlated && (
                <span className="text-xs block text-primary-foreground/80">
                  Includes {(pkg as PlatedPackage).serviceHours} hours service
                </span>
              )}
            </div>
            <BookNowButton package={pkg} />
          </div>
        </div>

        {/* Content Section */}
        <div className="overflow-y-auto p-6 flex-grow">
          <div className="grid gap-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Package Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Minimum Guests:
                    </span>
                    <span>{pkg.minimumPax} pax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recommended:</span>
                    <span>{pkg.recommendedPax} pax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Maximum Guests:
                    </span>
                    <span>{pkg.maximumPax} pax</span>
                  </div>
                  {isPlated && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Service Hours:
                      </span>
                      <span>{(pkg as PlatedPackage).serviceHours} hours</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium mb-2">Menu Options:</h4>
                  {pkg.options
                    .filter((option) => option.required)
                    .map((option, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {option.category}:
                        </span>
                        <span>
                          {option.count} selection{option.count > 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">Inclusions</h3>
              <div className="grid grid-cols-1 gap-2">
                {/* Show rice trays for buffet and plated packages */}
                {!pkg.id.includes("event") && (
                  <div className="flex items-center gap-2 col-span-1">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {Math.ceil(pkg.minimumPax / 2)} trays of steamed rice
                      (good for {pkg.minimumPax / 2} pax)
                    </span>
                  </div>
                )}
                {pkg.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-justify">{inclusion}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3">
                Sample Menu Selection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.options
                  .filter((option) => option.required)
                  .map((option, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium">{option.category} Options</h4>
                      <ul className="text-sm space-y-1">
                        {filipinoDishes
                          .filter((dish) => dish.category === option.category)
                          .slice(0, 3)
                          .map((dish) => (
                            <li
                              key={dish.id}
                              className="flex items-center gap-2"
                            >
                              <Check className="h-3 w-3 text-primary" />
                              {dish.name}
                            </li>
                          ))}
                        <li className="text-sm text-muted-foreground">
                          ...and more options available
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
