'use client';
import { Mail, Dumbbell, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '../schemas/forgot-password.schema';

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('Recuperación solicitada para:', data);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-100 flex flex-col items-center">
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full border border-border-primary bg-surface flex items-center justify-center mb-4 shadow-sm dark:shadow-none transition-colors">
          <Dumbbell className="text-brand-main" size={24} />
        </div>
        <h1 className="text-xl font-bold text-text-main transition-colors">GymSystem</h1>
        <p className="text-sm text-text-muted mt-1 transition-colors text-center">
          {isSubmitted 
            ? "Revisa tu correo electrónico" 
            : "Recuperación de Contraseña"
          }
        </p>
      </div>

      <div className="w-full bg-surface border-t-4 border-t-brand-main border border-border-primary rounded-xl p-6 shadow-xl dark:shadow-2xl transition-colors">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <p className="text-sm text-text-main text-center mb-4 transition-colors">
              Ingresa tu dirección de email y te enviaremos las instrucciones para restablecer tu contraseña.
            </p>

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

            <button 
              type="submit"
              className="w-full bg-brand-main hover:bg-brand-hover text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md dark:shadow-none"
            >
              <Send size={16} /> Enviar Instrucciones
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="w-16 h-16 bg-brand-main/10 text-brand-main rounded-full flex items-center justify-center mb-2">
              <Mail size={32} />
            </div>
            <p className="text-sm text-text-main text-center transition-colors">
              Hemos enviado un enlace de recuperación a tu correo electrónico. Por favor, revisa tu bandeja de entrada o la carpeta de spam.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-bold text-text-muted hover:text-text-main transition-colors mt-4"
            >
              ¿No recibiste el correo? Intenta de nuevo
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border-primary flex flex-col items-center transition-colors">
          <Link href="/login" className="flex items-center gap-2 text-xs font-medium text-brand-main hover:text-brand-hover transition-colors">
            <ArrowLeft size={14} /> Volver al Inicio de Sesión
          </Link>
        </div>
      </div>

    </div>
  );
}
