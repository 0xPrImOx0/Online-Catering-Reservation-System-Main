import { StarSize } from "@/types/customer/menu-types";
import { Star } from "lucide-react";

export function renderPreciseStars(rating: number, size: StarSize = "small") {
  const starSize =
    size === "small" ? "w-4 h-4" : size === "medium" ? "w-5 h-5" : "w-6 h-6";
  const gap =
    size === "small" ? "gap-0.5" : size === "medium" ? "gap-1" : "gap-1.5";

  return (
    <div className={`flex items-center ${gap}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        // Full star
        if (star <= Math.floor(rating)) {
          return (
            <Star
              key={star}
              className={`${starSize} fill-amber-400 text-amber-400`}
            />
          );
        }

        // Partial star
        if (star === Math.ceil(rating) && !Number.isInteger(rating)) {
          const percent = (rating % 1) * 100;
          return (
            <div key={star} className={`relative ${starSize}`}>
              <Star
                className={`absolute ${starSize} fill-gray-200 text-gray-200`}
              />
              <div
                className="absolute overflow-hidden"
                style={{ width: `${percent}%` }}
              >
                <Star className={`${starSize} fill-amber-400 text-amber-400`} />
              </div>
            </div>
          );
        }

        // Empty star
        return (
          <Star
            key={star}
            className={`${starSize} fill-gray-200 text-gray-200`}
          />
        );
      })}
    </div>
  );
}
