import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";

export default function PackageSelection() {
  const { control, getValues } = useFormContext<ReservationValues>();
  return (
    <section>
      {/* <FormField
        control={control}
        name="serviceMode"
        render={({ field }) => (
          <FormItem className="flex gap-4 space-y-0">
            {options.map((option) => (
              <FormControl key={option.value} className="">
                <Card
                  onClick={() => field.onChange(option.value)}
                  className={`flex-1 p-4 cursor-pointer border transition-all ${
                    field.value === option.value && option.bg
                  }`}
                >
                  <CardTitle>{option.label}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </Card>
              </FormControl>
            ))}
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </section>
  );
}
