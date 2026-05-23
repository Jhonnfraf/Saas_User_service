"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  IconHome,
  IconUsers,
  IconBriefcase,
  IconFileInvoice,
  IconSettings,
  IconStar,
  IconLayoutDashboard,
  IconChevronUp,
} from "@tabler/icons-react";

const navItems = [
  { label: "Home", icon: IconHome, href: "/dashboard" },
];
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useEffect } from "react";


const gestionItems = [
  { label: "Clientes", icon: IconUsers, href: "/clientes" },
  { label: "Servicios", icon: IconBriefcase, href: "/servicios" },
  { label: "Facturación", icon: IconFileInvoice, href: "/facturacion" },
];


export default function Sidebar() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [nombre, setNombre] = useState<string>("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true)
  const [iniciales, setIniciales] = useState("")
  
  const supabase = createClient()
  
  console.log("Sidebar renderizado")

  useEffect(() => {
    (async () => {
      try {
        // 1. Obtener usuario autenticado
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        setUserId(user?.id);

        // 2. Obtener datos de la tabla profiles
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('nombre, plan')
          .eq('user_id', user?.id)
          .single()

        console.log('PROFILE:', profile)
        console.log('PROFILE ERROR:', error)

        if (error) {
          console.error('Error fetching profile:', error)
          return
        }

        setNombre(profile?.nombre);
        setPlan(profile?.plan);

        const iniciales = profile?.nombre?.charAt(0) ?? ""
        setIniciales(iniciales.toUpperCase());
        
        console.log("profile", profile)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  console.log("nombre:", nombre)
  console.log("plan:", plan)
  
  const pathname = usePathname();
  const router = useRouter();

  const navClass = (href: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors ${
      pathname === href
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`;


  return (
    <aside className="w-60 h-screen flex flex-col px-3 py-5 bg-[#13131f] border-r border-[#2e2e42]">

        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-7">
            <div className="w-7 h-7 rounded-lg bg-[#5a5a88] flex items-center justify-center">
                <IconLayoutDashboard size={15} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-[#e8e8f0] tracking-wide">Gestio</span>
        </div>

        {/* Home / Nav principal */}
        {navItems.map((item) => (
            <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={navClass(item.href)}
            >
                <item.icon size={16} />
                {item.label}
            </button>
        ))}

        {/* Gestión */}
        <p className="text-[10px] font-semibold text-[#6e6e88] uppercase tracking-widest px-2 mt-6 mb-1">
            Gestión
        </p>
        {gestionItems.map((item) => (
            <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={navClass(item.href)}
            >
                <item.icon size={16} />
                {item.label}
            </button>
        ))}

        <div className="flex-1" />

        {/* Upgrade */}
        <div className="bg-[#1e1e2e] border border-[#2e2e42] rounded-xl p-3 mb-4">
            <p className="text-[11px] text-[#6e6e88] leading-relaxed mb-2.5">
                Estás en el plan gratuito. Desbloquea más clientes e importaciones.
            </p>
            <button className="w-full flex items-center justify-center gap-1.5 bg-[#e8e8f0] text-[#13131f] text-xs font-semibold py-2 rounded-lg hover:bg-white transition-colors duration-150">
                <IconStar size={13} />
                Obtener Plus
            </button>
        </div>

        {/* Cuenta */}
        <p className="text-[10px] font-semibold text-[#6e6e88] uppercase tracking-widest px-2 mb-1">
            Cuenta
        </p>
        <button
            onClick={() => router.push("/dashboard/configuracion")}
            className={navClass("/dashboard/configuracion")}
        >
            <IconSettings size={16} />
            Configuración
        </button>

        <hr className="my-3 border-[#2e2e42]" />

        {/* Usuario */}
        <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-[#2a2a3e] border border-[#3e3e58] text-[#a0a0b8] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {iniciales}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#e8e8f0] truncate">{nombre}</p>
                <p className="text-xs text-[#6e6e88]">Plan {plan}</p>
            </div>
            <IconChevronUp size={14} className="text-[#6e6e88] flex-shrink-0" />
        </div>

    </aside>
);
}