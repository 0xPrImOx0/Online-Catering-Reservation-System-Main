import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import CustomerPackageCard from "./CustomerPackageCard";
import { cateringPackages } from "@/lib/customer/packages-metadata";

export default function Featured() {
  const featuredPackages = cateringPackages.filter(
    (pkg) => pkg.packageType === "BuffetPlated"
  );
  return (
    <section className="px-[5%] mt-24 flex flex-col items-center gap-14">
      <div className="">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Featured Packages
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Select from our most popular catering packages for weddings, corporate
          events, and private parties.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Package Showcase */}
          {featuredPackages.map((pkg, index) => (
            <CustomerPackageCard item={pkg} key={index} />
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
