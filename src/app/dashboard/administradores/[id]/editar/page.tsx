import { EditAdminForm } from '@/features/administrators/components/EditAdminForm';

export default async function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <EditAdminForm id={id} />;
}
