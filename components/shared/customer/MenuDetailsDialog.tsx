"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Flame, X } from "lucide-react";
import type {
  MenuDetailsDialogProps,
  ServingSize,
} from "@/types/customer/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { useMenuCalculations } from "@/hooks/useMenuCalculations";

export function MenuDetailsDialog({ item, children }: MenuDetailsDialogProps) {
  const { calculateSavings } = useMenuCalculations();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background max-h-[85vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background">
          <div className="relative h-60 w-full">
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge
                variant={item.available ? "default" : "destructive"}
                className={
                  item.available ? "bg-emerald-600 dark:bg-emerald-500" : ""
                }
              >
                {item.available ? "Available" : "Unavailable"}
              </Badge>
              {item.spicy && (
                <Badge
                  variant="outline"
                  className="bg-red-500 dark:bg-red-600 text-white border-red-500 dark:border-red-600 flex items-center gap-1"
                >
                  <Flame className="h-3 w-3" /> Spicy
                </Badge>
              )}
              <DialogClose className="h-8 w-8 rounded-full bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black dark:hover:bg-white/30 transition-colors">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
          </div>
          <div className="p-6 pb-2 border-b border-border">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-serif text-foreground">
                {item.name}
              </DialogTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>{RenderStarRatings(item.rating, "large")}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {item.rating} out of 5 ({item.ratingCount} reviews)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <DialogDescription className="text-muted-foreground mt-2">
              {item.shortDescription}
            </DialogDescription>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Description
            </h4>
            <p className="text-muted-foreground text-justify">
              {item.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Ingredients
            </h4>
            <p className="text-muted-foreground text-justify">
              {item.ingredients.join(", ")}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Allergens
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.allergens.length > 0 ? (
                item.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline">
                    {allergen}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">None</span>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Nutritional Information
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(item.nutritionalInfo).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between p-2 bg-muted rounded"
                >
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              *Values are per serving
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Preparation Method
            </h4>
            <p className="text-muted-foreground text-justify">
              {item.preparationMethod}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Pricing
            </h4>
            <div className="space-y-2">
              {[30, 50, 100].map((size) => (
                <div
                  key={size}
                  className="flex justify-between items-center p-2 bg-muted rounded"
                >
                  <div>
                    <p className="font-medium">{size} pax</p>
                    <p className="text-sm text-muted-foreground">
                      ${(item.prices[size as ServingSize] / size).toFixed(2)}{" "}
                      per person
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${item.prices[size as ServingSize].toFixed(2)}
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Save $
                      {calculateSavings({
                        regularPricePerPax: item.regularPricePerPax,
                        price: item.prices[size as ServingSize],
                        servingSize: size,
                      }).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
