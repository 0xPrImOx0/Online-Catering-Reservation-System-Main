"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMenuForm } from "@/hooks/use-menu-form";
import { AddMenuDialogProps, addMenuFormSteps } from "@/types/menu-types";
import { BasicInfoStep } from "./menu-form-steps/BasicInfoStep";
import { IngredientsStep } from "./menu-form-steps/IngredientsStep";
import { PreparationStep } from "./menu-form-steps/PreparationStep";
import { PricingStep } from "./menu-form-steps/PricingStep";
import { NutritionStep } from "./menu-form-steps/NutritionStep";
import { ImageStep } from "./menu-form-steps/ImageStep";
import { ReviewStep } from "./menu-form-steps/ReviewStep";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden

export function AddMenuDialog({
  isAddMenuOpen,
  setIsAddMenuOpen,
}: AddMenuDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const menuFormHook = useMenuForm();
  const { form, onSubmit, validateStep, resetForm } = menuFormHook;

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = addMenuFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    const isValid = await validateStep(currentStep);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setIsAddMenuOpen(false);
    resetForm();
  };

  // Create the form steps components
  const formStepComponents = [
    <BasicInfoStep key="basic-info" formHook={menuFormHook} />,
    <IngredientsStep key="ingredients" formHook={menuFormHook} />,
    <PreparationStep key="preparation" formHook={menuFormHook} />,
    <PricingStep key="pricing" formHook={menuFormHook} />,
    <NutritionStep key="nutrition" formHook={menuFormHook} />,
    <ImageStep key="image" formHook={menuFormHook} />,
    <ReviewStep key="review" formHook={menuFormHook} />,
  ];

  // Content for both Dialog and Drawer
  const formContent = (
    <Form {...form}>
      <MultiStepForm
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onComplete={handleComplete}
        doneButtonText="Close"
      >
        {formStepComponents}
      </MultiStepForm>
    </Form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px] h-[90vh] p-0 flex flex-col overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Menu Form</DialogTitle>
          </VisuallyHidden>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
      <DrawerContent className="h-[90vh] p-0 flex flex-col overflow-hidden">
        <VisuallyHidden>
          <DrawerTitle>Menu Form</DrawerTitle>
        </VisuallyHidden>
        {formContent}
      </DrawerContent>
    </Drawer>
  );
}
