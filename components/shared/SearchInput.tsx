import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

interface SearchInput {
  query: string;
  setQuery: (query: string) => void;
}

export default function SearchInput({ query, setQuery }: SearchInput) {
  return (
    <div className="relative flex-1 md:max-w-sm">
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
