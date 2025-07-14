import { Animal } from '@/_schemas/animal.schema';
import { animalsService } from '@/_services/animals.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFullUpdateAnimal = () => {
  const queryClient = useQueryClient();
  const { update } = animalsService;

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<Animal> }) =>
      update(id, values),
    onSuccess: (data, { id }) => {
      queryClient.refetchQueries({ queryKey: ['animals', 'all'] });
      toast.success(`Mise à jour réussie de l'animal nommé ${data.name}`);
    },
    onError: (error, { id }, context) => {
      // Roll back to the previous data in case of error
      toast.error(`Une erreur est survenue pendan la modification de l'animal ${id}`)
    }
  });
};