import { Animal } from "@/_schemas/animal.schema";
import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";


const baseUrl = process.env.API_URL || 'http://localhost:3001';

class AnimalsService {

  constructor() { }

  create = async (data: any): Promise<any> => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: authHeader()
    }
    return await handleResponse(await fetch('/api/animals', requestOptions));
  }

  update = async (id: number, values: Partial<Animal>): Promise<Animal> => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/${id}`, requestOptions));
  };

  deleteById = async (id: number): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/${id}`, requestOptions));
  };

  deleteMany = async (animals: any): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(),
      body: JSON.stringify({ ids: animals.map((a: any) => a.id) }),
    }
    return await handleResponse(await fetch(`/api/animals}`, requestOptions));
  };

  getById = async (id: number): Promise<Animal> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/${id}`, requestOptions));
  };

  serverGetById = async (id: number, revalidateCacheTime:number): Promise<Animal> => {
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


  getAll = async (): Promise<Animal[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/all`, requestOptions));
  };

  getAllWithFilters = async (where: any): Promise<Animal[]> => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/filtered`, requestOptions));
  };

  getDogs = async (): Promise<Animal[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/species/dogs`, requestOptions));
  };

  getCats = async (): Promise<Animal[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/species/cats`, requestOptions));
  };

  getOthers = async (): Promise<Animal[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/animals/species/others`, requestOptions));
  };



}

export const animalsService = new AnimalsService();