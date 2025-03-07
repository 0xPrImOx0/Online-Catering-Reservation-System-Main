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
import { loginSchema } from "@/utils/formValidtion";
import { toast } from "sonner";
import ThemeMode from "@/components/ThemeMode";
import { PasswordInput } from "@/components/ui/password-input";

export default function SignIn() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "", // Ensuring controlled input
      password: "",
    },
    mode: "onChange", // Immediate validation feedback
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
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
    <div
      className={`flex flex-col lg:flex-row h-screen overflow-auto border border-red-500`}
    >
      <div className="flex flex-1 order-2 lg:order-1 justify-center items-center p-10">
        <Card className="w-[70%] md:w-[50%] lg:w-[75%] xl:w-[70%] 2xl:w-[50%] px-3 py-6 min-w-[400px]">
          <CardHeader className="flex items-center text-center">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-4 mb-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email Address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Password
                          <Button
                            className="p-0 text-gray-500 "
                            variant="link"
                            asChild
                          >
                            <Link href="/forgot-password">
                              Forgot Password?
                            </Link>
                          </Button>
                        </FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <Button className="w-full mb-5" type="submit" asChild>
                    <Link href={"/dashboard"}>Sign In</Link>
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
                  <Link href="/">Sign In with Google</Link>
                </div>
              </Button>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-row justify-center">
            <p>Don't Have an Account?</p>
            <Button className="px-2 responsive-text" variant="link" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-1 justify-center items-center order-1 lg:order-2 min-h-[500px]">
        <Skeleton className="flex w-[100%] h-[100%] rounded-none" />
      </div>
    </div>
  );
}
