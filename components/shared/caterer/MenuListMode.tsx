import { MenuItemsProps } from "@/app/caterer/caterer-types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import StarRating from "../StarRating";
import { Edit, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MenuListMode({
  menuItems,
  setCurrentMenu,
  setIsEditMenuOpen,
  setIsDetailsOpen,
  setIsDeleteDialogOpen,
}: MenuItemsProps) {
  return (
    <div className="space-y-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex">
            <div className="w-32 h-32 shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3
                    className="font-bold text-lg cursor-pointer hover:text-primary"
                    onClick={() => {
                      setCurrentMenu(item);
                      setIsDetailsOpen(true);
                    }}
                  >
                    {item.name}
                  </h3>
                  <Badge variant="outline" className="bg-muted/50 mt-1">
                    {item.category}
                  </Badge>
                </div>
                <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <StarRating rating={item.rating} />
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {(item.likes / 1000).toFixed(1)}k
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentMenu(item);
                      setIsEditMenuOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      setCurrentMenu(item);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
