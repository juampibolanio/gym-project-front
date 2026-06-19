'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userSchema } from '@/features/administrators/schemas/user.schema';
import { useCreateUser } from '../hooks/useUsers';
import { Loader2 } from 'lucide-react';

type CreateAdminFormValues = z.infer<typeof userSchema>;

export function NewAdminForm() {
  const router = useRouter();
  
  const { mutate, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdminFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      dni: '',
      name: '',
      surname: '',
      email: '',
    }
  });

  const onSubmit = (data: CreateAdminFormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/administradores');
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 ">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">Datos del usuario</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">DNI</label>
                <input 
                  type="text" 
                  disabled={isPending}
                  {...register('dni')}
                  className={`w-full bg-background border ${errors.dni ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.dni && <p className="text-xs text-danger-main">{errors.dni.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Nombre</label>
                <input 
                  type="text" 
                  disabled={isPending}
                  {...register('name')}
                  className={`w-full bg-background border ${errors.name ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.name && <p className="text-xs text-danger-main">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Apellido</label>
                <input 
                  type="text" 
                  disabled={isPending}
                  {...register('surname')}
                  className={`w-full bg-background border ${errors.surname ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.surname && <p className="text-xs text-danger-main">{errors.surname.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-muted tracking-wide">Correo electrónico</label>
                <input 
                  type="email" 
                  disabled={isPending}
                  {...register('email')}
                  className={`w-full bg-background border ${errors.email ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors`}
                />
                {errors.email && <p className="text-xs text-danger-main">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
            <Link 
              href="/dashboard/administradores"
              className="px-6 py-2.5 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded-sm text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              disabled={isPending}
              className="px-6 py-2.5 flex items-center justify-center gap-2 bg-brand-main hover:bg-brand-hover text-white rounded-sm text-sm font-medium transition-colors  disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Administrador"
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
