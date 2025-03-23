import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChangeEvent } from "react";

type LabelGroupProps = {
  title: string;
  placeholder?: string;
  type?: "input" | "textarea" | "select" | "toggle";
  required?: boolean;
  rows?: number;
  selectData?: string[];
  number?: boolean;
  value?: string | boolean | number;
  onChange?: (value: string | boolean) => void;
};

export default function LabelGroup({
  title,
  placeholder,
  type = "input",
  required = true,
  rows = 5,
  selectData = [],
  number = false,
  value,
  onChange,
}: LabelGroupProps) {
  return (
    <div
      className={clsx("space-y-2", {
        "flex justify-between items-center": type === "toggle",
      })}
    >
      <Label className="capitalize" htmlFor={title}>
        {title} {required && <span className="text-destructive">*</span>}
      </Label>
      {renderFieldType({
        type,
        title,
        placeholder,
        required,
        rows,
        selectData,
        number,
        value,
        onChange,
      })}
    </div>
  );
}

const renderFieldType = ({
  type,
  title,
  placeholder,
  required,
  rows,
  selectData,
  number,
  value,
  onChange,
}: LabelGroupProps) => {
  switch (type) {
    case "input":
      return (
        <Input
          id={title}
          placeholder={placeholder}
          required={required}
          type={number ? "number" : "text"}
          value={value as string}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange?.(e.target.value)
          }
        />
      );
    case "textarea":
      return (
        <Textarea
          id={title}
          placeholder={placeholder}
          rows={rows}
          required={required}
          value={value as string}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange?.(e.target.value)
          }
        />
      );
    case "select":
      return (
        // <CustomSelect defaultValue={title} placeholder={placeholder} items={selectData}  />
        <Select
          value={value as string}
          onValueChange={(newValue) => onChange?.(newValue)}
        >
          <SelectTrigger id={title}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {selectData?.map((data) => (
              <SelectItem key={data} value={data}>
                {data}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "toggle":
      return (
        <Switch
          id={title}
          className="h-5 w-9"
          defaultChecked
          checked={value as boolean}
          onCheckedChange={(checked) => onChange?.(checked)}
        />
      );
    default:
      break;
  }
};
