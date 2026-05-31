import type { AuthData } from "../types/authData";
import type { User } from "../types/user";
import { apiClient } from "./apiClient";

export type AuthResponse = {
    token: string,
    user: User
}



export const authApi = {
    login: (data: AuthData) => apiClient.post<AuthResponse>("/auth/login", data),
    register: (data: AuthData) => apiClient.post<AuthResponse>("/auth/register", data)
}