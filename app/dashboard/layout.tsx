"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/thememode-regular";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <div className="fixed top-0 left-0 z-50 w-full h-16 bg-sidebar dark:bg-sidebar shadow flex items-center pl-2">
          <SidebarTrigger />
          <p>sdawdwad</p>
          <ThemeToggle />
        </div>
        <DashboardSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </>
  );
}
