import React from "react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header";
export default function DashboardLayout({
    children,
}:{
    children: React.ReactNode;
}){
    return (
    <div className="flex h-screen overflow-hidden bg-[#13131f]">

        {/* Sidebar izquierdo — fijo */}
        <Sidebar />

        {/* Columna derecha: topbar + contenido */}
        <div className="flex flex-col flex-1 min-w-0">

            {/* Barra superior */}
            <Header />

            {/* Contenido — único scroll aquí */}
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>

        </div>
    </div>
);
}