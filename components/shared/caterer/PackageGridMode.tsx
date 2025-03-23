import { PackageGridModeProps } from "@/types/caterer/caterer-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";
import { Clock, DollarSign, Edit, Package, Trash2, Users } from "lucide-react";
import Image from "next/image";

export default function PackageGridMode({
  cateringPackages,
  setCurrentPackage,
  setIsEditPackageOpen,
  setIsDeleteDialogOpen,
  setIsDetailsOpen,
}: PackageGridModeProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cateringPackages.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={pkg.image || "/placeholder.svg"}
              alt={pkg.name}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={() => {
                  setCurrentPackage(pkg);
                  setIsEditPackageOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-destructive"
                onClick={() => {
                  setCurrentPackage(pkg);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3
                className="font-bold text-lg cursor-pointer hover:text-primary"
                onClick={() => {
                  setCurrentPackage(pkg);
                  setIsDetailsOpen(true);
                }}
              >
                {pkg.name}
              </h3>
              <Badge variant="outline" className="bg-muted/50">
                {pkg.eventType}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {pkg.description}
            </p>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <p className="font-bold text-lg">
                  {formatCurrency(pkg.totalPrice)}
                </p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Package className="h-4 w-4 mr-1" />
                {pkg.menus.length} items
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {pkg.numberOfOrders} orders
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {pkg.lastOrdered}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
