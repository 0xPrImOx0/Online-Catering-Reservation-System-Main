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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { bookNowFormSteps } from "@/lib/customer/packages-metadata";
import { PackageCategory, FormData } from "@/types/package-types";
import Link from "next/link";
import CustomerInformation from "@/components/shared/customer/CustomerInformation";
import EventDetails from "@/components/shared/customer/EventDetails";
import ReservationSteps from "@/components/shared/customer/ReservationSteps";
import CategoryOptions from "./CategoryOptions";
import SummaryBooking from "./SummaryBooking";
export default function BookNowForm({ id }: { id: string }) {
  const [formStep, setFormStep] = useState(2);
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
    serviceHours: "",
    selectedMenus: {} as Record<PackageCategory, string[]>,
    specialRequests: "",
  });

  // Function to go to next form step
  const nextStep = () => {
    if (formStep < bookNowFormSteps.length - 1) {
      setFormStep(formStep + 1);
    }
  };

  // Function to go to previous form step
  const prevStep = () => {
    if (formStep > 0 || maxLoader) {
      setMaxLoader(false);
      setFormStep(formStep - 1);
    }
  };

  // Function to submit the form
  const submitForm = () => {
    setMaxLoader(true);
    setShowConfirmation(true);
  };

  return (
    <div>
      <ReservationSteps formStep={formStep} maxLoader={maxLoader} />
      <div className="relative my-4">
        <div className=" h-1 bg-muted">
          <div
            className="h-1 bg-primary transition-all rounded-full"
            style={{
              width: `${
                maxLoader ? "100" : (formStep / bookNowFormSteps.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{bookNowFormSteps[formStep].title}</CardTitle>
          <CardDescription>
            {bookNowFormSteps[formStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStep === 0 && (
            <CustomerInformation
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {formStep === 1 && (
            <EventDetails formData={formData} setFormData={setFormData} />
          )}

          {formStep === 2 && (
            <CategoryOptions
              id={id}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {formStep === 3 && <SummaryBooking formData={formData} />}
        </CardContent>
        <CardFooter className="flex justify-between">
          {formStep > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          {formStep < bookNowFormSteps.length - 1 ? (
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
              variant={"ghost"}
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
