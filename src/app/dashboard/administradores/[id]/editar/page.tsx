import { EditarAdminForm } from '@/components/administradores/editar-admin-form';

export default async function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <EditarAdminForm id={id} />;
}
