"use client";

import CrearCampo from "../forms/create_campo";
import { useState } from "react";

interface ModalFieldProps {
    onAdd: (field: FieldTemp) => void;
}

export interface FieldTemp {
    id: string;
    nombre: string;
    tipo: "texto" | "numero" | "fecha" | "booleano";
    requerido: boolean;
    valor: string;
}

export default function ModalField({ onAdd }: ModalFieldProps) {
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState<FieldTemp["tipo"]>("texto");
    const [requerido, setRequerido] = useState(false);

    const handleSubmit = () => {
        if (!nombre.trim()) return; // validación mínima

        onAdd({
            id: crypto.randomUUID(),
            nombre,
            tipo,
            requerido,
            valor: ""
        });

        // Limpiar y cerrar
        setNombre("");
        setTipo("texto");
        setRequerido(false);
        setOpen(false);
    };

    return (
        <div>
            <button onClick={() => setOpen(true)}>Agregar campo</button>
            {open && (
                <CrearCampo
                    nombre={nombre}
                    setNombre={setNombre}
                    tipo={tipo}
                    setTipo={setTipo}
                    requerido={requerido}
                    setRequerido={setRequerido}
                />
            )}
            {open && (
                <button onClick={handleSubmit}>Guardar</button>
            )}
        </div>
    );
}