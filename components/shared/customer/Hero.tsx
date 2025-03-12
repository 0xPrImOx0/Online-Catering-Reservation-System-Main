import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Experience the very best catering for your special events
        </h1>
        <p className="text-muted-foreground mb-6">
          Gourmet ingredients made by professional chefs, delivered with care to
          your venue.
        </p>
        <div>
          <Button className="bg-black text-white hover:bg-gray-800">
            Book Now
          </Button>
        </div>
      </div>
      <div className="bg-muted relative min-h-[300px] md:min-h-[500px]">
        <Skeleton />
      </div>
    </section>
  );
}
