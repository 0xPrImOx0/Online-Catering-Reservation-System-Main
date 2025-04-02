"use client";
import { useState } from "react";
import { formSteps } from "@/lib/customer/packages-metadata";
import { Check } from "lucide-react";

export default function ReservationSteps({
  formStep,
  maxLoader,
}: {
  formStep: number;
  maxLoader: boolean;
}) {

  return (
    <div className="flex items-center">
      <div className="flex flex-col mb-4 gap-3 sm:hidden">
        <span className="text-muted-foreground text-sm">
          Step {formStep + 1} of 4
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
          className={` flex-1 flex-col items-center hidden sm:flex ${
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
  );
}
