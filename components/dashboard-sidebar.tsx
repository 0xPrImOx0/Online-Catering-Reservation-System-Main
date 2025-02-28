import {
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  Heart,
  Home,
  MessageSquare,
  Package,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  Utensils,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="w-64 border-r my-16">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-14 items-center px-4">
          <ShoppingBag className="mr-2 h-6 w-6" />
          <span className="font-semibold">Gourmet Catering</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((item, index) => (
          <SidebarMenu key={index}>
            {item.children ? (
              <>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <span className="font-semibold justify-between w-full flex items-center">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 mr-2" />
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
                                <child.icon className="h-4 w-4 mr-2" />
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
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
