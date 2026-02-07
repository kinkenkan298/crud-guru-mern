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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteDialog = () => {
  const beingDeleted = useBeingDeleted((state) => state.beingDeleted);
  const setBeingDeleted = useBeingDeleted((state) => state.setBeingDeleted);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["deleteTeacher"],
    mutationFn: async () => {
      if (!beingDeleted?.nip) return;
      const resp = await fetch(
        `http://localhost:3001/v1/teachers/${beingDeleted.nip}`,
        {
          method: "DELETE",
        },
      );
      const data = await resp.json();

      if (!resp.ok) {
        toast.error(data.message);
      }
      setBeingDeleted(null);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });

      toast.success("Guru berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteTeacher = () => {
    if (!beingDeleted?.nip) return;
    deleteMutation.mutate();
  };

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
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteTeacher}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
