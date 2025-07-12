import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { CreateMessageEntity, DeleteManyEntity, MessageEntity, UpdateNoteEntity, UpdateStatusEntity } from "@/_schemas/message.schema";

class MessagesService {

  constructor() { }

  create = async (data: CreateMessageEntity): Promise<MessageEntity> => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: authHeader()
    }
    return await handleResponse(await fetch('/api/messages', requestOptions));
  }

  updateStatus = async (id: number, values: UpdateStatusEntity): Promise<MessageEntity> => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(values),
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/messages/status/${id}`, requestOptions));
  };

  updateInternalNotes = async (id: number, values: UpdateNoteEntity): Promise<MessageEntity> => {
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(values),
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/messages/note/${id}`, requestOptions));
  };

  deleteById = async (id: number): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/messages/unique/${id}`, requestOptions));
  };

  deleteMany = async (values: DeleteManyEntity): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
      body: JSON.stringify(values),
    }
    return await handleResponse(await fetch(`/api/messages/many`, requestOptions));
  };

  getById = async (id: number): Promise<MessageEntity> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/messages/${id}`, requestOptions));
  };

  getAll = async (): Promise<MessageEntity[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/messages/all`, requestOptions));
  };

  getMyMessages = async (): Promise<MessageEntity[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/messages/mine`, requestOptions));
  };
}

export const messagesService = new MessagesService();