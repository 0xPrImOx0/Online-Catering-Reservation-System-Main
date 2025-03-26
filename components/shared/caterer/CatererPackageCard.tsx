"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { RenderStarRatings } from "../CustomStarRating";
import { PackageCardProps } from "@/types/customer/package-types";
import EditPackageDialog from "./EditPackageDialog";
import DeletePackageDialog from "./DeletePackageDialog";
import PackageDetailsDialog from "../customer/PackageDetailsDialog";
import { MenuImageDialog } from "../customer/MenuImageDialog";

export function CatererPackageCard({ item }: PackageCardProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showPackageDetails, setShowPackageDetails] = useState(false);

  return (
    <Card className="min-w-[325px] flex-1 overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="custom"
                variant="ghost"
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setShowImageDialog(true)}
              >
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  height={192}
                  width={375}
                  className="w-full object-cover overflow-hidden transition-transform duration-500 hover:scale-105"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* <div className="absolute top-2 right-2 flex gap-2">
          <Badge
            variant={item.available ? "default" : "destructive"}
            className={
              item.available
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-red-500 text-white"
            }
          >
            {item.available ? "Available" : "Unavailable"}
          </Badge>

          <CategoryBadge category={item.category} />

          {item.spicy && (
            <Badge
              variant="outline"
              className="bg-red-500 text-white border-red-500 flex items-center gap-1 hover:bg-red-600"
            >
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div> */}

        <div className="absolute bottom-3 left-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-black/70 backdrop-blur-sm rounded px-2.5 py-1.5">
                  {RenderStarRatings(item.rating, "medium")}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {item.rating} out of 5 ({item.ratingCount} reviews)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm text-white rounded px-2.5 py-1.5 font-bold">
            ₱{item.prices[0].price.toFixed(2)}
          </div>
        </div> */}
      </div>

      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-serif break-words">
          {item.name}
        </CardTitle>
        <CardDescription className="mt-1">{item.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow" />

      <CardFooter className="flex justify-between">
        <Button
          className="text-blue-600 gap-1"
          size="custom"
          variant="link"
          onClick={() => setShowPackageDetails(true)}
        >
          <Eye /> View Details
        </Button>
        <div className="flex gap-2">
          <Button
            className="text-yellow-600 gap-1"
            size="custom"
            onClick={() => setIsEditPackageOpen((prev) => !prev)}
            variant="link"
          >
            <Pencil /> Edit
          </Button>
          <Button
            className="text-destructive gap-1"
            size="custom"
            onClick={() => setIsDeleteDialogOpen((prev) => !prev)}
            variant="link"
          >
            <Trash2 /> Delete
          </Button>
        </div>
      </CardFooter>

      <EditPackageDialog
        isEditPackageOpen={isEditPackageOpen}
        setIsEditPackageOpen={setIsEditPackageOpen}
      />
      <DeletePackageDialog
        item={item}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      <PackageDetailsDialog
        pkg={item}
        open={showPackageDetails}
        onOpenChange={setShowPackageDetails}
      />
      
      <MenuImageDialog
        item={item}
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
      />
    </Card>
  );
}
