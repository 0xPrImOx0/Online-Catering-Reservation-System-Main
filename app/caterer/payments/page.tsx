"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  Calendar,
  CalendarIcon,
  Check,
  CreditCard,
  DollarSign,
  Download,
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
import { cn } from "@/lib/utils";

// Sample data for payments
const payments = [
  {
    id: "PAY-001",
    reservationId: "RES-1234",
    customer: {
      name: "Ashley Wilson",
      email: "ashley.wilson@example.com",
      phone: "+1 (555) 123-4567",
      isRegistered: true,
    },
    amount: 2580,
    status: "Paid",
    paymentDate: new Date(2025, 2, 5),
    paymentMethod: "Credit Card",
    createdDate: new Date(2025, 2, 1),
    reservation: {
      eventDate: new Date(2025, 2, 10),
      address: "123 Wedding Venue, Springfield, IL",
      items: [
        { name: "Wedding Package - Premium", quantity: 1, price: 2000 },
        { name: "Additional Appetizers", quantity: 3, price: 180 },
        { name: "Champagne Toast", quantity: 1, price: 400 },
      ],
    },
    isUrgent: false,
  },
  {
    id: "PAY-002",
    reservationId: "RES-1235",
    customer: {
      name: "Tech Inc.",
      email: "events@techinc.com",
      phone: "+1 (555) 987-6543",
      isRegistered: true,
    },
    amount: 1200,
    status: "Paid",
    paymentDate: new Date(2025, 2, 7),
    paymentMethod: "Bank Transfer",
    createdDate: new Date(2025, 2, 3),
    reservation: {
      eventDate: new Date(2025, 2, 11),
      address: "456 Tech Inc. HQ, Springfield, IL",
      items: [
        { name: "Corporate Lunch Package", quantity: 1, price: 900 },
        { name: "Premium Dessert Platter", quantity: 2, price: 300 },
      ],
    },
    isUrgent: false,
  },
  {
    id: "PAY-003",
    reservationId: "RES-1236",
    customer: {
      name: "Smith Family",
      email: "john.smith@example.com",
      phone: "+1 (555) 456-7890",
      isRegistered: true,
    },
    amount: 950,
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
    createdDate: new Date(2025, 2, 4),
    reservation: {
      eventDate: new Date(2025, 2, 14),
      address: "789 Community Center, Springfield, IL",
      items: [
        { name: "Family Gathering Package", quantity: 1, price: 750 },
        { name: "Additional Sides", quantity: 4, price: 200 },
      ],
    },
    isUrgent: false,
  },
  {
    id: "PAY-004",
    reservationId: "RES-1237",
    customer: {
      name: "Guest Order",
      email: "maria@example.com",
      phone: "+1 (555) 234-5678",
      isRegistered: false,
    },
    amount: 350,
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
    createdDate: new Date(2025, 2, 5),
    reservation: {
      eventDate: new Date(2025, 2, 15),
      address: "101 Residential St, Springfield, IL",
      items: [
        { name: "Dinner Party Package - Basic", quantity: 1, price: 300 },
        { name: "Specialty Drinks", quantity: 10, price: 50 },
      ],
    },
    isUrgent: true,
  },
  {
    id: "PAY-005",
    reservationId: "RES-1238",
    customer: {
      name: "Johnson Wedding",
      email: "johnson.wedding@example.com",
      phone: "+1 (555) 876-5432",
      isRegistered: true,
    },
    amount: 3200,
    status: "Paid",
    paymentDate: new Date(2025, 1, 20),
    paymentMethod: "Credit Card",
    createdDate: new Date(2025, 1, 15),
    reservation: {
      eventDate: new Date(2025, 3, 5),
      address: "200 Elegant Venue, Springfield, IL",
      items: [
        { name: "Wedding Package - Deluxe", quantity: 1, price: 2800 },
        { name: "Premium Bar Service", quantity: 1, price: 400 },
      ],
    },
    isUrgent: false,
  },
  {
    id: "PAY-006",
    reservationId: "RES-1239",
    customer: {
      name: "Community Center",
      email: "events@communitycenter.org",
      phone: "+1 (555) 345-6789",
      isRegistered: true,
    },
    amount: 1500,
    status: "Paid",
    paymentDate: new Date(2025, 2, 1),
    paymentMethod: "Check",
    createdDate: new Date(2025, 1, 25),
    reservation: {
      eventDate: new Date(2025, 2, 20),
      address: "300 Community Way, Springfield, IL",
      items: [
        { name: "Community Event Package", quantity: 1, price: 1200 },
        { name: "Additional Appetizers", quantity: 5, price: 300 },
      ],
    },
    isUrgent: false,
  },
  {
    id: "PAY-007",
    reservationId: "RES-1240",
    customer: {
      name: "Birthday Celebration",
      email: "birthday@example.com",
      phone: "+1 (555) 567-8901",
      isRegistered: false,
    },
    amount: 750,
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
    createdDate: new Date(2025, 2, 8),
    reservation: {
      eventDate: new Date(2025, 2, 25),
      address: "400 Party Place, Springfield, IL",
      items: [
        { name: "Birthday Package - Standard", quantity: 1, price: 600 },
        { name: "Custom Cake", quantity: 1, price: 150 },
      ],
    },
    isUrgent: false,
  },
  {
    id: "PAY-008",
    reservationId: "RES-1241",
    customer: {
      name: "Corporate Training",
      email: "training@corporation.com",
      phone: "+1 (555) 678-9012",
      isRegistered: true,
    },
    amount: 900,
    status: "Paid",
    paymentDate: new Date(2025, 2, 5),
    paymentMethod: "Credit Card",
    createdDate: new Date(2025, 2, 1),
    reservation: {
      eventDate: new Date(2025, 3, 2),
      address: "500 Corporate Blvd, Springfield, IL",
      items: [{ name: "All-Day Corporate Package", quantity: 1, price: 900 }],
    },
    isUrgent: false,
  },
  {
    id: "PAY-009",
    reservationId: "RES-1242",
    customer: {
      name: "Retirement Party",
      email: "retirement@example.com",
      phone: "+1 (555) 789-0123",
      isRegistered: false,
    },
    amount: 1100,
    status: "Pending",
    paymentDate: null,
    paymentMethod: null,
    createdDate: new Date(2025, 2, 7),
    reservation: {
      eventDate: new Date(2025, 3, 10),
      address: "600 Garden Venue, Springfield, IL",
      items: [
        { name: "Celebration Package", quantity: 1, price: 850 },
        { name: "Premium Wine Selection", quantity: 1, price: 250 },
      ],
    },
    isUrgent: true,
  },
  {
    id: "PAY-010",
    reservationId: "RES-1243",
    customer: {
      name: "Charity Gala",
      email: "gala@charity.org",
      phone: "+1 (555) 890-1234",
      isRegistered: true,
    },
    amount: 5000,
    status: "Paid",
    paymentDate: new Date(2025, 1, 15),
    paymentMethod: "Bank Transfer",
    createdDate: new Date(2025, 1, 10),
    reservation: {
      eventDate: new Date(2025, 3, 15),
      address: "700 Grand Hall, Springfield, IL",
      items: [
        { name: "Gala Package - Premium", quantity: 1, price: 4500 },
        { name: "Specialty Dessert Station", quantity: 1, price: 500 },
      ],
    },
    isUrgent: false,
  },
];

