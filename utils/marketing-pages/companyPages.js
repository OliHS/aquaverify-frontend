import { locale, page, section } from './shared.js';
import { ABOUT_PAGE_TRANSLATIONS, ABOUT_REVIEW_DATE } from '../aboutContent.js';

export const COMPANY_MARKETING_PAGES = [
  page('about', 'company', 'contact', ABOUT_PAGE_TRANSLATIONS, {
    schemaType: 'AboutPage',
    dateModified: ABOUT_REVIEW_DATE
  }),
  page('contact', 'company', 'contact', {
    en: locale('/contact', 'Contact AquaVerify', 'Talk to AquaVerify about products, OEM, distribution, SaaS or water quality workflows.', [
      section('Route your request to the right team', 'Use the contact flow so the commercial team can understand your need and respond with the right product, OEM, distributor or SaaS path.', ['Product quote', 'OEM or distributor opportunity', 'SaaS demo', 'Technical discussion'])
    ], { eyebrow: 'Contact', primaryCta: 'Start contact request', secondaryCta: 'Request demo' }),
    es: locale('/es/contacto', 'Contactar con AquaVerify', 'Habla con AquaVerify sobre productos, OEM, distribución, SaaS o flujos de calidad del agua.', [
      section('Dirige tu solicitud al equipo correcto', 'Usa el flujo de contacto para que el equipo comercial entienda la necesidad y responda con la ruta adecuada: producto, OEM, distribución o SaaS.', ['Cotización de producto', 'Oportunidad OEM o distribuidor', 'Demo SaaS', 'Conversación técnica'])
    ], { eyebrow: 'Contacto', primaryCta: 'Iniciar contacto', secondaryCta: 'Solicitar demo' }),
    fr: locale('/fr/contact', 'Contacter AquaVerify', 'Échangez avec AquaVerify sur les produits, l’OEM, la distribution, le SaaS ou les flux qualité eau.', [
      section('Diriger la demande vers la bonne équipe', 'Utilisez le flux de contact afin que l’équipe commerciale comprenne le besoin et réponde avec le bon parcours: produit, OEM, distribution ou SaaS.', ['Devis produit', 'Opportunité OEM ou distributeur', 'Démo SaaS', 'Discussion technique'])
    ], { eyebrow: 'Contact', primaryCta: 'Démarrer la demande', secondaryCta: 'Demander une démo' }),
    it: locale('/it/contatto', 'Contatta AquaVerify', 'Parla con AquaVerify di prodotti, OEM, distribuzione, SaaS o flussi qualità acqua.', [
      section('Indirizza la richiesta al team giusto', 'Usa il flusso di contatto affinché il team commerciale comprenda l’esigenza e risponda con il percorso corretto: prodotto, OEM, distribuzione o SaaS.', ['Preventivo prodotto', 'Opportunità OEM o distributore', 'Demo SaaS', 'Discussione tecnica'])
    ], { eyebrow: 'Contatto', primaryCta: 'Avvia richiesta', secondaryCta: 'Richiedi demo' }),
    ca: locale('/ca/contacte', 'Contactar amb AquaVerify', 'Parla amb AquaVerify sobre productes, OEM, distribució, SaaS o fluxos de qualitat de l’aigua.', [
      section('Dirigeix la sol·licitud a l’equip correcte', 'Fes servir el flux de contacte perquè l’equip comercial entengui la necessitat i respongui amb la ruta adequada: producte, OEM, distribució o SaaS.', ['Pressupost de producte', 'Oportunitat OEM o distribuïdor', 'Demo SaaS', 'Conversa tècnica'])
    ], { eyebrow: 'Contacte', primaryCta: 'Iniciar contacte', secondaryCta: 'Sol·licitar demo' })
  })
];
