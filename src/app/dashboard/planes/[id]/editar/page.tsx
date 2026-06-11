import { EditarPlanForm } from '@/features/plans/components/editar-plan-form';

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <EditarPlanForm id={id} />;
}