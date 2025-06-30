import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";
import { baseUrl } from "@/_lib/constants";

class IncompatibilitiesServerService {
  constructor() { }

  async serverGetIncompatibilities(): Promise<ShortIncompatibility[]> {
    const requestOption = {
      method: 'GET',
      header: authHeader()
    }
    return await handleResponse(await fetch(`${baseUrl}/api/incompatibilities/all`, requestOption));
  }
}

export const incompatibilitiesServerService = new IncompatibilitiesServerService();