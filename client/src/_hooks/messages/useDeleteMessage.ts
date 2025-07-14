import { messagesService } from "@/_services/messages.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { deleteById } = messagesService;

  return useMutation({
    mutationFn: (id: number) => deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', 'all'] });
      toast.success(`Suppression réussie !`)
    },
    onError: () => {
      toast.error(`Une erreur est survenue lors de la suppression du message`)
    }
  })
} 