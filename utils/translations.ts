
export type Language = 'en' | 'es' | 'fr' | 'it' | 'ca';

export const translations = {
  en: {
    nav: {
      solutions: "Sectors",
      products: "Products",
      platform: "Platform",
      resources: "Resources",
      distributors: "Distributors",
      oem: "OEM Program",
      login: "Login",
      demo: "Request Demo",
      catalog: "Complete Catalog",
      viewPdf: "View Full PDF Catalog",
      searchPlaceholder: "Search products, kits, or families..."
    },
    hero: {
      badge: "Next-Gen Biotechnology",
      titleStart: "The Science of Water",
      titleEnd: "Verification",
      subtitle: "We merge verifiable biotechnology with digital traceability. Ensure safety with lab-grade precision, anywhere.",
      explore: "Explore Kits",
      data: "View Scientific Data",
      limsTitle: "Digital Traceability LIMS",
      limsDesc: "Automate reporting. Eliminate paper. Integrate with your ERP in seconds."
    },
    valueProps: {
      title: "Unified Water Safety Ecosystem",
      subtitle: "We bridge the gap between field testing and technical reporting with a single, integrated solution.",
      cards: {
        bio: { title: "Verifiable Biotechnology", desc: "Water microbiology kits for ISO-oriented workflows covering coliphages and E. coli. Smart Cap workflows can reduce UV-dependent steps." },
        cloud: { title: "Cloud Digitalization", desc: "Instant digitization of results via mobile app. Secure, immutable data storage ensures complete traceability." },
        oem: { title: "B2B & OEM Partnership", desc: "Scalable solutions for laboratories and municipalities. White-label our technology to expand your portfolio." }
      }
    },
    saas: {
      badge: "The AquaVerify Cloud",
      title: "CRM, LIMS and operations in one platform.",
      tabs: { mobile: "CRM & Portal", lims: "LIMS Dashboard", compliance: "Operations" },
      mobile: { title: "Customer and partner CRM", desc: "Connect leads, accounts, distributors, support history and customer portal context in one commercial record." },
      lims: { title: "Centralized LIMS control", desc: "Coordinate sample reception, workload, validation and reports from a single laboratory workspace." },
      compliance: { title: "Operational visibility", desc: "Track KPIs, margin, workload and reporting so management sees what is happening in real time." },
      learnMore: "Learn more about"
    },
    distributors: {
      badge: "Global Network",
      title: "Authorized Distributors",
      subtitle: "Find an authorized AquaVerify partner near you for local support, stock availability, and training.",
      cta: "Find a Partner",
      modalTitle: "Global Partner Network",
      modalSubtitle: "Select a location to view partner details.",
      partnerType: {
        exclusive: "Exclusive Distributor",
        reseller: "Authorized Reseller",
        service: "Service Center"
      },
      contactBtn: "Contact Partner",
      contactSuccess: "Request Sent Successfully"
    },
    oem: {
      badge: "OEM & White Label",
      title: "Your Brand. Our Technology.",
      desc: "Expand your catalog with our white-label (OEM) program. We provide technical kits and software infrastructure; you provide the branding.",
      packaging: "Custom Packaging",
      packagingDesc: "Full brand alignment on boxes and interfaces.",
      revenue: "Recurring Revenue",
      revenueDesc: "Build a subscription model with consumable kits.",
      calculatorTitle: "Partner ROI Simulator",
      testsLabel: "Tests Performed Per Month",
      laborLabel: "Technician Labor Cost ($/hr)",
      timeSaved: "Time saved per test vs. traditional methods",
      minSaved: "minutes saved",
      annualSavings: "Estimated Annual Client Savings",
      partnerBtn: "Become an OEM Partner"
    },
    sectors: {
      badge: "Strategic Applications",
      title: "Industries We Serve",
      viewCases: "View Use Cases",
      advantage: "AquaVerify Advantage",
      applications: "Key Applications",
      close: "Close",
      request: "Request Proposal",
      list: {
        municipal: { title: "Municipal Water", desc: "Safe drinking water for communities.", full: "Municipalities face increasing pressure to deliver safe water while managing aging infrastructure. AquaVerify provides rapid, on-site testing capabilities." },
        fnb: { title: "Food & Beverage", desc: "Brand protection & HACCP documentation.", full: "In the food and beverage industry, water quality is closely linked to product safety. AquaVerify workflows support hygiene monitoring and traceable records." },
        labs: { title: "Commercial Labs", desc: "High-throughput LIMS integration.", full: "Commercial laboratories can expand their service offerings by deploying AquaVerify kits for field samplers. Data syncs instantly to your central LIMS." },
        realestate: { title: "Real Estate", desc: "Facility safety & risk management.", full: "For commercial property managers, water safety is a liability issue. Proactively monitor cooling towers and domestic water systems." }
      }
    },
    products: {
      badge: "Our Technology",
      title: "Product Ecosystem",
      subtitle: "From advanced field workflows to technical laboratory reagents, we provide end-to-end solutions.",
      flagship: "The Smart Cap™ System",
      flagshipDesc: "Streamline field testing with Smart Cap reagent delivery integrated directly into the sample bottle.",
      flagshipBadge: "Flagship innovation",
      zeroContam: "Zero Contamination",
      flagshipFeature1Desc: "Sealed reagent delivery.",
      noUV: "No UV Required",
      flagshipFeature2Desc: "Visual color readout.",
      flagshipDetails: "View more details",
      download: "Download Datasheet",
      catalogSubtitle: "Explore the main AquaVerify product families.",
      families: {
        equipment: { title: "Family I: Lab Equipment", desc: "Accessible, ergonomic, and modular instrumentation." },
        micro: { title: "Family II: Microbiological Kits", desc: "Core biotechnology range for detection and enumeration." },
        media: { title: "Family III: Media & Reagents", desc: "Dehydrated and Ready-to-Use (RTU) culture media." },
        molecular: { title: "Family IV: Molecular Solutions", desc: "Deep insights into contamination sources and resistance genes." },
        physchem: { title: "Family V: Phys-Chem Control", desc: "Sensors and kits for essential parameters." },
        services: { title: "Family VI: Services & Training", desc: "The AquaVerify Academy platform for skills development." }
      },
      modal: {
        familyLabel: "Product Family",
        catalog: "Catalog",
        search: "Search products...",
        noResults: "No products found.",
        compareCount: "{n}/3 to compare",
        compareTitle: "Comparing {n} Products",
        back: "Back to List",
        feature: "Feature",
        description: "Description",
        specs: "Specifications",
        applications: "Applications",
        na: "N/A",
        combinedQuote: "Request Combined Quote",
        viewImage: "View Image",
        moreDetails: "More Details",
        quote: "Request Quote",
        fallbackDesc: "Select 'More Details' to view full technical specifications and details.",
        emptyViewDetails: "View Details",
        emptyViewDetailsDesc: "Click on any product in the Catalog list on the left to view full specifications, images, and specific use cases.",
        emptyCompare: "Compare Items",
        emptyCompareDesc: "Tick the checkboxes next to products to compare up to 3 models side-by-side.",
        selectedCount: "{n} products selected",
        compareBtn: "Compare Products"
      }
    },
    footer: {
      tagline: "Biotech verifiable. Data traceable. The new standard in water safety assurance.",
      solutions: "Sectors",
      company: "Company",
      contact: "Contact",
      contactHelper: "Use the Contact link or email us for the fastest routing.",
      contactRequest: "Start contact request",
      rights: "AquaVerify Inc. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookie: "Cookie Settings"
    }
  },
  es: {
    nav: {
      solutions: "Sectores",
      products: "Productos",
      platform: "Plataforma",
      resources: "Recursos",
      distributors: "Distribuidores",
      oem: "Programa OEM",
      login: "Acceso",
      demo: "Solicitar Demo",
      catalog: "Catálogo Completo",
      viewPdf: "Ver Catálogo PDF",
      searchPlaceholder: "Buscar productos, kits o familias..."
    },
    hero: {
      badge: "Biotecnología de Nueva Generación",
      titleStart: "La Ciencia de la",
      titleEnd: "Verificación",
      subtitle: "Fusionamos biotecnología verificable con trazabilidad digital para apoyar decisiones de calidad del agua con precisión de laboratorio.",
      explore: "Explorar Kits",
      data: "Ver Datos Científicos",
      limsTitle: "LIMS de Trazabilidad Digital",
      limsDesc: "Automatice informes. Elimine el papel. Integre con su ERP en segundos."
    },
    valueProps: {
      title: "Ecosistema Unificado de Seguridad Hídrica",
      subtitle: "Unimos las pruebas de campo y los informes de cumplimiento con una solución integral.",
      cards: {
        bio: { title: "Biotecnología Verificable", desc: "Kits de microbiología del agua para flujos orientados a ISO sobre colífagos y E. coli. Los flujos Smart Cap pueden reducir pasos dependientes de UV." },
        cloud: { title: "Digitalización en la Nube", desc: "Digitalización instantánea vía app móvil. Almacenamiento seguro e inmutable para trazabilidad completa." },
        oem: { title: "Asociación B2B y OEM", desc: "Soluciones escalables para laboratorios y municipios. Etiquete nuestra tecnología para expandir su portafolio." }
      }
    },
    saas: {
      badge: "La Nube AquaVerify",
      title: "CRM, LIMS y operaciones en una sola plataforma.",
      tabs: { mobile: "CRM y portal", lims: "Dashboard LIMS", compliance: "Operaciones" },
      mobile: { title: "CRM de clientes y partners", desc: "Conecta leads, cuentas, distribuidores, historial de soporte y contexto de portal cliente en un registro comercial." },
      lims: { title: "Control LIMS centralizado", desc: "Coordina recepción de muestras, carga de trabajo, validación e informes desde un único espacio de laboratorio." },
      compliance: { title: "Visibilidad operativa", desc: "Sigue KPIs, margen, carga de trabajo y reporting para que dirección vea lo que ocurre en tiempo real." },
      learnMore: "Más información sobre"
    },
    distributors: {
      badge: "Red Global",
      title: "Distribuidores Autorizados",
      subtitle: "Encuentre un partner autorizado de AquaVerify cerca de usted para soporte local, inventario y capacitación.",
      cta: "Buscar Socio",
      modalTitle: "Red Global de Socios",
      modalSubtitle: "Seleccione una ubicación para ver los detalles del socio.",
      partnerType: {
        exclusive: "Distribuidor Exclusivo",
        reseller: "Revendedor Autorizado",
        service: "Centro de Servicio"
      },
      contactBtn: "Contactar Socio",
      contactSuccess: "Solicitud Enviada con Éxito"
    },
    oem: {
      badge: "OEM y Marca Blanca",
      title: "Su Marca. Nuestra Tecnología.",
      desc: "Expanda su catálogo con nuestro programa de marca blanca (OEM). Proveemos kits técnicos e infraestructura; usted pone la marca.",
      packaging: "Empaque Personalizado",
      packagingDesc: "Alineación total de marca en cajas e interfaces.",
      revenue: "Ingresos Recurrentes",
      revenueDesc: "Modelo de suscripción con kits consumibles.",
      calculatorTitle: "Simulador ROI para Socios",
      testsLabel: "Pruebas Realizadas por Mes",
      laborLabel: "Costo Laboral Técnico ($/hr)",
      timeSaved: "Tiempo ahorrado por prueba vs métodos tradicionales",
      minSaved: "minutos ahorrados",
      annualSavings: "Ahorro Anual Estimado del Cliente",
      partnerBtn: "Conviértase en Socio OEM"
    },
    sectors: {
      badge: "Aplicaciones Estratégicas",
      title: "Industrias que Servimos",
      viewCases: "Ver Casos de Uso",
      advantage: "Ventaja AquaVerify",
      applications: "Aplicaciones Clave",
      close: "Cerrar",
      request: "Solicitar Propuesta",
      list: {
        municipal: { title: "Agua Municipal", desc: "Agua potable segura para comunidades.", full: "Los municipios enfrentan presión para entregar agua segura mientras gestionan infraestructura antigua. AquaVerify ofrece pruebas rápidas in situ." },
        fnb: { title: "Alimentos y Bebidas", desc: "Protección de marca y cumplimiento HACCP.", full: "En la industria de A&B, la calidad del agua es sinónimo de seguridad del producto. Nuestros Smart Caps a prueba de contaminación aseguran estándares de higiene." },
        labs: { title: "Laboratorios Comerciales", desc: "Integración LIMS de alto rendimiento.", full: "Los laboratorios comerciales pueden expandir su oferta desplegando kits AquaVerify para muestreadores de campo. Los datos se sincronizan al instante." },
        realestate: { title: "Bienes Raíces", desc: "Seguridad de instalaciones y gestión de riesgos.", full: "Para administradores de propiedades, la seguridad del agua es un problema de responsabilidad. Monitoree torres de enfriamiento y sistemas domésticos." }
      }
    },
    products: {
      badge: "Nuestra Tecnología",
      title: "Ecosistema de Productos",
      subtitle: "Desde flujos de campo avanzados hasta reactivos técnicos de laboratorio, ofrecemos soluciones integrales.",
      flagship: "El Sistema Smart Cap™",
      flagshipDesc: "Optimice sus pruebas de campo con entrega de reactivos Smart Cap integrada directamente en la botella de muestra.",
      flagshipBadge: "Innovación destacada",
      zeroContam: "Cero Contaminación",
      flagshipFeature1Desc: "Sistema de dosificación sellado.",
      noUV: "No Requiere UV",
      flagshipFeature2Desc: "Lectura visual por color.",
      flagshipDetails: "Ver más detalles",
      download: "Descargar Ficha Técnica",
      catalogSubtitle: "Explora las principales familias de productos AquaVerify.",
      families: {
        equipment: { title: "Familia I: Equipos de Lab", desc: "Instrumentación accesible, ergonómica y modular." },
        micro: { title: "Familia II: Kits Microbiológicos", desc: "Gama biotecnológica central para detección y enumeración." },
        media: { title: "Familia III: Medios y Reactivos", desc: "Medios de cultivo deshidratados y listos para usar (RTU)." },
        molecular: { title: "Familia IV: Soluciones Molecolari", desc: "Información profunda sobre fuentes de contaminación y genes de resistencia." },
        physchem: { title: "Familia V: Control Físico-Químico", desc: "Sensores y kits para parámetros esenciales." },
        services: { title: "Familia VI: Servicios y Formación", desc: "La plataforma AquaVerify Academy para el desarrollo de habilidades." }
      },
      modal: {
        familyLabel: "Familia de Productos",
        catalog: "Catálogo",
        search: "Buscar productos...",
        noResults: "No se encontraron productos.",
        compareCount: "{n}/3 para comparar",
        compareTitle: "Comparando {n} Productos",
        back: "Volver al Catálogo",
        feature: "Característica",
        description: "Descripción",
        specs: "Especificaciones",
        applications: "Aplicaciones",
        na: "N/A",
        combinedQuote: "Solicitar Cotización",
        viewImage: "Ver Imagen",
        moreDetails: "Más Detalles",
        quote: "Cotizar",
        fallbackDesc: "Seleccione 'Más Detalles' para ver especificaciones completas.",
        emptyViewDetails: "Ver Detalles",
        emptyViewDetailsDesc: "Haga clic en cualquier producto del catálogo para ver especificaciones, imágenes y casos de uso.",
        emptyCompare: "Comparar Ítems",
        emptyCompareDesc: "Marque las casillas junto a los productos para comparar hasta 3 modelos lado a lado.",
        selectedCount: "{n} productos seleccionados",
        compareBtn: "Comparar Productos"
      }
    },
    footer: {
      tagline: "Biotecnología verificable. Datos trazables. El nuevo estándar en garantía de seguridad hídrica.",
      solutions: "Sectores",
      company: "Empresa",
      contact: "Contacto",
      contactHelper: "Usa el enlace Contacto o escríbenos por email para una respuesta más ágil.",
      contactRequest: "Iniciar solicitud",
      rights: "AquaVerify Inc. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      cookie: "Configurar cookies"
    }
  },
  fr: {
    nav: {
      solutions: "Secteurs",
      products: "Produits",
      platform: "Plateforme",
      resources: "Ressources",
      distributors: "Distributeurs",
      oem: "Programme OEM",
      login: "Connexion",
      demo: "Demander Démo",
      catalog: "Catalogue Complet",
      viewPdf: "Voir Catalogue PDF",
      searchPlaceholder: "Rechercher produits, kits ou familles..."
    },
    hero: {
      badge: "Biotechnologie Nouvelle Génération",
      titleStart: "La Science de la",
      titleEnd: "Vérification",
      subtitle: "Nous fusionnons biotechnologie vérifiable et traçabilité numérique pour soutenir les décisions de qualité de l’eau avec une précision de laboratoire.",
      explore: "Explorer les Kits",
      data: "Voir Données Scientifiques",
      limsTitle: "LIMS de Traçabilité Numérique",
      limsDesc: "Automatisez les rapports. Éliminez le papier. Intégrez à votre ERP en quelques secondes."
    },
    valueProps: {
      title: "Écosystème Unifié de Sécurité de l'Eau",
      subtitle: "Nous comblons le fossé entre les tests sur le terrain et le reporting technique avec une solution unique.",
      cards: {
        bio: { title: "Biotechnologie Vérifiable", desc: "Kits de microbiologie de l’eau pour flux orientés ISO couvrant coliphages et E. coli. Les flux Smart Cap peuvent réduire les étapes dépendantes des UV." },
        cloud: { title: "Numérisation Cloud", desc: "Numérisation instantanée via app mobile. Stockage de données sécurisé et immuable pour une traçabilité complète." },
        oem: { title: "Partenariat B2B & OEM", desc: "Solutions évolutives pour laboratoires et municipalités. Marquez notre technologie pour élargir votre portefeuille." }
      }
    },
    saas: {
      badge: "Le Cloud AquaVerify",
      title: "CRM, LIMS et opérations dans une seule plateforme.",
      tabs: { mobile: "CRM et portail", lims: "Dashboard LIMS", compliance: "Opérations" },
      mobile: { title: "CRM clients et partenaires", desc: "Connectez leads, comptes, distributeurs, historique support et contexte du portail client dans un registre commercial." },
      lims: { title: "Contrôle LIMS centralisé", desc: "Coordonnez réception d’échantillons, charge de travail, validation et rapports depuis un même espace laboratoire." },
      compliance: { title: "Visibilité opérationnelle", desc: "Suivez KPIs, marge, charge de travail et reporting pour donner une vision temps réel à la direction." },
      learnMore: "En savoir plus sur"
    },
    distributors: {
      badge: "Réseau Mondial",
      title: "Distributeurs Agréés",
      subtitle: "Trouvez un partenaire autorisé AquaVerify près de chez vous pour un support local, du stock et une formation.",
      cta: "Trouver un Partenaire",
      modalTitle: "Réseau Mondial de Partenaires",
      modalSubtitle: "Sélectionnez un emplacement pour voir les détails du partenaire.",
      partnerType: {
        exclusive: "Distributeur Exclusif",
        reseller: "Revendeur Agréé",
        service: "Centre de Service"
      },
      contactBtn: "Contacter le Partenaire",
      contactSuccess: "Demande Envoyée avec Succès"
    },
    oem: {
      badge: "OEM & Marque Blanche",
      title: "Votre Marque. Notre Technologie.",
      desc: "Développez votre catalogue avec notre programme marque blanche (OEM). Nous fournissons les kits techniques; vous fournissez la marque.",
      packaging: "Emballage Personnalisé",
      packagingDesc: "Alignement total de la marque sur les boîtes et interfaces.",
      revenue: "Revenus Récurrents",
      revenueDesc: "Modèle d'abonnement avec kits consommables.",
      calculatorTitle: "Simulateur ROI Partenaire",
      testsLabel: "Tests Effectués Par Mois",
      laborLabel: "Coût Main d'Oeuvre Technicien ($/h)",
      timeSaved: "Temps économisé par test vs méthodes traditionnelles",
      minSaved: "minutes économisées",
      annualSavings: "Économies Annuelles Estimées",
      partnerBtn: "Devenir Partenaire OEM"
    },
    sectors: {
      badge: "Applications Stratégiques",
      title: "Industries Desservies",
      viewCases: "Voir Cas d'Usage",
      advantage: "Avantage AquaVerify",
      applications: "Applications Clés",
      close: "Fermer",
      request: "Demander Proposition",
      list: {
        municipal: { title: "Eau Municipale", desc: "Eau potable sûre pour les communautés.", full: "Les municipalités doivent fournir de l'eau sûre tout en gérant des infrastructures vieillissantes. AquaVerify offre des capacités de test rapides sur site." },
        fnb: { title: "Alimentation & Boissons", desc: "Protection de la marque et documentation HACCP.", full: "Dans l'industrie agroalimentaire, la qualité de l'eau est étroitement liée à la sécurité produit. Les flux AquaVerify soutiennent le suivi hygiène et les enregistrements traçables." },
        labs: { title: "Laboratoires Commerciaux", desc: "Intégration LIMS haut débit.", full: "Les laboratoires peuvent élargir leurs offres en déployant des kits AquaVerify. Les données se synchronisent instantanément avec votre LIMS central." },
        realestate: { title: "Immobilier", desc: "Sécurité des installations et gestion des risques.", full: "Pour les gestionnaires immobiliers, la sécurité de l'eau est une question de responsabilité. Surveillez les tours de refroidissement et les systèmes domestiques." }
      }
    },
    products: {
      badge: "Notre Technologie",
      title: "Écosystème Produit",
      subtitle: "Des flux terrain avancés aux réactifs techniques de laboratoire, nous fournissons des solutions complètes.",
      flagship: "Le Système Smart Cap™",
      flagshipDesc: "Optimisez vos tests terrain avec la délivrance de réactif Smart Cap intégrée directement dans le flacon.",
      flagshipBadge: "Innovation phare",
      zeroContam: "Zéro Contamination",
      flagshipFeature1Desc: "Système de dosage scellé.",
      noUV: "Pas d'UV Requis",
      flagshipFeature2Desc: "Lecture visuelle par couleur.",
      flagshipDetails: "Voir plus de détails",
      download: "Télécharger Fiche Technique",
      catalogSubtitle: "Explorez les principales familles de produits AquaVerify.",
      families: {
        equipment: { title: "Famille I: Équipement Lab", desc: "Instrumentation accessible, ergonomique et modulaire." },
        micro: { title: "Famille II: Kits Microbiologiques", desc: "Gamme biotechnologique centrale pour détection et dénombrement." },
        media: { title: "Famille III: Milieux & Réactifs", desc: "Milieux de culture déshydratés et prêts à l'emploi (RTU)." },
        molecular: { title: "Famille IV: Solutions Moléculaires", desc: "Informations approfondies sur les sources de contamination et gènes de résistance." },
        physchem: { title: "Famille V: Contrôle Physico-Chimique", desc: "Capteurs et kits pour les paramètres essentiels." },
        services: { title: "Famille VI: Services & Formation", desc: "La plateforme AquaVerify Academy pour le développement des compétences." }
      },
      modal: {
        familyLabel: "Famille de Produits",
        catalog: "Catalogue",
        search: "Rechercher produits...",
        noResults: "Aucun produit trouvé.",
        compareCount: "{n}/3 à comparer",
        compareTitle: "Comparaison de {n} Produits",
        back: "Retour à la Liste",
        feature: "Caractéristique",
        description: "Description",
        specs: "Spécifications",
        applications: "Applications",
        na: "N/A",
        combinedQuote: "Demander Devis",
        viewImage: "Voir Image",
        moreDetails: "Plus de Détails",
        quote: "Demander Devis",
        fallbackDesc: "Sélectionnez 'Plus de Détails' pour voir les spécifications complètes.",
        emptyViewDetails: "Voir Détails",
        emptyViewDetailsDesc: "Cliquez sur un produit dans le catalogue pour voir les spécifications, images et cas d'usage.",
        emptyCompare: "Comparer Articles",
        emptyCompareDesc: "Cochez les cases à côté des produits pour comparer jusqu'à 3 modèles côte à côte.",
        selectedCount: "{n} produits sélectionnés",
        compareBtn: "Comparer Produits"
      }
    },
    footer: {
      tagline: "Biotech vérifiable. Données traçables. La nouvelle norme en assurance sécurité de l'eau.",
      solutions: "Secteurs",
      company: "Entreprise",
      contact: "Contact",
      contactHelper: "Utilisez le lien Contact ou écrivez-nous par email pour un traitement plus rapide.",
      contactRequest: "Démarrer la demande",
      rights: "AquaVerify Inc. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      cookie: "Parametres cookies"
    }
  },
  it: {
    nav: {
      solutions: "Settori",
      products: "Prodotti",
      platform: "Piattaforma",
      resources: "Risorse",
      distributors: "Distributori",
      oem: "Programma OEM",
      login: "Accedi",
      demo: "Richiedi Demo",
      catalog: "Catalogo Completo",
      viewPdf: "Vedi Catalogo PDF",
      searchPlaceholder: "Cerca prodotti, kit o famiglie..."
    },
    hero: {
      badge: "Biotecnologia di Nuova Generazione",
      titleStart: "La Scienza della",
      titleEnd: "Verifica",
      subtitle: "Uniamo biotecnologia verificabile e tracciabilità digitale per supportare decisioni sulla qualità dell’acqua con precisione di laboratorio.",
      explore: "Esplora Kit",
      data: "Vedi Dati Scientifici",
      limsTitle: "LIMS Tracciabilità Digitale",
      limsDesc: "Automatizza i report. Elimina la carta. Integra col tuo ERP in pochi secondi."
    },
    valueProps: {
      title: "Ecosistema Unificato Sicurezza Idrica",
      subtitle: "Colmiamo il divario tra test sul campo e reporting tecnico con un'unica soluzione integrata.",
      cards: {
        bio: { title: "Biotecnologia Verificabile", desc: "Kit di microbiologia dell’acqua per flussi orientati ISO su colifagi ed E. coli. I flussi Smart Cap possono ridurre passaggi dipendenti da UV." },
        cloud: { title: "Digitalizzazione Cloud", desc: "Digitalizzazione istantanea via app mobile. Archiviazione sicura e immutabile per tracciabilità completa." },
        oem: { title: "Partnership B2B & OEM", desc: "Soluzioni scalabili per laboratori e comuni. Marchia la nostra tecnologia per espandere il tuo portafoglio." }
      }
    },
    saas: {
      badge: "Il Cloud AquaVerify",
      title: "CRM, LIMS e operations in un’unica piattaforma.",
      tabs: { mobile: "CRM e portale", lims: "Dashboard LIMS", compliance: "Operations" },
      mobile: { title: "CRM clienti e partner", desc: "Collega lead, account, distributori, storico supporto e contesto portale clienti in un record commerciale." },
      lims: { title: "Controllo LIMS centralizzato", desc: "Coordina ricezione campioni, carico di lavoro, validazione e report da un unico spazio laboratorio." },
      compliance: { title: "Visibilità operativa", desc: "Monitora KPI, margine, carico di lavoro e reporting per dare al management una vista in tempo reale." },
      learnMore: "Scopri di più su"
    },
    distributors: {
      badge: "Rete Globale",
      title: "Distributori Autorizzati",
      subtitle: "Trova un partner autorizzato AquaVerify vicino a te per supporto locale, stock e formazione.",
      cta: "Trova un Partner",
      modalTitle: "Rete Globale Partner",
      modalSubtitle: "Seleziona una posizione per vedere i dettagli del partner.",
      partnerType: {
        exclusive: "Distributore Esclusivo",
        reseller: "Rivenditore Autorizzato",
        service: "Centro Assistenza"
      },
      contactBtn: "Contatta Partner",
      contactSuccess: "Richiesta Inviata con Successo"
    },
    oem: {
      badge: "OEM & White Label",
      title: "Il Tuo Brand. La Nostra Tecnologia.",
      desc: "Espandi il tuo catalogo con il nostro programma white-label (OEM). Forniamo kit tecnici e infrastruttura; tu metti il brand.",
      packaging: "Packaging Personalizzato",
      packagingDesc: "Allineamento totale del brand su scatole e interfacce.",
      revenue: "Ricavi Ricorrenti",
      revenueDesc: "Modello di abbonamento con kit consumabili.",
      calculatorTitle: "Simulatore ROI Partner",
      testsLabel: "Test Eseguiti al Mese",
      laborLabel: "Costo Manodopera Tecnico ($/h)",
      timeSaved: "Tempo risparmiato per test vs metodi tradizionali",
      minSaved: "minuti risparmiati",
      annualSavings: "Risparmio Annuo Stimato Cliente",
      partnerBtn: "Diventa Partner OEM"
    },
    sectors: {
      badge: "Applicazioni Strategiche",
      title: "Industrie che Serviamo",
      viewCases: "Vedi Casi d'Uso",
      advantage: "Vantaggio AquaVerify",
      applications: "Applicazioni Chiave",
      close: "Chiudi",
      request: "Richiedi Proposta",
      list: {
        municipal: { title: "Acqua Municipale", desc: "Acqua potabile sicura per le comunità.", full: "I comuni devono fornire acqua sicura gestendo infrastrutture vecchie. AquaVerify offre capacità di test rapide in loco." },
        fnb: { title: "Alimenti & Bevande", desc: "Protezione brand e documentazione HACCP.", full: "Nell'industria F&B, la qualità dell'acqua è strettamente legata alla sicurezza del prodotto. I flussi AquaVerify supportano monitoraggio igienico e registri tracciabili." },
        labs: { title: "Laboratori Commerciali", desc: "Integrazione LIMS ad alto rendimento.", full: "I laboratori possono espandere l'offerta distribuendo kit AquaVerify. I dati si sincronizzano istantaneamente col tuo LIMS centrale." },
        realestate: { title: "Immobiliare", desc: "Sicurezza strutture e gestione rischi.", full: "Per i gestori immobiliari, la sicurezza dell'acqua è una questione di responsabilità. Monitora torri di raffreddamento e sistemi domestici." }
      }
    },
    products: {
      badge: "La Nostra Tecnologia",
      title: "Ecosistema Prodotti",
      subtitle: "Da flussi da campo avanzati a reagenti tecnici di laboratorio, offriamo soluzioni complete.",
      flagship: "Il Sistema Smart Cap™",
      flagshipDesc: "Ottimizza i test sul campo con rilascio reagente Smart Cap integrato direttamente nella bottiglia.",
      flagshipBadge: "Innovazione principale",
      zeroContam: "Zero Contaminazione",
      flagshipFeature1Desc: "Sistema di dosaggio sigillato.",
      noUV: "Nessun UV Richiesto",
      flagshipFeature2Desc: "Lettura visiva del colore.",
      flagshipDetails: "Vedi più dettagli",
      download: "Scarica Scheda Tecnica",
      catalogSubtitle: "Esplora le principali famiglie di prodotti AquaVerify.",
      families: {
        equipment: { title: "Famiglia I: Attrezzature Lab", desc: "Strumentazione accessibile, ergonomica e modulare." },
        micro: { title: "Famiglia II: Kit Microbiologici", desc: "Gamma biotecnologica centrale per rilevamento e conteggio." },
        media: { title: "Famiglia III: Terreni & Reagenti", desc: "Terreni di coltura disidratati e pronti all'uso (RTU)." },
        molecular: { title: "Famiglia IV: Soluzioni Molecolari", desc: "Approfondimenti su fonti di contaminazione e geni di resistenza." },
        physchem: { title: "Famiglia V: Controllo Fisico-Chimico", desc: "Sensori e kit per parametri essenziali." },
        services: { title: "Famiglia VI: Servizi & Formazione", desc: "La piattaforma AquaVerify Academy per lo sviluppo delle competenze." }
      },
      modal: {
        familyLabel: "Famiglia Prodotti",
        catalog: "Catalogo",
        search: "Cerca prodotti...",
        noResults: "Nessun prodotto trovato.",
        compareCount: "{n}/3 da confrontare",
        compareTitle: "Confronto di {n} Prodotti",
        back: "Torna alla Lista",
        feature: "Caratteristica",
        description: "Descrizione",
        specs: "Specifiche",
        applications: "Applicazioni",
        na: "N/A",
        combinedQuote: "Richiedi Preventivo",
        viewImage: "Vedi Immagine",
        moreDetails: "Più Dettagli",
        quote: "Preventivo",
        fallbackDesc: "Seleziona 'Più Dettagli' per vedere le specifiche tecniche complete.",
        emptyViewDetails: "Vedi Dettagli",
        emptyViewDetailsDesc: "Clicca su un prodotto nel catalogo a sinistra per vedere specifiche, immagini e casi d'uso.",
        emptyCompare: "Confronta Articoli",
        emptyCompareDesc: "Spunta le caselle accanto ai prodotti per confrontare fino a 3 modelli fianco a fianco.",
        selectedCount: "{n} prodotti selezionati",
        compareBtn: "Confronta Prodotti"
      }
    },
    footer: {
      tagline: "Biotech verificabile. Dati tracciabili. Il nuovo standard nella garanzia di sicurezza idrica.",
      solutions: "Settori",
      company: "Azienda",
      contact: "Contatti",
      contactHelper: "Usa il link Contatti o scrivici via email per un instradamento più rapido.",
      contactRequest: "Avvia richiesta",
      rights: "AquaVerify Inc. Tutti i diritti riservati.",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio",
      cookie: "Impostazioni cookie"
    }
  }
};

