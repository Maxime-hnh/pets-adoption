import { baseUrl } from "@/_lib/constants";
import { AuthenticatedUser } from "@/_types/authenticated-user.interface.ts";
import { Role } from "@/_types/role.interface";
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
    const res = await fetch(`${baseUrl}/api/auth/me`, requestOptions);
    if (!res.ok) return null;
    return res.json();
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.meServer();
    return !!user;
  }
}

export const authServerService = new AuthServerService();
