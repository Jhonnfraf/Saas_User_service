"use client";

import { useRouter } from "next/navigation";

export function obtenerClientes(){}

export function obtenerNumeroClientes(){
    return 100 
}

export function obtenerNumeroPagina(){
    return 1
}

export default function ClientesPage() {

    const router = useRouter();

    return(
        <div>
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            {/* Seccion botones: filtrar, importar, crear y label buscar */}
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Filtrar</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2" onClick={()=>router.push("/clientes/importar")}>Importar</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">Buscar</button>
                <button className="bg-blue-700 text-white px-4 py-2 rounded-md" onClick={()=>router.push("/clientes/nuevo")}>Crear Cliente</button>
            </div>
                {/* Tabla de clientes */}
            <div>
                <table className="min-w-full mt-4 border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Nombre</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Teléfono</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ejemplo de fila de cliente */}
                        <tr>
                            <td className="border px-4 py-2">John Doe</td>
                            <td className="border px-4 py-2">john.doe@example.com</td>
                            <td className="border px-4 py-2">123-456-7890</td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Editar</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex">
                {/* Paginacion */}
                <p>Pagina {obtenerNumeroPagina()}  de {Math.ceil(obtenerNumeroClientes() / 10)}</p>
                <div>
                    <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md mr-2">Anterior</button>
                    <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md">Siguiente</button>
                </div>
            </div>
        </div>
    )
}