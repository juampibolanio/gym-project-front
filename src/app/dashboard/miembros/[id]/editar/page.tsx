import { EditMemberForm } from '@/features/members/components/EditMemberForm';

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-text-main">Editar Miembro</h1>
        <p className="text-sm text-text-muted mt-1">
          Modificá los datos del alumno y el estado a continuación.
        </p>
      </div>
      <EditMemberForm id={id} />
    </div>
  );
}
