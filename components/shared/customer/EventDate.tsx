import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function EventDate({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="eventDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="">
            Date <span className="text-destructive">*</span>{" "}
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
  );
}
