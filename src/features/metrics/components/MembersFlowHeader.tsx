import { UserPlus, UserMinus, Activity } from 'lucide-react';
import { MembersFlowViewMode } from '../utils/members-chart-options';
import { TimeRangeFilter } from './RevenueChart';

interface MembersFlowHeaderProps {
  totalNew: number;
  totalChurn: number;
  netGrowth: number;
  periodLabel?: string;
  viewMode: MembersFlowViewMode;
  onViewModeChange: (mode: MembersFlowViewMode) => void;
  timeRange: TimeRangeFilter;
  onTimeRangeChange: (range: TimeRangeFilter) => void;
}

export function MembersFlowHeader({
  totalNew,
  totalChurn,
  netGrowth,
  periodLabel = '12 meses',
  viewMode,
  onViewModeChange,
  timeRange,
  onTimeRangeChange,
}: MembersFlowHeaderProps) {
  return (
    <header className="flex flex-col gap-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
            Flujo de Miembros
            <span className="text-xs font-normal text-text-muted">
              ({viewMode === 'net' ? 'Balance Neto Mensual' : 'Altas vs Bajas'})
            </span>
          </h3>
          <p className="text-sm text-text-muted">
            Evolución de nuevos registros vs miembros que no renovaron ({periodLabel})
          </p>
        </div>

        {/* Interactive Controls Toolbar */}
        <div
          className="flex items-center gap-2 flex-wrap"
          role="toolbar"
          aria-label="Controles del gráfico de flujo de miembros"
        >
          {/* View Mode Toggle: Altas vs Bajas / Balance Neto */}
          <div
            className="flex items-center bg-surface-hover/70 border border-border-primary rounded-lg p-0.5"
            role="radiogroup"
            aria-label="Modo de visualización de miembros"
          >
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === 'flow'}
              onClick={() => onViewModeChange('flow')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
                viewMode === 'flow'
                  ? 'bg-surface text-brand-main shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Altas vs Bajas
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={viewMode === 'net'}
              onClick={() => onViewModeChange('net')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
                viewMode === 'net'
                  ? 'bg-surface text-brand-main shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Balance Neto
            </button>
          </div>

          {/* Time Range Filter */}
          <div
            className="flex items-center bg-surface-hover/70 border border-border-primary rounded-lg p-0.5"
            role="radiogroup"
            aria-label="Rango temporal de miembros"
          >
            {(['all', '6m', '3m'] as const).map((range) => {
              const label = range === 'all' ? '12M' : range === '6m' ? '6M' : '3M';
              const isActive = timeRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onTimeRangeChange(range)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-main ${
                    isActive
                      ? 'bg-surface text-brand-main shadow-xs'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Badge Row */}
      <div
        className="flex items-center gap-3 bg-surface-hover/60 border border-border-primary px-3 py-1.5 rounded-lg text-xs shadow-sm self-start"
        aria-label="Resumen de crecimiento neto"
      >
        <div
          className="flex items-center gap-1.5 text-success-main font-semibold"
          title="Total nuevas altas en el período seleccionado"
        >
          <UserPlus size={14} aria-hidden="true" />
          <span>+{totalNew.toLocaleString('es-AR')}</span>
        </div>
        <span className="text-border-primary" aria-hidden="true">
          |
        </span>
        <div
          className="flex items-center gap-1.5 text-danger-main font-semibold"
          title="Total bajas en el período seleccionado"
        >
          <UserMinus size={14} aria-hidden="true" />
          <span>-{totalChurn.toLocaleString('es-AR')}</span>
        </div>
        <span className="text-border-primary" aria-hidden="true">
          |
        </span>
        <div
          className={`flex items-center gap-1.5 font-bold ${
            netGrowth >= 0 ? 'text-brand-main' : 'text-danger-main'
          }`}
          title="Crecimiento neto en el período seleccionado"
        >
          <Activity size={14} aria-hidden="true" />
          <span>
            {netGrowth >= 0
              ? `+${netGrowth.toLocaleString('es-AR')}`
              : netGrowth.toLocaleString('es-AR')}{' '}
            neto
          </span>
        </div>
      </div>
    </header>
  );
}
