import { DeleteMenuDialogProps } from "@/app/caterer/caterer-types";
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


export default function DeleteMenuDialog({ currentMenu, isDeleteDialogOpen, setIsDeleteDialogOpen }: DeleteMenuDialogProps) {
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
              <span className="font-medium">{currentMenu.name}</span>. This
              action cannot be undone.
              {currentMenu.inPackages > 0 && (
                <div className="mt-2 text-destructive">
                  Warning: This dish is used in {currentMenu.inPackages} package
                  {currentMenu.inPackages !== 1 ? "s" : ""}.
                </div>
              )}
              {currentMenu.timesOrdered > 0 && (
                <div className="mt-2 text-amber-500">
                  Note: This dish has been ordered {currentMenu.timesOrdered}{" "}
                  time
                  {currentMenu.timesOrdered !== 1 ? "s" : ""}.
                </div>
              )}
            </div>
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
