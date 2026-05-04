export const MARKETING_LANGUAGES = ['en', 'es', 'fr', 'it', 'ca'];

export const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ca: 'Català'
};

const productLinks = {
  enumera: 'enumera',
  indica: 'indica',
  standards: 'standard-kits',
  lab: 'lab-essentials',
  oem: 'oem'
};

function locale(path, title, description, sections, options = {}) {
  return {
    path,
    title,
    description,
    sections,
    eyebrow: options.eyebrow,
    primaryCta: options.primaryCta,
    secondaryCta: options.secondaryCta,
    seoTitle: options.seoTitle || title,
    seoDescription: options.seoDescription || description,
    faqs: options.faqs || []
  };
}

function section(title, body, bullets = []) {
  return { title, body, bullets };
}

function page(id, category, primaryIntent, translations, meta = {}) {
  return { id, category, primaryIntent, translations, ...meta };
}

export const MARKETING_PAGES = [
  page('products', 'products', 'quote', {
    en: locale('/products', 'Water microbiology products connected to digital traceability', 'Explore AquaVerify kits, lab essentials and connected workflows for water quality analysis.', [
      section('A portfolio built for technical buyers', 'AquaVerify combines quantitative kits, presence/absence tests, ISO/EPA-oriented workflows and laboratory essentials in one product ecosystem.', ['ENUMERA for enumeration workflows', 'INDICA for rapid presence/absence screening', 'Standard kits for ISO and EPA workflows', 'Lab Essentials for daily microbiology operations']),
      section('Products that open the digital workflow', 'Product use can be connected to AquaVerify Cloud for sample traceability, reporting, CRM and customer portal workflows.')
    ], { eyebrow: 'Products', primaryCta: 'Request product quote', secondaryCta: 'Explore platform', seoTitle: 'Water Testing Products | AquaVerify ENUMERA, INDICA and Lab Essentials' }),
    es: locale('/es/productos', 'Productos de microbiología del agua conectados a trazabilidad digital', 'Descubre kits AquaVerify, material esencial de laboratorio y flujos conectados para análisis de calidad del agua.', [
      section('Una gama creada para compradores técnicos', 'AquaVerify combina kits cuantitativos, pruebas de presencia/ausencia, flujos orientados a ISO/EPA y productos esenciales de laboratorio en un mismo ecosistema.', ['ENUMERA para flujos de enumeración', 'INDICA para cribado rápido presencia/ausencia', 'Kits estándar para flujos ISO y EPA', 'Lab Essentials para la operación diaria de microbiología']),
      section('Productos que abren el flujo digital', 'El uso de productos puede conectarse a AquaVerify Cloud para trazabilidad de muestras, reporting, CRM y portal cliente.')
    ], { eyebrow: 'Productos', primaryCta: 'Solicitar cotización', secondaryCta: 'Ver plataforma', seoTitle: 'Productos de análisis de agua | AquaVerify ENUMERA, INDICA y Lab Essentials' }),
    fr: locale('/fr/produits', 'Produits de microbiologie de l’eau connectés à la traçabilité numérique', 'Découvrez les kits AquaVerify, les essentiels de laboratoire et les flux connectés pour l’analyse de la qualité de l’eau.', [
      section('Une gamme pensée pour les acheteurs techniques', 'AquaVerify réunit kits quantitatifs, tests présence/absence, flux orientés ISO/EPA et essentiels de laboratoire dans un même écosystème.', ['ENUMERA pour les flux de dénombrement', 'INDICA pour le dépistage présence/absence', 'Kits standard pour les flux ISO et EPA', 'Lab Essentials pour la microbiologie quotidienne']),
      section('Des produits qui ouvrent le flux numérique', 'L’utilisation des produits peut être connectée à AquaVerify Cloud pour la traçabilité des échantillons, les rapports, le CRM et le portail client.')
    ], { eyebrow: 'Produits', primaryCta: 'Demander un devis', secondaryCta: 'Voir la plateforme', seoTitle: 'Produits d’analyse de l’eau | AquaVerify ENUMERA, INDICA et Lab Essentials' }),
    it: locale('/it/prodotti', 'Prodotti di microbiologia dell’acqua con tracciabilità digitale', 'Esplora kit AquaVerify, materiali essenziali di laboratorio e flussi collegati per l’analisi della qualità dell’acqua.', [
      section('Una gamma pensata per acquirenti tecnici', 'AquaVerify combina kit quantitativi, test presenza/assenza, flussi orientati a ISO/EPA e materiali essenziali di laboratorio in un unico ecosistema.', ['ENUMERA per flussi di enumerazione', 'INDICA per screening presenza/assenza', 'Kit standard per flussi ISO ed EPA', 'Lab Essentials per la microbiologia quotidiana']),
      section('Prodotti che aprono il flusso digitale', 'L’uso dei prodotti può collegarsi ad AquaVerify Cloud per tracciabilità campioni, reporting, CRM e portale clienti.')
    ], { eyebrow: 'Prodotti', primaryCta: 'Richiedi preventivo', secondaryCta: 'Vedi piattaforma', seoTitle: 'Prodotti per analisi dell’acqua | AquaVerify ENUMERA, INDICA e Lab Essentials' }),
    ca: locale('/ca/productes', 'Productes de microbiologia de l’aigua connectats a traçabilitat digital', 'Descobreix kits AquaVerify, material essencial de laboratori i fluxos connectats per a l’anàlisi de qualitat de l’aigua.', [
      section('Una gamma creada per a compradors tècnics', 'AquaVerify combina kits quantitatius, proves de presència/absència, fluxos orientats a ISO/EPA i productes essencials de laboratori en un mateix ecosistema.', ['ENUMERA per a fluxos d’enumeració', 'INDICA per a cribratge ràpid presència/absència', 'Kits estàndard per a fluxos ISO i EPA', 'Lab Essentials per a l’operació diària de microbiologia']),
      section('Productes que obren el flux digital', 'L’ús dels productes es pot connectar a AquaVerify Cloud per a traçabilitat de mostres, reporting, CRM i portal client.')
    ], { eyebrow: 'Productes', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Veure plataforma', seoTitle: 'Productes d’anàlisi d’aigua | AquaVerify ENUMERA, INDICA i Lab Essentials' })
  }),
  page('enumera', 'products', 'quote', {
    en: locale('/products/enumera', 'ENUMERA quantitative water microbiology kits', 'ENUMERA is the AquaVerify family for enumeration workflows in water microbiology.', [
      section('Built for counting, not guessing', 'ENUMERA is designed for quantitative workflows where laboratories need clear, repeatable and traceable results.', ['ENUMERA Soma100 for somatic coliphage workflows', 'ENUMERA Coli100 for bacterial indicator workflows', 'ENUMERA Entero100 for enterococci workflows', 'Refills and tools for repeatable operation']),
      section('Connected to AquaVerify Cloud', 'Results, operators, sample context and reporting can be linked to the digital platform.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Request ENUMERA quote', secondaryCta: 'View all products' }),
    es: locale('/es/productos/enumera', 'Kits cuantitativos ENUMERA para microbiología del agua', 'ENUMERA es la familia AquaVerify para flujos de enumeración en microbiología del agua.', [
      section('Diseñada para contar, no para adivinar', 'ENUMERA está pensada para flujos cuantitativos donde el laboratorio necesita resultados claros, repetibles y trazables.', ['ENUMERA Soma100 para flujos de colífagos somáticos', 'ENUMERA Coli100 para indicadores bacterianos', 'ENUMERA Entero100 para enterococos', 'Refills y herramientas para operación repetible']),
      section('Conectada a AquaVerify Cloud', 'Resultados, operadores, contexto de muestra e informes pueden vincularse a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Solicitar cotización ENUMERA', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/produits/enumera', 'Kits quantitatifs ENUMERA pour la microbiologie de l’eau', 'ENUMERA est la famille AquaVerify dédiée aux flux de dénombrement en microbiologie de l’eau.', [
      section('Conçu pour compter, pas pour deviner', 'ENUMERA répond aux flux quantitatifs où le laboratoire a besoin de résultats clairs, reproductibles et traçables.', ['ENUMERA Soma100 pour les coliphages somatiques', 'ENUMERA Coli100 pour les indicateurs bactériens', 'ENUMERA Entero100 pour les entérocoques', 'Recharges et outils pour une opération répétable']),
      section('Connecté à AquaVerify Cloud', 'Résultats, opérateurs, contexte d’échantillon et rapports peuvent être reliés à la plateforme numérique.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Demander un devis ENUMERA', secondaryCta: 'Voir les produits' }),
    it: locale('/it/prodotti/enumera', 'Kit quantitativi ENUMERA per microbiologia dell’acqua', 'ENUMERA è la famiglia AquaVerify per flussi di enumerazione nella microbiologia dell’acqua.', [
      section('Creato per contare, non per indovinare', 'ENUMERA è pensato per flussi quantitativi in cui il laboratorio richiede risultati chiari, ripetibili e tracciabili.', ['ENUMERA Soma100 per colifagi somatici', 'ENUMERA Coli100 per indicatori batterici', 'ENUMERA Entero100 per enterococchi', 'Refill e strumenti per operazioni ripetibili']),
      section('Collegato ad AquaVerify Cloud', 'Risultati, operatori, contesto del campione e report possono essere collegati alla piattaforma digitale.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Richiedi preventivo ENUMERA', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/productes/enumera', 'Kits quantitatius ENUMERA per a microbiologia de l’aigua', 'ENUMERA és la família AquaVerify per a fluxos d’enumeració en microbiologia de l’aigua.', [
      section('Dissenyada per comptar, no per endevinar', 'ENUMERA està pensada per a fluxos quantitatius on el laboratori necessita resultats clars, repetibles i traçables.', ['ENUMERA Soma100 per a colífags somàtics', 'ENUMERA Coli100 per a indicadors bacterians', 'ENUMERA Entero100 per a enterococs', 'Refills i eines per a operació repetible']),
      section('Connectada a AquaVerify Cloud', 'Resultats, operadors, context de mostra i informes es poden vincular a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Sol·licitar pressupost ENUMERA', secondaryCta: 'Veure productes' })
  }),
  page('indica', 'products', 'quote', {
    en: locale('/products/indica', 'INDICA presence/absence water testing kits', 'INDICA is designed for fast qualitative water microbiology workflows where the answer must be clear: present or absent.', [
      section('Clear screening workflows', 'INDICA supports rapid decision making for laboratories, field teams and quality control teams.', ['Somatic coliphage presence/absence', 'E. coli presence/absence', 'Enterococci presence/absence', 'Colorimetric matching tools']),
      section('From test to traceable record', 'INDICA workflows can feed AquaVerify Cloud so each result is linked to sample, site, operator and report.')
    ], { eyebrow: 'INDICA', primaryCta: 'Request INDICA quote', secondaryCta: 'Explore platform' }),
    es: locale('/es/productos/indica', 'Kits INDICA de presencia/ausencia para análisis de agua', 'INDICA está diseñada para flujos cualitativos rápidos en microbiología del agua donde la respuesta debe ser clara: presente o ausente.', [
      section('Cribado claro y operativo', 'INDICA ayuda a tomar decisiones rápidas en laboratorios, equipos de campo y control de calidad.', ['Presencia/ausencia de colífagos somáticos', 'Presencia/ausencia de E. coli', 'Presencia/ausencia de enterococos', 'Herramientas de comparación colorimétrica']),
      section('Del test al registro trazable', 'Los flujos INDICA pueden alimentar AquaVerify Cloud para vincular resultado, muestra, punto, operador e informe.')
    ], { eyebrow: 'INDICA', primaryCta: 'Solicitar cotización INDICA', secondaryCta: 'Explorar plataforma' }),
    fr: locale('/fr/produits/indica', 'Kits INDICA présence/absence pour l’analyse de l’eau', 'INDICA est conçu pour les flux qualitatifs rapides en microbiologie de l’eau où la réponse doit être claire: présent ou absent.', [
      section('Des flux de dépistage clairs', 'INDICA aide les laboratoires, équipes terrain et équipes qualité à décider rapidement.', ['Présence/absence de coliphages somatiques', 'Présence/absence d’E. coli', 'Présence/absence d’entérocoques', 'Outils de comparaison colorimétrique']),
      section('Du test au registre traçable', 'Les flux INDICA peuvent alimenter AquaVerify Cloud afin de relier résultat, échantillon, site, opérateur et rapport.')
    ], { eyebrow: 'INDICA', primaryCta: 'Demander un devis INDICA', secondaryCta: 'Explorer la plateforme' }),
    it: locale('/it/prodotti/indica', 'Kit INDICA presenza/assenza per analisi dell’acqua', 'INDICA è progettata per flussi qualitativi rapidi in microbiologia dell’acqua, dove la risposta deve essere chiara: presente o assente.', [
      section('Workflow di screening chiari', 'INDICA supporta decisioni rapide per laboratori, squadre sul campo e controllo qualità.', ['Presenza/assenza di colifagi somatici', 'Presenza/assenza di E. coli', 'Presenza/assenza di enterococchi', 'Strumenti di confronto colorimetrico']),
      section('Dal test al record tracciabile', 'I flussi INDICA possono alimentare AquaVerify Cloud collegando risultato, campione, sito, operatore e report.')
    ], { eyebrow: 'INDICA', primaryCta: 'Richiedi preventivo INDICA', secondaryCta: 'Esplora piattaforma' }),
    ca: locale('/ca/productes/indica', 'Kits INDICA de presència/absència per a anàlisi d’aigua', 'INDICA està dissenyada per a fluxos qualitatius ràpids en microbiologia de l’aigua on la resposta ha de ser clara: present o absent.', [
      section('Cribratge clar i operatiu', 'INDICA ajuda a prendre decisions ràpides en laboratoris, equips de camp i control de qualitat.', ['Presència/absència de colífags somàtics', 'Presència/absència d’E. coli', 'Presència/absència d’enterococs', 'Eines de comparació colorimètrica']),
      section('Del test al registre traçable', 'Els fluxos INDICA poden alimentar AquaVerify Cloud per vincular resultat, mostra, punt, operador i informe.')
    ], { eyebrow: 'INDICA', primaryCta: 'Sol·licitar pressupost INDICA', secondaryCta: 'Explorar plataforma' })
  }),
  page('standard-kits', 'products', 'quote', {
    en: locale('/products/standard-iso-epa-kits', 'Standard ISO and EPA coliphage testing kits', 'AquaVerify standard kits support laboratories working with ISO 10705-2 and EPA coliphage testing workflows.', [
      section('For regulated microbiology workflows', 'The standard kit range is built for teams that need method alignment, repeatability and technical confidence.', ['Somatic coliphage kits for ISO 10705-2 workflows', 'EPA-oriented somatic coliphage workflows', 'F-specific coliphage workflows', 'Support for method validation and training']),
      section('Keep the method, improve the workflow', 'AquaVerify helps laboratories connect technical methods with digital sample and report traceability.')
    ], { eyebrow: 'Standard Kits', primaryCta: 'Request standard kit quote', secondaryCta: 'Read ISO guide' }),
    es: locale('/es/productos/kits-iso-epa', 'Kits estándar ISO y EPA para análisis de colífagos', 'Los kits estándar AquaVerify apoyan a laboratorios que trabajan con flujos ISO 10705-2 y EPA para colífagos.', [
      section('Para flujos de microbiología regulada', 'La gama estándar está pensada para equipos que necesitan alineación metodológica, repetibilidad y confianza técnica.', ['Kits de colífagos somáticos para flujos ISO 10705-2', 'Flujos de colífagos somáticos orientados a EPA', 'Flujos de colífagos F-específicos', 'Soporte para validación y formación']),
      section('Mantener el método, mejorar el flujo', 'AquaVerify ayuda a conectar métodos técnicos con trazabilidad digital de muestra e informe.')
    ], { eyebrow: 'Kits estándar', primaryCta: 'Solicitar cotización', secondaryCta: 'Leer guía ISO' }),
    fr: locale('/fr/produits/kits-iso-epa', 'Kits standard ISO et EPA pour l’analyse des coliphages', 'Les kits standard AquaVerify accompagnent les laboratoires travaillant avec les flux ISO 10705-2 et EPA pour les coliphages.', [
      section('Pour les flux de microbiologie réglementée', 'La gamme standard est pensée pour les équipes qui recherchent alignement méthodologique, répétabilité et confiance technique.', ['Kits coliphages somatiques pour flux ISO 10705-2', 'Flux coliphages somatiques orientés EPA', 'Flux coliphages F-spécifiques', 'Support de validation et formation']),
      section('Garder la méthode, améliorer le flux', 'AquaVerify aide à connecter les méthodes techniques avec la traçabilité numérique des échantillons et rapports.')
    ], { eyebrow: 'Kits standard', primaryCta: 'Demander un devis', secondaryCta: 'Lire le guide ISO' }),
    it: locale('/it/prodotti/kit-iso-epa', 'Kit standard ISO ed EPA per analisi dei colifagi', 'I kit standard AquaVerify supportano i laboratori che lavorano con flussi ISO 10705-2 ed EPA per colifagi.', [
      section('Per flussi di microbiologia regolata', 'La gamma standard è pensata per team che richiedono allineamento metodologico, ripetibilità e fiducia tecnica.', ['Kit colifagi somatici per flussi ISO 10705-2', 'Flussi colifagi somatici orientati EPA', 'Flussi colifagi F-specifici', 'Supporto per validazione e formazione']),
      section('Mantenere il metodo, migliorare il flusso', 'AquaVerify aiuta a collegare metodi tecnici con tracciabilità digitale di campioni e report.')
    ], { eyebrow: 'Kit standard', primaryCta: 'Richiedi preventivo', secondaryCta: 'Leggi guida ISO' }),
    ca: locale('/ca/productes/kits-iso-epa', 'Kits estàndard ISO i EPA per a anàlisi de colífags', 'Els kits estàndard AquaVerify donen suport a laboratoris que treballen amb fluxos ISO 10705-2 i EPA per a colífags.', [
      section('Per a fluxos de microbiologia regulada', 'La gamma estàndard està pensada per a equips que necessiten alineació metodològica, repetibilitat i confiança tècnica.', ['Kits de colífags somàtics per a fluxos ISO 10705-2', 'Fluxos de colífags somàtics orientats a EPA', 'Fluxos de colífags F-específics', 'Suport per a validació i formació']),
      section('Mantenir el mètode, millorar el flux', 'AquaVerify ajuda a connectar mètodes tècnics amb traçabilitat digital de mostra i informe.')
    ], { eyebrow: 'Kits estàndard', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Llegir guia ISO' })
  }),
  page('lab-essentials', 'products', 'quote', {
    en: locale('/products/lab-essentials', 'Lab Essentials for water microbiology laboratories', 'Culture media, reagents, controls and biological materials for daily water microbiology operations.', [
      section('The operational core of the laboratory', 'Lab Essentials supports the daily work behind reliable water microbiology results.', ['Culture media and reagents', 'Positive controls', 'Host strains', 'Prepared and frozen biological materials']),
      section('Designed for repeatability', 'Pair essentials with kits and the digital platform to standardize purchasing, execution and reporting.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Request lab essentials quote', secondaryCta: 'View products' }),
    es: locale('/es/productos/lab-essentials', 'Lab Essentials para laboratorios de microbiología del agua', 'Medios de cultivo, reactivos, controles y materiales biológicos para la operación diaria de microbiología del agua.', [
      section('El corazón operativo del laboratorio', 'Lab Essentials da soporte al trabajo diario que hay detrás de resultados fiables en microbiología del agua.', ['Medios de cultivo y reactivos', 'Controles positivos', 'Cepas huésped', 'Materiales biológicos preparados y congelados']),
      section('Pensado para la repetibilidad', 'Combina essentials con kits y plataforma digital para estandarizar compra, ejecución e informes.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Solicitar cotización', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/produits/lab-essentials', 'Lab Essentials pour laboratoires de microbiologie de l’eau', 'Milieux de culture, réactifs, contrôles et matériaux biologiques pour les opérations quotidiennes de microbiologie de l’eau.', [
      section('Le cœur opérationnel du laboratoire', 'Lab Essentials soutient le travail quotidien nécessaire à des résultats fiables en microbiologie de l’eau.', ['Milieux de culture et réactifs', 'Contrôles positifs', 'Souches hôtes', 'Matériaux biologiques préparés et congelés']),
      section('Pensé pour la répétabilité', 'Associez essentiels, kits et plateforme numérique pour standardiser achat, exécution et rapports.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Demander un devis', secondaryCta: 'Voir les produits' }),
    it: locale('/it/prodotti/lab-essentials', 'Lab Essentials per laboratori di microbiologia dell’acqua', 'Terreni di coltura, reagenti, controlli e materiali biologici per le operazioni quotidiane di microbiologia dell’acqua.', [
      section('Il cuore operativo del laboratorio', 'Lab Essentials supporta il lavoro quotidiano dietro risultati affidabili in microbiologia dell’acqua.', ['Terreni di coltura e reagenti', 'Controlli positivi', 'Ceppi ospiti', 'Materiali biologici preparati e congelati']),
      section('Pensato per la ripetibilità', 'Abbina essentials, kit e piattaforma digitale per standardizzare acquisti, esecuzione e report.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Richiedi preventivo', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/productes/lab-essentials', 'Lab Essentials per a laboratoris de microbiologia de l’aigua', 'Medis de cultiu, reactius, controls i materials biològics per a l’operació diària de microbiologia de l’aigua.', [
      section('El cor operatiu del laboratori', 'Lab Essentials dona suport al treball diari que hi ha darrere de resultats fiables en microbiologia de l’aigua.', ['Medis de cultiu i reactius', 'Controls positius', 'Soques hoste', 'Materials biològics preparats i congelats']),
      section('Pensat per a la repetibilitat', 'Combina essentials amb kits i plataforma digital per estandarditzar compra, execució i informes.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Veure productes' })
  }),
  page('platform', 'platform', 'demo', {
    en: locale('/platform', 'AquaVerify Cloud for traceable water analysis workflows', 'Connect samples, products, operators, reports and customer workflows in one digital platform.', [
      section('From product use to digital record', 'AquaVerify Cloud turns laboratory and field activity into structured, traceable operational data.', ['Sample traceability', 'Digital reports', 'CRM and customer portal', 'Inventory and work management']),
      section('Built around real operations', 'The platform supports laboratories, distributors and companies that need quality workflows beyond spreadsheets.')
    ], { eyebrow: 'Platform', primaryCta: 'Request platform demo', secondaryCta: 'See SaaS option' }),
    es: locale('/es/plataforma', 'AquaVerify Cloud para flujos trazables de análisis de agua', 'Conecta muestras, productos, operadores, informes y flujos de cliente en una sola plataforma digital.', [
      section('Del uso del producto al registro digital', 'AquaVerify Cloud convierte actividad de laboratorio y campo en datos operativos estructurados y trazables.', ['Trazabilidad de muestras', 'Informes digitales', 'CRM y portal cliente', 'Inventario y gestión del trabajo']),
      section('Construida alrededor de la operación real', 'La plataforma da soporte a laboratorios, distribuidores y empresas que necesitan flujos de calidad más allá de hojas de cálculo.')
    ], { eyebrow: 'Plataforma', primaryCta: 'Solicitar demo plataforma', secondaryCta: 'Ver opción SaaS' }),
    fr: locale('/fr/plateforme', 'AquaVerify Cloud pour des flux d’analyse de l’eau traçables', 'Connectez échantillons, produits, opérateurs, rapports et flux client dans une seule plateforme numérique.', [
      section('De l’utilisation du produit au registre numérique', 'AquaVerify Cloud transforme l’activité laboratoire et terrain en données opérationnelles structurées et traçables.', ['Traçabilité des échantillons', 'Rapports numériques', 'CRM et portail client', 'Inventaire et gestion du travail']),
      section('Construite autour des opérations réelles', 'La plateforme soutient laboratoires, distributeurs et entreprises qui ont besoin de flux qualité au-delà des tableurs.')
    ], { eyebrow: 'Plateforme', primaryCta: 'Demander une démo', secondaryCta: 'Voir l’option SaaS' }),
    it: locale('/it/piattaforma', 'AquaVerify Cloud per flussi tracciabili di analisi dell’acqua', 'Collega campioni, prodotti, operatori, report e flussi cliente in un’unica piattaforma digitale.', [
      section('Dall’uso del prodotto al record digitale', 'AquaVerify Cloud trasforma attività di laboratorio e campo in dati operativi strutturati e tracciabili.', ['Tracciabilità dei campioni', 'Report digitali', 'CRM e portale cliente', 'Inventario e gestione lavoro']),
      section('Costruita sulle operazioni reali', 'La piattaforma supporta laboratori, distributori e aziende che richiedono flussi qualità oltre i fogli di calcolo.')
    ], { eyebrow: 'Piattaforma', primaryCta: 'Richiedi demo piattaforma', secondaryCta: 'Vedi opzione SaaS' }),
    ca: locale('/ca/plataforma', 'AquaVerify Cloud per a fluxos traçables d’anàlisi d’aigua', 'Connecta mostres, productes, operadors, informes i fluxos de client en una sola plataforma digital.', [
      section('De l’ús del producte al registre digital', 'AquaVerify Cloud converteix activitat de laboratori i camp en dades operatives estructurades i traçables.', ['Traçabilitat de mostres', 'Informes digitals', 'CRM i portal client', 'Inventari i gestió del treball']),
      section('Construïda al voltant de l’operació real', 'La plataforma dona suport a laboratoris, distribuïdors i empreses que necessiten fluxos de qualitat més enllà dels fulls de càlcul.')
    ], { eyebrow: 'Plataforma', primaryCta: 'Sol·licitar demo plataforma', secondaryCta: 'Veure opció SaaS' })
  }),
  page('saas-biotech', 'platform', 'saas', {
    en: locale('/saas/biotech-lims-platform', 'All-in-one SaaS platform for biotech and laboratory operations', 'AquaVerify Cloud is also available as SaaS for biotech companies that need CRM, LIMS, work, inventory, reporting and customer portals.', [
      section('One operational backbone', 'Replace fragmented tools with one platform for scientific and operational work.', ['CRM and sales workflows', 'LIMS and sample traceability', 'Work management and documents', 'Inventory, WMS, finance and reporting']),
      section('For teams that need control', 'Designed for growing biotech and laboratory organizations that need execution, traceability and commercial visibility.')
    ], { eyebrow: 'SaaS', primaryCta: 'Request SaaS demo', secondaryCta: 'Explore platform' }),
    es: locale('/es/saas/plataforma-lims-biotech', 'Plataforma SaaS todo en uno para biotech y laboratorios', 'AquaVerify Cloud también está disponible como SaaS para empresas biotech que necesitan CRM, LIMS, work, inventario, reporting y portal cliente.', [
      section('Una columna vertebral operativa', 'Sustituye herramientas fragmentadas por una plataforma para trabajo científico y operativo.', ['CRM y flujos comerciales', 'LIMS y trazabilidad de muestras', 'Gestión del trabajo y documentos', 'Inventario, WMS, finanzas y reporting']),
      section('Para equipos que necesitan control', 'Diseñada para organizaciones biotech y laboratorios en crecimiento que necesitan ejecución, trazabilidad y visibilidad comercial.')
    ], { eyebrow: 'SaaS', primaryCta: 'Solicitar demo SaaS', secondaryCta: 'Explorar plataforma' }),
    fr: locale('/fr/saas/plateforme-lims-biotech', 'Plateforme SaaS tout-en-un pour biotech et laboratoires', 'AquaVerify Cloud est aussi disponible en SaaS pour les entreprises biotech ayant besoin de CRM, LIMS, work, inventaire, reporting et portail client.', [
      section('Une colonne vertébrale opérationnelle', 'Remplacez les outils fragmentés par une plateforme pour le travail scientifique et opérationnel.', ['CRM et flux commerciaux', 'LIMS et traçabilité des échantillons', 'Gestion du travail et documents', 'Inventaire, WMS, finance et reporting']),
      section('Pour les équipes qui veulent le contrôle', 'Conçue pour les organisations biotech et laboratoires en croissance qui ont besoin d’exécution, traçabilité et visibilité commerciale.')
    ], { eyebrow: 'SaaS', primaryCta: 'Demander une démo SaaS', secondaryCta: 'Explorer la plateforme' }),
    it: locale('/it/saas/piattaforma-lims-biotech', 'Piattaforma SaaS all-in-one per biotech e laboratori', 'AquaVerify Cloud è disponibile anche come SaaS per aziende biotech che richiedono CRM, LIMS, work, inventario, reporting e portale clienti.', [
      section('Una dorsale operativa', 'Sostituisci strumenti frammentati con una piattaforma per lavoro scientifico e operativo.', ['CRM e flussi commerciali', 'LIMS e tracciabilità campioni', 'Gestione lavoro e documenti', 'Inventario, WMS, finanza e reporting']),
      section('Per team che vogliono controllo', 'Pensata per organizzazioni biotech e laboratori in crescita che richiedono esecuzione, tracciabilità e visibilità commerciale.')
    ], { eyebrow: 'SaaS', primaryCta: 'Richiedi demo SaaS', secondaryCta: 'Esplora piattaforma' }),
    ca: locale('/ca/saas/plataforma-lims-biotech', 'Plataforma SaaS tot en un per a biotech i laboratoris', 'AquaVerify Cloud també està disponible com a SaaS per a empreses biotech que necessiten CRM, LIMS, work, inventari, reporting i portal client.', [
      section('Una columna vertebral operativa', 'Substitueix eines fragmentades per una plataforma per al treball científic i operatiu.', ['CRM i fluxos comercials', 'LIMS i traçabilitat de mostres', 'Gestió del treball i documents', 'Inventari, WMS, finances i reporting']),
      section('Per a equips que necessiten control', 'Dissenyada per a organitzacions biotech i laboratoris en creixement que necessiten execució, traçabilitat i visibilitat comercial.')
    ], { eyebrow: 'SaaS', primaryCta: 'Sol·licitar demo SaaS', secondaryCta: 'Explorar plataforma' })
  }),
  page('oem', 'partners', 'oem', {
    en: locale('/oem-water-testing-kits', 'OEM and distributor program for water testing kits', 'Bring AquaVerify water microbiology products and digital workflows to your market under AquaVerify or white-label models.', [
      section('Two commercial models', 'Distributors can sell AquaVerify-branded products or develop OEM/private-label programs with platform support.', ['AquaVerify branded distribution', 'OEM and white-label packaging', 'Digital platform for customer workflows', 'Technical onboarding and training']),
      section('Recurring value beyond the box', 'Consumables, support and software access create a stronger relationship than a one-off product sale.')
    ], { eyebrow: 'OEM & Distributors', primaryCta: 'Become a partner', secondaryCta: 'Request OEM call' }),
    es: locale('/es/oem-kits-analisis-agua', 'Programa OEM y distribuidores para kits de análisis de agua', 'Lleva productos AquaVerify de microbiología del agua y flujos digitales a tu mercado bajo marca AquaVerify o marca blanca.', [
      section('Dos modelos comerciales', 'Los distribuidores pueden vender productos AquaVerify o desarrollar programas OEM/marca blanca con soporte de plataforma.', ['Distribución bajo marca AquaVerify', 'Packaging OEM y marca blanca', 'Plataforma digital para flujos de cliente', 'Onboarding técnico y formación']),
      section('Valor recurrente más allá de la caja', 'Consumibles, soporte y acceso software crean una relación más fuerte que una venta puntual.')
    ], { eyebrow: 'OEM y distribuidores', primaryCta: 'Convertirse en partner', secondaryCta: 'Solicitar llamada OEM' }),
    fr: locale('/fr/oem-kits-analyse-eau', 'Programme OEM et distributeurs pour kits d’analyse de l’eau', 'Apportez les produits AquaVerify de microbiologie de l’eau et les flux numériques à votre marché sous marque AquaVerify ou marque blanche.', [
      section('Deux modèles commerciaux', 'Les distributeurs peuvent vendre des produits AquaVerify ou développer des programmes OEM/marque blanche avec support plateforme.', ['Distribution sous marque AquaVerify', 'Packaging OEM et marque blanche', 'Plateforme numérique pour les flux client', 'Onboarding technique et formation']),
      section('Valeur récurrente au-delà de la boîte', 'Consommables, support et accès logiciel créent une relation plus forte qu’une vente ponctuelle.')
    ], { eyebrow: 'OEM et distributeurs', primaryCta: 'Devenir partenaire', secondaryCta: 'Demander un appel OEM' }),
    it: locale('/it/oem-kit-analisi-acqua', 'Programma OEM e distributori per kit di analisi dell’acqua', 'Porta i prodotti AquaVerify di microbiologia dell’acqua e i flussi digitali nel tuo mercato con brand AquaVerify o private label.', [
      section('Due modelli commerciali', 'I distributori possono vendere prodotti AquaVerify o sviluppare programmi OEM/private label con supporto piattaforma.', ['Distribuzione con brand AquaVerify', 'Packaging OEM e private label', 'Piattaforma digitale per flussi cliente', 'Onboarding tecnico e formazione']),
      section('Valore ricorrente oltre la scatola', 'Consumabili, supporto e accesso software creano una relazione più forte di una vendita singola.')
    ], { eyebrow: 'OEM e distributori', primaryCta: 'Diventa partner', secondaryCta: 'Richiedi call OEM' }),
    ca: locale('/ca/oem-kits-analisi-aigua', 'Programa OEM i distribuïdors per a kits d’anàlisi d’aigua', 'Porta productes AquaVerify de microbiologia de l’aigua i fluxos digitals al teu mercat sota marca AquaVerify o marca blanca.', [
      section('Dos models comercials', 'Els distribuïdors poden vendre productes AquaVerify o desenvolupar programes OEM/marca blanca amb suport de plataforma.', ['Distribució sota marca AquaVerify', 'Packaging OEM i marca blanca', 'Plataforma digital per a fluxos de client', 'Onboarding tècnic i formació']),
      section('Valor recurrent més enllà de la caixa', 'Consumibles, suport i accés software creen una relació més forta que una venda puntual.')
    ], { eyebrow: 'OEM i distribuïdors', primaryCta: 'Convertir-se en partner', secondaryCta: 'Sol·licitar trucada OEM' })
  }),
  page('distributors', 'partners', 'distributor', {
    en: locale('/distributors', 'AquaVerify distributors and local partners', 'Find or become an AquaVerify partner for local supply, support, training and OEM opportunities.', [
      section('Local access, global standard', 'AquaVerify works with partners who can support laboratories and water quality teams locally.', ['Distribution opportunities', 'Local technical support', 'Training and onboarding', 'OEM and white-label options']),
      section('No partner in your country?', 'AquaVerify can evaluate direct supply, new distributor opportunities or OEM collaboration.')
    ], { eyebrow: 'Distributors', primaryCta: 'Become a distributor', secondaryCta: 'Request local contact' }),
    es: locale('/es/distribuidores', 'Distribuidores y partners locales AquaVerify', 'Encuentra o conviértete en partner AquaVerify para suministro local, soporte, formación y oportunidades OEM.', [
      section('Acceso local, estándar global', 'AquaVerify trabaja con partners capaces de dar soporte local a laboratorios y equipos de calidad del agua.', ['Oportunidades de distribución', 'Soporte técnico local', 'Formación y onboarding', 'Opciones OEM y marca blanca']),
      section('¿No hay partner en tu país?', 'AquaVerify puede evaluar suministro directo, nuevos distribuidores u oportunidades OEM.')
    ], { eyebrow: 'Distribuidores', primaryCta: 'Ser distribuidor', secondaryCta: 'Pedir contacto local' }),
    fr: locale('/fr/distributeurs', 'Distributeurs et partenaires locaux AquaVerify', 'Trouvez ou devenez partenaire AquaVerify pour l’approvisionnement local, le support, la formation et les opportunités OEM.', [
      section('Accès local, standard global', 'AquaVerify travaille avec des partenaires capables de soutenir localement laboratoires et équipes qualité eau.', ['Opportunités de distribution', 'Support technique local', 'Formation et onboarding', 'Options OEM et marque blanche']),
      section('Pas de partenaire dans votre pays?', 'AquaVerify peut évaluer l’approvisionnement direct, de nouveaux distributeurs ou une collaboration OEM.')
    ], { eyebrow: 'Distributeurs', primaryCta: 'Devenir distributeur', secondaryCta: 'Demander un contact local' }),
    it: locale('/it/distributori', 'Distributori e partner locali AquaVerify', 'Trova o diventa partner AquaVerify per fornitura locale, supporto, formazione e opportunità OEM.', [
      section('Accesso locale, standard globale', 'AquaVerify lavora con partner capaci di supportare localmente laboratori e team qualità acqua.', ['Opportunità di distribuzione', 'Supporto tecnico locale', 'Formazione e onboarding', 'Opzioni OEM e private label']),
      section('Nessun partner nel tuo paese?', 'AquaVerify può valutare fornitura diretta, nuovi distributori o collaborazione OEM.')
    ], { eyebrow: 'Distributori', primaryCta: 'Diventa distributore', secondaryCta: 'Richiedi contatto locale' }),
    ca: locale('/ca/distribuidors', 'Distribuïdors i partners locals AquaVerify', 'Troba o converteix-te en partner AquaVerify per a subministrament local, suport, formació i oportunitats OEM.', [
      section('Accés local, estàndard global', 'AquaVerify treballa amb partners capaços de donar suport local a laboratoris i equips de qualitat de l’aigua.', ['Oportunitats de distribució', 'Suport tècnic local', 'Formació i onboarding', 'Opcions OEM i marca blanca']),
      section('No hi ha partner al teu país?', 'AquaVerify pot avaluar subministrament directe, nous distribuïdors o oportunitats OEM.')
    ], { eyebrow: 'Distribuïdors', primaryCta: 'Ser distribuïdor', secondaryCta: 'Demanar contacte local' })
  }),
  page('water-testing-labs', 'industries', 'quote', {
    en: locale('/industries/water-testing-laboratories', 'Solutions for public and private water testing laboratories', 'Products and digital workflows for laboratories that need reliable water microbiology testing and traceable reporting.', [
      section('For lab throughput and confidence', 'AquaVerify supports sample intake, microbiology execution, reporting and client communication.', ['Kits and lab essentials', 'Traceable sample workflows', 'Digital certificates', 'Customer portal and CRM'])
    ], { eyebrow: 'Laboratories', primaryCta: 'Talk to a lab specialist', secondaryCta: 'View products' }),
    es: locale('/es/industrias/laboratorios-analisis-agua', 'Soluciones para laboratorios públicos y privados de análisis de agua', 'Productos y flujos digitales para laboratorios que necesitan microbiología del agua fiable e informes trazables.', [
      section('Para capacidad y confianza de laboratorio', 'AquaVerify da soporte a entrada de muestras, ejecución microbiológica, reporting y comunicación con clientes.', ['Kits y lab essentials', 'Flujos trazables de muestra', 'Certificados digitales', 'Portal cliente y CRM'])
    ], { eyebrow: 'Laboratorios', primaryCta: 'Hablar con especialista', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/industries/laboratoires-analyse-eau', 'Solutions pour laboratoires publics et privés d’analyse de l’eau', 'Produits et flux numériques pour les laboratoires ayant besoin de microbiologie de l’eau fiable et de rapports traçables.', [
      section('Pour débit et confiance laboratoire', 'AquaVerify soutient l’entrée d’échantillons, l’exécution microbiologique, les rapports et la communication client.', ['Kits et lab essentials', 'Flux échantillon traçables', 'Certificats numériques', 'Portail client et CRM'])
    ], { eyebrow: 'Laboratoires', primaryCta: 'Parler à un spécialiste', secondaryCta: 'Voir les produits' }),
    it: locale('/it/settori/laboratori-analisi-acqua', 'Soluzioni per laboratori pubblici e privati di analisi dell’acqua', 'Prodotti e flussi digitali per laboratori che richiedono microbiologia dell’acqua affidabile e report tracciabili.', [
      section('Per capacità e fiducia del laboratorio', 'AquaVerify supporta ingresso campioni, esecuzione microbiologica, reporting e comunicazione cliente.', ['Kit e lab essentials', 'Flussi campione tracciabili', 'Certificati digitali', 'Portale cliente e CRM'])
    ], { eyebrow: 'Laboratori', primaryCta: 'Parla con uno specialista', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/sectors/laboratoris-analisi-aigua', 'Solucions per a laboratoris públics i privats d’anàlisi d’aigua', 'Productes i fluxos digitals per a laboratoris que necessiten microbiologia de l’aigua fiable i informes traçables.', [
      section('Per a capacitat i confiança de laboratori', 'AquaVerify dona suport a entrada de mostres, execució microbiològica, reporting i comunicació amb clients.', ['Kits i lab essentials', 'Fluxos traçables de mostra', 'Certificats digitals', 'Portal client i CRM'])
    ], { eyebrow: 'Laboratoris', primaryCta: 'Parlar amb especialista', secondaryCta: 'Veure productes' })
  }),
  page('water-quality-control', 'industries', 'contact', {
    en: locale('/industries/water-quality-control', 'Water quality control for companies and facilities', 'AquaVerify helps companies monitor water quality with products, laboratory partners and digital reporting workflows.', [
      section('For operational quality teams', 'Use AquaVerify to structure water testing requests, reports and recurring monitoring.', ['Food and beverage water quality', 'Facilities and building risk control', 'Industrial process water', 'Supplier and lab coordination'])
    ], { eyebrow: 'Water quality control', primaryCta: 'Ask for solution fit', secondaryCta: 'Find products' }),
    es: locale('/es/industrias/control-calidad-agua', 'Control de calidad del agua para empresas e instalaciones', 'AquaVerify ayuda a empresas a monitorizar calidad del agua con productos, partners de laboratorio y reporting digital.', [
      section('Para equipos de calidad operativa', 'Usa AquaVerify para estructurar solicitudes de análisis, informes y monitorización recurrente.', ['Calidad del agua en food & beverage', 'Control de riesgo en instalaciones', 'Agua de proceso industrial', 'Coordinación con proveedores y laboratorios'])
    ], { eyebrow: 'Control de calidad del agua', primaryCta: 'Pedir recomendación', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/industries/controle-qualite-eau', 'Contrôle qualité de l’eau pour entreprises et sites', 'AquaVerify aide les entreprises à suivre la qualité de l’eau avec produits, partenaires laboratoire et rapports numériques.', [
      section('Pour les équipes qualité opérationnelle', 'Utilisez AquaVerify pour structurer demandes d’analyse, rapports et surveillance récurrente.', ['Qualité eau food & beverage', 'Contrôle risque bâtiments', 'Eau de process industriel', 'Coordination fournisseurs et laboratoires'])
    ], { eyebrow: 'Contrôle qualité eau', primaryCta: 'Demander une recommandation', secondaryCta: 'Voir les produits' }),
    it: locale('/it/settori/controllo-qualita-acqua', 'Controllo qualità dell’acqua per aziende e strutture', 'AquaVerify aiuta le aziende a monitorare la qualità dell’acqua con prodotti, partner di laboratorio e reporting digitale.', [
      section('Per team qualità operativa', 'Usa AquaVerify per strutturare richieste analisi, report e monitoraggio ricorrente.', ['Qualità acqua food & beverage', 'Controllo rischio strutture', 'Acqua di processo industriale', 'Coordinamento fornitori e laboratori'])
    ], { eyebrow: 'Controllo qualità acqua', primaryCta: 'Chiedi raccomandazione', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/sectors/control-qualitat-aigua', 'Control de qualitat de l’aigua per a empreses i instal·lacions', 'AquaVerify ajuda empreses a monitorar qualitat de l’aigua amb productes, partners de laboratori i reporting digital.', [
      section('Per a equips de qualitat operativa', 'Fes servir AquaVerify per estructurar sol·licituds d’anàlisi, informes i monitoratge recurrent.', ['Qualitat de l’aigua en food & beverage', 'Control de risc en instal·lacions', 'Aigua de procés industrial', 'Coordinació amb proveïdors i laboratoris'])
    ], { eyebrow: 'Control de qualitat de l’aigua', primaryCta: 'Demanar recomanació', secondaryCta: 'Veure productes' })
  }),
  page('iso-10705-2', 'resources', 'quote', {
    en: locale('/resources/iso-10705-2-somatic-coliphages', 'ISO 10705-2 and somatic coliphage testing', 'A practical resource for teams evaluating somatic coliphage workflows in water microbiology.', [
      section('Why it matters', 'Somatic coliphages are important viral indicators for water quality because they can be more resistant to disinfection than common bacterial indicators.'),
      section('How AquaVerify fits', 'AquaVerify supports laboratories with kits, controls, essentials and digital traceability around coliphage workflows.')
    ], { eyebrow: 'Resource', primaryCta: 'Discuss ISO workflow', secondaryCta: 'View standard kits' }),
    es: locale('/es/recursos/iso-10705-2-colifagos-somaticos', 'ISO 10705-2 y análisis de colífagos somáticos', 'Recurso práctico para equipos que evalúan flujos de colífagos somáticos en microbiología del agua.', [
      section('Por qué importa', 'Los colífagos somáticos son indicadores virales importantes en calidad del agua porque pueden resistir desinfección mejor que indicadores bacterianos habituales.'),
      section('Cómo encaja AquaVerify', 'AquaVerify apoya a laboratorios con kits, controles, essentials y trazabilidad digital alrededor de flujos de colífagos.')
    ], { eyebrow: 'Recurso', primaryCta: 'Hablar de flujo ISO', secondaryCta: 'Ver kits estándar' }),
    fr: locale('/fr/ressources/iso-10705-2-coliphages-somatiques', 'ISO 10705-2 et analyse des coliphages somatiques', 'Ressource pratique pour les équipes évaluant les flux coliphages somatiques en microbiologie de l’eau.', [
      section('Pourquoi c’est important', 'Les coliphages somatiques sont des indicateurs viraux importants de qualité de l’eau car ils peuvent résister à la désinfection plus que des indicateurs bactériens courants.'),
      section('Comment AquaVerify s’intègre', 'AquaVerify accompagne les laboratoires avec kits, contrôles, essentials et traçabilité numérique autour des flux coliphages.')
    ], { eyebrow: 'Ressource', primaryCta: 'Discuter du flux ISO', secondaryCta: 'Voir les kits standard' }),
    it: locale('/it/risorse/iso-10705-2-colifagi-somatici', 'ISO 10705-2 e analisi dei colifagi somatici', 'Risorsa pratica per team che valutano flussi di colifagi somatici nella microbiologia dell’acqua.', [
      section('Perché conta', 'I colifagi somatici sono indicatori virali importanti per la qualità dell’acqua perché possono resistere alla disinfezione più di comuni indicatori batterici.'),
      section('Come si inserisce AquaVerify', 'AquaVerify supporta i laboratori con kit, controlli, essentials e tracciabilità digitale intorno ai flussi colifagi.')
    ], { eyebrow: 'Risorsa', primaryCta: 'Discuti flusso ISO', secondaryCta: 'Vedi kit standard' }),
    ca: locale('/ca/recursos/iso-10705-2-colifags-somatics', 'ISO 10705-2 i anàlisi de colífags somàtics', 'Recurs pràctic per a equips que avaluen fluxos de colífags somàtics en microbiologia de l’aigua.', [
      section('Per què importa', 'Els colífags somàtics són indicadors virals importants en qualitat de l’aigua perquè poden resistir la desinfecció millor que indicadors bacterians habituals.'),
      section('Com encaixa AquaVerify', 'AquaVerify dona suport a laboratoris amb kits, controls, essentials i traçabilitat digital al voltant de fluxos de colífags.')
    ], { eyebrow: 'Recurs', primaryCta: 'Parlar de flux ISO', secondaryCta: 'Veure kits estàndard' })
  }),
  page('epa-1602', 'resources', 'quote', {
    en: locale('/resources/epa-1602-coliphage-testing', 'EPA 1602 coliphage testing workflows', 'Understand how EPA-oriented coliphage workflows can be supported with products, controls and traceability.', [
      section('For laboratories working with EPA methods', 'AquaVerify helps organize products, consumables and data around EPA-oriented coliphage testing.')
    ], { eyebrow: 'Resource', primaryCta: 'Discuss EPA workflow', secondaryCta: 'View products' }),
    es: locale('/es/recursos/epa-1602-colifagos', 'Flujos EPA 1602 para análisis de colífagos', 'Entiende cómo los flujos orientados a EPA pueden apoyarse con productos, controles y trazabilidad.', [
      section('Para laboratorios que trabajan con métodos EPA', 'AquaVerify ayuda a organizar productos, consumibles y datos alrededor del análisis de colífagos orientado a EPA.')
    ], { eyebrow: 'Recurso', primaryCta: 'Hablar de flujo EPA', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/ressources/epa-1602-coliphages', 'Flux EPA 1602 pour l’analyse des coliphages', 'Comprendre comment les flux orientés EPA peuvent être soutenus par produits, contrôles et traçabilité.', [
      section('Pour les laboratoires travaillant avec méthodes EPA', 'AquaVerify aide à organiser produits, consommables et données autour de l’analyse des coliphages orientée EPA.')
    ], { eyebrow: 'Ressource', primaryCta: 'Discuter du flux EPA', secondaryCta: 'Voir les produits' }),
    it: locale('/it/risorse/epa-1602-colifagi', 'Flussi EPA 1602 per analisi dei colifagi', 'Comprendi come flussi orientati EPA possono essere supportati da prodotti, controlli e tracciabilità.', [
      section('Per laboratori che lavorano con metodi EPA', 'AquaVerify aiuta a organizzare prodotti, consumabili e dati intorno all’analisi dei colifagi orientata EPA.')
    ], { eyebrow: 'Risorsa', primaryCta: 'Discuti flusso EPA', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/recursos/epa-1602-colifags', 'Fluxos EPA 1602 per a anàlisi de colífags', 'Entén com els fluxos orientats a EPA poden recolzar-se amb productes, controls i traçabilitat.', [
      section('Per a laboratoris que treballen amb mètodes EPA', 'AquaVerify ajuda a organitzar productes, consumibles i dades al voltant de l’anàlisi de colífags orientada a EPA.')
    ], { eyebrow: 'Recurs', primaryCta: 'Parlar de flux EPA', secondaryCta: 'Veure productes' })
  }),
  page('coliphages-indicators', 'resources', 'quote', {
    en: locale('/resources/coliphages-water-quality-indicators', 'Coliphages as viral indicators for water quality', 'A practical introduction to why coliphages matter in modern water quality monitoring.', [
      section('A stronger indicator story', 'Coliphages can provide useful viral-indicator information in addition to traditional bacterial indicators.'),
      section('From scientific need to operational workflow', 'AquaVerify connects indicator testing products with digital reporting and traceability.')
    ], { eyebrow: 'Resource', primaryCta: 'Ask about coliphage products', secondaryCta: 'View ENUMERA' }),
    es: locale('/es/recursos/colifagos-indicadores-calidad-agua', 'Colífagos como indicadores virales de calidad del agua', 'Introducción práctica a por qué los colífagos importan en la monitorización moderna de calidad del agua.', [
      section('Una historia de indicador más fuerte', 'Los colífagos pueden aportar información útil como indicadores virales además de los indicadores bacterianos tradicionales.'),
      section('De la necesidad científica al flujo operativo', 'AquaVerify conecta productos de análisis de indicadores con reporting digital y trazabilidad.')
    ], { eyebrow: 'Recurso', primaryCta: 'Preguntar por productos colífagos', secondaryCta: 'Ver ENUMERA' }),
    fr: locale('/fr/ressources/coliphages-indicateurs-qualite-eau', 'Coliphages comme indicateurs viraux de qualité de l’eau', 'Introduction pratique à l’importance des coliphages dans la surveillance moderne de la qualité de l’eau.', [
      section('Une histoire d’indicateur plus forte', 'Les coliphages peuvent apporter une information utile d’indicateur viral en plus des indicateurs bactériens traditionnels.'),
      section('Du besoin scientifique au flux opérationnel', 'AquaVerify connecte produits d’analyse d’indicateurs, reporting numérique et traçabilité.')
    ], { eyebrow: 'Ressource', primaryCta: 'Demander produits coliphages', secondaryCta: 'Voir ENUMERA' }),
    it: locale('/it/risorse/colifagi-indicatori-qualita-acqua', 'Colifagi come indicatori virali di qualità dell’acqua', 'Introduzione pratica al perché i colifagi contano nel monitoraggio moderno della qualità dell’acqua.', [
      section('Una storia di indicatore più forte', 'I colifagi possono fornire informazioni utili come indicatori virali oltre agli indicatori batterici tradizionali.'),
      section('Dal bisogno scientifico al flusso operativo', 'AquaVerify collega prodotti di analisi indicatori con reporting digitale e tracciabilità.')
    ], { eyebrow: 'Risorsa', primaryCta: 'Chiedi prodotti colifagi', secondaryCta: 'Vedi ENUMERA' }),
    ca: locale('/ca/recursos/colifags-indicadors-qualitat-aigua', 'Colífags com a indicadors virals de qualitat de l’aigua', 'Introducció pràctica a per què els colífags importen en el monitoratge modern de qualitat de l’aigua.', [
      section('Una història d’indicador més forta', 'Els colífags poden aportar informació útil com a indicadors virals a més dels indicadors bacterians tradicionals.'),
      section('De la necessitat científica al flux operatiu', 'AquaVerify connecta productes d’anàlisi d’indicadors amb reporting digital i traçabilitat.')
    ], { eyebrow: 'Recurs', primaryCta: 'Preguntar per productes colífags', secondaryCta: 'Veure ENUMERA' })
  }),
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
      section('Route your request to the right team', 'Use the contact flow so Sales can qualify your need and link the request to CRM.', ['Product quote', 'OEM or distributor opportunity', 'SaaS demo', 'Technical discussion'])
    ], { eyebrow: 'Contact', primaryCta: 'Start contact request', secondaryCta: 'Request demo' }),
    es: locale('/es/contacto', 'Contactar con AquaVerify', 'Habla con AquaVerify sobre productos, OEM, distribución, SaaS o flujos de calidad del agua.', [
      section('Dirige tu solicitud al equipo correcto', 'Usa el flujo de contacto para que Sales pueda cualificar la necesidad y vincular la solicitud al CRM.', ['Cotización de producto', 'Oportunidad OEM o distribuidor', 'Demo SaaS', 'Conversación técnica'])
    ], { eyebrow: 'Contacto', primaryCta: 'Iniciar contacto', secondaryCta: 'Solicitar demo' }),
    fr: locale('/fr/contact', 'Contacter AquaVerify', 'Échangez avec AquaVerify sur les produits, l’OEM, la distribution, le SaaS ou les flux qualité eau.', [
      section('Diriger la demande vers la bonne équipe', 'Utilisez le flux de contact pour que Sales qualifie le besoin et relie la demande au CRM.', ['Devis produit', 'Opportunité OEM ou distributeur', 'Démo SaaS', 'Discussion technique'])
    ], { eyebrow: 'Contact', primaryCta: 'Démarrer la demande', secondaryCta: 'Demander une démo' }),
    it: locale('/it/contatto', 'Contatta AquaVerify', 'Parla con AquaVerify di prodotti, OEM, distribuzione, SaaS o flussi qualità acqua.', [
      section('Indirizza la richiesta al team giusto', 'Usa il flusso di contatto affinché Sales qualifichi l’esigenza e colleghi la richiesta al CRM.', ['Preventivo prodotto', 'Opportunità OEM o distributore', 'Demo SaaS', 'Discussione tecnica'])
    ], { eyebrow: 'Contatto', primaryCta: 'Avvia richiesta', secondaryCta: 'Richiedi demo' }),
    ca: locale('/ca/contacte', 'Contactar amb AquaVerify', 'Parla amb AquaVerify sobre productes, OEM, distribució, SaaS o fluxos de qualitat de l’aigua.', [
      section('Dirigeix la sol·licitud a l’equip correcte', 'Fes servir el flux de contacte perquè Sales pugui qualificar la necessitat i vincular la sol·licitud al CRM.', ['Pressupost de producte', 'Oportunitat OEM o distribuïdor', 'Demo SaaS', 'Conversa tècnica'])
    ], { eyebrow: 'Contacte', primaryCta: 'Iniciar contacte', secondaryCta: 'Sol·licitar demo' })
  })
];

const PRODUCT_LANGUAGE_BASE = {
  en: '/products',
  es: '/es/productos',
  fr: '/fr/produits',
  it: '/it/prodotti',
  ca: '/ca/productes'
};

const PRODUCT_UI = {
  en: {
    productRole: 'Product role',
    technicalFit: 'Technical fit',
    connectedWorkflow: 'Connected workflow',
    format: 'Format',
    family: 'Family',
    subFamily: 'Sub-family',
    parameter: 'Target parameter',
    method: 'Method / workflow',
    volume: 'Sample volume',
    cta: 'Request quote',
    secondary: 'View family',
    workflowBullets: ['Sample context', 'Operator traceability', 'Result capture', 'Digital reporting'],
    bridge: 'Connect this product to AquaVerify Cloud to keep sample context, operator, result and report traceable from the first interaction.',
    disclaimer: 'Method references should be read as workflow alignment unless a final regulatory claim is approved for the specific market.'
  },
  es: {
    productRole: 'Función del producto',
    technicalFit: 'Encaje técnico',
    connectedWorkflow: 'Flujo conectado',
    format: 'Formato',
    family: 'Familia',
    subFamily: 'Subfamilia',
    parameter: 'Parámetro objetivo',
    method: 'Método / flujo',
    volume: 'Volumen de muestra',
    cta: 'Solicitar cotización',
    secondary: 'Ver familia',
    workflowBullets: ['Contexto de muestra', 'Trazabilidad del operador', 'Captura de resultado', 'Informe digital'],
    bridge: 'Conecta este producto a AquaVerify Cloud para mantener trazables contexto de muestra, operador, resultado e informe desde la primera interacción.',
    disclaimer: 'Las referencias a métodos deben leerse como alineación de flujo salvo que exista una claim regulatoria final aprobada para el mercado concreto.'
  },
  fr: {
    productRole: 'Rôle du produit',
    technicalFit: 'Adéquation technique',
    connectedWorkflow: 'Flux connecté',
    format: 'Format',
    family: 'Famille',
    subFamily: 'Sous-famille',
    parameter: 'Paramètre cible',
    method: 'Méthode / flux',
    volume: 'Volume d’échantillon',
    cta: 'Demander un devis',
    secondary: 'Voir la famille',
    workflowBullets: ['Contexte d’échantillon', 'Traçabilité opérateur', 'Capture du résultat', 'Rapport numérique'],
    bridge: 'Connectez ce produit à AquaVerify Cloud pour garder traçables le contexte d’échantillon, l’opérateur, le résultat et le rapport.',
    disclaimer: 'Les références aux méthodes doivent être lues comme un alignement de flux sauf claim réglementaire finale approuvée pour le marché concerné.'
  },
  it: {
    productRole: 'Ruolo del prodotto',
    technicalFit: 'Inquadramento tecnico',
    connectedWorkflow: 'Flusso collegato',
    format: 'Formato',
    family: 'Famiglia',
    subFamily: 'Sottofamiglia',
    parameter: 'Parametro target',
    method: 'Metodo / flusso',
    volume: 'Volume campione',
    cta: 'Richiedi preventivo',
    secondary: 'Vedi famiglia',
    workflowBullets: ['Contesto del campione', 'Tracciabilità operatore', 'Acquisizione risultato', 'Report digitale'],
    bridge: 'Collega questo prodotto ad AquaVerify Cloud per mantenere tracciabili contesto del campione, operatore, risultato e report.',
    disclaimer: 'I riferimenti ai metodi vanno letti come allineamento del flusso salvo claim regolatoria finale approvata per il mercato specifico.'
  },
  ca: {
    productRole: 'Funció del producte',
    technicalFit: 'Encaix tècnic',
    connectedWorkflow: 'Flux connectat',
    format: 'Format',
    family: 'Família',
    subFamily: 'Subfamília',
    parameter: 'Paràmetre objectiu',
    method: 'Mètode / flux',
    volume: 'Volum de mostra',
    cta: 'Sol·licitar pressupost',
    secondary: 'Veure família',
    workflowBullets: ['Context de mostra', 'Traçabilitat de l’operador', 'Captura de resultat', 'Informe digital'],
    bridge: 'Connecta aquest producte a AquaVerify Cloud per mantenir traçables context de mostra, operador, resultat i informe des de la primera interacció.',
    disclaimer: 'Les referències a mètodes s’han de llegir com alineació de flux tret que hi hagi una claim regulatòria final aprovada per al mercat concret.'
  }
};

const COMMON = {
  somaticColiphages: {
    en: 'somatic coliphages',
    es: 'colífagos somáticos',
    fr: 'coliphages somatiques',
    it: 'colifagi somatici',
    ca: 'colífags somàtics'
  },
  fSpecificColiphages: {
    en: 'F-specific coliphages',
    es: 'colífagos F-específicos',
    fr: 'coliphages F-spécifiques',
    it: 'colifagi F-specifici',
    ca: 'colífags F-específics'
  },
  ecoliColiforms: {
    en: 'Escherichia coli and total coliforms',
    es: 'Escherichia coli y coliformes totales',
    fr: 'Escherichia coli et coliformes totaux',
    it: 'Escherichia coli e coliformi totali',
    ca: 'Escherichia coli i coliformes totals'
  },
  enterococci: {
    en: 'enterococci',
    es: 'enterococos',
    fr: 'entérocoques',
    it: 'enterococchi',
    ca: 'enterococs'
  },
  colorimetricReading: {
    en: 'colorimetric reading',
    es: 'lectura colorimétrica',
    fr: 'lecture colorimétrique',
    it: 'lettura colorimetrica',
    ca: 'lectura colorimètrica'
  },
  labOperations: {
    en: 'daily water microbiology laboratory operations',
    es: 'operaciones diarias de laboratorio de microbiología del agua',
    fr: 'opérations quotidiennes de laboratoire de microbiologie de l’eau',
    it: 'operazioni quotidiane di laboratorio di microbiologia dell’acqua',
    ca: 'operacions diàries de laboratori de microbiologia de l’aigua'
  },
  controls: {
    en: 'positive controls and biological materials',
    es: 'controles positivos y materiales biológicos',
    fr: 'contrôles positifs et matériaux biologiques',
    it: 'controlli positivi e materiali biologici',
    ca: 'controls positius i materials biològics'
  }
};

const PRODUCT_TYPE = {
  quantitativeKit: {
    en: 'quantitative kit',
    es: 'kit cuantitativo',
    fr: 'kit quantitatif',
    it: 'kit quantitativo',
    ca: 'kit quantitatiu'
  },
  presenceAbsenceKit: {
    en: 'presence/absence kit',
    es: 'kit de presencia/ausencia',
    fr: 'kit présence/absence',
    it: 'kit presenza/assenza',
    ca: 'kit de presència/absència'
  },
  refill: {
    en: 'refill',
    es: 'refill',
    fr: 'recharge',
    it: 'refill',
    ca: 'refill'
  },
  tool: {
    en: 'tool',
    es: 'herramienta',
    fr: 'outil',
    it: 'strumento',
    ca: 'eina'
  },
  standardKit: {
    en: 'standard kit',
    es: 'kit estándar',
    fr: 'kit standard',
    it: 'kit standard',
    ca: 'kit estàndard'
  },
  labEssential: {
    en: 'lab essential',
    es: 'lab essential',
    fr: 'lab essential',
    it: 'lab essential',
    ca: 'lab essential'
  }
};

const FAMILY_LABELS = {
  enumera: {
    en: 'ENUMERA',
    es: 'ENUMERA',
    fr: 'ENUMERA',
    it: 'ENUMERA',
    ca: 'ENUMERA'
  },
  indica: {
    en: 'INDICA',
    es: 'INDICA',
    fr: 'INDICA',
    it: 'INDICA',
    ca: 'INDICA'
  },
  'standard-kits': {
    en: 'Standard ISO/EPA Kits',
    es: 'Kits estándar ISO/EPA',
    fr: 'Kits standard ISO/EPA',
    it: 'Kit standard ISO/EPA',
    ca: 'Kits estàndard ISO/EPA'
  },
  'lab-essentials': {
    en: 'Lab Essentials',
    es: 'Lab Essentials',
    fr: 'Lab Essentials',
    it: 'Lab Essentials',
    ca: 'Lab Essentials'
  }
};

function i18n(value, lang) {
  if (typeof value === 'string') return value;
  return value?.[lang] || value?.en || '';
}

const PRODUCT_DETAIL_DATA = [
  { id: 'enumera-soma100', parentId: 'enumera', slug: 'enumera-soma100', name: 'ENUMERA Soma100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.somaticColiphages, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'enumera-coli100', parentId: 'enumera', slug: 'enumera-coli100', name: 'ENUMERA Coli100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.enterococci, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'enumera-entero100', parentId: 'enumera', slug: 'enumera-entero100', name: 'ENUMERA Entero100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.ecoliColiforms, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'soma-bottle-100', parentId: 'enumera', slug: 'soma-bottle-100', name: 'Soma Bottle 100', type: PRODUCT_TYPE.refill, subFamily: 'ENUMERA Refill', parameter: COMMON.somaticColiphages, method: 'MCB10 medium refill workflow', volume: '100 mL', format: 'Bottle' },
  { id: 'coli-bottle-100', parentId: 'enumera', slug: 'coli-bottle-100', name: 'Coli Bottle 100', type: PRODUCT_TYPE.refill, subFamily: 'ENUMERA Refill', parameter: COMMON.ecoliColiforms, method: 'Coli medium refill workflow', volume: '100 mL', format: 'Bottle' },
  { id: 'entero-bottle-100', parentId: 'enumera', slug: 'entero-bottle-100', name: 'Entero Bottle 100', type: PRODUCT_TYPE.refill, subFamily: 'ENUMERA Refill', parameter: COMMON.enterococci, method: 'Entero medium refill workflow', volume: '100 mL', format: 'Bottle' },
  { id: 'enumera-sealer', parentId: 'enumera', slug: 'enumera-sealer', name: 'ENUMERA Sealer', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'ENUMERA tray sealing workflow', volume: 'N/A', format: 'Electronic device' },
  { id: 'enumera-mould', parentId: 'enumera', slug: 'enumera-mould', name: 'ENUMERA Mould', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'ENUMERA tray sealing workflow', volume: 'N/A', format: 'Silicone mould' },
  { id: 'enumera-comparator', parentId: 'enumera', slug: 'enumera-comparator', name: 'ENUMERA Comparator', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'Threshold color comparison', volume: 'N/A', format: 'Comparator' },
  { id: 'enumera-reader', parentId: 'enumera', slug: 'enumera-reader', name: 'ENUMERA Reader', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'Image capture support', volume: 'N/A', format: 'Reader box' },
  { id: 'enumera-tray', parentId: 'enumera', slug: 'enumera-tray', name: 'ENUMERA Tray', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'ENUMERA testing tray workflow', volume: 'N/A', format: 'Testing tray' },
  { id: 'enumera-mat', parentId: 'enumera', slug: 'enumera-mat', name: 'ENUMERA MAT', type: PRODUCT_TYPE.tool, subFamily: 'ENUMERA Tools', parameter: COMMON.colorimetricReading, method: 'Image capture support', volume: 'N/A', format: 'Dark mat' },
  { id: 'indica-soma', parentId: 'indica', slug: 'indica-soma', name: 'INDICA Soma', type: PRODUCT_TYPE.presenceAbsenceKit, subFamily: 'INDICA Kits', parameter: COMMON.somaticColiphages, method: 'Presence/absence workflow', volume: '100 mL', format: 'Kit' },
  { id: 'indica-coli', parentId: 'indica', slug: 'indica-coli', name: 'INDICA Coli', type: PRODUCT_TYPE.presenceAbsenceKit, subFamily: 'INDICA Kits', parameter: COMMON.ecoliColiforms, method: 'Presence/absence workflow', volume: '100 mL', format: 'Kit' },
  { id: 'indica-entero', parentId: 'indica', slug: 'indica-entero', name: 'INDICA Entero', type: PRODUCT_TYPE.presenceAbsenceKit, subFamily: 'INDICA Kits', parameter: COMMON.enterococci, method: 'Presence/absence workflow', volume: '100 mL', format: 'Kit' },
  { id: 'indica-match', parentId: 'indica', slug: 'indica-match', name: 'INDICA Match', type: PRODUCT_TYPE.tool, subFamily: 'INDICA Tools', parameter: COMMON.colorimetricReading, method: 'Presence/absence color matching', volume: 'N/A', format: 'Comparator' },
  { id: 'plaque-soma-1ml', parentId: 'standard-kits', slug: 'plaque-soma-1ml', name: 'Plaque Soma 1ml', type: PRODUCT_TYPE.standardKit, subFamily: 'ISO Kits', parameter: COMMON.somaticColiphages, method: 'ISO 10705-2 Double Agar Layer (DAL) workflow', volume: '1 mL', format: 'Kit' },
  { id: 'plaque-soma-100ml', parentId: 'standard-kits', slug: 'plaque-soma-100ml', name: 'Plaque Soma 100 ml', type: PRODUCT_TYPE.standardKit, subFamily: 'ISO Kits', parameter: COMMON.somaticColiphages, method: 'ISO 10705-2 Single Agar Layer (SAL) workflow', volume: '100 mL', format: 'Kit' },
  { id: 'epa-soma', parentId: 'standard-kits', slug: 'epa-soma', name: 'EPA Soma', type: PRODUCT_TYPE.standardKit, subFamily: 'EPA Kits', parameter: COMMON.somaticColiphages, method: 'US-EPA 1602, 1642 and 1643 oriented workflow', volume: 'Method-dependent', format: 'Kit' },
  { id: 'epa-f-plus', parentId: 'standard-kits', slug: 'epa-f-plus', name: 'EPA F-Plus', type: PRODUCT_TYPE.standardKit, subFamily: 'EPA Kits', parameter: COMMON.fSpecificColiphages, method: 'US-EPA 1602, 1642 and 1643 oriented workflow', volume: 'Method-dependent', format: 'Kit' },
  { id: 'msa-semi-solido', parentId: 'lab-essentials', slug: 'msa-semi-solido', name: 'MSA Semi solido', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'ssMSA prepared workflow', volume: '100 mL', format: 'Prepared medium' },
  { id: 'msa-plate', parentId: 'lab-essentials', slug: 'msa-plate', name: 'MSA Plate', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'MSA plate workflow', volume: '90 mm', format: 'Prepared plate' },
  { id: 'msb', parentId: 'lab-essentials', slug: 'msb', name: 'MSB', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'Modified Scholten’s Broth (MSB)', volume: 'N/A', format: 'Broth' },
  { id: 'msa', parentId: 'lab-essentials', slug: 'msa', name: 'MSA', type: PRODUCT_TYPE.labEssential, subFamily: 'Culture Media & Reagents', parameter: COMMON.labOperations, method: 'Modified Scholten’s Agar (MSA)', volume: 'N/A', format: 'Agar' },
  { id: 'soma-control-1ml', parentId: 'lab-essentials', slug: 'soma-control-1ml', name: 'Soma Control 1ml', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'Positive control for ISO 10705-2 oriented workflows', volume: '1 mL', format: 'Positive control' },
  { id: 'soma-control-100ml', parentId: 'lab-essentials', slug: 'soma-control-100ml', name: 'Soma Control 100ml', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'Positive control for ISO 10705-2 oriented workflows', volume: '100 mL', format: 'Positive control' },
  { id: 'wr5-host-strain', parentId: 'lab-essentials', slug: 'wr5-host-strain', name: 'WR5', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.somaticColiphages, method: 'Host strain for somatic coliphage enumeration', volume: 'N/A', format: 'Host strain' },
  { id: 'gr8f', parentId: 'lab-essentials', slug: 'gr8f', name: 'GR8F', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'GR8 somatic coliphage filterable format', volume: 'N/A', format: '-20ºC format' },
  { id: 'gr8f-ultra', parentId: 'lab-essentials', slug: 'gr8f-ultra', name: 'GR8F-Ultra', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'GR8 somatic coliphage filterable format', volume: 'N/A', format: '-70ºC format' },
  { id: 'indica-control-100', parentId: 'lab-essentials', slug: 'indica-control-100', name: 'INDICA Control 100', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'PHIX174 somatic coliphage filterable control', volume: '100 pfu/vial', format: '-70ºC vial' },
  { id: 'indica-control-1000', parentId: 'lab-essentials', slug: 'indica-control-1000', name: 'INDICA Control 1000', type: PRODUCT_TYPE.labEssential, subFamily: 'Biological Materials', parameter: COMMON.controls, method: 'PHIX174 somatic coliphage filterable control', volume: '1000 pfu/vial', format: '-70ºC vial' }
];

function getProductPagePath(product, lang) {
  return `${PRODUCT_LANGUAGE_BASE[lang]}/${product.slug}`;
}

function buildProductDescription(product, lang) {
  const labels = PRODUCT_UI[lang];
  const productType = i18n(product.type, lang);
  const parameter = i18n(product.parameter, lang);

  switch (lang) {
    case 'es':
      return `${product.name} es un ${productType} AquaVerify para ${parameter} en flujos de microbiología del agua.`;
    case 'fr':
      return `${product.name} est un ${productType} AquaVerify pour ${parameter} dans les flux de microbiologie de l’eau.`;
    case 'it':
      return `${product.name} è un ${productType} AquaVerify per ${parameter} nei flussi di microbiologia dell’acqua.`;
    case 'ca':
      return `${product.name} és un ${productType} AquaVerify per a ${parameter} en fluxos de microbiologia de l’aigua.`;
    default:
      return `${product.name} is an AquaVerify ${productType} for ${parameter} in water microbiology workflows.`;
  }
}

function buildProductFaqs(product, lang) {
  const labels = PRODUCT_UI[lang];
  const productType = i18n(product.type, lang);
  const parameter = i18n(product.parameter, lang);

  switch (lang) {
    case 'es':
      return [
        {
          question: `¿Para qué se utiliza ${product.name}?`,
          answer: `${product.name} es un ${productType} para ${parameter} en flujos de microbiología del agua, con formato ${product.format} y volumen de referencia ${product.volume}.`
        },
        {
          question: `¿Puede ${product.name} conectarse a AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `¿Está ${product.name} disponible para distribuidores u OEM?`,
          answer: 'AquaVerify puede valorar suministro bajo marca AquaVerify, distribución técnica u opciones OEM según mercado, volumen, soporte requerido y restricciones regulatorias.'
        }
      ];
    case 'fr':
      return [
        {
          question: `À quoi sert ${product.name} ?`,
          answer: `${product.name} est un ${productType} pour ${parameter} dans les flux de microbiologie de l’eau, avec format ${product.format} et volume de référence ${product.volume}.`
        },
        {
          question: `${product.name} peut-il être connecté à AquaVerify Cloud ?`,
          answer: labels.bridge
        },
        {
          question: `${product.name} est-il disponible pour distributeurs ou OEM ?`,
          answer: 'AquaVerify peut étudier une fourniture sous marque AquaVerify, distribution technique ou options OEM selon marché, volume, support requis et contraintes réglementaires.'
        }
      ];
    case 'it':
      return [
        {
          question: `A cosa serve ${product.name}?`,
          answer: `${product.name} è un ${productType} per ${parameter} nei flussi di microbiologia dell’acqua, con formato ${product.format} e volume di riferimento ${product.volume}.`
        },
        {
          question: `${product.name} può collegarsi ad AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `${product.name} è disponibile per distributori o OEM?`,
          answer: 'AquaVerify può valutare fornitura a marchio AquaVerify, distribuzione tecnica o opzioni OEM in base a mercato, volume, supporto richiesto e vincoli regolatori.'
        }
      ];
    case 'ca':
      return [
        {
          question: `Per a què s’utilitza ${product.name}?`,
          answer: `${product.name} és un ${productType} per a ${parameter} en fluxos de microbiologia de l’aigua, amb format ${product.format} i volum de referència ${product.volume}.`
        },
        {
          question: `${product.name} es pot connectar a AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `${product.name} està disponible per a distribuïdors o OEM?`,
          answer: 'AquaVerify pot valorar subministrament sota marca AquaVerify, distribució tècnica o opcions OEM segons mercat, volum, suport requerit i restriccions regulatòries.'
        }
      ];
    default:
      return [
        {
          question: `What is ${product.name} used for?`,
          answer: `${product.name} is an AquaVerify ${productType} for ${parameter} in water microbiology workflows, with ${product.format} format and ${product.volume} reference volume.`
        },
        {
          question: `Can ${product.name} connect to AquaVerify Cloud?`,
          answer: labels.bridge
        },
        {
          question: `Is ${product.name} available for distributors or OEM?`,
          answer: 'AquaVerify can evaluate AquaVerify-branded supply, technical distribution or OEM options depending on market, volume, required support and regulatory constraints.'
        }
      ];
  }
}

function buildProductLocale(product, lang) {
  const labels = PRODUCT_UI[lang];
  const family = i18n(FAMILY_LABELS[product.parentId], lang);
  const productType = i18n(product.type, lang);
  const parameter = i18n(product.parameter, lang);
  const description = buildProductDescription(product, lang);

  return locale(
    getProductPagePath(product, lang),
    `${product.name}: ${parameter}`,
    description,
    [
      section(labels.productRole, description, [
        `${labels.family}: ${family}`,
        `${labels.subFamily}: ${product.subFamily}`,
        `${labels.format}: ${product.format}`,
        `${labels.parameter}: ${parameter}`
      ]),
      section(labels.technicalFit, labels.disclaimer, [
        `${labels.method}: ${product.method}`,
        `${labels.volume}: ${product.volume}`,
        `${labels.format}: ${product.format}`
      ]),
      section(labels.connectedWorkflow, labels.bridge, [
        ...labels.workflowBullets
      ])
    ],
    {
      eyebrow: family,
      primaryCta: labels.cta,
      secondaryCta: labels.secondary,
      seoTitle: `${product.name} | AquaVerify ${family}`,
      seoDescription: description,
      faqs: buildProductFaqs(product, lang)
    }
  );
}

function buildProductDetailPages() {
  return PRODUCT_DETAIL_DATA.map((product) => page(
    product.id,
    'products',
    'quote',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, buildProductLocale(product, lang)])),
    {
      parentId: product.parentId,
      schemaType: 'Product',
      productName: product.name
    }
  ));
}

MARKETING_PAGES.push(...buildProductDetailPages());

export function normalizePath(pathname) {
  const normalized = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return normalized || '/';
}

export function findMarketingPageByPath(pathname) {
  const path = normalizePath(pathname);
  for (const page of MARKETING_PAGES) {
    for (const lang of MARKETING_LANGUAGES) {
      if (normalizePath(page.translations[lang]?.path || '') === path) {
        return { page, lang, content: page.translations[lang] };
      }
    }
  }
  return null;
}

export function getMarketingPagePath(id, lang = 'en') {
  const page = MARKETING_PAGES.find((item) => item.id === id);
  return page?.translations[lang]?.path || page?.translations.en?.path || '/';
}

export function getMarketingPageSummary(id, lang = 'en') {
  const page = MARKETING_PAGES.find((item) => item.id === id);
  if (!page) return null;
  const content = page.translations[lang] || page.translations.en;
  return {
    id: page.id,
    title: content.title,
    description: content.description,
    path: content.path
  };
}

export function getMarketingAlternates(page) {
  return Object.fromEntries(
    MARKETING_LANGUAGES.map((lang) => [lang, page.translations[lang]?.path]).filter(([, path]) => Boolean(path))
  );
}

export function getRelatedMarketingPages(currentId, lang = 'en') {
  const current = MARKETING_PAGES.find((page) => page.id === currentId);
  if (!current) return [];

  const children = MARKETING_PAGES.filter((page) => page.parentId === currentId);
  const candidates = children.length > 0
    ? children
    : current.parentId
      ? [
          MARKETING_PAGES.find((page) => page.id === current.parentId),
          ...MARKETING_PAGES.filter((page) => page.parentId === current.parentId && page.id !== currentId)
        ].filter(Boolean)
      : MARKETING_PAGES.filter((page) => page.id !== currentId && page.category === current.category);

  return candidates.slice(0, 4)
    .map((page) => ({
      id: page.id,
      title: page.translations[lang]?.title || page.translations.en.title,
      description: page.translations[lang]?.description || page.translations.en.description,
      path: page.translations[lang]?.path || page.translations.en.path
    }));
}

export { productLinks };
