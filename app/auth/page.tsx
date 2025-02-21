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

export default function Home() {
  const form = useForm();
  return (
    <div className={`flex flex-row h-screen`}>
      <div className="flex flex-1 justify-center items-center ">
        <Card className="w-[50%] px-3 py-6">
          <CardHeader className="flex items-center">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-5">
                <div className="space-y-4 mb-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email Address" {...field} />
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
                        <div className="flex items-center text-sm justify-between">
                          <FormLabel>Password</FormLabel>
                          <Button className="text-slate-500" variant="link">
                            <Link href="">Forgot your password?</Link>
                          </Button>
                        </div>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-center ">
                  <Button className="w-full mb-5" type="submit">
                    Submit
                  </Button>
                  <div className="flex w-full items-center justify-center mb-3">
                    <div className="flex-1 border-t-2 border-slate-300"></div>
                    <p className="flex-1 py-4 px-2">or continue with</p>
                    <div className="flex-1 border-t-2 border-slate-300"></div>
                  </div>
                  <Button className="w-full py-5" variant="outline">
                    Login with Facebook
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>
              Don't Have an Account?
              <Button className="px-2 text-base" variant="link" asChild>
                <Link href="">Sign Up</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-1 justify-center items-center border border-green-500">
        <Skeleton className="h-[80%] w-[80%] rounded-xl" />
      </div>
    </div>
  );
}
