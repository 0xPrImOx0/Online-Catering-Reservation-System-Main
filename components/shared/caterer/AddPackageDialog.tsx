import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/format-currency";
import { Badge } from "@/components/ui/badge";
import { AddPackageDialogProps } from "@/app/caterer/caterer-types";

export default function AddPackageDialog({
  availableMenus,
  isAddPackageOpen,
  setIsAddPackageOpen,
  setSelectedMenus,
  selectedMenus,
}: AddPackageDialogProps) {
  return (
    <Dialog open={isAddPackageOpen} onOpenChange={setIsAddPackageOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Package</DialogTitle>
          <DialogDescription>
            Create a new package to offer to your customers. Fill out the
            details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="name" className="mb-2">
                Package Name
              </Label>
              <Input id="name" placeholder="Enter package name" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="eventType" className="mb-2">
                Event Type
              </Label>
              <Select defaultValue="Wedding">
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Birthday">Birthday</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Graduation">Graduation</SelectItem>
                  <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                  <SelectItem value="Special Diet">Special Diet</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter package description"
              rows={3}
            />
          </div>
          <div>
            <Label className="mb-2">Select Menus</Label>
            <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
              {availableMenus.map((menus) => (
                <div
                  key={menus.id}
                  className="flex items-center space-x-2 py-2 border-b last:border-0"
                >
                  <Checkbox
                    id={`menus-${menus.id}`}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMenus([...selectedMenus, menus.id]);
                      } else {
                        setSelectedMenus(
                          selectedMenus.filter((id) => id !== menus.id)
                        );
                      }
                    }}
                  />
                  <div className="flex justify-between items-center w-full">
                    <Label
                      htmlFor={`menus-${menus.id}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {menus.name}
                      {/* <Badge variant="outline" className="ml-2 text-xs">
                        {menus.category}
                      </Badge> */}
                    </Label>
                    <span className="text-sm font-medium">
                      {formatCurrency(menus.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="totalPrice" className="mb-2">
              Total Price ($)
            </Label>
            <Input
              id="totalPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Auto-calculated based on selected menus, but you can adjust the
              final price.
            </p>
          </div>
          <div>
            <Label className="mb-2">Image</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md border overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Package preview"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <Button variant="outline" type="button">
                Upload Image
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddPackageOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddPackageOpen(false)}>
            Save Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
