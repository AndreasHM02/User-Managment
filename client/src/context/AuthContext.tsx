import type { AuthContextType } from "../types/authContext";
import { createContext, useState, useContext, useEffect} from "react";
import type { User } from "../types/user";
import { userApi } from "../api/user"
import { logger } from "../utils/logger";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    

    const refreshUser = async () => {
        const token = localStorage.getItem("token");

        if (!token)
        {
            logger.info("[AUTH] No token found");
            setUser(null);
            return;
        }

        try
        {
            logger.info("[AUTH] Fetching user information");
            const user = await userApi.getMe();
            logger.info("[AUTH] User information fetched:", user);
            setUser(user);
        }
        catch(error)
        {
            localStorage.removeItem("token");
            logger.warn("[AUTH] Failed to fetch user, token removed", error);
            setUser(null);
        }  
    }



    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await refreshUser();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        logger.info("[AUTH] User logged out");
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            logger.info("[AUTH] Init started");
            await refreshUser();
            setLoading(false)
            logger.info("[AUTH] Init completed");
        }
        init();
    },[]);

    return (
        <AuthContext.Provider value={{ refreshUser, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );

}
export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if(!ctx)
        throw new Error("useAuth must be used inside AuthProviser");
    return ctx;
}

