import { QueryClient } from "@tanstack/react-query";
import { useAllAnimalsQuery } from "./useAnimalsQuery";

export const prefetchAnimalsQuery = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: ['animals', 'all'],
    queryFn: () => useAllAnimalsQuery()
  })
}
