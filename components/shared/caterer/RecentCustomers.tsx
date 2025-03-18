import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { avatarFallBack } from "@/utils/avatarFallback";

type RegisteredCustomersProps = {
  registeredCustomers: {
    name: string;
    email: string;
    createdAt: string;
  }[];
};

const CustomerContainer = ({
  customer,
  index,
}: {
  customer: { name: string; email: string; createdAt: string };
  index: number;
}) => {
  const { name, email, createdAt } = customer;
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{avatarFallBack(name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">{createdAt}</div>
      </div>
      {index != 4 && <Separator className="mt-4" />}
    </div>
  );
};

export default function RecentCustomers({
  registeredCustomers,
}: RegisteredCustomersProps) {
  return (
    <div className="mt-4 rounded-md border">
      <div className="p-4">
        <div className="space-y-4">
          {registeredCustomers.map((customer, index) => (
            <CustomerContainer key={index} customer={customer} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
