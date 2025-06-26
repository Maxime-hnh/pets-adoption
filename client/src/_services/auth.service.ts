import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { useAuthStore } from "@/_stores/auth.store";
import { AuthRequest } from "@/_types/auth-request.interface";
import { AuthenticatedUser } from "@/_types/authenticated-user.interface.ts";
import { Role } from "@/_types/role.interface";

class AuthService {

  constructor() {
  }

  login = async (values: AuthRequest): Promise<AuthenticatedUser> => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(values),
      credentials: 'include' as RequestCredentials,
    };
    const result = await handleResponse(await fetch(`/api/auth/login`, requestOptions));
    const user = await this.me();
    useAuthStore.getState().setLoggedUser(user);
    return result;
  }

  logout = async () => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      credentials: 'include' as RequestCredentials,
    };
    await handleResponse(await fetch(`/api/auth/logout`, requestOptions));
    const store = useAuthStore.getState();
    store.logout();
  }

  refreshToken = async (): Promise<AuthenticatedUser | null> => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
      });
      if (!res.ok) throw new Error("Failed to refresh token");

      const user = await res.json();
      useAuthStore.getState().setLoggedUser(user);
      return user;
    } catch (error) {
      useAuthStore.getState().logout();
      return null;
    }
  }

  me = async (): Promise<AuthenticatedUser> => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
      credentials: 'include' as RequestCredentials,
    };
    const currentUser = await handleResponse(await fetch(`/api/auth/me`, requestOptions));
    return currentUser;
  }


  hasRole(role: Role, requiredRole: string[] = [Role.ADMIN, Role.SUPERADMIN]): boolean {
    return requiredRole.includes(role);
  }
}

export const authService = new AuthService();