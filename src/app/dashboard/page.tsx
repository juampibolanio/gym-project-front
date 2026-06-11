import { Users, Wallet, AlertTriangle, TrendingUp, Clock, Calendar } from 'lucide-react';
import { MetricCard } from '@/features/dashboard/components/metric-card';
import { RenewalItem } from '@/features/dashboard/components/renewal-item';

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
          <h1 className="text-2xl font-bold text-text-main tracking-wide transition-colors">Vista General</h1>
          <p className="text-sm text-text-muted mt-1 transition-colors">Métricas en tiempo real</p>
        </div>
        <div className="px-3 py-1 bg-brand-surface border border-brand-main/20 rounded text-brand-main text-xs font-bold tracking-widest transition-colors">
          DATOS EN VIVO
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Miembros Activos"
          value="1,248"
          icon={<Users size={16} className="text-text-muted" />}
          trendText="+4.2% este mes"
          trendIcon={<TrendingUp size={12} />}
        />
        
        <MetricCard 
          title="Ingresos Mensuales"
          value="$84,200"
          icon={<Wallet size={16} className="text-brand-main transition-colors" />}
          trendText="+12% vs ultimo mes"
          trendIcon={<TrendingUp size={12} />}
        />
        
        <MetricCard 
          title="Cuentas Vencidas"
          value="42"
          icon={<AlertTriangle size={16} className="text-red-500 transition-colors" />}
          trendText="Requiere atención"
          trendIcon={<TrendingUp size={12} className="rotate-180 transform" />}
          trendColor="text-red-500"
        />

        <MetricCard 
          title="Fecha de Hoy"
          value="15/05/2026"
          icon={<Calendar size={16} className="text-brand-main transition-colors" />}
          trendText="Hola Julio Caceres"
          trendIcon={<Clock size={12} />}
          trendColor="text-text-muted"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-surface border border-border-primary shadow-sm dark:shadow-none rounded-lg flex flex-col transition-colors overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border-primary">
            <h2 className="text-sm font-bold text-text-main transition-colors">Trayectoria de ingresos Semanales</h2>
            <div className="flex bg-background rounded text-xs font-medium transition-colors p-1">
              <button className="px-3 py-1 text-text-muted hover:text-text-main transition-colors">7D</button>
              <button className="px-3 py-1 bg-surface text-text-main rounded shadow-sm dark:shadow-none transition-colors border border-border-primary">30D</button>
              <button className="px-3 py-1 text-text-muted hover:text-text-main transition-colors">90D</button>
            </div>
          </div>
          
          <div className="flex-1 p-5 min-h-75 flex items-center justify-center">
            <p className="text-text-muted text-sm italic">Espacio reservado para ECharts...</p>
          </div>
        </div>

        <div className="bg-surface border border-border-primary shadow-sm dark:shadow-none rounded-lg flex flex-col transition-colors overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border-primary">
            <h2 className="text-sm font-bold text-text-main transition-colors">Próximos Vencimientos</h2>
          </div>
          
          <div className="flex-1 p-0">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary text-[10px] font-bold text-text-muted tracking-widest">
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
        </div>

      </div>

    </div>
  );
}
