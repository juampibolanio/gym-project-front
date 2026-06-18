'use client';

import { useState } from 'react';
import { Building, Lock } from 'lucide-react';
import { GeneralTab } from './GeneralTab';
import { SecurityTab } from './SecurityTab';

export function ConfigurationTabs() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'seguridad', name: 'Seguridad', icon: Lock },
  ];

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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
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
          {activeTab === 'general' && <GeneralTab />}
          {activeTab === 'seguridad' && <SecurityTab />}
        </div>

      </div>
    </div>
  );
}
