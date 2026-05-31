import { userApi } from "../api/user";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import type{ User } from "../types/user"
import List from "../components/List"
import "../components/List.css"
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"
import ConfirmationModal from "../components/ConfirmationModal";
import type { UserRole } from "../types/userRole";

export default function AdminUsers(){
    const [users, setUsers] = useState<User[]>([]);
    const { user } = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showChangeModal, setShowChangeModal] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await userApi.getAll();
                setUsers(res); 
            } catch(err){
                console.error("Failed to fetch users", err);
            }    
        }
        fetchUsers();   
    },[]);

    const handleEdit = async (id: number) => {
        try{
            navigate(`/update/${id}`)
        } catch(err) {
            console.log("Update Failed!", err)
        }
        

    }

    const handleDeleteClick = (id: number) => {
        setSelectedId(id)
        setShowDeleteModal(true);
    }

    const handleDelete = async (id: number) => {
        try{
            const res = await userApi.delete(id)
            console.log(res);
            setUsers(prev => prev.filter(u => u.id !== id));
            setShowDeleteModal(false);
            setSelectedId(null);
        } catch(err) {
            console.log("Deletion Failed!", err)
        }
    }

    const handleCancel = () => {
        setSelectedId(null);
        setShowDeleteModal(false);
        setShowChangeModal(false);
    }

    const handleRoleChange = (user: User, role: UserRole) => {
        if(user.role === role) return;
        setUsers(prev => 
            prev.map(u => 
                u.id === user.id
            ? { id: u.id, name: u.name, role: role }
            : u));
        setSelectedRole(role);
        setSelectedUser(user);
        setShowChangeModal(true);
    }

    const handleUpdateRole = async (user: User, role: UserRole) => {
        console.log(user.id)
        const res = await userApi.updateRole(user.id, role)
        console.log(res)
        setShowChangeModal(false);
        setSelectedRole(null);
        setSelectedUser(null);
    }


    if (!user) return <Navigate to="/login" />;
    if (user.role !== 1) return <Navigate to="/" />;

    return(
        <div className="wrapper">
            <div className="container">
                <ConfirmationModal
                isOpen = {showDeleteModal}
                title = "Delete User"
                message="Are you sure you want to delete the user?"
                onConfirm={() => selectedId && handleDelete(selectedId)}
                onCancel={handleCancel}
                />
                <ConfirmationModal
                isOpen = {showChangeModal}
                title = "Change User Role"
                message="Are you sure you want to change the users role?"
                onConfirm={() => selectedUser && selectedRole && handleUpdateRole(selectedUser, selectedRole)}
                onCancel={handleCancel}
                />
                <h1>All Users</h1>
               <List
                    headers={["Username", "Role", "Actions"]}
                    items={users}
                    render={(user) => (
                        <>
                            <div className="list-cell">{user.name}</div>
                            <select className="list-cell" value={user.role} onChange={(e) => handleRoleChange(user, Number(e.target.value) as UserRole)}>
                                <option value={0}>User</option>
                                <option value={1}>Admin</option>
                                
                            </select>
                            <div className="list-actions">
                                <button title="Edit" onClick={() => {handleEdit(user.id)}}>
                                    <FaEdit size="1rem" />
                                </button>
                                <button title="Delete" onClick={() => handleDeleteClick(user.id)}>
                                    <FaTrash size="1rem" color="red"/>
                                </button>
                            </div>
                        </>
                    )}
                />
                <div className="list-actions">
                    <button title="Create User" onClick={() => navigate("/AdminCreate")}>
                        <FaPlus size="1rem"/>
                    </button>
            
                </div>
        </div>




            
        </div>
    )
}