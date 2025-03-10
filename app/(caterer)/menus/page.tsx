"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Edit,
  Grid,
  List,
  Plus,
  PlusIcon,
  Search,
  SortAsc,
  Star,
  ThumbsUp,
  Trash2,
} from "lucide-react";

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample data for the menu items
const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken with Herbs",
    category: "Main",
    price: 15.99,
    description:
      "Tender chicken breast marinated with fresh herbs and grilled to perfection.",
    ingredients: "Chicken breast, rosemary, thyme, olive oil, garlic",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 07, 2025",
    timesOrdered: 24,
    inPackages: 3,
    rating: 4,
    likes: 12500,
  },
  {
    id: 2,
    name: "Caprese Salad",
    category: "Appetizer",
    price: 8.99,
    description:
      "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.",
    ingredients: "Mozzarella, tomatoes, basil, balsamic glaze, olive oil",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 05, 2025",
    timesOrdered: 18,
    inPackages: 2,
    rating: 5,
    likes: 12500,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    category: "Dessert",
    price: 7.5,
    description: "Rich and creamy chocolate mousse topped with whipped cream.",
    ingredients: "Dark chocolate, heavy cream, eggs, sugar, vanilla extract",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Feb 28, 2025",
    timesOrdered: 32,
    inPackages: 4,
    rating: 4,
    likes: 12500,
  },
  {
    id: 4,
    name: "Vegetable Risotto",
    category: "Main",
    price: 13.99,
    description:
      "Creamy arborio rice cooked with seasonal vegetables and parmesan cheese.",
    ingredients:
      "Arborio rice, vegetable stock, parmesan, asparagus, mushrooms",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 02, 2025",
    timesOrdered: 15,
    inPackages: 2,
    rating: 3,
    likes: 12500,
  },
  {
    id: 5,
    name: "Shrimp Cocktail",
    category: "Appetizer",
    price: 12.5,
    description: "Chilled jumbo shrimp served with zesty cocktail sauce.",
    ingredients: "Jumbo shrimp, cocktail sauce, lemon, parsley",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 01, 2025",
    timesOrdered: 22,
    inPackages: 3,
    rating: 5,
    likes: 12500,
  },
  {
    id: 6,
    name: "Tiramisu",
    category: "Dessert",
    price: 8.99,
    description:
      "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    ingredients: "Ladyfingers, mascarpone, coffee, cocoa powder, eggs",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Feb 25, 2025",
    timesOrdered: 28,
    inPackages: 3,
    rating: 4,
    likes: 12500,
  },
];

export default function MenuManagement() {
  // Simple state for dialog visibility
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentDish, setCurrentDish] = useState(menuItems[0]);

  // Render star rating
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Menus</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PlusIcon className="h-4 w-4" />
            Add A New Menu
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-muted/50 p-1 rounded-full w-full max-w-3xl mx-auto grid grid-cols-5">
          <TabsTrigger value="all" className="rounded-full">
            All
          </TabsTrigger>
          <TabsTrigger value="appetizer" className="rounded-full">
            Appetizers
          </TabsTrigger>
          <TabsTrigger value="main" className="rounded-full">
            Mains
          </TabsTrigger>
          <TabsTrigger value="dessert" className="rounded-full">
            Desserts
          </TabsTrigger>
          <TabsTrigger value="beverage" className="rounded-full">
            Beverages
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search dishes..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <SortAsc className="mr-2 h-4 w-4" />
                <span>Sort By</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low-High)</SelectItem>
              <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              <SelectItem value="ordered-desc">Most Ordered</SelectItem>
              <SelectItem value="ordered-asc">Least Ordered</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover bg-input"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                    onClick={() => {
                      setCurrentDish(item);
                      setIsEditDishOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-destructive"
                    onClick={() => {
                      setCurrentDish(item);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="font-bold text-lg cursor-pointer hover:text-primary"
                    onClick={() => {
                      setCurrentDish(item);
                      setIsDetailsOpen(true);
                    }}
                  >
                    {item.name}
                  </h3>
                  <Badge variant="outline" className="bg-muted/50">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                  <div className="text-xs text-muted-foreground">
                    {item.timesOrdered} orders
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {renderStarRating(item.rating)}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {(item.likes / 1000).toFixed(1)}k
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-32 h-32 shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className="font-bold text-lg cursor-pointer hover:text-primary"
                        onClick={() => {
                          setCurrentDish(item);
                          setIsDetailsOpen(true);
                        }}
                      >
                        {item.name}
                      </h3>
                      <Badge variant="outline" className="bg-muted/50 mt-1">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="font-bold text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {renderStarRating(item.rating)}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {(item.likes / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentDish(item);
                          setIsEditDishOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          setCurrentDish(item);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dish Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentDish.name}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="mt-1">
                {currentDish.category}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-md overflow-hidden border h-60 w-full">
              <Image
                src={currentDish.image || "/placeholder.svg"}
                alt={currentDish.name}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-sm mb-4">{currentDish.description}</p>

              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Ingredients
              </h3>
              <p className="text-sm mb-4">{currentDish.ingredients}</p>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">
                    Price
                  </h3>
                  <p className="text-lg font-medium">
                    ${currentDish.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">
                    Times Ordered
                  </h3>
                  <p className="text-lg font-medium">
                    {currentDish.timesOrdered}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">
                    In Packages
                  </h3>
                  <p className="text-lg font-medium">
                    {currentDish.inPackages}
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                Last updated: {currentDish.lastUpdated}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsDetailsOpen(false);
                setIsEditDishOpen(true);
              }}
            >
              Edit Dish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dish Dialog */}
      <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Dish</DialogTitle>
            <DialogDescription>
              Create a new dish to add to your menu. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="name" className="mb-2">
                  Dish Name
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
                    alt="Dish preview"
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
            <Button variant="outline" onClick={() => setIsAddDishOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDishOpen(false)}>Save Dish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dish Dialog */}
      <Dialog open={isEditDishOpen} onOpenChange={setIsEditDishOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Dish</DialogTitle>
            <DialogDescription>
              Update the details of your dish.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="edit-name" className="mb-2">
                  Dish Name
                </Label>
                <Input id="edit-name" defaultValue={currentDish.name} />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Label htmlFor="edit-category" className="mb-2">
                  Category
                </Label>
                <Select defaultValue={currentDish.category}>
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
                defaultValue={currentDish.price}
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="mb-2">
                Description
              </Label>
              <Textarea
                id="edit-description"
                defaultValue={currentDish.description}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-ingredients" className="mb-2">
                Ingredients
              </Label>
              <Textarea
                id="edit-ingredients"
                defaultValue={currentDish.ingredients}
                rows={2}
              />
            </div>
            <div>
              <Label className="mb-2">Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md border overflow-hidden">
                  <Image
                    src={currentDish.image || "/placeholder.svg"}
                    alt="Dish preview"
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
            <Button variant="outline" onClick={() => setIsEditDishOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDishOpen(false)}>
              Update Dish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this dish?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                You are about to delete{" "}
                <span className="font-medium">{currentDish.name}</span>. This
                action cannot be undone.
                {currentDish.inPackages > 0 && (
                  <div className="mt-2 text-destructive">
                    Warning: This dish is used in {currentDish.inPackages}{" "}
                    package
                    {currentDish.inPackages !== 1 ? "s" : ""}.
                  </div>
                )}
                {currentDish.timesOrdered > 0 && (
                  <div className="mt-2 text-amber-500">
                    Note: This dish has been ordered {currentDish.timesOrdered}{" "}
                    time
                    {currentDish.timesOrdered !== 1 ? "s" : ""}.
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
