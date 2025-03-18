import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { SearchInputProps } from "@/types/component-types";
import clsx from "clsx";

export default function SearchInput({
  query,
  setQuery,
  reservation = false,
}: SearchInputProps) {
  return (
    <div className={clsx("relative flex-1", reservation && "md:max-w-sm")}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search reservations..."
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
