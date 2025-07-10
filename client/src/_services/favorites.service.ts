import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { PublicAnimal } from "@/_schemas/animal.schema";

class FavoritesService {

  constructor() { }

  addToFavorites = async (animalId: number): Promise<void> => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/favorites/${animalId}`, requestOptions));
  }

  removeFromFavorites = async (animalId: number): Promise<void> => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }
    return await handleResponse(await fetch(`/api/favorites/${animalId}`, requestOptions));
  }

  getFavorites = async (): Promise<PublicAnimal[]> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }
    return await handleResponse(await fetch('/api/favorites', requestOptions));
  }
}

export const favoritesService = new FavoritesService();