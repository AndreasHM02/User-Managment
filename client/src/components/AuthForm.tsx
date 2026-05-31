import { useState } from "react"
import type { AuthData } from "../types/authData";
import "./AuthForm.css"

type AuthFormProps = {
    title: string;
    initialData?: {
        name?: string,
        password?: string
    };
    extraFields?: React.ReactNode;
    onSubmit: (data: AuthData) => void;
}

export default function AuthForm({ title, initialData, extraFields, onSubmit }: AuthFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [password, setPassword] = useState(initialData?.password || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, password });
    }



    return (
        <div className="container">
            <div>
                <h1 className="title">{title}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                {extraFields &&
                    extraFields
                }
                <button type="submit">{title}</button>
            </form>


        </div>
    )
}