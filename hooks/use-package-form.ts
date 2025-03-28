"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  packageCategories,
  eventTypes,
  serviceTypes,
} from "@/constants/package";
import type {
  PackageCategory,
  EventType,
  ServiceType,
  PackageOption,
  CateringPackagesProps,
  PackageType,
  InclusionsProps,
} from "@/types/package";

// Form schema using Zod
const formSchema = z.object({
  packageType: z.enum(["BuffetPlated", "Event"] as const),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  available: z.boolean().default(true),
  eventType: z.enum(eventTypes as [EventType, ...EventType[]]).optional(),
  serviceType: z
    .enum(serviceTypes as [ServiceType, ...ServiceType[]])
    .default("Buffet"),
  options: z
    .array(
      z.object({
        category: z.enum(
          packageCategories as [PackageCategory, ...PackageCategory[]]
        ),
        count: z.number().min(1, { message: "Count must be at least 1" }),
      })
    )
    .min(1, { message: "Add at least one package option" }),
  pricePerPax: z
    .number()
    .min(1, { message: "Price per pax must be at least 1" }),
  minimumPax: z.number().min(1, { message: "Minimum pax must be at least 1" }),
  recommendedPax: z
    .number()
    .min(1, { message: "Recommended pax must be at least 1" }),
  maximumPax: z.number().min(1, { message: "Maximum pax must be at least 1" }),
  inclusions: z
    .array(
      z.object({
        typeOfCustomer: z.enum(["Both", "Buffet", "Plated"] as const),
        includes: z.string().min(1, { message: "Inclusion must not be empty" }),
      })
    )
    .min(1, { message: "Add at least one inclusion" }),
  serviceChargePerHour: z.number().min(0).optional(),
  serviceHours: z.number().min(0).optional(),
  totalServiceFee: z.number().min(0).optional(),
  totalPriceWithService: z.number().min(0).optional(),
  imageUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal("")),
  imageFile: z.instanceof(File).optional(),
  imageUploadType: z.enum(["url", "upload"]).default("url"),
});

export type PackageFormValues = z.infer<typeof formSchema>;

// Default form values
const defaultValues: PackageFormValues = {
  packageType: "BuffetPlated",
  name: "",
  description: "",
  available: true,
  eventType: undefined,
  serviceType: "Buffet",
  options: [],
  pricePerPax: 0,
  minimumPax: 0,
  recommendedPax: 0,
  maximumPax: 0,
  inclusions: [],
  serviceChargePerHour: 0,
  serviceHours: 0,
  totalServiceFee: 0,
  totalPriceWithService: 0,
  imageUrl: "",
  imageUploadType: "url",
};

