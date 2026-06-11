import Link from 'next/link';
import { AdminList } from '@/features/administrators/components/AdminList';

const mockAdmins: { name: string; adminID: string; status: 'Activo' | 'Inactivo'; rol: string; email: string }[] = [
  { name: 'Juan Perez', adminID: 'ADM-001', status: 'Activo', rol: 'Administrador designado', email: 'juan.perez@gymsystem.com' },
  { name: 'Maria Gonzalez', adminID: 'ADM-002', status: 'Activo', rol: 'Administrador designado', email: 'maria.gonzalez@gymsystem.com' },
  { name: 'Carlos Sanchez', adminID: 'ADM-003', status: 'Inactivo', rol: 'Administrador designado', email: 'carlos.sanchez@gymsystem.com' },
];

export default function AdministradoresPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Administradores</h1>
          <p className="text-sm text-text-muted mt-1">
            Gestione a los administradores secundarios del sistema.
          </p>
        </div>
        <Link 
          href="/dashboard/administradores/nuevo" 
          className="px-4 py-2 bg-brand-main hover:bg-brand-hover text-white rounded text-xs font-bold transition-colors shadow-sm dark:shadow-none uppercase tracking-widest"
        >
          Nuevo Admin
        </Link>
      </div>

      <div className="bg-surface border border-border-primary rounded-lg flex flex-col">
        <div className="grid grid-cols-[2fr_1fr_1fr_2fr_100px] px-5 py-4 border-b border-border-primary text-[10px] font-bold text-text-muted tracking-widest uppercase">
          <div>ADMINISTRADOR E ID</div>
          <div>ESTADO</div>
          <div>ROL</div>
          <div>EMAIL</div>
          <div>ACCIONES</div>
        </div>

        <div className="flex flex-col">
          {mockAdmins.map((admin) => (
            <AdminList 
              key={admin.adminID}
              name={admin.name}
              adminID={admin.adminID}
              status={admin.status}
              rol={admin.rol}
              email={admin.email}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
