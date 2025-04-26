"use client";

import { ChevronDown, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    icon: LucideIcon;
    isActive?: boolean;
    url?: string;
    children?: {
      title: string;
      icon: LucideIcon;
      url: string;
    }[];
  }[];
}) {
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>(() =>
    items.reduce((acc, item, index) => {
      acc[index] = !!item.isActive; // Set initial state based on item.isActive
      return acc;
    }, {} as { [key: number]: boolean })
  );

  const toggleItem = (index: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="space-y-2">
        {items.map((item, index) => (
          <SidebarMenu key={index}>
            {item.children?.length ? (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => toggleItem(index)}
                    >
                      <span className="font-medium justify-between w-full flex items-center">
                        <div className="flex items-center">
                          <item.icon className="h-6 w-6 mr-2" />
                          <span className="">{item.title}</span>
                        </div>
                        {/* toggle a button */}
                        {selectedItems[index] ? (
                          <span className="transition-transform duration-300 -rotate-180 ease-in-out">
                            <ChevronDown className="size-4" />
                          </span>
                        ) : (
                          <span className="transition-transform duration-300 rotate-0 ease-in-out">
                            <ChevronDown className="size-4" />
                          </span>
                        )}

                        <span className="sr-only">Toggle</span>
                      </span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child, childIndex) => (
                        <SidebarMenuSubItem key={childIndex}>
                          <SidebarMenuSubButton asChild>
                            <Link href={child.url}>
                              <child.icon className="h-4 w-4 mr-0" />
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
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
            )}
          </SidebarMenu>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
