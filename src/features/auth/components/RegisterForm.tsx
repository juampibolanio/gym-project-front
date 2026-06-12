'use client'
import { Mail, Lock, EyeOff, Eye, Dumbbell, User } from 'lucide-react'

import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from '@/features/auth/schemas/register.schema';

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
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
            confirmPassword: '',
        }
      });

    const onSubmit = (data: RegisterFormValues) => {
        console.log('Registro validado:', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted tracking-wider uppercase transition-colors">
                            Nombre Completo
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3 text-text-muted transition-colors" size={16} />
                            <input 
                                type="text"
                                placeholder="Jane Doe"
                                {...register('nombreCompleto')}
                                className={`w-full bg-sidebar border ${errors.nombreCompleto ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                            />
                        </div>
                        {errors.nombreCompleto && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombreCompleto.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted tracking-wider uppercase transition-colors">
                            Email de Trabajo
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 text-text-muted transition-colors" size={16} />
                            <input 
                                type="email"
                                placeholder="admin@gymname.com"
                                {...register('email')}
                                className={`w-full bg-sidebar border ${errors.email ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted tracking-wider uppercase transition-colors">
                            Nombre del Gimnasio
                        </label>
                        <div className="relative flex items-center">
                            <Dumbbell className="absolute left-3 text-text-muted transition-colors" size={16} />
                            <input 
                                type="text"
                                placeholder="Iron Works Arena"
                                {...register('nombreGimnasio')}
                                className={`w-full bg-sidebar border ${errors.nombreGimnasio ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                            />
                        </div>
                        {errors.nombreGimnasio && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombreGimnasio.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted tracking-wider uppercase transition-colors">
                            Contraseña
                        </label>
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

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-muted tracking-wider uppercase transition-colors">
                            Confirmar Contraseña
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 text-text-muted transition-colors" size={16} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                className={`w-full bg-sidebar border ${errors.confirmPassword ? 'border-red-500' : 'border-border-primary'} rounded-lg py-2.5 pl-10 pr-10 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-brand-main transition-colors`}
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-brand-main hover:bg-brand-hover text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-md dark:shadow-none"
                    >
                        Crear Cuenta <span className="text-lg leading-none">→</span>
                    </button>
        </form>
    );
}

