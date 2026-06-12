import { NewAdminForm } from '@/features/administrators/components/NewAdminForm';

export default function NuevoAdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-text-main">Agregar Nuevo Administrador</h1>
        <p className="text-sm text-text-muted mt-1">
          Completá los datos del administrador secundario para crear su cuenta.
        </p>
      </div>
      <NewAdminForm />
    </div>
  );
}
