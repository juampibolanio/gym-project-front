import { Bell, HelpCircle, LayoutDashboard, Users, CreditCard, ClipboardList, Settings } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#1c1c1c] text-zinc-900 dark:text-white flex font-sans transition-colors">
      
      <aside className="w-[260px] bg-white dark:bg-[#131313] border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shrink-0 transition-colors">
        
        <div className="flex flex-col">
          <div className="h-20 flex flex-col justify-center px-8 border-b border-zinc-200 dark:border-zinc-800">
            <span className="font-bold text-xl text-zinc-900 dark:text-white tracking-wide">GymSystem</span>
            <span className="text-[9px] text-zinc-500 font-bold tracking-widest mt-1">ADMIN TERMINAL</span>
          </div>

          <nav className="flex flex-col mt-6 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-4 px-8 py-3 bg-emerald-50 dark:bg-[#1a2e22] border-l-2 border-emerald-500 text-emerald-700 dark:text-white transition-colors">
              <LayoutDashboard size={18} className="text-emerald-600 dark:text-emerald-500" />
              <span className="font-medium text-sm">Dashboard</span>
            </Link>

            <Link href="/dashboard/miembros" className="flex items-center gap-4 px-8 py-3 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-transparent hover:text-zinc-900 dark:hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
              <Users size={18} />
              <span className="font-medium text-sm">Miembros</span>
            </Link>

            <Link href="/dashboard/pagos" className="flex items-center gap-4 px-8 py-3 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-transparent hover:text-zinc-900 dark:hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
              <CreditCard size={18} />
              <span className="font-medium text-sm">Pagos</span>
            </Link>

            <Link href="/dashboard/planes" className="flex items-center gap-4 px-8 py-3 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-transparent hover:text-zinc-900 dark:hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
              <ClipboardList size={18} />
              <span className="font-medium text-sm">Planes</span>
            </Link>
            
            <Link href="/dashboard/configuracion" className="flex items-center gap-4 px-8 py-3 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-transparent hover:text-zinc-900 dark:hover:text-white transition-colors border-l-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
              <Settings size={18} />
              <span className="font-medium text-sm">Configuración</span>
            </Link>
          </nav>
        </div>

        <div className="px-6 pb-6">
          <button className="w-full py-2.5 bg-emerald-700 dark:bg-[#2d5f43] hover:bg-emerald-800 dark:hover:bg-[#244f36] text-white font-medium text-sm transition-colors rounded-sm shadow-sm dark:shadow-none">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        
        <header className="h-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1c1c1c] flex items-center justify-end px-8 transition-colors">
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors">
              <Bell size={18} />
            </button>
            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors">
              <HelpCircle size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
              <Users size={16} className="text-zinc-500 dark:text-zinc-400" />
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
