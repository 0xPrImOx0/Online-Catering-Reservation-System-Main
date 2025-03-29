"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { usePackageForm } from "@/hooks/use-package-form";

interface ReviewStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export function ReviewStep({ formHook }: ReviewStepProps) {
  const { form, previewImage, isSubmitSuccess } = formHook;
  const packageType = form.watch("packageType");

  return (
    <div className="space-y-6">
      {isSubmitSuccess ? (
        <div className="text-center py-20 md:py-32">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            Package Added Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your new catering package has been added to the catalog.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <Check className="h-10 w-10 text-primary mx-auto mb-2" />
            <h3 className="text-xl font-medium">Review Your Package</h3>
            <p className="text-sm text-muted-foreground">
              Please review all information before submitting
            </p>
          </div>

          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Name
                  </h5>
                  <p className="text-sm font-medium">{form.watch("name")}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Description
                  </h5>
                  <p className="text-sm break-words">
                    {form.watch("description")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Package Type
                    </h5>
                    <Badge variant="outline" className="mt-1">
                      {packageType === "BuffetPlated"
                        ? "Buffet & Plated"
                        : "Event"}
                    </Badge>
                  </div>

                  {packageType === "Event" ? (
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Event Type
                      </h5>
                      <Badge variant="outline" className="mt-1">
                        {form.watch("eventType") || "Not specified"}
                      </Badge>
                    </div>
                  ) : (
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Service Type
                      </h5>
                      <Badge variant="outline" className="mt-1">
                        {form.watch("serviceType")}
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Available
                  </h5>
                  <Badge
                    variant={form.watch("available") ? "default" : "outline"}
                    className="mt-1"
                  >
                    {form.watch("available") ? "Yes" : "No"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Package Options</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Menu Items
                  </h5>
                  <div className="space-y-2 mt-1">
                    {form.watch("options")?.map((option, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded-md"
                      >
                        <span className="text-sm font-medium">
                          {option.category}
                        </span>
                        <Badge variant="secondary">
                          {option.count} item{option.count !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Pricing & Capacity</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Price Per Person
                  </h5>
                  <p className="text-sm font-medium">
                    ₱{form.watch("pricePerPax").toFixed(2)}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Guest Capacity
                  </h5>
                  <div className="flex justify-between text-sm mt-1">
                    <div>
                      <span className="text-muted-foreground">Minimum:</span>
                      <span className="ml-1 font-medium">
                        {form.watch("minimumPax")} guests
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Recommended:
                      </span>
                      <span className="ml-1 font-medium">
                        {form.watch("recommendedPax")} guests
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Maximum:</span>
                      <span className="ml-1 font-medium">
                        {form.watch("maximumPax")} guests
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Inclusions & Services</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Inclusions
                  </h5>
                  <div className="space-y-2 mt-1">
                    {form.watch("inclusions")?.map((inclusion, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded-md"
                      >
                        <div>
                          <span className="text-sm font-medium">
                            {inclusion.includes}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            For: {inclusion.typeOfCustomer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Service Hours
                    </h5>
                    <p className="text-sm">
                      {form.watch("serviceHours")} hours
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Service Charge per Hour
                    </h5>
                    <p className="text-sm">
                      ₱{form.watch("serviceChargePerHour")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Total Service Fee
                    </h5>
                    <p className="text-sm">₱{form.watch("totalServiceFee")}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Total Price with Service
                    </h5>
                    <p className="text-sm font-medium">
                      ₱{form.watch("totalPriceWithService")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {(form.watch("imageUrl") || previewImage) && (
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 pb-2">
                  <CardTitle className="text-lg">Image</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-hidden h-40 flex items-center justify-center bg-muted rounded-md">
                    <Image
                      src={
                        form.watch("imageUploadType") === "url"
                          ? form.watch("imageUrl")
                          : previewImage || ""
                      }
                      alt="Package preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
