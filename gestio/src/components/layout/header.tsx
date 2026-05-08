"use client";

import { usePathname, useRouter } from "next/navigation";

const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
    "agosto","septiembre","octubre","noviembre","diciembre"
]

export default function Header(){
    const routeDashboard = "/dashboard"
    const pathname = usePathname();
    const router = useRouter();

    const isDashboard = pathname === routeDashboard;

    return(
        <header className="flex justify-between items-center py-6 px-4">
            <div>
                <p>{pathname}</p>
            </div>
            <div className="flex items-center gap-4">
                {isDashboard &&(
                    <select>
                        {meses.map((mes) => (
                            <option key={mes} value={mes}>{mes}</option>
                        ))}
                    </select>
                )}
                <button
                onClick={()=>router.push("/obtener-plan-plus")}
                >Obtener Plus</button>
            </div>
        </header>
    )
}