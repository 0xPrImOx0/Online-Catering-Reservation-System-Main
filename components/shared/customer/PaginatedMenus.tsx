"use client";
import { useEffect, useRef, useState } from "react";
import { CustomerMenuCard } from "./CustomerMenuCard";
import type { AllergenProps } from "@/types/menu-types";
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/menu-lists";
import api from "@/lib/axiosInstance";
import FilterSection from "./NewFilterSection";
import CatererMenuCard from "../caterer/CatererMenuCard";
import CustomPagination from "../CustomPagination";

async function fetchMenus(page: number, limit: number) {
  const response = await api.get("/menus", {
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
    excludedAllergens: [] as AllergenProps[],
    minPrice: 0,
    maxPrice: 500,
    available: false,
    spicy: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const menusPerPage = 9;

  const filterSelectMenus = menuItems.filter((menu) => {
    // Match search query
    const matchesQuery = menu.name.toLowerCase().includes(query.toLowerCase());

    // Match category - case insensitive comparison
    const matchesCategory =
      !filters.category ||
      menu.category.toLowerCase() === filters.category.toLowerCase();

    // Match allergens
    const matchesAllergens =
      !filters.allergens || menu.allergens.includes(filters.allergens);

    // Exclude selected allergens
    const noExcludedAllergens =
      filters.excludedAllergens.length === 0 ||
      !menu.allergens.some((allergen) =>
        filters.excludedAllergens.includes(allergen as AllergenProps)
      );

    // Match price range
    const matchesPrice =
      menu.regularPricePerPax >= filters.minPrice &&
      menu.regularPricePerPax <= filters.maxPrice;

    // Match availability
    const matchesAvailability = !filters.available || menu.available;

    // Match spicy
    const matchesSpicy = !filters.spicy || menu.spicy;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesAllergens &&
      noExcludedAllergens &&
      matchesPrice &&
      matchesAvailability &&
      matchesSpicy
    );
  });

  const totalMenus = filterSelectMenus.length;

  // Calculate the menus to display on the current page
  const startIndex = (currentPage - 1) * menusPerPage;
  const endIndex = startIndex + menusPerPage;
  const paginatedMenu = filterSelectMenus.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, query]);

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
