"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import CrearClientePage from "@/components/forms/create_cliente";
import Modalfiled, { FieldTemp } from "@/components/ui/modal_filed";
import FieldList from "@/components/forms/lista_campos";

function getErrorMessage(err: unknown): string {
    if (err == null) return "Error desconocido (sin detalle)";

    if (typeof err === "object") {
        const o = err as Record<string, unknown>;
        const partes: string[] = [];

        if (typeof o.message === "string" && o.message) partes.push(o.message);
        if (typeof o.code === "string" && o.code) partes.push(`Código: ${o.code}`);
        if (typeof o.details === "string" && o.details) partes.push(`Detalles: ${o.details}`);
        if (typeof o.hint === "string" && o.hint) partes.push(`Sugerencia: ${o.hint}`);

        if (partes.length > 0) return partes.join(" · ");
    }

    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    try {
        return JSON.stringify(err);
    } catch {
        return String(err);
    }
}

function logSaveError(paso: string, err: unknown) {
    console.error(`[NuevoCliente] Error en paso: ${paso}`, err);
    if (err && typeof err === "object") {
        const o = err as Record<string, unknown>;
        console.error(`[NuevoCliente] ${paso} — detalle:`, {
            message: o.message,
            code: o.code,
            details: o.details,
            hint: o.hint,
        });
    }
}

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

    async function handleSaveClient(){
        //1.Validar campos requeridos
        if(!nombre || !email){
            alert("Por favor, complete todos los campos requeridos");
            return;
        }
        try {
            const supabase = createClient();
            //obtener el profile id del usuario actual
            const { data: { user } } = await supabase.auth.getUser();
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("user_id", user!.id)
                .single();
            if(!profile){
                alert("No se encontró el perfil del usuario");
            }
            //3.guardar cliente
            const{data: cliente, error: clienteError} = await supabase
            .from("clients")
            .insert({
                profile_id: profile!.id,
                nombre,
                email,
                telefono,
                notas,
            })
            .select()
            .single();

            if(clienteError) throw clienteError;

            //4. procesar los Fields
            if(fields.length > 0){
                //Creamos las definiciones en client_fields
                const {data: fieldsCreados, error: fieldsError} = await supabase
                .from("client_fields")
                .insert(fields.map(field => ({
                    profile_id: profile!.id,
                    nombre: field.nombre,
                    tipo: field.tipo,
                    requerido: field.requerido,
                }))).select();
                if(fieldsError) throw fieldsError;
                
                //Asignamos los valores a cada campo
                const valoresAInsertar = fieldsCreados.map((fieldCreado, index) => ({
                    client_id: cliente!.id,
                    field_id: fieldCreado.id,
                    valor: fields[index].valor ?? ""
                }))
                .filter(v => v.valor !== "");//Filtramos los valores que no son vacios
                if(valoresAInsertar.length > 0){
                    const {error: valoresError} = await supabase
                    .from("client_field_values")
                    .insert(valoresAInsertar);
                    if(valoresError) throw valoresError;
                }
            }
            router.push("/clientes");
        }
        catch(error){
            // Log detailed info to console and set a user-friendly message
            logSaveError("guardar cliente", error);
            const msg = getErrorMessage(error);
            setError(msg || 'Error al guardar el cliente');
            setCargando(false);
            // Show the detailed message to the user (can be adjusted)
            alert(msg || "Error al guardar el cliente");
            return;
        }
        finally{
            setCargando(false);
            cleanFields();
        }
    
    }

    async function handleCancel(){
        router.push("/clientes");
        cleanFields();
    }

    async function cleanFields(){
        setFields([]);
        setNombre("");
        setEmail("");
        setTelefono("");
        setNotas("");
        setError("");
        setCargando(false);
        router.push("/clientes");
    }
        
    return (
    <form onSubmit={(e) => { e.preventDefault(); void handleSaveClient(); }}>
        <div className="grid grid-cols-[1fr_280px] gap-3 p-5">

            {/* Información básica */}
            <div className="bg-[#1e1e2e] border border-[#2e2e42] rounded-xl p-5 col-span-1">
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

            {/* Panel derecho — Acciones + Info */}
            <div className="col-start-2 row-start-1 row-span-3 flex flex-col gap-3">

                {/* Acciones */}
                <div className="bg-[#1e1e2e] border border-[#2e2e42] rounded-xl p-5 flex flex-col gap-2">
                    <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wider mb-1">Acciones</p>

                    {error && (
                        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full py-2.5 px-4 bg-transparent text-[#e8e8f0] border border-[#3e3e58] rounded-lg text-sm font-medium cursor-pointer hover:bg-[#2a2a3e] hover:border-[#5a5a78] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cargando ? "Creando..." : "Crear Cliente"}
                    </button>

                    <button
                        type="button"
                        onClick={() => void handleCancel()}
                        className="w-full py-2.5 px-4 bg-transparent text-[#e8e8f0] border border-[#3e3e58] rounded-lg text-sm font-medium cursor-pointer hover:bg-[#2a2a3e] hover:border-[#5a5a78] transition-all duration-150"
                    >
                        Cancelar
                    </button>
                </div>

                {/* Campos requeridos — info */}
                <div className="bg-[#1e1e2e] border border-[#2e2e42] rounded-xl p-5 flex flex-col gap-2">
                    <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wider">Campos requeridos</p>
                    <p className="text-xs text-[#6e6e88] leading-relaxed">
                        Los campos marcados con <span className="text-red-400 font-medium">*</span> son requeridos y deben completarse para guardar el cliente.
                    </p>
                    <p className="text-xs text-[#6e6e88] leading-relaxed">
                        Los campos personalizados los configuras en{" "}
                        <span className="text-[#a0a0b8] font-medium">Configuración → Campos</span>
                    </p>
                </div>
            </div>

            {/* Campos personalizados */}
            <div className="bg-[#1e1e2e] border border-[#2e2e42] rounded-xl p-5 col-span-1">
                <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wider mb-3">
                    Campos personalizados <span className="normal-case font-normal text-[#6e6e88]">— opcional</span>
                </p>
                <Modalfiled onAdd={handleAddField} />
            </div>

            {/* Field List */}
            {fields.length > 0 && (
                <div className="col-span-1">
                    <FieldList fields={fields} onValorChange={handleValorChange} onDelete={handleDeleteField} />
                </div>
            )}

        </div>
    </form>
)
}   