"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ReservationValues } from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Mail,
  Users,
  Utensils,
  Building,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.eventDate
    ? formValues.eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-8"
    >
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Customer Information
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 flex-1 shrink-0">
                  <User className="h-4 w-4 mr-2" />
                  Name
                </span>
                <span className="font-medium text-gray-800 ml-2">
                  {formValues.fullName || "Not provided"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 flex-1 shrink-0">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </span>
                <span className="font-medium text-gray-800 ml-2 break-all">
                  {formValues.email || "Not provided"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 flex-1 shrink-0">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </span>
                <span className="font-medium text-gray-800 ml-2">
                  {formValues.contactNumber || "Not provided"}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Event Details
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 w-28 shrink-0">
                  <Utensils className="h-4 w-4 mr-2" />
                  Event Type
                </span>
                <span className="font-medium text-gray-800 ml-2">
                  {formValues.eventType || "Not provided"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 w-28 shrink-0">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </span>
                <span className="font-medium text-gray-800 ml-2">
                  {formattedDate}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 w-28 shrink-0">
                  <Users className="h-4 w-4 mr-2" />
                  Guests
                </span>
                <span className="font-medium text-gray-800 ml-2">
                  {formValues.guestCount || "Not provided"}
                </span>
              </li>
              {formValues.reservationType === "event" && (
                <>
                  <li className="flex items-start">
                    <span className="flex items-center text-gray-500 w-28 shrink-0">
                      <Building className="h-4 w-4 mr-2" />
                      Venue
                    </span>
                    <span className="font-medium text-gray-800 ml-2">
                      {formValues.venue || "Not provided"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center text-gray-500 w-28 shrink-0">
                      <Utensils className="h-4 w-4 mr-2" />
                      Service
                    </span>
                    <span className="font-medium text-gray-800 ml-2">
                      {formValues.serviceType || "Not provided"}
                    </span>
                  </li>
                  {formValues.serviceType === "Plated" &&
                    formValues.serviceHours && (
                      <li className="flex items-start">
                        <span className="flex items-center text-gray-500 w-28 shrink-0">
                          <Clock className="h-4 w-4 mr-2" />
                          Hours
                        </span>
                        <span className="font-medium text-gray-800 ml-2">
                          {formValues.serviceHours}
                        </span>
                      </li>
                    )}
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Utensils className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Selected Menu
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(formValues.selectedMenus).map(
                ([category, menuIds]: [string, Record<string, number>]) => {
                  const menuIdArray = Object.keys(menuIds);
                  if (menuIdArray.length === 0) return null;
                  return (
                    <div key={category} className="space-y-4">
                      <h4 className="text-md font-medium text-gray-700 pb-2 border-b border-gray-100">
                        {category}
                      </h4>
                      <ul className="space-y-3">
                        {menuIdArray.map((id: string) => {
                          const menu = menuItems.find((d) => d._id === id);
                          return menu ? (
                            <li
                              key={id}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50">
                                <Check className="h-3.5 w-3.5 text-green-600" />
                              </div>
                              <span>{menu.name}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {(formValues.specialRequests ||
        formValues.deliveryAddress ||
        formValues.deliveryInstructions) && (
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Information
                </h3>
              </div>

              <div className="space-y-6">
                {formValues.specialRequests && (
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-700 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                      Special Requests
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                      {formValues.specialRequests}
                    </p>
                  </div>
                )}

                {formValues.deliveryAddress && (
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-700 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                      {formValues.deliveryAddress}
                    </p>
                  </div>
                )}

                {formValues.deliveryInstructions && (
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-700 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                      Delivery Instructions
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                      {formValues.deliveryInstructions}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
