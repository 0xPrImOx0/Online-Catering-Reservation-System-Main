"use client";

import { useEffect, useState } from "react";

import {
  eventPackageFormSteps,
  customPackageFormSteps,
  cateringPackages,
} from "@/lib/customer/packages-metadata";
import CustomerInformation from "@/components/shared/customer/CustomerInformation";
import EventDetails from "@/components/shared/customer/EventDetails";
import CategoryOptions from "./CategoryOptions";
import SummaryBooking from "./SummaryBooking";
import { Form } from "@/components/ui/form";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { useRouter } from "next/navigation";
import PackageSelection from "./PackageSelection";
import { menuItems } from "@/lib/menu-lists";
import SelectServiceModeDialog from "../SelectServiceModeDialog";
export default function BookNowForm({ id }: { id: string }) {
  const router = useRouter();
  const { reservationForm, validateStep, onSubmit } = useReservationForm();
  const [currentStep, setCurrentStep] = useState(3);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [bookNowFormSteps, setBookNowFormSteps] = useState(
    eventPackageFormSteps
  );
  const [showSelectServiceMode, setShowSelectServiceMode] = useState(false);
  const { setValue, getValues } = reservationForm;
  const serviceMode = getValues("serviceMode");
  const deconstructedId = id && id[0];

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

  useEffect(() => {
    const isMenu = menuItems.some((pkg) => pkg._id === deconstructedId);
    const isPackage = cateringPackages.some(
      (pkg) => pkg._id === deconstructedId
    );
    if (deconstructedId) {
      if (isMenu) {
        setValue("serviceMode", "custom");
        setBookNowFormSteps(customPackageFormSteps);
        return;
      }
      if (isPackage) {
        setValue("serviceMode", "event");
        setBookNowFormSteps(eventPackageFormSteps);
        return;
      }
    } else {
      setShowSelectServiceMode(true);
    }
  }, [id, deconstructedId, setValue]);

  const eventPackageFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection key={"package-selection"} />,
    <CategoryOptions key={"category-options"} />,
    <EventDetails key={"event-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];

  const customPackageFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    // <PackageSelection key={"package-selection"} />,
    <CategoryOptions key={"category-options"} />,
    <EventDetails key={"event-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];

  const [formComponents, setFormComponents] = useState(
    eventPackageFormComponents
  );
  useEffect(() => {
    if (serviceMode === "event") {
      setBookNowFormSteps(eventPackageFormSteps);
      setFormComponents(eventPackageFormComponents);
    } else if (serviceMode === "custom") {
      setBookNowFormSteps(customPackageFormSteps);
      setFormComponents(customPackageFormComponents);
    }
  }, [serviceMode]);

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
        setShowSelectServiceMode={setShowSelectServiceMode}
      >
        {formComponents}
      </MultiStepForm>
      <SelectServiceModeDialog
        showSelectServiceMode={showSelectServiceMode}
        setShowSelectServiceMode={setShowSelectServiceMode}
      />
    </Form>
  );

  return <section>{formContent}</section>;
}
