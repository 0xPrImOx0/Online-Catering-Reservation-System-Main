"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Edit,
  Grid,
  List,
  Plus,
  Search,
  SortAsc,
  Trash2,
  Users,
  DollarSign,
  Clock,
  Package,
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
import { Checkbox } from "@/components/ui/checkbox";
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

// Sample data for packages
const packages = [
  {
    id: 1,
    name: "Wedding Bliss",
    eventType: "Wedding",
    totalPrice: 1200.0,
    description:
      "An elegant wedding feast with premium dishes for your special day.",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 05, 2025",
    numberOfOrders: 15,
    revenueGenerated: 18000.0,
    lastOrdered: "Mar 08, 2025",
    dishes: [
      { id: 1, name: "Grilled Salmon", price: 22.99 },
      { id: 2, name: "Beef Wellington", price: 28.99 },
      { id: 3, name: "Chocolate Mousse", price: 8.99 },
      { id: 4, name: "Champagne Toast", price: 12.5 },
      { id: 5, name: "Caprese Salad", price: 9.99 },
    ],
  },
  {
    id: 2,
    name: "Birthday Bash",
    eventType: "Birthday",
    totalPrice: 450.0,
    description:
      "A fun and festive birthday package with crowd-pleasing favorites.",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Feb 28, 2025",
    numberOfOrders: 28,
    revenueGenerated: 12600.0,
    lastOrdered: "Mar 10, 2025",
    dishes: [
      { id: 6, name: "Gourmet Burgers", price: 15.99 },
      { id: 7, name: "Loaded Nachos", price: 12.99 },
      { id: 8, name: "Birthday Cake", price: 35.0 },
      { id: 9, name: "Fruit Punch", price: 8.99 },
    ],
  },
  {
    id: 3,
    name: "Corporate Lunch",
    eventType: "Corporate",
    totalPrice: 350.0,
    description:
      "Professional catering for business meetings and corporate events.",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 01, 2025",
    numberOfOrders: 42,
    revenueGenerated: 14700.0,
    lastOrdered: "Mar 09, 2025",
    dishes: [
      { id: 10, name: "Sandwich Platter", price: 45.99 },
      { id: 11, name: "Caesar Salad", price: 35.99 },
      { id: 12, name: "Assorted Cookies", price: 25.0 },
      { id: 13, name: "Coffee Service", price: 30.0 },
    ],
  },
  {
    id: 4,
    name: "Vegan Delight",
    eventType: "Special Diet",
    totalPrice: 550.0,
    description:
      "Plant-based menu options for health-conscious and vegan guests.",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 03, 2025",
    numberOfOrders: 8,
    revenueGenerated: 4400.0,
    lastOrdered: "Mar 07, 2025",
    dishes: [
      { id: 14, name: "Quinoa Stuffed Peppers", price: 18.99 },
      { id: 15, name: "Vegan Buddha Bowl", price: 16.99 },
      { id: 16, name: "Avocado Chocolate Mousse", price: 9.99 },
      { id: 17, name: "Fresh Fruit Platter", price: 32.0 },
    ],
  },
  {
    id: 5,
    name: "Graduation Party",
    eventType: "Graduation",
    totalPrice: 650.0,
    description:
      "Celebrate academic achievements with this festive food package.",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Feb 25, 2025",
    numberOfOrders: 12,
    revenueGenerated: 7800.0,
    lastOrdered: "Mar 06, 2025",
    dishes: [
      { id: 18, name: "Finger Sandwiches", price: 40.0 },
      { id: 19, name: "Chicken Wings", price: 45.99 },
      { id: 20, name: "Graduation Cake", price: 55.0 },
      { id: 21, name: "Sparkling Cider", price: 18.99 },
    ],
  },
  {
    id: 6,
    name: "Baby Shower",
    eventType: "Baby Shower",
    totalPrice: 400.0,
    description:
      "Sweet and savory treats perfect for celebrating new arrivals.",
    image: "/placeholder.svg?height=300&width=300",
    lastUpdated: "Mar 02, 2025",
    numberOfOrders: 18,
    revenueGenerated: 7200.0,
    lastOrdered: "Mar 10, 2025",
    dishes: [
      { id: 22, name: "Tea Sandwiches", price: 35.0 },
      { id: 23, name: "Fruit & Cheese Platter", price: 42.99 },
      { id: 24, name: "Cupcake Tower", price: 48.0 },
      { id: 25, name: "Sparkling Lemonade", price: 22.99 },
    ],
  },
];

