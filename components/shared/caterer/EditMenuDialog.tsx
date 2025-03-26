"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import type {
  EditMenuDialogProps,
  MenuItem,
  NutritionInfo,
} from "@/types/menu-types";
import { allergens, categories } from "@/lib/menu-select";
import ArrayInput from "../ArrayInput";
import { useState } from "react";
import TrayPriceCard from "../TrayPriceCard";
import LabelGroup from "../LabelGroup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/types/component-types";

export function EditMenuDialog({
  isEditMenuOpen,
  setIsEditMenuOpen,
  item,
}: EditMenuDialogProps) {
  const [formState, setFormState] = useState<MenuItem>(item);

  const [nutritionInfoForm, setNutritionInfoForm] = useState<NutritionInfo>(
    item["nutritionInfo"]
  );

  function arrayToTags(input: string[]): Tag[] {
    return input.map((text, index) => ({
      id: String(index),
      text: text,
    }));
  }

  const handleChange = (field: keyof MenuItem, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNutritionInfoChange = (
    field: keyof NutritionInfo,
    value: string | boolean
  ) => {
    setNutritionInfoForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const pax = [
    {
      minimumPax: 4,
      maximumPax: 6,
    },
    {
      minimumPax: 8,
      maximumPax: 10,
    },
    {
      minimumPax: 13,
      maximumPax: 15,
    },
    {
      minimumPax: 18,
      maximumPax: 20,
    },
  ];

  return (
    <Dialog open={isEditMenuOpen} onOpenChange={setIsEditMenuOpen}>
      <DialogContent className="max-w-[500px] md:max-w-[600px] bg-background max-h-[90dvh] overflow-y-auto p-0 pb-6">
        <div className="sticky z-10 top-0 bg-background p-6 pb-2 border-b border-border">
          <DialogTitle className="text-2xl text-foreground ">
            Edit Menu
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Please edit the details to below as necessary!
          </DialogDescription>
          <DialogClose className="absolute z-10 top-2 right-2 h-8 w-8 rounded-full bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black dark:hover:bg-white/30 transition-colors">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <LabelGroup
            title="Name"
            placeholder="ex. Sinigang na baboy"
            value={formState["name"]}
            onChange={(value) => handleChange("name", value)}
          />
          <LabelGroup
            title="Short Description"
            placeholder="ex. Sour tamarind soup with pork and vegetables"
            value={formState["shortDescription"]}
            onChange={(value) => handleChange("shortDescription", value)}
          />
          <LabelGroup
            title="Full Description"
            placeholder="Text here..."
            type="textarea"
            value={formState["fullDescription"]}
            onChange={(value) => handleChange("fullDescription", value)}
          />

          <LabelGroup
            title="Category"
            placeholder="ex. Soup"
            type="select"
            selectData={categories}
            value={formState["category"]}
            onChange={(value) => handleChange("category", value)}
          />
          <div className="grid grid-cols-2 gap-6">
            <LabelGroup
              title="Available?"
              type="toggle"
              value={formState["available"]}
              onChange={(value) => handleChange("category", value)}
            />
            <LabelGroup
              title="Spicy?"
              type="toggle"
              value={formState["spicy"]}
              onChange={(value) => handleChange("spicy", value)}
            />
          </div>
          <LabelGroup
            title="Preparation method"
            placeholder="Text here..."
            type="textarea"
            rows={3}
            value={formState["preparationMethod"]}
            onChange={(value) => handleChange("preparationMethod", value)}
          />
          <LabelGroup
            title="Serving Per Person"
            placeholder="How much serving size per person?"
            value={formState["perServing"]}
            onChange={(value) => handleChange("perServing", value)}
          />
          <ArrayInput
            tags={arrayToTags(item.ingredients)}
            title="Ingredients"
          />
          <ArrayInput
            tags={arrayToTags(item.allergens)}
            title="Allergens"
            autocomplete
            suggestions={allergens}
          />
          <div className="space-y-2">
            <p className="font-medium">Nutritional Information</p>
            <div className="md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-2">
              <LabelGroup
                title="Calories"
                placeholder="Calorie Count"
                value={nutritionInfoForm["calories"]}
                onChange={(value) =>
                  handleNutritionInfoChange("calories", value)
                }
              />
              <LabelGroup
                title="Protein"
                placeholder="Protein Count"
                value={nutritionInfoForm["protein"]}
                onChange={(value) =>
                  handleNutritionInfoChange("protein", value)
                }
              />
              <LabelGroup
                title="Fat"
                placeholder="Fat Count"
                value={nutritionInfoForm["fat"]}
                onChange={(value) => handleNutritionInfoChange("fat", value)}
              />
              <LabelGroup
                title="Carbs"
                placeholder="Carbs Count"
                value={nutritionInfoForm["carbs"]}
                onChange={(value) => handleNutritionInfoChange("carbs", value)}
              />
              <LabelGroup
                title="Sodium"
                placeholder="Sodium Count"
                value={nutritionInfoForm["sodium"]}
                onChange={(value) => handleNutritionInfoChange("sodium", value)}
              />
              <LabelGroup
                title="Fiber"
                placeholder="Fiber Count"
                value={nutritionInfoForm["fiber"]}
                onChange={(value) => handleNutritionInfoChange("fiber", value)}
              />
              <LabelGroup
                title="Sugar"
                placeholder="Sugar Count"
                value={nutritionInfoForm["sugar"]}
                onChange={(value) => handleNutritionInfoChange("sugar", value)}
              />
              <LabelGroup
                title="Cholesterol"
                placeholder="Cholesterol Count"
                value={nutritionInfoForm["cholesterol"]}
                onChange={(value) =>
                  handleNutritionInfoChange("cholesterol", value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Upload Menu Image</p>
            <Card className="h-[200px] border-2 border-dashed flex items-center justify-center relative bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <Label
                htmlFor="file-upload"
                className="text-gray-600 cursor-pointer"
              >
                {/* {file ? (
                <span>{file.name}</span>
              ) : ( */}
                <div className="text-center flex flex-col items-center gap-3">
                  <Upload className="w-8 h-8" />
                  <span> Drag and drop your menu image here or</span>
                  <span className="text-blue-500 underline">
                    click to browse
                  </span>
                </div>
                {/* )} */}
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                // onChange={handleFileChange}
              />
            </Card>
          </div>
          <LabelGroup
            title="Price Per Person"
            placeholder="How much price per person?"
            number
            value={formState["regularPricePerPax"]}
            onChange={(value) => handleChange("regularPricePerPax", value)}
          />
          <div className="space-y-2">
            <p className="font-medium">Tray Price</p>
            {pax.map(({ minimumPax, maximumPax }) => (
              <TrayPriceCard
                key={maximumPax}
                addMenu
                data={{
                  minimumPax,
                  maximumPax,
                  price: formState["regularPricePerPax"],
                }}
                regularPrice={formState["regularPricePerPax"]}
              />
            ))}
          </div>
        </div>
        <DialogFooter className="pb-6 px-6 max-sm:gap-2">
          <Button className="" variant={"destructive"} asChild>
            <DialogClose>Cancel</DialogClose>
          </Button>
          <Button className="" asChild>
            <DialogClose>Save Changes</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
