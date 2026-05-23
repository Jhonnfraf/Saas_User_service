"use client";

type Props = {
    nombre: string;
    setNombre: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    telefono: string;
    setTelefono: (v: string) => void;
    notas: string;
    setNotas: (v: string) => void;
}
export default function CrearClientePage({ nombre, setNombre, email, setEmail, telefono, setTelefono, notas, setNotas }: Props) {
    return (
    <div className="flex flex-col gap-4">

        <p className="text-sm font-semibold text-[#a0a0b8] uppercase tracking-wider">
            Información básica
        </p>

        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-[#a0a0b8]">
                Nombre <span className="text-red-400">*</span>
            </p>
            <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                placeholder="Juan"
                className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#4a4a62] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150"
            />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-[#a0a0b8]">
                Correo electrónico <span className="text-red-400">*</span>
            </p>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="juan@correo.com"
                className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#4a4a62] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150"
            />
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-[#a0a0b8]">Teléfono</p>
            <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                type="tel"
                placeholder="+57 310 000 0001"
                className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#4a4a62] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150"
            />
        </div>

        {/* Notas */}
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-[#a0a0b8]">Notas internas</p>
            <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Ej: Cliente referido, caso especial..."
                rows={3}
                className="w-full bg-[#16161f] border border-[#2e2e42] rounded-lg px-3 py-2 text-sm text-[#e8e8f0] placeholder-[#4a4a62] outline-none focus:border-[#5a5a88] focus:ring-2 focus:ring-[#5a5a88]/15 transition-all duration-150 resize-none"
            />
        </div>

    </div>
);
}