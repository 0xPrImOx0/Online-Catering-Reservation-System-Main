"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Bell,
  CalendarIcon,
  ChevronDown,
  CreditCard,
  Eye,
  Filter,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Search,
  Settings,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// Sample data for the reservations
const reservations = [
  {
    id: "RES-1234",
    customer: {
      name: "Ashley Wilson",
      email: "ashley.wilson@example.com",
      phone: "+1 (555) 123-4567",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 10, 18, 0), // March 10, 2025, 6:00 PM
    totalPrice: 2580,
    status: "Confirmed",
    createdDate: new Date(2025, 2, 1),
    guests: 75,
    address: "123 Wedding Venue, Springfield, IL",
    specialInstructions:
      "Bride has nut allergy. Please ensure all dishes are nut-free.",
    items: [
      { name: "Wedding Package - Premium", quantity: 1, price: 2000 },
      { name: "Additional Appetizers", quantity: 3, price: 180 },
      { name: "Champagne Toast", quantity: 1, price: 400 },
    ],
    payment: {
      status: "Paid",
      date: new Date(2025, 2, 5),
      amount: 2580,
    },
    isUrgent: true,
  },
  {
    id: "RES-1235",
    customer: {
      name: "Tech Inc.",
      email: "events@techinc.com",
      phone: "+1 (555) 987-6543",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 11, 12, 0), // March 11, 2025, 12:00 PM
    totalPrice: 1200,
    status: "Confirmed",
    createdDate: new Date(2025, 2, 3),
    guests: 30,
    address: "456 Tech Inc. HQ, Springfield, IL",
    specialInstructions: "Vegetarian options needed for 10 guests.",
    items: [
      { name: "Corporate Lunch Package", quantity: 1, price: 900 },
      { name: "Premium Dessert Platter", quantity: 2, price: 300 },
    ],
    payment: {
      status: "Paid",
      date: new Date(2025, 2, 7),
      amount: 1200,
    },
    isUrgent: true,
  },
  {
    id: "RES-1236",
    customer: {
      name: "Smith Family",
      email: "john.smith@example.com",
      phone: "+1 (555) 456-7890",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 14, 17, 0), // March 14, 2025, 5:00 PM
    totalPrice: 950,
    status: "Pending",
    createdDate: new Date(2025, 2, 4),
    guests: 25,
    address: "789 Community Center, Springfield, IL",
    specialInstructions: "Family-style service preferred.",
    items: [
      { name: "Family Gathering Package", quantity: 1, price: 750 },
      { name: "Additional Sides", quantity: 4, price: 200 },
    ],
    payment: {
      status: "Pending",
      date: null,
      amount: 950,
    },
    isUrgent: false,
  },
  {
    id: "RES-1237",
    customer: {
      name: "Guest Order",
      email: "maria@example.com",
      phone: "+1 (555) 234-5678",
      isRegistered: false,
    },
    eventDate: new Date(2025, 2, 15, 19, 30), // March 15, 2025, 7:30 PM
    totalPrice: 350,
    status: "Pending",
    createdDate: new Date(2025, 2, 5),
    guests: 10,
    address: "101 Residential St, Springfield, IL",
    specialInstructions: "Delivery requested by 7:15 PM.",
    items: [
      { name: "Dinner Party Package - Basic", quantity: 1, price: 300 },
      { name: "Specialty Drinks", quantity: 10, price: 50 },
    ],
    payment: {
      status: "Pending",
      date: null,
      amount: 350,
    },
    isUrgent: false,
  },
  {
    id: "RES-1238",
    customer: {
      name: "Johnson Wedding",
      email: "johnson.wedding@example.com",
      phone: "+1 (555) 876-5432",
      isRegistered: true,
    },
    eventDate: new Date(2025, 3, 5, 16, 0), // April 5, 2025, 4:00 PM
    totalPrice: 3200,
    status: "Confirmed",
    createdDate: new Date(2025, 1, 15),
    guests: 100,
    address: "200 Elegant Venue, Springfield, IL",
    specialInstructions:
      "Gluten-free options for 15 guests. Custom cake topper will be provided.",
    items: [
      { name: "Wedding Package - Deluxe", quantity: 1, price: 2800 },
      { name: "Premium Bar Service", quantity: 1, price: 400 },
    ],
    payment: {
      status: "Paid",
      date: new Date(2025, 1, 20),
      amount: 3200,
    },
    isUrgent: false,
  },
  {
    id: "RES-1239",
    customer: {
      name: "Community Center",
      email: "events@communitycenter.org",
      phone: "+1 (555) 345-6789",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 20, 11, 0), // March 20, 2025, 11:00 AM
    totalPrice: 1500,
    status: "Confirmed",
    createdDate: new Date(2025, 1, 25),
    guests: 50,
    address: "300 Community Way, Springfield, IL",
    specialInstructions: "Buffet style. Need setup by 10:30 AM.",
    items: [
      { name: "Community Event Package", quantity: 1, price: 1200 },
      { name: "Additional Appetizers", quantity: 5, price: 300 },
    ],
    payment: {
      status: "Paid",
      date: new Date(2025, 2, 1),
      amount: 1500,
    },
    isUrgent: false,
  },
  {
    id: "RES-1240",
    customer: {
      name: "Birthday Celebration",
      email: "birthday@example.com",
      phone: "+1 (555) 567-8901",
      isRegistered: false,
    },
    eventDate: new Date(2025, 2, 25, 18, 30), // March 25, 2025, 6:30 PM
    totalPrice: 750,
    status: "Pending",
    createdDate: new Date(2025, 2, 8),
    guests: 20,
    address: "400 Party Place, Springfield, IL",
    specialInstructions:
      "Birthday cake for 50th celebration. Blue and silver theme.",
    items: [
      { name: "Birthday Package - Standard", quantity: 1, price: 600 },
      { name: "Custom Cake", quantity: 1, price: 150 },
    ],
    payment: {
      status: "Pending",
      date: null,
      amount: 750,
    },
    isUrgent: false,
  },
  {
    id: "RES-1241",
    customer: {
      name: "Corporate Training",
      email: "training@corporation.com",
      phone: "+1 (555) 678-9012",
      isRegistered: true,
    },
    eventDate: new Date(2025, 3, 2, 9, 0), // April 2, 2025, 9:00 AM
    totalPrice: 900,
    status: "Confirmed",
    createdDate: new Date(2025, 2, 1),
    guests: 25,
    address: "500 Corporate Blvd, Springfield, IL",
    specialInstructions:
      "Continental breakfast and lunch. Coffee service all day.",
    items: [{ name: "All-Day Corporate Package", quantity: 1, price: 900 }],
    payment: {
      status: "Paid",
      date: new Date(2025, 2, 5),
      amount: 900,
    },
    isUrgent: false,
  },
  {
    id: "RES-1242",
    customer: {
      name: "Retirement Party",
      email: "retirement@example.com",
      phone: "+1 (555) 789-0123",
      isRegistered: false,
    },
    eventDate: new Date(2025, 3, 10, 17, 0), // April 10, 2025, 5:00 PM
    totalPrice: 1100,
    status: "Pending",
    createdDate: new Date(2025, 2, 7),
    guests: 35,
    address: "600 Garden Venue, Springfield, IL",
    specialInstructions:
      "Surprise party. Contact secondary number for details.",
    items: [
      { name: "Celebration Package", quantity: 1, price: 850 },
      { name: "Premium Wine Selection", quantity: 1, price: 250 },
    ],
    payment: {
      status: "Pending",
      date: null,
      amount: 1100,
    },
    isUrgent: false,
  },
  {
    id: "RES-1243",
    customer: {
      name: "Charity Gala",
      email: "gala@charity.org",
      phone: "+1 (555) 890-1234",
      isRegistered: true,
    },
    eventDate: new Date(2025, 3, 15, 19, 0), // April 15, 2025, 7:00 PM
    totalPrice: 5000,
    status: "Confirmed",
    createdDate: new Date(2025, 1, 10),
    guests: 150,
    address: "700 Grand Hall, Springfield, IL",
    specialInstructions:
      "Formal plated dinner. Special dietary needs list will be provided 1 week before event.",
    items: [
      { name: "Gala Package - Premium", quantity: 1, price: 4500 },
      { name: "Specialty Dessert Station", quantity: 1, price: 500 },
    ],
    payment: {
      status: "Paid",
      date: new Date(2025, 1, 15),
      amount: 5000,
    },
    isUrgent: false,
  },
];

