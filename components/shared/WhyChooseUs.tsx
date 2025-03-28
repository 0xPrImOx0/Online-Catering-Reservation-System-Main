"use client";
import { features } from "@/lib/customer/metadata";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FooterCTA from "./customer/FooterCTA";
import { Phone } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="px-[5%]">
        <div className="text-center mx-auto mb-16">
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
        <FooterCTA
          title="Need more information?"
          description="Contact us today to discuss your event needs and check availability."
          buttonLabel="Contact Us"
          href="/contact-us"
          Icon={Phone}
        />
        {/* <div className="mt-16 text-center">
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
        </div> */}
      </div>
    </section>
  );
}
