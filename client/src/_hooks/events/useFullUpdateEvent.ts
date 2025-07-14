
import { EventEntity } from '@/_schemas/events.schema';
import { eventsService } from '@/_services/events.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFullUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { updateById } = eventsService;

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: EventEntity }) =>
      updateById(id, values),
    onSuccess: (data, { id }) => {
      queryClient.refetchQueries({ queryKey: ['events', 'all'] });
      toast.success(`Mise à jour réussie de l'événement`);
    },
    onError: (error, { id }, context) => {
      // Roll back to the previous data in case of error
      toast.error(`Une erreur est survenue pendan la modification de l'événement ${id}`)
    }
  });
};