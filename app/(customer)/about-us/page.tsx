"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Logo from "@/components/icons/logo";
import FAQ from "@/components/shared/customer/FAQ";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { features, principles, teams } from "../../../lib/customer/metadata";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Us",
// };

export default function AboutPage() {
  const { leadership, culinary, event, service } = teams;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className=" relative z-10">
          <Logo imageSize={200} withTitle={false} />
          <h1 className="text-4xl font-bold mb-4">Food Sentinel</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Crafting extraordinary culinary experiences with passion, precision,
            and the finest ingredients since 2002.
          </p>
          <div className="flex justify-center gap-4">
            <Button size={"landing"}>Our Services</Button>
            <Button variant="outline" size={"landing"} asChild>
              <Link href={"/contact-us"}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-24 max-w-[1200px] mx-auto">
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
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="aspect-square w-[300px]" />
              <Skeleton className="aspect-square w-[300px]" />
            </div>
            <div className="space-y-8">
              {principles.map(({ title, content }) => (
                <div className="flex gap-4" key={title}>
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{content}</p>
                  </div>
                </div>
              ))}
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
              {leadership.map(({ name, title, description }) => (
                <div className="text-center" key={name}>
                  <Skeleton className="w-48 h-48 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{title}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Culinary Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Culinary Team
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {culinary.map(({ name, title }) => (
                <div key={name} className="text-center">
                  <Skeleton className="w-32 h-32 mx-auto rounded-full mb-4" />
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground">{title}</p>
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
              {event.map(({ name, title }) => (
                <div key={name} className="text-center">
                  <Skeleton className="relative w-32 h-32 mx-auto rounded-full mb-4" />
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground">{title}</p>
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
              {service.map(({ name, title }) => (
                <div key={name} className="text-center">
                  <Skeleton className="relative w-24 h-24 mx-auto mb-3 rounded-full" />
                  <h4 className="font-semibold text-sm">{name}</h4>
                  <p className="text-xs text-muted-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Why Choose Food Sentinel
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience catering excellence that sets us apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "group relative flex flex-col p-6 rounded-xl transition-all duration-300",
                  "bg-background border border-border hover:border-primary/20",
                  "hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.1)]"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full mb-5 transition-all duration-300",
                    "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  )}
                >
                  <feature.icon className={"size-6"} />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-colors"
              >
                Book Your Event Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
