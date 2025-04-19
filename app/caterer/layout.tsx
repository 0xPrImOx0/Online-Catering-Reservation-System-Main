"use client";

import { AppSidebar } from "@/components/layout/dashboard-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

type DashBoardLayoutProps = {
  children?: React.ReactNode | ((open: boolean) => React.ReactNode);
};

export default function DashBoardLayout({ children }: DashBoardLayoutProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider
        className="flex flex-col"
        open={open}
        onOpenChange={setOpen}
      >
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="overflow-x-hidden">
            <div className="flex flex-1 flex-col gap-4 py-8 px-[2%]">
              {typeof children === "function" ? children(open) : children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
