"use client";

import { Plus } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InclusionsProps, inclusionTypes } from "@/types/package-types";
import type { usePackageForm } from "@/hooks/use-package-form";

interface InclusionsServicesStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export function InclusionsServicesStep({
  formHook,
}: InclusionsServicesStepProps) {
  const {
    form,
    newInclusion,
    setNewInclusion,
    addInclusion,
    removeInclusion,
    validationAttempted,
  } = formHook;

  //   const serviceType = form.watch("serviceType");
  const minimumPax = form.watch("minimumPax");
  const hasCapacityValues = minimumPax > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-medium">Package Inclusions</h3>
          <p className="text-sm text-muted-foreground">
            Add items that are included in this package (e.g., tables, chairs,
            waitstaff)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Select
              value={newInclusion.typeOfCustomer}
              onValueChange={(value: InclusionsProps["typeOfCustomer"]) =>
                setNewInclusion({ ...newInclusion, typeOfCustomer: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select inclusion type" />
              </SelectTrigger>
              <SelectContent>
                {inclusionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex space-x-2">
            <Input
              placeholder="Add an inclusion"
              value={newInclusion.includes}
              onChange={(e) =>
                setNewInclusion({ ...newInclusion, includes: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInclusion();
                }
              }}
            />
            <Button type="button" onClick={addInclusion} size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        {form.watch("inclusions")?.length > 0 && (
          <div className="space-y-2 mt-4">
            {form.watch("inclusions").map((inclusion, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted py-2 px-4">
                  <CardTitle className="text-sm font-medium flex justify-between">
                    <span>For: {inclusion.typeOfCustomer}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => removeInclusion(index)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-sm">
                    <span className="font-medium">{inclusion.includes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {validationAttempted && form.formState.errors.inclusions && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.inclusions.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-medium">Service Details</h3>
          <p className="text-sm text-muted-foreground">
            Define service charges and hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="serviceChargePerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Charge per Hour</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      ₱
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0.00"
                      className="pl-7"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ""}
                      disabled={!hasCapacityValues}
                    />
                  </div>
                </FormControl>
                {!hasCapacityValues && (
                  <FormDescription>Set capacity values first</FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Hours</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                    disabled={!hasCapacityValues}
                  />
                </FormControl>
                {!hasCapacityValues && (
                  <FormDescription>Set capacity values first</FormDescription>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalServiceFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Service Fee</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      ₱
                    </span>
                    <Input
                      type="number"
                      className="pl-7"
                      {...field}
                      value={field.value || ""}
                      disabled={true}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Service Charge per Hour × Service Hours
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalPriceWithService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Price with Service</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      ₱
                    </span>
                    <Input
                      type="number"
                      className="pl-7"
                      {...field}
                      value={field.value || ""}
                      disabled={true}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Price per Pax + (Total Service Fee ÷ Minimum Pax)
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
