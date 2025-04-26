import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";
import { withMask } from "use-mask-input";

export default function EventDate({
  control,
  deliveryOption,
}: {
  control: any;
  deliveryOption: "Delivery" | "Pickup";
}) {
  const toOrOf = deliveryOption === "Delivery" ? "of" : "to";
  const {
    formState: { errors },
  } = useFormContext<ReservationValues>();
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
      <div className="flex-1">
        <div className="flex items-end gap-4">
          <FormField
            control={control}
            name="reservationTime"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">
                  Time {toOrOf} {deliveryOption}{" "}
                  <span className="text-destructive">*</span>{" "}
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="text"
                    placeholder="00:00"
                    className=""
                    {...field}
                    ref={withMask("99:99", {
                      placeholder: "-",
                      showMaskOnHover: false,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="period"
            render={({ field }) => (
              <FormItem className="">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service hours rendered" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["A.M.", "P.M."].map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        {errors.reservationTime && (
          <span className="text-sm text-destructive">
            {errors.reservationTime.message}
          </span>
        )}
      </div>
    </div>
  );
}
