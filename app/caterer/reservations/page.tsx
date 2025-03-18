"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import MetricCards from "@/components/shared/MetricCards";
import { reservations } from "@/lib/reservation-dummy";
import ReservationTable from "@/components/shared/caterer/ReservationTable";
import DateSelector from "@/components/shared/DateSelector";
import SearchInput from "@/components/shared/SearchInput";
import CustomSelect from "@/components/shared/CustomSelect";
import CustomPagination from "@/components/shared/CustomPagination";
import { metricCards, items } from "./metadata";

// Current date for reference

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [query, setQuery] = useState("");

  return (
    <main className="flex-1 overflow-auto px-[4px]">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
        <div className="flex items-center">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add New Reservation
          </Button>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <MetricCards metric={metric} key={metric.title} />
        ))}
      </div>

      {/* Search Bar and Filters */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2">
          <SearchInput query={query} setQuery={setQuery} placeholderTitle="reservations" />
          <DateSelector date={date} setDate={setDate} />
        </div>
        <div className="flex items-center gap-2">
          <CustomSelect
            defaultValue="all"
            placeholder="Status"
            items={items.status}
          />
          <CustomSelect
            defaultValue="all"
            placeholder="Customer Type"
            items={items.customerType}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {/*All Reservations table */}
          <ReservationTable reservations={reservations} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          {/* Upcoming reseryvations would be shown here */}
          <ReservationTable reservations={reservations} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {/* Past reservations would be shown here */}
          <ReservationTable reservations={reservations} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination title={"reservations"} length={reservations.length} />
    </main>
  );
}