// Sample data for available dishes (for add/edit package)
const availableDishes = [
  { id: 1, name: "Grilled Salmon", price: 22.99, category: "Main" },
  { id: 2, name: "Beef Wellington", price: 28.99, category: "Main" },
  { id: 3, name: "Chocolate Mousse", price: 8.99, category: "Dessert" },
  { id: 4, name: "Champagne Toast", price: 12.5, category: "Beverage" },
  { id: 5, name: "Caprese Salad", price: 9.99, category: "Appetizer" },
  { id: 6, name: "Gourmet Burgers", price: 15.99, category: "Main" },
  { id: 7, name: "Loaded Nachos", price: 12.99, category: "Appetizer" },
  { id: 8, name: "Birthday Cake", price: 35.0, category: "Dessert" },
  { id: 9, name: "Fruit Punch", price: 8.99, category: "Beverage" },
  { id: 10, name: "Sandwich Platter", price: 45.99, category: "Main" },
  { id: 11, name: "Caesar Salad", price: 35.99, category: "Appetizer" },
  { id: 12, name: "Assorted Cookies", price: 25.0, category: "Dessert" },
  { id: 13, name: "Coffee Service", price: 30.0, category: "Beverage" },
  { id: 14, name: "Quinoa Stuffed Peppers", price: 18.99, category: "Main" },
  { id: 15, name: "Vegan Buddha Bowl", price: 16.99, category: "Main" },
];

