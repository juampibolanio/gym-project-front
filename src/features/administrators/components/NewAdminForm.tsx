'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormValues, userSchema } from '@/features/administrators/schemas/user.schema';
import { useCreateUser } from '../hooks/useUsers';
import { InputField } from '@/common/components/ui/InputField';
import { Loader2 } from 'lucide-react';

export function NewAdminForm() {
  const router = useRouter();

  const { mutate, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      dni: '',
      name: '',
      surname: '',
      email: '',
    },
  });

  const onSubmit = (data: UserFormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/administradores');
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8 ">
          <div className="flex flex-col gap-6">
            <h2 className="text-[15px] font-bold text-text-main">
              Datos del usuario
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="DNI"
                type="text"
                disabled={isPending}
                registration={register('dni')}
                error={errors.dni?.message}
              />

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

              <InputField
                label="Correo electrónico"
                type="email"
                disabled={isPending}
                registration={register('email')}
                error={errors.email?.message}
              />
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
                'Crear Administrador'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
