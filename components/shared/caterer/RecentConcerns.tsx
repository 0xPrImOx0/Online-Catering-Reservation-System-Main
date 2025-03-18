import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { avatarFallBack } from "@/utils/avatar-fallback";

type RecentConcernProps = {
  concerns: {
    name: string;
    time: string;
    concern: string;
  }[];
};

const ConcernContainer = ({
  concernInstance,
  index,
}: {
  concernInstance: { name: string; time: string; concern: string };
  index: number;
}) => {
  const { name, time, concern } = concernInstance;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{avatarFallBack(name)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{name}</div>
        </div>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
          {time}
        </Badge>
      </div>
      <p className="mt-2 text-sm">{concern}</p>
      {index != 3 && <Separator className="mt-4" />}
    </div>
  );
};

export default function RecentConcerns({ concerns }: RecentConcernProps) {
  return (
    <div className="mt-4 rounded-md border">
      <div className="p-4">
        <div className="space-y-4">
          {concerns.map((concern, index) => (
            <ConcernContainer
              concernInstance={concern}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
