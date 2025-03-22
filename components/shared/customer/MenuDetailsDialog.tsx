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
import { Flame, Pencil, PencilOff, X } from "lucide-react";
import type {
  MenuDetailsDialogProps,
  ServingSize,
} from "@/types/customer/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { useMenuCalculations } from "@/hooks/useMenuCalculations";
import { CategoryBadge } from "./MenuCategoryBadge";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Card } from "@/components/ui/card";

export function MenuDetailsDialog({ item, children }: MenuDetailsDialogProps) {
  const { calculateSavings } = useMenuCalculations();
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[450px] md:max-w-[600px] bg-background max-h-[85vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background">
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
              ></Badge>
              <CategoryBadge category={item.category} />

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
              data={item.shortDescription}
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
            {item.ingredients.length > 0 ? (
                item.ingredients.map((ingredient) => (
                  <Badge key={ingredient} variant="outline">
                    {ingredient}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">None</span>
              )}
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
              {Object.entries(item.nutritionInfo).map(([key, value]) => (
                <Card
                  key={key}
                  className="flex justify-between p-2"
                >
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

              {item.prices.map(({ minimumPax, maximumPax, price }) => (
                <Card
                  key={price}
                  className="flex justify-between items-center p-2"
                >
                  <div>
                    <p className="font-medium">
                      {`${minimumPax} - ${maximumPax}`} pax
                    </p>
                    <p className="text-sm text-muted-foreground">
                      &#8369;{price.toFixed(2)} per person
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">&#8369;{price.toFixed(2)}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Save &#8369;
                      {calculateSavings({
                        regularPricePerPax: item.regularPricePerPax,
                        price: price,
                        servingSize: maximumPax,
                      }).toFixed(2)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
