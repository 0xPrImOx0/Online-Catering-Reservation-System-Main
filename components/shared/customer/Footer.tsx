import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { links } from "@/lib/customer-links";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FooterLinks = ({ href, title }: { href: string; title: string }) => {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {title}
      </Link>
    </li>
  );
};

export default function Page() {
  return (
    <footer className="border-t bg-muted/50 flex justify-center w-full">
      <div className="container mx-4 sm:mx-6 lg:mx-8 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 lg:gap-12">
          <div className="space-y-4 flex flex-col items-center md:items-start text-center sm:text-left lg:w-[280px]">
            <Logo withLabel imageSize={100} />
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-justify">
              Exceptional catering services for all your special events.
            </p>
          </div>
          <div className="sm:mt-0 flex flex-col items-center md:items-start text-center md:text-left lg:ml-20 xl:ml-10">
            <h3 className="text-base font-medium mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm grid-cols-2">
              {links.map(({ href, title }) => (
                <FooterLinks href={href} title={title} key={href} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start text-center sm:text-left">
            <h3 className="text-base font-medium mb-3 sm:mb-4">Contact</h3>
            <ul className="flex flex-col items-center space-y-3 text-sm text-center md:justify-start md:text-left">
              <li className="flex items-center gap-2 text-muted-foreground sm:text-left md:self-start">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>

              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <Link
                  href="https://maps.app.goo.gl/oYzycccNHh6eZVZ86"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-wrap text-justify"
                >
                  Claro M. Recto Avenue, Lapasan 9000{" "}
                  <span className="block md:inline">
                    Cagayan de Oro City, Philippines
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start text-center sm:text-left xl:w-[300px]">
            <h3 className="text-base font-medium mb-3 sm:mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4 text-justify">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="flex flex-col xl:flex-row space-y-2 w-[400px] sm:max-w-[450px] md:w-full">
              <Input
                placeholder="Your email"
                className="text-sm h-10 xl:mt-2"
              />
              <Button
                type="submit"
                size="default"
                className="text-sm h-10 xl:ml-2"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Food Sentinel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
