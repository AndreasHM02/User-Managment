import type { AuthContextType } from "../types/authContext";
import { createContext, useState, useContext, useEffect} from "react";
import type { User } from "../types/user";
import { userApi } from "../api/user"

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    

    const refreshUser = async () => {
        const token = localStorage.getItem("token");

        if (!token)
        {
            setUser(null);
            return;
        }

        try
        {
            const user = await userApi.getMe();
            setUser(user);
        }
        catch
        {
            localStorage.removeItem("token");
            setUser(null);
        }  
    }



    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await refreshUser();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await refreshUser();
            setLoading(false)
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

