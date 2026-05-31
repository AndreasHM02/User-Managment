import { authApi } from "../api/auth"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { AuthData} from "../types/authData"
import AuthForm from "../components/AuthForm";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async ( data: AuthData ) => {
        try {
            const res = await authApi.login(data)

            localStorage.setItem("token", res.token);
            
            login(res.user)

            console.log("Logged in!");
            
            navigate("/profile");
        } catch {
            console.error("Login failed");
        }
    };



    return (
        <div className="wrapper">
            <AuthForm title = "Login" onSubmit = {handleLogin}/>
            
            <div className="link">
                <Link to="/register">Don't have an account? Register here.</Link>
            </div>
            
        </div>

    )
}
