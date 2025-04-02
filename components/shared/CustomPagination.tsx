import { CustomPaginationProps } from "@/types/component-types";
import { Button } from "../ui/button";
import clsx from "clsx";

export default function CustomPagination({
  startIndex,
  endIndex,
  currentPage,
  totalMenus,
  menusPerPage,
  onPageChange,
  title = "menus",
}: CustomPaginationProps) {
  const totalPages = Math.ceil(totalMenus / menusPerPage);
  return (
    <div className="flex justify-between menus-center mt-4">
      <p className="">
        Showing{" "}
        <span className="font-bold">{`${
          startIndex === 0 ? "1" : startIndex
        } - ${endIndex > totalMenus ? totalMenus : endIndex}`}</span>{" "}
        out of <span className="font-bold">{totalMenus}</span> {title}
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