const caTranslation: typeof translations.en = {
  ...translations.es,
  nav: {
    ...translations.es.nav,
    solutions: 'Sectors',
    products: 'Productes',
    platform: 'Plataforma',
    resources: 'Recursos',
    distributors: 'Distribuïdors',
    oem: 'Programa OEM',
    login: 'Accés',
    demo: 'Sol·licitar demo',
    catalog: 'Catàleg complet',
    viewPdf: 'Veure catàleg PDF',
    searchPlaceholder: 'Cercar productes, kits o famílies...'
  },
  hero: {
    badge: 'Biotecnologia de nova generació',
    titleStart: 'Microbiologia de l’aigua',
    titleEnd: 'amb traçabilitat digital',
    subtitle: 'Combinem productes d’anàlisi de l’aigua amb una plataforma digital per fer cada mostra verificable.',
    explore: 'Explorar kits',
    data: 'Veure plataforma',
    limsTitle: 'LIMS de traçabilitat digital',
    limsDesc: 'Automatitza informes, elimina paper i connecta mostres, clients i resultats.'
  },
  valueProps: {
    title: 'Productes de microbiologia de l’aigua amb plataforma integrada',
    subtitle: 'AquaVerify connecta kits, laboratori, distribuïdors i dades en un flux B2B traçable.',
    cards: {
      bio: { title: 'Biotecnologia verificable', desc: 'Kits i essentials per a anàlisi microbiològica de l’aigua, incloent colífags, E. coli i enterococs.' },
      cloud: { title: 'Traçabilitat digital', desc: 'Registre digital de mostres, operadors, resultats, informes i activitat comercial.' },
      oem: { title: 'B2B, distribució i OEM', desc: 'Productes AquaVerify o marca blanca per a distribuïdors que volen ampliar catàleg amb software connectat.' }
    }
  },
  saas: {
    badge: 'AquaVerify Cloud',
    title: 'CRM, LIMS i operacions en una sola plataforma.',
    tabs: { mobile: 'CRM i portal', lims: 'Dashboard LIMS', compliance: 'Operacions' },
    mobile: { title: 'CRM de clients i partners', desc: 'Connecta leads, comptes, distribuïdors, historial de suport i context de portal client en un registre comercial.' },
    lims: { title: 'Control LIMS centralitzat', desc: 'Coordina recepció de mostres, càrrega de treball, validació i informes des d’un únic espai de laboratori.' },
    compliance: { title: 'Visibilitat operativa', desc: 'Segueix KPIs, marge, càrrega de treball i reporting perquè direcció vegi què passa en temps real.' },
    learnMore: 'Més informació sobre'
  },
  products: {
    ...translations.es.products,
    badge: 'La nostra tecnologia',
    title: 'Ecosistema de productes',
    subtitle: 'Des de fluxos de camp avançats fins a reactius tècnics de laboratori, oferim solucions integrals.',
    flagship: 'El sistema Smart Cap™',
    flagshipDesc: 'Optimitza les proves de camp amb la dosificació de reactius Smart Cap integrada directament a l’ampolla de mostra.',
    flagshipBadge: 'Innovació destacada',
    zeroContam: 'Contaminació reduïda',
    flagshipFeature1Desc: 'Sistema de dosificació segellat.',
    noUV: 'No requereix UV',
    flagshipFeature2Desc: 'Lectura visual per color.',
    flagshipDetails: 'Veure més detalls',
    download: 'Descarregar fitxa tècnica',
    catalogSubtitle: 'Explora les principals famílies de productes AquaVerify.',
    families: {
      equipment: { title: 'Família I: equips de laboratori', desc: 'Instrumentació accessible, ergonòmica i modular.' },
      micro: { title: 'Família II: kits microbiològics', desc: 'Gamma biotecnològica central per a detecció i enumeració.' },
      media: { title: 'Família III: medis i reactius', desc: 'Medis de cultiu deshidratats i llestos per utilitzar.' },
      molecular: { title: 'Família IV: solucions moleculars', desc: 'Informació sobre fonts de contaminació i gens de resistència.' },
      physchem: { title: 'Família V: control fisicoquímic', desc: 'Sensors i kits per a paràmetres essencials.' },
      services: { title: 'Família VI: serveis i formació', desc: 'La plataforma AquaVerify Academy per al desenvolupament de competències.' }
    },
    modal: {
      ...translations.es.products.modal,
      familyLabel: 'Família de productes',
      catalog: 'Catàleg',
      search: 'Cercar productes...',
      noResults: 'No s’han trobat productes.',
      compareCount: '{n}/3 per comparar',
      compareTitle: 'Comparant {n} productes',
      back: 'Tornar al catàleg',
      feature: 'Característica',
      description: 'Descripció',
      specs: 'Especificacions',
      applications: 'Aplicacions',
      combinedQuote: 'Sol·licitar pressupost',
      viewImage: 'Veure imatge',
      moreDetails: 'Més detalls',
      quote: 'Pressupost',
      fallbackDesc: 'Selecciona “Més detalls” per veure les especificacions completes.',
      emptyViewDetails: 'Veure detalls',
      emptyViewDetailsDesc: 'Fes clic en qualsevol producte del catàleg per veure especificacions, imatges i casos d’ús.',
      emptyCompare: 'Comparar productes',
      emptyCompareDesc: 'Marca les caselles dels productes per comparar fins a 3 models.',
      selectedCount: '{n} productes seleccionats',
      compareBtn: 'Comparar productes'
    }
  },
  footer: {
    tagline: 'Biotech verificable. Dades traçables. El nou estàndard en seguretat de l’aigua.',
    solutions: 'Sectors',
    company: 'Empresa',
    contact: 'Contacte',
    contactHelper: 'Fes servir l’enllaç Contacte o escriu-nos per email per a una resposta més àgil.',
    contactRequest: 'Iniciar sol·licitud',
    rights: 'AquaVerify Inc. Tots els drets reservats.',
    privacy: 'Política de privacitat',
    terms: 'Condicions del servei',
    cookie: 'Configuració de cookies'
  }
};

(translations as Record<string, typeof translations.en>).ca = caTranslation;
