"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarIcon, Upload, HelpCircle, Save } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      setProgress(progress + 25);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(progress - 25);
    }
  };

  return (
    <main className=" py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Reserve Your Catering Service
          </h1>
          <p className="text-muted-foreground">
            Complete the form below to book your event
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Contact Info</span>
            <span>Event Details</span>
            <span>Menu Selection</span>
            <span>Review</span>
          </div>
        </div>

        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Tell us how to reach you regarding your catering request
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name *</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number *</Label>
                    <Input id="phone" placeholder="(555) 555-5555" />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred contact method *</Label>
                    <RadioGroup
                      defaultValue="email"
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="email" id="email-contact" />
                        <Label htmlFor="email-contact" className="font-normal">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="phone" id="phone-contact" />
                        <Label htmlFor="phone-contact" className="font-normal">
                          Phone
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="text" id="text-contact" />
                        <Label htmlFor="text-contact" className="font-normal">
                          Text Message
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    Tell us about your event so we can prepare accordingly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Event date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full pl-3 text-left font-normal text-muted-foreground"
                        >
                          <span>Pick a date</span>
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Event time *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">
                          Breakfast (7 AM - 10 AM)
                        </SelectItem>
                        <SelectItem value="lunch">
                          Lunch (11 AM - 2 PM)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (2 PM - 5 PM)
                        </SelectItem>
                        <SelectItem value="dinner">
                          Dinner (6 PM - 9 PM)
                        </SelectItem>
                        <SelectItem value="custom">Custom Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestCount">Number of guests *</Label>
                    <Input
                      id="guestCount"
                      type="number"
                      min="1"
                      placeholder="Enter number of guests"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue name</Label>
                    <Input id="venue" placeholder="Enter venue name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venueAddress">Venue address *</Label>
                    <Input
                      id="venueAddress"
                      placeholder="Enter full venue address"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <Label className="mb-2 block">
                      Venue documents (optional)
                    </Label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            Floor plans, images (PDF, PNG, JPG)
                          </p>
                        </div>
                        <input type="file" className="hidden" multiple />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Menu Selection</CardTitle>
                  <CardDescription>
                    Choose your preferred catering package and customize it to
                    your needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div
                      className={cn(
                        "relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:border-primary",
                        selectedPackage === "wedding" &&
                          "border-primary bg-primary/5"
                      )}
                      onClick={() => setSelectedPackage("wedding")}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Wedding Elegance Package
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Premium three-course meal with appetizers and dessert
                          table
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">3-Course Meal</Badge>
                          <Badge variant="outline">Appetizers</Badge>
                          <Badge variant="outline">Dessert Table</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$55.00</p>
                        <p className="text-sm text-muted-foreground">
                          per person
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:border-primary",
                        selectedPackage === "corporate" &&
                          "border-primary bg-primary/5"
                      )}
                      onClick={() => setSelectedPackage("corporate")}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Corporate Deluxe Package
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Professional buffet service with setup and cleanup
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Buffet Style</Badge>
                          <Badge variant="outline">Staff Included</Badge>
                          <Badge variant="outline">Setup & Cleanup</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$35.00</p>
                        <p className="text-sm text-muted-foreground">
                          per person
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:border-primary",
                        selectedPackage === "cocktail" &&
                          "border-primary bg-primary/5"
                      )}
                      onClick={() => setSelectedPackage("cocktail")}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Cocktail Reception Package
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Elegant passed hors d'oeuvres with bar service
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline">Passed Service</Badge>
                          <Badge variant="outline">Bar Service</Badge>
                          <Badge variant="outline">Premium Options</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$45.00</p>
                        <p className="text-sm text-muted-foreground">
                          per person
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Dietary Restrictions</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Select all that apply to your guests
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Vegetarian",
                        "Vegan",
                        "Gluten-Free",
                        "Dairy-Free",
                        "Nut-Free",
                        "Halal",
                        "Kosher",
                        "Other",
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox id={`diet-${item.toLowerCase()}`} />
                          <Label
                            htmlFor={`diet-${item.toLowerCase()}`}
                            className="font-normal"
                          >
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests or additional information about dietary restrictions"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Reservation</CardTitle>
                  <CardDescription>
                    Please review all details before submitting your reservation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="contact">
                      <AccordionTrigger>Contact Information</AccordionTrigger>
                      <AccordionContent>
                        <dl className="divide-y">
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">Name</dt>
                            <dd className="col-span-2">John Doe</dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">Email</dt>
                            <dd className="col-span-2">john@example.com</dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">Phone</dt>
                            <dd className="col-span-2">(555) 555-5555</dd>
                          </div>
                        </dl>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="event">
                      <AccordionTrigger>Event Details</AccordionTrigger>
                      <AccordionContent>
                        <dl className="divide-y">
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">Date</dt>
                            <dd className="col-span-2">March 15, 2025</dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">Time</dt>
                            <dd className="col-span-2">Dinner (6 PM - 9 PM)</dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">
                              Guests
                            </dt>
                            <dd className="col-span-2">50</dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">Venue</dt>
                            <dd className="col-span-2">
                              123 Main Street, Springfield, IL 62704
                            </dd>
                          </div>
                        </dl>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="menu">
                      <AccordionTrigger>Menu Selection</AccordionTrigger>
                      <AccordionContent>
                        <dl className="divide-y">
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">
                              Package
                            </dt>
                            <dd className="col-span-2">
                              Wedding Elegance Package
                            </dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">
                              Dietary Restrictions
                            </dt>
                            <dd className="col-span-2">
                              Vegetarian, Gluten-Free
                            </dd>
                          </div>
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="font-medium text-gray-500">
                              Special Requests
                            </dt>
                            <dd className="col-span-2">
                              Please ensure there are at least 10 vegetarian
                              options available.
                            </dd>
                          </div>
                        </dl>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-6 rounded-lg bg-gray-50 p-4">
                    <h4 className="font-semibold mb-2">Estimated Total</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Package Price (per person)
                        </span>
                        <span>$55.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Number of Guests</span>
                        <span>× 50</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                        <span>Total Estimate</span>
                        <span>$2,750.00</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Final pricing may vary based on specific menu selections
                      and additional services
                    </p>
                  </div>

                  <div className="mt-6 flex items-start space-x-3">
                    <Checkbox id="terms" />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="terms">
                        I accept the terms and conditions
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        By submitting this reservation, you agree to our{" "}
                        <Link href="/terms" className="underline">
                          terms of service
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button className="ml-auto">Submit Reservation</Button>
            )}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="fixed bottom-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                Having trouble with your reservation? Check our FAQ or contact
                us directly.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/faq"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View FAQ
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
