"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMenuForm } from "@/hooks/use-menu-form";
import { formSteps } from "@/constants/menu";
import { MultiStepForm, type FormStepType } from "@/components/multi-step-form";
import { BasicInfoStep } from "@/components/menu-form-steps/basic-info-step";
import { IngredientsStep } from "@/components/menu-form-steps/ingredients-step";
import { PreparationStep } from "@/components/menu-form-steps/preparation-step";
import { PricingStep } from "@/components/menu-form-steps/pricing-step";
import { NutritionStep } from "@/components/menu-form-steps/nutrition-step";
import { ImageStep } from "@/components/menu-form-steps/image-step";
import { ReviewStep } from "@/components/menu-form-steps/review-step";
import { SetStateBoolean } from "@/types/global-types";

interface AddMenuDialogProps {
  isAddMenuOpen: boolean;
  setIsAddMenuOpen: SetStateBoolean;
}

export function AddMenuDialog({
  isAddMenuOpen,
  setIsAddMenuOpen,
}: AddMenuDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const menuFormHook = useMenuForm();
  const { form, onSubmit, validateStep } = menuFormHook;

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = formSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description,
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

  // Close dialog and reset form
  //   const handleDialogClose = () => {
  //     setOpen(false);
  //     form.reset();
  //   };

  // Content for both Dialog and Drawer
  const formContent = (
    <Form {...form}>
      <MultiStepForm
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
      >
        {formStepComponents}
      </MultiStepForm>
    </Form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Menu Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Menu Item
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        {formContent}
      </DrawerContent>
    </Drawer>
  );
}
