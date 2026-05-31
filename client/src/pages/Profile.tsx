import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FaEdit } from "react-icons/fa";


export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <div className="container">
                {user ? (
                    <>
                        <div className="profile-header">
                            <h1 className="title">Hello {user.name}!</h1>
                            
                        </div>
                        <div className="info-card">
                            <div className="card-actions">
                                <button title="Edit" onClick={() => navigate("/update")}>
                                    <FaEdit size={20} />
                                </button>
                            </div>
                            <div className="card-text">
                                
                                <p>Username: {user.name}</p>
                                <p>Role: {user.role === 1 ? "Admin" : "User"}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Please log in to see your profile</p>
                )}
            </div>
        </div>
    );
}