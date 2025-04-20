import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReservationForm } from "@/hooks/use-reservation-form";

export default function AddRemoveMenuQuantity({
  value,
  category,
  menu,
  onChange,
}: {
  value: any;
  category: string;
  menu: string;
  onChange: (value: any) => void;
}) {
  const { handleReduceQuantity, handleAddQuantity } = useReservationForm();

  return (
    <div className="flex items-center">
      <Button
        variant={"outline"}
        type="button"
        onClick={() => handleReduceQuantity(value, category, menu, onChange)}
        className="w-9 h-9 flex items-center justify-center border-r-0 rounded-r-none"
      >
        -
      </Button>
      <Input
        type="number"
        min="0"
        value={value[category][menu]?.quantity || 0}
        onChange={(e) => {
          const newCount = parseInt(e.target.value, 10);
          if (!isNaN(newCount) && newCount >= 0) {
            onChange({
              ...value,
              [category]: {
                ...value[category],
                [menu]: newCount,
              },
            });
          }
        }}
        className="w-12 p-0 z-10 border rounded-none text-center no-spinners"
      />
      <Button
        variant={"outline"}
        type="button"
        onClick={() => handleAddQuantity(value, category, menu, onChange)}
        className="w-9 h-9 flex items-center justify-center border-l-0 rounded-l-none"
      >
        +
      </Button>
    </div>
  );
}
