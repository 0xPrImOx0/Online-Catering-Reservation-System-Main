import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ClipboardCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 min-h-[85vh]">
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <h1 className="text-5xl font-bold mb-4 ">
          Experience the very best catering for your special events
        </h1>
        <p className="text-muted-foreground mb-6">
          Gourmet ingredients made by professional chefs, delivered with care to
          your venue.
        </p>
        <div className="mt-4 space-x-4">
          <Button className="" size={"landing"}>
            <ClipboardCheck /> Book Now
          </Button>
          <Button className="" variant={"link"} size={"landing"}>
            Lorem Ipsum Link <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="bg-muted relative min-h-[300px] md:min-h-[500px]">
        <Skeleton />
      </div>
    </section>
  );
}
