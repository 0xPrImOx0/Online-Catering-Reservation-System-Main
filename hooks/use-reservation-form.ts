import { CategoryProps } from "@/types/menu-types";
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
  contactNumber: z
    .number({ required_error: "Please provide a valid contact number" })
    .min(10, "Contact Number must be at least 10 characters")
    .max(10, "Contact Number cannot exceed 10 characters"),
  eventType: z.string(),
  eventDate: z.date(),
  eventTime: z.string().time(),
  guestCount: z.number(),
  venue: z.string(),
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
  eventType: "",
  eventDate: new Date(),
  eventTime: "",
  guestCount: 0,
  venue: "",
  serviceType: "Buffet",
  serviceHours: "",
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
    setIsValidationAttempted(true);
    // const fieldsToValidate = getFieldsToValidate(step);
    // const isValid = await form.trigger(fieldsToValidate);

    if (isValidationAttempted) {
      setIsValidationAttempted(false);
    }

    return isValidationAttempted;
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
  return {
    reservationForm,
    validateStep,
    isValidationAttempted,
    onSubmit,
    isSubmitSuccess,
  };
}
