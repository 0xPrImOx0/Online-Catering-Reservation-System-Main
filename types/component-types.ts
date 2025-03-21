import { Dispatch, SetStateAction } from "react";

//Search Bar Types
export type SearchInputProps = {
  query: string;
  setQuery: (query: string) => void;
  placeholderTitle: string;
};

//Custom Select Types
export type CustomSelectProps = {
  defaultValue: string;
  placeholder: string;
  items: {
    value: string;
    title: string;
  }[];
  size?: "sm" | "md" | "lg";
};

//View Mode Props
export type ViewModeButtonsProps = {
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
};

//  Custom Pagination Types
export type CustomPaginationProps = {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (e: number) => void;
  title?: string;
};
