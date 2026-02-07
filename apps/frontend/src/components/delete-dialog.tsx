import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useBeingDeleted } from "@/store/delete-dialog-store";

export const DeleteDialog = () => {
  const beingDeleted = useBeingDeleted((state) => state.beingDeleted);
  const setBeingDeleted = useBeingDeleted((state) => state.setBeingDeleted);

  return (
    <>
      <AlertDialog
        open={!!beingDeleted}
        onOpenChange={() => setBeingDeleted(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="text-destructive bg-destructive/10">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda ingin menghapus guru "
              <strong>{beingDeleted?.name}</strong>" ini ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Batal</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
