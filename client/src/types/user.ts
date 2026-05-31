import type { UserRole } from "./userRole";

export type User = {
    id: number;
    name: string;
    role: UserRole;
}