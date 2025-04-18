"use client";

import { useState } from "react";
import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { AddMenuDialog } from "@/components/shared/caterer/AddMenuForm";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
export default function Page() {
  // State responsible for opening/closing the dialogs for dialog visibility
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const [query, setQuery] = useState("");

  return (
    <main className="space-y-8 px-3 sm:px-6 max-w-[1440px] w-full mx-auto overflow-hidden">
      <HeaderWithAddButton
        title="Menu"
        setIsAddInstanceOpen={setIsAddMenuOpen}
      />

      <div className="relative w-full overflow-hidden">
        <PaginatedMenus />
      </div>

      <AddMenuDialog
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
      />
    </main>
  );
}
