import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem } from "../ui/form";
import { useReservationForm } from "@/hooks/use-reservation-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DialogDescription, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const options = [
  {
    label: "Event Catering",
    value: "event",
    description: "Plan your perfect event with our predefined packages.",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*jQSVrNafdz4IW5D7",
    bg: "border-yellow-500",
  },
  {
    label: "Catering on Demand",
    value: "custom",
    description: "Order your dishes for delivery or pickup, whenever you want.",
    imageUrl:
      "https://www.travelwisconsin.com/uploads/places/ac/ac77b893-b6c0-4bb7-ba38-33a1b285c3d7-431017935_914661377327082_7598367058503880550_n.jpg",
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
  const router = useRouter();

  return (
    <Dialog
      open={showSelectServiceMode}
      onOpenChange={setShowSelectServiceMode}
    >
      <DialogContent className="sm:min-w-[600px] lg:min-w-[700px]">
        <DialogHeader className="mb-4">
          <DialogTitle>
            Select Service Mode
            <DialogDescription className="font-medium">
              Choose between predefined packages or custom catering.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <FormField
          control={reservationForm.control}
          name="serviceMode"
          render={({ field }) => (
            <FormItem className="flex gap-4 space-y-0  max-sm:flex-col">
              {options.map((option) => (
                <FormControl key={option.value} className="flex-1">
                  <Card
                    onClick={() => field.onChange(option.value)}
                    className={`flex-1 cursor-pointer border-2 transition-all ${
                      field.value === option.value && option.bg
                    }`}
                  >
                    <CardHeader className="p-0">
                      <Image
                        src={option.imageUrl}
                        alt={option.label}
                        width={200}
                        height={200}
                        className="w-full h-40 rounded-t-lg mb-2 object-cover"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{option.label}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardContent>
                  </Card>
                </FormControl>
              ))}
            </FormItem>
          )}
        />
        <DialogFooter className="mt-8">
          <Button
            variant={"ghost"}
            onClick={() => {
              setShowSelectServiceMode(false);
              router.back();
            }}
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
