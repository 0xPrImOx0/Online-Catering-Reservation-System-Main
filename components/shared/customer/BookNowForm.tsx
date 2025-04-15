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
export default function BookNowForm({ id }: { id: string }) {
  const router = useRouter();
  const {
    reservationForm,
    validateStep,
    onSubmit,
    showPackageSelection,
    setShowPackageSelection,
  } = useReservationForm();

  const { watch } = reservationForm;

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [bookNowFormSteps, setBookNowFormSteps] = useState(
    eventPackageFormSteps
  );
  const { setValue } = reservationForm;
  const deconstructedId = id && id[0];
  const dynamicPreviousBtn =
    showPackageSelection && currentStep === 1
      ? "Change Catering Options"
      : "Previous";
  const dynamicNextBtn =
    watch("cateringOptions") === "custom" || currentStep !== 1
      ? "Next"
      : !showPackageSelection
      ? "Choose a Package"
      : "Next";

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = bookNowFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));
  console.log(currentStep);

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
    return isValid;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      return true;
    }
    return false;
  };

  // Add a handleCancel function:
  const handleCancel = () => {
    router.push("/");
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
    const isMenu = menuItems.find((pkg) => pkg._id === deconstructedId);
    const isPackage = cateringPackages.some(
      (pkg) => pkg._id === deconstructedId
    );
    if (deconstructedId) {
      if (isMenu) {
        setValue("cateringOptions", "custom");
        setBookNowFormSteps(customPackageFormSteps);
        setValue("selectedMenus", { [isMenu.category]: [deconstructedId] });
        return;
      }
      if (isPackage) {
        setValue("cateringOptions", "event");
        setBookNowFormSteps(eventPackageFormSteps);
        setValue("selectedPackage", deconstructedId);
        return;
      }
    }
  }, [id, deconstructedId, setValue]);

  const reservationFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection
      key={"package-selection"}
      showPackageSelection={showPackageSelection}
    />,
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
        onPrevStep={handlePreviousStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        nextButtonText={dynamicNextBtn}
        previousButtonText={dynamicPreviousBtn}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
        isReservationForm
        setShowPackageSelection={setShowPackageSelection}
      >
        {reservationFormComponents}
      </MultiStepForm>
    </Form>
  );
  return <section>{formContent}</section>;
}
