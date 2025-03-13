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
import FooterCTA from "@/components/shared/customer/FooterCTA";

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
        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}
