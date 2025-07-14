import { EventEntity } from "@/_schemas/events.schema";
import { eventsService } from "@/_services/events.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { create } = eventsService;

  return useMutation({
    mutationFn: (values: EventEntity) => create(values),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['events', 'all'] })
      queryClient.refetchQueries({ queryKey: ['events', 'all'] });
      toast.success(`Création réussie de l'événement`)
    },
  })
}
