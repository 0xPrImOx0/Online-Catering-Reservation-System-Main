"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddMenuFormProps } from "@/types/menu-types";

export function PreparationStep({ formHook }: AddMenuFormProps) {
  const { form, validationAttempted } = formHook;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="preparationMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Preparation Method
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe how this menu item is prepared"
                className="min-h-[200px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include cooking techniques, time, and special instructions
            </FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="perServing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Serving Size
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Amount"
                  className="pr-8"
                  {...field}
                  onChange={(e) => {
                    // Handle the 0 issue by replacing the value completely
                    const value = e.target.value;
                    if (value === "0" || value === "") {
                      field.onChange("");
                    } else {
                      // Remove leading zeros
                      field.onChange(value.replace(/^0+/, ""));
                    }
                  }}
                  value={field.value}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  g
                </div>
              </div>
            </FormControl>
            <FormDescription>Specify the amount per serving</FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />
    </div>
  );
}
