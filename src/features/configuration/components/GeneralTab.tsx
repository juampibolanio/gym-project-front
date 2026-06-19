'use client';

import { useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { configGeneralSchema } from '@/features/configuration/schemas/config.schema';
import { useRole } from '@/features/auth/hooks/useRole';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useGym, useUpdateGym } from '@/features/gyms/hooks/useGyms';
import toast from 'react-hot-toast';
import { GeneralTabSkeleton } from './GeneralTabSkeleton';

type GeneralFormValues = z.infer<typeof configGeneralSchema>;

export function GeneralTab() {
  const { isAdmin } = useRole();
  const gymUuid = useAuthStore((state) => state.user?.gymUuid);

  const { data: gymData, isLoading: isFetching } = useGym(gymUuid);
  
  const { mutate: updateGym, isPending: isUpdating } = useUpdateGym();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<GeneralFormValues>({
    resolver: zodResolver(configGeneralSchema),
  });

  useEffect(() => {
    if (gymData) {
      reset({
        nombreGimnasio: gymData.name,
        telefono: gymData.phoneNumber || '',
        direccion: gymData.address || '',
      });
    }
  }, [gymData, reset]);

  const onSubmit = (data: GeneralFormValues) => {
    if (!gymUuid) return;

    const payload = {
        name: data.nombreGimnasio,
        phoneNumber: data.telefono,
        address: data.direccion,
    };

    updateGym({ id: gymUuid, payload }, {
      onSuccess: () => {
        toast.success('¡Configuración actualizada con éxito!')
      },
      onError: (error) => {
        toast.error('Ocurrió un error al actualizar los datos.')
        console.error('Error al actualizar el gimnasio:', error);
      }
    });
  };

  if (isFetching) {
    return <GeneralTabSkeleton isAdmin={isAdmin} />;
  }

  const isProcessing = isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
      <div className="relative">

        <h2 className="text-lg font-bold text-text-main mb-1">Información del Gimnasio</h2>
        <p className="text-sm text-text-muted mb-6">
          {isAdmin ? 'Actualiza los detalles básicos de tu establecimiento.' : 'Detalles de tu establecimiento.'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">Nombre del Gimnasio</label>
            <input 
              type="text" 
              disabled={!isAdmin || isProcessing}
              {...register('nombreGimnasio')}
              className={`w-full px-4 py-2.5 bg-background border ${errors.nombreGimnasio ? 'border-danger-main' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
            />
            {errors.nombreGimnasio && <p className="text-xs text-danger-main">{errors.nombreGimnasio.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">Teléfono de Contacto</label>
            <input 
              type="text" 
              disabled={!isAdmin || isProcessing}
              {...register('telefono')}
              className={`w-full px-4 py-2.5 bg-background border ${errors.telefono ? 'border-danger-main' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
            />
            {errors.telefono && <p className="text-xs text-danger-main">{errors.telefono.message}</p>}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-text-main">Dirección</label>
            <input 
              type="text" 
              disabled={!isAdmin || isProcessing}
              {...register('direccion')}
              className={`w-full px-4 py-2.5 bg-background border ${errors.direccion ? 'border-danger-main' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
            />
            {errors.direccion && <p className="text-xs text-danger-main">{errors.direccion.message}</p>}
          </div>
        </div>
        
        {isAdmin && (
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-main hover:bg-brand-hover text-white rounded-sm font-medium text-sm transition-colors  disabled:opacity-50 cursor-pointer"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
              <span>{isUpdating ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
