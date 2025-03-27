"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form"; // Fixed import
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  ImageIcon,
  Check,
  Upload,
  Link,
  Percent,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SetStateBoolean } from "@/types/global-types";

// Define the types from your code

type CategoryProps =
  | "Soup"
  | "Salad"
  | "Beef"
  | "Pork"
  | "Noodle"
  | "Chicken"
  | "Seafood"
  | "Vegetable"
  | "Dessert"
  | "Beverage";

type AllergenProps =
  | "Milk"
  | "Eggs"
  | "Fish"
  | "Shellfish"
  | "Tree nuts"
  | "Peanuts"
  | "Wheat"
  | "Soybeans"
  | "Sesame"
  | "Gluten"
  | "Mustard"
  | "Celery"
  | "Lupin"
  | "Molluscs"
  | "Sulphites"
  | "Soy"
  | "Nuts";

interface NutritionInfo {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  sodium: string;
  fiber: string;
  sugar: string;
  cholesterol: string;
}

// Update the PriceInfo interface to include discount
interface PriceInfo {
  minimumPax: number;
  maximumPax: number;
  price: number;
  discount: number;
}

interface MenuItem {
  id: number;
  name: string;
  category: CategoryProps;
  available: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: AllergenProps[];
  preparationMethod: string;
  prices: PriceInfo[];
  regularPricePerPax: number;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  spicy: boolean;
  perServing: string;
  servingUnit: string;
  nutritionInfo: NutritionInfo;
}

// Create arrays for categories and allergens
const categories: CategoryProps[] = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

const allergens: AllergenProps[] = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Gluten",
  "Mustard",
  "Celery",
  "Lupin",
  "Molluscs",
  "Sulphites",
  "Soy",
  "Nuts",
];

interface AddMenuDialogProps {
  isAddMenuOpen: boolean;
  setIsAddMenuOpen: SetStateBoolean;
}

