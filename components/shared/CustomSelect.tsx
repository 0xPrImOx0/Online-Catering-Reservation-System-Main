import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CustomSelectProps = {
  defaultValue: string;
  placeholder: string;
  items: {
    value: string;
    title: string;
  }[];
  size?: "sm" | "lg";
};

export default function CustomSelect({
  defaultValue,
  placeholder,
  items,
  size = "sm",
}: CustomSelectProps) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger
        className={clsx("", { "w-[180px]": size === "sm", "": size === "lg" })}
      >
        <SelectValue placeholder={placeholder} />
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
