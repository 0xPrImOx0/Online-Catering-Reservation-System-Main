"use client";

import { useState } from "react";
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
import Link from "next/link";
import CustomerInformation from "@/components/shared/customer/CustomerInformation";
import EventDetails from "@/components/shared/customer/EventDetails";
import CategoryOptions from "./CategoryOptions";
import SummaryBooking from "./SummaryBooking";
import { Form } from "@/components/ui/form";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { useRouter } from "next/navigation";
import PackageSelection from "./PackageSelection";
export default function BookNowForm({ id }: { id: string }) {
  const router = useRouter();
  const { reservationForm, validateStep, onSubmit } = useReservationForm();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = bookNowFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
    return isValid;
  };

  // Add a handleCancel function:
  const handleCancel = () => {
    router.back();
  };

  // Handle form submission
  const handleSubmit = () => {
    setShowConfirmation(true);
    reservationForm.handleSubmit((data) => {
      onSubmit(data);
      setIsSubmitComplete(true);
    })();
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  const formStepComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection key={"package-selection"} />,
    <CategoryOptions key={"category-options"} />,
    <EventDetails key={"event-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];

  const formContent = (
    <Form {...reservationForm}>
      <MultiStepForm
        title={"Reserve Your Catering Service"}
        description={"Complete the form below to book your event"}
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
        isReservationForm
      >
        {formStepComponents}
      </MultiStepForm>
    </Form>
  );

  return (
    <div>
      {formContent}
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
