import { EditPlanForm } from '@/features/plans/components/EditPlanForm';

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col bg-background gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text-main">Editar Plan</h1>
        <p className="text-sm text-text-muted">Edite la información del plan</p>
      </div>
      <EditPlanForm id={id} />
    </div>
  );
}
