import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "../StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type dialogProps = {
  selectedReservation: any;
  isDetailsOpen: any;
  setIsDetailsOpen: any;
};

export default function ReservationDialog({
  selectedReservation,
  isDetailsOpen,
  setIsDetailsOpen,
}: dialogProps) {
  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Reservation Details</DialogTitle>
          <DialogDescription>
            {selectedReservation.id} - Created on{" "}
            {format(selectedReservation.createdDate, "MMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer Information */}
          <div>
            <h3 className="mb-2 font-semibold">Customer Information</h3>
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedReservation.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {selectedReservation.customer.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedReservation.customer.isRegistered
                      ? "Registered Customer"
                      : "Guest Order"}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{selectedReservation.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{selectedReservation.customer.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="mb-2 font-semibold">Event Details</h3>
            <div className="rounded-lg border p-4">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>
                    {format(selectedReservation.eventDate, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{format(selectedReservation.eventDate, "h:mm a")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span>{selectedReservation.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>
                    <StatusBadge status={selectedReservation.status} />
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="text-right">
                    {selectedReservation.address}
                  </span>
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
                  {selectedReservation.items.map(
                    (
                      item: {
                        name: string;
                        quantity: number;
                        price: number;
                      },
                      index: number
                    ) => (
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
            <h3 className="mb-2 font-semibold">Payment Information</h3>
            <div className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span>
                  <StatusBadge status={selectedReservation.payment.status} />
                </span>
              </div>
              {selectedReservation.payment.status === "paid" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>
                      {format(selectedReservation.payment.date, "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      ${selectedReservation.payment.amount}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <h3 className="mb-2 font-semibold">Special Instructions</h3>
            <div className="rounded-lg border p-4">
              <p className="text-sm">
                {selectedReservation.specialInstructions}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline">Print Details</Button>
            <Button variant="outline">Send to Email</Button>
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
                <DropdownMenuItem>Mark as Confirmed</DropdownMenuItem>
                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                <DropdownMenuItem>Mark as Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Edit Reservation</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
