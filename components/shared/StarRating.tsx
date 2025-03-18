import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          strokeWidth={1}
          className={`w-5 h-5 ${
            star <= rating ? "fill-yellow-300" : "fill-transparent"
          }`}
        />
      ))}
    </div>
  );
}
