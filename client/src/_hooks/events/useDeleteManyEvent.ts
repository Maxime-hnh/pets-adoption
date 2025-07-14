import { DeleteManyEntity } from "@/_schemas/common.schema";
import { eventsService } from "@/_services/events.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteManyEvent = () => {
  const queryClient = useQueryClient();
  const { deleteMany } = eventsService;

  return useMutation({
    mutationFn: (values: DeleteManyEntity) => deleteMany(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', 'all'] });
      toast.success(`Suppression réussie !`)
    },
    onError: () => {
      toast.error(`Une erreur est survenue lors de la suppression des événements`)
    }
  })
}