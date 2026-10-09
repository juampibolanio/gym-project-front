import MemberDetailClient from '@/features/members/components/MemberDetailClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Detalle del Miembro | GymAdmin',
    description: 'Información detallada, suscripciones activas e historial de pagos del socio.',
  };
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main aria-label="Vista detallada del miembro">
      <MemberDetailClient id={id} />
    </main>
  );
}
