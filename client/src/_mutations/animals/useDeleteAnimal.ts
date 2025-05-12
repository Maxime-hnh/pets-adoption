import { animalsService } from '@/_services/animals.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAnimal = () => {
  const queryClient = useQueryClient();
  const { deleteById } = animalsService;

  return useMutation({
    mutationFn: (id: number) => deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};