import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
type featureProps = {
  features: {
    image: string;
    alt: string;
    categories: string[];
    title: string;
    description: string;
    portion: string;
    price: number;
  };
};

export default function FeaturedCards({ features }: featureProps) {
  const { image, alt, categories, title, description, portion, price } =
    features;
  return (
    <Card className="border  rounded-lg overflow-hidden max-w-[400px] min-h-[520px]">
      <div className="aspect-video relative bg-muted">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      <div className="p-8 flex flex-col justify-between">
        <div className="flex gap-2 mb-3">
          {categories.map((category) => (
            <Badge variant="outline" key={category} className=" border-black">
              {category}
            </Badge>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 h-[7ch]">
            {description}
          </p>
        </div>
        <span className="text-sm text-muted-foreground mb-4 font-medium">
          Portion: {portion}
        </span>
        <div className="flex justify-between items-center gap-4">
          <Button size={"landing"}>View Details</Button>
          <span className="font-bold flex-1">${price}.00/person</span>
        </div>
      </div>
    </Card>
  );
}
