import { NewMemberForm } from '@/features/members/components/NewMemberForm';

export default function NewMemberPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-text-main">
          Registrar Nuevo Miembro
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Ingrese los datos del alumno y el plan a continuación.
        </p>
      </div>
      <NewMemberForm />
    </div>
  );
}
