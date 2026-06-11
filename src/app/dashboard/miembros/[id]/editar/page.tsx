import { EditarMiembroForm } from '@/features/members/components/editar-miembro-form';

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <EditarMiembroForm id={id} />;
}
