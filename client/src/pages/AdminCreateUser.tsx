import AuthForm from "../components/AuthForm"
import { useNavigate } from "react-router-dom"
import { userApi } from "../api/user";
import { useState } from "react";
import type { AuthData } from "../types/authData";

export default function AdminCreateUser() {
    const navigate = useNavigate();
    const [role, setRole] = useState(0)

    const handleCreateUser = async (data: AuthData) => {
        try {
            const res = await userApi.create(data, role)

            console.log(res);

            navigate("/profile")
        } catch (err) {
            console.error("Register failed", err);
        }

    }




    return(
        <div className="wrapper">
            <AuthForm 
            title="Create User" 
            onSubmit={handleCreateUser}
            extraFields={ 
                <select value={role} onChange={(e) => setRole(Number(e.target.value))}>
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                </select> 
                }    />  
        </div>
    )
}