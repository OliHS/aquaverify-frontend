import React from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FlaskConical,
  Layers3,
  ShieldCheck
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';

type MarketingContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  faqs?: Array<{ question: string; answer: string }>;
};

type Props = {
  content: MarketingContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

const challenges = [
  {
    number: '01',
    title: 'Más volumen con el mismo equipo',
    body: 'La entrada de muestras crece, pero la revisión, la transcripción y la comunicación con clientes siguen dependiendo de pasos manuales.'
  },
  {
    number: '02',
    title: 'Evidencia dispersa',
    body: 'Datos de muestra, lote, lectura, incubación, controles, incidencias e informe quedan en herramientas diferentes y difíciles de auditar.'
  },
  {
    number: '03',
    title: 'Clientes que piden más visibilidad',
    body: 'Utilities, industria, administración y operadores multi-sede quieren estado de muestra, histórico y entregables sin depender de cadenas de email.'
  }
];

const solutionCards = [
  ['Dirección de laboratorio', 'Mayor capacidad operativa, control de TAT, margen por muestra y nuevas líneas de servicio para clientes públicos y privados.'],
  ['Responsable de calidad', 'Registros por usuario, lote, método, muestra, ubicación, lectura, revisión, desviación e informe para trabajar con procedimientos consistentes.'],
  ['Técnico de microbiología', 'Kits, medios listos para usar, pasos guiados y menor dependencia de transcripción manual en tareas repetitivas.'],
  ['Cliente B2B', 'Estado de muestras, informes descargables, histórico por punto de muestreo y comunicación clara con el laboratorio.']
];

const flowSteps = [
  ['Solicitud y alta', 'Cliente, matriz, ubicación, punto de muestreo, prioridad, método y entregable esperado.'],
  ['Recepción y custodia', 'ID de muestra, responsable, fecha, condiciones, lote, incidencias y trazabilidad inicial.'],
  ['Preparación y ensayo', 'Kit, medio, volumen, dilución, control, incubación y parámetros vinculados al protocolo.'],
  ['Lectura y evidencia', 'Resultado, unidad, observaciones, evidencia de lectura y registro del usuario que ejecuta.'],
  ['Revisión técnica', 'Validación, desviaciones, liberación, notas técnicas y control de versiones.'],
  ['Informe y portal', 'CoA, histórico por cliente, descarga, estado de muestra y comunicación B2B.']
];

const matrixRows = [
  ['Screening y priorización', 'Agua de consumo, regenerada y muestras con bajo recuento esperado', 'INDICA Soma 100 mL', 'Presencia/ausencia en 100 mL'],
  ['Enumeración ágil', 'Potable, subterránea, superficial y efluente validado por el laboratorio', 'ENUMERA Soma 100 mL', 'MPN/100 mL y registro de lectura'],
  ['Placa en matrices complejas', 'Residual, recreativa, sedimentos, lodos y extractos de marisco cuando aplique', 'PLAQUE Soma 1 mL', 'PFU según dilución y protocolo'],
  ['Placa 100 mL bajo recuento', 'Consumo, regenerada y programas de verificación con bajo recuento esperado', 'PLAQUE Soma 100 mL', 'PFU/100 mL con trazabilidad del ensayo'],
  ['Entrega y comunicación B2B', 'Clientes multi-sede, utilities, administración e industria', 'AquaVerify Cloud, App, CoA y portal', 'Estado, histórico, informe y evidencias']
];

const roadmap = [
  ['Diagnóstico del flujo', 'Volumen, matrices, métodos, TAT, puntos de fricción, software actual y necesidades de reporting.'],
  ['Estandarización técnica', 'Kits, medios, controles, lectura, criterios de revisión y plantillas de resultado consistentes.'],
  ['Registro digital', 'Muestra, lote, usuario, ubicación, evidencia, desviación y validación conectados en una misma trazabilidad.'],
  ['Portal cliente', 'Estados, histórico, informes CoA, descarga y comunicación por cliente o instalación.'],
  ['Escalado del servicio', 'Nuevas líneas microbiológicas, clientes multi-sede, reporting avanzado e integración con sistemas existentes.']
];

const productCards = [
  ['ENUMERA Soma 100 mL', 'Enumeración específica de colífagos somáticos en 100 mL mediante cambio de color y MPN, con flujo de lectura orientado a respuesta ágil.', ['100 mL', 'MPN', 'Colífagos somáticos']],
  ['PLAQUE Soma 1 mL', 'Flujo de placa para enumerar colífagos somáticos en aguas y matrices que requieren dilución o preparación específica según protocolo.', ['1 mL', 'DAL', 'PFU']],
  ['PLAQUE Soma 100 mL', 'Flujo de placa para muestras de 100 mL donde se esperan bajos recuentos, con consumibles y material biológico para el ensayo.', ['100 mL', 'SAL', 'PFU/100 mL']],
  ['INDICA Soma 100 mL', 'Presencia/ausencia de colífagos somáticos en 100 mL para screening, verificación rápida y priorización de decisiones operativas.', ['P/A', '100 mL', 'Screening']],
  ['MSA y MSB listos para usar', 'Medios preparados para reducir variabilidad en la preparación y dar soporte a flujos de laboratorio en microbiología del agua.', ['RTU', 'Medios', 'Banco']],
  ['AquaVerify Cloud, App y CoA', 'Registro de muestra, lote, lectura, evidencia, revisión, informe, histórico y portal cliente para cerrar el ciclo de servicio.', ['Cloud', 'CoA', 'Portal']]
];

const sectors = [
  ['Utilities y administración', 'Programas de agua de consumo, vigilancia ambiental, aguas residuales, regeneradas y respuesta a incidencias.', Building2],
  ['Industria alimentaria y bebidas', 'Agua de proceso, limpieza, puntos críticos, lotes, auditorías y documentación para equipos de calidad.', ShieldCheck],
  ['Tratamiento y reutilización', 'Verificación microbiológica, seguimiento de eficacia del tratamiento y reporting para operadores técnicos.', Layers3],
  ['Agricultura, acuicultura y seafood', 'Agua de riego, matrices ambientales, extractos, bioseguridad y control de riesgo microbiológico.', FlaskConical]
];

const capabilities = [
  ['Cadena de custodia digital', 'Relaciona muestra, ubicación, fecha, usuario, condición, lote y estado.', 'Menos ambigüedad y más facilidad para reconstruir el historial de una muestra.'],
  ['Evidencias de ejecución', 'Conecta preparación, ensayo, lectura, controles, desviaciones y revisión.', 'Resultados más defendibles y revisión técnica mejor organizada.'],
  ['Reporting CoA', 'Convierte datos validados en informes claros, consistentes y descargables.', 'Entrega más rápida y uniforme para clientes B2B con requisitos exigentes.'],
  ['Portal cliente', 'Ofrece estado, histórico, documentos y comunicación por cuenta o instalación.', 'Menos emails operativos y una experiencia de servicio más profesional.'],
  ['Adopción modular', 'Permite empezar por kits, trazabilidad interna o reporting según prioridad.', 'Implementación gradual sin rediseñar todo el laboratorio desde el primer día.']
];

const references = [
  ['ISO/IEC 17025', 'Marco internacional para demostrar competencia, imparcialidad y operación consistente en laboratorios de ensayo y calibración.', 'https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html'],
  ['ISO 10705-2', 'Norma de calidad del agua para detección y enumeración de bacteriófagos; parte 2: colífagos somáticos.', 'https://www.iso.org/standard/20127.html'],
  ['US-EPA Method 1602', 'Procedimiento SAL para colífagos somáticos y F+ en agua, con resultados expresados como unidades formadoras de placa.', 'https://www.epa.gov/sites/default/files/2015-12/documents/method_1602_2001.pdf'],
  ['Real Decreto 3/2023', 'Marco español de criterios técnicos y sanitarios para agua de consumo, suministro y control de calidad.', 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-628']
];

const labFormSectors = [
  'Laboratorio ambiental',
  'Laboratorio público',
  'Utility / municipal',
  'Food & beverage',
  'Tratamiento de agua',
  'Agricultura',
  'Seafood / acuicultura',
  'Otro'
];

const fallbackFaqs = [
  ['¿AquaVerify sustituye a un laboratorio acreditado?', 'No. AquaVerify actúa como capa de producto, trazabilidad, flujo digital, reporting y portal cliente. Cuando un ensayo se emite bajo acreditación, debe integrarse en el alcance, los métodos, las validaciones y los procedimientos aprobados por el propio laboratorio.'],
  ['¿Para qué tipo de laboratorios está pensado?', 'Está pensado para laboratorios ambientales, laboratorios públicos, laboratorios de utilities, laboratorios que sirven a industria alimentaria, equipos internos de control de agua y organizaciones que quieren ampliar servicios microbiológicos con mayor trazabilidad.'],
  ['¿Qué aporta frente a un LIMS genérico?', 'Aporta un enfoque específico en microbiología del agua: matrices, puntos de muestreo, colífagos somáticos, kits, lotes, evidencias de lectura, informes CoA, histórico por cliente y comunicación B2B desde el mismo flujo de trabajo.'],
  ['¿Puede ayudar a reducir el TAT o tiempo de respuesta?', 'Sí, al estandarizar pasos, reducir transcripción manual, ordenar la revisión técnica y facilitar la emisión del informe. El impacto real depende del volumen de muestras, los métodos aplicados, el equipo disponible y el flujo actual del laboratorio.'],
  ['¿Qué productos encajan con colífagos somáticos?', 'ENUMERA Soma 100 mL, PLAQUE Soma 1 mL, PLAQUE Soma 100 mL, INDICA Soma 100 mL, medios MSA/MSB y AquaVerify Cloud & App cubren escenarios de presencia/ausencia, enumeración, placa, reporting y trazabilidad digital según la matriz y el protocolo del laboratorio.'],
  ['¿Sirve para clientes B2B con varias ubicaciones?', 'Sí. El portal cliente permite organizar muestras, ubicaciones, históricos, entregables y comunicación por cuenta, instalación o punto de muestreo para reducir correos operativos y acelerar la entrega de información.'],
  ['¿Se puede integrar con procesos existentes?', 'Sí. La adopción puede empezar como flujo interno de muestra a informe y evolucionar hacia integración con LIMS, CRM, reporting, portal cliente o procesos multi-sede cuando el laboratorio lo necesite.'],
  ['¿Cómo se inicia un proyecto?', 'El primer paso es un diagnóstico técnico del flujo actual: matrices, volumen mensual, métodos, requisitos de acreditación, TAT objetivo, software existente, puntos de fricción y necesidades de reporting para clientes.']
];

function trackSignup(label: string, targetUrl: string) {
  trackCorporateEvent('platform_link_click', {
    lang: 'es',
    page: 'water-testing-labs',
    category: 'industries',
    intent: 'quote',
    label,
    target_url: targetUrl,
    path: '/es/industrias/laboratorios-analisis-agua'
  });
}

export const WaterTestingLabsLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const signupUrl = getPlatformSignupUrl({
    intent: 'quote',
    page: 'water-testing-labs',
    category: 'industries',
    profile: 'labs'
  }, pageLang);
  const faqs = (content.faqs?.length ? content.faqs.map((item) => [item.question, item.answer]) : fallbackFaqs) as string[][];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const company = String(form.get('company') || '').trim();
    const email = String(form.get('email') || '').trim();
    const sector = String(form.get('sector') || '').trim();
    const country = String(form.get('country') || '').trim();
    const waterType = String(form.get('water_type') || '').trim();
    const sampleVolume = String(form.get('sample_volume') || '').trim();
    const currentMethod = String(form.get('current_method') || '').trim();
    const mainNeed = String(form.get('main_need') || '').trim();

    trackCorporateEvent('water_testing_lab_diagnosis_submit', {
      lang: pageLang,
      page: 'water-testing-labs',
      category: 'industries',
      intent: 'quote',
      profile: sector || 'labs',
      country,
      product: waterType,
      module: 'lab-diagnosis'
    });

    window.location.href = getPlatformSignupUrl({
      intent: 'quote',
      page: 'water-testing-labs',
      category: 'industries',
      profile: sector || 'labs',
      product: waterType,
      module: 'lab-diagnosis',
      country,
      water_type: waterType,
      sample_volume: sampleVolume,
      current_method: currentMethod,
      main_need: mainNeed,
      prefill_name: name,
      prefill_email: email,
      prefill_company: company
    }, pageLang);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,174,239,0.28),transparent_34%),linear-gradient(135deg,rgba(0,68,130,0.98),rgba(15,23,42,1))]" />
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-cyan-200/25 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                {content.eyebrow || 'Laboratorios públicos y privados de análisis de agua'}
              </div>
              <h1 className="mt-6 font-heading text-4xl font-black leading-tight md:text-6xl">
                {content.title || 'Laboratorios de análisis de agua: más capacidad, trazabilidad y confianza en cada informe'}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/85">
                {content.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={signupUrl}
                  onClick={() => trackSignup(content.primaryCta || 'Solicitar diagnóstico técnico', signupUrl)}
                  className="inline-flex items-center justify-center rounded bg-secondary px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-white hover:text-primary"
                >
                  {content.primaryCta || 'Solicitar diagnóstico técnico'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#flujo"
                  className="inline-flex items-center justify-center rounded border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  {content.secondaryCta || 'Ver flujo muestra a informe'}
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <h2 className="font-heading text-2xl font-black">Diseñado para crecer sin perder control</h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-cyan-50/90">
                {[
                  'Reducir fricción entre recepción, banco, revisión técnica y entrega del informe.',
                  'Documentar cadena de custodia, lote, usuario, método, lectura y validación.',
                  'Incorporar o escalar ensayos de colífagos somáticos con flujos consistentes.',
                  'Ofrecer a clientes B2B un histórico claro por instalación, ubicación y muestra.'
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ['100 mL', 'Flujos para bajos recuentos'],
                  ['CoA', 'Informes trazables'],
                  ['ISO 17025', 'Apoyo documental'],
                  ['Portal B2B', 'Historico y comunicación']
                ].map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="font-heading text-2xl font-black text-white">{value}</div>
                    <div className="mt-1 text-xs font-bold leading-5 text-cyan-50/75">{label}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="reto" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">El reto del laboratorio de agua</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                El cliente no compra solo un análisis: compra velocidad, evidencia y confianza.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Los laboratorios de análisis de agua reciben más muestras, más matrices y más exigencias documentales. La presión aparece cuando el volumen crece, el TAT se estrecha y cada dato debe ser defendible ante clientes, auditorías y responsables técnicos.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['TAT', 'Cadena de custodia', 'Colífagos somáticos', 'Informes CoA'].map((item) => (
                  <span key={item} className="rounded-full border border-cyan-100 bg-white px-3 py-2 text-xs font-black text-cyan-800">{item}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {challenges.map((item) => (
                <article key={item.number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-5">
                    <span className="font-heading text-3xl font-black text-cyan-600">{item.number}</span>
                    <div>
                      <h3 className="font-heading text-xl font-black text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="solución" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Solución AquaVerify</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Un flujo conectado para microbiología del agua, trazabilidad y reporting.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                AquaVerify une producto, ejecución, datos y entrega al cliente en un sistema práctico para laboratorios que quieren estandarizar operaciones, ampliar servicios y reducir fricción en la emisión de resultados.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {solutionCards.map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                  <div className="h-1.5 w-16 rounded-full bg-secondary" />
                  <h3 className="mt-5 font-heading text-xl font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="flujo" className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Flujo operativo</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                De la muestra al informe CoA: trazabilidad de extremo a extremo.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Cada etapa del análisis puede quedar conectada con la siguiente para que el laboratorio trabaje con menos fricción y con evidencias listas para revisión técnica.
              </p>
            </div>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-black text-primary">Flujo operativo muestra a informe</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Una estructura para coordinar recepción, banco, calidad y cliente sin perder información crítica.</p>
                </div>
                <ClipboardCheck className="h-10 w-10 text-secondary" />
              </div>
              <ol className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {flowSteps.map(([title, body], index) => (
                  <li key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="font-heading text-lg font-black text-slate-950">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {['Menos transcripción manual', 'Más consistencia documental', 'Entrega más clara al cliente', 'Datos preparados para auditoría'].map((item) => (
                  <div key={item} className="rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-center text-xs font-black text-cyan-800">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Matriz de decisión</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Qué activar según matriz, volumen y tipo de cliente.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                El laboratorio puede combinar kits, medios, trazabilidad digital y reporting según el método, el volumen de muestra y el nivel de servicio prometido al cliente.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="hidden grid-cols-[0.9fr_1.2fr_1fr_1fr] bg-primary text-xs font-black uppercase tracking-[0.14em] text-white lg:grid">
                {['Necesidad', 'Matrices habituales', 'Producto o flujo', 'Entregable'].map((head) => (
                  <div key={head} className="px-5 py-4">{head}</div>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {matrixRows.map((row) => (
                  <div key={row[0]} className="grid gap-3 p-5 text-sm lg:grid-cols-[0.9fr_1.2fr_1fr_1fr] lg:gap-0 lg:p-0">
                    {row.map((cell, index) => (
                      <div key={`${row[0]}-${index}`} className="lg:border-r lg:border-slate-100 lg:px-5 lg:py-4 lg:last:border-r-0">
                        <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 lg:hidden">
                          {['Necesidad', 'Matrices habituales', 'Producto o flujo', 'Entregable'][index]}
                        </span>
                        <span className={index === 0 || index === 2 ? 'font-black text-slate-900' : 'font-semibold leading-6 text-slate-600'}>{cell}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Evolucion del servicio</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Roadmap para convertir el laboratorio en un servicio más escalable.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                AquaVerify permite avanzar por etapas: primero ordenar el flujo, después digitalizar evidencias, y finalmente diferenciar la entrega al cliente.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {roadmap.map(([title, body], index) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-black text-secondary">0{index + 1}</div>
                  <h3 className="mt-3 font-heading text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="productos" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Productos y módulos</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Un ecosistema para análisis microbiológico de agua y entrega técnica.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Los módulos se pueden adoptar de forma progresiva: desde kits y medios hasta trazabilidad digital, reporting y portal cliente.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {productCards.map(([title, body, tags]) => (
                <article key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-200 hover:bg-white hover:shadow-lg">
                  <FlaskConical className="h-7 w-7 text-secondary" />
                  <h3 className="mt-4 font-heading text-xl font-black text-slate-950">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{body as string}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(tags as string[]).map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-black text-slate-600">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Clientes del laboratorio</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Preparado para servir a sectores con alta exigencia de control hídrico.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                La solución permite al laboratorio responder con más claridad a clientes que necesitan resultados trazables, repetibles y fáciles de interpretar.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {sectors.map(([title, body, Icon]) => (
                <article key={title as string} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  {React.createElement(Icon as typeof Building2, { className: 'h-7 w-7 text-secondary' })}
                  <h3 className="mt-4 font-heading text-xl font-black text-slate-950">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{body as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Capacidades clave</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Lo que cambia cuando la muestra, el ensayo y el informe comparten trazabilidad.
              </h2>
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="hidden grid-cols-3 bg-slate-950 text-xs font-black uppercase tracking-[0.14em] text-white lg:grid">
                {['Capacidad', 'Qué resuelve', 'Impacto para el laboratorio'].map((head) => (
                  <div key={head} className="px-5 py-4">{head}</div>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {capabilities.map((row) => (
                  <div key={row[0]} className="grid gap-3 p-5 text-sm lg:grid-cols-3 lg:gap-0 lg:p-0">
                    {row.map((cell, index) => (
                      <div key={`${row[0]}-${index}`} className="lg:border-r lg:border-slate-100 lg:px-5 lg:py-4 lg:last:border-r-0">
                        <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 lg:hidden">
                          {['Capacidad', 'Qué resuelve', 'Impacto'][index]}
                        </span>
                        <span className={index === 0 ? 'font-black text-slate-900' : 'font-semibold leading-6 text-slate-600'}>{cell}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Referencias técnicas</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Lenguaje técnico sólido para laboratorios con sistemas de calidad exigentes.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                AquaVerify ayuda a estructurar registros, trazabilidad e informes; la acreditación, el alcance y la validez del método dependen de los procedimientos aprobados por cada laboratorio.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {references.map(([title, body, href]) => (
                <a key={title} href={href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                  <FileCheck2 className="h-7 w-7 text-secondary" />
                  <h3 className="mt-4 font-heading text-xl font-black text-slate-950 group-hover:text-primary">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Preguntas frecuentes</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Respuestas para dirección, calidad, microbiología y clientes B2B.
              </h2>
            </div>
            <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-5 first:pt-0 last:pb-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-black text-slate-950">
                    {question}
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="diagnostico" className="bg-slate-50 py-16 pb-24 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Diagnóstico técnico</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                Convierte tu flujo de muestras de agua en un servicio más rápido, trazable y escalable.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Comparte el tipo de laboratorio, matrices, volumen y método actual. La solicitud continúa en AquaVerify Cloud para que el equipo comercial la reciba con origen, sector y contexto técnico.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Nombre" name="name" placeholder="Nombre y apellidos" required />
                <FormField label="Empresa" name="company" placeholder="Organización" required />
                <FormField label="Email profesional" name="email" type="email" placeholder="nombre@empresa.com" required />
                <label className="grid gap-2 text-sm font-black text-slate-800">
                  Sector
                  <select name="sector" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100">
                    {labFormSectors.map((sector) => <option key={sector}>{sector}</option>)}
                  </select>
                </label>
                <FormField label="País" name="country" placeholder="España, Francia, Estados Unidos..." />
                <FormField label="Tipo de agua" name="water_type" placeholder="Consumo, proceso, riego, regenerada..." />
                <FormField label="Muestras al mes" name="sample_volume" placeholder="50, 200, 1000+" />
                <FormField label="Método actual" name="current_method" placeholder="Kit actual, laboratorio, Excel, LIMS..." />
                <label className="grid gap-2 text-sm font-black text-slate-800 md:col-span-2">
                  Necesidad principal
                  <textarea name="main_need" placeholder="Auditoría, colífagos, TAT, trazabilidad digital..." className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
                </label>
                <div className="md:col-span-2">
                  <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-cyan-700 md:w-auto">
                    Continuar en AquaVerify Cloud
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
                    La solicitud continúa en AquaVerify Cloud para que el equipo comercial la reciba con origen, sector y contexto del laboratorio.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

const FormField: React.FC<{ label: string; name: string; type?: string; placeholder?: string; required?: boolean }> = ({ label, name, type = 'text', placeholder, required = false }) => (
  <label className="grid gap-2 text-sm font-black text-slate-800">
    {label}
    <input name={name} type={type} placeholder={placeholder} required={required} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" />
  </label>
);
