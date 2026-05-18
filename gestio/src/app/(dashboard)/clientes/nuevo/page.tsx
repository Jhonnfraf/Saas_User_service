"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import CrearClientePage from "@/components/forms/create_cliente";
import Modalfiled, { FieldTemp } from "@/components/ui/modal_filed";
import FieldList from "@/components/forms/lista_campos";

export default function NuevoClientePage() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [notas, setNotas] = useState("");

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const [fields, setFields] = useState<FieldTemp[]>([]);

    const router = useRouter();
    const supabase = createClient();


    function handleAddField(nuevoField: FieldTemp) {
        setFields(prev => [...prev, nuevoField]);
    }

    function handleValorChange(id: string, valor: string) {
        setFields(prev =>
            prev.map(f => f.id === id ? { ...f, valor } : f)
        );
    }

    function handleDeleteField(id: string) {
        setFields(prev => prev.filter(f => f.id !== id));
    }

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
    return (
        <div>
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
                <div>
                    <Modalfiled onAdd={handleAddField} />
                </div>
                <div>
                    <FieldList fields={fields} onValorChange={handleValorChange} onDelete={handleDeleteField} />
                </div>
                {/*Agregar Valores de los Fields Agregados*/}
                <div>
                    <li className="fields-list">

                    </li>
                </div>
            </div>

        </div>
    )
}   