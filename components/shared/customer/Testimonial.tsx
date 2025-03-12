import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="py-16  grid md:grid-cols-2 gap-8">
      <div className="bg-muted relative min-h-[300px]">
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Catering event"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
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
        <Button className="bg-black text-white hover:bg-gray-800 w-fit">
          Read More Reviews
        </Button>
      </div>
    </section>
  );
}
