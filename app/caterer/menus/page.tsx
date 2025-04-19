"use client";

import { useState } from "react";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { AddMenuDialog } from "@/components/shared/caterer/AddMenuForm";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
export default function Page({ open }: { open: boolean }) {
  // State responsible for opening/closing the dialogs for dialog visibility
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const [query, setQuery] = useState("");

  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto overflow-hidden">
      <HeaderWithAddButton
        title="Menu"
        setIsAddInstanceOpen={setIsAddMenuOpen}
      />

      <div className="relative w-full mx-auto overflow-hidden">
        <PaginatedMenus open={open} />
      </div>

      <AddMenuDialog
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
      />
    </main>
  );
}
