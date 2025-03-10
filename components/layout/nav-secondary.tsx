"use client";
import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className="space-y-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                key={item.title}
                className={clsx(
                  "py-5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.url &&
                    "text-sidebar-accent-foreground bg-sidebar-accent"
                )}
              >
                <Link href={item.url ?? "#"}>
                  <item.icon className="min-h-5 min-w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
