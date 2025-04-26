import {
  BarChart,
  Boxes,
  BriefcaseBusiness,
  ChefHat,
  ClipboardList,
  HandCoins,
  LayoutDashboard,
  Settings,
  User,
  UsersRound,
} from "lucide-react";

export const data = {
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
      title: "Settings",
      url: "/caterer/settings",
      icon: Settings,
    },
  ],
};
