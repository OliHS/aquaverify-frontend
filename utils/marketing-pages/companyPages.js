import { locale, page, section } from './shared.js';

export const COMPANY_MARKETING_PAGES = [
  page('about', 'company', 'contact', {
    en: locale('/about', 'About AquaVerify', 'AquaVerify develops water microbiology products and digital workflows to make water quality verifiable and traceable.', [
      section('Who we are', 'AquaVerify combines biotechnology, laboratory operations and cloud software in one B2B water quality ecosystem.'),
      section('What we believe', 'Water quality decisions should be supported by reliable products, clear methods and data that can be traced from sample to report.')
    ], { eyebrow: 'Company', primaryCta: 'Contact AquaVerify', secondaryCta: 'Become a partner' }),
    es: locale('/es/sobre-nosotros', 'Sobre AquaVerify', 'AquaVerify desarrolla productos de microbiología del agua y flujos digitales para hacer la calidad del agua verificable y trazable.', [
      section('Quiénes somos', 'AquaVerify combina biotecnología, operación de laboratorio y software cloud en un ecosistema B2B de calidad del agua.'),
      section('En qué creemos', 'Las decisiones sobre calidad del agua deben apoyarse en productos fiables, métodos claros y datos trazables desde la muestra hasta el informe.')
    ], { eyebrow: 'Empresa', primaryCta: 'Contactar con AquaVerify', secondaryCta: 'Ser partner' }),
    fr: locale('/fr/a-propos', 'À propos d’AquaVerify', 'AquaVerify développe des produits de microbiologie de l’eau et des flux numériques pour rendre la qualité de l’eau vérifiable et traçable.', [
      section('Qui nous sommes', 'AquaVerify combine biotechnologie, opérations de laboratoire et logiciel cloud dans un écosystème B2B de qualité de l’eau.'),
      section('Notre conviction', 'Les décisions sur la qualité de l’eau doivent s’appuyer sur des produits fiables, des méthodes claires et des données traçables de l’échantillon au rapport.')
    ], { eyebrow: 'Entreprise', primaryCta: 'Contacter AquaVerify', secondaryCta: 'Devenir partenaire' }),
    it: locale('/it/chi-siamo', 'Chi è AquaVerify', 'AquaVerify sviluppa prodotti di microbiologia dell’acqua e flussi digitali per rendere la qualità dell’acqua verificabile e tracciabile.', [
      section('Chi siamo', 'AquaVerify combina biotecnologia, operazioni di laboratorio e software cloud in un ecosistema B2B per la qualità dell’acqua.'),
      section('In cosa crediamo', 'Le decisioni sulla qualità dell’acqua devono basarsi su prodotti affidabili, metodi chiari e dati tracciabili dal campione al report.')
    ], { eyebrow: 'Azienda', primaryCta: 'Contatta AquaVerify', secondaryCta: 'Diventa partner' }),
    ca: locale('/ca/sobre-nosaltres', 'Sobre AquaVerify', 'AquaVerify desenvolupa productes de microbiologia de l’aigua i fluxos digitals per fer la qualitat de l’aigua verificable i traçable.', [
      section('Qui som', 'AquaVerify combina biotecnologia, operació de laboratori i software cloud en un ecosistema B2B de qualitat de l’aigua.'),
      section('En què creiem', 'Les decisions sobre qualitat de l’aigua s’han de recolzar en productes fiables, mètodes clars i dades traçables des de la mostra fins a l’informe.')
    ], { eyebrow: 'Empresa', primaryCta: 'Contactar amb AquaVerify', secondaryCta: 'Ser partner' })
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
