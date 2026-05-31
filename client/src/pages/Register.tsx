import { authApi } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import type { AuthData } from "../types/authData"
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth()

    const handleRegister = async (data: AuthData) => {
        try{
            const res = await authApi.register(data)

            console.log("User registered!");

            localStorage.setItem("token", res.token);
            
            login(res.user)
            console.log("Logged in!");

            navigate("/profile")
        } catch(err){
            console.error("Register failed", err);
        }
    }

    return (
        <div className="wrapper">
            <AuthForm title="Register" onSubmit={handleRegister}/>

            <div className="link">
                <Link to="/login">Already have an account? Login here.</Link>
            </div>
        </div>
    )
}