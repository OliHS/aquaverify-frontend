import React from 'react';
import { BookOpen, CloudLightning, Handshake, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';
import { LEGACY_PLATFORM_SIGNUP_URLS, getPlatformSignupUrl } from '../utils/platformLinks';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';

type DecisionItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
  cta: string;
  isExternal?: boolean;
};

const COPY: Record<Language, {
  eyebrow: string;
  title: string;
  subtitle: string;
  product: Omit<DecisionItem, 'id' | 'icon' | 'href' | 'isExternal'>;
  oem: Omit<DecisionItem, 'id' | 'icon' | 'href' | 'isExternal'>;
  saas: Omit<DecisionItem, 'id' | 'icon' | 'href' | 'isExternal'>;
  resources: Omit<DecisionItem, 'id' | 'icon' | 'href' | 'isExternal'>;
}> = {
  en: {
    eyebrow: 'Next step',
    title: 'Choose the AquaVerify route that matches your buying process',
    subtitle: 'Move from exploration to the right commercial conversation: products, OEM supply, distributor partnership, SaaS demo or technical resources.',
    product: { title: 'Request product guidance', body: 'For laboratories and quality teams comparing kits, workflows and connected traceability.', cta: 'Request quote' },
    oem: { title: 'Discuss OEM or distribution', body: 'For scientific distributors that need AquaVerify-branded or private-label supply.', cta: 'Become a partner' },
    saas: { title: 'Book a SaaS demo', body: 'For biotech and lab teams that need CRM, LIMS, work, inventory and reporting in one platform.', cta: 'Request SaaS demo' },
    resources: { title: 'Read technical resources', body: 'Review evergreen guides on coliphages, enumeration, ISO/EPA workflows and digital traceability.', cta: 'Open resources' }
  },
  es: {
    eyebrow: 'Siguiente paso',
    title: 'Elige la ruta AquaVerify que encaja con tu proceso de compra',
    subtitle: 'Pasa de explorar a la conversación comercial adecuada: productos, OEM, distribución, demo SaaS o recursos técnicos.',
    product: { title: 'Orientación sobre productos', body: 'Para laboratorios y equipos de calidad que comparan kits, flujos y trazabilidad conectada.', cta: 'Solicitar cotización' },
    oem: { title: 'Hablar de OEM o distribución', body: 'Para distribuidores científicos que necesitan suministro AquaVerify o marca blanca.', cta: 'Ser partner' },
    saas: { title: 'Reservar demo SaaS', body: 'Para biotech y laboratorios que necesitan CRM, LIMS, work, inventario y reporting en una plataforma.', cta: 'Solicitar demo SaaS' },
    resources: { title: 'Leer recursos técnicos', body: 'Consulta guías evergreen sobre colífagos, enumeración, flujos ISO/EPA y trazabilidad digital.', cta: 'Abrir recursos' }
  },
  fr: {
    eyebrow: 'Étape suivante',
    title: 'Choisissez le parcours AquaVerify adapté à votre processus d’achat',
    subtitle: 'Passez de l’exploration à la bonne conversation commerciale: produits, OEM, distribution, démo SaaS ou ressources techniques.',
    product: { title: 'Orientation produits', body: 'Pour laboratoires et équipes qualité qui comparent kits, flux et traçabilité connectée.', cta: 'Demander un devis' },
    oem: { title: 'Parler OEM ou distribution', body: 'Pour distributeurs scientifiques cherchant une fourniture AquaVerify ou marque blanche.', cta: 'Devenir partenaire' },
    saas: { title: 'Réserver une démo SaaS', body: 'Pour biotech et laboratoires ayant besoin de CRM, LIMS, work, inventaire et reporting.', cta: 'Demander une démo SaaS' },
    resources: { title: 'Lire les ressources techniques', body: 'Consultez les guides sur coliphages, dénombrement, flux ISO/EPA et traçabilité numérique.', cta: 'Ouvrir les ressources' }
  },
  it: {
    eyebrow: 'Passo successivo',
    title: 'Scegli il percorso AquaVerify adatto al tuo processo di acquisto',
    subtitle: 'Passa dall’esplorazione alla conversazione commerciale giusta: prodotti, OEM, distribuzione, demo SaaS o risorse tecniche.',
    product: { title: 'Orientamento sui prodotti', body: 'Per laboratori e team qualità che confrontano kit, workflow e tracciabilità collegata.', cta: 'Richiedi preventivo' },
    oem: { title: 'Parla di OEM o distribuzione', body: 'Per distributori scientifici che cercano fornitura AquaVerify o private label.', cta: 'Diventa partner' },
    saas: { title: 'Prenota demo SaaS', body: 'Per biotech e laboratori che richiedono CRM, LIMS, work, inventario e reporting.', cta: 'Richiedi demo SaaS' },
    resources: { title: 'Leggi risorse tecniche', body: 'Consulta guide su colifagi, enumerazione, flussi ISO/EPA e tracciabilità digitale.', cta: 'Apri risorse' }
  },
  ca: {
    eyebrow: 'Següent pas',
    title: 'Tria la ruta AquaVerify que encaixa amb el teu procés de compra',
    subtitle: 'Passa de l’exploració a la conversa comercial adequada: productes, OEM, distribució, demo SaaS o recursos tècnics.',
    product: { title: 'Orientació sobre productes', body: 'Per a laboratoris i equips de qualitat que comparen kits, fluxos i traçabilitat connectada.', cta: 'Sol·licitar pressupost' },
    oem: { title: 'Parlar d’OEM o distribució', body: 'Per a distribuïdors científics que necessiten subministrament AquaVerify o marca blanca.', cta: 'Ser partner' },
    saas: { title: 'Reservar demo SaaS', body: 'Per a biotech i laboratoris que necessiten CRM, LIMS, work, inventari i reporting.', cta: 'Sol·licitar demo SaaS' },
    resources: { title: 'Llegir recursos tècnics', body: 'Consulta guies sobre colífags, enumeració, fluxos ISO/EPA i traçabilitat digital.', cta: 'Obrir recursos' }
  }
};

