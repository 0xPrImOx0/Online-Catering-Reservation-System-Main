import ReservationTable from "@/components/shared/caterer/ReservationTable";
import MetricCards from "@/components/shared/MetricCards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reservations } from "@/lib/reservation-dummy";
import {
  Calendar,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  Filter,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
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

  return (
    <main className="flex-1 overflow-auto space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Metrics cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((metric) => (
            <MetricCards key={metric.title} metric={metric} />
          ))}
        </div>
      </div>

      {/* Recent reservations table */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Recent Reservations</h2>
          </div>
          <Button variant={"outline"} asChild>
            <Link href={"/caterer/reservations"}>
              View All <ChevronRight />
            </Link>
          </Button>
        </div>

        {/* Recent reservations table */}
        <ReservationTable reservations={reservations} dashboard />
      </div>
    </main>
  );
}
