"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Users, Star } from "lucide-react";
import Image from "next/image";
import {
  PackageCardProps,
  PlatedPackage,
} from "@/types/customer/package-types";
import PackageDialog from "./PackageDetailsDialog";

export default function PackageCard({
  pkg,
  openImageDialog,
}: PackageCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isPlated = "serviceHours" in pkg;
  const isAvailable = true; // Assuming all packages are available by default

  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <div
          className="relative h-48 w-full cursor-pointer"
          onClick={() => openImageDialog(pkg.imageUrl, pkg.name)}
        >
          <Image
            src={pkg.imageUrl || "/placeholder.svg"}
            alt={pkg.name}
            fill
            className="object-cover w-full"
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
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-2 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center tooltip-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(4.7)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
              <span className="tooltip">4.7 from 238 customers</span>
            </div>
            <span className="text-white font-bold">
              ₱{pkg.pricePerPax.toLocaleString()} per pax
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{pkg.name}</h3>
            <p className="text-muted-foreground text-sm text-justify">
              {pkg.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Min: {pkg.minimumPax} | Recommended: {pkg.recommendedPax} | Max:{" "}
              {pkg.maximumPax}
            </span>
          </div>

          {isPlated && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {(pkg as PlatedPackage).serviceHours} hours of service included
              </span>
            </div>
          )}

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Menu Options:</h4>
            <div className="grid grid-cols-2 gap-2">
              {pkg.options
                .filter((option) => option.required)
                .map((option, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge variant="default" className="text-xs">
                      {option.count} {option.category}
                      {option.count > 1 ? "s" : ""}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Inclusions:</h4>
            <ul className="text-sm space-y-1 text-justify">
              {/* Show rice trays for buffet and plated packages */}
              {!pkg.id.includes("event") && (
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  {Math.ceil(pkg.minimumPax / 2)} trays of steamed rice (good
                  for {pkg.minimumPax / 2} pax)
                </li>
              )}
              {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  {inclusion}
                </li>
              ))}
              {pkg.inclusions.length > 4 && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => setDialogOpen(true)}
                >
                  +{pkg.inclusions.length - 4} more inclusions
                </Button>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={() => setDialogOpen(true)}>
          Select Package
        </Button>
      </CardFooter>

      <PackageDialog pkg={pkg} open={dialogOpen} onOpenChange={setDialogOpen} />
    </Card>
  );
}
