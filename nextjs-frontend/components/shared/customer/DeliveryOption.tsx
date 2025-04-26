import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";

export default function DeliveryOption({ control }: { control: any }) {
  const { watch, setValue } = useFormContext<ReservationValues>();
  const deliveryFee = watch("deliveryFee");

  const handleDeliveryOption = () => {
    setValue("deliveryFee", 300);
  };
  const handlePickupOption = () => {
    setValue("deliveryFee", deliveryFee - 300);
  };
  return (
    <FormField
      control={control}
      name="deliveryOption"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="">
            Delivery Option <span className="text-destructive">*</span>{" "}
          </FormLabel>
          <RadioGroup
            defaultValue={field.value}
            onValueChange={field.onChange}
            className="grid grid-cols-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Pickup"
                id="pickup"
                onClick={handlePickupOption}
              />
              <Label htmlFor="pickup">Pickup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Delivery"
                id="delivery"
                onClick={handleDeliveryOption}
              />
              <Label htmlFor="delivery">Delivery</Label>
            </div>
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
