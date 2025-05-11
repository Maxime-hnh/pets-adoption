export interface AuthenticatedUser {
  id: number;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}