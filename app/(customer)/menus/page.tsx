import { ClipboardCheck, Star } from "lucide-react";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menus",
};

export default async function Page() {
  return (
    <main className="max-w-[1400px] mx-auto px-2 sm:px-14 md:px-10">
      <div className="py-12">
        <div className="space-y-4 mb-10">
          <h1 className="text-5xl font-bold">Our Menus</h1>
          <p className="text-muted-foreground">
            Check out our dishes available for your needs!
          </p>
        </div>{" "}
        <PaginatedMenus />
        {/* Testimonials */}
        <section className="my-16 py-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Clients Say About Our Food
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex gap-1 mb-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <blockquote className="mb-4 italic">
                &quot;The Executive Lunch menu was perfect for our corporate
                event. The presentation was beautiful, and everyone raved about
                the quality of the food. Highly recommend!&quot;
              </blockquote>
              <p className="font-semibold">— Jennifer R., Marketing Director</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex gap-1 mb-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <blockquote className="mb-4 italic">
                &quot;We chose the Gourmet Dinner Service for our wedding, and
                it exceeded all expectations. The chef accommodated our dietary
                restrictions without compromising on flavor or
                presentation.&quot;
              </blockquote>
              <p className="font-semibold">
                — Michael & David, Wedding Clients
              </p>
            </div>
          </div>
        </section>
        {/* Reserve CTA */}
        <FooterCTA
          title="Ready to Book Your Catering?"
          description="Secure your date and menu selection now to ensure availability for your upcoming event."
          buttonLabel="Book Now"
          href="/book-now"
          Icon={ClipboardCheck}
          px={false}
        />
      </div>
    </main>
  );
}
