"use client";
import { Separator } from "@/components/ui/separator";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.eventDate
    ? formValues.eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Customer Information</h3>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>{formValues.fullName || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{formValues.email || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span>{formValues.contactNumber || "Not provided"}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Event Details</h3>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Event Type:</span>
              <span>{formValues.eventType || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{formattedDate}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Guests:</span>
              <span>{formValues.guestCount || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Venue:</span>
              <span>{formValues.venue || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Service Type:</span>
              <span>{formValues.serviceType || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Service Hours:</span>
              <span>
                {formValues.serviceHours
                  ? `${formValues.serviceHours}`
                  : "Not provided"}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-medium mb-2">Selected Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formValues.selectedMenus).map(
            ([category, menuIds]) => {
              if (menuIds.length === 0) return null;
              return (
                <div key={category}>
                  <h4 className="text-sm font-medium">{category}</h4>
                  <ul className="text-sm space-y-1 mt-1">
                    {menuIds.map((id) => {
                      const menu = menuItems.find((d) => d._id === id);
                      return menu ? (
                        <li key={id} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-primary" />
                          {menu.name}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              );
            }
          )}
        </div>
      </div>
      {formValues.specialRequests && (
        <>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Special Requests</h3>
            <p className="text-sm">{formValues.specialRequests}</p>
          </div>
        </>
      )}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Request Sent!</DialogTitle>
            <DialogDescription>
              Thank you for your reservation request. Our caterer will call you
              within 1 hour to discuss the details and provide you with a quote.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="rounded-full p-3 bg-green-500">
              <Check className="size-10 text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant={"ghost"}
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </Button>
            <Button
              variant={"default"}
              onClick={() => setShowConfirmation(false)}
              asChild
            >
              <Link href={"/"}>Go to home</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
