import { DeleteManyEntity } from "@/_schemas/common.schema";
import { messagesService } from "@/_services/messages.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteManyMessage = () => {
  const queryClient = useQueryClient();
  const { deleteMany } = messagesService;

  return useMutation({
    mutationFn: (values: DeleteManyEntity) => deleteMany(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', 'all'] });
      toast.success(`Suppression réussie !`)
    },
    onError: () => {
      toast.error(`Une erreur est survenue lors de la suppression des messages`)
    }
  })
}