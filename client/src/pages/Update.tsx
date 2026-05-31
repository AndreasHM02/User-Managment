import { userApi } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import type { AuthData } from "../types/authData"
import { useAuth } from "../context/AuthContext";
import type { User } from "../types/user";

export default function Update() {
    const navigate = useNavigate();
    const { login, user } = useAuth()
    const { id } = useParams();
    const [ editUser, setEditUser ] = useState<User | null>(null);
    const isOwnProfile = !id;
    

    useEffect(() => {

        if(isOwnProfile) return;

        const fetchUser = async () => {
            try {
                const data = await userApi.getUserById(Number(id));
                setEditUser(data);
                console.log("data: ", data)
                
            } catch (err) {
                console.error("Failed to fetch user", err);
            }
        };

        if (id) fetchUser();
    }, [id, isOwnProfile]);

    const handleUpdate = async (data: AuthData) => {
        try {
            const targetId = isOwnProfile ? user?.id : Number(id);

            if(!targetId) return;

            const res = await userApi.update(targetId, data);

            if(isOwnProfile) {
                login(res)
            }

            navigate("/profile")
        } catch (err) {
            console.error("Update failed", err);
        }
    }

    const dataUser = isOwnProfile ? user : editUser;
    if(!dataUser)
        return (<p>Loading...</p>)

    return (
        
        <div className="wrapper">
            {user ? (
                <AuthForm 
                title="Update" 
                initialData={dataUser ? {
                    name: dataUser.name,
                    password: ""
                }:undefined}
                onSubmit={handleUpdate}/>   
            ) : (
                <p>Please log in to update your profile.</p>
            )}
        </div>
    )
}