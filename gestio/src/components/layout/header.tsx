"use client";

import { usePathname, useRouter } from "next/navigation";
import { Star } from "lucide-react";

const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
    "agosto","septiembre","octubre","noviembre","diciembre"
]

export default function Header(){
    const routeDashboard = "/dashboard"
    const pathname = usePathname();
    const router = useRouter();

    const isDashboard = pathname === routeDashboard;

    return (
    <header className="flex justify-between items-center py-4 px-6 border-b border-[#2e2e42] bg-[#13131f]">

        {/* Breadcrumb / pathname */}
        <div>
            <p className="text-sm font-medium text-[#e8e8f0] capitalize">
                {pathname
                    .replace(/^\//, "")
                    .split("/")
                    .map((segment, i, arr) => (
                        <span key={i}>
                            <span className={i === arr.length - 1 ? "text-[#e8e8f0] font-semibold" : "text-[#6e6e88]"}>
                                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                            </span>
                            {i < arr.length - 1 && (
                                <span className="text-[#3e3e58] mx-1.5">/</span>
                            )}
                        </span>
                    ))
                }
            </p>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">

            {/* Selector de mes — solo en dashboard */}
            {isDashboard && (
                <select className="bg-[#1e1e2e] border border-[#2e2e42] text-[#a0a0b8] text-xs font-medium rounded-lg px-3 py-2 outline-none focus:border-[#5a5a88] transition-all duration-150 cursor-pointer [color-scheme:dark]">
                    {meses.map((mes) => (
                        <option key={mes} value={mes}>{mes}</option>
                    ))}
                </select>
            )}

            {/* Obtener Plus */}
            <button
                onClick={() => router.push("/obtener-plan-plus")}
                className="flex items-center gap-1.5 bg-[#e8e8f0] text-[#13131f] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white transition-colors duration-150"
            >
                <Star size={13} />
                Obtener Plus
            </button>

        </div>
    </header>
);
}