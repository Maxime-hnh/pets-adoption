
import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { baseUrl } from "@/_lib/constants";
import { EventEntity } from "@/_schemas/events.schema";


class EventsServerService {

  constructor() { }
  serverGetAll = async (): Promise<EventEntity[]> => {    
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`${baseUrl}/api/events/all`, requestOptions));
  };

  serverGetById = async (id: number, revalidateCacheTime: number): Promise<EventEntity> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
      next: { revalidate: revalidateCacheTime }
    }
    return await handleResponse(await fetch(`${baseUrl}/api/events/${id}`, requestOptions));
  }
}

export const eventsServerService = new EventsServerService();
