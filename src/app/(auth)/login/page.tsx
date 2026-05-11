'use client';
import { Mail, Lock, EyeOff, Eye, Dumbbell, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Por favor ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), 
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login validado:', data);
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center mb-4">
          <Dumbbell className="text-emerald-500" size={24} />
        </div>
        <h1 className="text-xl font-bold text-zinc-100">GymSystem</h1>
        <p className="text-sm text-zinc-400 mt-1">Terminal de Inicio Administradores</p>
      </div>

      <div className="w-full bg-[#18181b] border-t-2 border-t-emerald-600 border border-zinc-800 rounded-lg p-6 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 tracking-wider">
              DIRECCIÓN EMAIL
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-zinc-500" size={16} />
              <input 
                type="email"
                placeholder="admin@gymsystem.com"
                {...register('email')} 
                className={`w-full bg-[#131313] border ${errors.email ? 'border-red-500' : 'border-zinc-800'} rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-zinc-400 tracking-wider">
                CONTRASEÑA
              </label>
              <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors">
                Has olvidado la contraseña?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-zinc-500" size={16} />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register('password')} 
                className={`w-full bg-[#131313] border ${errors.password ? 'border-red-500' : 'border-zinc-800'} rounded-md py-2.5 pl-10 pr-10 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-[#2d5f43] hover:bg-[#244f36] text-zinc-100 font-medium text-sm py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 mt-2"
          >
            Iniciar Sesión <span className="text-lg leading-none">→</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2 text-zinc-500">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Terminal de Acceso Seguro</span>
          </div>
          <div className="text-zinc-400 text-xs">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="ml-1 text-zinc-300 hover:text-white transition-colors">
              Crea una aquí
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
