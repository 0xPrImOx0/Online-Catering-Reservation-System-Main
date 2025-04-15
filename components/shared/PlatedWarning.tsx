"use client";
import clsx from "clsx";
import { Info, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function PlatedWarning({ isPlated }: { isPlated: boolean }) {
  const [closePlatedWarning, setClosePlatedWarning] = useState(false);

  return (
    <div
      className={clsx(
        "mb-4 p-4 bg-yellow-50 border-2 border-amber-400 rounded-lg flex items-start gap-3 relative",
        {
          hidden: closePlatedWarning || !isPlated,
        }
      )}
    >
      <Button
        className="absolute right-4 top-4 text-muted-foreground"
        variant={"ghost"}
        size={"custom"}
        onClick={() => setClosePlatedWarning((prev) => !prev)}
      >
        <X className="min-w-5 min-h-5" />
      </Button>
      <Info className="w-20 sm:w-14 md:w-10 lg:w-6 relative text-yellow-500" />
      <div className="space-y-2">
        <h3 className="font-medium dark:text-background">
          Plated Course Service
        </h3>
        <p className="text-sm text-foreground dark:text-background text-justify max-w-[1000px]">
          Our plated course packages include professional waitstaff who will
          serve each course directly to your guests&apos; tables. An additional
          service fee of ₱100 per hour is included in the price per person.
        </p>
      </div>
    </div>
  );
}
