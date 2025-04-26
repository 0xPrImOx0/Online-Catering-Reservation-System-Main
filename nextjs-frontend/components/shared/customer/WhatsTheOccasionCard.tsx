import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import clsx from "clsx";

export default function WhatsTheOccasionCard({ control }: { control: any }) {
  const reservations = [
    {
      id: "event",
      title: "Event",
      subtitle:
        "Plan a memorable birthday, wedding, corporate party, or graduation.",
    },
    {
      id: "personal",
      title: "Personal Gathering",
      subtitle:
        "Order for yourself or a loved one. Perfect for anniversaries, holidays, or just because.",
    },
  ];
  return (
    <FormField
      control={control}
      name="reservationType"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>
            What's the Occasion? <span className="text-destructive">*</span>{" "}
          </FormLabel>
          <FormItem className="flex gap-4 space-x-0 space-y-0  max-sm:flex-col">
            {reservations.map((reservation) => (
              <FormControl key={reservation.title} className="flex-1">
                <Card
                  onClick={() => field.onChange(reservation.id)}
                  className={clsx(
                    "flex flex-col items-start cursor-pointer justify-start p-3 transition-all hover:bg-gray-100 hover:border-green-500",
                    {
                      "border border-green-500 bg-green-50":
                        field.value === reservation.id,
                    }
                  )}
                >
                  <CardHeader className="p-0">
                    <CardTitle className="font-semibold">
                      {reservation.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {reservation.subtitle}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FormControl>
            ))}
          </FormItem>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
