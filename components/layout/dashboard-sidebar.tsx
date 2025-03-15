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
      url: "/caterer/dashboard",
    },
    {
      title: "Menus",
      icon: ChefHat,
      children: [],
      url: "/caterer/menus",
    },
    {
      title: "Packages",
      icon: Boxes,
      children: [],
      url: "/caterer/packages",
    },
    {
      title: "Reservations",
      icon: ClipboardList,
      children: [],
      url: "/caterer/reservations",
    },
    {
      title: "Payments",
      icon: HandCoins,
      children: [],
      url: "/caterer/payments",
    },
    {
      title: "Customers",
      icon: UsersRound,
      children: [],
      url: "/caterer/customers",
    },
    {
      title: "Analytics",
      icon: BarChart,
      children: [],
      url: "/caterer/analytics",
    },
  ],
  navSecondary: [
    {
      title: "Account Settings",
      url: "/caterer/account-settings",
      icon: User,
    },
    {
      title: "Business Settings",
      url: "/caterer/business-settings",
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
