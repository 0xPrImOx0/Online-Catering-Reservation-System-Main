import { Button } from "@/components/ui/button";
import PackageCards from "./PackageCards";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { featuredPackages } from "@/lib/homepage-metadata";

export default function Featured() {

  return (
    <section className="py-16 md:px-[2%] flex flex-col items-center gap-14">
      <div className="">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Featured Packages
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Select from our most popular catering packages for weddings, corporate
          events, and private parties.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10">
          {/* Package Showcase */}
          {featuredPackages.map((feature, index) => (
            <PackageCards features={feature} key={index} />
          ))}
        </div>
      </div>
      <Button size={"landing"} variant={"outline"} asChild>
        <Link href={"/packages"}>
          View More Packages <ChevronRight />
        </Link>
      </Button>
    </section>
  );
}
