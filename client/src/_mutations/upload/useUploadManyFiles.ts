import { uploadService } from "@/_services/upload.service";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUploadManyFiles = () => {
  const { uploadMany } = uploadService;

  return useMutation({
    mutationFn: (files: File[]) => uploadMany(files),
    onSuccess: () => {
      toast.success("Les images ont bien été téléchargées")
    }
  })
}