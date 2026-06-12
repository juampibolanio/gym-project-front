import { ConfigurationTabs } from '@/features/configuration/components/ConfigurationTabs';

export default function ConfigurationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-wide transition-colors">Configuración</h1>
          <p className="text-sm text-text-muted mt-1 transition-colors">Administra las preferencias de tu sistema</p>
        </div>
      </div>
      <ConfigurationTabs />
    </div>
  );
}
