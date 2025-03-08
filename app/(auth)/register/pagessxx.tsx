"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUpSchema } from "@/utils/formValidtion";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import Icons from "@/constants/Icons";

interface FormProps {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "", // Ensuring controlled input
      email: "",
      // phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Immediate validation feedback
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
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
    <div className={`flex flex-col lg:flex-row h-screen overflow-auto`}>
      <div className="flex flex-1 lg:order-1 justify-center items-center min-h-[500px]">
        <Skeleton className="flex w-[100%] h-[100%] rounded-none" />
      </div>
      <div className="flex flex-1 justify-center items-center lg:order-2 p-10">
        <Card className="w-[70%] md:w-[50%] lg:w-[75%] xl:w-[70%] 2xl:w-[50%] p-6 m-10 min-w-[450px]">
          <CardHeader className="flex items-center text-center">
            <CardTitle>Create a new account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id="fullName"
                          placeholder="Cipher Sentinels"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="-top-2" />
                    </FormItem>
                  )}
                />
                <div className="space-y-4 mb-8">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="ciphersentinels@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Phone Field */}
                  {/* <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            {...field}
                            defaultCountry="PH"
                            placeholder="+63 912 345 6789"
                          />
                          <Input  //comment this out if you want to use this component
                            id="phone"
                            placeholder="555-123-4567"
                            type="tel"
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <Button className="w-full mb-5" type="submit" asChild>
                    <Link href={"/register/customer-type"}>
                      Create an Account
                    </Link>
                  </Button>
                  <div className="flex w-full items-center justify-center mb-3">
                    <div className="flex-1 border-t-2 border-slate-300"></div>
                    <p className="flex-1 whitespace-nowrap py-4 px-2 text-center">
                      or continue with
                    </p>
                    <div className="flex-1 border-t-2 border-slate-300"></div>
                  </div>
                </div>
              </form>
              <Button className="w-full py-5" variant="outline" asChild>
                <div className="space-x-1">
                  <Image
                    src={"/google.png"}
                    width={20}
                    height={20}
                    alt="Google Icon"
                  />
                  <Link href="/">Sign Up with Google</Link>
                </div>
              </Button>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-row justify-center">
            <p>Already Have an Account?</p>
            <Button className="px-2 responsive-text" variant="link" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
