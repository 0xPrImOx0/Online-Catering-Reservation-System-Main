import { Button } from "../ui/button";

type PaginationProps = {
  length: number;
  title: string;
};
export default function CustomPagination({ length, title }: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <strong>1</strong> to <strong>10</strong> of{" "}
        <strong>{length}</strong> <span>{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
