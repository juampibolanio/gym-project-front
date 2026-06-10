'use client';

import { Bell, LayoutDashboard, Users, ClipboardList, Settings, Plus, Search, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

const SEARCH_CONFIG: Record<string, { placeholder: string }> = {
  '/dashboard/miembros': {
    placeholder: 'Buscar miembros, IDs o planes...',
  },
  '/dashboard/administradores': {
    placeholder: 'Buscar administradores, rol o estado...',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Miembros', href: '/dashboard/miembros', icon: Users },
    { name: 'Administradores', href: '/dashboard/administradores', icon: Shield },
    { name: 'Planes', href: '/dashboard/planes', icon: ClipboardList },
    { name: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col md:flex-row transition-colors">
      
      <aside className="w-65 bg-sidebar border-r border-border-primary flex flex-col justify-between shrink-0 transition-colors">
        
        <div className="flex flex-col">
          <div className="h-20 flex flex-col justify-center px-8 border-b border-border-primary">
            <span className="font-bold text-xl text-text-main tracking-wide">GymSystem</span>
            <span className="text-[9px] text-text-muted font-bold tracking-widest mt-1">ADMIN TERMINAL</span>
          </div>

          <nav className="flex flex-col mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
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
                  <Icon size={18} className={isActive ? 'text-brand-main' : ''} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-4">
          {pathname === '/dashboard/miembros' && (
            <Link 
              href='/dashboard/miembros/nuevo'
              className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm shadow-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Agregar nuevo miembro
            </Link>
          )}
          {pathname === '/dashboard/administradores' && (
            <Link 
              href='/dashboard/administradores/nuevo'
              className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm shadow-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Agregar nuevo admin
            </Link>
          )}
          <button className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm shadow-sm dark:shadow-none">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        
        <header className="h-20 border-b border-border-primary bg-background flex items-center px-8 transition-colors">

          {(pathname === '/dashboard/miembros' || pathname === '/dashboard/administradores') && (
            <div className="flex items-center gap-3 bg-surface border border-border-primary rounded-md px-4 py-2 w-96 focus-within:border-brand-main transition-colors">
              <Search size={16} className="text-text-muted" />
              <input 
                  type="text" 
                  placeholder={SEARCH_CONFIG[pathname]?.placeholder || "Buscar..."}
                  className="bg-transparent border-none outline-none text-sm text-text-main w-full placeholder:text-text-muted"
              />
            </div>
          )}

          <div className="flex items-center gap-6 ml-auto">
            <ThemeToggle />
            <button className="text-text-muted hover:text-text-main transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
      
    </div>
  );
}
