'use client';

import Link from 'next/link';
import { useRole } from '@/features/auth/hooks/useRole';

export default function CreateMemberButton() {
  const { isAdmin } = useRole();

  return (
    <>
      {isAdmin && (
        <Link
          href="/dashboard/miembros/nuevo"
          className="bg-brand-main hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center"
        >
          + Nuevo Miembro
        </Link>
      )}
    </>
  );
}
