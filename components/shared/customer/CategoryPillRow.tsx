"use client";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/menu-select";
import React, { useState } from "react";

export default function CategoryPillRow() {
  const [filter, setFilter] = useState("All");
  const displayCategories = ["All", ...categories];
  return (
    <div className="flex overflow-x-auto gap-3 pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {displayCategories.map((category, index) => (
        <Button
          key={index}
          className="text-sm font-normal flex-1 px-5 py-1"
          size={"custom"}
          onClick={() => setFilter(category)}
          variant={category === filter ? "default" : "secondary"}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
