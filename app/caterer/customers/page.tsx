"use client";

import { Checkbox } from "@/components/ui/checkbox";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Edit,
  Eye,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Reply,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { concerns, customers } from "../../../lib/caterer/customers-metadata";
import {
  ConcernType,
  CustomerType,
} from "../../../types/caterer/caterer-types";
// import { ConcernType, CustomerType } from "./customer-type";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState<CustomerType | null>(
    null
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<ConcernType | null>(
    null
  );
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate metrics
  const totalCustomers = customers.length;
  const newCustomers = customers.filter((c) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return c.registrationDate >= thirtyDaysAgo;
  }).length;
  const retentionRate = 85; // Hardcoded for UI demo
  const openConcerns = concerns.filter((c) => c.status === "Open").length;

  const viewCustomerDetails = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const editCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const deleteCustomerPrompt = (customer: CustomerType) => {
    setDeleteCustomer(customer);
    setIsDeleteOpen(true);
  };

  const replyConcern = (concern: ConcernType) => {
    setSelectedConcern(concern);
    setIsReplyOpen(true);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main className="flex-1 overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Customer Management
        </h1>
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
              Total Registered Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Registered Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {newCustomers}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customer Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {retentionRate}%
            </div>
            <p className="text-xs text-muted-foreground">Last 90 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Customer Concerns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {openConcerns}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Registered Customers</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="registration">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Registration Date</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="reservations">Total Reservations</SelectItem>
                <SelectItem value="spent">Total Spent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Total Reservations</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {format(customer.registrationDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{customer.totalReservations}</TableCell>
                  <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => viewCustomerDetails(customer)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editCustomer(customer)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit customer</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCustomerPrompt(customer)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete customer</span>
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
                            <Link
                              href={`/reservations?customer=${customer.id}`}
                              className="flex w-full"
                            >
                              View Reservations
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
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
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to{" "}
            <strong>{filteredCustomers.length}</strong> of{" "}
            <strong>{filteredCustomers.length}</strong> customers
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
      </div>

      {/* Customer Concerns Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Customer Concerns</h2>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Concerns</SelectItem>
                <SelectItem value="open">Open Concerns</SelectItem>
                <SelectItem value="resolved">Resolved Concerns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Concern</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {concerns.map((concern) => (
                <TableRow key={concern.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {concern.isRegistered
                            ? concern.customerName.charAt(0)
                            : "G"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{concern.customerName}</div>
                        <div className="text-xs text-muted-foreground">
                          {concern.isRegistered ? "Registered" : "Guest"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">{concern.message}</div>
                  </TableCell>
                  <TableCell>
                    <div>{format(concern.submittedAt, "MMM d, yyyy")}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(concern.submittedAt, "h:mm a")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {concern.status === "Open" ? (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Open
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800">
                        Resolved
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {concern.status === "Open" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => replyConcern(concern)}
                          >
                            <Reply className="h-3 w-3" />
                            Reply
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" />
                            Resolve
                          </Button>
                        </>
                      )}
                      {concern.status === "Resolved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View History
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>{concerns.length}</strong> of{" "}
            <strong>{concerns.length}</strong> concerns
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
      </div>
      {/* View Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                {selectedCustomer.id} - Registered on{" "}
                {format(selectedCustomer.registrationDate, "MMM d, yyyy")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedCustomer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium">
                        {selectedCustomer.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Phone:</span>
                      <span className="text-sm font-medium">
                        {selectedCustomer.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                    Customer Activity
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Reservations:</span>
                      <span className="text-sm font-medium">
                        {selectedCustomer.totalReservations}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Spent:</span>
                      <span className="text-sm font-medium">
                        ${selectedCustomer.totalSpent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Reservation:</span>
                      <span className="text-sm font-medium">
                        {format(
                          selectedCustomer.lastReservation,
                          "MMM d, yyyy"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                  Recent Reservations
                </h4>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          #RES238920483
                        </TableCell>
                        <TableCell>
                          {format(
                            selectedCustomer.lastReservation,
                            "MMM d, yyyy"
                          )}
                        </TableCell>
                        <TableCell>Wedding Package</TableCell>
                        <TableCell className="text-right">$2,580</TableCell>
                      </TableRow>
                      {selectedCustomer.totalReservations > 1 && (
                        <TableRow>
                          <TableCell className="font-medium">
                            #RES238920359
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(
                                selectedCustomer.lastReservation.getTime() -
                                  7 * 24 * 60 * 60 * 1000
                              ),
                              "MMM d, yyyy"
                            )}
                          </TableCell>
                          <TableCell>Corporate Event</TableCell>
                          <TableCell className="text-right">$1,680</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline">Send Email</Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewOpen(false);
                    editCustomer(selectedCustomer);
                  }}
                >
                  Edit Customer
                </Button>
                <Button variant="default">
                  <Link
                    href={`/reservations?customer=${selectedCustomer.id}`}
                    className="flex w-full"
                  >
                    View Reservations
                  </Link>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Customer Dialog */}
      {selectedCustomer && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Make changes to the customer information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedCustomer.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedCustomer.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedCustomer.phone}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="edit-notes"
                  placeholder="Additional notes"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteCustomer && (
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the customer "{deleteCustomer.name}
                " and all associated data.
                {deleteCustomer.totalReservations > 0 && (
                  <p className="mt-2 font-medium text-destructive">
                    Warning: This customer has{" "}
                    {deleteCustomer.totalReservations} reservations. Deleting
                    this customer may affect existing reservation records.
                  </p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                Delete Customer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Reply to Concern Dialog */}
      {selectedConcern && (
        <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reply to Concern</DialogTitle>
              <DialogDescription>
                Send a response to {selectedConcern.customerName}'s concern.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm">{selectedConcern.message}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Submitted on{" "}
                  {format(
                    selectedConcern.submittedAt,
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Type your response here..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mark-resolved" />
                <Label htmlFor="mark-resolved">
                  Mark as resolved after sending
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReplyOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsReplyOpen(false)}>Send Reply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
