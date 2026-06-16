'use client';
import { Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../schemas/login.schema';
import { useLogin } from '../hooks/useLogin';
import { getSubdomain } from '@/common/utils/extract-subdomain';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    const domain = getSubdomain();

    mutate({
      email: data.email,
      password: data.password,
      domain: domain,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-text-muted tracking-wider transition-colors">
          DIRECCIÓN EMAIL
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3 text-text-muted transition-colors" size={16} />
          <input
            type="email"
            placeholder="admin@gymsystem.com"
            disabled={isPending}
            {...register('email')}
            className={`w-full bg-sidebar border ${errors.email ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-text-muted tracking-wider transition-colors">
            CONTRASEÑA
          </label>
          <Link href="/forgot-password" className="text-[10px] font-bold text-text-muted hover:text-text-main transition-colors">
            Has olvidado la contraseña?
          </Link>
        </div>
        <div className="relative flex items-center">
          <Lock className="absolute left-3 text-text-muted transition-colors" size={16} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isPending} 
            {...register('password')}
            className={`w-full bg-sidebar border ${errors.password ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-10 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isPending}
            className="absolute right-3 text-text-muted hover:text-text-main transition-colors focus:outline-none"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-main hover:bg-brand-hover disabled:bg-brand-main/50 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md dark:shadow-none cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Iniciando...
          </>
        ) : (
          <>
            Iniciar Sesión <span className="text-lg leading-none">→</span>
          </>
        )}
      </button>
    </form>
  );
}
