'use client';

import { useState } from 'react';
import { 
  Building, 
  Lock, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'seguridad', name: 'Seguridad', icon: Lock },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-wide transition-colors">Configuración</h1>
          <p className="text-sm text-text-muted mt-1 transition-colors">Administra las preferencias de tu sistema</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-main hover:bg-brand-hover text-white rounded-md font-medium text-sm transition-colors shadow-sm dark:shadow-none">
          <Save size={16} />
          <span>Guardar Cambios</span>
        </button>
      </div>

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
            <div className="p-6 md:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-lg font-bold text-text-main mb-1">Información del Gimnasio</h2>
                <p className="text-sm text-text-muted mb-6">Actualiza los detalles básicos de tu establecimiento.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Nombre del Gimnasio</label>
                    <input 
                      type="text" 
                      defaultValue="GymSystem Central"
                      className="w-full px-4 py-2.5 bg-background border border-border-primary rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Teléfono de Contacto</label>
                    <input 
                      type="text" 
                      defaultValue="+54 11 1234-5678"
                      className="w-full px-4 py-2.5 bg-background border border-border-primary rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-medium text-text-main">Dirección</label>
                    <input 
                      type="text" 
                      defaultValue="Av. Siempre Viva 123, Buenos Aires"
                      className="w-full px-4 py-2.5 bg-background border border-border-primary rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seguridad' && (
             <div className="p-6 md:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
               <div>
                <h2 className="text-lg font-bold text-text-main mb-1">Seguridad de la Cuenta</h2>
                <p className="text-sm text-text-muted mb-6">Gestiona tus credenciales y aumenta la seguridad de tu sistema.</p>
                
                <div className="max-w-md flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Contraseña Actual</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-background border border-border-primary rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Nueva Contraseña</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-background border border-border-primary rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main">
                        <EyeOff size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main">Confirmar Nueva Contraseña</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-background border border-border-primary rounded-md text-sm text-text-main focus:outline-none focus:border-brand-main focus:ring-1 focus:ring-brand-main transition-colors"
                    />
                  </div>
                  <button className="w-fit px-4 py-2 mt-2 bg-surface border border-border-primary hover:bg-background text-text-main rounded-md font-medium text-sm transition-colors">
                    Actualizar Contraseña
                  </button>
                </div>
               </div>
               
               <hr className="border-border-primary" />

               <div>
                 <div className="flex items-center justify-between">
                   <div>
                     <h3 className="text-sm font-bold text-text-main">Autenticación de Dos Factores (2FA)</h3>
                     <p className="text-xs text-text-muted mt-1">Añade una capa extra de seguridad a tu cuenta.</p>
                   </div>
                   <button className="px-4 py-2 bg-brand-surface text-brand-main rounded-md text-sm font-medium hover:bg-brand-main hover:text-white transition-colors">
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
