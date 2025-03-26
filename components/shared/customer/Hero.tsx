import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 lg:min-h-[750px]">
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <h1 className="text-3xl font-bold mb-4 lg:text-5xl">
          Experience the very best catering for your special events
        </h1>
        <p className="text-muted-foreground mb-6">
          Gourmet ingredients made by professional chefs, delivered with care to
          your venue.
        </p>
        <Button className="mt-4 max-w-fit" size={"landing"} asChild>
          <Link href={"/book-now"}>
            <ClipboardCheck /> Book Now
          </Link>
        </Button>
      </div>
      <Skeleton className="min-h-[300px] md:min-h-[500px w-full" />
    </section>
  );
}