export function usePackageForm() {
  const [newOption, setNewOption] = useState<PackageOption>({
    category: "Soup",
    count: 1,
  });
  const [newInclusion, setNewInclusion] = useState<InclusionsProps>({
    typeOfCustomer: "Both",
    includes: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<
    PackageCategory[]
  >([...packageCategories]);
  const [packageTypeSelected, setPackageTypeSelected] = useState(false);

  // Initialize form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  // Reset form function
  const resetForm = () => {
    form.reset(defaultValues);
    setNewOption({ category: "Soup", count: 1 });
    setNewInclusion({ typeOfCustomer: "Both", includes: "" });
    setPreviewImage(null);
    setIsSubmitSuccess(false);
    setValidationAttempted(false);
    setAvailableCategories([...packageCategories]);
    setPackageTypeSelected(false);
  };

  // Add package option function
  const addPackageOption = () => {
    if (newOption.category && newOption.count > 0) {
      const currentOptions = form.getValues("options") || [];
      form.setValue("options", [...currentOptions, { ...newOption }]);

      // Remove the category from available categories
      setAvailableCategories((prev) =>
        prev.filter((cat) => cat !== newOption.category)
      );

      // Set the next available category if any
      if (availableCategories.length > 1) {
        const nextCategory =
          availableCategories.find((cat) => cat !== newOption.category) ||
          "Soup";
        setNewOption({ category: nextCategory, count: 1 });
      } else {
        // No more categories available
        setNewOption({ category: "Soup", count: 1 });
      }
    }
  };

  // Remove package option function
  const removePackageOption = (index: number) => {
    const currentOptions = form.getValues("options");
    const removedOption = currentOptions[index];

    // Add the category back to available categories
    setAvailableCategories((prev) => [...prev, removedOption.category].sort());

    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index)
    );
  };

  // Add inclusion function
  const addInclusion = () => {
    if (newInclusion.includes.trim() !== "") {
      const currentInclusions = form.getValues("inclusions") || [];
      form.setValue("inclusions", [
        ...currentInclusions,
        {
          typeOfCustomer: newInclusion.typeOfCustomer,
          includes: newInclusion.includes.trim(),
        },
      ]);
      setNewInclusion({ typeOfCustomer: "Both", includes: "" });
    }
  };

  // Remove inclusion function
  const removeInclusion = (index: number) => {
    const currentInclusions = form.getValues("inclusions");
    form.setValue(
      "inclusions",
      currentInclusions.filter((_, i) => i !== index)
    );
  };

  // Handle file change for image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected file
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      form.setValue("imageFile", file);
    }
  };

  // Submit form function
  const onSubmit = (data: PackageFormValues) => {
    // Add ID and default values for rating
    const newPackage: CateringPackagesProps = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      name: data.name,
      description: data.description,
      available: data.available,
      pricePerPax: data.pricePerPax,
      minimumPax: data.minimumPax,
      recommendedPax: data.recommendedPax,
      maximumPax: data.maximumPax,
      options: data.options,
      inclusions: data.inclusions,
      imageUrl: data.imageUrl || "",
      serviceHours: data.serviceHours,
      serviceCharge: data.serviceChargePerHour,
      eventType: data.packageType === "Event" ? data.eventType : undefined,
      rating: 0,
      ratingCount: 0,
    };

    console.log("Submitting package:", newPackage);
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new package
    return newPackage;
  };

  // Helper function to get fields to validate for each step
  const getFieldsToValidate = (
    step: number
  ): Array<keyof PackageFormValues> => {
    switch (step) {
      case 0:
        return ["packageType"];
      case 1:
        return [
          "name",
          "description",
          "available",
          ...(form.getValues("packageType") === "Event" ? ["eventType"] : []),
        ];
      case 2:
        return ["options"];
      case 3:
        return ["pricePerPax", "minimumPax", "recommendedPax", "maximumPax"];
      case 4:
        return ["inclusions"];
      case 5:
        return []; // Make image optional by not validating any fields
      default:
        return [];
    }
  };

  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    setValidationAttempted(true);
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setValidationAttempted(false);
    }

    return isValid;
  };

  // Set package type selected
  const selectPackageType = (type: PackageType) => {
    form.setValue("packageType", type);
    setPackageTypeSelected(true);
  };

  // Calculate service fees and total price
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // Remove the auto-adjustment logic for capacity fields
      // Only keep the service fee calculation logic

      // Calculate service fees and total price
      if (
        name === "serviceChargePerHour" ||
        name === "serviceHours" ||
        name === "pricePerPax" ||
        name === "minimumPax"
      ) {
        const serviceChargePerHour =
          (value.serviceChargePerHour as number) || 0;
        const serviceHours = (value.serviceHours as number) || 0;
        const pricePerPax = (value.pricePerPax as number) || 0;
        const minimumPax = (value.minimumPax as number) || 0;

        const totalServiceFee = serviceChargePerHour * serviceHours;
        form.setValue("totalServiceFee", totalServiceFee);

        if (minimumPax > 0) {
          const serviceChargePerPax = totalServiceFee / minimumPax;
          const totalPriceWithService = pricePerPax + serviceChargePerPax;
          form.setValue("totalPriceWithService", totalPriceWithService);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return {
    form,
    newOption,
    setNewOption,
    newInclusion,
    setNewInclusion,
    previewImage,
    setPreviewImage,
    isSubmitSuccess,
    validationAttempted,
    availableCategories,
    packageTypeSelected,
    addPackageOption,
    removePackageOption,
    addInclusion,
    removeInclusion,
    handleFileChange,
    onSubmit,
    validateStep,
    resetForm,
    selectPackageType,
  };
}
