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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/types/menu-types";
import type { useMenuForm } from "@/hooks/use-menu-form";

interface BasicInfoStepProps {
  formHook: ReturnType<typeof useMenuForm>;
}

export function BasicInfoStep({ formHook }: BasicInfoStepProps) {
  const { form, validationAttempted } = formHook;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Menu Item Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter menu item name" {...field} />
            </FormControl>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Short Description
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Brief description of the menu item"
                {...field}
              />
            </FormControl>
            <FormDescription>
              A short summary that appears in menu listings
            </FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fullDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Full Description
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Detailed description of the menu item"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-medium">
                  Available
                </FormLabel>
                <FormDescription>
                  Is this menu item currently available?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-medium">Spicy</FormLabel>
                <FormDescription>Is this menu item spicy?</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
