import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ChevronRight } from "lucide-react";

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
        <div className="mt-4 space-x-4">
          <Button className="" size={"landing"}>
            <Calendar /> Book Now
          </Button>
          <Button className="" variant={"link"} size={"landing"}>
            Lorem Ipsum Link <ChevronRight />
          </Button>
        </div>
      </div>
      <Skeleton className="min-h-[300px] md:min-h-[500px w-full" />
    </section>
  );
}

// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Calendar, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section className="relative flex justify-center items-center">
//       <div className="absolute top-0 left-[50%] translate-x-[-50%] w-screen z-0 overflow-hidden">
//         <div className="relative h-[500px] md:h-[600px] lg:h-[80vh] w-full overflow-hidden">
//           <Image
//             src="/banner-2.webp"
//             alt="Catering service"
//             fill
//             className="object-cover brightness-[0.4]"
//             priority
//           />
//         </div>
//       </div>
//       <div className="container relative z-10 py-24 md:py-32 lg:py-56">
//         <div className="flex flex-col items-start gap-4 text-white max-w-2xl">
//           <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-shadow-lg">
//             Exceptional Catering for Your Special Events
//           </h1>
//           <p className="text-lg md:text-xl text-white text-shadow-md">
//             From intimate gatherings to grand celebrations, we provide delicious
//             food and impeccable service for any occasion.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 mt-4">
//             <Button size="lg" asChild>
//               <Link href="/contact">Book Your Event</Link>
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="bg-background/20 hover:bg-background/30 border-white text-white"
//               asChild
//             >
//               <Link href="/packages">Explore Packages</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
