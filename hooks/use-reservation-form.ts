import { PackageCategory } from "@/types/package-types";
import { ReservationItem } from "@/types/reservation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Reservation Schema for Zod
const reservationSchema = z.object({
  fullName: z
    .string({ required_error: "Please provide your Full Name" })
    .min(2, "Full Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Please provide your email address" })
    .email("Please enter a valid email address"),
  contactNumber: z.number().refine((num) => num.toString().length === 10, {
    message: "Contact Number must have exactly 10 digits",
  }),
  eventType: z.string(),
  eventDate: z.date(),
  eventTime: z.string().time(),
  guestCount: z.number().min(20).max(200),
  venue: z.string({ required_error: "Venue is Required" }),
  serviceMode: z.enum(["event", "custom"]),
  serviceType: z.string(),
  serviceHours: z.string(),
  selectedPackage: z.string(),
  selectedMenus: z.record(z.string(), z.array(z.string())),
  specialRequests: z.string(),
});

export type ReservationValues = z.infer<typeof reservationSchema>;

const defaultValues: ReservationValues = {
  fullName: "",
  email: "",
  contactNumber: 0,
  eventType: "Birthday",
  eventDate: new Date(),
  eventTime: "",
  guestCount: 0,
  venue: "",
  serviceMode: "event",
  serviceType: "Buffet",
  serviceHours: "4 hours",
  selectedPackage: "",
  selectedMenus: {} as Record<PackageCategory, string[]>,
  specialRequests: "",
};

export function useReservationForm() {
  const [isValidationAttempted, setIsValidationAttempted] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const reservationForm = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await reservationForm.trigger(fieldsToValidate);
    return isValid;
  };

  // Submit form function
  const onSubmit = (data: ReservationValues) => {
    // Create menu item object
    const reservation: ReservationItem = {
      ...data,
    };
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new menu item
    return reservation;
  };

  const getFieldsToValidate = (
    step: number
  ): Array<keyof ReservationValues> => {
    switch (step) {
      case 0:
        return ["fullName", "email", "contactNumber"];
      case 2:
        return ["serviceMode"];
      case 2:
        return ["selectedMenus"];
      case 3:
        return [
          "eventType",
          "eventDate",
          "guestCount",
          "venue",
          "serviceType",
          "serviceHours",
        ];
      default:
        return [];
    }
  };
  return {
    reservationForm,
    validateStep,
    isValidationAttempted,
    onSubmit,
    isSubmitSuccess,
  };
}
