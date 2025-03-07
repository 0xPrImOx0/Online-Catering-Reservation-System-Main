import { UseFormReturn } from "react-hook-form";

export type LoginFormValues = {
  email: string;
  password: string;
};

export interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (data: LoginFormValues) => void;
}
