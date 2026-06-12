'use client';

import { useState } from 'react';
import { 
  Building, 
  Lock, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { configGeneralSchema, configSecuritySchema } from '@/features/configuration/schemas/config.schema';

type GeneralFormValues = z.infer<typeof configGeneralSchema>;
type SecurityFormValues = z.infer<typeof configSecuritySchema>;

export function ConfigurationTabs() {
  const [activeTab, setActiveTab] = useState('general');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'seguridad', name: 'Seguridad', icon: Lock },
  ];

  const {
    register: registerGeneral,
    handleSubmit: handleSubmitGeneral,
    formState: { errors: errorsGeneral, isSubmitting: isSubmittingGeneral }
  } = useForm<GeneralFormValues>({
    resolver: zodResolver(configGeneralSchema),
    defaultValues: {
      nombreGimnasio: 'GymSystem Central',
      telefono: '+54 11 1234-5678',
      direccion: 'Av. Siempre Viva 123, Buenos Aires'
    }
  });

  const onSubmitGeneral = async () => {
  };

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: errorsSecurity, isSubmitting: isSubmittingSecurity },
    reset: resetSecurity
  } = useForm<SecurityFormValues>({
    resolver: zodResolver(configSecuritySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const onSubmitSecurity = async () => {
    resetSecurity();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        <div className="w-full lg:w-64 flex flex-col gap-1 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-surface text-brand-main shadow-sm' 
                    : 'text-text-muted hover:bg-surface hover:text-text-main'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-brand-main' : ''} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-surface border border-border-primary rounded-xl shadow-sm dark:shadow-none transition-colors overflow-hidden">
          
          {activeTab === 'general' && (
            <form onSubmit={handleSubmitGeneral(onSubmitGeneral)} className="p-6 md:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-bold text-text-main mb-1">Información del Gimnasio</h2>
                <p className="text-sm text-text-muted mb-6">Actualiza los detalles básicos de tu establecimiento.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Nombre del Gimnasio</label>
                    <input 
                      type="text" 
                      {...registerGeneral('nombreGimnasio')}
                      className={`w-full px-4 py-2.5 bg-background border ${errorsGeneral.nombreGimnasio ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors`}
                    />
                    {errorsGeneral.nombreGimnasio && <p className="text-xs text-red-500">{errorsGeneral.nombreGimnasio.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Teléfono de Contacto</label>
                    <input 
                      type="text" 
                      {...registerGeneral('telefono')}
                      className={`w-full px-4 py-2.5 bg-background border ${errorsGeneral.telefono ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors`}
                    />
                    {errorsGeneral.telefono && <p className="text-xs text-red-500">{errorsGeneral.telefono.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-medium text-text-main">Dirección</label>
                    <input 
                      type="text" 
                      {...registerGeneral('direccion')}
                      className={`w-full px-4 py-2.5 bg-background border ${errorsGeneral.direccion ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors`}
                    />
                    {errorsGeneral.direccion && <p className="text-xs text-red-500">{errorsGeneral.direccion.message}</p>}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmittingGeneral}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-main hover:bg-brand-hover text-white rounded-sm font-medium text-sm transition-colors shadow-sm dark:shadow-none disabled:opacity-50"
                  >
                    <Save size={16} />
                    <span>{isSubmittingGeneral ? 'Guardando...' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'seguridad' && (
             <div className="p-6 md:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
               <form onSubmit={handleSubmitSecurity(onSubmitSecurity)}>
                <h2 className="text-lg font-bold text-text-main mb-1">Seguridad de la Cuenta</h2>
                <p className="text-sm text-text-muted mb-6">Gestiona tus credenciales y aumenta la seguridad de tu sistema.</p>
                
                <div className="max-w-md flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Contraseña Actual</label>
                    <div className="relative">
                      <input 
                        type={showCurrentPass ? "text" : "password"} 
                        placeholder="••••••••"
                        {...registerSecurity('currentPassword')}
                        className={`w-full px-4 py-2.5 bg-background border ${errorsSecurity.currentPassword ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errorsSecurity.currentPassword && <p className="text-xs text-red-500">{errorsSecurity.currentPassword.message}</p>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Nueva Contraseña</label>
                    <div className="relative">
                      <input 
                        type={showNewPass ? "text" : "password"}
                        placeholder="••••••••"
                        {...registerSecurity('newPassword')}
                        className={`w-full px-4 py-2.5 bg-background border ${errorsSecurity.newPassword ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errorsSecurity.newPassword && <p className="text-xs text-red-500">{errorsSecurity.newPassword.message}</p>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Confirmar Nueva Contraseña</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      {...registerSecurity('confirmNewPassword')}
                      className={`w-full px-4 py-2.5 bg-background border ${errorsSecurity.confirmNewPassword ? 'border-red-500' : 'border-border-primary'} rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors`}
                    />
                    {errorsSecurity.confirmNewPassword && <p className="text-xs text-red-500">{errorsSecurity.confirmNewPassword.message}</p>}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmittingSecurity}
                    className="w-fit flex items-center justify-center gap-2 px-6 py-2.5 mt-2 bg-brand-main hover:bg-brand-hover text-white rounded-sm font-medium text-sm transition-colors shadow-sm dark:shadow-none disabled:opacity-50"
                  >
                    <Save size={16} />
                    <span>{isSubmittingSecurity ? "Actualizando..." : "Actualizar Contraseña"}</span>
                  </button>
                </div>
               </form>
               
               <hr className="border-border-primary" />

               <div>
                 <div className="flex items-center justify-between">
                   <div>
                     <h3 className="text-sm font-bold text-text-main">Autenticación de Dos Factores (2FA)</h3>
                     <p className="text-xs text-text-muted mt-1">Añade una capa extra de seguridad a tu cuenta.</p>
                   </div>
                   <button className="px-6 py-2.5 bg-brand-main hover:bg-brand-hover text-white rounded-sm text-sm font-medium transition-colors shadow-sm dark:shadow-none">
                     Habilitar 2FA
                   </button>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
