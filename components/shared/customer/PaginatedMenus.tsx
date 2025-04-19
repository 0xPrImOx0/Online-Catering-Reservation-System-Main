"use client";
import { useEffect, useRef, useState } from "react";
import { CustomerMenuCard } from "./CustomerMenuCard";
import type { AllergenProps } from "@/types/menu-types";
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/menu-lists";
import FilterSection from "../MenuFilter/FilterSection";
import CatererMenuCard from "../caterer/CatererMenuCard";
import CustomPagination from "../CustomPagination";

export default function PaginatedMenus({ open }: { open?: boolean }) {
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

  // Add this function before the return statement in PaginatedMenus component
  const sortMenus = (menus: typeof menuItems) => {
    if (!filters.sortBy) return menus;

    return [...menus].sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.regularPricePerPax - b.regularPricePerPax;
        case "price-desc":
          return b.regularPricePerPax - a.regularPricePerPax;
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  // Update the filterSelectMenus variable to apply sorting
  const filterSelectMenus = sortMenus(
    menuItems.filter((menu) => {
      // Match search query
      const matchesQuery = menu.name
        .toLowerCase()
        .includes(query.toLowerCase());

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
    })
  );

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
      <div>
        <FilterSection
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div
        className={`grid ${
          isCaterer && open ? "md:grid-cols-1" : "md:grid-cols-2"
        } xl:grid-cols-3 gap-10`}
      >
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
