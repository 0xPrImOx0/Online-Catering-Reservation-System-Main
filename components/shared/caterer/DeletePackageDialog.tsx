import { DeletePackageDialogProps } from "@/types/package-types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeletePackageDialog({
  item,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: DeletePackageDialogProps) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this dish?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              You are about to delete{" "}
              <span className="font-medium">{item.name}</span>. This
              action cannot be undone.
              {/* {item.inPackages > 0 && (
                <div className="mt-2 text-destructive">
                  Warning: This dish is used in {item.inPackages} package
                  {item.inPackages !== 1 ? "s" : ""}.
                </div>
              )}
              {item.timesOrdered > 0 && (
                <div className="mt-2 text-amber-500">
                  Note: This dish has been ordered {item.timesOrdered}{" "}
                  time
                  {item.timesOrdered !== 1 ? "s" : ""}.
                </div>
              )} */}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button asChild variant={"destructive"} className="border-none">
            <AlertDialogAction onClick={() => setIsDeleteDialogOpen(false)}>
              Delete
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
