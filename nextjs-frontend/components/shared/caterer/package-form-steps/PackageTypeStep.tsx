"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { usePackageForm } from "@/hooks/use-package-form";
import type { PackageType } from "@/types/package-types";

interface PackageTypeStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export function PackageTypeStep({ formHook }: PackageTypeStepProps) {
  const { selectPackageType, form } = formHook;
  const selectedType = form.watch("packageType");

  const handleSelectType = (type: PackageType) => {
    selectPackageType(type);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Select Package Type</h3>
        <p className="text-sm text-muted-foreground">
          Choose the type of package you want to create
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className={cn(
            "overflow-hidden cursor-pointer transition-colors h-full flex flex-col",
            selectedType === "BuffetPlated"
              ? "border-primary ring-2 ring-primary/20 shadow-md"
              : "hover:border-primary/50"
          )}
          onClick={() => handleSelectType("BuffetPlated")}
        >
          <CardHeader
            className={cn(
              "pb-2",
              selectedType === "BuffetPlated" ? "bg-primary/10" : "bg-primary/5"
            )}
          >
            <CardTitle className="flex items-center gap-2">
              <Utensils
                className={cn(
                  "h-5 w-5",
                  selectedType === "BuffetPlated" ? "text-primary" : ""
                )}
              />
              Buffet & Plated Packages
            </CardTitle>
            <CardDescription>
              Create packages for buffet or plated service
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 flex-grow">
            <p className="text-sm text-muted-foreground">
              Ideal for regular catering services with buffet or plated service
              options.
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Set menu options by category</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Define pricing and capacity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Add service details and inclusions</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button
              className="w-full"
              variant={selectedType === "BuffetPlated" ? "default" : "outline"}
              onClick={() => handleSelectType("BuffetPlated")}
            >
              {selectedType === "BuffetPlated"
                ? "Selected"
                : "Select Buffet & Plated"}
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={cn(
            "overflow-hidden cursor-pointer transition-colors h-full flex flex-col",
            selectedType === "Event"
              ? "border-primary ring-2 ring-primary/20 shadow-md"
              : "hover:border-primary/50"
          )}
          onClick={() => handleSelectType("Event")}
        >
          <CardHeader
            className={cn(
              "pb-2",
              selectedType === "Event" ? "bg-primary/10" : "bg-primary/5"
            )}
          >
            <CardTitle className="flex items-center gap-2">
              <Calendar
                className={cn(
                  "h-5 w-5",
                  selectedType === "Event" ? "text-primary" : ""
                )}
              />
              Event Packages
            </CardTitle>
            <CardDescription>
              Create packages for specific events
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 flex-grow">
            <p className="text-sm text-muted-foreground">
              Perfect for special occasions like weddings, birthdays, corporate
              events, and graduations.
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Specify event type</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Set menu options by category</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Define pricing, capacity, and inclusions</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button
              className="w-full"
              variant={selectedType === "Event" ? "default" : "outline"}
              onClick={() => handleSelectType("Event")}
            >
              {selectedType === "Event" ? "Selected" : "Select Event Package"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
