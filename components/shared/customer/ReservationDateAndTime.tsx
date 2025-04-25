import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function EventDate({
  control,
  deliveryOption,
}: {
  control: any;
  deliveryOption: "Delivery" | "Pickup";
}) {
  const toOrOf = deliveryOption === "Delivery" ? "of" : "to";
  return (
    <div className="flex gap-4 mt-4">
      <FormField
        control={control}
        name="reservationDate"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="">
              Date {toOrOf} {deliveryOption}
              <span className="text-destructive">*</span>{" "}
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : field.value || ""
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="reservationTime"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="">
              Time {toOrOf} {deliveryOption}{" "}
              <span className="text-destructive">*</span>{" "}
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : field.value || ""
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
