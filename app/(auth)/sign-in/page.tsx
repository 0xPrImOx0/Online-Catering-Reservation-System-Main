"use client";

import { SignInForm } from "@/components/shared/auth/SignInForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { SignInFormValues } from "../../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/form-validation";
import { toast } from "sonner";

export default function LoginPage() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
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
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-sm p-2 space-y-3">
            <SignInForm form={form} onSubmit={onSubmit} />
          </Card>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Skeleton className="flex w-[100%] h-[100%] rounded-none" />
      </div>
    </div>
  );
}
