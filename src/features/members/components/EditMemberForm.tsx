'use client';

import { Phone, ChevronDown, IdCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { editMemberSchema } from '@/features/members/schemas/editMember.schema';
import { useUpdateMember, useMember } from '@/features/members/hook/useMembers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type EditMemberFormValues = z.infer<typeof editMemberSchema>;

export function EditMemberForm({ id }: { id: string }) {
  const router = useRouter();
  
  const { data: member, isLoading } = useMember(id);
  const updateMemberMutation = useUpdateMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditMemberFormValues>({
    resolver: zodResolver(editMemberSchema),
    defaultValues: {
      dni: '',
      name: '',
      surname: '',
      phoneNumber: '',
      birthDate: '',
      state: 'ACTIVE',
      observations: '',
    }
  });

  useEffect(() => {
    if (member) {
      reset({
        dni: member.dni,
        name: member.name,
        surname: member.surname,
        phoneNumber: member.phoneNumber || '',
        birthDate: member.birthDate ? new Date(member.birthDate).toISOString().split('T')[0] : '',
        state: member.state as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
        observations: member.observations || '',
      });
    }
  }, [member, reset]);

  const onSubmit = (data: EditMemberFormValues) => {
    const payload = {
      ...data,
      phoneNumber: data.phoneNumber || undefined,
      observations: data.observations || undefined,
    };

    updateMemberMutation.mutate(
      { id, payload: payload as any },
      {
        onSuccess: () => {
          router.push(`/dashboard/miembros/${id}`);
        }
      }
    );
  };

  const isSubmitting = updateMemberMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-brand-main animate-spin mb-3" />
        <span className="text-text-muted text-sm">Cargando datos del socio...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 ">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Identidad y Contacto</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-text-muted tracking-wide">DNI</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdCard size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="12345678"
                    {...register('dni')}
                    disabled={isSubmitting}
                    className={`w-full bg-background border ${errors.dni ? 'border-danger-main' : 'border-border-primary'} rounded pl-9 pr-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                  />
                </div>
                {errors.dni && <p className="text-xs text-danger-main">{errors.dni.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Primer Nombre</label>
                <input 
                  type="text" 
                  {...register('name')}
                  disabled={isSubmitting}
                  className={`w-full bg-background border ${errors.name ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                />
                {errors.name && <p className="text-xs text-danger-main">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Apellido</label>
                <input 
                  type="text" 
                  {...register('surname')}
                  disabled={isSubmitting}
                  className={`w-full bg-background border ${errors.surname ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                />
                {errors.surname && <p className="text-xs text-danger-main">{errors.surname.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  {...register('birthDate')}
                  disabled={isSubmitting}
                  className={`w-full bg-background border ${errors.birthDate ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                />
                {errors.birthDate && <p className="text-xs text-danger-main">{errors.birthDate.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Teléfono (Opcional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="+5491123456789"
                    {...register('phoneNumber')}
                    disabled={isSubmitting}
                    className={`w-full bg-background border ${errors.phoneNumber ? 'border-danger-main' : 'border-border-primary'} rounded pl-9 pr-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs text-danger-main">{errors.phoneNumber.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-border-primary" />

          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Membresía y Estado</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Estado Manual</label>
                <div className="relative">
                  <select 
                    {...register('state')}
                    disabled={isSubmitting}
                    className={`w-full bg-background border ${errors.state ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main appearance-none focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                  >
                    <option value="ACTIVE">Activo</option>
                    <option value="INACTIVE">Inactivo</option>
                    <option value="SUSPENDED">Suspendido</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={14} className="text-text-muted" />
                  </div>
                </div>
                {errors.state && <p className="text-xs text-danger-main">{errors.state.message}</p>}
                <p className="text-[10px] text-text-muted mt-0.5">Sobrescribe el estado automático de pagos.</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Observaciones / Notas</label>
                <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase">Opcional</span>
              </div>
              <textarea 
                rows={4}
                {...register('observations')}
                disabled={isSubmitting}
                placeholder="Excepciones físicas, condición. Datos relevantes"
                className={`w-full bg-background border ${errors.observations ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors resize-none disabled:opacity-50`}
              ></textarea>
              {errors.observations && <p className="text-xs text-danger-main">{errors.observations.message}</p>}
            </div>
            
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <Link 
              href={`/dashboard/miembros/${id}`}
              className="px-6 py-2.5 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded-sm text-sm font-medium transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-main hover:bg-brand-hover text-white rounded-sm text-sm font-medium transition-colors  disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
