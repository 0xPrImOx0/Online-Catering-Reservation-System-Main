import { Button } from "@/components/ui/button";
import { Edit, Flame, Trash2 } from "lucide-react";
import Image from "next/image";
import StarRating from "../StarRating";
import { Badge } from "@/components/ui/badge";
import { MenuItemsProps } from "@/app/caterer/caterer-types";
import {
  Card,
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
import { CategoryBadge } from "../customer/MenuCategoryBadge";
import { RenderStarRatings } from "../CustomStarRating";
import { MenuDetailsDialog } from "../customer/MenuDetailsDialog";

export default function MenuGridCard({
  menuItem,
  setCurrentMenu,
  setIsEditMenuOpen,
  setIsDetailsOpen,
  setIsDeleteDialogOpen,
}: MenuItemsProps) {
  return (
    <Card className="overflow-hidden flex-1 border shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="custom"
                variant="ghost"
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                // onClick={() => setShowImageDialog(true)}
              >
                <Image
                  src={menuItem.imageUrl || "/placeholder.svg"}
                  alt={menuItem.name}
                  height={192}
                  width={375}
                  className="w-full object-cover overflow-hidden  transition-transform duration-500 hover:scale-105"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{menuItem.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="absolute top-2 right-2 flex gap-2">
          <Badge
            variant={menuItem.available ? "default" : "destructive"}
            className={
              menuItem.available
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-red-500 text-white"
            }
          >
            {menuItem.available ? "Available" : "Unavailable"}
          </Badge>

          <CategoryBadge category={menuItem.category} />

          {menuItem.spicy && (
            <Badge
              variant="outline"
              className="bg-red-500 text-white border-red-500 flex items-center gap-1 hover:bg-red-600"
            >
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-black/70 backdrop-blur-sm rounded px-2.5 py-1.5">
                  {RenderStarRatings(menuItem.rating, "medium")}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {menuItem.rating} out of 5 ({menuItem.ratingCount} reviews)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm text-white rounded px-2.5 py-1.5 font-bold">
            &#8369; 100.00
            {/* {menuPricePax.toFixed(2)} */}
          </div>
        </div>
      </div>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start">
          <div className="flex-1 min-w-0 pr-2">
            <CardTitle className="text-xl font-serif break-words">
              {menuItem.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {menuItem.shortDescription}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 mt-8">
        <MenuDetailsDialog item={menuItem}>
          <Button className="w-full">View Details</Button>
        </MenuDetailsDialog>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsEditMenuOpen((prev) => !prev)}
        >
          Edit Details
        </Button>
      </CardFooter>
    </Card>
  );
}
