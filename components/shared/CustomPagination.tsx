import { CustomPaginationProps } from "@/types/component-types";
import { Button } from "../ui/button";
import clsx from "clsx";

export default function CustomPagination({
  startIndex,
  endIndex,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  title = "menus",
}: CustomPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="">
        Showing{" "}
        <span className="font-bold">{`${
          startIndex === 0 ? "1" : startIndex
        } - ${endIndex > totalItems ? totalItems : endIndex}`}</span>{" "}
        out of <span className="font-bold">{totalItems}</span> {title}
      </p>
      <div className="space-x-2 flex">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx({ "cursor-pointer": currentPage === 1 })}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
