"use client";

import { Plus, Percent } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddMenuFormProps } from "@/types/menu-types";

export function PricingStep({ formHook }: AddMenuFormProps) {
  const {
    form,
    newPrice,
    setNewPrice,
    availablePaxRanges,
    addPriceTier,
    removePriceTier,
    isValidationAttempted,
    calculatePriceFromDiscount,
    calculateDiscountFromPrice,
    calculateSavings,
  } = formHook;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="regularPricePerPax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Regular Price Per Pax
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  $
                </span>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0.00"
                  className="pl-7"
                  {...field}
                  onChange={(e) => {
                    // Handle the 0 issue by replacing the value completely
                    const value = e.target.value;
                    if (value === "0" || value === "") {
                      field.onChange(0);
                    } else {
                      // Remove leading zeros and convert to number
                      field.onChange(Number(value.replace(/^0+/, "")));
                    }
                  }}
                  value={field.value || ""}
                />
              </div>
            </FormControl>
            <FormDescription>Base price per pax</FormDescription>
            {isValidationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      {availablePaxRanges.length > 0 && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Price Tiers</Label>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paxRange">Pax Range</Label>
                  <Select
                    value={`${newPrice.minimumPax}-${newPrice.maximumPax}`}
                    onValueChange={(value) => {
                      const [min, max] = value.split("-").map(Number);
                      setNewPrice((prev) => ({
                        ...prev,
                        minimumPax: min,
                        maximumPax: max,
                      }));
                    }}
                    disabled={availablePaxRanges.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pax range" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePaxRanges.map((range, index) => (
                        <SelectItem
                          key={index}
                          value={`${range.min}-${range.max}`}
                        >
                          {range.min} - {range.max} pax
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discount">Discount</Label>
                  <div className="relative">
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="0"
                      className="pr-8"
                      value={newPrice.discount || ""}
                      disabled={!form.getValues("regularPricePerPax")}
                      onChange={(e) => {
                        // Handle the 0 issue
                        const value = e.target.value;
                        let discountValue;

                        if (value === "0" || value === "") {
                          discountValue = 0;
                          const regularPrice =
                            form.getValues("regularPricePerPax");

                          setNewPrice({
                            ...newPrice,
                            discount: 0,
                            price: regularPrice, // No discount means full price
                          });
                        } else {
                          // Remove leading zeros and convert to number
                          discountValue = Number(value.replace(/^0+/, ""));

                          const regularPrice =
                            form.getValues("regularPricePerPax");
                          const calculatedPrice = calculatePriceFromDiscount(
                            discountValue,
                            regularPrice
                          );

                          setNewPrice({
                            ...newPrice,
                            discount: discountValue,
                            price: calculatedPrice,
                          });
                        }
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                      <Percent className="h-4 w-4" />
                    </div>
                  </div>
                  {!form.getValues("regularPricePerPax") && (
                    <p className="text-xs text-destructive mt-1">
                      Regular price per pax must be set first
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0.00"
                    className="pl-7"
                    value={newPrice.price || ""}
                    disabled={!form.getValues("regularPricePerPax")}
                    onChange={(e) => {
                      // Handle the 0 issue
                      const value = e.target.value;
                      let priceValue;

                      if (value === "0" || value === "") {
                        priceValue = 0;

                        setNewPrice({
                          ...newPrice,
                          price: 0,
                          discount: 100,
                        });
                      } else {
                        // Remove leading zeros and convert to number
                        priceValue = Math.ceil(
                          Number(value.replace(/^0+/, ""))
                        );

                        const regularPrice =
                          form.getValues("regularPricePerPax");
                        const calculatedDiscount = calculateDiscountFromPrice(
                          priceValue,
                          regularPrice
                        );

                        setNewPrice({
                          ...newPrice,
                          price: priceValue,
                          discount: calculatedDiscount,
                        });
                      }
                    }}
                  />
                </div>
                {!form.getValues("regularPricePerPax") && (
                  <p className="text-xs text-destructive mt-1">
                    Regular price per pax must be set first
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={addPriceTier}
                className="w-full"
                disabled={
                  !form.getValues("regularPricePerPax") ||
                  availablePaxRanges.length === 0
                }
              >
                <Plus className="h-4 w-4 mr-1" /> Add Price Tier
              </Button>

              {!form.getValues("regularPricePerPax") && (
                <p className="text-sm text-destructive text-center">
                  You must set a regular price per pax before adding price tiers
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {form.watch("prices")?.length > 0 && (
        <div className="space-y-2">
          <Label className="text-base font-medium">Current Price Tiers</Label>
          <div className="space-y-2">
            {form.watch("prices").map((price, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted py-2 px-4">
                  <CardTitle className="text-sm font-medium flex justify-between">
                    <span>
                      {price.minimumPax} - {price.maximumPax} pax
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => removePriceTier(index)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Price per pax:</span>
                    <span className="font-medium">
                      ${price.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span className="font-medium">{price.discount}%</span>{" "}
                    {/* THE MENU META DATA MUST BE CHANGE */}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>You save:</span>
                    <span className="font-medium text-green-600">
                      $
                      {(
                        form.getValues("regularPricePerPax") - price.price
                      ).toFixed(2)}{" "}
                      per pax
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total save:</span>
                    <span className="font-medium text-green-600">
                      ${" "}
                      {calculateSavings({
                        regularPricePerPax:
                          form.getValues("regularPricePerPax"),
                        price: price.price,
                        servingSize: price.maximumPax,
                      }).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {isValidationAttempted && form.formState.errors.prices && (
        <p className="text-sm font-medium text-destructive">
          {form.formState.errors.prices.message}
        </p>
      )}
    </div>
  );
}
