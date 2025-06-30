import { Animal } from "@/_schemas/animal.schema";
import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { baseUrl } from "@/_lib/constants";


class AnimalsServerService {

  constructor() { }

  serverGetAll = async (): Promise<Animal[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`${baseUrl}/api/animals/all`, requestOptions));
  };

  serverGetById = async (id: number, revalidateCacheTime: number): Promise<Animal> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
      next: { revalidate: revalidateCacheTime }
    }
    return await handleResponse(await fetch(`${baseUrl}/api/animals/${id}`, requestOptions));
  }

  serverGetAllWithFilters = async (where: any): Promise<Animal[]> => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(where)
    }
    return await handleResponse(await fetch(`${baseUrl}/api/animals/filtered`, requestOptions));
  };

}

export const animalsServerService = new AnimalsServerService();