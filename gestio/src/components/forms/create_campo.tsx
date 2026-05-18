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
        <div>
            <div >
                <p>Crear nueva columna personalizada</p>
            </div>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" />
            </div>
            <div>
                <label htmlFor="tipo">Tipo:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value as "texto" | "numero" | "fecha" | "booleano")}>
                    <option value="texto">Texto</option>
                    <option value="numero">Número</option>
                    <option value="fecha">Fecha</option>
                </select>
            </div>
            <div>
                <label htmlFor="requerido">Requerido:</label>
                <input checked={requerido} onChange={(e) => setRequerido(e.target.checked)} type="checkbox" />
            </div>
        </div>
    );
}