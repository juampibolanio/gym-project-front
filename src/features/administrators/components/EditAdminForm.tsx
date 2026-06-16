'use client';

import { useEffect } from 'react';
import { Mail, Loader2, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userSchema } from '@/features/administrators/schemas/user.schema'; 
import { useUser, useUpdateUser } from '../hooks/useUsers';
import { FormSkeleton } from '@/common/components/ui/FormSkeleton';

type EditAdminFormValues = z.infer<typeof userSchema>;

export function EditAdminForm({ id }: { id: string }) {
  const router = useRouter();

  const { data: currentUser, isLoading: isFetching } = useUser(id);
  
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAdminFormValues>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        dni: currentUser.dni,
        name: currentUser.name,
        surname: currentUser.surname,
        email: currentUser.email,
      });
    }
  }, [currentUser, reset]);

  const onSubmit = (data: EditAdminFormValues) => {
    updateUser({ id, payload: data }, {
      onSuccess: () => {
        router.push('/dashboard/administradores');
      }
    });
  };

  if (isFetching) return <FormSkeleton />;
  
  if (!currentUser) return <div className="text-red-500">No se pudo cargar el administrador.</div>;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 shadow-sm dark:shadow-none relative">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Identidad y Contacto</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Nombre</label>
                <input 
                  type="text" 
                  disabled={isPending}
                  {...register('name')}
                  className={`w-full bg-background border ${errors.name ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Apellido</label>
                <input 
                  type="text" 
                  disabled={isPending}
                  {...register('surname')}
                  className={`w-full bg-background border ${errors.surname ? 'border-red-500' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.surname && <p className="text-xs text-red-500">{errors.surname.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">DNI / Documento</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="text" 
                    disabled={isPending}
                    placeholder="12345678"
                    {...register('dni')}
                    className={`w-full bg-background border ${errors.dni ? 'border-red-500' : 'border-border-primary'} rounded pl-9 pr-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                  />
                </div>
                {errors.dni && <p className="text-xs text-red-500">{errors.dni.message}</p>}
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={14} className="text-text-muted" />
                  </div>
                  <input 
                    type="email" 
                    disabled={isPending}
                    {...register('email')}
                    className={`w-full bg-background border ${errors.email ? 'border-red-500' : 'border-border-primary'} rounded pl-9 pr-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-border-primary" />

          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Configuración de Acceso</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 opacity-70">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Rol Asignado (Solo lectura)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck size={14} className="text-brand-main" />
                  </div>
                  <input 
                    type="text" 
                    disabled
                    value="Administrador designado"
                    className="w-full bg-background border border-border-primary rounded pl-9 pr-3 py-2.5 text-sm text-text-main cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <Link 
              href="/dashboard/administradores"
              className="px-4 py-2 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded text-xs font-bold transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              disabled={isPending}
              className="px-4 py-2 flex items-center gap-2 bg-brand-main hover:bg-brand-hover text-white rounded text-xs font-bold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : "Guardar Cambios"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
