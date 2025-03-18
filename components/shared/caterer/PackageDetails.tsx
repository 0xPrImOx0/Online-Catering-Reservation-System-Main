import { PackageDetailsProps } from "@/app/caterer/caterer-types";
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
import { formatCurrency } from "@/utils/format-currency";
import Image from "next/image";


export default function PackageDetails({
  currentPackage,
  isDetailsOpen,
  setIsDetailsOpen,
  setIsEditPackageOpen,
}: PackageDetailsProps) {
  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentPackage.name}</DialogTitle>
          <DialogDescription>
            <Badge variant="outline" className="mt-1">
              {currentPackage.eventType}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-md overflow-hidden border h-48 w-full">
            <Image
              src={currentPackage.image || "/placeholder.svg"}
              alt={currentPackage.name}
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-sm mb-4">{currentPackage.description}</p>

            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              Included Menus
            </h3>
            <div className="border rounded-md divide-y mb-4">
              {currentPackage.menus.map((dish) => (
                <div
                  key={dish.id}
                  className="flex justify-between items-center p-2"
                >
                  <span className="text-sm">{dish.name}</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(dish.price)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-2 bg-muted/20">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  {formatCurrency(currentPackage.totalPrice)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">
                  Number of Orders
                </h3>
                <p className="text-lg font-medium">
                  {currentPackage.numberOfOrders}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">
                  Revenue Generated
                </h3>
                <p className="text-lg font-medium">
                  {formatCurrency(currentPackage.revenueGenerated)}
                </p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-4">
              Last updated: {currentPackage.lastUpdated} | Last ordered:{" "}
              {currentPackage.lastOrdered}
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
              setIsEditPackageOpen(true);
            }}
          >
            Edit Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
