import { MenuInfoDialogProps } from "@/app/caterer/caterer-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function MenuInfoDialog({
  currentMenu,
  isDetailsOpen,
  setIsDetailsOpen,
  setIsEditMenuOpen,
}: MenuInfoDialogProps) {
  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentMenu.name}</DialogTitle>
          <DialogDescription>
            <Badge variant="outline" className="mt-1">
              {currentMenu.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-md overflow-hidden border h-60 w-full">
            <Image
              src={currentMenu.image || "/placeholder.svg"}
              alt={currentMenu.name}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm mb-4">{currentMenu.description}</p>

            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              Ingredients
            </h3>
            <p className="text-sm mb-4">{currentMenu.ingredients}</p>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">
                  Price
                </h3>
                <p className="text-lg font-medium">
                  ${currentMenu.price.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">
                  Times Ordered
                </h3>
                <p className="text-lg font-medium">
                  {currentMenu.timesOrdered}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">
                  In Packages
                </h3>
                <p className="text-lg font-medium">{currentMenu.inPackages}</p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-4">
              Last updated: {currentMenu.lastUpdated}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              setIsDetailsOpen(false);
              setIsEditMenuOpen(true);
            }}
          >
            Edit Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
