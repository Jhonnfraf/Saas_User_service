"use client";

import CrearCampo from "../forms/create_campo";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const backdropStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
};

const panelStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    padding: "1rem",
    background: "var(--background)",
    border: "1px solid var(--gray)",
};

export default function ModalField({ onAdd }: ModalFieldProps) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState<FieldTemp["tipo"]>("texto");
    const [requerido, setRequerido] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const resetForm = useCallback(() => {
        setNombre("");
        setTipo("texto");
        setRequerido(false);
    }, []);

    const closeModal = useCallback(() => {
        resetForm();
        setOpen(false);
    }, [resetForm]);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open, closeModal]);

    const handleSubmit = () => {
        if (!nombre.trim()) return;

        onAdd({
            id: crypto.randomUUID(),
            nombre: nombre.trim(),
            tipo,
            requerido,
            valor: "",
        });

        closeModal();
    };

    const modal =
    open &&
    mounted &&
    createPortal(
        <div
            style={overlayStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-field-title"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Backdrop */}
            <div
                style={backdropStyle}
                onClick={closeModal}
                aria-hidden="true"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <div
                style={panelStyle}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-md bg-[#1e1e2e] border border-[#2e2e42] rounded-xl shadow-2xl p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150"
            >
                <h2
                    id="modal-field-title"
                    className="text-sm font-semibold text-[#a0a0b8] uppercase tracking-wider"
                >
                    Nuevo campo personalizado
                </h2>

                <CrearCampo
                    nombre={nombre}
                    setNombre={setNombre}
                    tipo={tipo}
                    setTipo={setTipo}
                    requerido={requerido}
                    setRequerido={setRequerido}
                />

                {/* Botones */}
                <div className="flex gap-2 pt-1">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 py-2.5 px-4 bg-transparent text-[#e8e8f0] border border-[#3e3e58] rounded-lg text-sm font-medium hover:bg-[#2a2a3e] hover:border-[#5a5a78] transition-all duration-150"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!nombre.trim()}
                        className="flex-1 py-2.5 px-4 bg-[#2a2a3e] text-[#e8e8f0] border border-[#5a5a78] rounded-lg text-sm font-medium hover:bg-[#33334d] hover:border-[#7a7a98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );

return (
    <>
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-transparent text-[#a0a0b8] border border-dashed border-[#3e3e58] rounded-lg text-sm font-medium hover:bg-[#2a2a3e] hover:text-[#e8e8f0] hover:border-[#5a5a78] transition-all duration-150"
        >
            + Agregar campo
        </button>
        {modal}
    </>
);
}
