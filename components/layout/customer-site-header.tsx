"use client";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "../icons/logo";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Calendar, Menu, User } from "lucide-react";
import { links } from "@/lib/customer/customer-links";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthContext } from "@/contexts/AuthContext";
import CustomerNavUser from "../shared/customer/CustomerNavUser";

export default function CustomerSiteHeader() {
  const { customer } = useAuthContext();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [mobileMenu, setMobileMenu] = useState(false);

  const PageLink = ({ href, title }: { href: string; title: string }) => {
    return (
      <Link
        href={href}
        onClick={() => setMobileMenu(false)}
        className={cn(
          "text-sm font-medium relative pb-1 hover:text-foreground underline-offset-4 group",
          { "!text-base": isMobile }
        )}
      >
        {title}
        {!isMobile && (
          <span
            className={cn(
              "absolute left-0 bottom-0 h-[2px] bg-foreground transition-all duration-300 ease-in-out",
              pathname === href ? "w-full" : "w-0 group-hover:w-full"
            )}
          />
        )}
      </Link>
    );
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex mx-[5%] items-center justify-between">
        <div
          className={cn("relative flex flex-1 items-center gap-4 ", {
            "py-4": isMobile,
          })}
        >
          {isMobile && (
            <Button
              className=""
              onClick={() => setMobileMenu((prev) => !prev)}
              variant={"link"}
              size={"custom"}
            >
              <Menu className="min-w-6 min-h-6" />
            </Button>
          )}
          {!isMobile && <Logo imageSize={40} />}
          <nav
            className={cn(
              "flex gap-10 flex-1 justify-center",
              customer ? "max-nav-md:hidden" : "max-lg:hidden"
            )}
          >
            {links.map((link) => (
              <PageLink key={link.title} title={link.title} href={link.href} />
            ))}
          </nav>
        </div>
        <div className="flex gap-4">
          {customer ? (
            <CustomerNavUser customer={customer} />
          ) : (
            <div className="space-x-4">
              <Link className="max-sm:hidden" href={"/sign-in"}>
                <Button variant={"link"} effect={"hoverUnderline"}>
                  <User /> Sign In
                </Button>
              </Link>
              <Button asChild>
                <Link href="/book-now">
                  <Calendar /> Book Now
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      {mobileMenu && (
        <div className="flex flex-col absolute left-0 right-0 border-grid z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-col gap-2 p-[5%] pt-0">
            <Logo withLabel />
            {links.map((link) => (
              <PageLink key={link.title} title={link.title} href={link.href} />
            ))}
            <Link className="font-medium" href={"/sign-in"}>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
