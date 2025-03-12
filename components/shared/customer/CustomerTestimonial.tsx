import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CustomerTestimonial() {
  return (
    <section className="py-16 bg-muted">
      <div className="">
        <h2 className="text-3xl font-bold mb-2 text-center">
          What our clients say
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit
          sed velit id feugiat. Nam hendrerit velit vitae ex feugiat.
        </p>

        <div className="relative">
          <div className="flex overflow-hidden gap-6">
            <div className="min-w-[300px] md:min-w-[400px] bg-background p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex gap-1">
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                </div>
              </div>
              <blockquote className="mb-4">
                "Your positive feedback here. Aute pharetra nostrud tuis,
                consectetur adipiscing elit. Duis sed diam eget mi molestie
                varius. Nam vestibulum diam nec odio elementum, varius lectus
                elit at arcu."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold">Lauren Smith-Miller</p>
              </div>
            </div>

            <div className="min-w-[300px] md:min-w-[400px] bg-background p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex gap-1">
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                  <Star className="h-5 w-5" />
                </div>
              </div>
              <blockquote className="mb-4">
                "Vivamus nec enim and gravida, tristique est sed, hendrerit
                massa. Fusce eu lorem vitae elit hendrerit varius. Ut vestibulum
                diam nec odio elementum, varius lectus elit at arcu."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Client"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold">James Peterson</p>
              </div>
            </div>
          </div>
          {/* <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 rounded-full bg-background shadow flex items-center justify-center">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 rounded-full bg-background shadow flex items-center justify-center">
            <ChevronRight className="h-6 w-6" />
          </button> */}
        </div>
      </div>
    </section>
  );
}
