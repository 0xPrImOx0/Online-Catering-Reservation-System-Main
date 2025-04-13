import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { FormControl } from "@/components/ui/form";
import { CateringPackagesProps } from "@/types/package-types";
import React, { useState } from "react";
import PackageDetailsDialog from "./PackageDetailsDialog";
import { EyeIcon } from "lucide-react";
import clsx from "clsx";

export default function MiniCateringPackageCard({
  pkg,
  field,
}: {
  pkg: CateringPackagesProps;
  field: any;
}) {
  const [open, setOpenChange] = useState(false);

  return (
    <FormControl key={pkg._id} className="">
      <div>
        <Card
          onClick={() => field.onChange(pkg._id)}
          className={clsx(
            "flex-1 p-4 cursor-pointer border transition-all hover:bg-gray-100 hover:border-foreground",
            { "border-foreground": field.value === pkg._id }
          )}
        >
          <CardTitle>{pkg.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {pkg.description}
          </CardDescription>
          <CardFooter className="p-0 mt-3 flex justify-end">
            <Button
              variant={"link"}
              size={"custom"}
              onClick={() => setOpenChange(true)}
            >
              <EyeIcon />
              View Details
            </Button>
          </CardFooter>
        </Card>
        <PackageDetailsDialog
          pkg={pkg}
          open={open}
          onOpenChange={setOpenChange}
          isReservationForm
        />
      </div>
    </FormControl>
  );
}
