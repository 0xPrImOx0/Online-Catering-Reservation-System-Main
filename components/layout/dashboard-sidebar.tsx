"use client";

import * as React from "react";
import {
  BarChart,
  Boxes,
  BriefcaseBusiness,
  ChefHat,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  Send,
  User,
  UsersRound,
} from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/icons/logo";
import { Separator } from "../ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/daug-avatar.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    {
      title: "Menus",
      icon: ChefHat,
      children: [],
      url: "/menus",
    },
    {
      title: "Packages",
      icon: Boxes,
      children: [],
      url: "/packages",
    },
    {
      title: "Reservations",
      icon: ClipboardList,
      children: [],
      url: "/reservations",
    },
    {
      title: "Payments",
      icon: HandCoins,
      children: [],
      url: "/payments",
    },
    {
      title: "Customers",
      icon: UsersRound,
      children: [],
      url: "/customers",
    },
    {
      title: "Analytics",
      icon: BarChart,
      children: [],
      url: "/analytics",
    },
  ],
  navSecondary: [
    {
      title: "Account Settings",
      url: "/account-settings",
      icon: User,
    },
    {
      title: "Business Settings",
      url: "/business-settings",
      icon: BriefcaseBusiness,
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo withLabel={true} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Separator />
        <NavMain items={data.navMain} />
        <Separator />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      {/* <SidebarFooter>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
