import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomerSiteHeader from "@/components/layout/customer-site-header";
import Hero from "@/components/shared/customer/Hero";
import About from "@/components/shared/customer/About";
import Featured from "@/components/shared/customer/Featured";
import Testimonial from "@/components/shared/customer/Testimonial";
import CustomerTestimonial from "@/components/shared/customer/CustomerTestimonial";
import Footer from "@/components/shared/customer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <CustomerSiteHeader />
      <main className="flex-1 max-w-[1440px]">
        <Hero />
        <About />
        <Featured />
        <Testimonial />
        <section className="my-24 px-[2%]">
          <div className="bg-foreground rounded-lg px-[2%] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl text-background font-extrabold mb-3">
                Need more information?
              </h2>
              <p className="text-background">
                Contact us today to discuss your event needs and check
                availability.
              </p>
            </div>
            <Button variant={"outline"} size={"landing"}>
              Contact Us
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
