import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { cateringPackages } from "@/lib/customer/packages-metadata";
import { useFormContext } from "react-hook-form";
import MiniCateringPackageCard from "./MiniCateringPackageCard";

export default function PackageSelection() {
  const { control, getValues } = useFormContext<ReservationValues>();
  return (
    <section>
      <FormField
        control={control}
        name="selectedPackage"
        render={({ field }) => (
          <FormItem className="grid grid-cols-2 gap-4 space-y-0">
            {cateringPackages.map((pkg) => (
              <MiniCateringPackageCard pkg={pkg} field={field} key={pkg._id} />
            ))}
          </FormItem>
        )}
      />
    </section>
  );
}
