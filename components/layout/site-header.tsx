"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SearchForm } from "@/components/shared/search-form";
import { SidebarIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { title: string; url?: string }[]
  >([]);

  useEffect(() => {
    // Generate breadcrumbs based on the current path
    const generateBreadcrumbs = () => {
      const paths = pathname.split("/").filter(Boolean);

      if (paths.length === 0) {
        setBreadcrumbs([{ title: "Dashboard" }]);
        return;
      }

      const breadcrumbItems: { title: string; url?: string }[] = [];

      // Always add Dashboard as the first item
      if (paths[0] === "dashboard") {
        breadcrumbItems.push({ title: "Dashboard", url: "/dashboard" });
      }
      if (paths[0] === "menus") {
        breadcrumbItems.push({ title: "Menus", url: "/menus" });
      }
      if (paths[0] === "packages") {
        breadcrumbItems.push({ title: "Packages", url: "/packages" });
      }
      if (paths[0] === "reservations") {
        breadcrumbItems.push({ title: "Reservations", url: "/reservations" });
      }
      if (paths[0] === "payments") {
        breadcrumbItems.push({ title: "Payments", url: "/payments" });
      }
      if (paths[0] === "customers") {
        breadcrumbItems.push({ title: "Customers", url: "/customers" });
      }

      // Add additional breadcrumb items based on the path
      if (paths.length > 1) {
        const section = paths[1];

        // Map path segments to readable titles
        const sectionTitle = section
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        breadcrumbItems.push({ title: sectionTitle });
      }

      setBreadcrumbs(breadcrumbItems);
    };

    generateBreadcrumbs();
  }, [pathname]);

  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.url ? (
                    <BreadcrumbLink href={item.url}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}
