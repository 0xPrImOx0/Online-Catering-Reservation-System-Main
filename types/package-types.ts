import { SetStateBoolean } from "./global-types";
import { ObjectId } from "mongodb";

// Define types for our packages
export type PackageCategory =
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

export type ServiceType = "Buffet" | "Plated";

export type EventType = "Birthday" | "Wedding" | "Corporate" | "Graduation";

export type PackageType = "BuffetPlated" | "Event";

export interface PackageOption {
  category: PackageCategory;
  count: number;
}

export type InclusionsProps = {
  typeOfCustomer: "Both" | "Buffet" | "Plated";
  includes: string;
};

export interface ReviewProps {
  rating: number;
  comment: string;
  user: ObjectId; // Assuming this is a MongoDB ObjectId
}

//For Temporary. Still Thinking the Proper Schema for Proper Querying for the Backend. THIS ONE WILL BE THE BASIS
export interface CateringPackagesProps {
  name: string;
  description: string;
  available: boolean;
  pricePerPax: number;
  minimumPax: number;
  recommendedPax: number;
  maximumPax: number;
  options: PackageOption[];
  inclusions: InclusionsProps[];
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  serviceHours: number;
  serviceCharge: number;
  eventType?: EventType;
  packageType: PackageType;
  reviews?: ReviewProps[];
  pricePerPaxWithServiceCharge: number;
}

export interface FormStepType {
  id: string;
  title: string;
  description: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue: string;
  serviceHours: string;
  specialRequests: string;
}

export interface FormData extends BookingFormData {
  serviceType: string;
  selectedDishes: Record<PackageCategory, string[]>;
}

export interface ImageDialogState {
  open: boolean;
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface PackageImageDialogProps {
  imageDialog: ImageDialogState;
  closeImageDialog: () => void;
}

export interface PackageCardProps {
  item: CateringPackagesProps;
  isPlated?: string;
}

export interface PackageDetailsDialogProps {
  pkg: CateringPackagesProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPlated: string;
  platedInclusions: InclusionsProps[];
}

export interface PackageBookFormProps {
  package: CateringPackagesProps;
}

export interface EventTypeCardProps {
  eventType: EventType;
  onSelect: (eventType: EventType) => void;
}

export interface DeletePackageDialogProps {
  item: CateringPackagesProps;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: SetStateBoolean;
}

export const packageCategories: PackageCategory[] = [
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

export const eventTypes: EventType[] = [
  "Birthday",
  "Wedding",
  "Corporate",
  "Graduation",
];

export const serviceTypes: ServiceType[] = ["Buffet", "Plated"];

export const inclusionTypes = ["Both", "Buffet", "Plated"] as const;

export const packageFormSteps = [
  {
    id: "package-type",
    title: "Package Type",
    description: "Select the type of package you want to create",
  },
  {
    id: "basic-info",
    title: "Basic Info",
    description: "Enter the basic details about your catering package",
  },
  {
    id: "package-options",
    title: "Package Options",
    description: "Define the menu items included in this package",
  },
  {
    id: "pricing-capacity",
    title: "Pricing & Capacity",
    description: "Set pricing and guest capacity for this package",
  },
  {
    id: "inclusions-services",
    title: "Inclusions & Services",
    description: "Add inclusions and service details",
  },
  {
    id: "image",
    title: "Image",
    description: "Upload or provide a URL for the package image",
  },
  {
    id: "review",
    title: "Review",
  },
];

export interface AddPackageDialogProps {
  isAddPackageOpen: boolean;
  setIsAddPackageOpen: SetStateBoolean;
}

export interface EditPackageDialogProps {
  isEditPackageOpen: boolean;
  setIsEditPackageOpen: SetStateBoolean;
  item: CateringPackagesProps;
}
