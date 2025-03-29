import CustomerSiteHeader from "@/components/layout/customer-site-header";
import Hero from "@/components/shared/customer/Hero";
import About from "@/components/shared/customer/About";
import Featured from "@/components/shared/customer/Featured";
import Testimonial from "@/components/shared/customer/Testimonial";
import Footer from "@/components/shared/customer/Footer";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import { Phone } from "lucide-react";
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
      <main className="flex-1">
        <Hero />
        <About />
        <Featured />
        <UsersGuide />
        <Testimonial />
        <WhyChooseUs />
        {/* <FooterCTA
          title="Need more information?"
          description="Contact us today to discuss your event needs and check availability."
          buttonLabel="Contact Us"
          href="/contact-us"
          Icon={Phone}
          px
        /> */}
      </main>

      <Footer />
    </div>
  );
}
