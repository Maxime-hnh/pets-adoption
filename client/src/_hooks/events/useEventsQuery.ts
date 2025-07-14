'use client'

import { EventEntity } from "@/_schemas/events.schema";
import { eventsService } from "@/_services/events.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query"


const { getAll } = eventsService;

export const useAllEventsQuery = (): UseQueryResult<EventEntity[], Error> => {
  return useQuery({
    queryKey: ['events', 'all'],
    queryFn: getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
};
