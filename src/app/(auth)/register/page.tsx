'use client'
import { Mail, Lock, EyeOff, Eye, Dumbbell, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
    nombreCompleto: z.string().min(1, 'El nombre es requerido'),
    email: z.string().min(1, 'El email es requerido').email('Por favor ingresa un email válido'),
    nombreGimnasio: z.string().min(1, 'El nombre del gimnasio es requerido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false)

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
        }
      });

    const onSubmit = (data: RegisterFormValues) => {
        console.log('Registro validado:', data)
    }

    return (
        <div className="w-full max-w-[400px] flex flex-col items-center">
            
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-transparent flex items-center justify-center mb-4 shadow-sm dark:shadow-none">
                    <Dumbbell className="text-emerald-600 dark:text-emerald-500" size={24} />
                </div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">GymSystem</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Terminal de Registro Administradores</p>
            </div>

            <div className="w-full bg-white dark:bg-[#18181b] border-t-4 border-t-emerald-600 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xl dark:shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                            Nombre Completo
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3 text-zinc-400 dark:text-zinc-500" size={16} />
                            <input 
                                type="text"
                                placeholder="Jane Doe"
                                {...register('nombreCompleto')}
                                className={`w-full bg-zinc-50 dark:bg-[#131313] border ${errors.nombreCompleto ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-800'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 dark:focus:border-zinc-500 transition-colors`}
                            />
                        </div>
                        {errors.nombreCompleto && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombreCompleto.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                            Email de Trabajo
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 text-zinc-400 dark:text-zinc-500" size={16} />
                            <input 
                                type="email"
                                placeholder="admin@gymname.com"
                                {...register('email')}
                                className={`w-full bg-zinc-50 dark:bg-[#131313] border ${errors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-800'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 dark:focus:border-zinc-500 transition-colors`}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                            Nombre del Gimnasio
                        </label>
                        <div className="relative flex items-center">
                            <Dumbbell className="absolute left-3 text-zinc-400 dark:text-zinc-500" size={16} />
                            <input 
                                type="text"
                                placeholder="Iron Works Arena"
                                {...register('nombreGimnasio')}
                                className={`w-full bg-zinc-50 dark:bg-[#131313] border ${errors.nombreGimnasio ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-800'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 dark:focus:border-zinc-500 transition-colors`}
                            />
                        </div>
                        {errors.nombreGimnasio && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombreGimnasio.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                            Contraseña
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 text-zinc-400 dark:text-zinc-500" size={16} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register('password')}
                                className={`w-full bg-zinc-50 dark:bg-[#131313] border ${errors.password ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-800'} rounded-lg py-2.5 pl-10 pr-10 text-sm text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 dark:focus:border-zinc-500 transition-colors`}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors focus:outline-none"
                            >
                                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-emerald-700 dark:bg-[#2d5f43] hover:bg-emerald-800 dark:hover:bg-[#244f36] text-white dark:text-zinc-100 font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-md dark:shadow-none"
                    >
                        Crear Cuenta <span className="text-lg leading-none">→</span>
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-xs">
                    Ya tienes una cuenta?{' '}
                    <Link href="/login" className="ml-1 font-medium text-emerald-700 dark:text-zinc-300 hover:text-emerald-800 dark:hover:text-white transition-colors">
                        Inicia Sesión
                    </Link>
                </div>
            </div>

        </div>
    );
}
