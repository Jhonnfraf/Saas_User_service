# Gestio

Aplicación web SaaS para la gestión de clientes, servicios y facturación orientada a pequeñas empresas y autónomos. Permite registrar usuarios, administrar un directorio de clientes con campos personalizados e importación masiva (en desarrollo).

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Documentación adicional](#documentación-adicional)
- [Scripts disponibles](#scripts-disponibles)
- [Estado del proyecto](#estado-del-proyecto)

## Características

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| Autenticación | Implementado | Registro e inicio de sesión con Supabase Auth |
| Perfiles de usuario | Implementado | Datos de negocio guardados en tabla `profiles` |
| Dashboard | Parcial | Vista principal con selector de mes |
| Clientes — listado | Parcial | Tabla con datos de ejemplo; paginación simulada |
| Clientes — alta | Parcial | Formulario con persistencia en Supabase; campos personalizados solo en UI |
| Clientes — importar CSV | Pendiente | Página placeholder; dependencia `papaparse` instalada |
| Servicios | Pendiente | Página placeholder |
| Facturación | Pendiente | Página placeholder |
| Plan Plus | UI | Banners en sidebar y header; sin integración de pagos |

## Stack tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje:** TypeScript
- **UI:** React 18, Tailwind CSS 3
- **Iconos:** Tabler Icons, Lucide React
- **Backend / Auth / DB:** [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`)
- **Gráficos:** Recharts (previsto para el dashboard)
- **CSV:** PapaParse (previsto para importación)

## Requisitos previos

- Node.js 18 o superior
- npm, yarn, pnpm o bun
- Proyecto en [Supabase](https://supabase.com/) con Auth habilitado y tablas `profiles` y `clients` (ver [docs/base-de-datos.md](./docs/base-de-datos.md))

## Instalación y ejecución

```bash
# Clonar o entrar al directorio del proyecto
cd gestio

# Instalar dependencias
npm install

# Configurar variables de entorno (ver sección siguiente)
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

```bash
# Build de producción
npm run build
npm start

# Linter
npm run lint
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública anónima (segura en el cliente con RLS activo) |

> No subas `.env.local` al repositorio. Usa `.env.example` como plantilla.

## Estructura del proyecto

```
gestio/
├── docs/                    # Documentación detallada
├── public/                  # Assets estáticos
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login y registro
│   │   ├── (dashboard)/     # Área autenticada (layout con sidebar)
│   │   ├── layout.tsx       # Layout raíz
│   │   └── page.tsx         # Landing
│   ├── components/
│   │   ├── forms/           # Formularios reutilizables
│   │   ├── layout/          # Sidebar y header
│   │   └── ui/              # Componentes UI (modales, etc.)
│   ├── lib/supabase/        # Clientes Supabase (browser y server)
│   └── middleware.ts        # Protección de rutas
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

Detalle completo en [docs/estructura.md](./docs/estructura.md).

## Rutas de la aplicación

| Ruta | Grupo | Descripción |
|------|-------|-------------|
| `/` | Público | Página de inicio con enlace a registro |
| `/login` | Auth | Inicio de sesión |
| `/registro` | Auth | Alta de usuario y perfil |
| `/dashboard` | Dashboard | Panel principal |
| `/clientes` | Dashboard | Listado de clientes |
| `/clientes/nuevo` | Dashboard | Crear cliente |
| `/clientes/importar` | Dashboard | Importar CSV |
| `/servicios` | Dashboard | Servicios (pendiente) |
| `/facturacion` | Dashboard | Facturación (pendiente) |

Flujos de autenticación y middleware: [docs/arquitectura.md](./docs/arquitectura.md).

## Documentación adicional

| Documento | Contenido |
|-----------|-----------|
| [docs/arquitectura.md](./docs/arquitectura.md) | Capas, auth, middleware, convenciones |
| [docs/estructura.md](./docs/estructura.md) | Árbol de carpetas y responsabilidades |
| [docs/base-de-datos.md](./docs/base-de-datos.md) | Tablas Supabase y relaciones |
| [docs/componentes.md](./docs/componentes.md) | Componentes React y props |

## Scripts disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo (puerto 3000) |
| `npm run build` | Compilación para producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint con `eslint-config-next` |

## Estado del proyecto

Versión **0.1.0** — proyecto en desarrollo activo. Parte del ecosistema **Saas_User_service** (repositorio padre). La documentación refleja el código actual; algunas rutas del dashboard aún no están cubiertas por el middleware de autenticación (solo `/dashboard` y subrutas). Consulta [docs/arquitectura.md](./docs/arquitectura.md) para más detalle.

## Licencia

Proyecto privado (`"private": true` en `package.json`).
