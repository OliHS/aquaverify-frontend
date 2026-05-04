import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, FlaskConical, Handshake, Microscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';

type AudienceCard = {
  id: string;
  icon: React.ReactNode;
  pageId: string;
  intent: string;
  title: string;
  body: string;
  pageCta: string;
  platformCta: string;
};

const COPY: Record<Language, {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: Omit<AudienceCard, 'icon'>[];
}> = {
  en: {
    eyebrow: 'Choose your path',
    title: 'AquaVerify for every water quality workflow',
    subtitle: 'Start from your buyer profile and move directly to product, partner or platform information.',
    cards: [
      { id: 'labs', pageId: 'water-testing-labs', intent: 'quote', title: 'Water testing laboratories', body: 'Kits, controls, reporting and traceability for public and private labs.', pageCta: 'View lab workflow', platformCta: 'Request quote' },
      { id: 'distributors', pageId: 'distributors', intent: 'distributor', title: 'Scientific distributors', body: 'A differentiated catalog for recurrent water microbiology demand.', pageCta: 'Distributor program', platformCta: 'Become a partner' },
      { id: 'quality', pageId: 'water-quality-control', intent: 'contact', title: 'Quality teams', body: 'Solutions for companies that need reliable water quality control.', pageCta: 'Quality control uses', platformCta: 'Ask for guidance' },
      { id: 'biotech', pageId: 'saas-biotech', intent: 'saas', title: 'Biotech SaaS teams', body: 'AquaVerify Cloud as an all-in-one LIMS, CRM and operations platform.', pageCta: 'See SaaS platform', platformCta: 'Request demo' }
    ]
  },
  es: {
    eyebrow: 'Elige tu ruta',
    title: 'AquaVerify para cada flujo de calidad del agua',
    subtitle: 'Empieza desde tu perfil de comprador y llega directamente a producto, partner o plataforma.',
    cards: [
      { id: 'labs', pageId: 'water-testing-labs', intent: 'quote', title: 'Laboratorios de análisis de agua', body: 'Kits, controles, reporting y trazabilidad para laboratorios públicos y privados.', pageCta: 'Ver flujo de laboratorio', platformCta: 'Solicitar cotización' },
      { id: 'distributors', pageId: 'distributors', intent: 'distributor', title: 'Distribuidores científicos', body: 'Un catálogo diferenciado para demanda recurrente en microbiología del agua.', pageCta: 'Programa distribuidor', platformCta: 'Ser partner' },
      { id: 'quality', pageId: 'water-quality-control', intent: 'contact', title: 'Equipos de calidad', body: 'Soluciones para empresas que necesitan control fiable de calidad del agua.', pageCta: 'Usos en calidad', platformCta: 'Pedir orientación' },
      { id: 'biotech', pageId: 'saas-biotech', intent: 'saas', title: 'Equipos biotech SaaS', body: 'AquaVerify Cloud como plataforma todo en uno LIMS, CRM y operaciones.', pageCta: 'Ver plataforma SaaS', platformCta: 'Solicitar demo' }
    ]
  },
  fr: {
    eyebrow: 'Choisissez votre parcours',
    title: 'AquaVerify pour chaque flux qualité de l’eau',
    subtitle: 'Partez de votre profil acheteur et accédez directement aux produits, partenaires ou à la plateforme.',
    cards: [
      { id: 'labs', pageId: 'water-testing-labs', intent: 'quote', title: 'Laboratoires d’analyse de l’eau', body: 'Kits, contrôles, rapports et traçabilité pour laboratoires publics et privés.', pageCta: 'Voir le flux laboratoire', platformCta: 'Demander un devis' },
      { id: 'distributors', pageId: 'distributors', intent: 'distributor', title: 'Distributeurs scientifiques', body: 'Un catalogue différencié pour la demande récurrente en microbiologie de l’eau.', pageCta: 'Programme distributeur', platformCta: 'Devenir partenaire' },
      { id: 'quality', pageId: 'water-quality-control', intent: 'contact', title: 'Équipes qualité', body: 'Solutions pour entreprises ayant besoin d’un contrôle fiable de la qualité de l’eau.', pageCta: 'Usages qualité', platformCta: 'Demander conseil' },
      { id: 'biotech', pageId: 'saas-biotech', intent: 'saas', title: 'Équipes biotech SaaS', body: 'AquaVerify Cloud comme plateforme LIMS, CRM et opérations tout-en-un.', pageCta: 'Voir la plateforme SaaS', platformCta: 'Demander une démo' }
    ]
  },
  it: {
    eyebrow: 'Scegli il percorso',
    title: 'AquaVerify per ogni flusso di qualità dell’acqua',
    subtitle: 'Parti dal tuo profilo d’acquisto e arriva subito a prodotti, partner o piattaforma.',
    cards: [
      { id: 'labs', pageId: 'water-testing-labs', intent: 'quote', title: 'Laboratori di analisi dell’acqua', body: 'Kit, controlli, report e tracciabilità per laboratori pubblici e privati.', pageCta: 'Vedi workflow lab', platformCta: 'Richiedi preventivo' },
      { id: 'distributors', pageId: 'distributors', intent: 'distributor', title: 'Distributori scientifici', body: 'Un catalogo differenziato per domanda ricorrente in microbiologia dell’acqua.', pageCta: 'Programma distributori', platformCta: 'Diventa partner' },
      { id: 'quality', pageId: 'water-quality-control', intent: 'contact', title: 'Team qualità', body: 'Soluzioni per aziende che richiedono controllo affidabile della qualità dell’acqua.', pageCta: 'Usi per qualità', platformCta: 'Chiedi supporto' },
      { id: 'biotech', pageId: 'saas-biotech', intent: 'saas', title: 'Team biotech SaaS', body: 'AquaVerify Cloud come piattaforma all-in-one LIMS, CRM e operations.', pageCta: 'Vedi piattaforma SaaS', platformCta: 'Richiedi demo' }
    ]
  },
  ca: {
    eyebrow: 'Tria la teva ruta',
    title: 'AquaVerify per a cada flux de qualitat de l’aigua',
    subtitle: 'Comença pel teu perfil de comprador i arriba directament a producte, partner o plataforma.',
    cards: [
      { id: 'labs', pageId: 'water-testing-labs', intent: 'quote', title: 'Laboratoris d’anàlisi d’aigua', body: 'Kits, controls, reporting i traçabilitat per a laboratoris públics i privats.', pageCta: 'Veure flux de laboratori', platformCta: 'Sol·licitar pressupost' },
      { id: 'distributors', pageId: 'distributors', intent: 'distributor', title: 'Distribuïdors científics', body: 'Un catàleg diferenciat per demanda recurrent en microbiologia de l’aigua.', pageCta: 'Programa distribuïdor', platformCta: 'Ser partner' },
      { id: 'quality', pageId: 'water-quality-control', intent: 'contact', title: 'Equips de qualitat', body: 'Solucions per a empreses que necessiten control fiable de qualitat de l’aigua.', pageCta: 'Usos en qualitat', platformCta: 'Demanar orientació' },
      { id: 'biotech', pageId: 'saas-biotech', intent: 'saas', title: 'Equips biotech SaaS', body: 'AquaVerify Cloud com a plataforma tot en un LIMS, CRM i operacions.', pageCta: 'Veure plataforma SaaS', platformCta: 'Sol·licitar demo' }
    ]
  }
};