// Current date for reference
const currentDate = new Date(2025, 2, 9); // March 9, 2025

export default function ReservationsPage() {
  const [selectedReservation, setSelectedReservation] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [date, setDate] = useState(null);

  // Calculate metrics
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(
    (r) => r.status === "Confirmed"
  ).length;
  const pendingReservations = reservations.filter(
    (r) => r.status === "Pending"
  ).length;
  const totalRevenue = reservations
    .filter((r) => r.payment.status === "Paid")
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const openReservationDetails = (reservation: any) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "Completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: any) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const isUrgent = (eventDate: any) => {
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  };

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Reservation content */}
        <main className="flex-1 overflow-auto p-6">
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
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reservations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalReservations}</div>
                <p className="text-xs text-muted-foreground">
                  All active bookings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {confirmedReservations}
                </div>
                <p className="text-xs text-muted-foreground">Ready to serve</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingReservations}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting confirmation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  From confirmed reservations
                </p>
              </CardContent>
            </Card>
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
                    {reservations.map((reservation) => (
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
                          <div>
                            {format(reservation.eventDate, "MMM d, yyyy")}
                          </div>
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
                          {getStatusBadge(reservation.status)}
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(reservation.payment.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                openReservationDetails(reservation)
                              }
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
                                <DropdownMenuItem>
                                  Change Status
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Cancel Reservation
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="upcoming">
              {/* Upcoming reservations would be shown here */}
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
                    {reservations
                      .filter((r) => r.eventDate > currentDate)
                      .map((reservation) => (
                        <TableRow
                          key={reservation.id}
                          className={
                            isUrgent(reservation.eventDate)
                              ? "bg-yellow-50"
                              : ""
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
                            <div>
                              {format(reservation.eventDate, "MMM d, yyyy")}
                            </div>
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
                            {getStatusBadge(reservation.status)}
                          </TableCell>
                          <TableCell>
                            {getPaymentStatusBadge(reservation.payment.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  openReservationDetails(reservation)
                                }
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">
                                      More options
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    Edit Reservation
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Change Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Send Reminder
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    Cancel Reservation
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="past">
              {/* Past reservations would be shown here */}
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
                    {reservations
                      .filter((r) => r.eventDate <= currentDate)
                      .map((reservation) => (
                        <TableRow key={reservation.id}>
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
                            <div>
                              {format(reservation.eventDate, "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {format(reservation.eventDate, "h:mm a")}
                            </div>
                          </TableCell>
                          <TableCell>
                            ${reservation.totalPrice.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(reservation.status)}
                          </TableCell>
                          <TableCell>
                            {getPaymentStatusBadge(reservation.payment.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  openReservationDetails(reservation)
                                }
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">
                                      More options
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Download Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Archive</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
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
      </div>

      {/* Reservation Details Dialog */}
    </div>
  );
}
