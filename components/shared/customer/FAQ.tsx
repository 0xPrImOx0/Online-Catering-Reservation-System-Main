import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

export default function FAQ() {
  const faqs = [
    {
      id: "first-faq",
      title: "What types of events do you cater?",
      content:
        "We cater a wide range of events including weddings, corporate functions, private parties, and special celebrations. Our team has experience in handling both intimate gatherings and large-scale events with hundreds of guests.",
    },
    {
      id: "second-faq",
      title: "How far in advance should we book?",
      content:
        "We recommend booking at least 3-6 months in advance for large events and weddings, and 2-4 weeks for smaller gatherings. However, we also accommodate last-minute requests when possible.",
    },
    {
      id: "third-faq",
      title: "Do you accommodate dietary restrictions?",
      content:
        "Yes, we can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us of any dietary restrictions during the planning phase.",
    },
  ];
  return (
    <section className="flex items-center py-24 justify-between">
      <Skeleton className="min-w-[500px] h-[400px]" />

      <div className="mx-auto min-w-[600px]">
        <h2 className="text-3xl font-bold mb-8">Frequently asked questions</h2>

        <Accordion
          type="single"
          collapsible
          className="max-w-[600px]"
          defaultValue="first-faq"
        >
          {faqs.map((faq) => (
            <AccordionItem value={faq.id} key={faq.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {faq.title}
                  <PlusIcon
                    size={24}
                    strokeWidth={3}
                    className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground pb-2">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
