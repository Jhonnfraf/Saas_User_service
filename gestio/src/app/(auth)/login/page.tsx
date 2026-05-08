"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setCargando(true);
        setError("");

        const { error: authError} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (authError){
            setError(authError.message);
            setCargando(false);
            return;
        }

        router.push("/dashboard")
    }
    return(
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="">
                    Correo:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="">
                    Contraseña:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" disabled={cargando}>
                    {cargando ? "Entrando...." : "Entrar"}
                </button>
            </form>
        </div>
    )
}