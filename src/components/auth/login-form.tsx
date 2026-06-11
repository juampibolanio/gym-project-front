'use client';
import { Mail, Lock, EyeOff, Eye, Dumbbell, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'El email es requerido').email('Por favor ingresa un email válido').max(150),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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
    console.log('Login validado:', data);
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4 shadow-sm dark:shadow-none transition-colors">
          <Dumbbell className="text-brand-main" size={24} />
        </div>
        <h1 className="text-xl font-bold text-text-main transition-colors">GymSystem</h1>
        <p className="text-sm text-text-muted mt-1 transition-colors">Terminal de Inicio Administradores</p>
      </div>

      <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
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
                {...register('password')} 
                className={`w-full bg-sidebar border ${errors.password ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-10 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-text-muted hover:text-text-main transition-colors focus:outline-none"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-main hover:bg-brand-hover text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md dark:shadow-none"
          >
            Iniciar Sesión <span className="text-lg leading-none">→</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-border-primary flex flex-col items-center gap-4 transition-colors">
          <div className="flex items-center justify-center gap-2 text-text-muted transition-colors">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Terminal de Acceso Seguro</span>
          </div>
          <div className="text-text-muted text-xs transition-colors">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="ml-1 font-medium text-brand-main hover:text-brand-hover transition-colors">
              Crea una aquí
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
