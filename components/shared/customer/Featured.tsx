import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Featured() {
  return (
    <section className="py-16 px-[2%]">
      <div className="">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Featured Packages
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Select from our most popular catering packages for weddings, corporate
          events, and private parties.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Package 1 */}
          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Wedding package"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Wedding Elegance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Premium three-course meal for up to 100 guests, including
                appetizers, main course options, and dessert table.
              </p>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Details
                </Button>
                <span className="font-bold">$3500.00</span>
              </div>
            </div>
          </div>

          {/* Package 2 */}
          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Corporate package"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Corporate Deluxe</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professional buffet service for business events, including
                setup, service staff, and cleanup.
              </p>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Details
                </Button>
                <span className="font-bold">$1500.00</span>
              </div>
            </div>
          </div>

          {/* Package 3 */}
          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Private party package"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Private Party</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Customizable menu for intimate gatherings, featuring our chef's
                signature dishes and specialty cocktails.
              </p>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Details
                </Button>
                <span className="font-bold">$1200.00</span>
              </div>
            </div>
          </div>

          {/* Package 4 */}
          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Cocktail reception package"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Cocktail Reception</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Elegant hors d'oeuvres and premium drink service, perfect for
                networking events and celebrations.
              </p>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Details
                </Button>
                <span className="font-bold">$950.00</span>
              </div>
            </div>
          </div>

          {/* Package 5 */}
          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Holiday package"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Holiday Special</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Festive menu featuring seasonal ingredients and holiday
                favorites, complete with decorative presentation.
              </p>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Details
                </Button>
                <span className="font-bold">$1800.00</span>
              </div>
            </div>
          </div>

          {/* Package 6 */}
          <div className="bg-background rounded-lg overflow-hidden border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Gourmet buffet package"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Gourmet Buffet</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Extensive selection of our most popular dishes, with options to
                accommodate dietary restrictions.
              </p>
              <div className="flex justify-between items-center">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Details
                </Button>
                <span className="font-bold">$2200.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
