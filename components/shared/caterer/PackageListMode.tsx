import { PackageGridModeProps } from "@/app/caterer/caterer-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";
import { DollarSign, Edit, Trash2, Users } from "lucide-react";
import Image from "next/image";

export default function PackageListMode({
  cateringPackages,
  setCurrentPackage,
  setIsEditPackageOpen,
  setIsDeleteDialogOpen,
  setIsDetailsOpen,
}: PackageGridModeProps) {
  return (
    <div className="space-y-4">
      {cateringPackages.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex">
            <div className="w-32 h-32 shrink-0">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.name}
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
                      setCurrentPackage(pkg);
                      setIsDetailsOpen(true);
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <Badge variant="outline" className="bg-muted/50 mt-1">
                    {pkg.eventType}
                  </Badge>
                </div>
                <p className="font-bold text-lg">
                  {formatCurrency(pkg.totalPrice)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {pkg.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {pkg.numberOfOrders} orders
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Revenue: {formatCurrency(pkg.revenueGenerated)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentPackage(pkg);
                      setIsEditPackageOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      setCurrentPackage(pkg);
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
