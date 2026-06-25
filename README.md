<p align="center">
  <a href="#" target="blank"><img src="https://res.cloudinary.com/dpxjhrv8s/image/upload/v1781116599/content_nhqpva.webp" width="220" alt="ChacuGym Logo" /></a>
</p>

<h1 align="center">ChacuGym - Frontend</h1>

<p align="center">
  <strong>El futuro de la gestión de gimnasios.</strong>
  <br />
  Interfaz de usuario para la administración integral de gimnasios.
</p>

<p align="center">
    <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/framework-Next.js-black.svg" alt="Framework Next.js">
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/styling-Tailwind_CSS-38B2AC.svg" alt="Styling Tailwind CSS">
  </a>
    <a href="https://tanstack.com/query/latest" target="_blank">
    <img src="https://img.shields.io/badge/data_fetching-TanStack_Query-FF4154.svg" alt="TanStack Query">
  </a>
  <a href="https://zustand.docs.pmnd.rs/" target="_blank">
    <img src="https://img.shields.io/badge/state-Zustand-orange.svg" alt="State Zustand">
  </a>
</p>

---

## Descripción

**ChacuGym Frontend** es la aplicación cliente web diseñada para interactuar con la API de ChacuGym.

### Características Principales
- **Dashboard:** Visualización del estado del gimnasio, miembros activos y próximos vencimientos.
- **Gestión Visual de Socios:** Tablas dinámicas con paginación, filtros y acciones rápidas (dar de baja, editar, ver detalles).
- **Control de Membresías:** Interfaz para asignar planes, renovar suscripciones y visualizar el progreso de los pagos.
- **Seguridad en el Cliente:** Rutas protegidas e interceptores de red para el manejo de sesiones con JWT.

### Stack Tecnológico
- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS
- **Peticiones HTTP & Caché:** Axios & TanStack Query (React Query)
- **Manejo de Estado Global:** Zustand
- **Formularios & Validación:** React Hook Form & Zod
- **Iconos:** Lucide React

## Puesta en Marcha (Modo Desarrollo)

Seguir esta guía paso a paso para configurar y ejecutar el proyecto frontend en el entorno local.

### Prerrequisitos
Tener instalado el siguiente software:
- [Node.js](https://nodejs.org/es/) (v18 o superior)
- [Git](https://git-scm.com/)
- El backend de ChacuGym (NestJS) ejecutándose localmente.

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Manuel0803/gym-project-front.git]
    cd frontend-chacugym
    ```

2.  **Configurar las variables de entorno:**
    Crear un archivo `.env` o `.env.local` en la raíz del proyecto basándose en un el archivo .env de ejemplo.
    ```bash
    touch .env
    ```
    Abrir el archivo `.env` y configurar la URL base que apuntará a la API de NestJS.
    ```env
    # URL del Backend de ChacuGym
    NEXT_PUBLIC_API_URL="http://localhost:3000"
    ```

3.  **Instalar las dependencias del proyecto:**
    ```bash
    pnpm install
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    pnpm run dev
    ```

La aplicación estará corriendo y accesible desde el navegador en **`http://localhost:3000`** (o en el puerto `3001` si el `3000` está siendo ocupado por el backend).

## Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo de desarrollo con Hot Module Replacement (HMR).
- `npm run build`: Compila la aplicación y genera una versión optimizada para producción.
- `npm run start`: Inicia el servidor de Next.js en modo producción (requiere haber ejecutado el build previamente).
- `npm run lint`: Ejecuta ESLint para buscar y advertir sobre errores en el código según las reglas de calidad configuradas.