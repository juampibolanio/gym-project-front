import { Metadata } from 'next';
import { NewMemberForm } from '@/features/members/components/NewMemberForm';

export const metadata: Metadata = {
  title: 'Nuevo Miembro | GymAdmin',
  description: 'Registrar un nuevo miembro en el sistema del gimnasio.',
};

export default function NewMemberPage() {
  return (
    <main className="flex flex-col gap-6" aria-labelledby="new-member-title">
      <header className="flex flex-col">
        <h1 id="new-member-title" className="text-2xl font-bold text-text-main">
          Registrar Nuevo Miembro
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Ingrese los datos del alumno y configure su perfil a continuación.
        </p>
      </header>
      
      <NewMemberForm />
    </main>
  );
}
