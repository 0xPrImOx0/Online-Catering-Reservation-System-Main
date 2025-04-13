import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { useFormContext } from "react-hook-form";
import MiniCateringPackageCard from "./MiniCateringPackageCard";

export default function PackageSelection() {
  const { control } = useFormContext<ReservationValues>();
  return (
    <section>
      <div className="space-y-3">
        {/* <h3 className="font-medium text-base">Main Cuisine Packages</h3> */}
        <FormField
          control={control}
          name="selectedPackage"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 gap-4 space-y-0">
              {cateringPackages.map((pkg) => (
                <MiniCateringPackageCard
                  pkg={pkg}
                  field={field}
                  key={pkg._id}
                />
              ))}
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
