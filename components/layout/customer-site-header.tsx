"use client";
import Link from "next/link";
import Logo from "../icons/logo";
import { useState } from "react";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function CustomerSiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const PageLink = ({ href, title }: { href: string; title: string }) => {
    return (
      <Link
        href={href}
        className={clsx(
          "text-sm hover:underline underline-offset-4",
          pathname === href && "underline"
        )}
      >
        {title}
      </Link>
    );
  };

  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Packages",
      href: "/packages",
    },
    {
      title: "Menus",
      href: "/menus",
    },
    {
      title: "Book Now",
      href: "/book-now",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
    {
      title: "Contact Us",
      href: "/contact-us",
    },
  ];

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex mx-[2%] items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Logo imageSize={40} />
          <nav className="hidden md:flex gap-6 flex-1 justify-center">
            {links.map((link) => (
              <PageLink key={link.title} title={link.title} href={link.href} />
            ))}
          </nav>
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/cart"
                className="text-sm hover:underline underline-offset-4"
              >
                Cart
              </Link>
              <Link
                href="/account"
                className="text-sm hover:underline underline-offset-4"
              >
                Account
              </Link>
              <button className="size-10 flex items-center justify-center">
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </>
          ) : (
            <Link href={"/register"}>
              <Button variant={"ghost"}>
                <User /> Register
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
