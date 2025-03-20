import { Badge } from "@/components/ui/badge";
import {
  getCategoryBadgeColor,
  getCategoryIcon,
} from "@/lib/menu-category-badges";
import { CategoryBadgeProps } from "@/types/customer/menu-types";

export function CategoryBadge({
  category,
  size = "medium",
}: CategoryBadgeProps) {
  const colorClasses = getCategoryBadgeColor(category);
  const IconComponent = getCategoryIcon(category);
  const iconSize = size === "small" ? "h-3 w-3" : "h-4 w-4";

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 ${colorClasses}`}
    >
      <IconComponent className={iconSize} />
      {category}
    </Badge>
  );
}
