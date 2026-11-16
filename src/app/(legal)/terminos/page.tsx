import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso',
  description: 'Términos y condiciones de uso de la plataforma de gestión deportiva ChacuGym.',
};

export default function TerminosPage() {
  return (
    <article className="space-y-8 animate-in fade-in duration-300">
      <header className="border-b border-border-primary pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-brand-surface text-brand-main border border-brand-main/20">
            <FileText size={14} aria-hidden="true" />
            <span>Condiciones Contractuales</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={14} aria-hidden="true" />
            <span>Última actualización: 16 de noviembre de 2026</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
          Términos y Condiciones de Uso
        </h1>
        <p className="mt-2 text-base text-text-muted leading-relaxed">
          Por favor, lee atentamente estos términos antes de utilizar la plataforma ChacuGym. Al acceder o utilizar el servicio, aceptas quedar legalmente vinculado por las siguientes cláusulas.
        </p>

        <div className="mt-4 p-4 rounded-xl bg-surface border border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <span className="text-text-muted">
            ¿Buscas información sobre el tratamiento y resguardo de datos personales?
          </span>
          <Link
            href="/privacidad"
            className="inline-flex items-center gap-1 text-brand-main font-semibold hover:underline shrink-0"
          >
            <span>Ver Política de Privacidad</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-text-main text-sm sm:text-base leading-relaxed">
        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">1</span>
            Objeto y Descripción del Servicio
          </h2>
          <p className="text-text-muted">
            ChacuGym es una plataforma de software como servicio (SaaS) desarrollada y provista por Chacú.IO, orientada a la administración integral de gimnasios, boxes de entrenamiento y centros deportivos. Entre sus funcionalidades se incluyen la administración de legajos de socios, planes de membresía, registro de pagos, analíticas operativas y control de accesos.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">2</span>
            Cuentas, Credenciales y Responsabilidad de Acceso
          </h2>
          <p className="text-text-muted">
            El acceso a la plataforma está restringido a administradores y operadores autorizados por cada establecimiento. El titular de la cuenta es el único y exclusivo responsable de:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-muted">
            <li>Mantener la estricta confidencialidad de sus credenciales de ingreso (correo electrónico y contraseña).</li>
            <li>Asignar los roles de usuario (SuperAdmin, Admin, User) correspondientes a cada miembro de su equipo según sus responsabilidades reales.</li>
            <li>Notificar de inmediato a ChacuGym ante cualquier sospecha razonable de acceso no autorizado o vulneración de seguridad en su terminal.</li>
          </ul>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">3</span>
            Uso Aceptable y Restricciones
          </h2>
          <p className="text-text-muted">
            El usuario se compromete a hacer un uso lícito y ético de la plataforma. Queda terminantemente prohibido:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-text-muted">
            <li>Vulnerar o intentar vulnerar los controles de acceso, límites de tasa (rate limiting) o mecanismos de aislamiento multi-tenant del sistema.</li>
            <li>Utilizar la plataforma para distribuir contenido malicioso, virus, troyanos o ejecutar análisis de penetración sin autorización previa por escrito.</li>
            <li>Aplicar ingeniería inversa, descompilar o intentar extraer el código fuente del software.</li>
            <li>Registrar o procesar datos de personas físicas sin contar con su debido consentimiento o autorización conforme a la legislación aplicable.</li>
          </ul>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">4</span>
            Responsabilidad sobre los Datos Cargados
          </h2>
          <p className="text-text-muted">
            El centro deportivo actúa en calidad de <strong>Responsable del Tratamiento</strong> de la información de sus clientes y socios. En consecuencia, el centro deportivo garantiza que los datos personales, de contacto de emergencia y de salud o aptitud física cargados en la plataforma cuentan con las autorizaciones exigidas por la Ley N° 25.326 de Protección de Datos Personales.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">5</span>
            Propiedad Intelectual
          </h2>
          <p className="text-text-muted">
            Todos los derechos de propiedad intelectual sobre la plataforma ChacuGym, incluyendo pero sin limitarse a código de software, arquitectura técnica, interfaces visuales, logotipos, marcas y documentación, son propiedad exclusiva de Chacú.IO. El otorgamiento del servicio constituye una licencia de uso temporal, no exclusiva, intransferible y revocable mientras dure la suscripción.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">6</span>
            Disponibilidad, Mantenimiento y Respaldos
          </h2>
          <p className="text-text-muted">
            ChacuGym implementa prácticas de ingeniería de software orientadas a una disponibilidad óptima, respaldos automatizados de base de datos y recuperación ante contingencias. No obstante, el servicio puede requerir interrupciones breves y programadas para actualizaciones de seguridad y mantenimiento preventivo, las cuales serán notificadas oportunamente.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">7</span>
            Limitación de Responsabilidad
          </h2>
          <p className="text-text-muted">
            ChacuGym provee una herramienta informática de soporte administrativo y de registro. En ningún caso ChacuGym será responsable por controversias civiles, comerciales, laborales o de salud que surjan entre el centro deportivo y sus alumnos, instructores o terceros proveedores.
          </p>
        </section>

        <section className="space-y-3 bg-surface p-6 rounded-xl border border-border-primary shadow-sm dark:shadow-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-surface text-brand-main text-xs font-extrabold flex items-center justify-center shrink-0">8</span>
            Ley Aplicable y Jurisdicción
          </h2>
          <p className="text-text-muted">
            Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes de la República Argentina. Cualquier divergencia o controversia derivada de la interpretación o ejecución del presente acuerdo será sometida a los Tribunales Ordinarios competentes.
          </p>
        </section>
      </div>

      <footer className="pt-6 border-t border-border-primary flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-success-main" aria-hidden="true" />
          <span>Documento legal vinculante para usuarios de ChacuGym.</span>
        </div>
        <Link
          href="/privacidad"
          className="text-brand-main font-semibold hover:underline"
        >
          Consultar Política de Privacidad →
        </Link>
      </footer>
    </article>
  );
}
