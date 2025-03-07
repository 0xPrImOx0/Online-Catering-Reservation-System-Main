"use client";

import ThemeMode from "@/components/ThemeMode";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  ThemeMode: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route
  const isMobile = useIsMobile(); // Get the mobile state
  return (
    <>
      <div
        className={`absolute top-5 z-10 ${
          isMobile
            ? "left-1/2 -translate-x-1/2"
            : pathname === "/register"
            ? "right-5"
            : "left-5"
        }`}
      >
        <ThemeMode />
      </div>
      {children}
    </>
  );
}
