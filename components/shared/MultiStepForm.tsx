"use client";

import { Check } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";

export type FormStepType = {
  id: string;
  title: string;
  description: string;
};

type MultiStepFormProps = {
  formSteps: FormStepType[];
  title: string;
  description: string;
  children: ReactNode[];
  onSubmit: () => void;
  onNextStep?: (currentStep: number) => Promise<boolean>;
  onComplete?: () => void;
  onCancel?: () => void;
  initialStep?: number;
  isSubmitComplete?: boolean;
  submitButtonText?: string;
  nextButtonText?: string;
  previousButtonText?: string;
  doneButtonText?: string;
  cancelButtonText?: string;
};

export function MultiStepForm({
  formSteps,
  title,
  description,
  children,
  onSubmit,
  onNextStep,
  onComplete,
  onCancel,
  initialStep,
  isSubmitComplete = false,
  submitButtonText = "Submit",
  nextButtonText = "Next",
  previousButtonText = "Previous",
  doneButtonText = "Done",
  cancelButtonText = "Cancel",
}: MultiStepFormProps) {
  const [formStep, setFormStep] = useState<number>(initialStep || 0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(false);

  // Function to go to next form step
  const nextStep = async () => {
    if (formStep < formSteps.length - 1) {
      setIsNextButtonDisabled(true);

      // If validation function is provided, use it
      if (onNextStep) {
        const isValid = await onNextStep(formStep);
        if (isValid) {
          setFormStep(formStep + 1);
        }
      } else {
        // Otherwise just go to next step
        setFormStep(formStep + 1);
      }

      setIsNextButtonDisabled(false);
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
    onSubmit();
  };

  // Function to complete the form process
  const completeForm = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-background md:pt-4 pb-2 px-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        {/* Mobile step indicator */}
        <div className="flex flex-col mb-2 sm:hidden space-y-2">
          <span className="text-muted-foreground text-sm">
            Step {formStep + 1} of {formSteps.length}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div
              className={`size-8 rounded-full border-2 border-primary flex items-center justify-center ${
                isSubmitComplete && "bg-primary text-primary-foreground"
              }`}
            >
              {isSubmitComplete ? <Check className="h-4 w-4" /> : formStep + 1}
            </div>
            <span className="font-medium">{formSteps[formStep].title}</span>
          </div>
        </div>

        {/* Desktop step indicators */}
        <div className="items-center justify-between hidden sm:flex">
          {formSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 flex flex-col items-center ${
                index < formStep
                  ? "text-primary"
                  : index === formStep
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                  index < formStep || isSubmitComplete
                    ? "bg-primary text-primary-foreground"
                    : index === formStep
                    ? "border-2 border-primary"
                    : "border-2 border-muted"
                }`}
              >
                {index < formStep ? (
                  <Check className="h-4 w-4" />
                ) : isSubmitComplete ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span className="text-xs font-medium text-center px-1 line-clamp-2 h-8">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative mt-2 mb-4">
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
            <Progress
              value={
                isSubmitComplete ? 100 : (formStep / formSteps.length) * 100
              }
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-4">
              <CardTitle className="text-lg">
                {!isSubmitComplete && formSteps[formStep].title}
              </CardTitle>
              <CardDescription>
                {formSteps[formStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-16">
              {children[formStep]}
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 bg-background pt-2 pb-6 md:py-2 px-6 border-t">
          <div className="flex justify-between">
            {isSubmitComplete ? (
              <Button className="ml-auto" onClick={completeForm}>
                {doneButtonText}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  effect={"hoverUnderline"}
                  onClick={onCancel}
                  className="hover:bg-destructive"
                >
                  {cancelButtonText}
                </Button>
                <div className="flex gap-2">
                  {formStep > 0 && (
                    <Button variant="secondary" onClick={prevStep}>
                      {previousButtonText}
                    </Button>
                  )}
                  {formStep < formSteps.length - 1 ? (
                    <Button onClick={nextStep} disabled={isNextButtonDisabled}>
                      {nextButtonText}
                    </Button>
                  ) : (
                    <Button effect={"hoverUnderline"} onClick={submitForm}>
                      {submitButtonText}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
