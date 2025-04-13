import { CategoryProps, MenuItem } from "@/types/menu-types";
import { EventType, eventTypes, PackageCategory } from "@/types/package-types";
import { ReservationItem } from "@/types/reservation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Reservation Schema for Zod
const reservationSchema = z.object({
  fullName: z
    .string({ required_error: "Please provide your Full Name" })
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must not exceed 50 characters"),
  email: z
    .string({ required_error: "Please provide your email address" })
    .email("Please enter a valid email address"),
  contactNumber: z
    .string({ required_error: "Please provide your Contact Number" })
    .regex(/^\d{10}$/, "Contact Number must have exactly 10 digits"),
  eventType: z.enum(eventTypes as [EventType, ...EventType[]], {
    required_error: "Please select an Event Type",
  }),
  eventDate: z
    .date({
      required_error: "Please provide the Event Date",
    })
    .refine((date) => date >= new Date(), {
      message: "Event Date cannot be in the past",
    }),
  eventTime: z
    .string({ required_error: "Please provide the Event Time" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time (HH:mm)"),
  guestCount: z
    .number({ required_error: "Please provide the Guest Count" })
    .min(20, "Guest Count must be at least 20")
    .max(200, "Guest Count must not exceed 200"),
  venue: z
    .string({ required_error: "Please provide the Venue" })
    .min(3, "Venue must be at least 3 characters")
    .max(100, "Venue must not exceed 100 characters"),
  serviceMode: z.enum(["event", "custom"], {
    required_error: "Please select a Service Mode",
  }),
  serviceType: z.enum(["Buffet", "Plated"], {
    required_error: "Please select a Service Type",
  }),
  serviceHours: z
    .string({ required_error: "Please provide the Service Hours" })
    .regex(/^\d+ hours$/, "Service Hours must be in the format 'X hours'"),
  selectedPackage: z
    .string({ required_error: "Please select a Package" })
    .min(1, "Package selection is required"),
  selectedMenus: z
    .record(z.string(), z.array(z.string()))
    .refine(
      (menus) => Object.values(menus).every((items) => items.length > 0),
      { message: "At least one menu item must be selected for each category" }
    ),
  specialRequests: z
    .string()
    .max(500, "Special Requests must not exceed 500 characters")
    .optional(),
  deliveryOption: z.enum(["Pickup", "Delivery"], {
    required_error: "Please select a Delivery Option",
  }),
  deliveryAddress: z
    .string()
    .min(1, "Delivery address is required")
    .max(200, "Delivery address must not exceed 200 characters")
    .optional(),
  deliveryInstructions: z
    .string()
    .max(300, "Delivery Instructions must not exceed 300 characters")
    .optional(),
});

export type ReservationValues = z.infer<typeof reservationSchema>;

const defaultValues: ReservationValues = {
  fullName: "",
  email: "",
  contactNumber: "0",
  eventType: "Birthday",
  eventDate: new Date(),
  eventTime: "",
  guestCount: 0,
  venue: "",
  serviceMode: "event",
  serviceType: "Buffet",
  serviceHours: "4 hours",
  selectedPackage: "pkg-1",
  selectedMenus: {} as Record<PackageCategory, string[]>,
  specialRequests: "",
  deliveryOption: "Pickup",
  deliveryAddress: "",
  deliveryInstructions: "",
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
      case 1:
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

  const handleCheckboxChange = (
    checked: string | boolean,
    field: any,
    category: CategoryProps,
    menu: MenuItem,
    limit: number // Add the limit as a parameter
  ) => {
    const currentSelection = field.value[category] || [];
    const updatedMenus = checked
      ? currentSelection.length < limit // Check if the limit is reached
        ? [...currentSelection, menu._id]
        : currentSelection // If limit is reached, don't add the item
      : currentSelection.filter((id: string) => id !== menu._id); // Remove the item if unchecked

    field.onChange({
      ...field.value,
      [category]: updatedMenus,
    });
  };
  return {
    reservationForm,
    validateStep,
    isValidationAttempted,
    onSubmit,
    isSubmitSuccess,
    handleCheckboxChange,
  };
}
