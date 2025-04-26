"use client";

import { useState } from "react";
import AddPackageDialog from "@/components/shared/caterer/AddPackageForm";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CateringPackages from "@/components/shared/customer/CateringPackages";
import { useSidebar } from "@/components/ui/sidebar";

export default function PackageManagement() {
  // Simple state for dialog visibility
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const { open } = useSidebar();

  return (
    <main className="max-w-[1400px] mx-auto px-2 sm:px-14 md:px-10">
      <div className="flex items-center justify-between">
        <h1 className="tracking-tight mb-4 text-5xl font-bold">Packages</h1>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className=""
            onClick={() => setIsAddPackageOpen((prev) => !prev)}
          >
            <PlusIcon
              strokeWidth={2.5}
              className="min-w-5 min-h-5 text-muted-foreground"
            />
            Create Package
          </Button>
        </div>
      </div>

      <div className="py-12">
        <CateringPackages isCaterer={true} open={open} />
      </div>

      {/* Add Package Dialog */}
      <AddPackageDialog
        isAddPackageOpen={isAddPackageOpen}
        setIsAddPackageOpen={setIsAddPackageOpen}
      />
    </main>
  );
}
