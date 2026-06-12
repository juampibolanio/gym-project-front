import { EditAdminForm } from '@/features/administrators/components/EditAdminForm';

export default async function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-text-main">Editar Administrador</h1>
        <p className="text-sm text-text-muted mt-1">
          Modificá los datos del administrador secundario o cambialo a inactivo (baja).
        </p>
      </div>
      <EditAdminForm id={id} />
    </div>
  );
}
