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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { eventTypes } from "@/types/package-types";
import type { usePackageForm } from "@/hooks/use-package-form";

interface BasicInfoStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export function BasicInfoStep({ formHook }: BasicInfoStepProps) {
  const { form, validationAttempted } = formHook;
  const packageType = form.watch("packageType");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Package Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter package name" {...field} />
            </FormControl>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe what's included in this package"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a detailed description of the package
            </FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="available"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel className="text-base font-medium">Available</FormLabel>
              <FormDescription>
                Is this package currently available?
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {packageType === "Event" && (
        <FormField
          control={form.control}
          name="eventType"
          rules={{ required: "Please select an event type." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Event Type
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                What type of event is this package designed for?
              </FormDescription>
              {validationAttempted && <FormMessage />}
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
