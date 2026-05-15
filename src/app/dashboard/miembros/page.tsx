import { MemberList } from "@/components/miembros/member-list";
import { ChevronRight, ChevronLeft, ListFilter } from "lucide-react";

export default function MembersPage() {
  return (
    <div className="bg-background flex flex-col gap-6">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-text-main">Directorio de miembros</h1>
          <p className="text-sm text-text-muted mt-1 transition-colors">
            Administre todas las membresias activas e inactivas del gimnasio
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-surface border border-border-primary rounded-lg p-1">
            <button className="px-4 py-1.5 text-[10px] font-bold text-text-main bg-background rounded shadow-sm dark:shadow-none transition-colors tracking-wider uppercase">
              Todos
            </button>
            <button className="px-4 py-1.5 text-[10px] font-bold text-text-muted hover:text-text-main transition-colors rounded tracking-wider uppercase">
              Activo
            </button>
            <button className="px-4 py-1.5 text-[10px] font-bold text-text-muted hover:text-text-main transition-colors rounded tracking-wider uppercase">
              Vencido
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-text-main border border-border-primary bg-surface hover:bg-surface-hover rounded-lg transition-colors tracking-wider uppercase">
            <ListFilter size={14} />
            Más Filtros
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border-primary rounded-lg flex flex-col">
        
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] items-center px-5 py-3 border-b border-border-primary text-[10px] font-bold text-text-muted tracking-widest uppercase">
          <h5>NOMBRE E ID</h5>
          <h5>ESTADO</h5>
          <h5>PLAN</h5>
          <h5>ULTIMO PAGO</h5>
          <h5>PRÓXIMO VENCIMIENTO</h5>
          <h5>ACCIONES</h5>
        </div>

        <div className="flex flex-col">
          <MemberList 
            name="Manuel Vasquez"
            memberID="MEM-123456"
            status="Activo"
            plan="Plan Premium"
            lastPayment="2023-10-26"
            nextExpiration="2023-11-26" 
          />
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-border-primary">
          <p className="text-sm text-text-muted">Mostrando 1-4 de 500</p>
          <div className="flex items-center gap-2">
            <button className="p-1 text-text-muted hover:text-text-main transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="p-1 text-text-muted hover:text-text-main transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}