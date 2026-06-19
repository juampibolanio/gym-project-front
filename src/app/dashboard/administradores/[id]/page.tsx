import Link from 'next/link';
import { ArrowLeft, Pencil, User } from 'lucide-react';

export default async function AdminDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const admin = {
    id: id,
    name: 'Juan',
    surname: 'Perez',
    email: 'juan.perez@gymsystem.com',
    status: 'activo',
    rol: 'Administrador designado',
    phoneNumber: '+1 555-123-4567',
    startDate: '2026-01-15',
    notas: 'Encargado principal del turno mañana.',
  };

  return (
    <section>
      <Link
        href="/dashboard/administradores"
        className="flex text-text-muted uppercase text-xs font-bold items-center gap-1 mb-4 hover:text-text-main transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Volver a la lista de administradores</span>
      </Link>

      <div className="flex justify-between items-center border-b-2 border-border-primary pb-4 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-text-main font-bold">
            {admin.name} {admin.surname}
          </h1>
          <p className="text-sm text-text-muted">ID: {admin.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto p-4 mt-4">
        <div className="lg:col-span-1 bg-surface border border-border-primary rounded-lg p-6 flex flex-col  transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-text-main">
              Perfil del Admin
            </span>
            {admin.status === 'activo' ? (
              <span className="px-2.5 py-1 rounded-md border border-success-main/30 bg-success-surface text-success-main text-[10px] font-bold tracking-widest uppercase">
                ACTIVO
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md border border-border-primary bg-surface-hover text-text-muted text-[10px] font-bold tracking-widest uppercase">
                INACTIVO
              </span>
            )}
          </div>

          <div className="flex flex-col items-center mb-8 pt-4 border-t border-border-primary">
            <div className="w-24 h-24 bg-background border border-border-primary rounded-full flex items-center justify-center mb-4 shadow-inner">
              <User size={40} className="text-text-muted" />
            </div>
            <h2 className="text-xl font-bold text-text-main">
              {admin.name} {admin.surname}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Registrado el: 15 ene, 2026
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-border-primary pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                Email
              </span>
              <span className="text-sm text-text-main">{admin.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                Teléfono
              </span>
              <span className="text-sm text-text-main">
                {admin.phoneNumber}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-border-primary">
            <Link
              href={`/dashboard/administradores/${admin.id}/editar`}
              className="w-full py-2.5 bg-transparent border border-border-primary hover:bg-surface-hover text-text-main font-medium text-sm transition-colors rounded-sm  flex items-center justify-center gap-2"
            >
              <Pencil size={16} /> Editar datos
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-surface border border-border-primary  rounded-lg p-6 flex justify-between items-center transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                Rol Asignado
              </span>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-2xl font-bold text-text-main">
                  {admin.rol}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-primary  rounded-lg p-6 flex flex-col transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                Notas Internas
              </span>
              <p className="text-sm text-text-main mt-2 leading-relaxed">
                {admin.notas}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
