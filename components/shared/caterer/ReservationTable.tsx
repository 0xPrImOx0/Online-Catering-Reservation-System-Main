"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "../status-badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import ReservationDialog from "./ReservationDialog";
import { useState } from "react";
import {
  ReservationTableProps,
  reservationType,
} from "@/app/caterer/caterer-types";

export default function ReservationTable({
  reservations,
  dashboard = false,
}: ReservationTableProps) {
  const [selectedReservation, setSelectedReservation] =
    useState<reservationType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openReservationDetails = (reservation: reservationType) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };
  const tableHeads = [
    "Reservation ID",
    "Customer",
    "Event Date/Time",
    "Total Price",
    "Status",
    "Payment",
    "Actions",
  ];
  const currentDate = new Date(); // March 9, 2025

  const isUrgent = (eventDate: any) => {
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeads.map((head) =>
              dashboard && head === "Actions" ? null : (
                <TableHead key={head}>{head}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation: reservationType) => (
            <TableRow
              key={reservation.id}
              className={isUrgent(reservation.eventDate) ? "bg-yellow-50" : ""}
            >
              <TableCell className="font-medium">{reservation.id}</TableCell>

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

              <TableCell>${reservation.totalPrice.toLocaleString()}</TableCell>

              <TableCell>
                <StatusBadge status={reservation.status} />
              </TableCell>

              <TableCell>
                <StatusBadge status={reservation.payment.status} />
              </TableCell>

              {!dashboard && (
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
                    {/* Componentize */}
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
                        <DropdownMenuItem>Edit Reservation</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancel Reservation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedReservation && (
        <ReservationDialog
          selectedReservation={selectedReservation}
          setIsDetailsOpen={setIsDetailsOpen}
          isDetailsOpen={isDetailsOpen}
        />
      )}
    </div>
  );
}
