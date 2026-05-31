import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignInAlt, FaUserPlus, FaUser, FaUserCog, FaSignOutAlt } from "react-icons/fa"
import "./Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    return (
        <nav>
            <h1>User Management</h1>

            <ul>
                {!user && (
                    <>
                        <li>
                            <button title="Register" onClick={() => navigate("/register")}>
                                <FaUserPlus size={20} />
                            </button>
                        </li>
                        <li>
                            <button title="Login" onClick={() => navigate("/login")}>
                                <FaSignInAlt size={20} />
                            </button>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <button title="Profile" onClick={() => navigate("/profile")}>
                                <FaUser size={20} />
                            </button>
                        </li>
                        {user.role === 1 && (
                            <li>
                                <button title="Admin" onClick={() => navigate("/admin")}>
                                    <FaUserCog size={20}/>
                                </button>
                            </li>
                        )}
                        <li>
                            <button title="Logout" onClick= {() => {
                                logout();
                                navigate("/login", { replace: true})
                            }}>
                                <FaSignOutAlt size={20} strokeWidth={1/2}/>
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}