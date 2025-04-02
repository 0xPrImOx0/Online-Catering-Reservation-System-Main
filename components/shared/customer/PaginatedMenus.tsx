"use client";
import { useEffect, useRef, useState } from "react";
import { CustomerMenuCard } from "./CustomerMenuCard";
import CustomPagination from "../CustomPagination";
import { AllergenProps, MenuItem } from "@/types/menu-types";
import { usePathname } from "next/navigation";
import CatererMenuCard from "../caterer/CatererMenuCard";
import FilterSection from "../FilterSection";
import axios from "axios";

async function fetchMenus(page: number, limit: number) {
  const response = await axios.get("http://localhost:5500/api/menus", {
    params: { page, limit },
  });
  return response.data.data;
}

export default function PaginatedMenus() {
  const [query, setQuery] = useState("");
  const menuListRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    category: "",
    allergens: "" as AllergenProps,
    sortBy: "",
  });
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const menusPerPage = 9;

  useEffect(() => {
    const getMenus = async () => {
      try {
        const menus = await fetchMenus(currentPage, menusPerPage);
        setMenus(menus || []);
      } catch (error) {
        console.error("Failed to fetch menus:", error); // Log any errors
        setMenus([]); // Set empty array if fetch fails
      }
    };
    getMenus();
  }, [currentPage]);

  const filterSelectMenus = menus.filter((menu) => {
    const matchesQuery = menu.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      !filters.category || menu.category.toLowerCase() === filters.category;
    const matchesAllergens =
      !filters.allergens || menu.allergens.includes(filters.allergens);
    return matchesQuery && matchesCategory && matchesAllergens;
  });

  const totalMenus = filterSelectMenus.length;

  // Calculate the menus to display on the current page
  const startIndex = (currentPage - 1) * menusPerPage;
  const endIndex = startIndex + menusPerPage;
  const paginatedMenu = filterSelectMenus.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalMenus / menusPerPage)) {
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
            paginatedMenu.map((menu) => (
              <CatererMenuCard key={menu._id} menu={menu} />
            ))
          ) : (
            paginatedMenu.map((menu) => (
              <CustomerMenuCard key={menu._id} menu={menu} />
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
        totalMenus={totalMenus}
        menusPerPage={menusPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
