import { Metadata } from 'next';
import { EditMemberForm } from '@/features/members/components/EditMemberForm';

export const metadata: Metadata = {
  title: 'Editar Miembro | GymAdmin',
  description: 'Modificar los datos personales, de contacto y médicos del socio.',
};

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <main className="flex flex-col gap-6" aria-labelledby="edit-member-title">
      <header className="flex flex-col">
        <h1 id="edit-member-title" className="text-2xl font-bold text-text-main">
          Editar Miembro
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Modificá los datos del alumno y actualizá su información a continuación.
        </p>
      </header>
      
      <EditMemberForm id={id} />
    </main>
  );
}
