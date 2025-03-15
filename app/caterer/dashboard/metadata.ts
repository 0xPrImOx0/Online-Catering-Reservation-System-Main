import { Calendar, CreditCard, DollarSign } from "lucide-react";

const metricCards = [
  {
    title: "Revenue",
    firstContent: "$5,430",
    secondContent: "Last 30 days",
    Icon: DollarSign,
  },
  {
    title: "Pending Payments",
    firstContent: "5 / $1,250",
    secondContent: "Unpaid reservations",
    Icon: CreditCard,
  },
  {
    title: "Upcoming Reservations",
    firstContent: "12",
    secondContent: "Next 7 Days",
    Icon: Calendar,
  },
  {
    title: "New Customers",
    firstContent: "8",
    secondContent: "Last 30 Days",
    Icon: Calendar,
  },
];

const registeredCustomers = [
  {
    name: "Ashley Wilson",
    email: "ashleywilson@gmail.com",
    createdAt: "Mar 10, 2025",
  },
  {
    name: "James Thompson",
    email: "james.t@gmail.com",
    createdAt: "Mar 7, 2025",
  },
  {
    name: "Sarah Lee",
    email: "sarah.lee@gmail.com",
    createdAt: "Mar 6, 2025",
  },
  {
    name: "Robert Johnson ",
    email: "robertjo@gmail.com",
    createdAt: "Mar 4, 2025",
  },
  {
    name: "Robredo Timido",
    email: "robredotimi@gmail.com",
    createdAt: "Mar 3, 2025",
  },
];

export { metricCards, registeredCustomers };
