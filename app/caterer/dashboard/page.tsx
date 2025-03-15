import ReservationTable from "@/components/shared/caterer/ReservationTable";
import MetricCards from "@/components/shared/MetricCards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { reservations } from "@/lib/reservation-dummy";
import { Calendar, Filter, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { metricCards, registeredCustomers } from "./metadata";
import { avatarFallBack } from "@/utils/avatarFallback";

export default function DashboardPage() {
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
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href={"/caterer/reservations"}>View All</Link>
          </Button>
        </div>

        {/* Recent reservations table */}
        <ReservationTable reservations={reservations} dashboard />
        {/* Recent Registered Customers and Recent Concerns */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Recent Registered Customers */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">
                  Recent Registered Customers
                </h2>
              </div>
              <Button variant="outline" size="sm">
                View all customers
              </Button>
            </div>

            <div className="mt-4 rounded-md border">
              <div className="p-4">
                <div className="space-y-4">
                  {registeredCustomers.map((customer, index) => (
                    <div key={customer.name} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {avatarFallBack(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {customer.createdAt}
                        </div>
                      </div>
                      {registeredCustomers.length - 1 === index ? null : (
                        <Separator />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Concerns */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Recent Concerns</h2>
              </div>
              <Button variant="outline" size="sm">
                View all concerns
              </Button>
            </div>
            <div className="mt-4 rounded-md border">
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MG</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Maria Garcia</div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-800"
                      >
                        2h ago
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Can you confirm delivery by 7 PM for our event this
                      Saturday?
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">John Davis</div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-800"
                      >
                        5h ago
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Need to add 5 more vegetarian meals to our corporate lunch
                      order.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>Guest</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Guest</div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-800"
                      >
                        1d ago
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Do you offer gluten-free options for your birthday
                      packages?
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>KW</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Karen Wilson</div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-800"
                      >
                        2d ago
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Need to reschedule our family reunion catering from April
                      10 to April 17.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
