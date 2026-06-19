import { NewPlanForm } from '@/features/plans/components/NewPlanForm';

export default function CreatePlanPage() {
  return (
    <div className="flex flex-col bg-background gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text-main">Crear Nuevo Plan</h1>
        <p className="text-sm text-text-muted">
          Complete la información para crear un nuevo plan
        </p>
      </div>
      <NewPlanForm />
    </div>
  );
}
