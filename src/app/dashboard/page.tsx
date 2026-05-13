import { Users, Wallet, AlertTriangle, TrendingUp, Clock, MoreHorizontal } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/metric-card';
import { RenewalItem } from '@/components/dashboard/renewal-item';

export default function DashboardPage() {
  
  const renewals = [
    { id: 1, initials: 'JP', name: 'Juan Perez', plan: 'Regular', daysText: '2d', isUrgent: true },
    { id: 2, initials: 'MR', name: 'Miguel Ruiz', plan: 'Bimestral', daysText: '3d', isUrgent: true },
    { id: 3, initials: 'EL', name: 'Emma Larson', plan: 'Mensual', daysText: '5d', isUrgent: true },
    { id: 4, initials: 'DF', name: 'David Frias', plan: 'Bimestral', daysText: '7d', isUrgent: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-wide transition-colors">Vista General</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 transition-colors">Métricas en tiempo real</p>
        </div>
        <div className="px-3 py-1 bg-emerald-100 dark:bg-[#1a2e22] border border-emerald-200 dark:border-emerald-900/50 rounded text-emerald-700 dark:text-emerald-500 text-xs font-bold tracking-widest transition-colors">
          DATOS EN VIVO
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Miembros Activos"
          value="1,248"
          icon={<Users size={16} className="text-zinc-400 dark:text-zinc-500" />}
          trendText="+4.2% este mes"
          trendIcon={<TrendingUp size={12} />}
        />
        
        <MetricCard 
          title="Ingresos Mensuales"
          value="$84,200"
          icon={<Wallet size={16} className="text-emerald-600 dark:text-emerald-500 transition-colors" />}
          trendText="+12% vs ultimo mes"
          trendIcon={<TrendingUp size={12} />}
        />
        
        <MetricCard 
          title="Cuentas Vencidas"
          value="42"
          icon={<AlertTriangle size={16} className="text-red-500 dark:text-red-400 transition-colors" />}
          trendText="Requiere atención"
          trendIcon={<TrendingUp size={12} className="rotate-180 transform" />}
          trendColor="text-red-500 dark:text-red-400"
        />

        <MetricCard 
          title="Asistencia de Hoy"
          value="142"
          icon={<Users size={16} className="text-emerald-600 dark:text-emerald-500 transition-colors" />}
          trendText="12 personas entrenando ahora"
          trendIcon={<Clock size={12} />}
          trendColor="text-zinc-500 dark:text-zinc-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white dark:bg-[#242424] border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none rounded-lg flex flex-col transition-colors">
          <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800/50">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors">Trayectoria de ingresos Semanales</h2>
            <div className="flex bg-zinc-100 dark:bg-[#1a1a1a] rounded text-xs font-medium transition-colors">
              <button className="px-3 py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">7D</button>
              <button className="px-3 py-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded shadow-sm dark:shadow-none transition-colors">30D</button>
              <button className="px-3 py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">90D</button>
            </div>
          </div>
          
          <div className="flex-1 p-5 min-h-[300px] flex items-center justify-center">
            <p className="text-zinc-400 dark:text-zinc-500 text-sm italic">Espacio reservado para ECharts...</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#242424] border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none rounded-lg flex flex-col transition-colors">
          <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800/50">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors">Próximos Vencimientos</h2>
            <button className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-0">
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800/50 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-widest">
              <span>MIEMBRO</span>
              <span>PLAN</span>
            </div>
            
            <div className="flex flex-col">
              {renewals.map((renewal, index) => (
                <RenewalItem 
                  key={renewal.id}
                  initials={renewal.initials}
                  name={renewal.name}
                  plan={renewal.plan}
                  daysText={renewal.daysText}
                  isUrgent={renewal.isUrgent}
                  hasBorder={index !== renewals.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
            <button className="w-full text-center text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-widest hover:text-zinc-900 dark:hover:text-white transition-colors uppercase">
              Ver todas las renovaciones
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
