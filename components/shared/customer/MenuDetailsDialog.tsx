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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MenuDetailsDialog({ menu, children }: MenuDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md md:max-w-xl w-full p-0 max-h-[85vh] flex flex-col overflow-hidden rounded-md">
        <div className="sticky top-0 z-10 shadow-md border-t-slate-400">
          <div className="relative w-full">
            <Image
              src={menu.imageUrl || "/placeholder.svg"}
              alt={menu.name}
              priority
              width={600}
              height={240}
              className="object-cover max-h-[240px] overflow-hidden"
            />

            <div className="absolute top-2 right-2 flex gap-2">
              <Badge
                variant={menu.available ? "default" : "destructive"}
                className={clsx({
                  "bg-emerald-600 dark:bg-emerald-500": menu.available,
                })}
              >
                {menu.available ? "Available" : "Unavailable"}
              </Badge>
              <CategoryBadge category={menu.category} />

              {menu.spicy && (
                <Badge
                  variant="outline"
                  className="bg-red-500 dark:bg-red-600 text-white border-red-500 dark:border-red-600 flex menus-center gap-1"
                >
                  <Flame className="h-3 w-3" /> Spicy
                </Badge>
              )}
              <DialogClose className="h-8 w-8 rounded-full bg-background backdrop-blur-sm flex menus-center justify-center hover:text-red-500 hover:bg-black dark:hover:bg-white transition-colors">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
          </div>

          <div className="p-6 pb-2 border-b border-border">
            <div className="flex menus-center justify-between">
              <DialogTitle className="text-2xl text-foreground font-serif">
                {menu.name}
              </DialogTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>{RenderStarRatings(menu.rating, "large")}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {menu.rating} out of 5 ({menu.ratingCount} reviews)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <DialogDescription className="text-muted-foreground mt-2">
              {menu.shortDescription}
            </DialogDescription>
            <div className="flex justify-between menus-center mt-4 bg-primary text-primary-foreground px-3 py-2 rounded-md">
              <div>
                <span className="text-lg font-bold">per pax</span>
              </div>
              <Button asChild variant={"secondary"}>
                <Link href={"/book-now"}>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-6">
          <div>
            <DialogTitle className="font-medium mb-2 text-lg text-foreground">
              Description
            </DialogTitle>
            <p className="text-muted-foreground text-justify">
              {menu.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Ingredients
            </h4>
            <div className="flex gap-2 flex-wrap">
              {menu.ingredients.length > 0 ? (
                menu.ingredients.map((ingredient) => (
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
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Allergens
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {menu.allergens.length > 0 ? (
                menu.allergens.map((allergen) => (
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
              {Object.entries(menu.nutritionInfo).map(
                ([key, value]) =>
                  key !== "_id" && (
                    <Card key={key} className="flex justify-between p-2">
                      <span className="capitalize">{key}</span>
                      <span className="font-bold">{value}</span>
                    </Card>
                  )
              )}
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
              {menu.preparationMethod}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Pricing
            </h4>
            <div className="space-y-2">
              <Card className="flex justify-between menus-center p-2 rounded py-3">
                <div>
                  <p className="font-medium">Regular price per pax</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    &#8369;{menu.regularPricePerPax.toFixed(2)}
                  </p>
                </div>
              </Card>

              {menu.prices.map((price) => (
                <TrayPriceCard
                  key={price.minimumPax}
                  data={price}
                  regularPrice={menu.regularPricePerPax}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
