import { Animal } from '@/_schemas/animal.schema';
import { animalsService } from '@/_services/animals.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdateAnimal = () => {
  const queryClient = useQueryClient();
  const { update } = animalsService;

  return useMutation({
    onMutate: async ({ id, values }) => {
      await queryClient.cancelQueries({ queryKey: ['animals', 'all'] });
      const backupData = queryClient.getQueryData<Animal[]>(['animals', 'all']);
      queryClient.setQueryData<Animal[]>(['animals', 'all'], (old = []) =>
        old.map(animal =>
          animal.id === id
            ? { ...animal, ...values }
            : animal
        )
      );
      return { backupData };
    },
    mutationFn: ({ id, values }: { id: number; values: Partial<Animal> }) =>
      update(id, values),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['animals', "all"] });
      toast.success(`Mise à jour réussie de l'animal nommé ${data.name}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['animals', 'all'] });
    },
    onError: (error, { id }, context) => {
      queryClient.setQueryData(['animals', 'all'], context?.backupData);
    },
  });
};