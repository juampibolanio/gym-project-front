<p align="center">
  <a href="#" target="blank"><img src="https://res.cloudinary.com/dpxjhrv8s/image/upload/v1781116599/content_nhqpva.webp" width="220" alt="ChacuGym Logo" /></a>
</p>

<h1 align="center">ChacuGym - Frontend Client (Web Application)</h1>

<p align="center">
  <strong>Plataforma web de administración y gestión integral para gimnasios y centros deportivos.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/TanStack_Query-5.x-FF4154?logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zustand-5.x-4338CA?logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Tests-111%20Passing-brightgreen?logo=vitest&logoColor=white" alt="Tests 111 Passing" />
  <img src="https://img.shields.io/badge/Playwright-E2E-45ba4b?logo=playwright&logoColor=white" alt="Playwright E2E" />
</p>

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura y Estructura del Proyecto](#arquitectura-y-estructura-del-proyecto)
- [Módulos del Sistema](#módulos-del-sistema)
- [Prerrequisitos](#prerrequisitos)
- [Puesta en Marcha (Entorno Local)](#puesta-en-marcha-entorno-local)
- [Variables de Entorno](#variables-de-entorno)
- [Estrategia y Batería de Pruebas](#estrategia-y-batería-de-pruebas)
- [Scripts del Proyecto](#scripts-del-proyecto)
- [Compilación y Despliegue en Producción](#compilación-y-despliegue-en-producción)

---

## Descripción General

**ChacuGym Frontend** es la aplicación cliente web de alto rendimiento diseñada para la administración integral de gimnasios en un ecosistema **SaaS Multi-Tenant**. Construida sobre **Next.js 16 (App Router)** y **React 19**, se comunica con la API de ChacuGym (`NestJS + Prisma + PostgreSQL 18`) para proporcionar una experiencia fluida, reactiva y accesible.

### Puntos Destacados

- **Arquitectura React 19 & Turbopack:** Renderizado híbrido optimizado con Server y Client Components, compilación ultra-rápida y cero fallos en revalidaciones dinámicas.
- **Sesión y Control de Acceso Resilientes:** Protección de rutas mediante `RoleGuard` resistente a desincronizaciones de hidratación (`isHydrated`), gestión de tokens JWT con persistencia en Zustand (`auth-storage`) e interceptores Axios tolerantes a fallos.
- **Rendimiento y Optimización de Bundles:** Carga perezosa dinámica (`next/dynamic`) de bibliotecas gráficas pesadas (Apache ECharts), erradicación de fugas de memoria en listeners de eventos y liberación estricta de blobs multimedia.
- **Accesibilidad (WCAG 2.1 AA):** Componentes interactivos como `<Modal />` equipados con trampa de foco nativa (_focus trap_), soporte completo de teclado (`Tab`, `Escape`) y contraste calibrado en modos claro y oscuro.
- **Blindaje con Pruebas Automatizadas:** Pirámide de pruebas con **111 tests pasando en verde** que combinan validaciones Zod, hooks, integración con MSW v2 y flujos E2E con Playwright Chromium.

---

## Arquitectura y Estructura del Proyecto

El proyecto adopta una arquitectura orientada a características (**Feature-Driven Architecture**), desacoplando los dominios de negocio de los componentes comunes y adaptadores de infraestructura:

```
src/
├── app/                          # Next.js App Router (Páginas, layouts y error boundaries)
│   ├── (auth)/login/             # Flujo de autenticación
│   ├── dashboard/                # Vistas protegidas (miembros, planes, reportes, admins)
│   ├── error.tsx                 # Error boundary de segmento raíz
│   └── global-error.tsx          # Error boundary fatal para el root layout
├── common/                       # Componentes, hooks y utilidades transversales
│   ├── components/layout/        # Header, Sidebar, búsqueda global y temas
│   ├── components/ui/            # Componentes atómicos (Modal, InputField, TableSkeleton)
│   ├── hooks/                    # Hooks reutilizables (useDebounce, useFloatingDropdown)
│   └── utils/                    # Utilidades puras de fechas y formateadores de moneda
├── core/                         # Infraestructura central y adaptadores de red
│   └── api/                      # AxiosAdapter e interceptores de refresh token
└── features/                     # Módulos de negocio aislados
    ├── administrators/           # Gestión de usuarios del sistema y roles
    ├── auth/                     # Autenticación, guards (RoleGuard) y Zustand auth store
    ├── gym/                      # Información del gimnasio y configuración tenant
    ├── members/                  # Directorio, perfiles, socios y subscripciones
    ├── payments/                 # Registro de cobros, métodos de pago e historial
    └── plans/                    # Catálogo de planes de membresía y precios
e2e/                              # Pruebas End-to-End con Playwright
tests/                            # Configuración de pruebas unitarias/integración (MSW v2, setup)
```

---

## Módulos del Sistema

| Módulo              | Ruta de Acceso               | Roles Permitidos               | Funcionalidad Principal                                                                        |
| :------------------ | :--------------------------- | :----------------------------- | :--------------------------------------------------------------------------------------------- |
| **Autenticación**   | `/login`                     | Público / Invitado             | Acceso seguro con validación Zod, persistencia de sesión JWT y manejo de subdominio tenant.    |
| **Dashboard**       | `/dashboard`                 | `ADMIN`, `SUPER_ADMIN`         | Métricas en tiempo real: socios activos, ingresos mensuales, vencimientos y flujo de ingresos. |
| **Miembros**        | `/dashboard/miembros`        | `ADMIN`, `SUPER_ADMIN`, `USER` | Directorio con búsqueda reactiva, filtros de estado, alta de socios y detalle de legajo.       |
| **Planes**          | `/dashboard/planes`          | `ADMIN`, `SUPER_ADMIN`         | Catálogo de membresías, precios formateados en ARS, duraciones y creación de nuevos planes.    |
| **Pagos**           | `/dashboard/miembros/[id]`   | `ADMIN`, `SUPER_ADMIN`, `USER` | Historial contable de cobros, anulación segura y emisión de recibos.                           |
| **Administradores** | `/dashboard/administradores` | `SUPER_ADMIN`                  | Gestión y control de operadores y permisos del gimnasio.                                       |
| **Configuración**   | `/dashboard/configuracion`   | `ADMIN`, `SUPER_ADMIN`         | Parámetros del gimnasio, personalización visual y perfiles.                                    |

---

## Prerrequisitos

Asegúrate de contar con las siguientes herramientas en tu entorno:

- **Node.js** `>= 20.9.0` (Recomendado **v22 LTS**)
- **pnpm** `>= 10.x` o `11.x`
- **Git**
- El backend de ChacuGym ejecutándose o una URL de API válida.

---

## Puesta en Marcha (Entorno Local)

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Manuel0803/gym-project-front.git
cd gym-project-front
```

### 2. Configurar variables de entorno

Crea el archivo `.env` a partir del archivo de ejemplo:

```bash
cp .env.example .env
```

Configura la URL base que apunta a la API backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### 3. Instalar las dependencias

```bash
pnpm install
```

> [!TIP]
> Si ejecutas pruebas con Playwright por primera vez en este equipo, instala los binarios del navegador Chromium:
>
> ```bash
> pnpm exec playwright install chromium
> ```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación quedará disponible en **`http://localhost:3000`** (o `http://localhost:3001` si el puerto 3000 está ocupado).

---

## Variables de Entorno

| Variable              | Descripción                                                  | Valor de Ejemplo               |
| :-------------------- | :----------------------------------------------------------- | :----------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base del backend NestJS incluyendo el prefijo `/api/v1`. | `http://localhost:3000/api/v1` |

---

## Estrategia y Batería de Pruebas

El proyecto cuenta con una pirámide de pruebas robusta y automatizada compuesta por **111 pruebas en verde**:

```
--------------------------------------------------------------------------------
Categoría               Herramienta                Tests     Resultado
--------------------------------------------------------------------------------
Unitarias Zod & Utils   Vitest                     48        100% Passed
Hooks & Estado Global   Vitest + Zustand           17        100% Passed
Integración Componentes Vitest + RTL + MSW v2      30        100% Passed
End-to-End (E2E)        Playwright (Chromium)      16        100% Passed
--------------------------------------------------------------------------------
TOTAL                                              111       100% Green
--------------------------------------------------------------------------------
```

### Ejecución de Pruebas Unitarias y de Integración (Vitest)

```bash
# Modo ejecución única
pnpm test

# Modo observador continuo (TDD)
pnpm test:watch
```

### Ejecución de Pruebas End-to-End (Playwright)

```bash
# Ejecutar todas las pruebas E2E en consola
pnpm test:e2e

# Abrir el entorno visual interactivo de Playwright
pnpm test:e2e:ui
```

---

## Scripts del Proyecto

| Comando            | Descripción                                                             |
| :----------------- | :---------------------------------------------------------------------- |
| `pnpm dev`         | Inicia el servidor de desarrollo con Next.js y Turbopack.               |
| `pnpm build`       | Compila la aplicación y genera la versión optimizada de producción.     |
| `pnpm start`       | Inicia el servidor Node.js en modo producción.                          |
| `pnpm lint`        | Ejecuta ESLint 9 para auditar la calidad del código.                    |
| `pnpm format`      | Formatea el código con Prettier según las reglas del proyecto.          |
| `pnpm test`        | Ejecuta la batería de 95 pruebas unitarias y de integración con Vitest. |
| `pnpm test:watch`  | Ejecuta Vitest en modo interactivo y escucha cambios en archivos.       |
| `pnpm test:e2e`    | Ejecuta la batería de 16 pruebas End-to-End en Chromium.                |
| `pnpm test:e2e:ui` | Abre la interfaz gráfica de Playwright para depurar flujos visuales.    |

---

## Compilación y Despliegue en Producción

Para validar o generar la compilación de producción:

```bash
# 1. Comprobar tipos TypeScript
pnpm tsc --noEmit

# 2. Generar el build optimizado
pnpm build

# 3. Iniciar el servicio productivo
pnpm start
```

---

<p align="center">
  Desarrollado para la administración y evolución digital de centros deportivos.
</p>
