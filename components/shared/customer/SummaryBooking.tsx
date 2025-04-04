"use client";
import { Separator } from "@/components/ui/separator";
import { menuItems } from "@/lib/menu-lists";
import { MenuItem } from "@/types/menu-types";
import { FormData } from "@/types/package-types";
import axios from "axios";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SummaryBooking({ formData }: { formData: FormData }) {
  // const [menus, setMenus] = useState<MenuItem[]>([]);

  // useEffect(() => {
  //   const getMenus = async () => {
  //     const response = await axios.get("http://localhost:5500/api/menus");
  //     setMenus(response.data.data);
  //   };
  //   getMenus();
  // }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Customer Information</h3>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>{formData.name}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{formData.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span>{formData.phone}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Event Details</h3>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Event Type:</span>
              <span>{formData.eventType}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{formData.eventDate}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Guests:</span>
              <span>{formData.guestCount}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Venue:</span>
              <span>{formData.venue}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Service Type:</span>
              <span>{formData.serviceType}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Service Hours:</span>
              <span>{formData.serviceHours} hours</span>
            </li>
          </ul>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-medium mb-2">Selected Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.selectedMenus).map(([category, menuIds]) => {
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
          })}
        </div>
      </div>
      {formData.specialRequests && (
        <>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Special Requests</h3>
            <p className="text-sm">{formData.specialRequests}</p>
          </div>
        </>
      )}
    </div>
  );
}
