"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  type CateringPackagesProps,
  type EventType,
  eventTypes,
  type InclusionsProps,
  packageCategories,
  type PackageCategory,
  type PackageOption,
  type PackageType,
} from "@/types/package-types";
import { toast } from "sonner";

// Form schema using Zod
const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    description: z
      .string()
      .min(20, { message: "Description must be at least 20 characters" }),
    available: z.boolean().default(true),
    pricePerPax: z
      .number()
      .min(1, { message: "Price per pax must be at least 1" }),
    pricePerPaxWithServiceCharge: z.number().min(0).optional(), // Changed from totalPriceWithService
    minimumPax: z
      .number()
      .min(10, { message: "Minimum pax must be at least 10" }),
    recommendedPax: z
      .number()
      .min(10, { message: "Recommended pax must be at least 10" }),
    maximumPax: z
      .number()
      .min(10, { message: "Maximum pax must be at least 10" }),
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
    inclusions: z
      .array(
        z.object({
          typeOfCustomer: z.enum(["Both", "Buffet", "Plated"] as const),
          includes: z
            .string()
            .min(1, { message: "Inclusion must not be empty" }),
        })
      )
      .min(1, { message: "Add at least one inclusion" }),
    serviceHours: z.number().min(0).optional(),
    serviceCharge: z.number().min(0).optional(),
    eventType: z.enum(eventTypes as [EventType, ...EventType[]]).optional(),
    packageType: z.enum(["BuffetPlated", "Event"] as const),
    imageUrl: z
      .string()
      .url({ message: "Please enter a valid URL" })
      .or(z.literal("")),
    imageFile: z.instanceof(File).optional(),
    totalServiceFee: z.number().min(0).optional(),
    imageUploadType: z.enum(["url", "upload"]).default("url"),
  })
  .refine((data) => data.packageType !== "Event" || !!data.eventType, {
    path: ["eventType"],
    message: "Please Select an Event Type",
  });

export type PackageFormValues = z.infer<typeof formSchema>;

// Default form values
const defaultValues: PackageFormValues = {
  name: "",
  description: "",
  available: true,
  pricePerPax: 0,
  pricePerPaxWithServiceCharge: 0, // Changed from totalPriceWithService
  minimumPax: 0,
  recommendedPax: 0,
  maximumPax: 0,
  options: [],
  inclusions: [],
  serviceHours: 0,
  serviceCharge: 0,
  eventType: undefined,
  packageType: "BuffetPlated",
  imageUrl: "",
  totalServiceFee: 0,
  imageUploadType: "url",
};

interface UsePackageFormProps {
  initialData?: CateringPackagesProps;
  isEditMode?: boolean;
}

