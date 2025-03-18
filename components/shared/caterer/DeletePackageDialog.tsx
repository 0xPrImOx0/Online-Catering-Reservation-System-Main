import { DeletePackageDialogProps } from "@/app/caterer/caterer-types";
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

export default function DeletePackageDialog({
  currentPackage,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: DeletePackageDialogProps) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this package?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete{" "}
            <span className="font-medium">{currentPackage.name}</span>. This
            action cannot be undone.
            {currentPackage.numberOfOrders > 0 && (
              <div className="mt-2 text-amber-500">
                Warning: This package has been used in{" "}
                {currentPackage.numberOfOrders} active reservation
                {currentPackage.numberOfOrders !== 1 ? "s" : ""}.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => setIsDeleteDialogOpen(false)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
