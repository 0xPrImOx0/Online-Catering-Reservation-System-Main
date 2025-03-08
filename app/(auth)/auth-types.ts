import { UseFormReturn } from "react-hook-form";

export type LoginFormValues = {
  email: string;
  password: string;
};

export interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (data: LoginFormValues) => void;
}

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface RegisterFormProps {
  form: UseFormReturn<RegisterFormValues>;
  onSubmit: (data: RegisterFormValues) => void;
}