export default function PackageManagement() {
  // Simple state for dialog visibility
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPackage, setCurrentPackage] = useState(packages[0]);
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Package Management</h1>
        <div className="ml-auto">
          <Button
            onClick={() => setIsAddPackageOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Package
          </Button>
        </div>
      </div>

      {/* Event Type Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-muted/50 p-1 rounded-full w-full max-w-3xl mx-auto grid grid-cols-6">
          <TabsTrigger value="all" className="rounded-full">
            All
          </TabsTrigger>
          <TabsTrigger value="wedding" className="rounded-full">
            Wedding
          </TabsTrigger>
          <TabsTrigger value="birthday" className="rounded-full">
            Birthday
          </TabsTrigger>
          <TabsTrigger value="corporate" className="rounded-full">
            Corporate
          </TabsTrigger>
          <TabsTrigger value="graduation" className="rounded-full">
            Graduation
          </TabsTrigger>
          <TabsTrigger value="other" className="rounded-full">
            Other
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search packages..." className="pl-10" />
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
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low-High)</SelectItem>
              <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              <SelectItem value="orders-desc">Most Orders</SelectItem>
              <SelectItem value="orders-asc">Least Orders</SelectItem>
              <SelectItem value="revenue-desc">Highest Revenue</SelectItem>
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

      {/* Packages Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                    onClick={() => {
                      setCurrentPackage(pkg);
                      setIsEditPackageOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-destructive"
                    onClick={() => {
                      setCurrentPackage(pkg);
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
                      setCurrentPackage(pkg);
                      setIsDetailsOpen(true);
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <Badge variant="outline" className="bg-muted/50">
                    {pkg.eventType}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {pkg.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="font-bold text-lg">
                      {formatCurrency(pkg.totalPrice)}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="h-4 w-4 mr-1" />
                    {pkg.dishes.length} items
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pkg.numberOfOrders} orders
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {pkg.lastOrdered}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-32 h-32 shrink-0">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.name}
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
                          setCurrentPackage(pkg);
                          setIsDetailsOpen(true);
                        }}
                      >
                        {pkg.name}
                      </h3>
                      <Badge variant="outline" className="bg-muted/50 mt-1">
                        {pkg.eventType}
                      </Badge>
                    </div>
                    <p className="font-bold text-lg">
                      {formatCurrency(pkg.totalPrice)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {pkg.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {pkg.numberOfOrders} orders
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Revenue: {formatCurrency(pkg.revenueGenerated)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentPackage(pkg);
                          setIsEditPackageOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          setCurrentPackage(pkg);
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

      {/* Package Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentPackage.name}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="mt-1">
                {currentPackage.eventType}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-md overflow-hidden border h-48 w-full">
              <Image
                src={currentPackage.image || "/placeholder.svg"}
                alt={currentPackage.name}
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-sm mb-4">{currentPackage.description}</p>

              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Included Dishes
              </h3>
              <div className="border rounded-md divide-y mb-4">
                {currentPackage.dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex justify-between items-center p-2"
                  >
                    <span className="text-sm">{dish.name}</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(dish.price)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-2 bg-muted/20">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">
                    {formatCurrency(currentPackage.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">
                    Number of Orders
                  </h3>
                  <p className="text-lg font-medium">
                    {currentPackage.numberOfOrders}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">
                    Revenue Generated
                  </h3>
                  <p className="text-lg font-medium">
                    {formatCurrency(currentPackage.revenueGenerated)}
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                Last updated: {currentPackage.lastUpdated} | Last ordered:{" "}
                {currentPackage.lastOrdered}
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
                setIsEditPackageOpen(true);
              }}
            >
              Edit Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Package Dialog */}
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
              <Label className="mb-2">Select Dishes</Label>
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                {availableDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex items-center space-x-2 py-2 border-b last:border-0"
                  >
                    <Checkbox
                      id={`dish-${dish.id}`}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDishes([...selectedDishes, dish.id]);
                        } else {
                          setSelectedDishes(
                            selectedDishes.filter((id) => id !== dish.id)
                          );
                        }
                      }}
                    />
                    <div className="flex justify-between items-center w-full">
                      <Label
                        htmlFor={`dish-${dish.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {dish.name}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {dish.category}
                        </Badge>
                      </Label>
                      <span className="text-sm font-medium">
                        {formatCurrency(dish.price)}
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
                Auto-calculated based on selected dishes, but you can adjust the
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
            <Button
              variant="outline"
              onClick={() => setIsAddPackageOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddPackageOpen(false)}>
              Save Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Package Dialog */}
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
              <Label className="mb-2">Select Dishes</Label>
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                {availableDishes.map((dish) => {
                  const isSelected = currentPackage.dishes.some(
                    (d) => d.id === dish.id
                  );
                  return (
                    <div
                      key={dish.id}
                      className="flex items-center space-x-2 py-2 border-b last:border-0"
                    >
                      <Checkbox
                        id={`edit-dish-${dish.id}`}
                        defaultChecked={isSelected}
                      />
                      <div className="flex justify-between items-center w-full">
                        <Label
                          htmlFor={`edit-dish-${dish.id}`}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {dish.name}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {dish.category}
                          </Badge>
                        </Label>
                        <span className="text-sm font-medium">
                          {formatCurrency(dish.price)}
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
                Auto-calculated based on selected dishes, but you can adjust the
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
            <Button
              variant="outline"
              onClick={() => setIsEditPackageOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditPackageOpen(false)}>
              Update Package
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
              Are you sure you want to delete this package?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete{" "}
              <span className="font-medium">{currentPackage.name}</span>. This
              action cannot be undone.
              {currentPackage.numberOfOrders > 0 && (
                <div className="mt-2 text-amber-500">
                  Warning: This package has been used in{" "}
                  {currentPackage.numberOfOrders} active reservation
                  {currentPackage.numberOfOrders !== 1 ? "s" : ""}.
                </div>
              )}
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
    </div>
  );
}
