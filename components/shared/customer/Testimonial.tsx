import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="flex  flex-wrap justify-center gap-10 my-10 px-[5%]">
      <Image
        src={"/images/person-1.png"}
        width={500}
        height={500}
        alt="Person in Testimonial"
        className="object-cover rounded-lg"
      />
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-3xl font-bold mb-6">Testimonial</h2>
        <div className="mb-6">
          <blockquote className="text-lg italic">
            &qout;The food was absolutely outstanding! Our guests couldn&#39;t
            stop raving about the presentation and flavors. The service team was
            professional and attentive throughout our wedding reception. Highly
            recommend!&qout;
          </blockquote>
          <p className="mt-4 font-semibold">— John Doe</p>
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
