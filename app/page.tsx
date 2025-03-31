import CustomerSiteHeader from "@/components/layout/customer-site-header";
import Hero from "@/components/shared/customer/Hero";
import About from "@/components/shared/customer/About";
import Featured from "@/components/shared/customer/Featured";
import Testimonial from "@/components/shared/customer/Testimonial";
import Footer from "@/components/shared/customer/Footer";
import { UsersGuide } from "@/components/shared/customer/UsersGuide";
import { Metadata } from "next";
import WhyChooseUs from "@/components/shared/WhyChooseUs";

export const metadata: Metadata = {
  title: "Home | Food Sentinel",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <CustomerSiteHeader />
      <main className="flex-1 max-w-[1440px] mx-auto">
        <Hero />
        <About />
        <Featured />
        <UsersGuide />
        <Testimonial />
        <WhyChooseUs />
      </main>

      <Footer />
    </div>
  );
}
