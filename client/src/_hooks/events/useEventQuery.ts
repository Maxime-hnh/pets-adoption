'use client';

import { EventEntity } from "@/_schemas/events.schema";
import { eventsService } from "@/_services/events.service";
import { useQuery } from "@tanstack/react-query";

export const useEventQuery = (id: number) => {
  return useQuery<EventEntity, Error>({
    queryKey: ['event', id],
    queryFn: () => eventsService.getById(id),
    enabled: !!id, // évite de lancer si id = 0 ou undefined
    staleTime: 1000 * 60 * 5, // 5 minutes de cache (ajustable)
  });
};