import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";

class IncompatibilitiesService {
  constructor() { }

  async getAll(): Promise<ShortIncompatibility[]> {
    const requestOption = {
      method: 'GET',
      header: authHeader()
    }
    return await handleResponse(await fetch("/api/incompatibilities/all", requestOption));
  }
}

export const incompatibilitiesService = new IncompatibilitiesService();