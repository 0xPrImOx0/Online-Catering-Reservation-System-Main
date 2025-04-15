"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import WhatsTheOccasionCard from "./WhatsTheOccasionCard";
import EventType from "./EventType";
import EventDate from "./EventDate";
import DeliveryDetails from "./DeliveryDetails";
import DeliveryOption from "./DeliveryOption";
import { hoursArray } from "@/types/package-types";

export default function EventDetails() {
  const { control, getValues, watch } = useFormContext<ReservationValues>();
  const reservationType = watch("reservationType");
  const cateringOptions = watch("cateringOptions");
  const serviceType = watch("serviceType");
  const eventType = watch("eventType");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cateringOptions === "custom" && (
          <WhatsTheOccasionCard control={control} />
        )}
        {reservationType === "event" && eventType !== "No Event" && (
          <EventType control={control} />
        )}
        <EventDate control={control} />
        <FormField
          control={control}
          name="guestCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Number of Guests <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter expected guests"
                  type="number"
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {reservationType === "event" && (
          <FormField
            control={control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  Venue <span className="text-destructive">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your event venue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      {reservationType === "event" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  Service Type <span className="text-destructive">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Buffet" id="buffet" />
                      <Label htmlFor="buffet">Buffet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Plated" id="plated" />
                      <Label htmlFor="plated">Plated Service</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {serviceType === "Plated" && (
            <FormField
              control={control}
              name="serviceHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    Service Hours <span className="text-destructive">*</span>{" "}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service hours rendered" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hoursArray.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}
      <Separator className="" />
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Delivery Details</h3>
          <p className="text-sm text-muted-foreground">
            Please provide details about the delivery location and any special
            instructions for the delivery team.
          </p>
        </div>
        <DeliveryOption control={control} />
        {getValues("deliveryOption") === "Delivery" && (
          <DeliveryDetails control={control} />
        )}
      </div>
    </div>
  );
}
