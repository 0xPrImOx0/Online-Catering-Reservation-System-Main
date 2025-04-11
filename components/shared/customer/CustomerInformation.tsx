"use client";

import LabelGroup from "../LabelGroup";
import { FormData } from "@/types/package-types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ReservationValues,
  useReservationForm,
} from "@/hooks/use-reservation-form";
import { Input } from "@/components/ui/input";
import { BookNowProps } from "@/types/reservation-types";
import { useFormContext } from "react-hook-form";

export default function CustomerInformation() {
  // const handleFormChange = (field: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  // };
  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<ReservationValues>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Full Name <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Email <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Contact Number <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your contact number"
                  type="number"
                  {...field}
                />
              </FormControl>
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
