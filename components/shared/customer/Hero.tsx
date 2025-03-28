import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 lg:min-h-[750px] mx-[2%]">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 lg:text-5xl">
          Experience the very best catering for your special events
        </h1>
        <p className="text-muted-foreground mb-6">
          Gourmet ingredients made by professional chefs, delivered with care to
          your venue.
        </p>
        <div>
          <Button className="mt-4 max-w-fit" size={"landing"} asChild>
            <Link href={"/book-now"}>
              <Calendar /> Book Now
            </Link>
          </Button>
          <Button
            className="mt-4 max-w-fit"
            size={"landing"}
            variant={"link"}
            asChild
          >
            <Link href={"/contact-us"}>
              <Phone /> Contact Us
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src={"/images/hero.jpg"}
        width={2000}
        height={1333}
        alt="Hero Image"
        className="w-full h-full object-cover transform scale-x-[-1]"
      />
    </section>
  );
}
