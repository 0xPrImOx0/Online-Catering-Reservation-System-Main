"use client";
import { useRef, useState } from "react";
import { MenuCard } from "../MenuCard";
import CustomPagination from "../CustomPagination";
import { MenuItem, PaginatedMenuProps } from "@/types/menu-types";

export default function PaginatedMenus({ items }: PaginatedMenuProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalItems = items.length;
  const menuListRef = useRef<HTMLDivElement>(null);

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMenu = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(newPage);
      menuListRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        ref={menuListRef}
      >
        {/* Package Showcase */}
        {paginatedMenu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
      <CustomPagination
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
