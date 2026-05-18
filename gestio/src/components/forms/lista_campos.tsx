"use client";

import { FieldTemp } from "../ui/modal_filed";

interface FieldListProps {
    fields: FieldTemp[];
    onValorChange: (id: string, valor: string) => void;
    onDelete: (id: string) => void;
}

export default function FieldList({ fields, onValorChange, onDelete }: FieldListProps) {
    if (fields.length === 0) return null;

    return (
        <div>
            {fields.map((field) => (
                <div key={field.id}>
                    <label>
                        {field.nombre}
                        {field.requerido && <span>*</span>}
                    </label>
                    <input
                        type={field.tipo === "numero" ? "number" :
                            field.tipo === "fecha" ? "date" : "text"}
                        value={field.valor}
                        onChange={(e) => onValorChange(field.id, e.target.value)}
                        placeholder={`Ingresa ${field.nombre.toLowerCase()}`}
                    />
                    <button onClick={() => onDelete(field.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}