import { Role } from "./role.interface";

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: Role;
}