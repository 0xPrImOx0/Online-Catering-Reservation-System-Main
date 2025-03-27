"use client";

import { Check } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type FormStepType = {
  id: string;
  title: string;
  description: string;
};

type MultiStepFormProps = {
  formSteps: FormStepType[];
  children: ReactNode[];
  onSubmit: () => void;
  onNextStep?: (currentStep: number) => Promise<boolean>;
  submitButtonText?: string;
  nextButtonText?: string;
  previousButtonText?: string;
};

export function MultiStepForm({
  formSteps,
  children,
  onSubmit,
  onNextStep,
  submitButtonText = "Submit",
  nextButtonText = "Next",
  previousButtonText = "Previous",
}: MultiStepFormProps) {
  const [formStep, setFormStep] = useState(0);
  const [maxLoader, setMaxLoader] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

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
    setMaxLoader(true);
    onSubmit();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Add Menu Item</h1>
          <p className="text-muted-foreground">
            Complete the form to add a new menu item
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col mb-4 gap-3 sm:hidden">
            <span className="text-muted-foreground text-sm">
              Step {formStep + 1} of {formSteps.length}
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
              className={`flex-1 flex-col items-center hidden sm:flex ${
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
                  maxLoader ? "100" : (formStep / (formSteps.length - 1)) * 100
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
        <CardContent>{children[formStep]}</CardContent>
        <CardFooter className="flex justify-between">
          {formStep > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              {previousButtonText}
            </Button>
          ) : (
            <div></div>
          )}
          {formStep < formSteps.length - 1 ? (
            <Button onClick={nextStep} disabled={isNextButtonDisabled}>
              {nextButtonText}
            </Button>
          ) : (
            <Button onClick={submitForm}>{submitButtonText}</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
