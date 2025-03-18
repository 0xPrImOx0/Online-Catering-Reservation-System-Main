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
import { SidebarIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { NavUser } from "./nav-user";

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

      // Default breadcrumbs for empty path
      if (paths.length === 0) {
        setBreadcrumbs([{ title: "Dashboard" }]);
        return;
      }

      const breadcrumbItems: { title: string; url?: string }[] = [];

      // Map of valid first-level routes
      const validRoutes = [
        "dashboard",
        "menus",
        "packages",
        "reservations",
        "payments",
        "customers",
        "analytics",
      ];

      // Add first level breadcrumb if it's a valid route
      const firstSegment = paths[0];
      if (validRoutes.includes(firstSegment)) {
        const title =
          firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
        breadcrumbItems.push({ title, url: `/${firstSegment}` });
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

  const user = {
      name: "Rey Daug",
      email: "m@example.com",
      avatar: "/daug-avatar.jpg",
  };

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background pr-4">
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
      </div>
      <div className="flex items-center gap-3">
        <NavUser user={user} />
      </div>
    </header>
  );
}
