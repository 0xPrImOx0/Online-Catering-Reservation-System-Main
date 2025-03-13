import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function MenusPage() {
  return (
    <main className="flex-1">
      <div className=" py-12">
        <h1 className="text-3xl font-bold text-center mb-12">
          Our Catering Menus
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Menu Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Menus</SelectItem>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="cocktail">Cocktail Hour</SelectItem>
              <SelectItem value="dessert">Desserts</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Dietary Options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Options</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              <SelectItem value="dairy-free">Dairy-Free</SelectItem>
              <SelectItem value="nut-free">Nut-Free</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="budget">Budget ($15-25/person)</SelectItem>
              <SelectItem value="standard">Standard ($25-40/person)</SelectItem>
              <SelectItem value="premium">Premium ($40-60/person)</SelectItem>
              <SelectItem value="luxury">Luxury ($60+/person)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Menu */}
        <div className="mb-12 p-4 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-amber-600 hover:bg-amber-700">
              Chef's Special
            </Badge>
            <Badge className="bg-green-600 hover:bg-green-700">Seasonal</Badge>
          </div>
          <h2 className="text-2xl font-bold mb-2">Summer Harvest Feast</h2>
          <p className="text-muted-foreground mb-4">
            Our chef's special seasonal menu featuring the freshest local
            ingredients of summer.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Menu 1 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Elegant Breakfast Buffet"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Breakfast
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Vegetarian Options
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Elegant Breakfast Buffet
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                A delightful morning spread featuring freshly baked pastries,
                seasonal fruit platters, gourmet egg dishes, and premium coffee
                service.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Serves 15-20
                  guests
                </p>
                <p>
                  <span className="font-medium">Package:</span> Morning Delight
                  Package
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$25.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 2 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Executive Lunch"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Lunch
                </Badge>
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600"
                >
                  Gluten-Free Options
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Executive Lunch</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Sophisticated lunch menu featuring gourmet sandwiches, artisanal
                salads, and signature soups. Perfect for corporate meetings and
                business events.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Serves 10-50
                  guests
                </p>
                <p>
                  <span className="font-medium">Package:</span> Corporate Deluxe
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$30.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 3 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Cocktail Reception"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Cocktail Hour
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-600"
                >
                  Premium
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Cocktail Reception</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Elegant passed hors d'oeuvres and stationed appetizers with
                optional premium bar service. Perfect for social gatherings and
                networking events.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> 6-8 pieces per
                  guest
                </p>
                <p>
                  <span className="font-medium">Package:</span> Social Mixer
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$35.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 4 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Gourmet Dinner Service"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Dinner
                </Badge>
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  Signature
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Gourmet Dinner Service</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Three-course plated dinner featuring chef's signature dishes
                with seasonal ingredients. Includes appetizer, entrée with
                sides, and dessert.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Full dinner
                  service
                </p>
                <p>
                  <span className="font-medium">Package:</span> Wedding Elegance
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$55.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 5 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Plant-Based Feast"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Dinner
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Vegan
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Plant-Based Feast</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Innovative vegan menu featuring creative plant-based dishes that
                will impress even non-vegan guests. Includes appetizers, mains,
                and desserts.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Full dinner
                  service
                </p>
                <p>
                  <span className="font-medium">Package:</span> Green Gourmet
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$45.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 6 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Dessert Station"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Dessert
                </Badge>
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600"
                >
                  Gluten-Free Options
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Dessert Station</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Elegant dessert display featuring miniature pastries, chocolate
                fondue, fresh fruit, and custom cakes. Perfect addition to any
                event.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> 3-4 pieces per
                  guest
                </p>
                <p>
                  <span className="font-medium">Package:</span> Sweet Endings
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$15.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 7 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="International Buffet"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Dinner
                </Badge>
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-600"
                >
                  Customizable
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">International Buffet</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Global cuisine featuring stations with dishes from around the
                world. Customizable to include your favorite international
                flavors.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Buffet service
                </p>
                <p>
                  <span className="font-medium">Package:</span> World Tour
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$50.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 8 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Brunch Service"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Brunch
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-600"
                >
                  Premium
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Brunch Service</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Elegant brunch featuring made-to-order omelets, waffle station,
                carving station, and mimosa bar. Perfect for weekend events.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Buffet service
                </p>
                <p>
                  <span className="font-medium">Package:</span> Weekend
                  Celebration
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$40.00/person</span>
              </div>
            </div>
          </div>

          {/* Menu 9 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Kids Menu"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Kids
                </Badge>
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600"
                >
                  Allergy-Friendly
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Kids Menu</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Child-friendly options that are both nutritious and appealing to
                younger guests. Includes allergy-friendly alternatives.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <span className="font-medium">Portion:</span> Child-sized
                  servings
                </p>
                <p>
                  <span className="font-medium">Package:</span> Family
                  Celebration
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
                <span className="font-bold">$20.00/person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Menu Dishes */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Our Signature Dishes
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Explore our most requested and highly praised culinary creations,
            available across various catering packages.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Dish 1 */}
            <div className="group">
              <div className="aspect-square relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Herb-Crusted Salmon"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-600 hover:bg-amber-700">
                    Most Popular
                  </Badge>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Herb-Crusted Salmon</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Wild-caught salmon with a crispy herb crust, served with lemon
                beurre blanc, roasted asparagus, and wild rice pilaf.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Gluten-Free
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Omega-3 Rich
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Featured in:</span> Gourmet Dinner
                Service, Wedding Elegance Package
              </p>
            </div>

            {/* Dish 2 */}
            <div className="group">
              <div className="aspect-square relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Beef Tenderloin"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Beef Tenderloin Medallions
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Perfectly seared beef tenderloin medallions with red wine
                reduction, truffle mashed potatoes, and seasonal vegetables.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-600"
                >
                  Premium
                </Badge>
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  Signature
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Featured in:</span> Gourmet Dinner
                Service, Corporate Deluxe Package
              </p>
            </div>

            {/* Dish 3 */}
            <div className="group">
              <div className="aspect-square relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Vegetable Wellington"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Vegetable Wellington</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Roasted seasonal vegetables and mushroom duxelles wrapped in
                flaky puff pastry, served with herb-infused oil and balsamic
                reduction.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Vegetarian
                </Badge>
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600"
                >
                  Chef's Favorite
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Featured in:</span> Plant-Based
                Feast, Wedding Elegance Package
              </p>
            </div>

            {/* Dish 4 */}
            <div className="group">
              <div className="aspect-square relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Shrimp Ceviche"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Citrus Shrimp Ceviche</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Fresh shrimp marinated in citrus juices with avocado, cucumber,
                red onion, and cilantro, served in individual glasses.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Gluten-Free
                </Badge>
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-600"
                >
                  Appetizer
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Featured in:</span> Cocktail
                Reception, Summer Harvest Feast
              </p>
            </div>

            {/* Dish 5 */}
            <div className="group">
              <div className="aspect-square relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Chocolate Lava Cake"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-600 hover:bg-amber-700">
                    Customer Favorite
                  </Badge>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Chocolate Lava Cake</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Warm chocolate cake with a molten center, served with vanilla
                bean ice cream, fresh berries, and raspberry coulis.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-600"
                >
                  Dessert
                </Badge>
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  Signature
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Featured in:</span> Dessert
                Station, Wedding Elegance Package
              </p>
            </div>

            {/* Dish 6 */}
            <div className="group">
              <div className="aspect-square relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Artisanal Cheese Board"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Artisanal Cheese & Charcuterie
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Selection of premium cheeses, cured meats, seasonal fruits,
                nuts, and artisanal crackers, beautifully arranged on wooden
                boards.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-600"
                >
                  Appetizer
                </Badge>
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600"
                >
                  Customizable
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Featured in:</span> Cocktail
                Reception, Executive Lunch, International Buffet
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline">View Full Menu</Button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="my-16 py-8 px-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Clients Say About Our Food
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-background p-6 rounded-lg">
              <div className="flex gap-1 mb-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <blockquote className="mb-4 italic">
                "The Executive Lunch menu was perfect for our corporate event.
                The presentation was beautiful, and everyone raved about the
                quality of the food. Highly recommend!"
              </blockquote>
              <p className="font-semibold">— Jennifer R., Marketing Director</p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <div className="flex gap-1 mb-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <blockquote className="mb-4 italic">
                "We chose the Gourmet Dinner Service for our wedding, and it
                exceeded all expectations. The chef accommodated our dietary
                restrictions without compromising on flavor or presentation."
              </blockquote>
              <p className="font-semibold">
                — Michael & David, Wedding Clients
              </p>
            </div>
          </div>
        </section>

        {/* Custom Menu Request */}
        <section className="my-16 py-8 px-6 bg-muted rounded-lg grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Need a Custom Menu?</h2>
            <p className="text-muted-foreground mb-6">
              Don't see exactly what you're looking for? Our culinary team can
              create a custom menu tailored to your specific event needs,
              dietary requirements, and flavor preferences.
            </p>
            <p className="text-muted-foreground mb-6">
              From themed events to specialized dietary needs, we'll work with
              you to design the perfect culinary experience for your guests.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800">
              Request Custom Menu
            </Button>
          </div>
          <div className="relative min-h-[200px]">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Chef preparing custom dish"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Reserve CTA */}
        <section className="my-16 py-12 px-8 bg-black text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Book Your Catering?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Secure your date and menu selection now to ensure availability for
            your upcoming event.
          </p>
          <Button className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 h-auto">
            Reserve Now
          </Button>
        </section>
      </div>
    </main>
  );
}
