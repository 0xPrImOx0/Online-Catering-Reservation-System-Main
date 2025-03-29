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
import type { MenuDetailsDialogProps } from "@/types/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { CategoryBadge } from "./MenuCategoryBadge";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import TrayPriceCard from "../TrayPriceCard";

export function MenuDetailsDialog({ item, children }: MenuDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md md:max-w-xl w-full p-0 max-h-[85vh] flex flex-col overflow-hidden rounded-md">
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-10 bg-background shadow-md border-t-slate-400">
          <div className="relative h-60 w-full">
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name}
              priority
              width={600}
              height={240}
              className="object-cover max-h-[240px] overflow-hidden"
            />

            <div className="absolute top-2 right-2 flex gap-2">
              <Badge
                variant={item.available ? "default" : "destructive"}
                className={clsx({
                  "bg-emerald-600 dark:bg-emerald-500": item.available,
                })}
              >
                {item.available ? "Available" : "Unavailable"}
              </Badge>
              <CategoryBadge category={item.category} />

              {item.spicy && (
                <Badge
                  variant="outline"
                  className="bg-red-500 dark:bg-red-600 text-white border-red-500 dark:border-red-600 flex items-center gap-1"
                >
                  <Flame className="h-3 w-3" /> Spicy
                </Badge>
              )}
              <DialogClose className="h-8 w-8 rounded-full bg-background backdrop-blur-sm flex items-center justify-center hover:text-red-500 hover:bg-black dark:hover:bg-white transition-colors">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
          </div>
          <div className="p-6 pb-2 border-b border-border">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl text-foreground font-serif">
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

        <div className="overflow-y-auto p-6 flex-grow">
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
            <div className="flex gap-2 flex-wrap">
              {item.ingredients.length > 0 ? (
                item.ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="outline"
                    className="font-medium"
                  >
                    {ingredient}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">None</span>
              )}
            </div>
            {/* <p className="text-muted-foreground text-justify">
              {item.ingredients.join(", ")}
            </p> */}
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
              {Object.entries(item.nutritionInfo).map(([key, value]) => (
                <Card key={key} className="flex justify-between p-2">
                  <span className="capitalize">{key}</span>
                  <span className="font-bold">{value}</span>
                </Card>
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
              <Card className="flex justify-between items-center p-2 rounded py-3">
                <div>
                  <p className="font-medium">Regular price per pax</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    &#8369;{item.regularPricePerPax.toFixed(2)}
                  </p>
                </div>
              </Card>

              {item.prices.map((price) => (
                <TrayPriceCard
                  key={price.minimumPax}
                  data={price}
                  regularPrice={item.regularPricePerPax}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
