"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { formSteps } from "@/lib/customer/packages-metadata";
import { menuItems } from "@/lib/menu-lists";
import { PackageCategory, FormData } from "@/types/package-types";
import Link from "next/link";

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [maxLoader, setMaxLoader] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    venue: "",
    serviceType: "Buffet",
    serviceHours: "4",
    selectedDishes: {} as Record<PackageCategory, string[]>,
    specialRequests: "",
  });

  // Function to handle form data changes
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Function to handle dish selection
  const handleDishSelection = (
    category: PackageCategory,
    dishId: string,
    selected: boolean
  ) => {
    setFormData((prev) => {
      const currentSelection = prev.selectedDishes[category] || [];
      let newSelection;

      if (selected) {
        newSelection = [...currentSelection, dishId];
      } else {
        newSelection = currentSelection.filter((id) => id !== dishId);
      }

      return {
        ...prev,
        selectedDishes: {
          ...prev.selectedDishes,
          [category]: newSelection,
        },
      };
    });
  };

  // Function to get dishes by category
  const getDishesByCategory = (category: PackageCategory) => {
    return menuItems.filter((dish) => dish.category === category);
  };

  // Function to go to next form step
  const nextStep = () => {
    if (formStep < formSteps.length - 1) {
      setFormStep(formStep + 1);
    }
  };

  // Function to go to previous form step
  const prevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };

  // Function to submit the form
  const submitForm = () => {
    setMaxLoader(true);
    setShowConfirmation(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Reserve Your Catering Service
          </h1>
          <p className="text-muted-foreground">
            Complete the form below to book your event
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col mb-4 gap-3 sm:hidden">
            <span className="text-muted-foreground text-sm">
              Step {formStep + 1} of 4
            </span>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                {formStep + 1}
              </div>
              <span className="text-xl font-medium">
                {formSteps[formStep].title}
              </span>
            </div>
          </div>
          {formSteps.map((step, index) => (
            <div
              key={step.id}
              className={` flex-1 flex-col items-center hidden sm:flex ${
                index < formStep
                  ? "text-primary"
                  : index === formStep
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index < formStep || maxLoader
                    ? "bg-primary text-primary-foreground"
                    : index === formStep
                    ? "border-2 border-primary"
                    : "border-2 border-muted"
                }`}
              >
                {index < formStep || maxLoader ? (
                  <Check className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
            <div
              className="absolute top-0 left-0 h-1 bg-primary transition-all"
              style={{
                width: `${
                  maxLoader ? "100" : (formStep / formSteps.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{formSteps[formStep].title}</CardTitle>
          <CardDescription>{formSteps[formStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {formStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {formStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleFormChange("eventType", value)
                    }
                    value={formData.eventType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="graduation">Graduation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      handleFormChange("eventDate", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Number of Guests</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    placeholder="Enter expected number of guests"
                    value={formData.guestCount}
                    onChange={(e) =>
                      handleFormChange("guestCount", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    placeholder="Enter event venue"
                    value={formData.venue}
                    onChange={(e) => handleFormChange("venue", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <RadioGroup
                    defaultValue={formData.serviceType}
                    onValueChange={(value) =>
                      handleFormChange("serviceType", value)
                    }
                    className="grid grid-cols-2 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Buffet" id="buffet" />
                      <Label htmlFor="buffet">Buffet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Plated" id="plated" />
                      <Label htmlFor="plated">Plated Service</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceHours">Service Hours</Label>
                  <Select
                    onValueChange={(value) =>
                      handleFormChange("serviceHours", value)
                    }
                    value={formData.serviceHours}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="5">5 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="10">10 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-6">
              {[
                "Soup",
                "Salad",
                "Chicken",
                "Pork",
                "Beef",
                "Seafood",
                "Vegetable",
                "Noodle",
                "Dessert",
                "Beverage",
              ].map((category) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-medium">{category} Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getDishesByCategory(category as PackageCategory).map(
                      (dish) => (
                        <div
                          key={dish.id}
                          className="flex items-start space-x-2"
                        >
                          <Checkbox
                            id={`dish-${dish.id}`}
                            onCheckedChange={(checked) =>
                              handleDishSelection(
                                category as PackageCategory,
                                dish.id.toString(),
                                checked as boolean
                              )
                            }
                            checked={(
                              formData.selectedDishes[
                                category as PackageCategory
                              ] || []
                            ).includes(dish.id.toString())}
                          />
                          <div className="grid gap-1.5">
                            <Label
                              htmlFor={`dish-${dish.id}`}
                              className="font-medium"
                            >
                              {dish.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {dish.shortDescription}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requests or dietary requirements?"
                  value={formData.specialRequests}
                  onChange={(e) =>
                    handleFormChange("specialRequests", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Custom er Information</h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{formData.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{formData.email}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{formData.phone}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Event Details</h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Event Type:</span>
                      <span>{formData.eventType}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{formData.eventDate}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Guests:</span>
                      <span>{formData.guestCount}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Venue:</span>
                      <span>{formData.venue}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">
                        Service Type:
                      </span>
                      <span>{formData.serviceType}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">
                        Service Hours:
                      </span>
                      <span>{formData.serviceHours} hours</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Selected Menu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.selectedDishes).map(
                    ([category, dishIds]) => {
                      if (dishIds.length === 0) return null;
                      return (
                        <div key={category}>
                          <h4 className="text-sm font-medium">{category}</h4>
                          <ul className="text-sm space-y-1 mt-1">
                            {dishIds.map((id) => {
                              const dish = menuItems.find(
                                (d) => d.id.toString() === id
                              );
                              return dish ? (
                                <li
                                  key={id}
                                  className="flex items-center gap-2"
                                >
                                  <Check className="h-3 w-3 text-primary" />
                                  {dish.name}
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {formData.specialRequests && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Special Requests</h3>
                    <p className="text-sm">{formData.specialRequests}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {formStep > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          {formStep < formSteps.length - 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={submitForm}>Submit Request</Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Request Sent!</DialogTitle>
            <DialogDescription>
              Thank you for your reservation request. Our caterer will call you
              within 1 hour to discuss the details and provide you with a quote.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="rounded-full p-3 bg-green-500">
              <Check className="size-10 text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant={"secondary"}
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </Button>
            <Button
              variant={"default"}
              onClick={() => setShowConfirmation(false)}
              asChild
            >
              <Link href={"/"}>Go to home</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
