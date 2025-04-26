import {
  ClipboardCheck,
  ClipboardList,
  ClipboardPen,
  CreditCard,
} from "lucide-react";

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

const items = {
  status: [
    { value: "all", title: "All Statuses" },
    { value: "confirmed", title: "Confirmed" },
    { value: "pending", title: "Pending" },
    { value: "completed", title: "Completed" },
    { value: "cancelled", title: "Cancelled" },
  ],
  customerType: [
    { value: "all", title: "All Customers" },
    { value: "registered", title: "Registered" },
    { value: "guest", title: "Guest" },
  ],
};

export { metricCards, items };
