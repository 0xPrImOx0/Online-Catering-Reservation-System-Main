import { Dispatch, SetStateAction } from "react";
import { MenuItem } from "./menu-types";
import { SetStateBoolean } from "./global-types";
import { CateringPackageProps } from "./package-types";

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

//ArrayInputProps

export type Tag = {
  id: string;
  text: string;
};
export interface TagInputProps {
  id?: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  placeholder?: string;
  styleClasses?: {
    tagList?: { container?: string };
    input?: string;
    tag?: { body?: string; closeButton?: string };
  };
  activeTagIndex?: number | null;
  setActiveTagIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  inlineTags?: boolean;
  inputFieldPosition?: "top" | "bottom";
  enableAutocomplete?: boolean;
  restrictTagsToAutocompleteOptions?: boolean;
}

export type ArrayInputProps = {
  tags: Tag[];
  title: string;
  autocomplete?: boolean;
  suggestions?: Tag[];
};

export interface ImageDialogProps {
  item: MenuItem | CateringPackageProps;
  isImageDialogOpen: boolean;
  setIsImageDialogOpen: SetStateBoolean;
}
