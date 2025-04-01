"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EventTypeCardProps } from "@/types/package-types";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventTypeCard({
  eventType,
  onSelect,
  image = "",
}: EventTypeCardProps) {
  return (
    <Card
      className="flex flex-1 overflow-hidden min-h-[400px] rounded-lg border cursor-pointer"
      onClick={() => onSelect(eventType)}
    >
      {/* <div className="flex-1">
        <Image
          src={
            image || `/placeholder.svg?height=200&width=200&text=${eventType}`
          }
          width={1200}
          height={800}
          alt={eventType}
          className="w-full h-full object-cover"
        />
      </div> */}
      <Skeleton className="flex-1" />
      <div className="flex-1 flex flex-col justify-between p-4">
        <CardHeader className="flex flex-col p-0 justify-between">
          <CardTitle className="text-3xl font-semibold">
            {eventType} Events
          </CardTitle>
          {/* <CardDescription>
            Specialized catering packages for {eventType.toLowerCase()} events
            and celebrations
          </CardDescription> */}
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-base text-muted-foreground text-justify">
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
        <div className="flex flex-col">
          <Separator decorative className="h-1 bg-foreground" />
          <CardFooter className="flex items-center justify-center p-0 pt-4 ">
            <span className="text-lg font-medium flex-1">View Details</span>
            <div className="p-2 border border-foreground rounded-full">
              <ArrowUpRightIcon className="w-7 h-7" />
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

{
  /* <Link
  href={link}
  className="flex flex-1 overflow-hidden min-h-[400px] rounded-lg border"
>
  <div className="flex-1 p-4 flex flex-col justify-between">


    <div>
      <div className="flex pt-4 items-center gap-4">
        {link === "/menus" ? <UtensilsCrossed /> : <Info />}
        <span className="text-lg font-medium flex-1">{footer}</span>
        <div className="p-2 border border-foreground rounded-full">
          <ArrowUpRightIcon className="w-7 h-7" />
        </div>
      </div>
    </div>
  </div>
</Link>; */
}
