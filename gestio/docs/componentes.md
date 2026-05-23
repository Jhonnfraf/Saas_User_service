# Componentes

Referencia de los componentes React principales y su contrato de props.

## Layout

### `Sidebar` (`src/components/layout/sidebar.tsx`)

Navegación lateral del dashboard.

- **Home:** `/dashboard`
- **Gestión:** `/clientes`, `/servicios`, `/facturacion`
- **Cuenta:** enlace a `/dashboard/configuracion` (ruta aún sin página)
- Bloque promocional “Obtener Plus”
- Usuario de ejemplo hardcodeado (“Carlos Mendes”)

Cliente: `"use client"`. Usa `usePathname` y `useRouter` para resaltar la ruta activa.

### `Header` (`src/components/layout/header.tsx`)

Barra superior del área dashboard.

- Muestra el `pathname` actual
- En `/dashboard` muestra un `<select>` con meses en español
- Botón “Obtener Plus” → `/obtener-plan-plus` (ruta pendiente)

## Formularios

### `CrearClientePage` (`create_cliente.tsx`)

Campos controlados del cliente base.

| Prop | Tipo |
|------|------|
| `nombre`, `email`, `telefono`, `notas` | `string` |
| `setNombre`, `setEmail`, `setTelefono`, `setNotas` | `(v: string) => void` |

### `CrearCampo` (`create_campo.tsx`)

Formulario para definir una columna personalizada dentro del modal.

| Prop | Tipo |
|------|------|
| `nombre` | `string` |
| `tipo` | `"texto" \| "numero" \| "fecha" \| "booleano"` |
| `requerido` | `boolean` |
| `orden` / `setOrden` | opcionales |

El tipo `booleano` está en el tipo TypeScript pero no aparece como `<option>` en el select.

### `FieldList` (`lista_campos.tsx`)

Renderiza un input por cada `FieldTemp` y botón eliminar.

| Prop | Tipo |
|------|------|
| `fields` | `FieldTemp[]` |
| `onValorChange` | `(id: string, valor: string) => void` |
| `onDelete` | `(id: string) => void` |

Mapeo de `tipo` a `input type`: `numero` → `number`, `fecha` → `date`, resto → `text`.

## UI

### `ModalField` (`modal_filed.tsx`)

Modal ligero (sin portal ni overlay) para agregar campos personalizados antes de guardar el cliente.

**Exporta:**

```typescript
export interface FieldTemp {
  id: string;
  nombre: string;
  tipo: "texto" | "numero" | "fecha" | "booleano";
  requerido: boolean;
  valor: string;
}
```

| Prop | Tipo |
|------|------|
| `onAdd` | `(field: FieldTemp) => void` |

Comportamiento:

1. Botón “Agregar campo” abre el formulario `CrearCampo`.
2. “Guardar” valida nombre no vacío, genera `id` con `crypto.randomUUID()`, llama `onAdd` y limpia el estado.
3. “Cancelar” resetea y cierra.

> El nombre del archivo es `modal_filed.tsx`; el componente exportado se llama `ModalField`.

## Páginas con lógica relevante

### `clientes/page.tsx`

Exporta helpers placeholder:

- `obtenerClientes()` — vacío
- `obtenerNumeroClientes()` — retorna `100`
- `obtenerNumeroPagina()` — retorna `1`

La tabla muestra datos estáticos de ejemplo (John Doe).

### `clientes/nuevo/page.tsx`

Orquesta `CrearClientePage`, `ModalField` y `FieldList`. El `handleSubmit` persiste en Supabase pero **no** enlaza el botón de envío al formulario en el JSX actual (integración pendiente).

## Iconos

- **Tabler:** sidebar (`@tabler/icons-react`)
- **Lucide:** disponible en dependencias; uso limitado en el código actual

## Estilos

Clases Tailwind inline en páginas y layout. Variables CSS `--background` y `--foreground` en `globals.css` extendidas en `tailwind.config.ts`.
