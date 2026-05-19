import { Phone, Mail, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function NewMemberPage() {
  
  async function createMember(formData: FormData) {
    'use server';
    
    try {
      const firstName = formData.get('primerNombre');
      const lastName = formData.get('apellido');
      const email = formData.get('email');
      const phone = formData.get('telefono');
      const plan = formData.get('plan');
      
      console.log('Datos a guardar:', { firstName, lastName, email, phone, plan });
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form action={createMember} className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-text-main">Registrar Nuevo Miembro</h1>
            <p className="text-sm text-text-muted mt-1">
              Ingrese los datos del alumno y el plan a continuación.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/miembros"
              className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded text-xs font-bold transition-colors"
            >
              Descartar
            </Link>
            <button 
              type="submit" 
              className="px-4 py-2 bg-brand-main hover:bg-brand-hover text-white rounded text-xs font-bold transition-colors shadow-sm"
            >
              Guardar Registro
            </button>
          </div>
        </div>

        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 shadow-sm dark:shadow-none">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Identidad y Contacto</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px] gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Primer Nombre</label>
                <input 
                  type="text" 
                  name="primerNombre" 
                  className="w-full bg-background border border-border-primary rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Apellido</label>
                <input 
                  type="text" 
                  name="apellido" 
                  className="w-full bg-background border border-border-primary rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Inicial</label>
                <input 
                  type="text" 
                  name="inicial" 
                  className="w-full bg-background border border-border-primary rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Teléfono</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="tel" 
                    name="telefono" 
                    placeholder="(555) 000-0000"
                    className="w-full bg-background border border-border-primary rounded pl-9 pr-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    className="w-full bg-background border border-border-primary rounded pl-9 pr-3 py-2 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-border-primary" />

          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Especificaciones del plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Fecha de activación</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="fechaActivacion" 
                    placeholder="mm/dd/yyyy"
                    className="w-full bg-background border border-border-primary rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Calendar size={14} className="text-text-muted" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Asignación del plan</label>
                <div className="relative">
                  <select 
                    name="plan" 
                    defaultValue=""
                    className="w-full bg-background border border-border-primary rounded px-3 py-2.5 text-sm text-text-muted appearance-none focus:outline-none focus:border-brand-main transition-colors"
                  >
                    <option value="" disabled>Seleccionar plan</option>
                    <option value="premium">Premium</option>
                    <option value="regular">Regular</option>
                    <option value="basico">Básico</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={14} className="text-text-muted" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Anulaciones / Notas</label>
                <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase">Opcional</span>
              </div>
              <textarea 
                name="notas" 
                rows={4}
                placeholder="Excepciones físicas, condición. Datos relevantes"
                className="w-full bg-background border border-border-primary rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors resize-none"
              ></textarea>
            </div>
            
          </div>

        </div>
      </form>
    </div>
  );
}
