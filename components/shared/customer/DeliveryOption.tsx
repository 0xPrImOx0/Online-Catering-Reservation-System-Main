import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DeliveryOption({ control }: { control: any }) {
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
              <RadioGroupItem value="Pickup" id="pickup" />
              <Label htmlFor="pickup">Pickup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Delivery" id="delivery" />
              <Label htmlFor="delivery">Delivery (&#8369;300)</Label>
            </div>
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
