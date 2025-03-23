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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/utils/format-currency";
import { EditPackageDialogProps } from "@/types/caterer/caterer-types";
//

export default function EditPackageDialog({
  currentPackage,
  isEditPackageOpen,
  setIsEditPackageOpen,
  availableMenus,
}: EditPackageDialogProps) {
  return (
    <Dialog open={isEditPackageOpen} onOpenChange={setIsEditPackageOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
          <DialogDescription>
            Update the details of your package.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="edit-name" className="mb-2">
                Package Name
              </Label>
              <Input id="edit-name" defaultValue={currentPackage.name} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="edit-eventType" className="mb-2">
                Event Type
              </Label>
              <Select defaultValue={currentPackage.eventType}>
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
            <Label htmlFor="edit-description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="edit-description"
              defaultValue={currentPackage.description}
              rows={3}
            />
          </div>
          <div>
            <Label className="mb-2">Select Menus</Label>
            <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
              {availableMenus.map((menus) => {
                const isSelected = currentPackage.menus.some(
                  (d) => d.id === menus.id
                );
                return (
                  <div
                    key={menus.id}
                    className="flex items-center space-x-2 py-2 border-b last:border-0"
                  >
                    <Checkbox
                      id={`edit-menus-${menus.id}`}
                      defaultChecked={isSelected}
                    />
                    <div className="flex justify-between items-center w-full">
                      <Label
                        htmlFor={`edit-menus-${menus.id}`}
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
                );
              })}
            </div>
          </div>
          <div>
            <Label htmlFor="edit-totalPrice" className="mb-2">
              Total Price ($)
            </Label>
            <Input
              id="edit-totalPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={currentPackage.totalPrice}
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
                  src={currentPackage.image || "/placeholder.svg"}
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
          <Button variant="outline" onClick={() => setIsEditPackageOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditPackageOpen(false)}>
            Update Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
