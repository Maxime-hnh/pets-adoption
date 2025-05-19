import { Animal } from "@/_schemas/animal.schema";
import { animalsService } from "@/_services/animals.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateAnimal = () => {
  const queryClient = useQueryClient();
  const { create } = animalsService;

  return useMutation({
    mutationFn: (values: Animal) => create(values),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['animals', 'all'] })
      toast.success(`Création réussie de l'animal nommé ${data.name}`)
    },
  })
}