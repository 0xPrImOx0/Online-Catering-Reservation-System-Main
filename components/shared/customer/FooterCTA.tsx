import { Button } from "@/components/ui/button";

type FooterCTAProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function FooterCTA({
  title = "Need more information?",
  description = "Contact us today to discuss your event needs and check availability.",
  buttonLabel = "Contact Us",
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
        <Button variant={"outline"} size={"landing"}>
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
