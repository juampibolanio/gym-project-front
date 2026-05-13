import { Bell, HelpCircle, LayoutDashboard, Users, CreditCard, ClipboardList, Settings } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col md:flex-row transition-colors">
      
      <aside className="w-[260px] bg-sidebar border-r border-border-primary flex flex-col justify-between shrink-0 transition-colors">
        
        <div className="flex flex-col">
          <div className="h-20 flex flex-col justify-center px-8 border-b border-border-primary">
            <span className="font-bold text-xl text-text-main tracking-wide">GymSystem</span>
            <span className="text-[9px] text-text-muted font-bold tracking-widest mt-1">ADMIN TERMINAL</span>
          </div>

          <nav className="flex flex-col mt-6 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-4 px-8 py-3 bg-brand-surface border-l-2 border-brand-main text-text-main transition-colors">
              <LayoutDashboard size={18} className="text-brand-main" />
              <span className="font-medium text-sm">Dashboard</span>
            </Link>

            <Link href="/dashboard/miembros" className="flex items-center gap-4 px-8 py-3 text-text-muted hover:bg-surface-hover hover:text-text-main transition-colors border-l-2 border-transparent">
              <Users size={18} />
              <span className="font-medium text-sm">Miembros</span>
            </Link>

            <Link href="/dashboard/pagos" className="flex items-center gap-4 px-8 py-3 text-text-muted hover:bg-surface-hover hover:text-text-main transition-colors border-l-2 border-transparent">
              <CreditCard size={18} />
              <span className="font-medium text-sm">Pagos</span>
            </Link>

            <Link href="/dashboard/planes" className="flex items-center gap-4 px-8 py-3 text-text-muted hover:bg-surface-hover hover:text-text-main transition-colors border-l-2 border-transparent">
              <ClipboardList size={18} />
              <span className="font-medium text-sm">Planes</span>
            </Link>
            
            <Link href="/dashboard/configuracion" className="flex items-center gap-4 px-8 py-3 text-text-muted hover:bg-surface-hover hover:text-text-main transition-colors border-l-2 border-transparent">
              <Settings size={18} />
              <span className="font-medium text-sm">Configuración</span>
            </Link>
          </nav>
        </div>

        <div className="px-6 pb-6">
          <button className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm shadow-sm dark:shadow-none">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        
        <header className="h-20 border-b border-border-primary bg-background flex items-center justify-end px-8 transition-colors">
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button className="text-text-muted hover:text-text-main transition-colors">
              <Bell size={18} />
            </button>
            <button className="text-text-muted hover:text-text-main transition-colors">
              <HelpCircle size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-surface border border-border-primary flex items-center justify-center overflow-hidden">
              <Users size={16} className="text-text-muted" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
      
    </div>
  );
}
