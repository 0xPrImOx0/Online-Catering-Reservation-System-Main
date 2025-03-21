"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { EventTypeCardProps } from "@/types/customer/package-types";

export default function EventTypeCard({
  eventType,
  onSelect,
}: EventTypeCardProps) {
  return (
    <Card
      className="w-full cursor-pointer hover:border-primary transition-colors flex flex-col h-full"
      onClick={() => onSelect(eventType)}
    >
      <div className="w-full">
        <div className="relative w-full pt-[60%]">
          <Image
            src={`/placeholder.svg?height=300&width=400&text=${eventType}`}
            alt={eventType}
            fill
            className="object-cover rounded-t-lg absolute top-0 left-0"
          />
        </div>
      </div>
      <CardHeader>
        <CardTitle>{eventType} Events</CardTitle>
        <CardDescription>
          Specialized catering packages for {eventType.toLowerCase()} events and
          celebrations
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground text-justify">
          {eventType === "Birthday" &&
            "Celebrate your special day with our delicious Filipino cuisine."}
          {eventType === "Wedding" &&
            "Make your wedding reception memorable with our exquisite catering services."}
          {eventType === "Corporate" &&
            "Impress your colleagues and clients with our professional catering."}
          {eventType === "Graduation" &&
            "Celebrate academic achievements with our special graduation packages."}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full">View Packages</Button>
      </CardFooter>
    </Card>
  );
}