export function usePackageForm({
  initialData,
  isEditMode = false,
}: UsePackageFormProps = {}) {
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
  const [packageTypeSelected, setPackageTypeSelected] = useState(isEditMode);
  const [previousPackageType, setPreviousPackageType] =
    useState<PackageType | null>(null);

  // Convert initialData to form values if in edit mode
  const getInitialValues = (): PackageFormValues => {
    if (!isEditMode || !initialData) return defaultValues;

    // Map packageType from UI display name to internal value
    const mappedPackageType: PackageType =
      initialData.packageType === "BuffetPlated" ? "BuffetPlated" : "Event";

    return {
      packageType: mappedPackageType,
      name: initialData.name,
      description: initialData.description,
      available: initialData.available ?? true,
      eventType: initialData.eventType,
      options: initialData.options,
      pricePerPax: initialData.pricePerPax,
      minimumPax: initialData.minimumPax,
      recommendedPax: initialData.recommendedPax,
      maximumPax: initialData.maximumPax,
      inclusions: initialData.inclusions,
      serviceCharge: initialData.serviceCharge ?? 0,
      serviceHours: initialData.serviceHours ?? 0,
      totalServiceFee:
        (initialData.serviceCharge ?? 0) * (initialData.serviceHours ?? 0),
      pricePerPaxWithServiceCharge:
        initialData.pricePerPaxWithServiceCharge || // Changed from totalPriceWithService
        initialData.pricePerPax +
          ((initialData.serviceCharge ?? 0) * (initialData.serviceHours ?? 0)) /
            initialData.minimumPax,
      imageUrl: initialData.imageUrl ?? "",
      imageUploadType: initialData.imageUrl ? "url" : "upload",
    };
  };

  // Initialize form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  // Initialize available categories based on existing options
  useEffect(() => {
    if (isEditMode && initialData) {
      const usedCategories = initialData.options.map(
        (option) => option.category
      );
      setAvailableCategories(
        packageCategories.filter((cat) => !usedCategories.includes(cat))
      );

      // Set preview image if available
      if (initialData.imageUrl) {
        setPreviewImage(initialData.imageUrl);
      }
    }
  }, [isEditMode, initialData]);

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
    setPreviousPackageType(null);
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
    // Map packageType from internal value to UI display name
    const displayPackageType =
      data.packageType === "BuffetPlated" ? "BuffetPlated" : "Event";

    // Calculate pricePerPaxWithServiceCharge if not already set
    const serviceCharge = data.serviceCharge || 0;
    const serviceHours = data.serviceHours || 0;
    const minimumPax = data.minimumPax || 1; // Avoid division by zero
    const pricePerPax = data.pricePerPax || 0;

    const totalServiceFee = serviceCharge * serviceHours;
    const serviceChargePerPax =
      minimumPax > 0 ? totalServiceFee / minimumPax : 0;
    const pricePerPaxWithServiceCharge = pricePerPax + serviceChargePerPax;

    // Create package object
    const packageData: CateringPackagesProps = {
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
      serviceHours: data.serviceHours || 0,
      serviceCharge: data.serviceCharge || 0,
      eventType: data.packageType === "Event" ? data.eventType : undefined,
      packageType: displayPackageType,
      pricePerPaxWithServiceCharge: pricePerPaxWithServiceCharge,
      _id: ""
    };

    console.log(
      `${isEditMode ? "Updating" : "Submitting"} package:`,
      packageData
    );
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    toast.success(JSON.stringify(data, null, 2));
    // Show success message
    setIsSubmitSuccess(true);

    // Return the package data
    return packageData;
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
          ...(form.getValues("packageType") === "Event"
            ? (["eventType"] as Array<keyof PackageFormValues>)
            : []),
        ];
      case 2:
        return ["options"];
      case 3:
        return ["pricePerPax", "minimumPax", "recommendedPax", "maximumPax"];
      case 4:
        return ["inclusions"]; //IN EDIT MODE THIS IS ERROR SINCE THE PACKAGE META DATA DOESNT HAVE FOR TYPE IN INCLUSIONS
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
    const currentType = form.getValues("packageType");

    // Store the previous type before changing
    setPreviousPackageType(currentType);

    // If changing from one type to another, clear fields not relevant to the new type
    if (currentType !== type) {
      if (type === "BuffetPlated") {
        // Clear Event-specific fields
        form.setValue("eventType", undefined);
      } else if (type === "Event") {
        // Clear BuffetPlated-specific fields
        // (none to clear in this case, but would go here)
      }
    }

    form.setValue("packageType", type);
    setPackageTypeSelected(true);
  };

  // Calculate service fees and total price
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // Calculate service fees and total price
      if (
        name === "serviceCharge" ||
        name === "serviceHours" ||
        name === "pricePerPax" ||
        name === "minimumPax"
      ) {
        const serviceCharge = (value.serviceCharge as number) || 0;
        const serviceHours = (value.serviceHours as number) || 0;
        const pricePerPax = (value.pricePerPax as number) || 0;
        const minimumPax = (value.minimumPax as number) || 0;

        const totalServiceFee = serviceCharge * serviceHours;
        form.setValue("totalServiceFee", totalServiceFee);

        if (minimumPax > 0) {
          const serviceChargePerPax = totalServiceFee / minimumPax;
          const pricePerPaxWithServiceCharge =
            pricePerPax + serviceChargePerPax;
          form.setValue(
            "pricePerPaxWithServiceCharge",
            pricePerPaxWithServiceCharge
          ); // Changed from totalPriceWithService
        }
      }

      // Watch for package type changes
      if (name === "packageType" && previousPackageType !== null) {
        const newType = value.packageType as PackageType;

        // If changing from one type to another, clear fields not relevant to the new type
        if (previousPackageType !== newType) {
          if (newType === "BuffetPlated") {
            // Clear Event-specific fields
            form.setValue("eventType", undefined);
          } else if (newType === "Event") {
            // Clear BuffetPlated-specific fields
            // (none to clear in this case, but would go here)
          }

          // Update previous type
          setPreviousPackageType(newType);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, previousPackageType]);

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
    isEditMode,
  };
}
