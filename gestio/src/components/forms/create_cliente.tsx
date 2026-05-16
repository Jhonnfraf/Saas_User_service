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
        <div>
            <div>
                <p>Nombre:</p>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" />
            </div>
            <div>
                <p>Email:</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
                <p>Teléfono:</p>
                <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" />
            </div>
            <div>
                <p>Notas:</p>
                <textarea value={notas} onChange={(e) => setNotas(e.target.value)} />
            </div>
        </div>
    );
}