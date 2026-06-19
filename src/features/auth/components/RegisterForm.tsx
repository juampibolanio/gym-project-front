'use client';
import { Mail, Lock, EyeOff, Eye, Dumbbell, User } from 'lucide-react';
import { InputField } from '@/common/components/ui/InputField';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from '@/features/auth/schemas/register.schema';

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombreCompleto: '',
      email: '',
      nombreGimnasio: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Registro validado:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        label="Nombre Completo"
        type="text"
        placeholder="Jane Doe"
        registration={register('nombreCompleto')}
        error={errors.nombreCompleto?.message}
        icon={<User className="text-text-muted transition-colors" size={16} />}
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <InputField
        label="Email de Trabajo"
        type="email"
        placeholder="admin@gymname.com"
        registration={register('email')}
        error={errors.email?.message}
        icon={<Mail className="text-text-muted transition-colors" size={16} />}
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <InputField
        label="Nombre del Gimnasio"
        type="text"
        placeholder="Iron Works Arena"
        registration={register('nombreGimnasio')}
        error={errors.nombreGimnasio?.message}
        icon={
          <Dumbbell className="text-text-muted transition-colors" size={16} />
        }
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <InputField
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        registration={register('password')}
        error={errors.password?.message}
        icon={<Lock className="text-text-muted transition-colors" size={16} />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-text-muted hover:text-text-main transition-colors focus:outline-none"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        }
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <InputField
        label="Confirmar Contraseña"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        registration={register('confirmPassword')}
        error={errors.confirmPassword?.message}
        icon={<Lock className="text-text-muted transition-colors" size={16} />}
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <button
        type="submit"
        className="w-full bg-brand-main hover:bg-brand-hover text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-md "
      >
        Crear Cuenta <span className="text-lg leading-none">→</span>
      </button>
    </form>
  );
}
