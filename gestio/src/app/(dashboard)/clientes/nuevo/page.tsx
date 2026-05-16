"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import CrearClientePage from "@/components/forms/create_cliente";

export default function NuevoClientePage() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [notas, setNotas] = useState("");
    
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const supabase = createClient();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        const { data: { user } } = await supabase.auth.getUser();

        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", user!.id)
            .single();

        const { error: dbError } = await supabase.from("clients").insert([{
            profile_id: profile!.id,
            nombre,
            email,
            telefono,
            notas,
        }]);

        if (dbError) {
            setError(dbError.message);
            setCargando(false);
            return;
        }

        router.push("/clientes");
    };
    return(
        <div>
            <CrearClientePage 
                nombre={nombre}
                setNombre={setNombre}
                email={email}
                setEmail={setEmail}
                telefono={telefono}
                setTelefono={setTelefono}
                notas={notas}
                setNotas={setNotas}
            />
        </div>
    )
}