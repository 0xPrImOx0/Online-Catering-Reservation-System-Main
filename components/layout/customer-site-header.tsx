"use client";
import Link from "next/link";
import Logo from "../icons/logo";
import { useState } from "react";
import { NavUser } from "./nav-user";
import { Button } from "../ui/button";
import { User } from "lucide-react";

export default function CustomerSiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const PageLink = ({ href, title }: { href: string; title: string }) => {
    return (
      <Link href={href} className="text-sm hover:underline underline-offset-4">
        {title}
      </Link>
    );
  };

  return (
    <header className="border-b ">
      <div className="flex mx-[2%] items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Logo imageSize={40} />
          <nav className="hidden md:flex gap-6 flex-1 justify-center">
            <PageLink title="Home" href={"/"} />
            <PageLink title="Packages" href={"/packages"} />
            <PageLink title="Book With Us" href={"/book-now"} />
            <PageLink title="About" href={"/about-us"} />
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
              <Button variant={"outline"}>
                <User /> Register
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