// Form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  category: z.enum(categories as [CategoryProps, ...CategoryProps[]]),
  available: z.boolean().default(true),
  shortDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" }),
  fullDescription: z
    .string()
    .min(20, { message: "Full description must be at least 20 characters" }),
  ingredients: z
    .array(z.string())
    .min(1, { message: "Add at least one ingredient" }),
  allergens: z.array(z.enum(allergens as [AllergenProps, ...AllergenProps[]])),
  preparationMethod: z
    .string()
    .min(10, { message: "Preparation method must be at least 10 characters" }),
  prices: z
    .array(
      z.object({
        minimumPax: z.number().min(1),
        maximumPax: z.number().min(1),
        price: z.number().min(0),
        discount: z.number(),
      })
    )
    .min(1, { message: "Add at least one price tier" }),
  regularPricePerPax: z.number().min(0),
  imageUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal("")),
  imageFile: z.instanceof(File).optional(),
  imageUploadType: z.enum(["url", "upload"]).default("url"),
  spicy: z.boolean().default(false),
  perServing: z.string(),
  servingUnit: z.enum(["g", "kg"]).default("g"),
  nutritionInfo: z.object({
    calories: z.string(),
    protein: z.string(),
    fat: z.string(),
    carbs: z.string(),
    sodium: z.string(),
    fiber: z.string(),
    sugar: z.string(),
    cholesterol: z.string(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Steps for the multi-step form
const steps = [
  { id: "step-1", name: "Basic Info" },
  { id: "step-2", name: "Ingredients & Allergens" },
  { id: "step-3", name: "Preparation" },
  { id: "step-4", name: "Pricing" },
  { id: "step-5", name: "Nutrition" },
  { id: "step-6", name: "Image" },
  { id: "step-7", name: "Review" },
];

// Nutrition units
const nutritionUnits = {
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbs: "g",
  sodium: "mg",
  fiber: "g",
  sugar: "g",
  cholesterol: "mg",
};

// Add predefined pax ranges
const predefinedPaxRanges = [
  { min: 4, max: 6 },
  { min: 8, max: 10 },
  { min: 13, max: 15 },
  { min: 18, max: 20 },
];

export function AddMenuDialog({
  isAddMenuOpen,
  setIsAddMenuOpen,
}: AddMenuDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [newIngredient, setNewIngredient] = useState("");
  // Update the newPrice state to include discount
  const [newPrice, setNewPrice] = useState<PriceInfo>({
    minimumPax: 4,
    maximumPax: 6,
    price: 0,
    discount: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [availablePaxRanges, setAvailablePaxRanges] = useState([
    ...predefinedPaxRanges,
  ]);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  // Add state to track if validation has been attempted
  const [validationAttempted, setValidationAttempted] = useState(false);

  // Change the form mode to not show errors until Next is clicked
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Soup",
      available: true,
      shortDescription: "",
      fullDescription: "",
      ingredients: [],
      allergens: [],
      preparationMethod: "",
      prices: [],
      regularPricePerPax: 0,
      imageUrl: "",
      imageUploadType: "url",
      spicy: false,
      perServing: "",
      servingUnit: "g",
      nutritionInfo: {
        calories: "0",
        protein: "0",
        fat: "0",
        carbs: "0",
        sodium: "0",
        fiber: "0",
        sugar: "0",
        cholesterol: "0",
      },
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      const currentIngredients = form.getValues("ingredients") || [];
      form.setValue("ingredients", [
        ...currentIngredients,
        newIngredient.trim(),
      ]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues("ingredients");
    form.setValue(
      "ingredients",
      currentIngredients.filter((_, i) => i !== index)
    );
  };

  // Update the addPriceTier function to handle the new logic
  const addPriceTier = () => {
    if (
      newPrice.minimumPax > 0 &&
      newPrice.maximumPax >= newPrice.minimumPax &&
      form.getValues("regularPricePerPax") > 0
    ) {
      const currentPrices = form.getValues("prices") || [];
      form.setValue("prices", [...currentPrices, { ...newPrice }]);

      // Remove the used range from available ranges
      const updatedRanges = availablePaxRanges.filter(
        (range) =>
          !(
            range.min === newPrice.minimumPax &&
            range.max === newPrice.maximumPax
          )
      );
      setAvailablePaxRanges(updatedRanges);

      // Set to the next available range or reset if none left
      if (updatedRanges.length > 0) {
        setNewPrice({
          minimumPax: updatedRanges[0].min,
          maximumPax: updatedRanges[0].max,
          price: 0,
          discount: 0,
        });
      } else {
        setNewPrice({
          minimumPax: 0,
          maximumPax: 0,
          price: 0,
          discount: 0,
        });
      }
    }
  };

  const removePriceTier = (index: number) => {
    const currentPrices = form.getValues("prices");
    const removedPrice = currentPrices[index];

    // Add the removed range back to available ranges
    const range = {
      min: removedPrice.minimumPax,
      max: removedPrice.maximumPax,
    };

    // Check if this range is one of our predefined ranges
    const isPredefined = predefinedPaxRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );

    if (isPredefined) {
      setAvailablePaxRanges((prev) =>
        [...prev, range].sort((a, b) => a.min - b.min)
      );
    }

    form.setValue(
      "prices",
      currentPrices.filter((_, i) => i !== index)
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected file
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      form.setValue("imageFile", file);

      // In a real app, you would upload this file to your server/storage
      // and then set the resulting URL to the imageUrl field
      // For now, we'll just use the local preview
    }
  };

  function onSubmit(data: FormValues) {
    // Add ID and default values for rating
    const newMenuItem: MenuItem = {
      ...data,
      id: Math.floor(Math.random() * 10000), // Generate a random ID
      rating: 0,
      ratingCount: 0,
    };

    console.log("Submitting menu item:", newMenuItem);
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Close the dialog after a delay
    setTimeout(() => {
      setOpen(false);
      form.reset();
      setCurrentStep(0);
      setPreviewImage(null);
      setAvailablePaxRanges([...predefinedPaxRanges]);
      setIsSubmitSuccess(false);
    }, 2000);
  }

  const next = () => {
    setValidationAttempted(true);
    const fieldsToValidate = getFieldsToValidate(currentStep);
    form
      .trigger(fieldsToValidate as Array<keyof FormValues>)
      .then((isValid) => {
        if (isValid) {
          setCurrentStep((prev) => prev + 1);
          setValidationAttempted(false); // Reset for next step
        }
      });
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Helper function to get fields to validate for each step
  const getFieldsToValidate = (step: number): Array<keyof FormValues> => {
    switch (step) {
      case 0:
        return [
          "name",
          "category",
          "shortDescription",
          "fullDescription",
          "available",
          "spicy",
        ];
      case 1:
        return ["ingredients", "allergens"];
      case 2:
        return ["preparationMethod", "perServing"];
      case 3:
        return ["prices", "regularPricePerPax"];
      case 4:
        return ["nutritionInfo"];
      case 5:
        return []; // Make image optional by not validating any fields
      default:
        return [];
    }
  };

  // Helper function to check if the current step is valid - used for debugging
  const isCurrentStepValid = () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);

    // If there are no fields to validate, the step is valid
    if (fieldsToValidate.length === 0) {
      return true;
    }

    // If there are any errors in the current fields, the step is invalid
    const hasErrors = fieldsToValidate.some((field) => {
      return !!form.formState.errors[field as keyof FormValues];
    });

    return !hasErrors;
  };

  // Update the price calculation to use Math.ceil
  const calculatePriceFromDiscount = (
    discount: number,
    regularPrice: number
  ) => {
    const discountAmount = (discount / 100) * regularPrice;
    return Math.ceil(regularPrice - discountAmount);
  };

  // Add function to calculate discount from price
  const calculateDiscountFromPrice = (price: number, regularPrice: number) => {
    if (regularPrice === 0) return 0;
    const discountPercentage = ((regularPrice - price) / regularPrice) * 100;
    return Math.round(discountPercentage * 100) / 100; // Round to 2 decimal places
  };

  // Update the useEffect for price recalculation
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "regularPricePerPax") {
        const regularPrice = value.regularPricePerPax as number;

        // Update the current price tier form
        if (newPrice.discount > 0) {
          const calculatedPrice = calculatePriceFromDiscount(
            newPrice.discount,
            regularPrice
          );
          setNewPrice((prev) => ({
            ...prev,
            price: calculatedPrice,
          }));
        } else if (newPrice.price === 0) {
          // If price is 0 and no discount set, default to 100% discount
          setNewPrice((prev) => ({
            ...prev,
            discount: 100,
            price: 0,
          }));
        }

        // Update all existing price tiers
        const currentPrices = form.getValues("prices") || [];
        if (currentPrices.length > 0) {
          const updatedPrices = currentPrices.map((price) => {
            const calculatedPrice = calculatePriceFromDiscount(
              price.discount,
              regularPrice
            );
            return {
              ...price,
              price: calculatedPrice,
            };
          });
          form.setValue("prices", updatedPrices);
        }

        // If regularPricePerPax is 0, reset all prices
        if (!regularPrice) {
          const resetPrices = currentPrices.map((price) => ({
            ...price,
            price: 0,
            discount: 0,
          }));
          form.setValue("prices", resetPrices);
          setNewPrice((prev) => ({ ...prev, price: 0, discount: 0 }));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, newPrice.discount, newPrice.price]);

  // Check form validity on each step to enable/disable Next button
  useEffect(() => {
    const checkValidity = async () => {
      const fieldsToValidate = getFieldsToValidate(currentStep);
      const isValid = await form.trigger(
        fieldsToValidate as Array<keyof FormValues>
      );

      // Special case for image upload
      if (currentStep === 5 && form.getValues("imageUploadType") === "upload") {
        setIsNextButtonDisabled(!previewImage);
      } else {
        setIsNextButtonDisabled(!isValid);
      }
    };

    checkValidity();

    // Also watch for form changes to update button state
    const subscription = form.watch(() => {
      checkValidity();
    });

    return () => subscription.unsubscribe();
  }, [currentStep, form, previewImage]);

  // Define all step content
  const basicInfoStep = (
    <div key="step1" className="space-y-4">
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

      <div className="grid grid-cols-2 gap-4">
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

  const ingredientsStep = (
    <div key="step2" className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium">Ingredients</Label>
        <div className="flex space-x-2">
          <Input
            placeholder="Add an ingredient"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addIngredient();
              }
            }}
          />
          <Button type="button" onClick={addIngredient} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {form.watch("ingredients")?.map((ingredient, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1 text-sm flex items-center gap-1"
            >
              {ingredient}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeIngredient(index)}
              >
                ×
              </Button>
            </Badge>
          ))}
        </div>
        {validationAttempted && form.formState.errors.ingredients && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.ingredients.message}
          </p>
        )}
      </div>

      <FormField
        control={form.control}
        name="allergens"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-medium">Allergens</FormLabel>
              <FormDescription>
                Select all allergens present in this menu item
              </FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {allergens.map((allergen) => (
                <FormField
                  key={allergen}
                  control={form.control}
                  name="allergens"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={allergen}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(allergen)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, allergen])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== allergen
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {allergen}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            {validationAttempted && form.formState.errors.allergens && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.allergens.message}
              </p>
            )}
          </FormItem>
        )}
      />
    </div>
  );

  // Fix the serving size field to always use "g" unit
  const preparationStep = (
    <div key="step3" className="space-y-4">
      <FormField
        control={form.control}
        name="preparationMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Preparation Method
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe how this menu item is prepared"
                className="min-h-[200px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include cooking techniques, time, and special instructions
            </FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="perServing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Serving Size
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Amount"
                  className="pr-8"
                  {...field}
                  onChange={(e) => {
                    // Handle the 0 issue by replacing the value completely
                    const value = e.target.value;
                    if (value === "0" || value === "") {
                      field.onChange("");
                    } else {
                      // Remove leading zeros
                      field.onChange(value.replace(/^0+/, ""));
                    }
                  }}
                  value={field.value}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  g
                </div>
              </div>
            </FormControl>
            <FormDescription>Specify the amount per serving</FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />
    </div>
  );

  // Update the pricingStep to hide the price tiers section when all ranges have prices
  const pricingStep = (
    <div key="step4" className="space-y-6">
      <FormField
        control={form.control}
        name="regularPricePerPax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Regular Price Per Pax
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  $
                </span>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0.00"
                  className="pl-7"
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
              </div>
            </FormControl>
            <FormDescription>Base price per pax</FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      {availablePaxRanges.length > 0 && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Price Tiers</Label>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paxRange">Pax Range</Label>
                  <Select
                    value={`${newPrice.minimumPax}-${newPrice.maximumPax}`}
                    onValueChange={(value) => {
                      const [min, max] = value.split("-").map(Number);
                      setNewPrice((prev) => ({
                        ...prev,
                        minimumPax: min,
                        maximumPax: max,
                      }));
                    }}
                    disabled={availablePaxRanges.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pax range" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePaxRanges.map((range, index) => (
                        <SelectItem
                          key={index}
                          value={`${range.min}-${range.max}`}
                        >
                          {range.min} - {range.max} pax
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discount">Discount</Label>
                  <div className="relative">
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="0"
                      className="pr-8"
                      value={newPrice.discount || ""}
                      disabled={!form.getValues("regularPricePerPax")}
                      onChange={(e) => {
                        // Handle the 0 issue
                        const value = e.target.value;
                        let discountValue;

                        if (value === "0" || value === "") {
                          discountValue = 0;
                          const regularPrice =
                            form.getValues("regularPricePerPax");

                          setNewPrice({
                            ...newPrice,
                            discount: 0,
                            price: regularPrice, // No discount means full price
                          });
                        } else {
                          // Remove leading zeros and convert to number
                          discountValue = Number(value.replace(/^0+/, ""));

                          const regularPrice =
                            form.getValues("regularPricePerPax");
                          const calculatedPrice = calculatePriceFromDiscount(
                            discountValue,
                            regularPrice
                          );

                          setNewPrice({
                            ...newPrice,
                            discount: discountValue,
                            price: calculatedPrice,
                          });
                        }
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                      <Percent className="h-4 w-4" />
                    </div>
                  </div>
                  {!form.getValues("regularPricePerPax") && (
                    <p className="text-xs text-destructive mt-1">
                      Regular price per pax must be set first
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0.00"
                    className="pl-7"
                    value={newPrice.price || ""}
                    disabled={!form.getValues("regularPricePerPax")}
                    onChange={(e) => {
                      // Handle the 0 issue
                      const value = e.target.value;
                      let priceValue;

                      if (value === "0" || value === "") {
                        priceValue = 0;
                        // If price is 0, set discount to 100%
                        const regularPrice =
                          form.getValues("regularPricePerPax");

                        setNewPrice({
                          ...newPrice,
                          price: 0,
                          discount: 100,
                        });
                      } else {
                        // Remove leading zeros and convert to number
                        priceValue = Math.ceil(
                          Number(value.replace(/^0+/, ""))
                        );

                        const regularPrice =
                          form.getValues("regularPricePerPax");
                        const calculatedDiscount = calculateDiscountFromPrice(
                          priceValue,
                          regularPrice
                        );

                        setNewPrice({
                          ...newPrice,
                          price: priceValue,
                          discount: calculatedDiscount,
                        });
                      }
                    }}
                  />
                </div>
                {!form.getValues("regularPricePerPax") && (
                  <p className="text-xs text-destructive mt-1">
                    Regular price per pax must be set first
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={addPriceTier}
                className="w-full"
                disabled={
                  !form.getValues("regularPricePerPax") ||
                  availablePaxRanges.length === 0
                }
              >
                <Plus className="h-4 w-4 mr-1" /> Add Price Tier
              </Button>

              {!form.getValues("regularPricePerPax") && (
                <p className="text-sm text-destructive text-center">
                  You must set a regular price per pax before adding price tiers
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {form.watch("prices")?.length > 0 && (
        <div className="space-y-2">
          <Label className="text-base font-medium">Current Price Tiers</Label>
          <div className="space-y-2">
            {form.watch("prices").map((price, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted py-2 px-4">
                  <CardTitle className="text-sm font-medium flex justify-between">
                    <span>
                      {price.minimumPax} - {price.maximumPax} pax
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => removePriceTier(index)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Price per pax:</span>
                    <span className="font-medium">
                      ${price.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span className="font-medium">
                      {Math.round(price.discount)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>You save:</span>
                    <span className="font-medium text-green-600">
                      $
                      {(
                        form.getValues("regularPricePerPax") - price.price
                      ).toFixed(2)}{" "}
                      per pax
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {validationAttempted && form.formState.errors.prices && (
        <p className="text-sm font-medium text-destructive">
          {form.formState.errors.prices.message}
        </p>
      )}
    </div>
  );

  const nutritionStep = (
    <div key="step5" className="space-y-4">
      <h3 className="text-base font-medium mb-2">Nutrition Information</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(nutritionUnits).map(([key, unit]) => (
          <FormField
            key={key}
            control={form.control}
            name={
              `nutritionInfo.${key}` as `nutritionInfo.${keyof NutritionInfo}`
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{key}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      {...field}
                      className="pr-12"
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(value);
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                      {unit}
                    </div>
                  </div>
                </FormControl>
                {validationAttempted && <FormMessage />}
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );

  const imageStep = (
    <div key="step6" className="space-y-6">
      <FormField
        control={form.control}
        name="imageUploadType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Image Source
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url" className="flex items-center">
                    <Link className="h-4 w-4 mr-2" />
                    Provide URL
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload" className="flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      {form.watch("imageUploadType") === "url" ? (
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Enter a URL for the menu item image
              </FormDescription>
              {validationAttempted && <FormMessage />}
            </FormItem>
          )}
        />
      ) : (
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Upload Image</Label>
            <div className="mt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full h-24 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span>Click to upload</span>
                <span className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, GIF up to 10MB
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {(form.watch("imageUrl") || previewImage) && (
        <div className="mt-4">
          <Label className="text-base font-medium">Image Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden aspect-video flex items-center justify-center bg-muted">
            {form.watch("imageUploadType") === "url" ? (
              form.watch("imageUrl") ? (
                <Image
                  src={form.watch("imageUrl") || "/placeholder.svg"}
                  alt="Menu item preview"
                  className="max-h-full max-w-full object-contain"
                  onError={() => {
                    console.log("Error loading image");
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10 mb-2" />
                  <span>No image provided</span>
                </div>
              )
            ) : previewImage ? (
              <Image
                src={previewImage || "/placeholder.svg"}
                alt="Menu item preview"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2" />
                <span>No image uploaded</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Add a success message to the review step
  const reviewStep = (
    <div key="step7" className="space-y-6">
      {isSubmitSuccess ? (
        <div className="text-center py-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            Menu Item Added Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your new menu item has been added to the catalog.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <Check className="h-12 w-12 text-primary mx-auto mb-2" />
            <h3 className="text-xl font-medium">Review Your Menu Item</h3>
            <p className="text-muted-foreground">
              Please review all information before submitting
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Name
                    </h5>
                    <p className="text-base font-medium">
                      {form.watch("name")}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Category
                    </h5>
                    <p className="text-base">{form.watch("category")}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Short Description
                  </h5>
                  <p className="text-base">{form.watch("shortDescription")}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Full Description
                  </h5>
                  <p className="text-base">{form.watch("fullDescription")}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Available
                    </h5>
                    <Badge
                      variant={form.watch("available") ? "default" : "outline"}
                    >
                      {form.watch("available") ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Spicy
                    </h5>
                    <Badge
                      variant={form.watch("spicy") ? "destructive" : "outline"}
                    >
                      {form.watch("spicy") ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">
                  Ingredients & Allergens
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Ingredients
                  </h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.watch("ingredients")?.map((ingredient, index) => (
                      <Badge key={index} variant="outline">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Allergens
                  </h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.watch("allergens")?.length > 0 ? (
                      form.watch("allergens")?.map((allergen, index) => (
                        <Badge key={index} variant="secondary">
                          {allergen}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Preparation</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Preparation Method
                  </h5>
                  <p className="text-base">{form.watch("preparationMethod")}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Serving Size
                  </h5>
                  <p className="text-base">{form.watch("perServing")} g</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Regular Price Per Pax
                  </h5>
                  <p className="text-base font-medium">
                    ${form.watch("regularPricePerPax").toFixed(2)}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Price Tiers
                  </h5>
                  <div className="space-y-2 mt-1">
                    {form.watch("prices")?.map((price, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded-md"
                      >
                        <div>
                          <span className="font-medium">
                            {price.minimumPax} - {price.maximumPax} pax
                          </span>
                          <div className="text-sm text-muted-foreground">
                            {price.discount > 0 &&
                              `${price.discount}% discount`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${price.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-green-600">
                            Save $
                            {(
                              form.getValues("regularPricePerPax") - price.price
                            ).toFixed(2)}
                            /pax
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Nutrition Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-2 text-base">
                  {Object.entries(nutritionUnits).map(([key, unit]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-sm font-medium text-muted-foreground">
                        {key}
                      </span>
                      <span>
                        {form.watch(
                          `nutritionInfo.${key}` as `nutritionInfo.${keyof NutritionInfo}`
                        )}
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {(form.watch("imageUrl") || previewImage) && (
              <Card>
                <CardHeader className="bg-primary/5 pb-2">
                  <CardTitle className="text-lg">Image</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-hidden h-40 flex items-center justify-center bg-muted rounded-md">
                    <Image
                      src={
                        form.watch("imageUploadType") === "url"
                          ? form.watch("imageUrl")
                          : previewImage || ""
                      }
                      alt="Menu item preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );

  // Create an array of step content
  const stepContent = [
    basicInfoStep,
    ingredientsStep,
    preparationStep,
    pricingStep,
    nutritionStep,
    imageStep,
    reviewStep,
  ];

  if (isDesktop) {
    return (
      <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new menu item to your catalog.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-background z-10 pb-2">
              <Tabs
                defaultValue={steps[currentStep].id}
                value={steps[currentStep].id}
              >
                <TabsList className="grid grid-cols-7 mb-2">
                  {steps.map((step, index) => (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      disabled={true}
                      className={cn(
                        "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        index < currentStep ? "bg-muted" : ""
                      )}
                    >
                      {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="mb-2 text-center font-medium">
                  {steps[currentStep].name}
                </div>
              </Tabs>
            </div>

            <div className="overflow-y-auto py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {stepContent[currentStep]}
                </form>
              </Form>
            </div>
          </div>

          <DialogFooter className="flex justify-between mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={prev}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                disabled={isNextButtonDisabled}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Submit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Menu Item
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Menu Item</DrawerTitle>
          <DrawerDescription>
            Fill out the form to add a new menu item to your catalog.
          </DrawerDescription>
        </DrawerHeader>

        <div
          className="flex-1 overflow-hidden flex flex-col"
          style={{ maxHeight: "calc(80vh - 160px)" }}
        >
          <div className="sticky top-0 bg-background z-10 px-4 pt-2">
            <Tabs
              defaultValue={steps[currentStep].id}
              value={steps[currentStep].id}
            >
              <TabsList className="grid grid-cols-7 mb-2">
                {steps.map((step, index) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    disabled={true}
                    className={cn(
                      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                      index < currentStep ? "bg-muted" : ""
                    )}
                  >
                    {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="mb-2 text-center font-medium">
                {steps[currentStep].name}
              </div>
            </Tabs>
          </div>

          <div className="px-4 py-2 overflow-y-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {stepContent[currentStep]}
              </form>
            </Form>
          </div>
        </div>

        <DrawerFooter className="flex flex-row justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prev}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={next}
              disabled={isNextButtonDisabled}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              Submit
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
