"use client";

import * as React from "react";
import {
  Boxes,
  ChefHat,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  Send,
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
  ],
  navSecondary: [
    {
      title: "About Us",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
