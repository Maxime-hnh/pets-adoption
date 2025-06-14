import { uploadService } from "@/_services/upload.service";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUploadManyFiles = () => {
  const { uploadMany } = uploadService;

  return useMutation({
    mutationFn: (files: File[]) => uploadMany(files),
    onSuccess: (files: string[]) => {
      toast.success("Les fichiers ont bien été téléchargées")
      return files
    }
  })
}