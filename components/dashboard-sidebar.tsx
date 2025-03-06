import {
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  FileText,
  Heart,
  Home,
  MessageSquare,
  Package,
  Search,
  Settings,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  User2,
  Utensils,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Account Management",
    icon: User,
    children: [
      { title: "Profile", icon: User, href: "/dashboard/profile" },
      {
        title: "Payment Information",
        icon: CreditCard,
        href: "/dashboard/payment",
      },
      {
        title: "Order History",
        icon: FileText,
        href: "/dashboard/order-history",
      },
      { title: "Favorites", icon: Heart, href: "/dashboard/favorites" },
    ],
  },
  {
    title: "Menu & Ordering",
    icon: Utensils,
    children: [
      { title: "Browse Menu", icon: Search, href: "/dashboard/menu" },
      {
        title: "Place Order",
        icon: ShoppingCart,
        href: "/dashboard/place-order",
      },
      {
        title: "Catering Packages",
        icon: Package,
        href: "/dashboard/packages",
      },
      {
        title: "Quotations & Pricing",
        icon: FileText,
        href: "/dashboard/quotations",
      },
    ],
  },
  {
    title: "Order Management",
    icon: ShoppingBag,
    children: [
      { title: "Track Orders", icon: Clock, href: "/dashboard/track-orders" },
      {
        title: "Feedback & Reviews",
        icon: MessageSquare,
        href: "/dashboard/feedback",
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    children: [
      {
        title: "Order History Analytics",
        icon: Calendar,
        href: "/dashboard/order-analytics",
      },
      {
        title: "Favorites Analytics",
        icon: Star,
        href: "/dashboard/favorites-analytics",
      },
      { title: "Budget Overview", icon: BarChart3, href: "/dashboard/budget" },
    ],
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="w-64 border-r mt-16 pb-10 h-screen overflow-y-auto overflow-x-hidden dark:bg-sidebar dark:border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border ">
        <div className="flex h-14 items-center px-0">
          <Image
            src="/catering-logo.svg"
            width={60}
            height={60}
            alt="Catering-Logo"
          />
          <div className="flex flex-col ml-1">
            <span className="font-semibold">FoodSentinel</span>
            <p className="font-light italic text-xs text-muted-foreground">
              Catering Reservation System
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center">
              <span className="font-semibold">Main</span>
              <div className="border-b border-[bg-sidebar]" />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {sidebarItems.map((item, index) => (
              <SidebarMenu key={index}>
                {item.children ? (
                  <>
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton asChild>
                            <span className="font-medium justify-between w-full flex items-center">
                              <div className="flex items-center">
                                <item.icon className="h-4 w-4 mr-4" />
                                {item.title}
                              </div>
                              <ChevronDown />
                            </span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child, childIndex) => (
                              <SidebarMenuSubItem key={childIndex}>
                                <SidebarMenuButton asChild>
                                  <Link href={child.href}>
                                    <child.icon className="h-4 w-4 mr-0" />
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="font-medium">
                        <item.icon className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border pt-4 pb-10 flex flex-row items-center ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-6 w-6" /> Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
