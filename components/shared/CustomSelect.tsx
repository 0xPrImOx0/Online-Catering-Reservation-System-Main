import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomSelectProps } from "@/types/component-types";
import { SortAsc } from "lucide-react";

export default function CustomSelect({
  defaultValue,
  placeholder,
  items,
  size = "sm",
}: CustomSelectProps) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger
        className={clsx({
          "flex-1": size === "sm",
          "w-[200px] max-w-[200px] ": size === "md",
          "w-[250px] max-w-[250px]": size === "lg",
        })}
      >
        <div className="flex items-center">
          <SortAsc className="mr-2 h-4 w-4" />
          <SelectValue className="" placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {items.map(({ value, title }) => (
          <SelectItem value={value} key={value}>
            {title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