// Current date for reference
const currentDate = new Date(2025, 2, 9);

export default function Page() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCustomerType, setFilterCustomerType] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Calculate metrics
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPayments = payments.length;
  const pendingPayments = payments.filter((p) => p.status === "Pending").length;

  const openPaymentDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const openMarkAsPaid = (payment: any) => {
    setSelectedPayment(payment);
    setIsMarkPaidOpen(true);
  };

  // Filter payments based on filters and search query
  const filteredPayments = payments.filter((payment) => {
    // Status filter
    if (
      filterStatus !== "all" &&
      payment.status.toLowerCase() !== filterStatus
    ) {
      return false;
    }

    // Customer type filter
    if (
      filterCustomerType !== "all" &&
      ((filterCustomerType === "registered" &&
        !payment.customer.isRegistered) ||
        (filterCustomerType === "guest" && payment.customer.isRegistered))
    ) {
      return false;
    }

    // Date range filter
    if (filterDateRange !== "all") {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const ninetyDaysAgo = new Date(currentDate);
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      if (
        (filterDateRange === "30days" && payment.createdDate < thirtyDaysAgo) ||
        (filterDateRange === "90days" && payment.createdDate < ninetyDaysAgo)
      ) {
        return false;
      }
    }

    // Search query
    return (
      payment.reservationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort payments based on selected sort option
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        // Convert dates to timestamps for safe subtraction
        const dateB = b.paymentDate || b.createdDate;
        const dateA = a.paymentDate || a.createdDate;
        return (
          (dateB instanceof Date
            ? dateB.getTime()
            : new Date(dateB).getTime()) -
          (dateA instanceof Date ? dateA.getTime() : new Date(dateA).getTime())
        );
      case "date-asc":
        const dateA2 = a.paymentDate || a.createdDate;
        const dateB2 = b.paymentDate || b.createdDate;
        return (
          (dateA2 instanceof Date
            ? dateA2.getTime()
            : new Date(dateA2).getTime()) -
          (dateB2 instanceof Date
            ? dateB2.getTime()
            : new Date(dateB2).getTime())
        );
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      case "id-asc":
        return a.reservationId.localeCompare(b.reservationId);
      default:
        return 0;
    }
  });

  // Check if payment is overdue or due soon
  const isOverdue = (payment: any) => {
    if (payment.status !== "Pending") return false;

    const diffTime = Math.abs(currentDate - payment.createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 3;
  };

  const isDueSoon = (payment) => {
    if (payment.status !== "Pending") return false;

    const diffTime = Math.abs(payment.reservation.eventDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="">
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Payment Tracking
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Revenue summary */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4 text-green-500" />
                Total Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ${totalPaid.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                From all confirmed payments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4 text-red-500" />
                Pending Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                ${totalPending.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Outstanding payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPayments}</div>
              <p className="text-xs text-muted-foreground">
                All payment records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {pendingPayments}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
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
                placeholder="Search payments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filterCustomerType}
              onValueChange={setFilterCustomerType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDateRange} onValueChange={setFilterDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                <SelectItem value="amount-desc">Amount (High-Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low-High)</SelectItem>
                <SelectItem value="id-asc">Reservation ID (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Payments table */}
        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reservation ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className={cn(
                    isOverdue(payment)
                      ? "bg-red-50 border-l-4 border-l-red-500"
                      : "",
                    isDueSoon(payment) && !isOverdue(payment)
                      ? "bg-yellow-50 border-l-4 border-l-yellow-500"
                      : ""
                  )}
                >
                  <TableCell className="font-medium">
                    {payment.reservationId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {payment.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {payment.customer.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {payment.customer.isRegistered
                            ? "Registered"
                            : "Guest"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {getPaymentStatusBadge(payment.status)}
                      {isOverdue(payment) && (
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-800"
                        >
                          Overdue
                        </Badge>
                      )}
                      {isDueSoon(payment) && !isOverdue(payment) && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          Due Soon
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.paymentDate
                      ? format(payment.paymentDate, "MMM d, yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div>
                      {format(payment.reservation.eventDate, "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openPaymentDetails(payment)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      {payment.status === "Pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => openMarkAsPaid(payment)}
                        >
                          <Check className="h-3 w-3" />
                          Mark as Paid
                        </Button>
                      )}
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
                          <DropdownMenuItem>View Reservation</DropdownMenuItem>
                          <DropdownMenuItem>
                            Send Payment Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to{" "}
            <strong>{sortedPayments.length}</strong> of{" "}
            <strong>{sortedPayments.length}</strong> payments
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </main>

      {/* Payment Details Dialog */}
      {selectedPayment && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                {selectedPayment.id} - {selectedPayment?.reservationId}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Payment Information */}
              <div>
                <h3 className="mb-2 font-semibold">Payment Information</h3>
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{getPaymentStatusBadge(selectedPayment.status)}</span>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">
                        ${selectedPayment.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Date:
                      </span>
                      <span>
                        {selectedPayment.paymentDate
                          ? format(selectedPayment.paymentDate, "MMMM d, yyyy")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Method:
                      </span>
                      <span>{selectedPayment.paymentMethod || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Created Date:
                      </span>
                      <span>
                        {format(selectedPayment.createdDate, "MMMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="mb-2 font-semibold">Customer Information</h3>
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {selectedPayment.customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {selectedPayment.customer.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedPayment.customer.isRegistered
                          ? "Registered Customer"
                          : "Guest Order"}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedPayment.customer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{selectedPayment.customer.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="md:col-span-2">
                <h3 className="mb-2 font-semibold">Reservation Details</h3>
                <div className="rounded-lg border p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <div className="mb-2 text-sm font-medium">
                        Event Information
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Event Date:
                          </span>
                          <span>
                            {format(
                              selectedPayment.reservation.eventDate,
                              "MMMM d, yyyy"
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Address:
                          </span>
                          <span className="text-right">
                            {selectedPayment.reservation.address}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-medium">
                        Payment Status
                      </div>
                      <div className="grid gap-2 text-sm">
                        {selectedPayment.status === "Pending" ? (
                          <div className="rounded-md bg-red-50 p-2 text-center text-red-800">
                            <p className="font-medium">Payment Pending</p>
                            <p className="text-xs">
                              {isDueSoon(selectedPayment)
                                ? "Event is approaching soon. Payment required."
                                : "Payment has not been received yet."}
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-md bg-green-50 p-2 text-center text-green-800">
                            <p className="font-medium">Payment Completed</p>
                            <p className="text-xs">
                              Paid on{" "}
                              {format(
                                selectedPayment.paymentDate,
                                "MMMM d, yyyy"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="md:col-span-2">
                <h3 className="mb-2 font-semibold">Order Items</h3>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPayment.reservation.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(item.price / item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.price.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between border-t p-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      ${selectedPayment.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline">Download Receipt</Button>
                {selectedPayment.status === "Pending" && (
                  <Button variant="outline">Send Reminder</Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Link
                    href={`/reservations?id=${selectedPayment.reservationId}`}
                    className="flex w-full"
                  >
                    View Reservation
                  </Link>
                </Button>
                {selectedPayment.status === "Pending" && (
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      openMarkAsPaid(selectedPayment);
                    }}
                  >
                    Mark as Paid
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Mark as Paid Dialog */}
      {selectedPayment && (
        <Dialog open={isMarkPaidOpen} onOpenChange={setIsMarkPaidOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Mark Payment as Paid</DialogTitle>
              <DialogDescription>
                Update the payment status for {selectedPayment.reservationId} to
                "Paid".
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment-date" className="text-right">
                  Payment Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="payment-date"
                      variant="outline"
                      className="col-span-3 justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(currentDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={currentDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment-method" className="text-right">
                  Payment Method
                </Label>
                <Select defaultValue="credit">
                  <SelectTrigger id="payment-method" className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment-notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="payment-notes"
                  placeholder="Optional payment notes"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsMarkPaidOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsMarkPaidOpen(false)}>
                Confirm Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
