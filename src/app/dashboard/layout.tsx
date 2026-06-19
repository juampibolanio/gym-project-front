'use client';

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  Shield,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/common/components/layout/ThemeToggle';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useRole } from '@/features/auth/hooks/useRole';
import { useGym } from '@/features/gyms/hooks/useGyms';
import { Modal } from '@/common/components/ui/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GlobalSearchInput } from '@/common/components/layout/GlobalSearchInput';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const setLogout = useAuthStore((state) => state.setLogout);
  const { isAdmin } = useRole();
  const gymDomain = useAuthStore((state) => state.user?.gymUuid);
  const { data: gymData, isLoading } = useGym(gymDomain);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    setLogout();
    toast.success('Sesión cerrada correctamente');
    router.replace('/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      exact: true,
      show: true,
    },
    { name: 'Miembros', href: '/dashboard/miembros', icon: Users, show: true },
    {
      name: 'Administradores',
      href: '/dashboard/administradores',
      icon: Shield,
      show: isAdmin,
    },
    {
      name: 'Planes',
      href: '/dashboard/planes',
      icon: ClipboardList,
      show: true,
    },
    {
      name: 'Configuración',
      href: '/dashboard/configuracion',
      icon: Settings,
      show: true,
    },
  ].filter((item) => item.show);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background text-text-main flex flex-col md:flex-row transition-colors">
        <aside className="w-65 bg-sidebar border-r border-border-primary flex flex-col justify-between shrink-0 transition-colors">
          <div className="flex flex-col">
            <div className="h-20 flex flex-col justify-center px-8 border-b border-border-primary">
              {isLoading && (
                <div className="h-4 w-24 bg-surface-hover animate-pulse rounded mb-1" />
              )}

              <span className="font-bold text-xl text-text-main tracking-wide">
                {gymData?.name}
              </span>
              <span className="text-[9px] text-text-muted font-bold tracking-widest mt-1">
                ADMIN TERMINAL
              </span>
            </div>

            <nav className="flex flex-col mt-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-8 py-3 transition-colors border-l-2 ${
                      isActive
                        ? 'bg-brand-surface border-brand-main text-text-main'
                        : 'border-transparent text-text-muted hover:bg-surface-hover hover:text-text-main'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-brand-main' : ''}
                    />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col mt-auto mb-6 space-y-1">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-4 px-8 py-3 transition-colors border-l-2 border-transparent text-text-muted hover:bg-danger-surface hover:text-danger-main hover:border-danger-main cursor-pointer w-full text-left"
            >
              <LogOut size={18} />
              <span className="font-medium text-sm">Cerrar sesión</span>
            </button>
          </div>
        </aside>

        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          title="Cerrar sesión"
        >
          <div className="flex flex-col gap-4">
            <p className="text-text-main">
              ¿Estás seguro de que deseas cerrar sesión?
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-text-main border border-border-primary hover:bg-surface-hover transition-colors rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-danger-main hover:bg-danger-hover transition-colors rounded cursor-pointer"
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </Modal>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-20 border-b border-border-primary bg-background flex items-center px-8 transition-colors">
            <Suspense fallback={<div className="w-96" />}>
              <GlobalSearchInput />
            </Suspense>

            <div className="flex items-center gap-6 ml-auto">
              <ThemeToggle />
            </div>
          </header>

          <div className="flex-1 p-8 overflow-auto">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
