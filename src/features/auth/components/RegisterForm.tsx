'use client'
import { Mail, Lock, EyeOff, Eye, Dumbbell, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
    nombreCompleto: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'Nombre demasiado largo'),
    email: z.string().min(1, 'El email es requerido').email('Por favor ingresa un email válido').max(150),
    nombreGimnasio: z.string().trim().min(2, 'El nombre del gimnasio es requerido').max(100),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número')
        .regex(/[^a-zA-Z0-9]/, 'Debe contener al menos un carácter especial'),
    confirmPassword: z.string().min(1, 'Por favor confirma tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

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
        <div className="w-full max-w-100 flex flex-col items-center">
            
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4 shadow-sm dark:shadow-none transition-colors">
                    <Dumbbell className="text-brand-main" size={24} />
                </div>
                <h1 className="text-xl font-bold text-text-main transition-colors">GymSystem</h1>
                <p className="text-sm text-text-muted mt-1 transition-colors">Terminal de Registro Administradores</p>
            </div>

            <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
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

                <div className="mt-6 pt-4 border-t border-border-primary flex items-center justify-center text-text-muted text-xs transition-colors">
                    Ya tienes una cuenta?{' '}
                    <Link href="/login" className="ml-1 font-medium text-brand-main hover:text-brand-hover transition-colors">
                        Inicia Sesión
                    </Link>
                </div>
            </div>

        </div>
    );
}
