import { Button } from "@/components/ui/button";
import Link from "next/link";

type FooterCTAProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export default function FooterCTA({
  title,
  description,
  buttonLabel,
  href,
}: FooterCTAProps) {
  return (
    <section className="my-24 px-[2%]">
      <div className="bg-foreground rounded-lg px-[2%] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl text-background font-extrabold mb-3">
            {title}
          </h2>
          <p className="text-background">{description}</p>
        </div>
        <Button variant={"outline"} size={"landing"} asChild>
          <Link href={href}>{buttonLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
