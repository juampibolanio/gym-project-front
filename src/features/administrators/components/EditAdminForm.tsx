'use client';

import { Phone, Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { editAdminSchema } from '@/features/administrators/schemas/editAdmin.schema';

type EditAdminFormValues = z.infer<typeof editAdminSchema>;

export function EditAdminForm({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditAdminFormValues>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      primerNombre: '',
      apellido: '',
      telefono: '',
      email: '',
      rol: 'Administrador designado',
      estado: 'activo',
      notas: '',
    }
  });

  const onSubmit = async () => {
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">


        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 shadow-sm dark:shadow-none">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Identidad y Contacto</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Primer Nombre</label>
                <input 
                  type="text" 
                  {...register('primerNombre')}
                  className={`w-full bg-background border ${errors.primerNombre ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.primerNombre && <p className="text-xs text-red-500">{errors.primerNombre.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Apellido</label>
                <input 
                  type="text" 
                  {...register('apellido')}
                  className={`w-full bg-background border ${errors.apellido ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.apellido && <p className="text-xs text-red-500">{errors.apellido.message}</p>}
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
                    placeholder="(555) 000-0000"
                    {...register('telefono')}
                    className={`w-full bg-background border ${errors.telefono ? 'border-red-500' : 'border-border-primary'} rounded pl-9 pr-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                  />
                </div>
                {errors.telefono && <p className="text-xs text-red-500">{errors.telefono.message}</p>}
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="email" 
                    {...register('email')}
                    className={`w-full bg-background border ${errors.email ? 'border-red-500' : 'border-border-primary'} rounded pl-9 pr-3 py-2 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-border-primary" />

          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Configuración de Acceso y Estado</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Estado Manual</label>
                <div className="relative">
                  <select 
                    {...register('estado')}
                    className={`w-full bg-background border ${errors.estado ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main appearance-none focus:outline-none focus:border-brand-main transition-colors`}
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={14} className="text-text-muted" />
                  </div>
                </div>
                {errors.estado && <p className="text-xs text-red-500">{errors.estado.message}</p>}
                <p className="text-[10px] text-text-muted mt-0.5">Seleccionar &quot;Inactivo&quot; para dar de baja al administrador.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Rol Asignado</label>
                <div className="relative">
                  <select 
                    {...register('rol')}
                    className={`w-full bg-background border ${errors.rol ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main appearance-none focus:outline-none focus:border-brand-main transition-colors`}
                  >
                    <option value="Administrador designado">Administrador designado</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={14} className="text-text-muted" />
                  </div>
                </div>
                {errors.rol && <p className="text-xs text-red-500">{errors.rol.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Notas Internas</label>
                <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase">Opcional</span>
              </div>
              <textarea 
                rows={4}
                {...register('notas')}
                placeholder="Datos relevantes sobre el administrador"
                className={`w-full bg-background border ${errors.notas ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors resize-none`}
              ></textarea>
              {errors.notas && <p className="text-xs text-red-500">{errors.notas.message}</p>}
            </div>
            
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <Link 
              href={`/dashboard/administradores/${id}`}
              className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded text-xs font-bold transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 bg-brand-main hover:bg-brand-hover text-white rounded text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
