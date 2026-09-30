import { Suspense } from 'react';
import { Metadata } from 'next';
import { CreateMemberButton } from '@/features/members/components/CreateMemberButton';
import { MembersDirectory } from '@/features/members/components/MembersDirectory';
import { TableSkeleton } from '@/common/components/ui/skeletons/TableSkeleton';

export const metadata: Metadata = {
  title: 'Directorio de Miembros | GymAdmin',
  description: 'Gestión y administración de miembros, suscripciones y pagos del gimnasio.',
};

export default function MembersPage() {
  return (
    <main className="flex flex-col gap-6" aria-labelledby="members-page-title">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 id="members-page-title" className="text-2xl font-bold text-text-main">
            Miembros del sistema
          </h1>
          <p className="text-sm text-text-muted transition-colors">
            Administre todas las membresías activas e inactivas del gimnasio y la información de los socios.
          </p>
        </div>

        <CreateMemberButton />
      </header>

      <Suspense fallback={<TableSkeleton />}>
        <MembersDirectory />
      </Suspense>
    </main>
  );
}
