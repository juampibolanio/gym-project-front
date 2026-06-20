'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUser, useUpdateUser } from '../hooks/useUsers';
import {
  EditAdminFormValues,
  userSchema,
} from '@/features/administrators/schemas/user.schema';
import { InputField } from '@/common/components/ui/InputField';
import { FormSkeleton } from '@/common/components/ui/skeletons/FormSkeleton';
import { Mail, Loader2, CreditCard, ShieldCheck } from 'lucide-react';

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
    updateUser(
      { id, payload: data },
      {
        onSuccess: () => {
          router.push('/dashboard/administradores');
        },
      }
    );
  };

  if (isFetching) return <FormSkeleton />;

  if (!currentUser)
    return (
      <div className="text-danger-main">
        No se pudo cargar el administrador.
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8  relative">
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">
              Identidad y Contacto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Nombre"
                type="text"
                disabled={isPending}
                registration={register('name')}
                error={errors.name?.message}
              />

              <InputField
                label="Apellido"
                type="text"
                disabled={isPending}
                registration={register('surname')}
                error={errors.surname?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="DNI / Documento"
                type="text"
                placeholder="12345678"
                disabled={isPending}
                registration={register('dni')}
                error={errors.dni?.message}
                icon={<CreditCard size={14} className="text-text-muted" />}
              />

              <InputField
                label="Email"
                type="email"
                disabled={isPending}
                registration={register('email')}
                error={errors.email?.message}
                icon={<Mail size={14} className="text-text-muted" />}
              />
            </div>
          </div>

          <hr className="border-border-primary" />

          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">
              Configuración de Acceso
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 opacity-70">
                <label className="text-xs font-semibold text-text-muted tracking-wide">
                  Rol Asignado (Solo lectura)
                </label>
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
              className="px-6 py-2.5 border border-border-primary bg-transparent text-text-muted hover:text-text-main hover:bg-surface-hover rounded-sm text-sm font-medium transition-colors"
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
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
