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
import WhatsTheOccasionCard from "./WhatsTheOccasionCard";
import EventType from "./EventType";
import EventDate from "./EventDate";
import DeliveryDetails from "./DeliveryDetails";
import DeliveryOption from "./DeliveryOption";
import { hoursArray } from "@/types/package-types";
import PlatedWarning from "../PlatedWarning";
import DeliveryWarning from "./DeliveryWarning";
import { useEffect } from "react";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { set } from "date-fns";

export default function EventDetails() {
  const { control, getValues, watch, setValue } =
    useFormContext<ReservationValues>();
  const reservationType = watch("reservationType");
  const cateringOptions = watch("cateringOptions");
  const selectedPackage = getValues("selectedPackage");
  const serviceType = watch("serviceType");
  const serviceHours = watch("serviceHours");
  const eventType = watch("eventType");
  const guestCount = watch("guestCount");

  useEffect(() => {
    const hour = serviceHours?.slice(0, 2);
    setValue("serviceFee", 100 * Number(hour));
  }, [serviceHours]);

    // useEffect(() => {
    //   if (selectedPackage) {
    //     setValue("totalPrice", );
    //   }
    // }, [guestCount]);

  const getRecommendedPax = () => {
    const pkg = cateringPackages.find((pkg) => pkg._id === selectedPackage);
    return pkg?.recommendedPax || 0;
  };



  const recommendedPax = getRecommendedPax();

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
        {reservationType === "event" && (
          <FormField
            control={control}
            name="guestCount"
            render={({ field, fieldState }) => (
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
                {fieldState.error ? (
                  <FormMessage />
                ) : (
                  recommendedPax > 0 && (
                    <span className="italic text-[0.8rem] font-medium text-muted-foreground">
                      *Recommended pax is {recommendedPax} persons
                    </span>
                  )
                )}
              </FormItem>
            )}
          />
        )}
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
                      <RadioGroupItem
                        onClick={() => {
                          setValue("serviceFee", 0);
                          setValue("serviceHours", "");
                        }}
                        value="Buffet"
                        id="buffet"
                      />
                      <Label htmlFor="buffet">Buffet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Plated"
                        id="plated"
                        onClick={() => {
                          setValue("serviceFee", 100 * 4);
                          setValue("serviceHours", "4 hours");
                        }}
                      />
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
      <PlatedWarning isPlated={serviceType === "Plated"} />
      <Separator className="" />
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Delivery Details</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Please provide details about the delivery location and any special
            instructions for the delivery team.
          </p>
          <DeliveryWarning
            isDelivery={getValues("deliveryOption") === "Delivery"}
          />
        </div>
        <DeliveryOption control={control} />
        {getValues("deliveryOption") === "Delivery" && (
          <DeliveryDetails control={control} />
        )}
      </div>
      <Separator />

      <div className="flex justify-between items-end">
        <Label>Total Bill</Label>
        <span className="text-green-500 text-2xl underline underline-offset-4">
          &#8369;{" "}
          {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
        </span>
      </div>
    </div>
  );
}
