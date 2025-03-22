"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Flame, Pencil, PencilOff, X } from "lucide-react";
import type {
  AddMenuDialogProps,
  MenuDetailsDialogProps,
  ServingSize,
} from "@/types/customer/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { useMenuCalculations } from "@/hooks/useMenuCalculations";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { CategoryBadge } from "../customer/MenuCategoryBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/lib/menu-select";
import CustomSelect from "../CustomSelect";
import ArrayInput from "../ArrayInput";

type LabelGroupProps = {
  title: string;
  placeholder: string;
  type?: "input" | "textarea" | "select" | "toggle";
  required?: boolean;
  rows?: number;
  selectData?: string[];
};

export function AddMenuDialog({
  isAddMenuOpen,
  setIsAddMenuOpen,
}: AddMenuDialogProps) {

  const renderFieldType = ({
    type,
    title,
    placeholder,
    required,
    rows,
    selectData,
  }: LabelGroupProps) => {
    switch (type) {
      case "input":
        return (
          <Input id={title} placeholder={placeholder} required={required} />
        );
      case "textarea":
        return (
          <Textarea
            id={title}
            placeholder={placeholder}
            rows={rows}
            required={required}
          />
        );
      case "select":
        return (
          // <CustomSelect defaultValue={title} placeholder={placeholder} items={selectData}  />
          <Select>
            <SelectTrigger id={title}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectData?.map((data) => (
                <SelectItem key={data} value={data}>{data}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "toggle":
        return <Switch id={title} className="h-5 w-9" defaultChecked />;
      default:
        break;
    }
  };
  const LabelGroup = ({
    title,
    placeholder,
    type = "input",
    required = true,
    rows = 5,
    selectData = [],
  }: LabelGroupProps) => {
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
        })}
      </div>
    );
  };

  return (
    <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
      <DialogContent className="max-w-[450px] md:max-w-[600px] bg-background max-h-[90dvh] overflow-y-auto p-0">
        <DialogClose className="absolute z-10 top-2 right-2 h-8 w-8 rounded-full bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black dark:hover:bg-white/30 transition-colors">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="p-6 pb-2 border-b border-border">
          <DialogTitle className="text-2xl text-foreground ">
            Add a New Menu
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Please provide the details to add a new menu to your restaurant!
          </DialogDescription>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <LabelGroup title="Name" placeholder="ex. Sinigang na baboy" />
          <LabelGroup
            title="Short Description"
            placeholder="ex. Sour tamarind soup with pork and vegetables"
          />

          <LabelGroup
            title="Category"
            placeholder="ex. Soup"
            type="select"
            selectData={categories}
          />
          <div className="grid grid-cols-2 gap-6">
            <LabelGroup
              title="Available?"
              placeholder="ex. Soup"
              type="toggle"
            />
            <LabelGroup title="Spicy?" placeholder="ex. Soup" type="toggle" />
          </div>
          <LabelGroup
            title="Preparation method"
            placeholder="Text here..."
            type="textarea"
            rows={3}
          />
          <LabelGroup
            title="Full Description"
            placeholder="Text here..."
            type="textarea"
          />

          <LabelGroup
            title="Price Per Person"
            placeholder="How much price per person?"
          />
          <LabelGroup
            title="Serving Per Person"
            placeholder="How much serving size per person?"
          />
          <ArrayInput />

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Ingredients
            </h4>

            <p className="text-muted-foreground text-justify">
              Pork Pork Pork Pork
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Allergens
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-muted-foreground">None</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Nutritional Information
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {/* {Object.entries(item.nutritionInfo).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between p-2 bg-muted rounded"
                >
                  <span className="font-medium capitalize">{key}</span>
                  <span></span>
                </div>
              ))} */}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              *Values are per serving
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Preparation Method
            </h4>
            <p className="text-muted-foreground text-justify">
              Preperation Method
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-lg text-foreground">
              Pricing
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded py-3">
                <div>
                  <p className="font-medium">Regular price per pax</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">&#8369;100.00</p>
                </div>
              </div>

              {/* {item.prices.map(({ minimumPax, maximumPax, price }) => (
                <div
                  key={price}
                  className="flex justify-between items-center p-2 bg-muted rounded"
                >
                  <div>
                    <p className="font-medium">
                      {`${minimumPax} - ${maximumPax}`} pax
                    </p>
                    <p className="text-sm text-muted-foreground">
                      &#8369;{price}{" "}
                      <span className="text-[10px]">fixed price*</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">&#8369;{price}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Save &#8369;
                      {calculateSavings({
                        regularPricePerPax: item.regularPricePerPax,
                        price: price,
                        servingSize: maximumPax,
                      }).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
