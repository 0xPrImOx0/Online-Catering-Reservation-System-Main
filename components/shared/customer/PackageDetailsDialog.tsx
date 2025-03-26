"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import Image from "next/image";
import PackageBookForm from "./PackageBookForm";
import { menuItems } from "@/lib/menu-lists";
import type {
  PackageDetailsDialogProps,
  // PlatedPackage,
} from "@/types/customer/package-types";

export default function PackageDetailsDialog({
  pkg,
  open,
  onOpenChange,
}: PackageDetailsDialogProps) {
  const isPlated = "serviceHours" in pkg;
  const isAvailable = true; // Assuming all packages are available by default

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-xl w-full p-0 max-h-[85vh] flex flex-col overflow-hidden rounded-md">
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-10 bg-background shadow-md border-t-slate-400">
          {/* Image with fixed height */}
          <div className="relative w-full h-[200px]">
            <Image
              src={pkg.imageUrl || "/placeholder.svg"}
              alt={pkg.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-16">
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
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Title and Description Section */}
          <div className="p-6 bg-background border-b border-border">
            <DialogTitle className="text-2xl font-bold">{pkg.name}</DialogTitle>
            <p className="text-muted-foreground mt-2">{pkg.description}</p>

            <div className="flex justify-between items-center mt-4 bg-primary text-primary-foreground px-3 py-2 rounded-md">
              <div>
                <span className="text-lg font-bold">
                  ₱ {pkg.pricePerPax.toFixed(2)} per pax
                </span>
                {isPlated && (
                  <span className="text-xs block text-primary-foreground/80">
                    Includes {pkg?.serviceHours} hours service
                  </span>
                )}
              </div>
              <PackageBookForm package={pkg} />
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="overflow-y-auto p-6 flex-grow">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Package Details</h3>
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
                      <span>{pkg?.serviceHours} hours</span>
                    </div>
                  )}
                </div>
              </Card>
              <Card className="p-4 space-y-2">
                <h4 className="text-lg font-semibold mb-3">Menu Options:</h4>
                {pkg.options.map((option, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {option.category}:
                    </span>
                    <span>
                      {option.count} selection{option.count > 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </Card>
            </div>

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
                {pkg.options.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{option.category} Options</h4>
                    <ul className="text-sm space-y-1">
                      {menuItems
                        .filter((dish) => dish.category === option.category)
                        .slice(0, 3)
                        .map((dish) => (
                          <li key={dish.id} className="flex items-center gap-2">
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
