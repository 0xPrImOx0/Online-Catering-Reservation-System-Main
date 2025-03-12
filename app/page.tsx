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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <CustomerSiteHeader />
      <main className="flex-1">
        <Hero />

        {/* About Section */}
        <About />

        {/* Featured Packages */}
        <Featured />

        {/* Testimonial CTA */}
        <Testimonial />

        {/* Customer Testimonials */}
        <CustomerTestimonial />

        {/* Contact/Information Section */}
        <section className="py-16 ">
          <div className="bg-muted p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Need more information?
              </h2>
              <p className="text-muted-foreground">
                Contact us today to discuss your event needs and check
                availability.
              </p>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 min-w-[100px]">
              Contact
            </Button>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 ">
          <h2 className="text-3xl font-bold mb-2 text-center">Latest blog</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Blog Post 1 */}
            <div className="group">
              <div className="aspect-video relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Blog post"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                10 Tips for Planning Your Wedding Menu
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Expert advice on creating a memorable dining experience for your
                special day.
              </p>
              <Link
                href="#"
                className="text-sm font-medium underline underline-offset-4"
              >
                Read more
              </Link>
            </div>

            {/* Blog Post 2 */}
            <div className="group">
              <div className="aspect-video relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Blog post"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Seasonal Ingredients: Summer Edition
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Discover the fresh flavors we're incorporating into our summer
                catering menus.
              </p>
              <Link
                href="#"
                className="text-sm font-medium underline underline-offset-4"
              >
                Read more
              </Link>
            </div>

            {/* Blog Post 3 */}
            <div className="group">
              <div className="aspect-video relative bg-muted overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Blog post"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Corporate Event Catering Trends
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                The latest innovations in business event catering that will
                impress your clients.
              </p>
              <Link
                href="#"
                className="text-sm font-medium underline underline-offset-4"
              >
                Read more
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline">View All Posts</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Menu Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Event Planning
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Weddings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Corporate
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Private Events
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Special Occasions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new menus and special offers.
            </p>
            <div className="space-y-2">
              <Input type="email" placeholder="Email" />
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className=" mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2023 GourmetCater. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
