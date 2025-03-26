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
}

export interface CateringPackageProps {
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
  rating: number;
  ratingCount: number;
  serviceHours?: number;
  serviceCharge?: number;
  eventType?: EventType;
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
  item: CateringPackageProps;
}

export interface PackageDetailsDialogProps {
  pkg: CateringPackageProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface PackageBookFormProps {
  package: CateringPackageProps;
}

export interface EventTypeCardProps {
  eventType: EventType;
  onSelect: (eventType: EventType) => void;
}