const ICONS: Record<string, React.ReactNode> = {
  labs: <Microscope className="h-5 w-5" />,
  distributors: <Handshake className="h-5 w-5" />,
  quality: <Building2 className="h-5 w-5" />,
  biotech: <FlaskConical className="h-5 w-5" />
};

export const AudiencePathways: React.FC = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.en;

  return (
    <section data-aq-section="buyer-pathways" className="bg-white pt-8 pb-12 md:pt-10 md:pb-14">
      <div className="container mx-auto px-6">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <div className="max-w-2xl lg:pt-1">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-secondary">{copy.eyebrow}</div>
            <h2 className="mt-3 font-heading text-3xl font-black text-primary md:text-4xl">{copy.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{copy.subtitle}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.cards.map((card) => (
              <article key={card.id} className="flex h-full flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/30 hover:bg-white hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                  {ICONS[card.id]}
                </div>
                <h3 className="font-heading text-lg font-black text-slate-900">{card.title}</h3>
                <p className="mt-2 min-h-[3.5rem] text-sm leading-6 text-slate-600">{card.body}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                  <Link to={getMarketingPagePath(card.pageId, lang)} className="inline-flex items-center text-sm font-black text-primary hover:text-secondary">
                    {card.pageCta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <a
                    href={getPlatformSignupUrl({ intent: card.intent, page: card.pageId, profile: card.id }, lang)}
                    className="inline-flex items-center rounded border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:border-secondary hover:text-secondary"
                  >
                    {card.platformCta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudiencePathways;
