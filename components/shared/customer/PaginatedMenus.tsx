"use client";
import { useRef, useState } from "react";
import { CustomerMenuCard } from "./CustomerMenuCard";
import CustomPagination from "../CustomPagination";
import { AllergenProps, PaginatedMenuProps } from "@/types/menu-types";
import { usePathname } from "next/navigation";
import CatererMenuCard from "../caterer/CatererMenuCard";
import FilterSection from "../FilterSection";

export default function PaginatedMenus({ items }: PaginatedMenuProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    allergens: "" as AllergenProps,
    sortBy: "",
  });

  const filterSelectMenus = items.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      !filters.category || item.category.toLowerCase() === filters.category;
    const matchesAllergens =
      !filters.allergens || item.allergens.includes(filters.allergens);
    return matchesQuery && matchesCategory && matchesAllergens;
  });
  const itemsPerPage = 9;
  const totalItems = filterSelectMenus.length;
  const menuListRef = useRef<HTMLDivElement>(null);

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMenu = filterSelectMenus.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(newPage);
      menuListRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pathname = usePathname();
  const isCaterer = pathname.includes("/caterer");
  return (
    <div>
      <div className="absolute top-0" ref={menuListRef} />
      <FilterSection
        query={query}
        setQuery={setQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {/* MenuLists */}

        {paginatedMenu.length > 0 ? (
          isCaterer ? (
            paginatedMenu.map((item) => (
              <CatererMenuCard key={item.id} item={item} />
            ))
          ) : (
            paginatedMenu.map((item) => (
              <CustomerMenuCard key={item.id} item={item} />
            ))
          )
        ) : (
          <div className="col-span-3 min-h-[50vh] flex justify-center items-center">
            <span className="font-bold text-4xl">No Menu Found</span>{" "}
          </div>
        )}
      </div>
      <CustomPagination
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
