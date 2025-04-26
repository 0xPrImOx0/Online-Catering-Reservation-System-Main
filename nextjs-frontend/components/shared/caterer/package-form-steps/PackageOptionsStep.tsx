"use client";

import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { usePackageForm } from "@/hooks/use-package-form";
import { PackageCategory } from "@/types/package-types";

interface PackageOptionsStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export function PackageOptionsStep({ formHook }: PackageOptionsStepProps) {
  const {
    form,
    newOption,
    setNewOption,
    addPackageOption,
    removePackageOption,
    validationAttempted,
    availableCategories,
  } = formHook;

  return (
    <div className="space-y-6">
      {availableCategories.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-medium">Add Menu Items</h3>
            <p className="text-sm text-muted-foreground">
              Define how many items from each category are included in this
              package
            </p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newOption.category || availableCategories[1]} // Ensure default selection
                    onValueChange={(value) =>
                      setNewOption({
                        ...newOption,
                        category: value as PackageCategory,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="count">Count</Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    value={newOption.count}
                    onChange={(e) =>
                      setNewOption({
                        ...newOption,
                        count: Number.parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={addPackageOption}
                className="w-full"
                disabled={availableCategories.length === 0}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Option
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {form.watch("options")?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-base font-medium">Current Package Options</h3>
          <div className="space-y-2">
            {form.watch("options").map((option, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted py-2 px-4">
                  <CardTitle className="text-sm font-medium flex justify-between">
                    <span>{option.category}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => removePackageOption(index)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm">
                    <span>Number of items:</span>
                    <span className="font-medium">{option.count}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {validationAttempted && form.formState.errors.options && (
        <p className="text-sm font-medium text-destructive">
          {form.formState.errors.options.message}
        </p>
      )}
    </div>
  );
}
