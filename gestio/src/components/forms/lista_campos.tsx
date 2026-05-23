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
    <div className="flex flex-col gap-3">
        {fields.map((field) => (
            <div
                key={field.id}
                className="bg-[#1e1e2e] border border-[#2e2e42] rounded-xl px-5 py-4 flex flex-col gap-1.5"
            >
                <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#a0a0b8]">
                        {field.nombre}
                        {field.requerido && (
                            <span className="text-red-400 ml-0.5">*</span>
                        )}
                    </label>
                    <button
                        onClick={() => onDelete(field.id)}
                        className="text-[#6e6e88] hover:text-red-400 transition-colors duration-150 text-xs font-medium"
                    >
                        Eliminar
                    </button>
                </div>

                <input
                    type={
                        field.tipo === "numero" ? "number" :
                        field.tipo === "fecha" ? "date" : "text"
                    }
                    value={field.valor}
                    onChange={(e) => onValorChange(field.id, e.target.value)}
                    placeholder={`Ingresa ${field.nombre.toLowerCase()}`}
                    className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#4a4a62] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150
                        [color-scheme:dark]"
                />
            </div>
        ))}
    </div>
);
}