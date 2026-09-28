'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useAuth';
import { LoginFormValues, loginSchema } from '../schemas/login.schema';
import { InputField } from '@/common/components/ui/InputField';
import { getSubdomain } from '@/common/utils/extract-subdomain';
import { Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    const domain = getSubdomain();

    login({
      email: data.email,
      password: data.password,
      domain,
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5"
      noValidate 
    >
      <InputField
        label="DIRECCIÓN EMAIL"
        type="email"
        placeholder="admin@chacugym.com"
        disabled={isPending}
        registration={register('email')}
        error={errors.email?.message}
        icon={<Mail aria-hidden="true" className="text-text-muted transition-colors" size={16} />}
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <InputField
        label="CONTRASEÑA"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        disabled={isPending}
        registration={register('password')}
        error={errors.password?.message}
        icon={<Lock aria-hidden="true" className="text-text-muted transition-colors" size={16} />}
        labelRightElement={
          <Link
            href="/recuperar-contrasenia"
            aria-disabled={isPending}
            tabIndex={isPending ? -1 : 0}
            className={`text-[12px] font-bold transition-colors ${
              isPending 
                ? 'text-text-muted/50 pointer-events-none' 
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            ¿Has olvidado la contraseña?
          </Link>
        }
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isPending}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="text-text-muted hover:text-text-main transition-colors focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showPassword ? <Eye size={16} aria-hidden="true" /> : <EyeOff size={16} aria-hidden="true" />}
          </button>
        }
        className="gap-2! [&_label]:text-[10px] [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-sidebar"
      />

      <button
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        className="w-full bg-brand-main hover:bg-brand-hover disabled:bg-brand-main/50 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={16} aria-hidden="true" />
            <span>Iniciando...</span>
          </>
        ) : (
          <>
            <span>Iniciar Sesión</span> 
            <span className="text-lg leading-none" aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}
