"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  ClipboardPen,
  CreditCard,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import MetricCards from "@/components/shared/MetricCards";
import { reservations } from "@/lib/reservation-dummy";
import clsx from "clsx";
import StatusBadge from "@/components/shared/status-badge";

// Sample data for the reservations

const metricCards = [
  {
    title: "Total Reservations",
    firstContent: "10",
    secondContent: "All active bookings",
    Icon: ClipboardList,
  },
  {
    title: "Confirmed",
    firstContent: "6",
    secondContent: "Ready to serve",
    Icon: ClipboardCheck,
  },
  {
    title: "Pending",
    firstContent: "4",
    secondContent: "Awaiting confirmation",
    Icon: ClipboardPen,
  },
  {
    title: "Total Revenue",
    firstContent: "$14,380",
    secondContent: "From confirmed reservations",
    Icon: CreditCard,
  },
];

type reservationType = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    isRegistered: boolean;
  };
  eventDate: Date; // March 10, 2025, 6:00 PM
  totalPrice: number;
  status: string;
  createdDate: Date;
  guests: number;
  address: string;
  specialInstructions: string;
  items: [{ name: string; quantity: number; price: number }];
  payment: {
    status: string;
    date: Date;
    amount: number;
  };
  isUrgent: boolean;
};

// Current date for reference
const currentDate = new Date(2025, 2, 9); // March 9, 2025

export default function ReservationsPage() {
  const [selectedReservation, setSelectedReservation] =
    useState<reservationType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [date, setDate] = useState(null);

  const openReservationDetails = (reservation: any) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const isUrgent = (eventDate: any) => {
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <MetricCards metric={metric} key={metric.title} />
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reservations..."
              className="pl-8"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Customer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="registered">Registered</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {/* Reservations table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reservation ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Event Date/Time</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation: any) => (
                  <TableRow
                    key={reservation.id}
                    className={
                      isUrgent(reservation.eventDate) ? "bg-yellow-50" : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {reservation.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            {reservation.customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {reservation.customer.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {reservation.customer.isRegistered
                              ? "Registered"
                              : "Guest"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{format(reservation.eventDate, "MMM d, yyyy")}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(reservation.eventDate, "h:mm a")}
                      </div>
                      {isUrgent(reservation.eventDate) && (
                        <Badge
                          variant="outline"
                          className="mt-1 bg-yellow-100 text-yellow-800"
                        >
                          Due Soon
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      ${reservation.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={reservation.status} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={reservation.payment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openReservationDetails(reservation)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Edit Reservation
                            </DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Cancel Reservation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {selectedReservation && (
                          <Dialog
                            open={isDetailsOpen}
                            onOpenChange={setIsDetailsOpen}
                          >
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Reservation Details</DialogTitle>
                                <DialogDescription>
                                  {selectedReservation.id} - Created on{" "}
                                  {format(
                                    selectedReservation.createdDate,
                                    "MMM d, yyyy"
                                  )}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="grid gap-6 md:grid-cols-2">
                                {/* Customer Information */}
                                <div>
                                  <h3 className="mb-2 font-semibold">
                                    Customer Information
                                  </h3>
                                  <div className="rounded-lg border p-4">
                                    <div className="mb-4 flex items-center gap-3">
                                      <Avatar className="h-10 w-10">
                                        <AvatarFallback>
                                          {selectedReservation.customer.name.charAt(
                                            0
                                          )}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">
                                          {selectedReservation.customer.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {selectedReservation.customer
                                            .isRegistered
                                            ? "Registered Customer"
                                            : "Guest Order"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid gap-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Email:
                                        </span>
                                        <span>
                                          {selectedReservation.customer.email}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Phone:
                                        </span>
                                        <span>
                                          {selectedReservation.customer.phone}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Event Details */}
                                <div>
                                  <h3 className="mb-2 font-semibold">
                                    Event Details
                                  </h3>
                                  <div className="rounded-lg border p-4">
                                    <div className="grid gap-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Date:
                                        </span>
                                        <span>
                                          {format(
                                            selectedReservation.eventDate,
                                            "MMMM d, yyyy"
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Time:
                                        </span>
                                        <span>
                                          {format(
                                            selectedReservation.eventDate,
                                            "h:mm a"
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Guests:
                                        </span>
                                        <span>
                                          {selectedReservation.guests}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Status:
                                        </span>
                                        <span>
                                          <StatusBadge
                                            status={selectedReservation.status}
                                          />
                                        </span>
                                      </div>
                                      <Separator className="my-2" />
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Address:
                                        </span>
                                        <span className="text-right">
                                          {selectedReservation.address}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div className="md:col-span-2">
                                  <h3 className="mb-2 font-semibold">
                                    Order Items
                                  </h3>
                                  <div className="rounded-lg border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Item</TableHead>
                                          <TableHead className="text-right">
                                            Quantity
                                          </TableHead>
                                          <TableHead className="text-right">
                                            Price
                                          </TableHead>
                                          <TableHead className="text-right">
                                            Total
                                          </TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedReservation.items.map(
                                          (item, index) => (
                                            <TableRow key={index}>
                                              <TableCell>{item.name}</TableCell>
                                              <TableCell className="text-right">
                                                {item.quantity}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                ${item.price / item.quantity}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                ${item.price}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                    <div className="flex justify-between border-t p-4">
                                      <span className="font-medium">Total</span>
                                      <span className="font-bold">
                                        ${selectedReservation.totalPrice}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment Information */}
                                <div>
                                  <h3 className="mb-2 font-semibold">
                                    Payment Information
                                  </h3>
                                  <div className="rounded-lg border p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                      <span className="text-muted-foreground">
                                        Status:
                                      </span>
                                      <span>
                                        <StatusBadge
                                          status={
                                            selectedReservation.payment.status
                                          }
                                        />
                                      </span>
                                    </div>
                                    {selectedReservation.payment.status ===
                                      "paid" && (
                                      <>
                                        <div className="flex items-center justify-between">
                                          <span className="text-muted-foreground">
                                            Date:
                                          </span>
                                          <span>
                                            {format(
                                              selectedReservation.payment.date,
                                              "MMM d, yyyy"
                                            )}
                                          </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                          <span className="text-muted-foreground">
                                            Amount:
                                          </span>
                                          <span className="font-medium">
                                            $
                                            {selectedReservation.payment.amount}
                                          </span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Special Instructions */}
                                <div>
                                  <h3 className="mb-2 font-semibold">
                                    Special Instructions
                                  </h3>
                                  <div className="rounded-lg border p-4">
                                    <p className="text-sm">
                                      {selectedReservation.specialInstructions}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <DialogFooter className="flex items-center justify-between sm:justify-between">
                                <div className="flex gap-2">
                                  <Button variant="outline">
                                    Print Details
                                  </Button>
                                  <Button variant="outline">
                                    Send to Email
                                  </Button>
                                </div>
                                <div className="flex gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline">
                                        Change Status
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>
                                        Mark as Confirmed
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Mark as Completed
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Mark as Cancelled
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button>Edit Reservation</Button>
                                </div>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          {/* Upcoming reseryvations would be shown here */}
        </TabsContent>
        <TabsContent value="past">
          {/* Past reservations would be shown here */}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>10</strong> of{" "}
          <strong>{reservations.length}</strong> reservations
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}
