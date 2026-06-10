'use client';
import { MemberList } from "@/components/miembros/member-list";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

const ALL_MEMBERS = [
  { id: "MEM-123456", name: "Manuel Vasquez", status: "Activo" as const, plan: "Plan Premium", lastPayment: "2023-10-26", nextExpiration: "2023-11-26" },
  { id: "MEM-123457", name: "Laura Gomez", status: "Activo" as const, plan: "Plan Básico", lastPayment: "2023-10-15", nextExpiration: "2023-11-15" },
  { id: "MEM-123458", name: "Carlos Perez", status: "Vencido" as const, plan: "Plan Anual", lastPayment: "2022-09-01", nextExpiration: "2023-09-01" },
  { id: "MEM-123459", name: "Ana Maria", status: "Inactivo" as const, plan: "Plan Mensual", lastPayment: "2023-01-10", nextExpiration: "2023-02-10" },
  { id: "MEM-123460", name: "Juan Fernandez", status: "Activo" as const, plan: "Plan Premium", lastPayment: "2023-10-20", nextExpiration: "2023-11-20" },
  { id: "MEM-123461", name: "Sofia Rojas", status: "Activo" as const, plan: "Plan Básico", lastPayment: "2023-10-25", nextExpiration: "2023-11-25" },
  { id: "MEM-123462", name: "Pedro Martinez", status: "Vencido" as const, plan: "Plan Mensual", lastPayment: "2023-08-05", nextExpiration: "2023-09-05" },
  { id: "MEM-123463", name: "Lucia Diaz", status: "Activo" as const, plan: "Plan Anual", lastPayment: "2023-05-10", nextExpiration: "2024-05-10" },
  { id: "MEM-123464", name: "Diego Torres", status: "Inactivo" as const, plan: "Plan Premium", lastPayment: "2022-12-01", nextExpiration: "2023-01-01" },
  { id: "MEM-123465", name: "Elena Castro", status: "Activo" as const, plan: "Plan Básico", lastPayment: "2023-10-28", nextExpiration: "2023-11-28" },
  { id: "MEM-123466", name: "Miguel Angel", status: "Vencido" as const, plan: "Plan Premium", lastPayment: "2023-07-15", nextExpiration: "2023-08-15" },
  { id: "MEM-123467", name: "Valentina Ruiz", status: "Activo" as const, plan: "Plan Mensual", lastPayment: "2023-10-18", nextExpiration: "2023-11-18" },
];

export default function MembersPage() {
  const [filter, setFilter] = useState<'Todos' | 'Activo' | 'Vencido'>('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredMembers = ALL_MEMBERS.filter(member => {
    if (filter === 'Todos') return true;
    return member.status === filter;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
            <button 
              onClick={() => { setFilter('Todos'); setCurrentPage(1); }}
              className={`px-4 py-1.5 text-[10px] font-bold rounded transition-colors tracking-wider uppercase ${filter === 'Todos' ? 'bg-brand-main text-white shadow-sm dark:shadow-none' : 'text-text-muted hover:text-text-main'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => { setFilter('Activo'); setCurrentPage(1); }}
              className={`px-4 py-1.5 text-[10px] font-bold rounded transition-colors tracking-wider uppercase ${filter === 'Activo' ? 'bg-brand-main text-white shadow-sm dark:shadow-none' : 'text-text-muted hover:text-text-main'}`}
            >
              Activo
            </button>
            <button 
              onClick={() => { setFilter('Vencido'); setCurrentPage(1); }}
              className={`px-4 py-1.5 text-[10px] font-bold rounded transition-colors tracking-wider uppercase ${filter === 'Vencido' ? 'bg-brand-main text-white shadow-sm dark:shadow-none' : 'text-text-muted hover:text-text-main'}`}
            >
              Vencido
            </button>
          </div>
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

        <div className="flex flex-col min-h-[300px]">
          {currentMembers.length > 0 ? (
            currentMembers.map((member) => (
              <MemberList 
                key={member.id}
                name={member.name}
                memberID={member.id}
                status={member.status}
                plan={member.plan}
                lastPayment={member.lastPayment}
                nextExpiration={member.nextExpiration} 
              />
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-text-muted">
              No hay miembros que coincidan con los filtros.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-border-primary">
          <p className="text-sm text-text-muted">
            Mostrando {filteredMembers.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredMembers.length)} de {filteredMembers.length}
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 text-text-muted hover:text-text-main disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}