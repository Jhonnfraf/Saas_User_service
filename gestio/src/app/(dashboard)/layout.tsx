import React from "react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header";
export default function DashboardLayout({
    children,
}:{
    children: React.ReactNode;
}){
    return(
        <div className="flex">
             {/** Sidebar izquierdo */}
            <Sidebar />

            {/*Columna derecha: topbar + contenido */}
            <div className="flex flex-col flex-1 ring-2">
                {/*Barra superior */}
                <Header/>

                {/*Cambio de contenido segun pagina */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}