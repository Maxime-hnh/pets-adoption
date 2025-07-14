import { eventsService } from '@/_services/events.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { deleteById } = eventsService;

  return useMutation({
    mutationFn: (id: number) => deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', 'all'] });
      toast.success(`Suppression réussie !`)
    },
  });
};