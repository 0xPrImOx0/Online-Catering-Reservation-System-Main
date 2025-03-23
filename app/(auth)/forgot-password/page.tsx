"use client";

import ForgotPasswordForm from "@/components/shared/auth/ForgotPasswordForm";
import { forgotPasswordSchema } from "@/utils/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ForgotPasswordFormValues } from "../../../types/auth/auth-types";

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    try {
      console.log(values);
      toast(
        <div className="p-4">
          <p>{JSON.stringify(values, null, 2)}</p>
        </div>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ForgotPasswordForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default ForgotPassword;
