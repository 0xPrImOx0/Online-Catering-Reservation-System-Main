"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
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
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.title}</span>
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
                <SidebarMenuButton asChild>
                  <Link href={item.url ?? "#"} className="font-medium">
                    <item.icon className="h-4 w-4 mr-0" />
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
