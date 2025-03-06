"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Search, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ThemeToggle } from "./thememode-regular";

type UserType = "customer" | "caterer";

export function Header({ userType }: { userType: UserType }) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      let title = path.charAt(0).toUpperCase() + path.slice(1);

      // Check if the last segment is "order-type"
      if (index === paths.length - 1 && path.includes("-")) {
        title = path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      const href = `/${paths.slice(0, index + 1).join("/")}`;
      return { href, title };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 bg-sidebar dark:bg-sidebar shadow flex items-center pl-2">
      <SidebarTrigger />
      <Breadcrumb className="ml-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={"/dashboard"}>Food Cipher</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-4 mr-4">
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ThemeToggle />
        {userType === "customer" && (
          <Button variant="outline" size="sm" className="hidden md:flex">
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Order
          </Button>
        )}
      </div>
    </header>
  );
}
