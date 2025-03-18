import { AddMenuDialogProps } from "@/app/caterer/caterer-types";
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

export default function AddMenuDialog({
  isAddMenuOpen,
  setIsAddMenuOpen,
}: AddMenuDialogProps) {
  return (
    <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Menu</DialogTitle>
          <DialogDescription>
            Create a new dish to add to your menu. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="name" className="mb-2">
                Menu Name
              </Label>
              <Input id="name" placeholder="Enter dish name" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="category" className="mb-2">
                Category
              </Label>
              <Select defaultValue="Main">
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
            <Label htmlFor="price" className="mb-2">
              Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter dish description"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="ingredients" className="mb-2">
              Ingredients
            </Label>
            <Textarea
              id="ingredients"
              placeholder="Enter ingredients (comma separated)"
              rows={2}
            />
          </div>
          <div>
            <Label className="mb-2">Image</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md border overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
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
          <Button variant="outline" onClick={() => setIsAddMenuOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddMenuOpen(false)}>Save Menu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
