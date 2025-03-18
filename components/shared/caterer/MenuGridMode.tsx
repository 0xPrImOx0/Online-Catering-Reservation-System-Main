import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import StarRating from "../StarRating";
import { Badge } from "@/components/ui/badge";
import { MenuItemsProps } from "@/app/caterer/caterer-types";

export default function MenuGridMode({
  menuItems,
  setCurrentMenu,
  setIsEditMenuOpen,
  setIsDetailsOpen,
  setIsDeleteDialogOpen,
}: MenuItemsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={300}
              height={300}
              className="w-full h-full object-cover bg-input"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={() => {
                  setCurrentMenu(item);
                  setIsEditMenuOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-destructive"
                onClick={() => {
                  setCurrentMenu(item);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <StarRating rating={item.rating} />
            <div className="flex justify-between items-start mb-2">
              <h3
                className="font-bold text-lg cursor-pointer hover:text-primary"
                onClick={() => {
                  setCurrentMenu(item);
                  setIsDetailsOpen(true);
                }}
              >
                {item.name}
              </h3>
              <Badge variant="outline" className="bg-muted/50">
                {item.category}
              </Badge>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              {item.timesOrdered} orders
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
