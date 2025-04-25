"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useReservationForm,
  type ReservationValues,
} from "@/hooks/use-reservation-form";
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
import { PaxArrayType } from "@/types/reservation-types";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();
  const { getMenuItem } = useReservationForm();

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.reservationDate
    ? formValues.reservationDate.toLocaleDateString("en-US", {
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
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Customer Information
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center flex-1 text-gray-500 shrink-0">
                  <User className="w-4 h-4 mr-2" />
                  Name
                </span>
                <span className="ml-2 font-medium text-gray-800">
                  {formValues.fullName || "Not provided"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center flex-1 text-gray-500 shrink-0">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </span>
                <span className="ml-2 font-medium text-gray-800 break-all">
                  {formValues.email || "Not provided"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center flex-1 text-gray-500 shrink-0">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </span>
                <span className="ml-2 font-medium text-gray-800">
                  {formValues.contactNumber || "Not provided"}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Event Details
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 w-28 shrink-0">
                  <Utensils className="w-4 h-4 mr-2" />
                  Event Type
                </span>
                <span className="ml-2 font-medium text-gray-800">
                  {formValues.eventType || "Not provided"}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 w-28 shrink-0">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </span>
                <span className="ml-2 font-medium text-gray-800">
                  {formattedDate}
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center text-gray-500 w-28 shrink-0">
                  <Users className="w-4 h-4 mr-2" />
                  Guests
                </span>
                <span className="ml-2 font-medium text-gray-800">
                  {formValues.guestCount || "Not provided"}
                </span>
              </li>
              {formValues.reservationType === "event" && (
                <>
                  <li className="flex items-start">
                    <span className="flex items-center text-gray-500 w-28 shrink-0">
                      <Building className="w-4 h-4 mr-2" />
                      Venue
                    </span>
                    <span className="ml-2 font-medium text-gray-800">
                      {formValues.venue || "Not provided"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center text-gray-500 w-28 shrink-0">
                      <Utensils className="w-4 h-4 mr-2" />
                      Service
                    </span>
                    <span className="ml-2 font-medium text-gray-800">
                      {formValues.serviceType || "Not provided"}
                    </span>
                  </li>
                  {formValues.serviceType === "Plated" &&
                    formValues.serviceHours && (
                      <li className="flex items-start">
                        <span className="flex items-center text-gray-500 w-28 shrink-0">
                          <Clock className="w-4 h-4 mr-2" />
                          Hours
                        </span>
                        <span className="ml-2 font-medium text-gray-800">
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
              <Utensils className="w-5 h-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Selected Menu
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {Object.entries(formValues.selectedMenus).map(
                ([category, menuIds]: [
                  string,
                  Record<
                    string,
                    {
                      quantity: number;
                      paxSelected: PaxArrayType;
                      pricePerPax: number;
                    }
                  >
                ]) => {
                  const menuIdArray = Object.keys(menuIds);
                  if (menuIdArray.length === 0) return null;
                  return (
                    <div key={category} className="space-y-4">
                      <h4 className="pb-2 font-medium text-gray-700 border-b border-gray-100 text-md">
                        {category}
                      </h4>
                      <ul className="space-y-3">
                        {menuIdArray.map((id: string) => {
                          const menu = getMenuItem(id);
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
                <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Information
                </h3>
              </div>

              <div className="space-y-6">
                {formValues.specialRequests && (
                  <div className="space-y-2">
                    <h4 className="flex items-center font-medium text-gray-700 text-md">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Special Requests
                    </h4>
                    <p className="p-3 text-sm text-gray-700 rounded-md bg-gray-50">
                      {formValues.specialRequests}
                    </p>
                  </div>
                )}

                {formValues.deliveryAddress && (
                  <div className="space-y-2">
                    <h4 className="flex items-center font-medium text-gray-700 text-md">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      Delivery Address
                    </h4>
                    <p className="p-3 text-sm text-gray-700 rounded-md bg-gray-50">
                      {formValues.deliveryAddress}
                    </p>
                  </div>
                )}

                {formValues.deliveryInstructions && (
                  <div className="space-y-2">
                    <h4 className="flex items-center font-medium text-gray-700 text-md">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Delivery Instructions
                    </h4>
                    <p className="p-3 text-sm text-gray-700 rounded-md bg-gray-50">
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
