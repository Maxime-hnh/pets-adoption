import { uploadService } from "@/_services/upload.service"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteFile = () => {
  const { deleteFile } = uploadService;
  return useMutation({
    mutationFn: (fileName: string) => deleteFile(fileName),
    onSuccess: () => {
      toast.success("Le fichier a été supprimé avec succès.")
    },
    onError: () => {
      toast.error("La suppression a échoué, veuillez réessayer.")
    }
  })
}