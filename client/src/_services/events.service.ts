import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { DeleteManyEntity } from "@/_schemas/common.schema";
import { CreateEventEntity, EventEntity } from "@/_schemas/events.schema";

class EventsService {

  constructor() { }

  create = async (data: CreateEventEntity): Promise<EventEntity> => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: authHeader()
    }
    return await handleResponse(await fetch('/api/events', requestOptions));
  }

  updateById = async (id: number, values: EventEntity): Promise<EventEntity> => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/events/${id}`, requestOptions));
  };


  deleteById = async (id: number): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/events/unique/${id}`, requestOptions));
  };

  deleteMany = async (values: DeleteManyEntity): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
      body: JSON.stringify(values),
    }
    return await handleResponse(await fetch(`/api/events/many`, requestOptions));
  };

  getById = async (id: number): Promise<EventEntity> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/events/${id}`, requestOptions));
  };

  getAll = async (): Promise<EventEntity[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/events/all`, requestOptions));
  };

}

export const eventsService = new EventsService();