import React from 'react';
import { ClipboardList, FlaskConical, FileCheck2, Gauge, LayoutDashboard, Microscope, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';

const COPY: Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  steps: Array<{ title: string; body: string }>;
}> = {
  en: {
    eyebrow: 'From sample to evidence',
    title: 'One connected workflow for water microbiology',
    body: 'AquaVerify links the physical analysis with the digital record so product, sample, operator, reading, review and report stay connected.',
    steps: [
      { title: 'Sample', body: 'Register site, matrix and context.' },
      { title: 'Kit / method', body: 'Choose ENUMERA, INDICA or a technical workflow.' },
      { title: 'Digital record', body: 'Connect batch, operator and execution data.' },
      { title: 'Reading', body: 'Capture result and supporting evidence.' },
      { title: 'Review', body: 'Validate before customer delivery.' },
      { title: 'Report', body: 'Generate a traceable CoA or technical report.' },
      { title: 'Portal', body: 'Share history with customers and auditors.' }
    ]
  },
  es: {
    eyebrow: 'De muestra a evidencia',
    title: 'Un flujo conectado para microbiología del agua',
    body: 'AquaVerify une el análisis físico con el registro digital para que producto, muestra, operador, lectura, revisión e informe queden conectados.',
    steps: [
      { title: 'Muestra', body: 'Registra punto, matriz y contexto.' },
      { title: 'Kit / método', body: 'Elige ENUMERA, INDICA o un flujo técnico.' },
      { title: 'Registro digital', body: 'Conecta lote, operador y ejecución.' },
      { title: 'Lectura', body: 'Captura resultado y evidencia de soporte.' },
      { title: 'Revisión', body: 'Valida antes de entregar al cliente.' },
      { title: 'Informe', body: 'Genera CoA o informe técnico trazable.' },
      { title: 'Portal', body: 'Comparte histórico con clientes y auditoría.' }
    ]
  },
  fr: {
    eyebrow: 'De l’échantillon à la preuve',
    title: 'Un flux connecté pour la microbiologie de l’eau',
    body: 'AquaVerify relie l’analyse physique au registre numérique afin que produit, échantillon, opérateur, lecture, revue et rapport restent connectés.',
    steps: [
      { title: 'Échantillon', body: 'Enregistrez site, matrice et contexte.' },
      { title: 'Kit / méthode', body: 'Choisissez ENUMERA, INDICA ou un flux technique.' },
      { title: 'Registre numérique', body: 'Reliez lot, opérateur et exécution.' },
      { title: 'Lecture', body: 'Capturez résultat et preuve associée.' },
      { title: 'Revue', body: 'Validez avant livraison client.' },
      { title: 'Rapport', body: 'Générez CoA ou rapport technique traçable.' },
      { title: 'Portail', body: 'Partagez historique avec clients et audits.' }
    ]
  },
  it: {
    eyebrow: 'Dal campione all’evidenza',
    title: 'Un flusso connesso per microbiologia dell’acqua',
    body: 'AquaVerify collega analisi fisica e registro digitale affinché prodotto, campione, operatore, lettura, revisione e report restino connessi.',
    steps: [
      { title: 'Campione', body: 'Registra sito, matrice e contesto.' },
      { title: 'Kit / metodo', body: 'Scegli ENUMERA, INDICA o un flusso tecnico.' },
      { title: 'Registro digitale', body: 'Collega lotto, operatore ed esecuzione.' },
      { title: 'Lettura', body: 'Acquisisci risultato ed evidenza.' },
      { title: 'Revisione', body: 'Valida prima della consegna.' },
      { title: 'Report', body: 'Genera CoA o report tecnico tracciabile.' },
      { title: 'Portale', body: 'Condividi storico con clienti e audit.' }
    ]
  },
  ca: {
    eyebrow: 'De mostra a evidència',
    title: 'Un flux connectat per a microbiologia de l’aigua',
    body: 'AquaVerify uneix l’anàlisi física amb el registre digital perquè producte, mostra, operador, lectura, revisió i informe quedin connectats.',
    steps: [
      { title: 'Mostra', body: 'Registra punt, matriu i context.' },
      { title: 'Kit / mètode', body: 'Tria ENUMERA, INDICA o un flux tècnic.' },
      { title: 'Registre digital', body: 'Connecta lot, operador i execució.' },
      { title: 'Lectura', body: 'Captura resultat i evidència de suport.' },
      { title: 'Revisió', body: 'Valida abans del lliurament.' },
      { title: 'Informe', body: 'Genera CoA o informe tècnic traçable.' },
      { title: 'Portal', body: 'Comparteix històric amb clients i auditoria.' }
    ]
  }
};

const ICONS = [ClipboardList, FlaskConical, LayoutDashboard, Microscope, UserCheck, FileCheck2, Gauge];

export const SampleToEvidenceFlow: React.FC = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.en;

  return (
    <section className="bg-white py-16 md:py-20" data-aq-section="sample-to-evidence-flow">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{copy.eyebrow}</div>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-4xl">{copy.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{copy.body}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
            {copy.steps.map((step, index) => {
              const Icon = ICONS[index] || Gauge;
              return (
                <article
                  key={step.title}
                  className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm xl:min-h-[13.5rem]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="mt-1 font-heading text-base font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleToEvidenceFlow;