export const FinalDecisionCta: React.FC = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.en;
  const items: DecisionItem[] = [
    {
      id: 'product',
      icon: <Package className="h-5 w-5" />,
      href: getPlatformSignupUrl({ intent: 'quote', page: 'home-final-cta' }, lang),
      isExternal: true,
      ...copy.product
    },
    {
      id: 'oem',
      icon: <Handshake className="h-5 w-5" />,
      href: getPlatformSignupUrl({ intent: 'distributor', page: 'home-final-cta' }, lang),
      isExternal: true,
      ...copy.oem
    },
    {
      id: 'saas',
      icon: <CloudLightning className="h-5 w-5" />,
      href: getPlatformSignupUrl({ intent: 'saas', page: 'home-final-cta' }, lang),
      isExternal: true,
      ...copy.saas
    },
    {
      id: 'resources',
      icon: <BookOpen className="h-5 w-5" />,
      href: getMarketingPagePath('resources', lang),
      ...copy.resources
    }
  ];

  return (
    <section className="bg-primary py-14 text-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <div className="max-w-2xl">
            <EditableText as="div" sectionId="finalCta" field="eyebrow" fallback={copy.eyebrow} className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100 block" />
            <EditableText as="h2" sectionId="finalCta" field="title" fallback={copy.title} className="mt-3 font-heading text-3xl font-black leading-tight md:text-4xl block" />
            <EditableText as="p" sectionId="finalCta" field="subtitle" fallback={copy.subtitle} className="mt-4 text-base leading-7 text-cyan-50/80 block" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => {
              const content = (
                <>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-primary">
                    {item.icon}
                  </div>
                  <EditableText as="h3" sectionId="finalCta" field={`${item.id}_title`} fallback={item.title} className="font-heading text-lg font-black text-white block" />
                  <EditableText as="p" sectionId="finalCta" field={`${item.id}_body`} fallback={item.body} className="mt-2 min-h-[4.5rem] text-sm leading-6 text-cyan-50/75 block" />
                  <span className="mt-auto inline-flex items-center pt-5 text-sm font-black text-cyan-100 transition group-hover:text-white">
                    <EditableText as="span" sectionId="finalCta" field={`${item.id}_cta`} fallback={item.cta} />
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </>
              );

              const className = "group flex h-full flex-col rounded-lg border border-white/15 bg-white/10 p-5 transition hover:border-cyan-100/50 hover:bg-white/15";

              return item.isExternal ? (
                <EditableLinkWrapper key={item.id} sectionId="finalCta" field={`${item.id}_href`} fallback={item.href} legacyFallbacks={LEGACY_PLATFORM_SIGNUP_URLS}>
                  <a href={item.href} className={className}>
                    {content}
                  </a>
                </EditableLinkWrapper>
              ) : (
                <Link key={item.id} to={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalDecisionCta;
