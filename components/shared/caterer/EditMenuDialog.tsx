import { EditMenuDialogProps } from "@/app/caterer/caterer-types";
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
import Image from "next/image";

export default function EditMenuDialog({
  currentMenu,
  isEditMenuOpen,
  setIsEditMenuOpen,
}: EditMenuDialogProps) {
  return (
    <Dialog open={isEditMenuOpen} onOpenChange={setIsEditMenuOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update the details of your dish.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="edit-name" className="mb-2">
                Menu Name
              </Label>
              <Input id="edit-name" defaultValue={currentMenu.name} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="edit-category" className="mb-2">
                Category
              </Label>
              <Select defaultValue={currentMenu.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appetizer">Appetizer</SelectItem>
                  <SelectItem value="Main">Main</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                  <SelectItem value="Beverage">Beverage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-price" className="mb-2">
              Price ($)
            </Label>
            <Input
              id="edit-price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={currentMenu.price}
            />
          </div>
          <div>
            <Label htmlFor="edit-description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="edit-description"
              defaultValue={currentMenu.description}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="edit-ingredients" className="mb-2">
              Ingredients
            </Label>
            <Textarea
              id="edit-ingredients"
              defaultValue={currentMenu.ingredients}
              rows={2}
            />
          </div>
          <div>
            <Label className="mb-2">Image</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md border overflow-hidden">
                <Image
                  src={currentMenu.image || "/placeholder.svg"}
                  alt="Menu preview"
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
          <Button variant="outline" onClick={() => setIsEditMenuOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditMenuOpen(false)}>Update Menu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
