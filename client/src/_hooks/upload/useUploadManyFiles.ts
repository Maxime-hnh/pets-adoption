import { uploadService } from "@/_services/upload.service";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUploadManyFiles = (folder: string) => {
  const { uploadMany } = uploadService;

  return useMutation({
    mutationFn: (files: File[]) => uploadMany(files, folder),
    onSuccess: (files: string[]) => {
      toast.success("Les fichiers ont bien été téléchargées")
      return files
    }
  })
}