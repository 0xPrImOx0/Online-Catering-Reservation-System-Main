import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CreditCard,
  DollarSign,
  Filter,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Current date for reference
  const currentDate = new Date(2025, 2, 9); // March 9, 2025

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Metrics cards */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <DollarSign className="mr-1 h-4 w-4 text-blue-500" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">$5,430</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <CreditCard className="mr-1 h-4 w-4 text-red-500" />
                  Pending Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">
                  5 / $1,250
                </div>
                <p className="text-xs text-muted-foreground">
                  Unpaid reservations
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4 text-green-500" />
                  Upcoming Reservations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">12</div>
                <p className="text-xs text-muted-foreground">Next 7 days</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <Users className="mr-1 h-4 w-4 text-purple-500" />
                  New Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-500">8</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming reservations table */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Upcoming Reservations</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>The last update: 10 minutes ago</span>
                <div className="flex items-center gap-1 rounded-md border px-2 py-1">
                  <span>Sort by: Date</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date of the event</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-blue-100"></div>
                        <span>Johnson Wedding Reception</span>
                      </div>
                    </TableCell>
                    <TableCell>Saturday, March 10, 2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-500"
                      >
                        In 1 day
                      </Badge>
                    </TableCell>
                    <TableCell>Wedding Package</TableCell>
                    <TableCell className="text-right">$2,345</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-green-100"></div>
                        <span>Corporate Lunch - Tech Inc.</span>
                      </div>
                    </TableCell>
                    <TableCell>Tuesday, March 11, 2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-500"
                      >
                        In 2 days
                      </Badge>
                    </TableCell>
                    <TableCell>Business Lunch</TableCell>
                    <TableCell className="text-right">$1,200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-purple-100"></div>
                        <span>Smith Family Reunion</span>
                      </div>
                    </TableCell>
                    <TableCell>Friday, March 14, 2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-500"
                      >
                        Next week
                      </Badge>
                    </TableCell>
                    <TableCell>Family Gathering</TableCell>
                    <TableCell className="text-right">$950</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Recent reservations table */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Recent Reservations</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  The last update: 10 minutes ago
                </span>
                <Button variant="outline" size="sm">
                  View all reservations
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead className="text-right">Total price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-blue-500">
                      #RES238920483
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>AW</AvatarFallback>
                        </Avatar>
                        <span>Ashley Wilson</span>
                      </div>
                    </TableCell>
                    <TableCell>03/08/2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-500"
                      >
                        Confirmed
                      </Badge>
                    </TableCell>
                    <TableCell>Wedding Package</TableCell>
                    <TableCell className="text-right">$2,580</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-blue-500">
                      #RES238920359
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <span>Anna Fernandez</span>
                      </div>
                    </TableCell>
                    <TableCell>03/07/2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-500"
                      >
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell>Corporate Event</TableCell>
                    <TableCell className="text-right">$1,680</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-blue-500">
                      #RES239203459
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>EB</AvatarFallback>
                        </Avatar>
                        <span>Elizabeth Bailey</span>
                      </div>
                    </TableCell>
                    <TableCell>03/05/2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-500"
                      >
                        Confirmed
                      </Badge>
                    </TableCell>
                    <TableCell>Birthday Party</TableCell>
                    <TableCell className="text-right">$750</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-blue-500">
                      #RES238920359
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>JE</AvatarFallback>
                        </Avatar>
                        <span>John Edwards</span>
                      </div>
                    </TableCell>
                    <TableCell>03/03/2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-500"
                      >
                        Unpaid
                      </Badge>
                    </TableCell>
                    <TableCell>Family Gathering</TableCell>
                    <TableCell className="text-right">$920</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-blue-500">
                      #RES238920483
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>JJ</AvatarFallback>
                        </Avatar>
                        <span>Jacob Jackson</span>
                      </div>
                    </TableCell>
                    <TableCell>03/01/2025</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-500"
                      >
                        Confirmed
                      </Badge>
                    </TableCell>
                    <TableCell>Corporate Lunch</TableCell>
                    <TableCell className="text-right">$810</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <span className="sr-only">Previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 bg-primary p-0 text-primary-foreground"
            >
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              4
            </Button>
            <span className="mx-1">...</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              10
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              11
            </Button>
            <Button variant="outline" size="icon">
              <span className="sr-only">Next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
