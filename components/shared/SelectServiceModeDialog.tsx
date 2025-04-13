import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "../ui/form";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { DialogDescription, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";

const options = [
  {
    label: "Event Catering",
    value: "event",
    description: "Plan your perfect event with our predefined packages.",
    bg: "border-yellow-500",
  },
  {
    label: "Catering on Demand",
    value: "custom",
    description: "Order your dishes for delivery or pickup, whenever you want.",
    bg: "border-green-500",
  },
];

export default function SelectServiceModeDialog({
  showSelectServiceMode,
  setShowSelectServiceMode,
}: {
  showSelectServiceMode: boolean;
  setShowSelectServiceMode: (open: boolean) => void;
}) {
  const { reservationForm } = useReservationForm();

  return (
    <Dialog
      open={showSelectServiceMode}
      onOpenChange={setShowSelectServiceMode}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Select Service Mode
            <DialogDescription>
              Choose between predefined packages or custom catering.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <FormField
          control={reservationForm.control}
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
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            variant={"ghost"}
            onClick={() => setShowSelectServiceMode(false)}
          >
            Close
          </Button>
          <Button
            variant={"default"}
            onClick={() => setShowSelectServiceMode(false)}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
