"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePackageForm } from "@/hooks/use-package-form";
import { packageFormSteps } from "@/types/package-types";
import { PackageTypeStep } from "./package-form-steps/PackageTypeStep";
import { BasicInfoStep } from "./package-form-steps/BasicInfoStep";
import { PackageOptionsStep } from "./package-form-steps/PackageOptionsStep";
import { PricingCapacityStep } from "./package-form-steps/PricingCapacityStep";
import { InclusionsServicesStep } from "./package-form-steps/InclusionsServicesStep";
import { ImageStep } from "./package-form-steps/ImageStep";
import { ReviewStep } from "./package-form-steps/ReviewStep";
import { FormStepType, MultiStepForm } from "../MultiStepForm";

export function AddPackageDialog() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const packageFormHook = usePackageForm();
  const { form, onSubmit, validateStep, resetForm } = packageFormHook;

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = packageFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description,
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
    setOpen(false);
    resetForm();
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    form.handleSubmit((data) => {
      onSubmit(data);
      setIsSubmitComplete(true);
    })();
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setOpen(false);
    resetForm();
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  // Create the form steps components
  const formStepComponents = [
    <PackageTypeStep key="package-type" formHook={packageFormHook} />,
    <BasicInfoStep key="basic-info" formHook={packageFormHook} />,
    <PackageOptionsStep key="package-options" formHook={packageFormHook} />,
    <PricingCapacityStep key="pricing-capacity" formHook={packageFormHook} />,
    <InclusionsServicesStep
      key="inclusions-services"
      formHook={packageFormHook}
    />,
    <ImageStep key="image" formHook={packageFormHook} />,
    <ReviewStep key="review" formHook={packageFormHook} />,
  ];

  // Content for both Dialog and Drawer
  const formContent = (
    <Form {...form}>
      <MultiStepForm
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
      >
        {formStepComponents}
      </MultiStepForm>
    </Form>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          if (!newOpen) {
            resetForm();
            setCurrentStep(0);
            setIsSubmitComplete(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Package
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px] h-[90vh] p-0 flex flex-col overflow-hidden">
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          resetForm();
          setCurrentStep(0);
          setIsSubmitComplete(false);
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] p-0 flex flex-col overflow-hidden">
        {formContent}
      </DrawerContent>
    </Drawer>
  );
}
