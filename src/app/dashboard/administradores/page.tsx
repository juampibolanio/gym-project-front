import { RoleGuard } from '@/features/auth/components/RoleGuard';
import { AdminTable } from '../../../features/administrators/components/AdminTable';
import Link from 'next/link';

export default function AdministratorsPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'superadmin']}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-main">
              Administradores
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Gestione a los administradores secundarios del sistema.
            </p>
          </div>
          <Link
            href="/dashboard/administradores/nuevo"
            className="bg-brand-main hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center"
          >
            + Nuevo Admin
          </Link>
        </div>

        <AdminTable />
      </div>
    </RoleGuard>
  );
}
