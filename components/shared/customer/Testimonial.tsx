import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ChevronRight } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="flex  flex-wrap justify-center gap-10 my-10 px-[2%]">
      <Skeleton className="min-w-[400px] max-w-[500px] flex-1 h-[550px]" />
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-3xl font-bold mb-6">Testimonial</h2>
        <div className="mb-6">
          <blockquote className="text-lg italic">
            " The food was absolutely outstanding! Our guests couldn't stop
            raving about the presentation and flavors. The service team was
            professional and attentive throughout our wedding reception. Highly
            recommend! "
          </blockquote>
          <p className="mt-4 font-semibold">— Sarah & Michael</p>
        </div>
        <div className="flex">
          <Button size={"landing"}>
            <BookOpen /> Read More
          </Button>
          <Button size={"landing"} variant={"link"}>
            Book Now <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
