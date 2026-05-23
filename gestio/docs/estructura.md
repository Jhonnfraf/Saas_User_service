# Estructura del proyecto

## Árbol de directorios

```
gestio/
├── docs/                           # Documentación
│   ├── arquitectura.md
│   ├── base-de-datos.md
│   ├── componentes.md
│   └── estructura.md               # Este archivo
├── public/                         # Archivos estáticos (favicon, etc.)
├── src/
│   ├── app/
│   │   ├── fonts/                  # GeistVF, GeistMonoVF
│   │   ├── globals.css
│   │   ├── layout.tsx              # HTML raíz, metadata, fuentes
│   │   ├── page.tsx                # Ruta /
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── registro/page.tsx
│   │   └── (dashboard)/
│   │       ├── layout.tsx          # Sidebar + Header + main
│   │       ├── dashboard/page.tsx
│   │       ├── clientes/
│   │       │   ├── page.tsx
│   │       │   ├── nuevo/page.tsx
│   │       │   └── importar/page.tsx
│   │       ├── servicios/page.tsx
│   │       └── facturacion/page.tsx
│   ├── components/
│   │   ├── forms/
│   │   │   ├── create_cliente.tsx  # Campos base del cliente
│   │   │   ├── create_campo.tsx    # Definición de columna personalizada
│   │   │   └── lista_campos.tsx    # Inputs dinámicos por campo
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   └── header.tsx
│   │   └── ui/
│   │       └── modal_filed.tsx     # Modal “Agregar campo”
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── server.ts
│   └── middleware.ts
├── .env.example
├── .env.local                      # Local (no versionar)
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Responsabilidades por carpeta

### `src/app`

Define las **rutas URL** mediante el sistema de archivos de Next.js. Los paréntesis en `(auth)` y `(dashboard)` son **route groups**: no aparecen en la URL pero permiten layouts distintos.

### `src/components/forms`

Formularios reutilizables sin acoplar la página al markup. El estado vive en la página padre (`nuevo/page.tsx`) y se pasa por props.

### `src/components/layout`

Shell del área autenticada: navegación lateral, cabecera con contexto de ruta y CTA de plan Plus.

### `src/components/ui`

Piezas de interfaz transversales (modales, botones compuestos). `modal_filed.tsx` exporta también el tipo `FieldTemp`.

### `src/lib/supabase`

Único punto de creación de clientes Supabase; evita duplicar configuración de cookies o variables de entorno.

## Archivos de configuración

| Archivo | Función |
|---------|---------|
| `tsconfig.json` | Strict mode, path alias `@/*` |
| `tailwind.config.ts` | Escaneo de `src/app`, `src/components` |
| `next.config.mjs` | Headers globales anti-caché |
| `postcss.config.mjs` | Pipeline Tailwind |

## Rutas vs. archivos

| Archivo | URL resultante |
|---------|----------------|
| `app/page.tsx` | `/` |
| `app/(auth)/login/page.tsx` | `/login` |
| `app/(auth)/registro/page.tsx` | `/registro` |
| `app/(dashboard)/dashboard/page.tsx` | `/dashboard` |
| `app/(dashboard)/clientes/page.tsx` | `/clientes` |
| `app/(dashboard)/clientes/nuevo/page.tsx` | `/clientes/nuevo` |
| `app/(dashboard)/clientes/importar/page.tsx` | `/clientes/importar` |
| `app/(dashboard)/servicios/page.tsx` | `/servicios` |
| `app/(dashboard)/facturacion/page.tsx` | `/facturacion` |
