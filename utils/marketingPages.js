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
      section('Built for counting, not guessing', 'ENUMERA is designed for quantitative workflows where laboratories need clear, repeatable and traceable results.', ['ENUMERA Soma100 for somatic coliphage workflows', 'ENUMERA Coli100 for bacterial indicator workflows', 'ENUMERA Entero100 for bacterial indicator workflows', 'Refills and tools for repeatable operation']),
      section('Connected to AquaVerify Cloud', 'Results, operators, sample context and reporting can be linked to the digital platform.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Request ENUMERA quote', secondaryCta: 'View all products' }),
    es: locale('/es/productos/enumera', 'Kits cuantitativos ENUMERA para microbiología del agua', 'ENUMERA es la familia AquaVerify para flujos de enumeración en microbiología del agua.', [
      section('Diseñada para contar, no para adivinar', 'ENUMERA está pensada para flujos cuantitativos donde el laboratorio necesita resultados claros, repetibles y trazables.', ['ENUMERA Soma100 para flujos de colífagos somáticos', 'ENUMERA Coli100 para indicadores bacterianos', 'ENUMERA Entero100 para indicadores bacterianos', 'Refills y herramientas para operación repetible']),
      section('Conectada a AquaVerify Cloud', 'Resultados, operadores, contexto de muestra e informes pueden vincularse a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Solicitar cotización ENUMERA', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/produits/enumera', 'Kits quantitatifs ENUMERA pour la microbiologie de l’eau', 'ENUMERA est la famille AquaVerify dédiée aux flux de dénombrement en microbiologie de l’eau.', [
      section('Conçu pour compter, pas pour deviner', 'ENUMERA répond aux flux quantitatifs où le laboratoire a besoin de résultats clairs, reproductibles et traçables.', ['ENUMERA Soma100 pour les coliphages somatiques', 'ENUMERA Coli100 pour les indicateurs bactériens', 'ENUMERA Entero100 pour les indicateurs bactériens', 'Recharges et outils pour une opération répétable']),
      section('Connecté à AquaVerify Cloud', 'Résultats, opérateurs, contexte d’échantillon et rapports peuvent être reliés à la plateforme numérique.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Demander un devis ENUMERA', secondaryCta: 'Voir les produits' }),
    it: locale('/it/prodotti/enumera', 'Kit quantitativi ENUMERA per microbiologia dell’acqua', 'ENUMERA è la famiglia AquaVerify per flussi di enumerazione nella microbiologia dell’acqua.', [
      section('Creato per contare, non per indovinare', 'ENUMERA è pensato per flussi quantitativi in cui il laboratorio richiede risultati chiari, ripetibili e tracciabili.', ['ENUMERA Soma100 per colifagi somatici', 'ENUMERA Coli100 per indicatori batterici', 'ENUMERA Entero100 per indicatori batterici', 'Refill e strumenti per operazioni ripetibili']),
      section('Collegato ad AquaVerify Cloud', 'Risultati, operatori, contesto del campione e report possono essere collegati alla piattaforma digitale.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Richiedi preventivo ENUMERA', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/productes/enumera', 'Kits quantitatius ENUMERA per a microbiologia de l’aigua', 'ENUMERA és la família AquaVerify per a fluxos d’enumeració en microbiologia de l’aigua.', [
      section('Dissenyada per comptar, no per endevinar', 'ENUMERA està pensada per a fluxos quantitatius on el laboratori necessita resultats clars, repetibles i traçables.', ['ENUMERA Soma100 per a colífags somàtics', 'ENUMERA Coli100 per a indicadors bacterians', 'ENUMERA Entero100 per a indicadors bacterians', 'Refills i eines per a operació repetible']),
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
  page('private-label-kits', 'partners', 'oem', {
    en: locale('/oem/private-label-water-testing-kits', 'Private-label water testing kits for distributors', 'Build a differentiated water microbiology catalog with AquaVerify products, OEM packaging options and connected platform workflows.', [
      section('For distributors that need a defensible catalog', 'AquaVerify helps scientific distributors move beyond generic consumables with kits, controls and platform-enabled workflows.', ['Private-label or AquaVerify-branded supply', 'Water microbiology kits and lab essentials', 'Platform access for traceability and customer reporting', 'Technical onboarding for sales and support teams']),
      section('A practical OEM path', 'Start with a focused product range, validate demand with target customers and scale packaging, training and digital workflow when volume is clear.', ['Portfolio selection by market need', 'Commercial qualification and pricing model', 'Packaging and documentation alignment', 'CRM attribution from web leads to partner conversations'])
    ], { eyebrow: 'OEM', primaryCta: 'Discuss private-label supply', secondaryCta: 'View distributor program', seoTitle: 'Private Label Water Testing Kits | AquaVerify OEM for Distributors', faqs: [
      { question: 'Can AquaVerify supply private-label water testing kits?', answer: 'AquaVerify can evaluate private-label or AquaVerify-branded supply depending on market, volume, support needs and regulatory constraints.' },
      { question: 'Do OEM products connect to AquaVerify Cloud?', answer: 'OEM and distributor programs can include platform workflows for sample traceability, reporting, CRM and customer portal operations.' },
      { question: 'Who is this program designed for?', answer: 'It is designed for scientific distributors, laboratory suppliers and B2B partners that want a differentiated water microbiology portfolio.' }
    ] }),
    es: locale('/es/oem/kits-analisis-agua-marca-blanca', 'Kits de análisis de agua de marca blanca para distribuidores', 'Crea un catálogo diferenciado de microbiología del agua con productos AquaVerify, opciones OEM de packaging y flujos conectados a plataforma.', [
      section('Para distribuidores que necesitan un catálogo defendible', 'AquaVerify ayuda a distribuidores científicos a ir más allá del consumible genérico con kits, controles y flujos habilitados por plataforma.', ['Suministro de marca blanca o bajo marca AquaVerify', 'Kits de microbiología del agua y lab essentials', 'Acceso a plataforma para trazabilidad y reporting cliente', 'Onboarding técnico para equipos comerciales y soporte']),
      section('Un camino OEM práctico', 'Empieza con una gama enfocada, valida demanda con clientes objetivo y escala packaging, formación y flujo digital cuando el volumen esté claro.', ['Selección de portfolio por necesidad de mercado', 'Cualificación comercial y modelo de precio', 'Alineación de packaging y documentación', 'Atribución CRM desde leads web a conversaciones partner'])
    ], { eyebrow: 'OEM', primaryCta: 'Hablar de suministro marca blanca', secondaryCta: 'Ver programa distribuidor', seoTitle: 'Kits de análisis de agua marca blanca | OEM AquaVerify', faqs: [
      { question: '¿Puede AquaVerify suministrar kits de agua de marca blanca?', answer: 'AquaVerify puede evaluar suministro de marca blanca o bajo marca AquaVerify según mercado, volumen, soporte necesario y restricciones regulatorias.' },
      { question: '¿Los productos OEM se conectan a AquaVerify Cloud?', answer: 'Los programas OEM y de distribución pueden incluir flujos de plataforma para trazabilidad de muestras, reporting, CRM y portal cliente.' },
      { question: '¿Para quién está diseñado este programa?', answer: 'Está diseñado para distribuidores científicos, proveedores de laboratorio y partners B2B que quieren un portfolio diferenciado de microbiología del agua.' }
    ] }),
    fr: locale('/fr/oem/kits-analyse-eau-marque-blanche', 'Kits d’analyse de l’eau en marque blanche pour distributeurs', 'Créez un catalogue différencié de microbiologie de l’eau avec produits AquaVerify, options packaging OEM et flux connectés à la plateforme.', [
      section('Pour distributeurs qui veulent un catalogue défendable', 'AquaVerify aide les distributeurs scientifiques à dépasser les consommables génériques avec kits, contrôles et flux activés par plateforme.', ['Fourniture marque blanche ou sous marque AquaVerify', 'Kits de microbiologie de l’eau et lab essentials', 'Accès plateforme pour traçabilité et reporting client', 'Onboarding technique pour équipes commerciales et support']),
      section('Un parcours OEM pragmatique', 'Commencez par une gamme ciblée, validez la demande avec clients cibles et faites évoluer packaging, formation et flux numérique lorsque le volume est clair.', ['Sélection de portfolio par besoin marché', 'Qualification commerciale et modèle de prix', 'Alignement packaging et documentation', 'Attribution CRM des leads web vers conversations partenaires'])
    ], { eyebrow: 'OEM', primaryCta: 'Discuter marque blanche', secondaryCta: 'Voir programme distributeur', seoTitle: 'Kits analyse eau marque blanche | OEM AquaVerify', faqs: [
      { question: 'AquaVerify peut-il fournir des kits eau en marque blanche?', answer: 'AquaVerify peut évaluer une fourniture en marque blanche ou sous marque AquaVerify selon marché, volume, support requis et contraintes réglementaires.' },
      { question: 'Les produits OEM se connectent-ils à AquaVerify Cloud?', answer: 'Les programmes OEM et distribution peuvent inclure des flux plateforme pour traçabilité échantillon, reporting, CRM et portail client.' },
      { question: 'À qui s’adresse ce programme?', answer: 'Il s’adresse aux distributeurs scientifiques, fournisseurs de laboratoire et partenaires B2B qui veulent un portfolio différencié en microbiologie de l’eau.' }
    ] }),
    it: locale('/it/oem/kit-analisi-acqua-marca-privata', 'Kit di analisi dell’acqua private label per distributori', 'Crea un catalogo differenziato di microbiologia dell’acqua con prodotti AquaVerify, opzioni packaging OEM e flussi collegati alla piattaforma.', [
      section('Per distributori che cercano un catalogo difendibile', 'AquaVerify aiuta i distributori scientifici ad andare oltre consumabili generici con kit, controlli e flussi abilitati dalla piattaforma.', ['Fornitura private label o a marchio AquaVerify', 'Kit microbiologia dell’acqua e lab essentials', 'Accesso piattaforma per tracciabilità e reporting cliente', 'Onboarding tecnico per team commerciali e supporto']),
      section('Un percorso OEM pratico', 'Parti da una gamma focalizzata, valida la domanda con clienti target e scala packaging, formazione e flusso digitale quando il volume è chiaro.', ['Selezione portfolio per bisogno di mercato', 'Qualifica commerciale e modello prezzo', 'Allineamento packaging e documentazione', 'Attribuzione CRM da lead web a conversazioni partner'])
    ], { eyebrow: 'OEM', primaryCta: 'Discuti fornitura private label', secondaryCta: 'Vedi programma distributori', seoTitle: 'Kit analisi acqua private label | OEM AquaVerify', faqs: [
      { question: 'AquaVerify può fornire kit acqua private label?', answer: 'AquaVerify può valutare fornitura private label o a marchio AquaVerify in base a mercato, volume, supporto richiesto e vincoli regolatori.' },
      { question: 'I prodotti OEM si collegano ad AquaVerify Cloud?', answer: 'I programmi OEM e distributori possono includere flussi piattaforma per tracciabilità campioni, reporting, CRM e portale clienti.' },
      { question: 'Per chi è pensato questo programma?', answer: 'È pensato per distributori scientifici, fornitori di laboratorio e partner B2B che vogliono un portfolio differenziato di microbiologia dell’acqua.' }
    ] }),
    ca: locale('/ca/oem/kits-analisi-aigua-marca-blanca', 'Kits d’anàlisi d’aigua de marca blanca per a distribuïdors', 'Crea un catàleg diferenciat de microbiologia de l’aigua amb productes AquaVerify, opcions OEM de packaging i fluxos connectats a plataforma.', [
      section('Per a distribuïdors que necessiten un catàleg defensable', 'AquaVerify ajuda distribuïdors científics a anar més enllà del consumible genèric amb kits, controls i fluxos habilitats per plataforma.', ['Subministrament de marca blanca o sota marca AquaVerify', 'Kits de microbiologia de l’aigua i lab essentials', 'Accés a plataforma per a traçabilitat i reporting client', 'Onboarding tècnic per a equips comercials i suport']),
      section('Un camí OEM pràctic', 'Comença amb una gamma enfocada, valida demanda amb clients objectiu i escala packaging, formació i flux digital quan el volum estigui clar.', ['Selecció de portfolio per necessitat de mercat', 'Qualificació comercial i model de preu', 'Alineació de packaging i documentació', 'Atribució CRM des de leads web a converses partner'])
    ], { eyebrow: 'OEM', primaryCta: 'Parlar de subministrament marca blanca', secondaryCta: 'Veure programa distribuïdor', seoTitle: 'Kits anàlisi aigua marca blanca | OEM AquaVerify', faqs: [
      { question: 'AquaVerify pot subministrar kits d’aigua de marca blanca?', answer: 'AquaVerify pot valorar subministrament de marca blanca o sota marca AquaVerify segons mercat, volum, suport necessari i restriccions regulatòries.' },
      { question: 'Els productes OEM es connecten a AquaVerify Cloud?', answer: 'Els programes OEM i de distribució poden incloure fluxos de plataforma per a traçabilitat de mostres, reporting, CRM i portal client.' },
      { question: 'Per a qui està dissenyat aquest programa?', answer: 'Està dissenyat per a distribuïdors científics, proveïdors de laboratori i partners B2B que volen un portfolio diferenciat de microbiologia de l’aigua.' }
    ] })
  }, { parentId: 'oem' }),
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
      section('For lab throughput and confidence', 'AquaVerify supports sample intake, microbiology execution, reporting and client communication.', ['Kits and lab essentials', 'Traceable sample workflows', 'Digital reports', 'Customer portal and CRM'])
    ], { eyebrow: 'Laboratories', primaryCta: 'Talk to a lab specialist', secondaryCta: 'View products' }),
    es: locale('/es/industrias/laboratorios-analisis-agua', 'Soluciones para laboratorios públicos y privados de análisis de agua', 'Productos y flujos digitales para laboratorios que necesitan microbiología del agua fiable e informes trazables.', [
      section('Para capacidad y confianza de laboratorio', 'AquaVerify da soporte a entrada de muestras, ejecución microbiológica, reporting y comunicación con clientes.', ['Kits y lab essentials', 'Flujos trazables de muestra', 'Informes digitales', 'Portal cliente y CRM'])
    ], { eyebrow: 'Laboratorios', primaryCta: 'Hablar con especialista', secondaryCta: 'Ver productos' }),
    fr: locale('/fr/industries/laboratoires-analyse-eau', 'Solutions pour laboratoires publics et privés d’analyse de l’eau', 'Produits et flux numériques pour les laboratoires ayant besoin de microbiologie de l’eau fiable et de rapports traçables.', [
      section('Pour débit et confiance laboratoire', 'AquaVerify soutient l’entrée d’échantillons, l’exécution microbiologique, les rapports et la communication client.', ['Kits et lab essentials', 'Flux échantillon traçables', 'Rapports numériques', 'Portail client et CRM'])
    ], { eyebrow: 'Laboratoires', primaryCta: 'Parler à un spécialiste', secondaryCta: 'Voir les produits' }),
    it: locale('/it/settori/laboratori-analisi-acqua', 'Soluzioni per laboratori pubblici e privati di analisi dell’acqua', 'Prodotti e flussi digitali per laboratori che richiedono microbiologia dell’acqua affidabile e report tracciabili.', [
      section('Per capacità e fiducia del laboratorio', 'AquaVerify supporta ingresso campioni, esecuzione microbiologica, reporting e comunicazione cliente.', ['Kit e lab essentials', 'Flussi campione tracciabili', 'Report digitali', 'Portale cliente e CRM'])
    ], { eyebrow: 'Laboratori', primaryCta: 'Parla con uno specialista', secondaryCta: 'Vedi prodotti' }),
    ca: locale('/ca/sectors/laboratoris-analisi-aigua', 'Solucions per a laboratoris públics i privats d’anàlisi d’aigua', 'Productes i fluxos digitals per a laboratoris que necessiten microbiologia de l’aigua fiable i informes traçables.', [
      section('Per a capacitat i confiança de laboratori', 'AquaVerify dona suport a entrada de mostres, execució microbiològica, reporting i comunicació amb clients.', ['Kits i lab essentials', 'Fluxos traçables de mostra', 'Informes digitals', 'Portal client i CRM'])
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
  page('resources', 'resources', 'quote', {
    en: locale('/resources', 'Water microbiology resources and buyer guides', 'Technical and commercial guides for water microbiology products, digital traceability, OEM distribution and quality workflows.', [
      section('Resources for technical buyers', 'Use this hub to compare qualitative and quantitative workflows, understand coliphage indicators, and prepare product or OEM discussions with a clearer buying brief.', ['ISO and EPA-oriented water microbiology workflows', 'Presence/absence and enumeration decision guides', 'Digital traceability for samples, reports and customers', 'Distributor and OEM evaluation checklists']),
      section('From reading to action', 'Each guide connects scientific context with AquaVerify products, platform workflows and the next commercial step for laboratories, distributors and quality teams.')
    ], { eyebrow: 'Resources', primaryCta: 'Talk to AquaVerify', secondaryCta: 'View products', seoTitle: 'Water Microbiology Resources | AquaVerify Guides', faqs: [
      { question: 'Who are these resources for?', answer: 'They are written for laboratories, distributors, water quality teams and biotech companies evaluating water microbiology products or connected software workflows.' },
      { question: 'Can AquaVerify help after reading a guide?', answer: 'Yes. AquaVerify can help map the relevant product family, OEM option or platform workflow for the use case.' }
    ] }),
    es: locale('/es/recursos', 'Recursos de microbiología del agua y guías para compradores', 'Guías técnicas y comerciales sobre productos de microbiología del agua, trazabilidad digital, distribución OEM y flujos de calidad.', [
      section('Recursos para compradores técnicos', 'Usa este hub para comparar flujos cualitativos y cuantitativos, entender indicadores colífagos y preparar conversaciones de producto u OEM con un brief de compra más claro.', ['Flujos de microbiología del agua orientados a ISO y EPA', 'Guías de decisión presencia/ausencia y enumeración', 'Trazabilidad digital de muestras, informes y clientes', 'Checklists para distribuidores y evaluación OEM']),
      section('De la lectura a la acción', 'Cada guía conecta contexto científico con productos AquaVerify, flujos de plataforma y el siguiente paso comercial para laboratorios, distribuidores y equipos de calidad.')
    ], { eyebrow: 'Recursos', primaryCta: 'Hablar con AquaVerify', secondaryCta: 'Ver productos', seoTitle: 'Recursos de microbiología del agua | Guías AquaVerify', faqs: [
      { question: '¿Para quién son estos recursos?', answer: 'Están escritos para laboratorios, distribuidores, equipos de calidad del agua y empresas biotech que evalúan productos de microbiología del agua o flujos digitales conectados.' },
      { question: '¿AquaVerify puede ayudar después de leer una guía?', answer: 'Sí. AquaVerify puede ayudar a mapear la familia de producto, opción OEM o flujo de plataforma más adecuado para el caso de uso.' }
    ] }),
    fr: locale('/fr/ressources', 'Ressources microbiologie de l’eau et guides acheteurs', 'Guides techniques et commerciaux sur les produits de microbiologie de l’eau, la traçabilité numérique, la distribution OEM et les flux qualité.', [
      section('Ressources pour acheteurs techniques', 'Utilisez ce hub pour comparer les flux qualitatifs et quantitatifs, comprendre les indicateurs coliphages et préparer des échanges produit ou OEM avec un brief d’achat plus clair.', ['Flux de microbiologie de l’eau orientés ISO et EPA', 'Guides de décision présence/absence et dénombrement', 'Traçabilité numérique des échantillons, rapports et clients', 'Checklists distributeurs et évaluation OEM']),
      section('De la lecture à l’action', 'Chaque guide relie le contexte scientifique aux produits AquaVerify, aux flux plateforme et à l’étape commerciale suivante pour laboratoires, distributeurs et équipes qualité.')
    ], { eyebrow: 'Ressources', primaryCta: 'Parler à AquaVerify', secondaryCta: 'Voir les produits', seoTitle: 'Ressources microbiologie de l’eau | Guides AquaVerify', faqs: [
      { question: 'À qui s’adressent ces ressources?', answer: 'Elles s’adressent aux laboratoires, distributeurs, équipes qualité eau et entreprises biotech qui évaluent des produits de microbiologie de l’eau ou des flux logiciels connectés.' },
      { question: 'AquaVerify peut-il aider après la lecture?', answer: 'Oui. AquaVerify peut aider à cartographier la famille produit, l’option OEM ou le flux plateforme adapté au cas d’usage.' }
    ] }),
    it: locale('/it/risorse', 'Risorse di microbiologia dell’acqua e guide per buyer', 'Guide tecniche e commerciali su prodotti di microbiologia dell’acqua, tracciabilità digitale, distribuzione OEM e flussi qualità.', [
      section('Risorse per buyer tecnici', 'Usa questo hub per confrontare flussi qualitativi e quantitativi, comprendere gli indicatori colifagi e preparare conversazioni prodotto o OEM con un brief d’acquisto più chiaro.', ['Flussi di microbiologia dell’acqua orientati a ISO ed EPA', 'Guide decisionali presenza/assenza ed enumerazione', 'Tracciabilità digitale di campioni, report e clienti', 'Checklist per distributori e valutazione OEM']),
      section('Dalla lettura all’azione', 'Ogni guida collega il contesto scientifico ai prodotti AquaVerify, ai flussi piattaforma e al passo commerciale successivo per laboratori, distributori e team qualità.')
    ], { eyebrow: 'Risorse', primaryCta: 'Parla con AquaVerify', secondaryCta: 'Vedi prodotti', seoTitle: 'Risorse di microbiologia dell’acqua | Guide AquaVerify', faqs: [
      { question: 'A chi sono rivolte queste risorse?', answer: 'Sono scritte per laboratori, distributori, team qualità acqua e aziende biotech che valutano prodotti di microbiologia dell’acqua o flussi software collegati.' },
      { question: 'AquaVerify può aiutare dopo la lettura?', answer: 'Sì. AquaVerify può aiutare a mappare la famiglia prodotto, l’opzione OEM o il flusso piattaforma adatto al caso d’uso.' }
    ] }),
    ca: locale('/ca/recursos', 'Recursos de microbiologia de l’aigua i guies per a compradors', 'Guies tècniques i comercials sobre productes de microbiologia de l’aigua, traçabilitat digital, distribució OEM i fluxos de qualitat.', [
      section('Recursos per a compradors tècnics', 'Fes servir aquest hub per comparar fluxos qualitatius i quantitatius, entendre indicadors colífags i preparar converses de producte o OEM amb un brief de compra més clar.', ['Fluxos de microbiologia de l’aigua orientats a ISO i EPA', 'Guies de decisió presència/absència i enumeració', 'Traçabilitat digital de mostres, informes i clients', 'Checklists per a distribuïdors i avaluació OEM']),
      section('De la lectura a l’acció', 'Cada guia connecta context científic amb productes AquaVerify, fluxos de plataforma i el següent pas comercial per a laboratoris, distribuïdors i equips de qualitat.')
    ], { eyebrow: 'Recursos', primaryCta: 'Parlar amb AquaVerify', secondaryCta: 'Veure productes', seoTitle: 'Recursos de microbiologia de l’aigua | Guies AquaVerify', faqs: [
      { question: 'Per a qui són aquests recursos?', answer: 'Estan escrits per a laboratoris, distribuïdors, equips de qualitat de l’aigua i empreses biotech que avaluen productes de microbiologia de l’aigua o fluxos digitals connectats.' },
      { question: 'AquaVerify pot ajudar després de llegir una guia?', answer: 'Sí. AquaVerify pot ajudar a mapar la família de producte, opció OEM o flux de plataforma més adequat per al cas d’ús.' }
    ] })
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
  }, { parentId: 'resources' }),
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
  }, { parentId: 'resources' }),
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
  }, { parentId: 'resources' }),
  page('presence-vs-enumeration', 'resources', 'quote', {
    en: locale('/resources/presence-absence-vs-enumeration', 'Presence/absence vs enumeration in water microbiology', 'Understand when qualitative screening and quantitative enumeration workflows fit water microbiology decisions.', [
      section('When presence/absence fits', 'Presence/absence workflows are useful when a team needs a clear qualitative answer for screening, release decisions or escalation.', ['Fast yes/no decision points', 'Operational monitoring where a qualitative answer is enough', 'Field, quality or routine laboratory workflows', 'Clear link to INDICA product families']),
      section('When enumeration fits', 'Enumeration workflows are stronger when decisions depend on concentration, trend, limit comparison or quantitative reporting.', ['Quantitative result records', 'Trend monitoring across sites or batches', 'Laboratory and customer reporting', 'Clear link to ENUMERA and standard kits']),
      section('Why the platform matters', 'AquaVerify Cloud can connect either workflow to sample context, operators, customer communication and CRM attribution.')
    ], { eyebrow: 'Guide', primaryCta: 'Discuss the right workflow', secondaryCta: 'View INDICA and ENUMERA', seoTitle: 'Presence/Absence vs Enumeration | Water Microbiology Guide', faqs: [
      { question: 'Is presence/absence less useful than enumeration?', answer: 'No. It answers a different operational question. Presence/absence is useful for screening, while enumeration is useful when the concentration or trend matters.' },
      { question: 'Can one organization use both workflows?', answer: 'Yes. Many teams combine qualitative screening with quantitative confirmation or periodic enumeration depending on the sample type and decision.' }
    ] }),
    es: locale('/es/recursos/presencia-ausencia-vs-enumeracion', 'Presencia/ausencia vs enumeración en microbiología del agua', 'Entiende cuándo encajan los flujos cualitativos y cuantitativos en decisiones de microbiología del agua.', [
      section('Cuándo encaja presencia/ausencia', 'Los flujos de presencia/ausencia son útiles cuando el equipo necesita una respuesta cualitativa clara para cribado, liberación o escalado.', ['Decisiones rápidas sí/no', 'Monitorización operativa donde una respuesta cualitativa es suficiente', 'Flujos de campo, calidad o laboratorio rutinario', 'Conexión clara con la familia INDICA']),
      section('Cuándo encaja enumeración', 'Los flujos de enumeración son más fuertes cuando la decisión depende de concentración, tendencia, comparación con límites o informe cuantitativo.', ['Registros de resultado cuantitativo', 'Seguimiento de tendencias por punto o lote', 'Informes de laboratorio y cliente', 'Conexión clara con ENUMERA y kits estándar']),
      section('Por qué importa la plataforma', 'AquaVerify Cloud puede conectar ambos flujos con contexto de muestra, operadores, comunicación cliente y atribución CRM.')
    ], { eyebrow: 'Guía', primaryCta: 'Hablar del flujo adecuado', secondaryCta: 'Ver INDICA y ENUMERA', seoTitle: 'Presencia/Ausencia vs Enumeración | Guía microbiología del agua', faqs: [
      { question: '¿Presencia/ausencia es menos útil que enumeración?', answer: 'No. Responde a una pregunta operativa diferente. Presencia/ausencia sirve para cribado, mientras que enumeración sirve cuando importan la concentración o la tendencia.' },
      { question: '¿Una organización puede usar ambos flujos?', answer: 'Sí. Muchos equipos combinan cribado cualitativo con confirmación cuantitativa o enumeración periódica según el tipo de muestra y la decisión.' }
    ] }),
    fr: locale('/fr/ressources/presence-absence-vs-denombrement', 'Présence/absence vs dénombrement en microbiologie de l’eau', 'Comprendre quand les flux qualitatifs et quantitatifs conviennent aux décisions de microbiologie de l’eau.', [
      section('Quand la présence/absence convient', 'Les flux présence/absence sont utiles lorsqu’une équipe a besoin d’une réponse qualitative claire pour le dépistage, la libération ou l’escalade.', ['Décisions rapides oui/non', 'Surveillance opérationnelle quand une réponse qualitative suffit', 'Flux terrain, qualité ou laboratoire de routine', 'Lien clair avec la famille INDICA']),
      section('Quand le dénombrement convient', 'Les flux de dénombrement sont plus adaptés quand la décision dépend d’une concentration, d’une tendance, d’une comparaison de limite ou d’un rapport quantitatif.', ['Enregistrements de résultat quantitatif', 'Suivi des tendances par site ou lot', 'Rapports laboratoire et client', 'Lien clair avec ENUMERA et kits standard']),
      section('Pourquoi la plateforme compte', 'AquaVerify Cloud peut connecter les deux flux au contexte échantillon, aux opérateurs, à la communication client et à l’attribution CRM.')
    ], { eyebrow: 'Guide', primaryCta: 'Discuter du bon flux', secondaryCta: 'Voir INDICA et ENUMERA', seoTitle: 'Présence/absence vs dénombrement | Guide microbiologie eau', faqs: [
      { question: 'La présence/absence est-elle moins utile que le dénombrement?', answer: 'Non. Elle répond à une question opérationnelle différente. La présence/absence sert au dépistage, tandis que le dénombrement sert lorsque la concentration ou la tendance compte.' },
      { question: 'Une organisation peut-elle utiliser les deux flux?', answer: 'Oui. De nombreuses équipes combinent dépistage qualitatif et confirmation quantitative ou dénombrement périodique selon l’échantillon et la décision.' }
    ] }),
    it: locale('/it/risorse/presenza-assenza-vs-enumerazione', 'Presenza/assenza vs enumerazione nella microbiologia dell’acqua', 'Comprendi quando flussi qualitativi e quantitativi sono adatti alle decisioni di microbiologia dell’acqua.', [
      section('Quando serve presenza/assenza', 'I flussi presenza/assenza sono utili quando un team richiede una risposta qualitativa chiara per screening, rilascio o escalation.', ['Decisioni rapide sì/no', 'Monitoraggio operativo quando una risposta qualitativa è sufficiente', 'Flussi sul campo, qualità o laboratorio di routine', 'Collegamento chiaro con la famiglia INDICA']),
      section('Quando serve enumerazione', 'I flussi di enumerazione sono più forti quando la decisione dipende da concentrazione, trend, confronto con limiti o reporting quantitativo.', ['Registri di risultato quantitativo', 'Monitoraggio trend per sito o lotto', 'Report laboratorio e cliente', 'Collegamento chiaro con ENUMERA e kit standard']),
      section('Perché conta la piattaforma', 'AquaVerify Cloud può collegare entrambi i flussi a contesto campione, operatori, comunicazione cliente e attribuzione CRM.')
    ], { eyebrow: 'Guida', primaryCta: 'Discuti il flusso giusto', secondaryCta: 'Vedi INDICA ed ENUMERA', seoTitle: 'Presenza/assenza vs enumerazione | Guida microbiologia acqua', faqs: [
      { question: 'La presenza/assenza è meno utile dell’enumerazione?', answer: 'No. Risponde a una domanda operativa diversa. La presenza/assenza è utile per lo screening, mentre l’enumerazione serve quando contano concentrazione o trend.' },
      { question: 'Un’organizzazione può usare entrambi i flussi?', answer: 'Sì. Molti team combinano screening qualitativo con conferma quantitativa o enumerazione periodica in base al campione e alla decisione.' }
    ] }),
    ca: locale('/ca/recursos/presencia-absencia-vs-enumeracio', 'Presència/absència vs enumeració en microbiologia de l’aigua', 'Entén quan encaixen els fluxos qualitatius i quantitatius en decisions de microbiologia de l’aigua.', [
      section('Quan encaixa presència/absència', 'Els fluxos de presència/absència són útils quan l’equip necessita una resposta qualitativa clara per a cribratge, alliberament o escalat.', ['Decisions ràpides sí/no', 'Monitoratge operatiu on una resposta qualitativa és suficient', 'Fluxos de camp, qualitat o laboratori rutinari', 'Connexió clara amb la família INDICA']),
      section('Quan encaixa enumeració', 'Els fluxos d’enumeració són més forts quan la decisió depèn de concentració, tendència, comparació amb límits o informe quantitatiu.', ['Registres de resultat quantitatiu', 'Seguiment de tendències per punt o lot', 'Informes de laboratori i client', 'Connexió clara amb ENUMERA i kits estàndard']),
      section('Per què importa la plataforma', 'AquaVerify Cloud pot connectar tots dos fluxos amb context de mostra, operadors, comunicació client i atribució CRM.')
    ], { eyebrow: 'Guia', primaryCta: 'Parlar del flux adequat', secondaryCta: 'Veure INDICA i ENUMERA', seoTitle: 'Presència/absència vs enumeració | Guia microbiologia aigua', faqs: [
      { question: 'Presència/absència és menys útil que enumeració?', answer: 'No. Respon a una pregunta operativa diferent. Presència/absència serveix per a cribratge, mentre que enumeració serveix quan importen la concentració o la tendència.' },
      { question: 'Una organització pot usar tots dos fluxos?', answer: 'Sí. Molts equips combinen cribratge qualitatiu amb confirmació quantitativa o enumeració periòdica segons el tipus de mostra i la decisió.' }
    ] })
  }, { parentId: 'resources' }),
  page('sample-traceability', 'resources', 'quote', {
    en: locale('/resources/water-sample-digital-traceability', 'How to digitalize water sample traceability', 'A practical guide to linking samples, operators, products, reports and customer context in water quality workflows.', [
      section('Start with sample context', 'Digital traceability begins before the analysis: customer, site, sampling point, date, operator and requested workflow should be captured consistently.', ['Customer and site record', 'Sampling point and sample metadata', 'Requested parameter and product family', 'Chain of responsibility']),
      section('Connect execution and evidence', 'A useful system links the test workflow to products, operators, results, images, calculations and review steps.', ['Product or kit used', 'Operator and reviewer history', 'Result and report status', 'Evidence attached to the sample']),
      section('Turn results into CRM intelligence', 'When the public site, CRM and reporting system share attribution, teams can see which pages, campaigns and products generated qualified demand.')
    ], { eyebrow: 'Guide', primaryCta: 'Map your traceability workflow', secondaryCta: 'Explore platform', seoTitle: 'Water Sample Digital Traceability Guide | AquaVerify', faqs: [
      { question: 'Is digital traceability only for large laboratories?', answer: 'No. Smaller laboratories and quality teams can also benefit when samples, products, reports and customer communication are connected from the start.' },
      { question: 'Does traceability replace laboratory validation?', answer: 'No. Digital traceability organizes records and workflows; technical method validation remains a separate scientific and quality process.' }
    ] }),
    es: locale('/es/recursos/trazabilidad-digital-muestras-agua', 'Cómo digitalizar la trazabilidad de muestras de agua', 'Guía práctica para conectar muestras, operadores, productos, informes y contexto cliente en flujos de calidad del agua.', [
      section('Empezar por el contexto de muestra', 'La trazabilidad digital empieza antes del análisis: cliente, instalación, punto de muestreo, fecha, operador y flujo solicitado deben capturarse de forma consistente.', ['Registro de cliente e instalación', 'Punto de muestreo y metadatos de muestra', 'Parámetro solicitado y familia de producto', 'Cadena de responsabilidad']),
      section('Conectar ejecución y evidencia', 'Un sistema útil vincula el flujo de análisis con productos, operadores, resultados, imágenes, cálculos y pasos de revisión.', ['Producto o kit utilizado', 'Historial de operador y revisor', 'Estado de resultado e informe', 'Evidencia asociada a la muestra']),
      section('Convertir resultados en inteligencia CRM', 'Cuando la web pública, el CRM y el reporting comparten atribución, el equipo ve qué páginas, campañas y productos generan demanda cualificada.')
    ], { eyebrow: 'Guía', primaryCta: 'Mapear trazabilidad', secondaryCta: 'Explorar plataforma', seoTitle: 'Guía de trazabilidad digital de muestras de agua | AquaVerify', faqs: [
      { question: '¿La trazabilidad digital es solo para laboratorios grandes?', answer: 'No. Laboratorios pequeños y equipos de calidad también ganan cuando muestras, productos, informes y comunicación cliente están conectados desde el inicio.' },
      { question: '¿La trazabilidad sustituye la validación de laboratorio?', answer: 'No. La trazabilidad digital organiza registros y flujos; la validación técnica del método sigue siendo un proceso científico y de calidad separado.' }
    ] }),
    fr: locale('/fr/ressources/tracabilite-numerique-echantillons-eau', 'Comment numériser la traçabilité des échantillons d’eau', 'Guide pratique pour relier échantillons, opérateurs, produits, rapports et contexte client dans les flux qualité eau.', [
      section('Commencer par le contexte échantillon', 'La traçabilité numérique commence avant l’analyse: client, site, point de prélèvement, date, opérateur et flux demandé doivent être capturés de manière cohérente.', ['Fiche client et site', 'Point de prélèvement et métadonnées échantillon', 'Paramètre demandé et famille produit', 'Chaîne de responsabilité']),
      section('Connecter exécution et preuve', 'Un système utile relie le flux d’analyse aux produits, opérateurs, résultats, images, calculs et étapes de revue.', ['Produit ou kit utilisé', 'Historique opérateur et relecteur', 'Statut du résultat et du rapport', 'Preuve associée à l’échantillon']),
      section('Transformer les résultats en intelligence CRM', 'Lorsque le site public, le CRM et le reporting partagent l’attribution, les équipes voient quelles pages, campagnes et produits génèrent une demande qualifiée.')
    ], { eyebrow: 'Guide', primaryCta: 'Cartographier votre traçabilité', secondaryCta: 'Explorer la plateforme', seoTitle: 'Guide traçabilité numérique échantillons eau | AquaVerify', faqs: [
      { question: 'La traçabilité numérique est-elle réservée aux grands laboratoires?', answer: 'Non. Les petits laboratoires et équipes qualité en bénéficient aussi lorsque échantillons, produits, rapports et communication client sont connectés dès le départ.' },
      { question: 'La traçabilité remplace-t-elle la validation laboratoire?', answer: 'Non. La traçabilité numérique organise les enregistrements et flux; la validation technique de méthode reste un processus scientifique et qualité séparé.' }
    ] }),
    it: locale('/it/risorse/tracciabilita-digitale-campioni-acqua', 'Come digitalizzare la tracciabilità dei campioni d’acqua', 'Guida pratica per collegare campioni, operatori, prodotti, report e contesto cliente nei flussi qualità acqua.', [
      section('Partire dal contesto campione', 'La tracciabilità digitale inizia prima dell’analisi: cliente, sito, punto di campionamento, data, operatore e flusso richiesto devono essere acquisiti in modo coerente.', ['Record cliente e sito', 'Punto di campionamento e metadati campione', 'Parametro richiesto e famiglia prodotto', 'Catena di responsabilità']),
      section('Collegare esecuzione ed evidenza', 'Un sistema utile collega il flusso analitico a prodotti, operatori, risultati, immagini, calcoli e passaggi di revisione.', ['Prodotto o kit utilizzato', 'Storico operatore e revisore', 'Stato di risultato e report', 'Evidenza associata al campione']),
      section('Trasformare i risultati in intelligence CRM', 'Quando sito pubblico, CRM e reporting condividono attribuzione, i team vedono quali pagine, campagne e prodotti generano domanda qualificata.')
    ], { eyebrow: 'Guida', primaryCta: 'Mappa la tracciabilità', secondaryCta: 'Esplora piattaforma', seoTitle: 'Guida tracciabilità digitale campioni acqua | AquaVerify', faqs: [
      { question: 'La tracciabilità digitale serve solo ai grandi laboratori?', answer: 'No. Anche piccoli laboratori e team qualità beneficiano quando campioni, prodotti, report e comunicazione cliente sono collegati dall’inizio.' },
      { question: 'La tracciabilità sostituisce la validazione di laboratorio?', answer: 'No. La tracciabilità digitale organizza registri e flussi; la validazione tecnica del metodo resta un processo scientifico e qualità separato.' }
    ] }),
    ca: locale('/ca/recursos/tracabilitat-digital-mostres-aigua', 'Com digitalitzar la traçabilitat de mostres d’aigua', 'Guia pràctica per connectar mostres, operadors, productes, informes i context client en fluxos de qualitat de l’aigua.', [
      section('Començar pel context de mostra', 'La traçabilitat digital comença abans de l’anàlisi: client, instal·lació, punt de mostreig, data, operador i flux sol·licitat s’han de capturar de manera consistent.', ['Registre de client i instal·lació', 'Punt de mostreig i metadades de mostra', 'Paràmetre sol·licitat i família de producte', 'Cadena de responsabilitat']),
      section('Connectar execució i evidència', 'Un sistema útil vincula el flux d’anàlisi amb productes, operadors, resultats, imatges, càlculs i passos de revisió.', ['Producte o kit utilitzat', 'Historial d’operador i revisor', 'Estat de resultat i informe', 'Evidència associada a la mostra']),
      section('Convertir resultats en intel·ligència CRM', 'Quan la web pública, el CRM i el reporting comparteixen atribució, l’equip veu quines pàgines, campanyes i productes generen demanda qualificada.')
    ], { eyebrow: 'Guia', primaryCta: 'Mapar traçabilitat', secondaryCta: 'Explorar plataforma', seoTitle: 'Guia de traçabilitat digital de mostres d’aigua | AquaVerify', faqs: [
      { question: 'La traçabilitat digital és només per a laboratoris grans?', answer: 'No. Laboratoris petits i equips de qualitat també guanyen quan mostres, productes, informes i comunicació client estan connectats des de l’inici.' },
      { question: 'La traçabilitat substitueix la validació de laboratori?', answer: 'No. La traçabilitat digital organitza registres i fluxos; la validació tècnica del mètode continua sent un procés científic i de qualitat separat.' }
    ] })
  }, { parentId: 'resources' }),
  page('distributor-checklist', 'resources', 'quote', {
    en: locale('/resources/water-testing-kit-distributor-checklist', 'Checklist for distributors of water testing kits', 'A practical checklist for scientific distributors evaluating water microbiology kits, OEM options and connected software workflows.', [
      section('Portfolio fit', 'A distributor should first validate whether the product range adds a clear water microbiology story to its existing catalogue.', ['Quantitative and qualitative product families', 'Standard ISO/EPA-oriented kits and essentials', 'Clear customer segments and use cases', 'Repeatable consumable demand']),
      section('Technical and commercial support', 'The strongest distribution programs make it easier to sell, train and support customers without increasing operational friction.', ['Technical onboarding and product training', 'Sales material and multilingual content', 'Quote, demo and support handover', 'Optional OEM or private-label route']),
      section('Digital differentiation', 'A connected platform can make the offer stronger by linking product use with traceability, reporting, CRM and customer communication.')
    ], { eyebrow: 'Distributor guide', primaryCta: 'Discuss distribution', secondaryCta: 'View OEM program', seoTitle: 'Water Testing Kit Distributor Checklist | AquaVerify OEM', faqs: [
      { question: 'Can distributors sell AquaVerify under their own brand?', answer: 'AquaVerify can evaluate OEM or private-label supply depending on product scope, territory, volumes and technical requirements.' },
      { question: 'Why does software matter for distributors?', answer: 'Software can help distributors move beyond a product-only catalogue by offering customers traceability, reporting and connected service workflows.' }
    ] }),
    es: locale('/es/recursos/checklist-distribuidores-kits-analisis-agua', 'Checklist para distribuidores de kits de análisis de agua', 'Checklist práctica para distribuidores científicos que evalúan kits de microbiología del agua, opciones OEM y flujos digitales conectados.', [
      section('Encaje de portfolio', 'El distribuidor debe validar primero si la gama añade una historia clara de microbiología del agua a su catálogo actual.', ['Familias de producto cuantitativas y cualitativas', 'Kits orientados a ISO/EPA y essentials', 'Segmentos cliente y casos de uso claros', 'Demanda recurrente de consumibles']),
      section('Soporte técnico y comercial', 'Los programas de distribución más fuertes facilitan vender, formar y dar soporte a clientes sin aumentar fricción operativa.', ['Onboarding técnico y formación de producto', 'Material comercial y contenido multilingüe', 'Traspaso de cotización, demo y soporte', 'Ruta opcional OEM o marca blanca']),
      section('Diferenciación digital', 'Una plataforma conectada puede hacer la oferta más fuerte al vincular uso de producto con trazabilidad, reporting, CRM y comunicación cliente.')
    ], { eyebrow: 'Guía distribuidor', primaryCta: 'Hablar de distribución', secondaryCta: 'Ver programa OEM', seoTitle: 'Checklist distribuidores kits análisis de agua | AquaVerify OEM', faqs: [
      { question: '¿Los distribuidores pueden vender AquaVerify bajo su propia marca?', answer: 'AquaVerify puede evaluar suministro OEM o marca blanca según alcance de producto, territorio, volúmenes y requisitos técnicos.' },
      { question: '¿Por qué importa el software para distribuidores?', answer: 'El software ayuda a pasar de un catálogo solo de productos a una oferta con trazabilidad, reporting y flujos de servicio conectados.' }
    ] }),
    fr: locale('/fr/ressources/checklist-distributeurs-kits-analyse-eau', 'Checklist pour distributeurs de kits d’analyse de l’eau', 'Checklist pratique pour distributeurs scientifiques évaluant kits de microbiologie de l’eau, options OEM et flux logiciels connectés.', [
      section('Adéquation portefeuille', 'Le distributeur doit d’abord valider si la gamme ajoute une histoire claire de microbiologie de l’eau à son catalogue existant.', ['Familles produit quantitatives et qualitatives', 'Kits orientés ISO/EPA et essentiels', 'Segments clients et cas d’usage clairs', 'Demande récurrente de consommables']),
      section('Support technique et commercial', 'Les meilleurs programmes de distribution facilitent la vente, la formation et le support client sans augmenter la friction opérationnelle.', ['Onboarding technique et formation produit', 'Supports commerciaux et contenu multilingue', 'Passage de devis, démo et support', 'Route optionnelle OEM ou marque blanche']),
      section('Différenciation numérique', 'Une plateforme connectée peut renforcer l’offre en reliant utilisation produit, traçabilité, reporting, CRM et communication client.')
    ], { eyebrow: 'Guide distributeur', primaryCta: 'Discuter distribution', secondaryCta: 'Voir programme OEM', seoTitle: 'Checklist distributeurs kits analyse eau | AquaVerify OEM', faqs: [
      { question: 'Les distributeurs peuvent-ils vendre AquaVerify sous leur propre marque?', answer: 'AquaVerify peut évaluer un approvisionnement OEM ou marque blanche selon périmètre produit, territoire, volumes et exigences techniques.' },
      { question: 'Pourquoi le logiciel compte-t-il pour les distributeurs?', answer: 'Le logiciel peut aider à dépasser un catalogue uniquement produit en offrant traçabilité, reporting et flux de service connectés.' }
    ] }),
    it: locale('/it/risorse/checklist-distributori-kit-analisi-acqua', 'Checklist per distributori di kit analisi acqua', 'Checklist pratica per distributori scientifici che valutano kit di microbiologia dell’acqua, opzioni OEM e flussi software collegati.', [
      section('Coerenza di portfolio', 'Il distributore dovrebbe prima validare se la gamma aggiunge una storia chiara di microbiologia dell’acqua al catalogo esistente.', ['Famiglie prodotto quantitative e qualitative', 'Kit orientati a ISO/EPA ed essentials', 'Segmenti cliente e casi d’uso chiari', 'Domanda ricorrente di consumabili']),
      section('Supporto tecnico e commerciale', 'I programmi di distribuzione più forti facilitano vendita, formazione e supporto clienti senza aumentare la frizione operativa.', ['Onboarding tecnico e formazione prodotto', 'Materiale commerciale e contenuti multilingue', 'Passaggio di preventivo, demo e supporto', 'Percorso opzionale OEM o private label']),
      section('Differenziazione digitale', 'Una piattaforma collegata può rendere l’offerta più forte collegando uso del prodotto, tracciabilità, reporting, CRM e comunicazione cliente.')
    ], { eyebrow: 'Guida distributori', primaryCta: 'Discuti distribuzione', secondaryCta: 'Vedi programma OEM', seoTitle: 'Checklist distributori kit analisi acqua | AquaVerify OEM', faqs: [
      { question: 'I distributori possono vendere AquaVerify con il proprio brand?', answer: 'AquaVerify può valutare fornitura OEM o private label in base a perimetro prodotto, territorio, volumi e requisiti tecnici.' },
      { question: 'Perché il software conta per i distributori?', answer: 'Il software può aiutare a superare un catalogo solo prodotto offrendo tracciabilità, reporting e flussi di servizio collegati.' }
    ] }),
    ca: locale('/ca/recursos/checklist-distribuidors-kits-analisi-aigua', 'Checklist per a distribuïdors de kits d’anàlisi d’aigua', 'Checklist pràctica per a distribuïdors científics que avaluen kits de microbiologia de l’aigua, opcions OEM i fluxos digitals connectats.', [
      section('Encaix de portfolio', 'El distribuïdor ha de validar primer si la gamma afegeix una història clara de microbiologia de l’aigua al seu catàleg actual.', ['Famílies de producte quantitatives i qualitatives', 'Kits orientats a ISO/EPA i essentials', 'Segments client i casos d’ús clars', 'Demanda recurrent de consumibles']),
      section('Suport tècnic i comercial', 'Els programes de distribució més forts faciliten vendre, formar i donar suport a clients sense augmentar fricció operativa.', ['Onboarding tècnic i formació de producte', 'Material comercial i contingut multilingüe', 'Traspàs de pressupost, demo i suport', 'Ruta opcional OEM o marca blanca']),
      section('Diferenciació digital', 'Una plataforma connectada pot fer l’oferta més forta vinculant ús de producte amb traçabilitat, reporting, CRM i comunicació client.')
    ], { eyebrow: 'Guia distribuïdor', primaryCta: 'Parlar de distribució', secondaryCta: 'Veure programa OEM', seoTitle: 'Checklist distribuïdors kits anàlisi aigua | AquaVerify OEM', faqs: [
      { question: 'Els distribuïdors poden vendre AquaVerify sota la seva pròpia marca?', answer: 'AquaVerify pot avaluar subministrament OEM o marca blanca segons abast de producte, territori, volums i requisits tècnics.' },
      { question: 'Per què importa el software per a distribuïdors?', answer: 'El software pot ajudar a passar d’un catàleg només de productes a una oferta amb traçabilitat, reporting i fluxos de servei connectats.' }
    ] })
  }, { parentId: 'resources' }),
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

const INDUSTRY_PAGE_DATA = [
  {
    id: 'municipal-water-testing',
    paths: {
      en: '/industries/municipal-water-testing',
      es: '/es/industrias/analisis-agua-municipal',
      fr: '/fr/industries/analyse-eau-municipale',
      it: '/it/settori/analisi-acqua-municipale',
      ca: '/ca/sectors/analisi-aigua-municipal'
    },
    titles: {
      en: 'Municipal water testing workflows with traceable reporting',
      es: 'Flujos de análisis de agua municipal con reporting trazable',
      fr: 'Flux d’analyse de l’eau municipale avec rapports traçables',
      it: 'Workflow di analisi dell’acqua municipale con report tracciabili',
      ca: 'Fluxos d’anàlisi d’aigua municipal amb reporting traçable'
    },
    descriptions: {
      en: 'AquaVerify helps municipalities and public laboratories connect water microbiology products, partners and digital reporting workflows.',
      es: 'AquaVerify ayuda a municipios y laboratorios públicos a conectar productos de microbiología del agua, partners y reporting digital.',
      fr: 'AquaVerify aide municipalités et laboratoires publics à connecter produits de microbiologie de l’eau, partenaires et rapports numériques.',
      it: 'AquaVerify aiuta comuni e laboratori pubblici a collegare prodotti di microbiologia dell’acqua, partner e reporting digitale.',
      ca: 'AquaVerify ajuda municipis i laboratoris públics a connectar productes de microbiologia de l’aigua, partners i reporting digital.'
    },
    sections: {
      en: [
        section('For public water quality operations', 'Municipal teams need reliable sampling context, clear reporting and coordination between field teams, laboratories and decision makers.', ['Drinking water monitoring workflows', 'Public laboratory coordination', 'Recurring sampling programs', 'Traceable reports for stakeholders']),
        section('Products and platform together', 'AquaVerify connects kits, lab essentials and AquaVerify Cloud so each sample, operator, result and report can stay linked.')
      ],
      es: [
        section('Para operaciones públicas de calidad del agua', 'Los equipos municipales necesitan contexto de muestra fiable, reporting claro y coordinación entre campo, laboratorio y responsables.', ['Flujos de monitorización de agua potable', 'Coordinación con laboratorio público', 'Programas recurrentes de muestreo', 'Informes trazables para stakeholders']),
        section('Productos y plataforma juntos', 'AquaVerify conecta kits, lab essentials y AquaVerify Cloud para mantener vinculados muestra, operador, resultado e informe.')
      ],
      fr: [
        section('Pour les opérations publiques de qualité de l’eau', 'Les équipes municipales ont besoin d’un contexte échantillon fiable, de rapports clairs et de coordination entre terrain, laboratoire et décideurs.', ['Flux de surveillance eau potable', 'Coordination laboratoire public', 'Programmes d’échantillonnage récurrents', 'Rapports traçables pour parties prenantes']),
        section('Produits et plateforme ensemble', 'AquaVerify connecte kits, lab essentials et AquaVerify Cloud afin de relier échantillon, opérateur, résultat et rapport.')
      ],
      it: [
        section('Per operazioni pubbliche di qualità dell’acqua', 'I team municipali richiedono contesto campione affidabile, report chiari e coordinamento tra campo, laboratorio e responsabili.', ['Workflow monitoraggio acqua potabile', 'Coordinamento laboratorio pubblico', 'Programmi ricorrenti di campionamento', 'Report tracciabili per stakeholder']),
        section('Prodotti e piattaforma insieme', 'AquaVerify collega kit, lab essentials e AquaVerify Cloud per mantenere collegati campione, operatore, risultato e report.')
      ],
      ca: [
        section('Per a operacions públiques de qualitat de l’aigua', 'Els equips municipals necessiten context de mostra fiable, reporting clar i coordinació entre camp, laboratori i responsables.', ['Fluxos de monitoratge d’aigua potable', 'Coordinació amb laboratori públic', 'Programes recurrents de mostreig', 'Informes traçables per a stakeholders']),
        section('Productes i plataforma junts', 'AquaVerify connecta kits, lab essentials i AquaVerify Cloud per mantenir vinculats mostra, operador, resultat i informe.')
      ]
    },
    ctas: {
      en: ['Discuss municipal workflow', 'View products'],
      es: ['Hablar de flujo municipal', 'Ver productos'],
      fr: ['Discuter flux municipal', 'Voir produits'],
      it: ['Discuti flusso municipale', 'Vedi prodotti'],
      ca: ['Parlar de flux municipal', 'Veure productes']
    }
  },
  {
    id: 'food-beverage-water-quality',
    paths: {
      en: '/industries/food-beverage-water-quality',
      es: '/es/industrias/calidad-agua-alimentacion-bebidas',
      fr: '/fr/industries/qualite-eau-agroalimentaire',
      it: '/it/settori/qualita-acqua-alimenti-bevande',
      ca: '/ca/sectors/qualitat-aigua-alimentacio-begudes'
    },
    titles: {
      en: 'Water quality control for food and beverage operations',
      es: 'Control de calidad del agua para alimentación y bebidas',
      fr: 'Contrôle qualité de l’eau pour l’agroalimentaire',
      it: 'Controllo qualità dell’acqua per food & beverage',
      ca: 'Control de qualitat de l’aigua per a alimentació i begudes'
    },
    descriptions: {
      en: 'Connect water quality requests, laboratory partners, microbiology products and digital reports for food and beverage quality teams.',
      es: 'Conecta solicitudes de calidad del agua, partners de laboratorio, productos de microbiología e informes digitales para equipos de alimentación y bebidas.',
      fr: 'Connectez demandes qualité eau, partenaires laboratoire, produits de microbiologie et rapports numériques pour équipes agroalimentaires.',
      it: 'Collega richieste qualità acqua, partner di laboratorio, prodotti di microbiologia e report digitali per team food & beverage.',
      ca: 'Connecta sol·licituds de qualitat de l’aigua, partners de laboratori, productes de microbiologia i informes digitals per a equips d’alimentació i begudes.'
    },
    sections: {
      en: [
        section('For operational quality teams', 'Food and beverage teams need water quality workflows that are repeatable, documented and easy to coordinate with internal or external laboratories.', ['Process water checks', 'Supplier and laboratory coordination', 'Recurring monitoring schedules', 'Digital report history']),
        section('From request to report', 'AquaVerify helps structure each request, link it to products or laboratory work and keep outcomes visible in the platform.')
      ],
      es: [
        section('Para equipos de calidad operativa', 'Los equipos de alimentación y bebidas necesitan flujos de calidad del agua repetibles, documentados y fáciles de coordinar con laboratorios internos o externos.', ['Controles de agua de proceso', 'Coordinación con proveedores y laboratorios', 'Calendarios de monitorización recurrente', 'Historial digital de informes']),
        section('De la solicitud al informe', 'AquaVerify ayuda a estructurar cada solicitud, vincularla a productos o trabajo de laboratorio y mantener los resultados visibles en la plataforma.')
      ],
      fr: [
        section('Pour équipes qualité opérationnelle', 'Les équipes agroalimentaires ont besoin de flux qualité eau répétables, documentés et faciles à coordonner avec laboratoires internes ou externes.', ['Contrôles eau de process', 'Coordination fournisseurs et laboratoires', 'Calendriers de surveillance récurrente', 'Historique numérique des rapports']),
        section('De la demande au rapport', 'AquaVerify aide à structurer chaque demande, la relier aux produits ou au travail laboratoire et garder les résultats visibles dans la plateforme.')
      ],
      it: [
        section('Per team qualità operativa', 'I team food & beverage richiedono flussi qualità acqua ripetibili, documentati e facili da coordinare con laboratori interni o esterni.', ['Controlli acqua di processo', 'Coordinamento fornitori e laboratori', 'Calendari di monitoraggio ricorrente', 'Storico digitale dei report']),
        section('Dalla richiesta al report', 'AquaVerify aiuta a strutturare ogni richiesta, collegarla a prodotti o lavoro di laboratorio e mantenere gli esiti visibili in piattaforma.')
      ],
      ca: [
        section('Per a equips de qualitat operativa', 'Els equips d’alimentació i begudes necessiten fluxos de qualitat de l’aigua repetibles, documentats i fàcils de coordinar amb laboratoris interns o externs.', ['Controls d’aigua de procés', 'Coordinació amb proveïdors i laboratoris', 'Calendaris de monitoratge recurrent', 'Historial digital d’informes']),
        section('De la sol·licitud a l’informe', 'AquaVerify ajuda a estructurar cada sol·licitud, vincular-la a productes o treball de laboratori i mantenir els resultats visibles a la plataforma.')
      ]
    },
    ctas: {
      en: ['Ask for quality workflow fit', 'View platform'],
      es: ['Pedir encaje de flujo calidad', 'Ver plataforma'],
      fr: ['Demander un cadrage qualité', 'Voir plateforme'],
      it: ['Chiedi inquadramento qualità', 'Vedi piattaforma'],
      ca: ['Demanar encaix de flux qualitat', 'Veure plataforma']
    }
  },
  {
    id: 'industrial-process-water',
    paths: {
      en: '/industries/industrial-process-water',
      es: '/es/industrias/agua-proceso-industrial',
      fr: '/fr/industries/eau-process-industriel',
      it: '/it/settori/acqua-processo-industriale',
      ca: '/ca/sectors/aigua-proces-industrial'
    },
    titles: {
      en: 'Industrial process water monitoring with digital traceability',
      es: 'Monitorización de agua de proceso industrial con trazabilidad digital',
      fr: 'Surveillance eau de process industriel avec traçabilité numérique',
      it: 'Monitoraggio acqua di processo industriale con tracciabilità digitale',
      ca: 'Monitoratge d’aigua de procés industrial amb traçabilitat digital'
    },
    descriptions: {
      en: 'AquaVerify helps industrial teams coordinate water quality checks, laboratory work, reports and recurring monitoring in one connected workflow.',
      es: 'AquaVerify ayuda a equipos industriales a coordinar controles de calidad del agua, trabajo de laboratorio, informes y monitorización recurrente.',
      fr: 'AquaVerify aide les équipes industrielles à coordonner contrôles qualité eau, travail laboratoire, rapports et surveillance récurrente.',
      it: 'AquaVerify aiuta i team industriali a coordinare controlli qualità acqua, lavoro di laboratorio, report e monitoraggio ricorrente.',
      ca: 'AquaVerify ajuda equips industrials a coordinar controls de qualitat de l’aigua, treball de laboratori, informes i monitoratge recurrent.'
    },
    sections: {
      en: [
        section('For plants and technical operations', 'Industrial teams need a practical way to request tests, manage suppliers, follow reports and keep a traceable history of water quality work.', ['Process water checkpoints', 'Supplier and lab coordination', 'Recurring task planning', 'Centralized report access']),
        section('A platform-backed workflow', 'AquaVerify Cloud keeps context around sites, samples, operators, documents and customer-facing reports.')
      ],
      es: [
        section('Para plantas y operaciones técnicas', 'Los equipos industriales necesitan una forma práctica de solicitar análisis, gestionar proveedores, seguir informes y mantener historial trazable.', ['Puntos de control de agua de proceso', 'Coordinación con proveedores y laboratorio', 'Planificación de tareas recurrentes', 'Acceso centralizado a informes']),
        section('Un flujo apoyado por plataforma', 'AquaVerify Cloud mantiene contexto sobre puntos, muestras, operadores, documentos e informes para cliente.')
      ],
      fr: [
        section('Pour sites et opérations techniques', 'Les équipes industrielles ont besoin d’un moyen pratique pour demander analyses, gérer fournisseurs, suivre rapports et garder un historique traçable.', ['Points de contrôle eau de process', 'Coordination fournisseurs et laboratoire', 'Planification de tâches récurrentes', 'Accès centralisé aux rapports']),
        section('Un flux appuyé par plateforme', 'AquaVerify Cloud conserve le contexte sites, échantillons, opérateurs, documents et rapports client.')
      ],
      it: [
        section('Per impianti e operazioni tecniche', 'I team industriali richiedono un modo pratico per richiedere analisi, gestire fornitori, seguire report e mantenere storico tracciabile.', ['Punti controllo acqua di processo', 'Coordinamento fornitori e laboratorio', 'Pianificazione attività ricorrenti', 'Accesso centralizzato ai report']),
        section('Un flusso supportato dalla piattaforma', 'AquaVerify Cloud mantiene contesto su siti, campioni, operatori, documenti e report per cliente.')
      ],
      ca: [
        section('Per a plantes i operacions tècniques', 'Els equips industrials necessiten una forma pràctica de sol·licitar anàlisis, gestionar proveïdors, seguir informes i mantenir historial traçable.', ['Punts de control d’aigua de procés', 'Coordinació amb proveïdors i laboratori', 'Planificació de tasques recurrents', 'Accés centralitzat a informes']),
        section('Un flux recolzat per plataforma', 'AquaVerify Cloud manté context sobre punts, mostres, operadors, documents i informes per a client.')
      ]
    },
    ctas: {
      en: ['Discuss process water workflow', 'Explore SaaS'],
      es: ['Hablar de flujo industrial', 'Explorar SaaS'],
      fr: ['Discuter flux industriel', 'Explorer SaaS'],
      it: ['Discuti flusso industriale', 'Esplora SaaS'],
      ca: ['Parlar de flux industrial', 'Explorar SaaS']
    }
  },
  {
    id: 'facility-water-risk',
    paths: {
      en: '/industries/facility-water-risk-management',
      es: '/es/industrias/gestion-riesgo-agua-instalaciones',
      fr: '/fr/industries/gestion-risque-eau-batiments',
      it: '/it/settori/gestione-rischio-acqua-strutture',
      ca: '/ca/sectors/gestio-risc-aigua-installacions'
    },
    titles: {
      en: 'Facility water risk workflows for buildings and sites',
      es: 'Flujos de riesgo del agua para edificios e instalaciones',
      fr: 'Flux de risque eau pour bâtiments et sites',
      it: 'Workflow rischio acqua per edifici e strutture',
      ca: 'Fluxos de risc de l’aigua per a edificis i instal·lacions'
    },
    descriptions: {
      en: 'Coordinate water quality requests, laboratory reports and recurring monitoring for buildings, facilities and managed sites.',
      es: 'Coordina solicitudes de calidad del agua, informes de laboratorio y monitorización recurrente para edificios, instalaciones y activos gestionados.',
      fr: 'Coordonnez demandes qualité eau, rapports laboratoire et surveillance récurrente pour bâtiments, installations et sites gérés.',
      it: 'Coordina richieste qualità acqua, report di laboratorio e monitoraggio ricorrente per edifici, strutture e siti gestiti.',
      ca: 'Coordina sol·licituds de qualitat de l’aigua, informes de laboratori i monitoratge recurrent per a edificis, instal·lacions i actius gestionats.'
    },
    sections: {
      en: [
        section('For recurring site control', 'Facility teams need visibility over what has been sampled, who performed the work, where reports are stored and what needs follow-up.', ['Managed site records', 'Recurring monitoring tasks', 'Supplier and laboratory coordination', 'Report history by asset or site']),
        section('Keep evidence organized', 'AquaVerify connects products, laboratories and platform workflows so water quality activity is easier to review and share.')
      ],
      es: [
        section('Para control recurrente de instalaciones', 'Los equipos de facility necesitan visibilidad sobre qué se ha muestreado, quién realizó el trabajo, dónde están los informes y qué requiere seguimiento.', ['Registros por instalación', 'Tareas recurrentes de monitorización', 'Coordinación con proveedores y laboratorio', 'Historial de informes por activo o punto']),
        section('Mantener la evidencia organizada', 'AquaVerify conecta productos, laboratorios y flujos de plataforma para que la actividad de calidad del agua sea más fácil de revisar y compartir.')
      ],
      fr: [
        section('Pour contrôle récurrent de sites', 'Les équipes facility ont besoin de visibilité sur ce qui a été échantillonné, qui a réalisé le travail, où sont les rapports et ce qui demande suivi.', ['Registres par site', 'Tâches de surveillance récurrentes', 'Coordination fournisseurs et laboratoire', 'Historique rapports par actif ou site']),
        section('Garder les preuves organisées', 'AquaVerify connecte produits, laboratoires et flux plateforme afin que l’activité qualité eau soit plus facile à revoir et partager.')
      ],
      it: [
        section('Per controllo ricorrente dei siti', 'I team facility richiedono visibilità su cosa è stato campionato, chi ha eseguito il lavoro, dove sono i report e cosa richiede follow-up.', ['Record per sito', 'Attività ricorrenti di monitoraggio', 'Coordinamento fornitori e laboratorio', 'Storico report per asset o sito']),
        section('Tenere le evidenze organizzate', 'AquaVerify collega prodotti, laboratori e flussi piattaforma affinché l’attività qualità acqua sia più semplice da rivedere e condividere.')
      ],
      ca: [
        section('Per a control recurrent d’instal·lacions', 'Els equips de facility necessiten visibilitat sobre què s’ha mostrejat, qui ha fet el treball, on són els informes i què requereix seguiment.', ['Registres per instal·lació', 'Tasques recurrents de monitoratge', 'Coordinació amb proveïdors i laboratori', 'Historial d’informes per actiu o punt']),
        section('Mantenir l’evidència organitzada', 'AquaVerify connecta productes, laboratoris i fluxos de plataforma perquè l’activitat de qualitat de l’aigua sigui més fàcil de revisar i compartir.')
      ]
    },
    ctas: {
      en: ['Ask for facility workflow fit', 'Contact AquaVerify'],
      es: ['Pedir encaje para instalaciones', 'Contactar con AquaVerify'],
      fr: ['Demander cadrage installations', 'Contacter AquaVerify'],
      it: ['Chiedi inquadramento strutture', 'Contatta AquaVerify'],
      ca: ['Demanar encaix per instal·lacions', 'Contactar amb AquaVerify']
    }
  }
];

function buildIndustryFaqs(item, lang) {
  const common = {
    en: [
      { question: `Can AquaVerify support ${item.titles.en.toLowerCase()}?`, answer: item.descriptions.en },
      { question: 'Does the workflow include digital traceability?', answer: 'Yes. AquaVerify Cloud can connect samples, operators, reports, customer context and CRM attribution in one operational workflow.' }
    ],
    es: [
      { question: `¿Puede AquaVerify apoyar ${item.titles.es.toLowerCase()}?`, answer: item.descriptions.es },
      { question: '¿El flujo incluye trazabilidad digital?', answer: 'Sí. AquaVerify Cloud puede conectar muestras, operadores, informes, contexto de cliente y atribución CRM en un mismo flujo operativo.' }
    ],
    fr: [
      { question: `AquaVerify peut-il accompagner ${item.titles.fr.toLowerCase()} ?`, answer: item.descriptions.fr },
      { question: 'Le flux inclut-il la traçabilité numérique ?', answer: 'Oui. AquaVerify Cloud peut connecter échantillons, opérateurs, rapports, contexte client et attribution CRM dans un même flux opérationnel.' }
    ],
    it: [
      { question: `AquaVerify può supportare ${item.titles.it.toLowerCase()}?`, answer: item.descriptions.it },
      { question: 'Il flusso include tracciabilità digitale?', answer: 'Sì. AquaVerify Cloud può collegare campioni, operatori, report, contesto cliente e attribuzione CRM in un unico flusso operativo.' }
    ],
    ca: [
      { question: `AquaVerify pot donar suport a ${item.titles.ca.toLowerCase()}?`, answer: item.descriptions.ca },
      { question: 'El flux inclou traçabilitat digital?', answer: 'Sí. AquaVerify Cloud pot connectar mostres, operadors, informes, context de client i atribució CRM en un mateix flux operatiu.' }
    ]
  };
  return common[lang] || common.en;
}

function buildIndustryPages() {
  return INDUSTRY_PAGE_DATA.map((item) => page(
    item.id,
    'industries',
    'contact',
    Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, locale(
      item.paths[lang],
      item.titles[lang],
      item.descriptions[lang],
      item.sections[lang],
      {
        eyebrow: 'Industry',
        primaryCta: item.ctas[lang][0],
        secondaryCta: item.ctas[lang][1],
        seoTitle: `${item.titles[lang]} | AquaVerify`,
        seoDescription: item.descriptions[lang],
        faqs: buildIndustryFaqs(item, lang)
      }
    )])),
    { parentId: 'water-quality-control' }
  ));
}

MARKETING_PAGES.push(...buildIndustryPages());

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
  bacterialIndicators: {
    en: 'bacterial indicator workflows pending final parameter validation',
    es: 'flujos de indicadores bacterianos pendientes de validación final de parámetro',
    fr: 'flux d’indicateurs bactériens en attente de validation finale du paramètre',
    it: 'flussi di indicatori batterici in attesa di validazione finale del parametro',
    ca: 'fluxos d’indicadors bacterians pendents de validació final del paràmetre'
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
  { id: 'enumera-coli100', parentId: 'enumera', slug: 'enumera-coli100', name: 'ENUMERA Coli100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.bacterialIndicators, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'enumera-entero100', parentId: 'enumera', slug: 'enumera-entero100', name: 'ENUMERA Entero100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.bacterialIndicators, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
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
