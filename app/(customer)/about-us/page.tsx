import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Logo from "@/components/icons/logo";
import FAQ from "@/components/shared/customer/FAQ";

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Kitchen team at work"
            fill
            className="object-cover opacity-10"
          />
          <Logo />
        </div>
        <div className=" relative z-10">
          <PlayCircle className="mx-auto mb-8 h-16 w-16" />
          <h1 className="text-4xl font-bold mb-4">About our company</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Crafting extraordinary culinary experiences with passion, precision,
            and the finest ingredients since 2010.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              Our Services
            </Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-24 bg-gray-50">
        <div className="">
          <h2 className="text-3xl font-bold text-center mb-4">
            The Principles We Stand By
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Our commitment to excellence goes beyond just great food. We believe
            in creating memorable experiences through exceptional service,
            attention to detail, and unwavering dedication to our craft.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">
                    Quality Without Compromise
                  </h3>
                  <p className="text-muted-foreground">
                    We source only the finest ingredients and employ skilled
                    culinary artisans to ensure every dish exceeds expectations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Personalized Service</h3>
                  <p className="text-muted-foreground">
                    Every event is unique, and we take pride in tailoring our
                    services to match your vision perfectly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Sustainable Practices</h3>
                  <p className="text-muted-foreground">
                    We're committed to environmental responsibility through
                    local sourcing and eco-friendly operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Innovation in Cuisine</h3>
                  <p className="text-muted-foreground">
                    Our chefs constantly explore new flavors and techniques
                    while respecting traditional culinary arts.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Chef preparing food"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Catered event setup"
                width={300}
                height={300}
                className="rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="">
          <h2 className="text-3xl font-bold text-center mb-4">
            The People Who Make Up Our Team
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Our success is built on the talent, passion, and dedication of our
            diverse team. From executive chefs to service staff, each member
            brings their unique expertise to create extraordinary experiences.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">12k+</p>
              <p className="text-sm text-muted-foreground">Events Catered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">40%</p>
              <p className="text-sm text-muted-foreground">Annual Growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">5k+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">80%</p>
              <p className="text-sm text-muted-foreground">Repeat Customers</p>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Leadership Team
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Founder & CEO
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  20+ years of culinary excellence and business leadership
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Michael Chen"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h4 className="font-semibold">Michael Chen</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Executive Chef
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Michelin-starred chef with global culinary expertise
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Emily Rodriguez"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h4 className="font-semibold">Emily Rodriguez</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Operations Director
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert in large-scale event management
                </p>
              </div>
            </div>
          </div>

          {/* Culinary Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Culinary Team
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "David Park",
                  title: "Head Chef - Asian Cuisine",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Maria Santos",
                  title: "Head Chef - Mediterranean",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "James Wilson",
                  title: "Pastry Chef",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Aisha Patel",
                  title: "Head Chef - Indian Cuisine",
                  image: "/placeholder.svg?height=150&width=150",
                },
              ].map((chef) => (
                <div key={chef.name} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={chef.image || "/placeholder.svg"}
                      alt={chef.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-semibold">{chef.name}</h4>
                  <p className="text-sm text-muted-foreground">{chef.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Event Coordination Team
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Lisa Thompson",
                  title: "Senior Event Coordinator",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Marcus Brown",
                  title: "Wedding Specialist",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Sophie Kim",
                  title: "Corporate Events Manager",
                  image: "/placeholder.svg?height=150&width=150",
                },
                {
                  name: "Carlos Mendez",
                  title: "Logistics Coordinator",
                  image: "/placeholder.svg?height=150&width=150",
                },
              ].map((coordinator) => (
                <div key={coordinator.name} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={coordinator.image || "/placeholder.svg"}
                      alt={coordinator.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-semibold">{coordinator.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {coordinator.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Team */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">
              Service Team
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                {
                  name: "Ryan Mitchell",
                  title: "Head Server",
                  image: "/placeholder.svg?height=120&width=120",
                },
                {
                  name: "Nina Patel",
                  title: "Senior Server",
                  image: "/placeholder.svg?height=120&width=120",
                },
                {
                  name: "Tom Wilson",
                  title: "Bartender",
                  image: "/placeholder.svg?height=120&width=120",
                },
                {
                  name: "Grace Lee",
                  title: "Service Captain",
                  image: "/placeholder.svg?height=120&width=120",
                },
                {
                  name: "Alex Rivera",
                  title: "Setup Specialist",
                  image: "/placeholder.svg?height=120&width=120",
                },
              ].map((staff) => (
                <div key={staff.name} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <Image
                      src={staff.image || "/placeholder.svg"}
                      alt={staff.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-semibold text-sm">{staff.name}</h4>
                  <p className="text-xs text-muted-foreground">{staff.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </main>
  );
}
