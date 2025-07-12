import { messagesService } from "@/_services/messages.service";
import { useQuery } from "@tanstack/react-query";

export const useMessageQuery = (id: number) => {
  return useQuery({
    queryKey: ['message', id],
    queryFn: () => messagesService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
} 