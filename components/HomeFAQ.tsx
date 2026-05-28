import React from 'react';
import { CircleHelp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { HOME_FAQS } from '../utils/homeContent';
import { EditableText } from './admin/EditableText';

const COPY: Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  productsCta: string;
  sectorsCta: string;
}> = {
  en: {
    eyebrow: 'Buying questions',
    title: 'Answers before choosing a product, platform or partner route',
    body: 'AquaVerify is built so a buyer can move from technical comparison to a clear next step: product family, sector solution, distributor support or OEM program.',
    productsCta: 'Compare AquaVerify products',
    sectorsCta: 'Choose by sector'
  },
  es: {
    eyebrow: 'Preguntas de compra',
    title: 'Respuestas antes de elegir producto, plataforma o ruta partner',
    body: 'AquaVerify está diseñado para que un comprador pase de la comparación técnica al siguiente paso correcto: familia de producto, solución por sector, distribuidor o programa OEM.',
    productsCta: 'Comparar productos AquaVerify',
    sectorsCta: 'Elegir por sector'
  },
  fr: {
    eyebrow: 'Questions d’achat',
    title: 'Réponses avant de choisir produit, plateforme ou parcours partenaire',
    body: 'AquaVerify permet de passer de la comparaison technique à l’étape adaptée: famille produit, solution sectorielle, distributeur ou programme OEM.',
    productsCta: 'Comparer les produits AquaVerify',
    sectorsCta: 'Choisir par secteur'
  },
  it: {
    eyebrow: 'Domande di acquisto',
    title: 'Risposte prima di scegliere prodotto, piattaforma o percorso partner',
    body: 'AquaVerify aiuta a passare dal confronto tecnico al passo corretto: famiglia prodotto, soluzione per settore, distributore o programma OEM.',
    productsCta: 'Confronta i prodotti AquaVerify',
    sectorsCta: 'Scegli per settore'
  },
  ca: {
    eyebrow: 'Preguntes de compra',
    title: 'Respostes abans de triar producte, plataforma o ruta partner',
    body: 'AquaVerify està pensat perquè un comprador passi de la comparació tècnica al pas adequat: família de producte, solució per sector, distribuïdor o programa OEM.',
    productsCta: 'Comparar productes AquaVerify',
    sectorsCta: 'Triar per sector'
  }
};

export const HomeFAQ: React.FC = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.en;
  const faqs = HOME_FAQS[lang] || HOME_FAQS.en;

  return (
    <section className="bg-slate-50 py-16 md:py-20" data-aq-section="home-faq">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <EditableText as="div" sectionId="homeFaq" field="eyebrow" fallback={copy.eyebrow} className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700 block" />
            <EditableText as="h2" sectionId="homeFaq" field="title" fallback={copy.title} className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-4xl block" />
            <EditableText as="p" sectionId="homeFaq" field="body" fallback={copy.body} className="mt-4 text-base leading-8 text-slate-600 block" />

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={getMarketingPagePath('products', lang)}
                className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-secondary"
                data-event="click_home_faq_products"
              >
                <EditableText as="span" sectionId="homeFaq" field="productsCta" fallback={copy.productsCta} />
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to={getMarketingPagePath('industries-hub', lang)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-primary transition hover:border-cyan-200 hover:bg-cyan-50"
                data-event="click_home_faq_sectors"
              >
                <EditableText as="span" sectionId="homeFaq" field="sectorsCta" fallback={copy.sectorsCta} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-slate-100 py-5 first:pt-0 last:border-b-0 last:pb-0">
                <summary className="flex cursor-pointer list-none items-start gap-3 text-left">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-primary">
                    <CircleHelp className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <EditableText
                      as="span"
                      sectionId="homeFaq"
                      field={`question_${index}`}
                      fallback={faq.question}
                      className="block font-heading text-base font-black text-slate-950 md:text-lg"
                    />
                  </span>
                  <span className="mt-1 text-lg font-black text-cyan-600 transition group-open:rotate-45">+</span>
                </summary>
                <EditableText
                  as="p"
                  sectionId="homeFaq"
                  field={`answer_${index}`}
                  fallback={faq.answer}
                  className="ml-11 mt-3 text-sm font-semibold leading-7 text-slate-600 block"
                />
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
