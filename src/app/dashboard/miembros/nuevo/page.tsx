'use client';

import { Phone, Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createMemberSchema } from '@/schemas/miembros/createMember.schema';
import { createMemberAction } from './actions';

type MemberFormValues = z.infer<typeof createMemberSchema>;

export default function NewMemberPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      primerNombre: '',
      apellido: '',

      telefono: '',
      email: '',
      fechaActivacion: '',
      plan: '',
      notas: '',
    }
  });

  const onSubmit = async (data: MemberFormValues) => {
    const result = await createMemberAction(data);
    if (result.success) {
      console.log("Miembro creado:", data);
    } else {
      console.error("Error al crear miembro");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
              disabled={isSubmitting}
              className="px-4 py-2 bg-brand-main hover:bg-brand-hover text-white rounded text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Registro"}
            </button>
          </div>
        </div>

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
            <h2 className="text-[15px] font-bold text-text-main">Especificaciones del plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Fecha de activación</label>
                <div className="relative">
                  <input 
                    type="date" 
                    {...register('fechaActivacion')}
                    className={`w-full bg-background border ${errors.fechaActivacion ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                  />
                </div>
                {errors.fechaActivacion && <p className="text-xs text-red-500">{errors.fechaActivacion.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Asignación del plan</label>
                <div className="relative">
                  <select 
                    {...register('plan')}
                    className={`w-full bg-background border ${errors.plan ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-muted appearance-none focus:outline-none focus:border-brand-main transition-colors`}
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
                {errors.plan && <p className="text-xs text-red-500">{errors.plan.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Anulaciones / Notas</label>
                <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase">Opcional</span>
              </div>
              <textarea 
                rows={4}
                {...register('notas')}
                placeholder="Excepciones físicas, condición. Datos relevantes"
                className={`w-full bg-background border ${errors.notas ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors resize-none`}
              ></textarea>
              {errors.notas && <p className="text-xs text-red-500">{errors.notas.message}</p>}
            </div>
            
          </div>

        </div>
      </form>
    </div>
  );
}
