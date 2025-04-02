import { DeleteMenuDialogProps } from "@/types/menu-types";
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

export default function DeleteMenuDialog({
  menu,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: DeleteMenuDialogProps) {
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
              <span className="font-medium">{menu.name}</span>. This action
              cannot be undone.
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
