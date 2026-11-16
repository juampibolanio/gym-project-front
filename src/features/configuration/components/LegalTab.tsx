'use client';

import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Database, 
  Info 
} from 'lucide-react';

export function LegalTab() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-lg font-bold text-text-main mb-1">
          Marco Legal y Privacidad
        </h2>
        <p className="text-sm text-text-muted">
          Información regulatoria, políticas de protección de datos personales y términos contractuales del servicio.
        </p>
      </div>

      {/* Compliance Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-border-primary bg-surface-hover/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-success-main font-semibold text-sm">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>Ley N° 25.326 (Protección de Datos)</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Plataforma diseñada en estricta conformidad con la legislación argentina de protección de datos personales y derechos ARCO.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border-primary bg-surface-hover/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-brand-main font-semibold text-sm">
            <Lock size={16} aria-hidden="true" />
            <span>Cifrado y Sesión Segura</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Comunicaciones bajo TLS 1.3, contraseñas con hashing bcrypt y cookies HttpOnly SameSite=Lax para blindaje ante ataques XSS.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border-primary bg-surface-hover/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-brand-main font-semibold text-sm">
            <Database size={16} aria-hidden="true" />
            <span>Aislamiento Multi-Tenant</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Partición lógica de datos de cada gimnasio por tenant id, garantizando que ninguna otra entidad tenga acceso a tu información.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border-primary bg-surface-hover/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-brand-main font-semibold text-sm">
            <Shield size={16} aria-hidden="true" />
            <span>No Comercialización</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Los datos de tus socios y operaciones jamás son vendidos, alquilados ni transferidos a empresas de publicidad o terceros.
          </p>
        </div>
      </div>

      {/* Direct Document Links */}
      <div className="flex flex-col gap-4 pt-2">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-wider text-text-muted text-[11px]">
          Documentos Legales Completos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/terminos"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl border border-border-primary bg-surface hover:border-brand-main/40 hover:bg-surface-hover transition-all flex items-start justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-brand-surface text-brand-main shrink-0 group-hover:scale-105 transition-transform">
                <FileText size={20} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-text-main group-hover:text-brand-main transition-colors flex items-center gap-1.5">
                  <span>Términos y Condiciones</span>
                  <ExternalLink size={13} className="text-text-muted group-hover:text-brand-main transition-colors" aria-hidden="true" />
                </h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Condiciones de contratación, alcance de la licencia de software, responsabilidades y uso aceptable.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl border border-border-primary bg-surface hover:border-brand-main/40 hover:bg-surface-hover transition-all flex items-start justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-brand-surface text-brand-main shrink-0 group-hover:scale-105 transition-transform">
                <Shield size={20} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-text-main group-hover:text-brand-main transition-colors flex items-center gap-1.5">
                  <span>Política de Privacidad</span>
                  <ExternalLink size={13} className="text-text-muted group-hover:text-brand-main transition-colors" aria-hidden="true" />
                </h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Detalles sobre el almacenamiento de datos personales, cookies técnicas de sesión y ejercicio de derechos ARCO.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Software & Provider Information Box */}
      <div className="p-4 rounded-xl border border-border-primary bg-surface-hover/30 flex items-start gap-3 text-xs text-text-muted">
        <Info size={18} className="text-brand-main shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-medium text-text-main">
            ChacuGym v1.9.0 • Desarrollado por Chacú.IO
          </p>
          <p className="leading-relaxed">
            Plataforma SaaS para la gestión integral de centros deportivos. Para consultas sobre el tratamiento de datos personales o términos contractuales, contacta a la administración de tu gimnasio o al equipo de soporte de Chacú.IO.
          </p>
        </div>
      </div>
    </div>
  );
}
