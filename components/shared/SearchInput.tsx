import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { SearchInputProps } from "@/types/component-types";

export default function SearchInput({
  query,
  setQuery,
  placeholderTitle,
}: SearchInputProps) {
  return (
    <div className="relative flex-1 md:max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={`Search ${placeholderTitle}`}
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
