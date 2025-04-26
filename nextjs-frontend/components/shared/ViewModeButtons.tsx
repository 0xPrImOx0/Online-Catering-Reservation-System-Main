import { Grid, List } from "lucide-react";
import { Button } from "../ui/button";
import { ViewModeButtonsProps } from "@/types/component-types";

export default function ViewModeButtons({
  viewMode,
  setViewMode,
}: ViewModeButtonsProps) {
  return (
    <div className="flex border rounded-md">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="icon"
        className="rounded-r-none"
        onClick={() => setViewMode("grid")}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="icon"
        className="rounded-l-none"
        onClick={() => setViewMode("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
