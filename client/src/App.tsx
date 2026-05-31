import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminCreateUser from "./pages/AdminCreateUser";
import { AuthProvider } from "./context/AuthContext";
import "./App.css"
import Update from "./pages/Update";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update/:id?" element={<Update />} />
            <Route path="/admin" element={<AdminUsers />} />
            <Route path="/adminCreate" element={<AdminCreateUser />} />
          </Routes>
        </div>
      </AuthProvider>

    </>
  )
}

export default App
