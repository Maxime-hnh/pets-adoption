import { baseUrl } from "@/_lib/constants";
import { handleResponse } from "@/_lib/handle-response";
import { AuthenticatedUser } from "@/_types/authenticated-user.interface.ts";
import { cookies } from "next/headers";

class AuthServerService {
  /**
   * Service d'authentification pour les Server Components
   * Utilise les cookies Next.js pour récupérer les tokens
   */

  meServer = async (): Promise<AuthenticatedUser | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (!accessToken) return null;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Cookie': `accessToken=${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    const currentUser = await handleResponse(await fetch(`${baseUrl}/api/auth/me`, requestOptions));
    return currentUser;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.meServer();
    return !!user;
  }

  async hasRole(requiredRole: string): Promise<boolean> {
    const user = await this.meServer();
    return user?.role === requiredRole;
  }
}

export const authServerService = new AuthServerService();
