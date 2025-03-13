import Image from "next/image";
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
import packages from "@/lib/packages";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import PackageCards from "@/components/shared/customer/PackageCards";

export default function Page() {
  return (
    <main className="flex-1">
      <div className=" py-12">
        <h1 className="text-5xl font-bold text-center mb-12">Our Packages</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Select>
            <SelectTrigger className="w-full border-foreground text-foreground sm:w-[200px]">
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

        <div className="flex flex-wrap items-center justify-center gap-10">
          {/* Package Showcase */}
          {packages.map((item, index) => (
            <PackageCards features={item} key={index} />
          ))}
        </div>

        {/* Testimonials */}
        <section className="my-16 py-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Clients Say About Our Food
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted p-6 rounded-lg">
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
            <div className="bg-muted p-6 rounded-lg">
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

        {/* Reserve CTA */}
        <FooterCTA
          title="Ready to Book Your Catering?"
          description="Secure your date and menu selection now to ensure availability for your upcoming event."
          buttonLabel="Book Now"
          href="/book-now"
        />
      </div>
    </main>
  );
}
