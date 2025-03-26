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
  EditPackageDialogProps,
  MenuItem,
  NutritionInfo,
} from "@/types/customer/menu-types";
import ArrayInput from "../ArrayInput";
import { useState } from "react";
import LabelGroup from "../LabelGroup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EditPackageDialog({
  isEditPackageOpen,
  setIsEditPackageOpen,
}: EditPackageDialogProps) {
  const [ingredients, setIngredients] = useState([]);
  const [formState, setFormState] = useState<MenuItem>({
    id: 0,
    name: "",
    category: "Soup",
    available: true,
    shortDescription: "",
    fullDescription: "",
    ingredients: [""],
    allergens: [""],
    preparationMethod: "",
    prices: [
      {
        minimumPax: 4,
        maximumPax: 6,
        price: 0,
      },
      {
        minimumPax: 8,
        maximumPax: 10,
        price: 0,
      },
      {
        minimumPax: 13,
        maximumPax: 15,
        price: 0,
      },
      {
        minimumPax: 18,
        maximumPax: 20,
        price: 0,
      },
    ],
    regularPricePerPax: 0,
    imageUrl: "",
    rating: 0,
    ratingCount: 0,
    spicy: false,
    perServing: "",
    nutritionInfo: {
      calories: "",
      protein: "",
      fat: "",
      carbs: "",
      sodium: "",
      fiber: "",
      sugar: "",
      cholesterol: "",
    },
  });

  const [nutritionInfoForm, setNutritionInfoForm] = useState<NutritionInfo>({
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
    sodium: "",
    fiber: "",
    sugar: "",
    cholesterol: "",
  });

  const discount = 0;

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

  const price = 0;

  return (
    <Dialog open={isEditPackageOpen} onOpenChange={setIsEditPackageOpen}>
      <DialogContent className="max-w-[500px] md:max-w-[600px] bg-background max-h-[90dvh] overflow-y-auto p-0 pb-6">
        <div className="sticky z-10 top-0 bg-background p-6 pb-2 border-b border-border">
          <DialogTitle className="text-2xl text-foreground ">
            Add a New Package
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Please provide the details to add a new package to your restaurant!
          </DialogDescription>
          <DialogClose className="absolute z-10 top-2 right-2 h-8 w-8 rounded-full bg-black/70 dark:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black dark:hover:bg-white/30 transition-colors">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <LabelGroup
            title="Name"
            placeholder="ex. Plated Set A - Basic Feast"
            value={formState["name"]}
            onChange={(value) => handleChange("name", value)}
          />
          <LabelGroup
            title="Description"
            placeholder="Text here..."
            type="textarea"
            value={formState["fullDescription"]}
            onChange={(value) => handleChange("fullDescription", value)}
          />
          <LabelGroup
            title="Event Type"
            placeholder="Text here..."
            type="select"
            value={formState["fullDescription"]}
            onChange={(value) => handleChange("fullDescription", value)}
          />
          <LabelGroup
            title="Price per Person"
            placeholder="0"
            number
            value={formState["category"]}
            onChange={(value) => handleChange("category", value)}
          />
          <div className="flex gap-4">
            <LabelGroup
              title="Minimum Guests"
              placeholder="0"
              number
              value={formState["category"]}
              onChange={(value) => handleChange("category", value)}
            />
            <LabelGroup
              title="Maximum Guests"
              placeholder="0"
              number
              value={formState["category"]}
              onChange={(value) => handleChange("category", value)}
            />
          </div>

          <div className="flex gap-4">
            <LabelGroup
              title="Service Hours"
              required={false}
              placeholder="4"
              number
              value={formState["category"]}
              onChange={(value) => handleChange("category", value)}
            />
            <LabelGroup
              title="Service Charge"
              required={false}
              placeholder="0"
              number
              value={formState["category"]}
              onChange={(value) => handleChange("category", value)}
            />
          </div>

          <ArrayInput tags={ingredients} title="Inclusions" />
          <ArrayInput tags={ingredients} title="Options" />
          <div className="space-y-2">
            <p className="font-medium">Upload Package Image</p>
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
                  <span> Drag and drop your package image here or</span>
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
        </div>
        <DialogFooter className="pb-6 px-6 gap-2">
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
