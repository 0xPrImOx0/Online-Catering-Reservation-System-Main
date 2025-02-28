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

type UserType = "customer" | "caterer";

export function Header({ userType }: { userType: UserType }) {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const title = path.charAt(0).toUpperCase() + path.slice(1);
      return { href, title };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex h-16 items-center border-b bg-background px-6">
      <SidebarTrigger />
      <Breadcrumb className="ml-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={
                userType === "customer" ? "/dashboard" : "/caterer-dashboard"
              }
            >
              Home
            </BreadcrumbLink>
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
      <div className="ml-auto flex items-center gap-4">
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
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
