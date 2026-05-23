"use client"
type Props = {
    nombre: string;
    setNombre: (v: string) => void;
    tipo: "texto" | "numero" | "fecha" | "booleano"; //Texto, numero, fecha
    setTipo: (v: "texto" | "numero" | "fecha" | "booleano") => void;
    requerido: boolean;
    setRequerido: (v: boolean) => void;
    orden?: number;
    setOrden?: (v: number) => void;
}

export default function CrearCampo({ nombre, setNombre, tipo, setTipo, requerido, setRequerido, orden, setOrden }: Props) {
    return (
        <div className="flex flex-col gap-4">

    {/* Nombre del campo */}
    <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className="text-xs font-medium text-[#a0a0b8]">
            Nombre del campo <span className="text-red-400">*</span>
        </label>
        <input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Ej: Cédula, Empresa..."
            className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#4a4a62] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150"
        />
    </div>

    {/* Tipo */}
    <div className="flex flex-col gap-1.5">
        <label htmlFor="tipo" className="text-xs font-medium text-[#a0a0b8]">
            Tipo de campo
        </label>
        <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "texto" | "numero" | "fecha" | "booleano")}
            className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150 cursor-pointer appearance-none"
        >
            <option value="texto">Texto</option>
            <option value="numero">Número</option>
            <option value="fecha">Fecha</option>
        </select>
    </div>

    {/* Requerido */}
    <div className="flex items-center gap-3">
        <div className="relative">
            <input
                id="requerido"
                checked={requerido}
                onChange={(e) => setRequerido(e.target.checked)}
                type="checkbox"
                className="peer sr-only"
            />
            <div
                onClick={() => setRequerido(!requerido)}
                className={`w-9 h-5 rounded-full border transition-all duration-200 cursor-pointer flex items-center px-0.5
                    ${requerido
                        ? "bg-[#5a5a88] border-[#5a5a88]"
                        : "bg-[#16161f] border-[#3e3e58]"
                    }`}
            >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
                    ${requerido ? "translate-x-4" : "translate-x-0"}`}
                />
            </div>
        </div>
        <label htmlFor="requerido" className="text-xs font-medium text-[#a0a0b8] cursor-pointer select-none">
            Campo requerido
        </label>
    </div>

</div>
    );
}
