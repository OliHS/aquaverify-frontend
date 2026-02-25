
export type Language = 'en' | 'es' | 'fr' | 'it';

export const translations = {
  en: {
    nav: {
      solutions: "Solutions",
      products: "Products",
      platform: "Platform",
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
      subtitle: "We bridge the gap between field testing and compliance reporting with a single, integrated solution.",
      cards: {
        bio: { title: "Verifiable Biotechnology", desc: "ISO-compliant testing kits for Coliphages and E. coli. Our patented Smart Cap technology eliminates the need for UV light." },
        cloud: { title: "Cloud Digitalization", desc: "Instant digitization of results via mobile app. Secure, immutable data storage ensures complete traceability." },
        oem: { title: "B2B & OEM Partnership", desc: "Scalable solutions for laboratories and municipalities. White-label our technology to expand your portfolio." }
      }
    },
    saas: {
      badge: "The AquaVerify Cloud",
      title: "From Sample to Certificate. Instantly.",
      tabs: { mobile: "Field App", lims: "LIMS Dashboard", compliance: "Compliance Reports" },
      mobile: { title: "Field Data Collection", desc: "Empower your technicians with the AquaVerify Mobile App. Scan sample QR codes and log GPS coordinates automatically." },
      lims: { title: "Centralized LIMS Control", desc: "A powerful command center for your lab. Monitor testing volume and track trends over time." },
      compliance: { title: "Automated Reporting", desc: "Generate ISO/EPA compliant reports with one click. Eliminate manual data entry errors." },
      learnMore: "Learn more about"
    },
    distributors: {
      badge: "Global Network",
      title: "Authorized Distributors",
      subtitle: "Find a certified AquaVerify partner near you for local support, stock availability, and training.",
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
      desc: "Expand your catalog with our white-label (OEM) program. We provide the certified kits and software infrastructure; you provide the branding.",
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
        fnb: { title: "Food & Beverage", desc: "Brand protection & HACCP compliance.", full: "In the food and beverage industry, water quality is synonymous with product safety. Our contamination-proof Smart Caps ensure hygiene standards." },
        labs: { title: "Commercial Labs", desc: "High-throughput LIMS integration.", full: "Commercial laboratories can expand their service offerings by deploying AquaVerify kits for field samplers. Data syncs instantly to your central LIMS." },
        realestate: { title: "Real Estate", desc: "Facility safety & risk management.", full: "For commercial property managers, water safety is a liability issue. Proactively monitor cooling towers and domestic water systems." }
      }
    },
    products: {
      badge: "Our Technology",
      title: "Product Ecosystem",
      subtitle: "From advanced field sensors to certified laboratory reagents, we provide end-to-end solutions.",
      flagship: "The Smart Cap™ System",
      flagshipDesc: "Revolutionize your field testing with our patented Smart Cap technology. Reagent delivery integrated directly into the sample bottle.",
      zeroContam: "Zero Contamination",
      noUV: "No UV Required",
      download: "Download Datasheet",
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
      solutions: "Solutions",
      company: "Company",
      contact: "Contact",
      rights: "AquaVerify Inc. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  },
  es: {
    nav: {
      solutions: "Soluciones",
      products: "Productos",
      platform: "Plataforma",
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
      subtitle: "Fusionamos biotecnología verificable con trazabilidad digital. Garantice la seguridad con precisión de laboratorio, en cualquier lugar.",
      explore: "Explorar Kits",
      data: "Ver Datos Científicos",
      limsTitle: "LIMS de Trazabilidad Digital",
      limsDesc: "Automatice informes. Elimine el papel. Integre con su ERP en segundos."
    },
    valueProps: {
      title: "Ecosistema Unificado de Seguridad Hídrica",
      subtitle: "Unimos las pruebas de campo y los informes de cumplimiento con una solución integral.",
      cards: {
        bio: { title: "Biotecnología Verificable", desc: "Kits compatibles con ISO para Colífagos y E. coli. Nuestra tecnología Smart Cap elimina la necesidad de luz UV." },
        cloud: { title: "Digitalización en la Nube", desc: "Digitalización instantánea vía app móvil. Almacenamiento seguro e inmutable que garantiza trazabilidad total." },
        oem: { title: "Asociación B2B y OEM", desc: "Soluciones escalables para laboratorios y municipios. Etiquete nuestra tecnología para expandir su portafolio." }
      }
    },
    saas: {
      badge: "La Nube AquaVerify",
      title: "De la Muestra al Certificado. Al Instante.",
      tabs: { mobile: "App de Campo", lims: "Panel LIMS", compliance: "Informes de Cumplimiento" },
      mobile: { title: "Recolección de Datos en Campo", desc: "Empodere a sus técnicos con la App Móvil AquaVerify. Escanee códigos QR y registre coordenadas GPS automáticamente." },
      lims: { title: "Control LIMS Centralizado", desc: "Un centro de comando para su laboratorio. Monitoree el volumen de pruebas y rastree tendencias en el tiempo." },
      compliance: { title: "Informes Automatizados", desc: "Genere informes compatibles con ISO/EPA con un clic. Elimine errores de entrada manual de datos." },
      learnMore: "Más información sobre"
    },
    distributors: {
      badge: "Red Global",
      title: "Distribuidores Autorizados",
      subtitle: "Encuentre un socio certificado de AquaVerify cerca de usted para soporte local, inventario y capacitación.",
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
      desc: "Expanda su catálogo con nuestro programa de marca blanca (OEM). Proveemos los kits certificados y la infraestructura; usted pone la marca.",
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
      subtitle: "Desde sensores de campo avanzados hasta reactivos de laboratorio certificados, ofrecemos soluciones integrales.",
      flagship: "El Sistema Smart Cap™",
      flagshipDesc: "Revolucione sus pruebas de campo con nuestra tecnología patentada Smart Cap. Entrega de reactivos integrada directamente en la botella de muestra.",
      zeroContam: "Cero Contaminación",
      noUV: "No Requiere UV",
      download: "Descargar Ficha Técnica",
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
      solutions: "Soluciones",
      company: "Empresa",
      contact: "Contacto",
      rights: "AquaVerify Inc. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    }
  },
  fr: {
    nav: {
      solutions: "Solutions",
      products: "Produits",
      platform: "Plateforme",
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
      subtitle: "Nous fusionnons biotechnologie vérifiable et traçabilité numérique. Assurez la sécurité avec une précision de laboratoire, partout.",
      explore: "Explorer les Kits",
      data: "Voir Données Scientifiques",
      limsTitle: "LIMS de Traçabilité Numérique",
      limsDesc: "Automatisez les rapports. Éliminez le papier. Intégrez à votre ERP en quelques secondes."
    },
    valueProps: {
      title: "Écosystème Unifié de Sécurité de l'Eau",
      subtitle: "Nous comblons le fossé entre les tests sur le terrain et les rapports de conformité avec une solution unique.",
      cards: {
        bio: { title: "Biotechnologie Vérifiable", desc: "Kits conformes ISO pour Coliphages et E. coli. Notre technologie Smart Cap élimine le besoin de lumière UV." },
        cloud: { title: "Numérisation Cloud", desc: "Numérisation instantanée via app mobile. Stockage de données sécurisé et immuable garantissant une traçabilité totale." },
        oem: { title: "Partenariat B2B & OEM", desc: "Solutions évolutives pour laboratoires et municipalités. Marquez notre technologie pour élargir votre portefeuille." }
      }
    },
    saas: {
      badge: "Le Cloud AquaVerify",
      title: "De l'Échantillon au Certificat. Instantanément.",
      tabs: { mobile: "App Terrain", lims: "Tableau de Bord LIMS", compliance: "Rapports de Conformité" },
      mobile: { title: "Collecte de Données Terrain", desc: "Donnez les moyens à vos techniciens avec l'App Mobile AquaVerify. Scannez les codes QR et enregistrez les coordonnées GPS." },
      lims: { title: "Contrôle LIMS Centralisé", desc: "Un centre de commande pour votre labo. Surveillez le volume de tests et suivez les tendances dans le temps." },
      compliance: { title: "Rapports Automatisés", desc: "Générez des rapports conformes ISO/EPA en un clic. Éliminez les erreurs de saisie manuelle." },
      learnMore: "En savoir plus sur"
    },
    distributors: {
      badge: "Réseau Mondial",
      title: "Distributeurs Agréés",
      subtitle: "Trouvez un partenaire certifié AquaVerify près de chez vous pour un support local, du stock et une formation.",
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
      desc: "Développez votre catalogue avec notre programme marque blanche (OEM). Nous fournissons les kits certifiés; vous fournissez la marque.",
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
        fnb: { title: "Alimentation & Boissons", desc: "Protection de la marque et conformité HACCP.", full: "Dans l'industrie agroalimentaire, la qualité de l'eau est synonyme de sécurité produit. Nos Smart Caps assurent les normes d'hygiène." },
        labs: { title: "Laboratoires Commerciaux", desc: "Intégration LIMS haut débit.", full: "Les laboratoires peuvent élargir leurs offres en déployant des kits AquaVerify. Les données se synchronisent instantanément avec votre LIMS central." },
        realestate: { title: "Immobilier", desc: "Sécurité des installations et gestion des risques.", full: "Pour les gestionnaires immobiliers, la sécurité de l'eau est une question de responsabilité. Surveillez les tours de refroidissement et les systèmes domestiques." }
      }
    },
    products: {
      badge: "Notre Technologie",
      title: "Écosystème Produit",
      subtitle: "Des capteurs de terrain avancés aux réactifs de laboratoire certifiés, nous fournissons des solutions complètes.",
      flagship: "Le Système Smart Cap™",
      flagshipDesc: "Révolutionnez vos tests sur le terrain avec notre technologie brevetée Smart Cap. Délivrance de réactif intégrée directement dans le flacon.",
      zeroContam: "Zéro Contamination",
      noUV: "Pas d'UV Requis",
      download: "Télécharger Fiche Technique",
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
      solutions: "Solutions",
      company: "Entreprise",
      contact: "Contact",
      rights: "AquaVerify Inc. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    }
  },
  it: {
    nav: {
      solutions: "Soluzioni",
      products: "Prodotti",
      platform: "Piattaforma",
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
      subtitle: "Uniamo biotecnologia verificabile e tracciabilità digitale. Garantisci la sicurezza con precisione di laboratorio, ovunque.",
      explore: "Esplora Kit",
      data: "Vedi Dati Scientifici",
      limsTitle: "LIMS Tracciabilità Digitale",
      limsDesc: "Automatizza i report. Elimina la carta. Integra col tuo ERP in pochi secondi."
    },
    valueProps: {
      title: "Ecosistema Unificato Sicurezza Idrica",
      subtitle: "Colmiamo il divario tra test sul campo e report di conformità con un'unica soluzione integrata.",
      cards: {
        bio: { title: "Biotecnologia Verificabile", desc: "Kit conformi ISO per Colifagi ed E. coli. La nostra tecnologia Smart Cap elimina la necessità di luce UV." },
        cloud: { title: "Digitalizzazione Cloud", desc: "Digitalizzazione istantanea via app mobile. Archiviazione sicura e immutabile garantisce tracciabilità totale." },
        oem: { title: "Partnership B2B & OEM", desc: "Soluzioni scalabili per laboratori e comuni. Marchia la nostra tecnologia per espandere il tuo portafoglio." }
      }
    },
    saas: {
      badge: "Il Cloud AquaVerify",
      title: "Dal Campione al Certificato. Istantaneamente.",
      tabs: { mobile: "App Campo", lims: "Dashboard LIMS", compliance: "Report Conformità" },
      mobile: { title: "Raccolta Dati su Campo", desc: "Potenzia i tuoi tecnici con l'App Mobile AquaVerify. Scansiona codici QR e registra coordinate GPS automaticamente." },
      lims: { title: "Controllo LIMS Centralizzato", desc: "Un centro di comando per il tuo laboratorio. Monitora il volume dei test e traccia le tendenze nel tempo." },
      compliance: { title: "Report Automatizzati", desc: "Genera report conformi ISO/EPA con un clic. Elimina errori di inserimento manuale." },
      learnMore: "Scopri di più su"
    },
    distributors: {
      badge: "Rete Globale",
      title: "Distributori Autorizzati",
      subtitle: "Trova un partner certificato AquaVerify vicino a te per supporto locale, stock e formazione.",
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
      desc: "Espandi il tuo catalogo con il nostro programma white-label (OEM). Forniamo kit certificati e infrastruttura; tu metti il brand.",
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
        fnb: { title: "Alimenti & Bevande", desc: "Protezione brand e conformità HACCP.", full: "Nell'industria F&B, la qualità dell'acqua è sinonimo di sicurezza del prodotto. I nostri Smart Caps garantiscono standard igienici." },
        labs: { title: "Laboratori Commerciali", desc: "Integrazione LIMS ad alto rendimento.", full: "I laboratori possono espandere l'offerta distribuendo kit AquaVerify. I dati si sincronizzano istantaneamente col tuo LIMS centrale." },
        realestate: { title: "Immobiliare", desc: "Sicurezza strutture e gestione rischi.", full: "Per i gestori immobiliari, la sicurezza dell'acqua è una questione di responsabilità. Monitora torri di raffreddamento e sistemi domestici." }
      }
    },
    products: {
      badge: "La Nostra Tecnologia",
      title: "Ecosistema Prodotti",
      subtitle: "Da sensori da campo avanzati a reagenti di laboratorio certificati, offriamo soluzioni complete.",
      flagship: "Il Sistema Smart Cap™",
      flagshipDesc: "Rivoluziona i tuoi test sul campo con la nostra tecnologia brevettata Smart Cap. Rilascio reagente integrato direttamente nella bottiglia.",
      zeroContam: "Zero Contaminazione",
      noUV: "Nessun UV Richiesto",
      download: "Scarica Scheda Tecnica",
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
      solutions: "Soluzioni",
      company: "Azienda",
      contact: "Contatti",
      rights: "AquaVerify Inc. Tutti i diritti riservati.",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio"
    }
  }
};
