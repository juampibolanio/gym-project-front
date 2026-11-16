import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Database, UserCheck, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Protección de Datos',
  description: 'Conoce cómo ChacuGym protege y resguarda la privacidad y los datos de tu gimnasio y de tus socios.',
};

export default function PrivacidadPage() {
  return (
    <article className="space-y-8 animate-in fade-in duration-300">
      <header className="border-b border-border-primary pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-success-surface text-success-main border border-success-main/20">
            <Shield size={14} aria-hidden="true" />
            <span>Protección de Datos • Ley 25.326</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={14} aria-hidden="true" />
            <span>Última actualización: 16 de noviembre de 2026</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-base text-text-muted leading-relaxed">
          En ChacuGym nos tomamos muy en serio la confidencialidad, integridad y seguridad de la información de tu centro deportivo y de tus socios. Este documento detalla nuestras políticas de tratamiento y resguardo de datos.
        </p>

        <div className="mt-4 p-4 rounded-xl bg-surface border border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <span className="text-text-muted">
            ¿Deseas revisar las condiciones de uso y licencias del software?
          </span>
          <Link
            href="/terminos"
            className="inline-flex items-center gap-1 text-brand-main font-semibold hover:underline shrink-0"
          >
            <span>Ver Términos y Condiciones</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-text-main text-sm sm:text-base leading-relaxed">
        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">1</span>
            Marco Normativo y Principios Generales
          </h2>
          <p className="text-text-muted">
            Esta Política de Privacidad se ajusta a lo establecido por la <strong>Ley N° 25.326 de Protección de los Datos Personales</strong> de la República Argentina, sus normas reglamentarias y directrices internacionales en materia de privacidad digital. Nos regimos por los principios de licitud, finalidad, exactitud de los datos, minimización y seguridad técnica.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">2</span>
            Roles en el Tratamiento de la Información
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-lg bg-surface-hover border border-border-primary space-y-1.5">
              <h3 className="font-semibold text-text-main text-sm flex items-center gap-2">
                <UserCheck size={16} className="text-brand-main" aria-hidden="true" />
                El Gimnasio (Responsable)
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                El centro deportivo actúa como <strong>Responsable del Tratamiento</strong> de los datos de sus socios y alumnos, decidiendo la recolección y finalidades de la información.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-hover border border-border-primary space-y-1.5">
              <h3 className="font-semibold text-text-main text-sm flex items-center gap-2">
                <Database size={16} className="text-brand-main" aria-hidden="true" />
                ChacuGym (Encargado)
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                ChacuGym actúa como <strong>Encargado del Tratamiento</strong>, proveyendo la infraestructura cloud, almacenamiento seguro y procesamiento técnico bajo instrucciones del gimnasio.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">3</span>
            Datos que Recopila y Procesa la Plataforma
          </h2>
          <p className="text-text-muted">
            A través de las distintas secciones del sistema, se procesan las siguientes categorías de información:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-muted">
            <li><strong>Datos de Administradores y Operadores:</strong> Nombre completo, correo electrónico, rol de permisos y hash criptográfico de contraseña.</li>
            <li><strong>Datos de Alumnos y Socios:</strong> Nombre, número de documento (DNI), teléfono de contacto, dirección, fecha de nacimiento, contacto de emergencia y fotografía de perfil voluntaria.</li>
            <li><strong>Registros Administrativos y Contables:</strong> Planes de membresía contratados, fechas de inicio y vencimiento, historial de cobros, métodos de pago y estado de la membresía.</li>
            <li><strong>Datos Técnicos de Conexión:</strong> Registros de acceso con fecha, hora, dirección IP y navegador para fines exclusivos de auditoría de seguridad y prevención de fraudes.</li>
          </ul>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">4</span>
            Medidas Técnicas de Seguridad y Blindaje
          </h2>
          <p className="text-text-muted">
            ChacuGym aplica medidas de seguridad de última generación para evitar la alteración, pérdida, acceso o tratamiento no autorizado de los datos:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-lg border border-border-primary bg-surface-hover flex items-start gap-3">
              <Lock size={18} className="text-brand-main shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="text-xs font-bold text-text-main">Cifrado en Tránsito (TLS/HTTPS)</h4>
                <p className="text-[11px] text-text-muted mt-0.5">Todas las comunicaciones entre tu navegador y nuestros servidores están cifradas mediante protocolos modernos TLS 1.3.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-border-primary bg-surface-hover flex items-start gap-3">
              <Shield size={18} className="text-brand-main shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="text-xs font-bold text-text-main">Cookies HttpOnly y Mitigación XSS</h4>
                <p className="text-[11px] text-text-muted mt-0.5">Los tokens de renovación se empaquetan en cookies seguras HttpOnly; SameSite=Lax, inaccesibles por scripts JavaScript maliciosos.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-border-primary bg-surface-hover flex items-start gap-3">
              <Lock size={18} className="text-brand-main shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="text-xs font-bold text-text-main">Contraseñas con Hashing Bcrypt</h4>
                <p className="text-[11px] text-text-muted mt-0.5">Las contraseñas nunca se almacenan en texto plano; se utiliza algoritmo bcrypt con salting criptográfico unidireccional.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-border-primary bg-surface-hover flex items-start gap-3">
              <Database size={18} className="text-brand-main shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="text-xs font-bold text-text-main">Aislamiento Multi-Tenant Estricto</h4>
                <p className="text-[11px] text-text-muted mt-0.5">La información de cada gimnasio está aislada lógicamente mediante identificadores tenant en cada consulta a nivel base de datos.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">5</span>
            Uso de Cookies y Almacenamiento Local
          </h2>
          <p className="text-text-muted">
            La plataforma utiliza cookies estrictamente técnicas indispensables para el funcionamiento y seguridad de la aplicación:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-text-muted text-xs sm:text-sm">
            <li><strong>refreshToken:</strong> Cookie protegida con atributos <code>HttpOnly</code>, <code>Secure</code> y <code>SameSite=Lax</code> para la rotación automática de sesión.</li>
            <li><strong>theme:</strong> Almacenamiento local para recordar la preferencia del usuario entre modo oscuro y modo claro.</li>
          </ul>
          <p className="text-xs text-text-muted italic">
            ChacuGym no utiliza cookies de seguimiento comercial de terceros ni comercializa perfiles de navegación.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">6</span>
            No Cesión ni Venta de Información
          </h2>
          <p className="text-text-muted">
            Bajo ninguna circunstancia ChacuGym venderá, alquilará, comercializará ni transferirá bases de datos de socios o centros deportivos a anunciantes, empresas de marketing o terceros ajenos a la prestación del servicio contratado.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">7</span>
            Derechos de los Titulares (Derechos ARCO)
          </h2>
          <p className="text-text-muted">
            Conforme a la Ley N° 25.326, los titulares de los datos tienen derecho a acceder, rectificar, actualizar o solicitar la supresión de su información personal. Los socios pueden ejercer estos derechos dirigiéndose directamente a la administración de su gimnasio o enviando una solicitud a los canales de atención de ChacuGym.
          </p>
        </section>
      </div>

      <footer className="pt-6 border-t border-border-primary flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-success-main" aria-hidden="true" />
          <span>Cumplimiento riguroso de normativas de privacidad y protección de datos.</span>
        </div>
        <Link
          href="/terminos"
          className="text-brand-main font-semibold hover:underline"
        >
          Consultar Términos y Condiciones de Uso →
        </Link>
      </footer>
    </article>
  );
}
