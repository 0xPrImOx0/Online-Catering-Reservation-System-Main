import CustomerSiteHeader from "@/components/layout/customer-site-header";
import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CustomerSiteHeader />
      <div className="max-w-[1440px] px-[2%]">{children}</div>
    </div>
  );
}
