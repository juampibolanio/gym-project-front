'use client';

import { useRole } from '@/features/auth/hooks/useRole';
import Link from 'next/link';

export default function CreatePlanButton() {
  const { isAdmin } = useRole();

  return (
    <>
      {isAdmin && (
        <Link
          href="/dashboard/planes/nuevo"
          className="bg-brand-main hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center"
        >
          + Nuevo Plan
        </Link>
      )}
    </>
  );
}
//testing