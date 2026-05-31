import { apiClient } from "./apiClient";
import type { AuthData } from "../types/authData";
import type { User } from "../types/user"
import type { UserRole } from "../types/userRole";




export const userApi = {
    getMe: () => apiClient.get<User>("/users/me"),
    getUserById: (id: number) => apiClient.get<User>(`/users/${id}`),
    getAll: () => apiClient.get<User[]>("/users"),
    create: (data: AuthData, role: number) => apiClient.post<User>("/users", {name: data.name, password: data.password, role: role}),
    update: (id: number, data: AuthData) => apiClient.put<User>(`/users/${id}`, data),
    updateRole: (id: number, role: UserRole) => apiClient.put(`/users/role/${id}`, role),
    delete: (id: number) => apiClient.del<String>(`/users/${id}`)
}

