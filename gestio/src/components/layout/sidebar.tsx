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
} from "@tabler/icons-react";

const navItems = [
  { label: "Home", icon: IconHome, href: "/dashboard" },
];

const gestionItems = [
  { label: "Clientes", icon: IconUsers, href: "/clientes" },
  { label: "Servicios", icon: IconBriefcase, href: "/servicios" },
  { label: "Facturación", icon: IconFileInvoice, href: "/facturacion" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navClass = (href: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors ${
      pathname === href
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <aside className="w-60 h-screen flex flex-col px-3 py-5 border-r border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-7">
        <IconLayoutDashboard size={20} className="text-blue-500" />
        <span className="text-base font-medium">Gestio</span>
      </div>

      {/* Home */}
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={() => router.push(item.href)}
          className={navClass(item.href)}
        >
          <item.icon size={18} />
          {item.label}
        </button>
      ))}

      {/* Gestión */}
      <p className="text-xs text-gray-400 uppercase tracking-wide px-2 mt-5 mb-1">
        Gestión
      </p>
      {gestionItems.map((item) => (
        <button
          key={item.href}
          onClick={() => router.push(item.href)}
          className={navClass(item.href)}
        >
          <item.icon size={18} />
          {item.label}
        </button>
      ))}

      <div className="flex-1" />

      {/* Upgrade */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-500 mb-2">
          Estás en el plan gratuito. Desbloquea más clientes e importaciones.
        </p>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-xs font-medium py-2 rounded-lg">
          <IconStar size={14} />
          Obtener Plus
        </button>
      </div>

      {/* Cuenta */}
      <p className="text-xs text-gray-400 uppercase tracking-wide px-2 mb-1">
        Cuenta
      </p>
      <button
        onClick={() => router.push("/dashboard/configuracion")}
        className={navClass("/dashboard/configuracion")}
      >
        <IconSettings size={18} />
        Configuración
      </button>

      <hr className="my-3 border-gray-100" />

      {/* Usuario */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
          CM
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">Carlos Mendes</p>
          <p className="text-xs text-gray-400">Plan gratuito</p>
        </div>
      </div>
    </aside>
  );
}