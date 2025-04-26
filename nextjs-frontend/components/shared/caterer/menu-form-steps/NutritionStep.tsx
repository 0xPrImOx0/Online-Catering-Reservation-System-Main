"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AddMenuFormProps,
  NutritionInfo,
  nutritionUnits,
} from "@/types/menu-types";

export function NutritionStep({ formHook }: AddMenuFormProps) {
  const { form, isValidationAttempted } = formHook;

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium mb-2">Nutrition Information</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(nutritionUnits).map(([key, unit]) => (
          <FormField
            key={key}
            control={form.control}
            name={
              `nutritionInfo.${key}` as `nutritionInfo.${keyof NutritionInfo}`
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{key}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      {...field}
                      className="pr-12"
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(value);
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                      {unit}
                    </div>
                  </div>
                </FormControl>
                {isValidationAttempted && <FormMessage />}
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
