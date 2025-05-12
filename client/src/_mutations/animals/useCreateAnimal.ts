import { Animal } from "@/_schemas/animal.schema";
import { animalsService } from "@/_services/animals.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateAnimal = () => {
  const queryClient = useQueryClient();
  const { create } = animalsService;

  return useMutation({
    mutationFn: (values: Animal) => create(values),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['animals', 'all'] })
    }
  })
}