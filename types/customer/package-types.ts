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

export interface PackageOption {
  category: PackageCategory;
  count: number;
  required: boolean;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  pricePerPax: number;
  minimumPax: number;
  recommendedPax: number;
  maximumPax: number;
  options: PackageOption[];
  inclusions: string[];
  imageUrl: string;
}

export interface PlatedPackage extends CateringPackage {
  serviceHours: number;
  serviceCharge: number;
}

export interface EventPackage {
  id: string;
  name: string;
  description: string;
  eventType: EventType;
  pricePerPax: number;
  minimumPax: number;
  serviceHours: number;
  options: PackageOption[];
  inclusions: string[];
  imageUrl: string;
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

export interface PackageImageDialogProps {
  item: CateringPackage;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PackageCardProps {
  pkg: CateringPackage | PlatedPackage;
  openImageDialog: (url: string, title: string) => void;
}

export interface PackageDetailsDialogProps {
  pkg: CateringPackage | PlatedPackage;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PackageBookFormProps {
  package: CateringPackage | PlatedPackage;
}
