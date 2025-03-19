"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Flame } from "lucide-react";
import { MenuCardProps, ServingSize } from "@/types/customer/menu-types";

export function MenuCard({ item }: MenuCardProps) {
  const [selectedServing, setSelectedServing] = useState<ServingSize>(30);

  return (
    <Card className="overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="absolute top-2 right-2 flex gap-2">
          <Badge
            variant={item.available ? "default" : "destructive"}
            className={item.available ? "bg-emerald-600" : ""}
          >
            {item.available ? "Available" : "Unavailable"}
          </Badge>

          {item.spicy && (
            <Badge
              variant="outline"
              className="bg-red-500 text-white border-red-500 flex items-center gap-1"
            >
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm text-white rounded px-2.5 py-1.5 font-bold">
            ${item.prices[selectedServing].toFixed(2)}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start">
          <div className="flex-1 min-w-0 pr-2">
            <CardTitle className="text-xl font-serif break-words">
              {item.name}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {item.shortDescription}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase text-gray-500 mb-1">
              Allergens:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.allergens.length > 0 ? (
                item.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline" className="text-xs">
                    {allergen}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-gray-600">None</span>
              )}
            </div>
          </div>

          <div className="pt-1">
            <p className="text-xs font-medium uppercase text-gray-500 mb-1">
              Select serving size:
            </p>
            <div className="flex gap-1.5">
              {[30, 50, 100].map((size) => (
                <Button
                  key={size}
                  variant={selectedServing === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedServing(size as ServingSize)}
                  className={`text-xs px-2.5 py-1 h-auto ${
                    selectedServing === size
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size} pax
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
