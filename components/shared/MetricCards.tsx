import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, LucideIcon } from "lucide-react";

type MetricCardProps = {
  metric: {
    title: String;
    firstContent: String;
    secondContent: String;
    Icon: LucideIcon;
  };
};

export default function MetricCards({ metric }: MetricCardProps) {
  const { title, firstContent, secondContent, Icon } = metric;
  return (
    <Card className="">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
          <Icon className="mr-1 h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{firstContent}</div>
        <p className="text-xs text-muted-foreground">{secondContent}</p>
      </CardContent>
    </Card>
  );
}
