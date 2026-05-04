import React, { useState } from 'react';
import { Smartphone, PieChart, FileText, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { EditableImage } from './admin/EditableImage';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';
import { IMAGE_FALLBACKS } from '../utils/imageFallbacks';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { LEGACY_PLATFORM_SIGNUP_URLS, getPlatformSignupUrl } from '../utils/platformLinks';

type Tab = 'mobile' | 'lims' | 'compliance';

const CTA_COPY: Record<Language, { learnMore: string; demo: string }> = {
  en: { learnMore: 'View SaaS platform', demo: 'Request demo' },
  es: { learnMore: 'Ver plataforma SaaS', demo: 'Solicitar demo' },
  fr: { learnMore: 'Voir la plateforme SaaS', demo: 'Demander une démo' },
  it: { learnMore: 'Vedi piattaforma SaaS', demo: 'Richiedi demo' },
  ca: { learnMore: 'Veure plataforma SaaS', demo: 'Sol·licitar demo' }
};

const FEATURE_COPY: Record<Language, Record<Tab, string[]>> = {
  en: {
    mobile: ['Customer and partner CRM', 'Customer portal context', 'Sales and support history'],
    lims: ['Sample traceability', 'Workload control', 'Validation and reports'],
    compliance: ['Executive KPIs', 'Operational reporting', 'Live workload visibility']
  },
  es: {
    mobile: ['CRM de clientes y partners', 'Contexto del portal cliente', 'Historial comercial y soporte'],
    lims: ['Trazabilidad de muestras', 'Control de carga de trabajo', 'Validación e informes'],
    compliance: ['KPIs ejecutivos', 'Reporting operativo', 'Visibilidad de carga viva']
  },
  fr: {
    mobile: ['CRM clients et partenaires', 'Contexte du portail client', 'Historique ventes et support'],
    lims: ['Traçabilité des échantillons', 'Contrôle de la charge', 'Validation et rapports'],
    compliance: ['KPIs exécutifs', 'Reporting opérationnel', 'Visibilité de charge active']
  },
  it: {
    mobile: ['CRM clienti e partner', 'Contesto portale clienti', 'Storico vendite e supporto'],
    lims: ['Tracciabilità campioni', 'Controllo carico di lavoro', 'Validazione e report'],
    compliance: ['KPI executive', 'Reporting operativo', 'Visibilità carico attivo']
  },
  ca: {
    mobile: ['CRM de clients i partners', 'Context del portal client', 'Historial comercial i suport'],
    lims: ['Traçabilitat de mostres', 'Control de càrrega de treball', 'Validació i informes'],
    compliance: ['KPIs executius', 'Reporting operatiu', 'Visibilitat de càrrega activa']
  }
};

export const SaaSPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('lims');
  const { t, lang } = useLanguage();
  const copy = CTA_COPY[lang] || CTA_COPY.en;
  const featureCopy = FEATURE_COPY[lang] || FEATURE_COPY.en;
  const saasPageUrl = getMarketingPagePath('saas-biotech', lang);
  const platformDemoUrl = getPlatformSignupUrl({ intent: 'saas', page: 'home-platform-teaser', module: activeTab }, lang);
  const imageFallbacks: Record<Tab, string> = {
    mobile: IMAGE_FALLBACKS.saasCrm,
    lims: IMAGE_FALLBACKS.saasLims,
    compliance: IMAGE_FALLBACKS.saasDashboard,
  };

  const tabs = [
    { id: 'mobile', label: t.saas.tabs.mobile, icon: <Smartphone size={18} /> },
    { id: 'lims', label: t.saas.tabs.lims, icon: <PieChart size={18} /> },
    { id: 'compliance', label: t.saas.tabs.compliance, icon: <FileText size={18} /> },
  ];

  const content = {
    mobile: {
      title: t.saas.mobile.title,
      desc: t.saas.mobile.desc,
      imgAlt: "AquaVerify CRM and customer portfolio screen connected to laboratory and sales activity.",
      features: featureCopy.mobile
    },
    lims: {
      title: t.saas.lims.title,
      desc: t.saas.lims.desc,
      imgAlt: "AquaVerify LIMS workstation dashboard for sample workflow, validation and reports.",
      features: featureCopy.lims
    },
    compliance: {
      title: t.saas.compliance.title,
      desc: t.saas.compliance.desc,
      imgAlt: "AquaVerify Cloud executive dashboard with operational KPIs, margin and workload indicators.",
      features: featureCopy.compliance
    }
  };

  return (
    <section id="platform" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 transform origin-top-right z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <EditableText
            as="span"
            sectionId="saas"
            field="badge"
            fallback={t.saas.badge}
            className="text-secondary font-bold tracking-wider uppercase text-sm block"
          />
          <EditableText
            as="h2"
            sectionId="saas"
            field="title"
            fallback={t.saas.title}
            className="font-heading font-bold text-3xl md:text-4xl text-primary mt-2"
          />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border ${activeTab === tab.id
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-12 items-center"
              >
                <div className="md:w-1/2 space-y-6">
                  <EditableText
                    as="h3"
                    sectionId="saas"
                    field={`tab_${activeTab}_title`}
                    fallback={content[activeTab].title}
                    className="text-2xl font-heading font-bold text-gray-800 block"
                  />
                  <EditableText
                    as="p"
                    sectionId="saas"
                    field={`tab_${activeTab}_desc`}
                    fallback={content[activeTab].desc}
                    className="text-gray-600 leading-relaxed block"
                  />
                  <ul className="space-y-3">
                    {content[activeTab].features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 font-medium">
                        <Layers size={16} className="text-secondary mr-3" />
                        <EditableText
                          as="span"
                          sectionId="saas"
                          field={`tab_${activeTab}_feature_${idx}`}
                          fallback={feature}
                          className="block"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <EditableLinkWrapper sectionId="saas" field={`learnMore_link_${activeTab}`} fallback={saasPageUrl} legacyFallbacks={LEGACY_PLATFORM_SIGNUP_URLS}>
                      <a href={saasPageUrl} className="inline-flex items-center rounded border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-secondary hover:text-secondary">
                        <EditableText sectionId="saas" field={`learnMore_text_${activeTab}`} fallback={copy.learnMore} /> <span className="ml-1">→</span>
                      </a>
                    </EditableLinkWrapper>
                    <EditableLinkWrapper sectionId="saas" field={`url_demo_${activeTab}`} fallback={platformDemoUrl} legacyFallbacks={LEGACY_PLATFORM_SIGNUP_URLS}>
                      <a href={platformDemoUrl} className="inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90">
                        <EditableText sectionId="saas" field={`demo_text_${activeTab}`} fallback={copy.demo} />
                      </a>
                    </EditableLinkWrapper>
                  </div>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 aspect-video shadow-inner flex items-center justify-center relative">
                    <EditableImage
                      sectionId="saas"
                      field={`image_${activeTab}`}
                      fallbackSrc={imageFallbacks[activeTab]}
                      alt={content[activeTab].imgAlt}
                      className="w-full h-full object-cover block"
                    />
                    {/* Overlay to simulate UI */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-xs font-mono uppercase opacity-80">System Status</p>
                        <p className="font-bold">Online • Synced</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
