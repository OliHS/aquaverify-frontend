import { WATER_QUALITY_CONTROL_PAGE } from '../waterQualityControlContent.js';
import { FOOD_BEVERAGE_WATER_PAGE } from '../foodBeverageWaterContent.js';
import { INDUSTRIAL_PROCESS_WATER_PAGE } from '../industrialProcessWaterContent.js';
import { FACILITY_WATER_RISK_PAGE } from '../facilityWaterRiskContent.js';
import { AGRICULTURE_WATER_PAGE } from '../agricultureWaterContent.js';
import { PHARMA_COSMETICS_WATER_PAGE } from '../pharmaCosmeticsWaterContent.js';
import { HOSPITALITY_TOURISM_WATER_PAGE } from '../hospitalityTourismWaterContent.js';
import { INDUSTRIES_HUB_PAGE } from '../industriesHubContent.js';
import { MARKETING_LANGUAGES, locale, page, section } from './shared.js';

function withAnswerLayer(content, directAnswer, technicalTable) {
  return {
    ...content,
    ...(directAnswer ? { directAnswer } : {}),
    ...(technicalTable ? { technicalTable } : {})
  };
}

export const INDUSTRY_ENTRY_MARKETING_PAGES = [
  page('industries-hub', 'industries', 'contact', Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [
    lang,
    INDUSTRIES_HUB_PAGE[lang]
  ]))),
  page('water-testing-labs', 'industries', 'quote', {
    en: withAnswerLayer(locale('/industries/water-testing-laboratories', 'Water testing laboratories: more capacity, traceability and confidence in every report', 'AquaVerify connects water microbiology kits, somatic coliphage control, sample-to-report digital workflows, CoA reporting and customer portal for laboratories that need reliable results without extra administrative load.', [
      section('The challenge for water testing laboratories', 'Water testing laboratories are receiving more samples, more matrices and more documentation requirements. Pressure appears when volume grows, TAT becomes tighter and every result must be defendable for customers, audits and technical managers.', ['More sample volume with the same team: organize intake, bench work, review and delivery without adding manual coordination.', 'Evidence spread across bench, quality and report: keep sample, method, batch, user, reading and validation connected.', 'Customers ask for more visibility: provide clear status, history and deliverables without endless operational emails.', 'Chain of custody and CoA reporting: make each result easier to review, explain and retrieve.']),
      section('A connected workflow for water microbiology', 'AquaVerify links product, execution, data and customer delivery in a practical system for laboratories that want to standardize operations, expand services and reduce friction when issuing results.', ['Laboratory management: capacity, turnaround time and new service lines.', 'Quality teams: records by user, batch, method, sample and technical review.', 'Microbiology teams: kits, ready-to-use media and guided execution steps.', 'B2B customers: status, reports, history and clearer communication.']),
      section('From sample to CoA report', 'Each stage of the analysis can be connected to the next one so the laboratory works with less friction and with evidence ready for technical review.', ['Request and registration: customer, site, matrix, method and expected deliverable.', 'Reception and custody: sample status, conditions, labels and chain of custody.', 'Preparation and testing: kit, medium, batch, operator and guided bench workflow.', 'Reading and evidence: result, interpretation, traceability and supporting information.', 'Technical review: controlled validation before customer delivery.', 'Report and portal: CoA, history, customer access and communication.']),
      section('What to activate according to matrix, volume and customer type', 'The laboratory can combine kits, media, digital traceability and reporting according to method, sample volume and service level promised to the customer.', ['Presence/absence workflows: INDICA Soma 100 mL for simple screening paths.', 'Enumeration workflows: ENUMERA Soma 100 mL for agile quantitative routines.', 'Plaque workflows: PLAQUE Soma 1 mL and 100 mL for plate-based methods.', 'Digital delivery: AquaVerify Cloud, App, CoA and portal for B2B reporting.']),
      section('Roadmap for a more scalable laboratory service', 'AquaVerify can be adopted in stages: first organize the workflow, then digitize evidence, then differentiate customer delivery.', ['Workflow diagnosis: map matrices, volumes, methods, bottlenecks and customer needs.', 'Technical standardization: align products, media, batches and operating steps.', 'Digital records: connect sample, execution, reading, review and report.', 'Customer portal: give B2B customers structured history and deliverables.', 'Service scaling: add new microbiology services without multiplying administration.']),
      section('Products and modules for water laboratories', 'Modules can be adopted progressively: from kits and media to digital traceability, reporting and customer portal.', ['ENUMERA Soma 100 mL: quantitative workflow for somatic coliphages.', 'PLAQUE Soma 1 mL: plate workflow for concentrated contexts.', 'PLAQUE Soma 100 mL: plate workflow for larger-volume scenarios.', 'INDICA Soma 100 mL: presence/absence screening path.', 'Ready-to-use MSA and MSB: prepared media for routine execution.', 'AquaVerify Cloud, App and CoA: digital sample, report and customer workflow.']),
      section('Customers with demanding water-control requirements', 'The solution helps laboratories respond more clearly to customers that need traceable, repeatable and easy-to-interpret results.', ['Utilities and public administration: routine monitoring, evidence and reporting.', 'Food and beverage: process water, hygiene plans and quality programs.', 'Treatment and reuse: operational checks, deviations and follow-up.', 'Agriculture, aquaculture and seafood: preventive monitoring and water-risk control.']),
      section('Shared traceability across sample, test and report', 'When sample, test and report share traceability, the laboratory reduces ambiguity, organizes technical review and delivers more consistent information to customers.', ['Digital chain of custody: sample status, site, location and handling.', 'Execution evidence: method, kit, batch, operator, reading and comments.', 'CoA reporting: structured deliverables for customer and audit review.', 'Customer portal: history, reports and communication in one place.', 'Modular adoption: start with one workflow and expand when useful.'])
    ], { eyebrow: 'Public and private water testing laboratories', primaryCta: 'Request technical diagnosis', secondaryCta: 'View sample-to-report flow', seoTitle: 'Water Testing Laboratories | AquaVerify', seoDescription: 'Solutions for water testing laboratories: microbiology kits, somatic coliphages, digital traceability, CoA reporting and customer portal.', faqs: [
      { question: 'Does AquaVerify integrate with a laboratory that already has a LIMS?', answer: 'Yes. AquaVerify Cloud can complement existing workflows and connect sample, lot, operator, method, result, review, CoA and customer portal. Integration or coexistence with a LIMS depends on requirements, historical data, users, internal validation, configuration and operational scope.' },
      { question: 'Which products are relevant for somatic coliphages in the laboratory?', answer: 'Depending on the workflow and the specific product, AquaVerify can provide families such as ENUMERA, INDICA, PLAQUE and Lab Essentials media for programmes where somatic coliphages are part of the microbiological approach. Fit should be reviewed according to matrix, method, volume, scope and internal procedure.' },
      { question: 'How can chain of custody, lot and result be documented?', answer: 'AquaVerify Cloud can help record request, reception, sampling point, chain of custody, lot, operator, method, reading, technical review, result and CoA report. Documentation depth depends on configuration, workflow and the laboratory quality system.' },
      { question: 'Does AquaVerify reduce laboratory turnaround time by itself?', answer: 'It should not be assumed by default. It may help reduce administrative friction, manual transcription and documentary review time, but the real impact depends on sample volume, method, matrix, staff, internal validation, integrations and current operating workflow.' },
      { question: 'How does AquaVerify fit with ISO/IEC 17025?', answer: 'AquaVerify can support traceability, records, review, evidence and reports within a quality system. It does not cover accreditation by itself or expand a laboratory scope; each use should align with methods, validations, procedures and documented scope when applicable.' }
    ] }), {
      title: 'How does AquaVerify help a water testing laboratory?',
      body: 'AquaVerify can help water testing laboratories combine microbiology products, screening or enumeration workflows, operational support and digital traceability with AquaVerify Cloud. The workflow can document sample, lot, method, operator, result, review and CoA. In accredited laboratory contexts, each use should align with method, matrix, validation and the laboratory scope.'
    }, {
      title: 'Laboratory need and related AquaVerify layer',
      columns: ['Laboratory need', 'Product or layer', 'Evidence that can be documented', 'Prudential note'],
      rows: [
        ['Screening', 'INDICA', 'Sample, lot, result and action', 'Depends on method and internal procedure'],
        ['Enumeration', 'ENUMERA', 'Reading, result, review and CoA', 'Depends on organism, matrix and method'],
        ['Reference-method workflows', 'ISO/EPA kits', 'Method, controls and evidence', 'Does not imply regulatory acceptance by itself'],
        ['Daily operation', 'Lab Essentials', 'Inventory, lot and SOP', 'Depends on the internal system'],
        ['Reporting', 'AquaVerify Cloud', 'Audit trail, CoA and portal', 'Configure according to process']
      ]
    }),
    es: withAnswerLayer(locale('/es/industrias/laboratorios-analisis-agua', 'Laboratorios de análisis de agua: más capacidad, trazabilidad y confianza en cada informe', 'AquaVerify conecta kits de microbiología, control de colífagos somáticos, flujos digitales de muestra a informe, reporting CoA y portal cliente para laboratorios que necesitan entregar resultados fiables sin añadir carga administrativa.', [
      section('El reto del laboratorio de agua', 'Los laboratorios de análisis de agua reciben más muestras, más matrices y más exigencias documentales. La presión aparece cuando el volumen crece, el TAT se estrecha y cada dato debe ser defendible ante clientes, auditorías y responsables técnicos.', ['Más volumen con el mismo equipo', 'Evidencia dispersa entre banco, calidad e informe', 'Clientes que piden más visibilidad', 'Cadena de custodia y reporting CoA']),
      section('Un flujo conectado para microbiología del agua', 'AquaVerify une producto, ejecución, datos y entrega al cliente en un sistema práctico para laboratorios que quieren estandarizar operaciones, ampliar servicios y reducir fricción en la emisión de resultados.', ['Dirección de laboratorio: capacidad, TAT y nuevas líneas de servicio', 'Calidad: registros por usuario, lote, método, muestra y revisión', 'Microbiología: kits, medios listos para usar y pasos guiados', 'Cliente B2B: estado, informes, histórico y comunicación clara']),
      section('De la muestra al informe CoA', 'Cada etapa del análisis puede quedar conectada con la siguiente para que el laboratorio trabaje con menos fricción y con evidencias listas para revisión técnica.', ['Solicitud y alta', 'Recepción y custodia', 'Preparación y ensayo', 'Lectura y evidencia', 'Revisión técnica', 'Informe y portal']),
      section('Qué activar según matriz, volumen y tipo de cliente', 'El laboratorio puede combinar kits, medios, trazabilidad digital y reporting según el método, el volumen de muestra y el nivel de servicio prometido al cliente.', ['INDICA Soma 100 mL para presencia/ausencia', 'ENUMERA Soma 100 mL para enumeración ágil', 'PLAQUE Soma 1 mL y 100 mL para flujos de placa', 'AquaVerify Cloud, App, CoA y portal para entrega B2B']),
      section('Roadmap para un servicio más escalable', 'AquaVerify permite avanzar por etapas: primero ordenar el flujo, después digitalizar evidencias, y finalmente diferenciar la entrega al cliente.', ['Diagnóstico del flujo', 'Estandarización técnica', 'Registro digital', 'Portal cliente', 'Escalado del servicio']),
      section('Productos y módulos para laboratorios de agua', 'Los módulos se pueden adoptar de forma progresiva: desde kits y medios hasta trazabilidad digital, reporting y portal cliente.', ['ENUMERA Soma 100 mL', 'PLAQUE Soma 1 mL', 'PLAQUE Soma 100 mL', 'INDICA Soma 100 mL', 'MSA y MSB listos para usar', 'AquaVerify Cloud, App y CoA']),
      section('Clientes con alta exigencia de control hídrico', 'La solución permite al laboratorio responder con más claridad a clientes que necesitan resultados trazables, repetibles y fáciles de interpretar.', ['Utilities y administración', 'Industria alimentaria y bebidas', 'Tratamiento y reutilización', 'Agricultura, acuicultura y seafood']),
      section('Trazabilidad compartida entre muestra, ensayo e informe', 'Cuando muestra, ensayo e informe comparten trazabilidad, el laboratorio reduce ambigüedad, organiza mejor la revisión técnica y entrega información más consistente a sus clientes.', ['Cadena de custodia digital', 'Evidencias de ejecución', 'Reporting CoA', 'Portal cliente', 'Adopción modular'])
    ], { eyebrow: 'Laboratorios públicos y privados de análisis de agua', primaryCta: 'Solicitar diagnóstico técnico', secondaryCta: 'Ver flujo muestra a informe', seoTitle: 'Laboratorios de análisis de agua | AquaVerify', seoDescription: 'Soluciones para laboratorios de análisis de agua: kits microbiológicos, colífagos somáticos, trazabilidad digital, reporting CoA y portal cliente.', faqs: [
      { question: '¿AquaVerify puede integrarse en un laboratorio que ya tiene LIMS?', answer: 'Sí. AquaVerify Cloud puede complementar flujos existentes y conectar muestra, lote, operador, método, resultado, revisión, CoA y portal cliente. La integración o convivencia con un LIMS depende de requisitos, datos históricos, usuarios, validación interna, configuración y alcance operativo del laboratorio.' },
      { question: '¿Qué productos son relevantes para colífagos somáticos en laboratorio?', answer: 'Según el flujo y el producto concreto, AquaVerify puede aportar familias como ENUMERA, INDICA, PLAQUE y medios Lab Essentials para programas donde los colífagos somáticos formen parte del enfoque microbiológico. El encaje debe revisarse según matriz, método, volumen, alcance y procedimiento interno.' },
      { question: '¿Cómo documentar cadena de custodia, lote y resultado?', answer: 'AquaVerify Cloud puede ayudar a registrar solicitud, recepción, punto de muestreo, cadena de custodia, lote, operador, método, lectura, revisión técnica, resultado e informe CoA. La profundidad documental depende de la configuración, el flujo de trabajo y el sistema de calidad del laboratorio.' },
      { question: '¿AquaVerify acorta por sí solo el tiempo de respuesta del laboratorio?', answer: 'No debe asumirse por defecto. Puede ayudar a reducir fricción administrativa, transcripción manual y tiempos de revisión documental, pero el impacto real depende del volumen de muestras, método, matriz, personal, validación interna, integraciones y flujo operativo actual.' },
      { question: '¿Cómo encaja AquaVerify con ISO/IEC 17025?', answer: 'AquaVerify puede apoyar trazabilidad, registros, revisión, evidencias e informes dentro de un sistema de calidad. No cubre por sí solo la acreditación ni amplía el alcance del laboratorio; cada uso debe alinearse con métodos, validaciones, procedimientos y alcance acreditado cuando aplique.' }
    ] }), {
      title: '¿Cómo ayuda AquaVerify a un laboratorio de análisis de agua?',
      body: 'AquaVerify puede ayudar a laboratorios de análisis de agua a combinar productos de microbiología, flujos de screening o enumeración, soporte operativo y trazabilidad digital con AquaVerify Cloud. La propuesta puede documentar muestra, lote, método, operador, resultado, revisión y CoA. En laboratorios acreditados, cada uso debe alinearse con método, matriz, validación y alcance del laboratorio.'
    }, {
      title: 'Necesidad del laboratorio y capa AquaVerify relacionada',
      columns: ['Necesidad del laboratorio', 'Producto o capa relacionada', 'Evidencia que puede documentarse', 'Nota prudente'],
      rows: [
        ['Screening', 'INDICA', 'Muestra, lote, resultado y acción', 'Depende del método y procedimiento interno'],
        ['Enumeración', 'ENUMERA', 'Lectura, resultado, revisión y CoA', 'Depende de organismo, matriz y método'],
        ['Métodos de referencia', 'Kits ISO/EPA', 'Método, controles y evidencia', 'No implica aceptación automática'],
        ['Operación diaria', 'Lab Essentials', 'Inventario, lote y SOP', 'Depende del sistema interno'],
        ['Reporting', 'AquaVerify Cloud', 'Audit trail, CoA y portal', 'Configurar según proceso']
      ]
    }),
    fr: withAnswerLayer(locale('/fr/industries/laboratoires-analyse-eau', 'Laboratoires d’analyse de l’eau : plus de capacité, de traçabilité et de confiance dans chaque rapport', 'AquaVerify relie kits de microbiologie de l’eau, contrôle des coliphages somatiques, flux numériques échantillon-rapport, reporting CoA et portail client pour les laboratoires qui doivent livrer des résultats fiables sans charge administrative supplémentaire.', [
      section('Le défi des laboratoires d’analyse de l’eau', 'Les laboratoires d’analyse de l’eau reçoivent davantage d’échantillons, de matrices et d’exigences documentaires. La pression augmente lorsque le volume progresse, que les délais se resserrent et que chaque résultat doit être défendable auprès des clients, auditeurs et responsables techniques.', ['Plus de volume avec la même équipe : organiser réception, paillasse, revue et livraison sans coordination manuelle supplémentaire.', 'Des preuves dispersées entre paillasse, qualité et rapport : relier échantillon, méthode, lot, utilisateur, lecture et validation.', 'Des clients qui demandent plus de visibilité : offrir statut, historique et livrables clairs sans multiplier les emails opérationnels.', 'Chaîne de traçabilité et reporting CoA : rendre chaque résultat plus facile à revoir, expliquer et retrouver.']),
      section('Un flux connecté pour la microbiologie de l’eau', 'AquaVerify relie produit, exécution, données et livraison client dans un système pratique pour les laboratoires qui veulent standardiser les opérations, développer leurs services et réduire les frictions lors de l’émission des résultats.', ['Direction de laboratoire : capacité, délai de rendu et nouvelles lignes de service.', 'Qualité : enregistrements par utilisateur, lot, méthode, échantillon et revue technique.', 'Microbiologie : kits, milieux prêts à l’emploi et étapes guidées.', 'Client B2B : statut, rapports, historique et communication plus claire.']),
      section('De l’échantillon au rapport CoA', 'Chaque étape de l’analyse peut être reliée à la suivante afin que le laboratoire travaille avec moins de friction et des preuves prêtes pour la revue technique.', ['Demande et enregistrement : client, site, matrice, méthode et livrable attendu.', 'Réception et traçabilité : statut échantillon, conditions, étiquettes et chaîne de traçabilité.', 'Préparation et essai : kit, milieu, lot, opérateur et flux de paillasse guidé.', 'Lecture et preuves : résultat, interprétation, traçabilité et informations associées.', 'Revue technique : validation contrôlée avant livraison client.', 'Rapport et portail : CoA, historique, accès client et communication.']),
      section('Quoi activer selon matrice, volume et type de client', 'Le laboratoire peut combiner kits, milieux, traçabilité numérique et reporting selon la méthode, le volume d’échantillon et le niveau de service promis au client.', ['Présence/absence : INDICA Soma 100 mL pour les flux de screening simples.', 'Dénombrement : ENUMERA Soma 100 mL pour les routines quantitatives agiles.', 'Plaque : PLAQUE Soma 1 mL et 100 mL pour les méthodes sur plaque.', 'Livraison numérique : AquaVerify Cloud, App, CoA et portail pour le reporting B2B.']),
      section('Roadmap pour un service laboratoire plus scalable', 'AquaVerify peut être adopté par étapes : d’abord organiser le flux, puis numériser les preuves, puis différencier la livraison client.', ['Diagnostic du flux : cartographier matrices, volumes, méthodes, goulets et besoins clients.', 'Standardisation technique : aligner produits, milieux, lots et étapes opératoires.', 'Enregistrements numériques : relier échantillon, exécution, lecture, revue et rapport.', 'Portail client : fournir aux clients B2B historique et livrables structurés.', 'Montée en charge du service : ajouter de nouveaux services microbiologiques sans multiplier l’administration.']),
      section('Produits et modules pour laboratoires d’eau', 'Les modules peuvent être adoptés progressivement : depuis les kits et milieux jusqu’à la traçabilité numérique, au reporting et au portail client.', ['ENUMERA Soma 100 mL : flux quantitatif pour coliphages somatiques.', 'PLAQUE Soma 1 mL : flux plaque pour contextes concentrés.', 'PLAQUE Soma 100 mL : flux plaque pour scénarios de volume plus élevé.', 'INDICA Soma 100 mL : parcours présence/absence.', 'MSA et MSB prêts à l’emploi : milieux préparés pour routine.', 'AquaVerify Cloud, App et CoA : flux numérique échantillon, rapport et client.']),
      section('Clients avec exigences élevées de contrôle de l’eau', 'La solution aide le laboratoire à répondre plus clairement aux clients qui ont besoin de résultats traçables, répétables et faciles à interpréter.', ['Utilities et administration publique : monitoring routinier, preuves et reporting.', 'Food & beverage : eau de process, plans d’hygiène et programmes qualité.', 'Traitement et réutilisation : contrôles opérationnels, écarts et suivi.', 'Agriculture, aquaculture et seafood : monitoring préventif et gestion du risque hydrique.']),
      section('Traçabilité partagée entre échantillon, essai et rapport', 'Lorsque l’échantillon, l’essai et le rapport partagent la même traçabilité, le laboratoire réduit l’ambiguïté, organise mieux la revue technique et livre une information plus cohérente aux clients.', ['Chaîne de traçabilité numérique : statut, site, emplacement et manipulation.', 'Preuves d’exécution : méthode, kit, lot, opérateur, lecture et commentaires.', 'Reporting CoA : livrables structurés pour client et audit.', 'Portail client : historique, rapports et communication au même endroit.', 'Adoption modulaire : commencer par un flux et étendre lorsque c’est utile.'])
    ], { eyebrow: 'Laboratoires publics et privés d’analyse de l’eau', primaryCta: 'Demander un diagnostic technique', secondaryCta: 'Voir le flux échantillon-rapport', seoTitle: 'Laboratoires d’analyse de l’eau | AquaVerify', seoDescription: 'Solutions pour laboratoires d’analyse de l’eau : kits microbiologiques, coliphages somatiques, traçabilité numérique, reporting CoA et portail client.', faqs: [
      { question: 'AquaVerify peut-il s’intégrer dans un laboratoire qui a déjà un LIMS ?', answer: 'Oui. AquaVerify Cloud peut compléter des flux existants et relier échantillon, lot, opérateur, méthode, résultat, revue, CoA et portail client. L’intégration ou la coexistence avec un LIMS dépend des exigences, données historiques, utilisateurs, validation interne, configuration et portée opérationnelle.' },
      { question: 'Quels produits sont pertinents pour les coliphages somatiques en laboratoire ?', answer: 'Selon le flux et le produit concret, AquaVerify peut apporter des familles comme ENUMERA, INDICA, PLAQUE et des milieux Lab Essentials pour les programmes où les coliphages somatiques font partie de l’approche microbiologique. L’adéquation doit être revue selon matrice, méthode, volume, portée et procédure interne.' },
      { question: 'Comment documenter chaîne de traçabilité, lot et résultat ?', answer: 'AquaVerify Cloud peut aider à enregistrer demande, réception, point de prélèvement, chaîne de traçabilité, lot, opérateur, méthode, lecture, revue technique, résultat et rapport CoA. La profondeur documentaire dépend de la configuration, du flux de travail et du système qualité du laboratoire.' },
      { question: 'AquaVerify réduit-il à lui seul le délai de rendu du laboratoire ?', answer: 'Il ne faut pas le présumer par défaut. Il peut aider à réduire la friction administrative, la saisie manuelle et le temps de revue documentaire, mais l’impact réel dépend du volume d’échantillons, de la méthode, de la matrice, du personnel, de la validation interne, des intégrations et du flux actuel.' },
      { question: 'Comment AquaVerify s’inscrit-il dans ISO/IEC 17025 ?', answer: 'AquaVerify peut accompagner traçabilité, enregistrements, revue, preuves et rapports dans un système qualité. Il ne couvre pas l’accréditation par lui-même et n’étend pas la portée du laboratoire ; chaque usage doit s’aligner avec méthodes, validations, procédures et portée documentée lorsque cela s’applique.' }
    ] }), {
      title: 'Comment AquaVerify aide-t-il un laboratoire d’analyse de l’eau ?',
      body: 'AquaVerify peut aider les laboratoires d’analyse de l’eau à combiner produits de microbiologie, flux de screening ou de dénombrement, support opérationnel et traçabilité numérique avec AquaVerify Cloud. Le flux peut documenter échantillon, lot, méthode, opérateur, résultat, revue et CoA. En contexte accrédité, chaque usage doit s’aligner avec méthode, matrice, validation et portée du laboratoire.'
    }, {
      title: 'Besoin du laboratoire et couche AquaVerify associée',
      columns: ['Besoin du laboratoire', 'Produit ou couche', 'Preuves pouvant être documentées', 'Note prudente'],
      rows: [
        ['Screening', 'INDICA', 'Échantillon, lot, résultat et action', 'Dépend de la méthode et de la procédure interne'],
        ['Dénombrement', 'ENUMERA', 'Lecture, résultat, revue et CoA', 'Dépend de l’organisme, de la matrice et de la méthode'],
        ['Flux avec méthodes de référence', 'Kits ISO/EPA', 'Méthode, contrôles et preuves', 'N’implique pas d’acceptation réglementaire par lui-même'],
        ['Opération quotidienne', 'Lab Essentials', 'Inventaire, lot et SOP', 'Dépend du système interne'],
        ['Reporting', 'AquaVerify Cloud', 'Audit trail, CoA et portail', 'À configurer selon le processus']
      ]
    }),
    it: withAnswerLayer(locale('/it/settori/laboratori-analisi-acqua', 'Laboratori di analisi dell’acqua: più capacità, tracciabilità e fiducia in ogni report', 'AquaVerify collega kit di microbiologia dell’acqua, controllo dei colifagi somatici, flussi digitali campione-report, reporting CoA e portale cliente per laboratori che devono consegnare risultati affidabili senza aggiungere carico amministrativo.', [
      section('La sfida dei laboratori di analisi dell’acqua', 'I laboratori di analisi dell’acqua ricevono più campioni, più matrici e più requisiti documentali. La pressione cresce quando aumenta il volume, il TAT si restringe e ogni risultato deve essere difendibile per clienti, audit e responsabili tecnici.', ['Più volume con lo stesso team: organizzare accettazione, banco, revisione e consegna senza ulteriore coordinamento manuale.', 'Evidenze disperse tra banco, qualità e report: collegare campione, metodo, lotto, utente, lettura e validazione.', 'Clienti che chiedono più visibilità: offrire stato, storico e deliverable chiari senza infinite email operative.', 'Catena di custodia e reporting CoA: rendere ogni risultato più facile da revisionare, spiegare e recuperare.']),
      section('Un workflow connesso per la microbiologia dell’acqua', 'AquaVerify collega prodotto, esecuzione, dati e consegna cliente in un sistema pratico per laboratori che vogliono standardizzare le operazioni, ampliare i servizi e ridurre attriti nell’emissione dei risultati.', ['Direzione laboratorio: capacità, tempo di risposta e nuove linee di servizio.', 'Qualità: registri per utente, lotto, metodo, campione e revisione tecnica.', 'Microbiologia: kit, terreni pronti all’uso e passaggi guidati.', 'Cliente B2B: stato, report, storico e comunicazione più chiara.']),
      section('Dal campione al report CoA', 'Ogni fase dell’analisi può essere collegata alla successiva, così il laboratorio lavora con meno attrito e con evidenze pronte per la revisione tecnica.', ['Richiesta e registrazione: cliente, sito, matrice, metodo e deliverable previsto.', 'Accettazione e custodia: stato del campione, condizioni, etichette e catena di custodia.', 'Preparazione e test: kit, terreno, lotto, operatore e workflow di banco guidato.', 'Lettura ed evidenze: risultato, interpretazione, tracciabilità e informazioni di supporto.', 'Revisione tecnica: validazione controllata prima della consegna al cliente.', 'Report e portale: CoA, storico, accesso cliente e comunicazione.']),
      section('Cosa attivare secondo matrice, volume e cliente', 'Il laboratorio può combinare kit, terreni, tracciabilità digitale e reporting secondo metodo, volume del campione e livello di servizio promesso al cliente.', ['Presenza/assenza: INDICA Soma 100 mL per percorsi di screening semplici.', 'Enumerazione: ENUMERA Soma 100 mL per routine quantitative agili.', 'Piastra: PLAQUE Soma 1 mL e 100 mL per metodi su piastra.', 'Consegna digitale: AquaVerify Cloud, App, CoA e portale per reporting B2B.']),
      section('Roadmap per un servizio di laboratorio più scalabile', 'AquaVerify può essere adottato per fasi: prima organizzare il flusso, poi digitalizzare le evidenze, infine differenziare la consegna al cliente.', ['Diagnosi del workflow: mappare matrici, volumi, metodi, colli di bottiglia e bisogni cliente.', 'Standardizzazione tecnica: allineare prodotti, terreni, lotti e passaggi operativi.', 'Registri digitali: collegare campione, esecuzione, lettura, revisione e report.', 'Portale cliente: offrire ai clienti B2B storico e deliverable strutturati.', 'Scalabilità del servizio: aggiungere nuovi servizi microbiologici senza moltiplicare l’amministrazione.']),
      section('Prodotti e moduli per laboratori dell’acqua', 'I moduli possono essere adottati progressivamente: dai kit e terreni alla tracciabilità digitale, al reporting e al portale cliente.', ['ENUMERA Soma 100 mL: workflow quantitativo per colifagi somatici.', 'PLAQUE Soma 1 mL: workflow su piastra per contesti concentrati.', 'PLAQUE Soma 100 mL: workflow su piastra per scenari a volume maggiore.', 'INDICA Soma 100 mL: percorso presenza/assenza.', 'MSA e MSB pronti all’uso: terreni preparati per routine.', 'AquaVerify Cloud, App e CoA: workflow digitale per campione, report e cliente.']),
      section('Clienti con requisiti elevati di controllo idrico', 'La soluzione aiuta il laboratorio a rispondere con maggiore chiarezza a clienti che necessitano risultati tracciabili, ripetibili e facili da interpretare.', ['Utilities e pubblica amministrazione: monitoraggio routinario, evidenze e reporting.', 'Food & beverage: acqua di processo, piani igienici e programmi qualità.', 'Trattamento e riutilizzo: controlli operativi, deviazioni e follow-up.', 'Agricoltura, acquacoltura e seafood: monitoraggio preventivo e controllo del rischio idrico.']),
      section('Tracciabilità condivisa tra campione, test e report', 'Quando campione, test e report condividono la stessa tracciabilità, il laboratorio riduce ambiguità, organizza meglio la revisione tecnica e consegna informazioni più coerenti ai clienti.', ['Catena di custodia digitale: stato, sito, ubicazione e gestione del campione.', 'Evidenze di esecuzione: metodo, kit, lotto, operatore, lettura e commenti.', 'Reporting CoA: deliverable strutturati per cliente e audit.', 'Portale cliente: storico, report e comunicazione in un unico punto.', 'Adozione modulare: iniziare da un workflow ed espandere quando serve.'])
    ], { eyebrow: 'Laboratori pubblici e privati di analisi dell’acqua', primaryCta: 'Richiedi diagnosi tecnica', secondaryCta: 'Vedi flusso campione-report', seoTitle: 'Laboratori di analisi dell’acqua | AquaVerify', seoDescription: 'Soluzioni per laboratori di analisi dell’acqua: kit microbiologici, colifagi somatici, tracciabilità digitale, reporting CoA e portale cliente.', faqs: [
      { question: 'AquaVerify può integrarsi in un laboratorio che ha già un LIMS?', answer: 'Sì. AquaVerify Cloud può integrare flussi esistenti e collegare campione, lotto, operatore, metodo, risultato, revisione, CoA e portale cliente. Integrazione o coesistenza con un LIMS dipendono da requisiti, dati storici, utenti, validazione interna, configurazione e ambito operativo.' },
      { question: 'Quali prodotti sono rilevanti per i colifagi somatici in laboratorio?', answer: 'Secondo il flusso e il prodotto concreto, AquaVerify può apportare famiglie come ENUMERA, INDICA, PLAQUE e terreni Lab Essentials per programmi in cui i colifagi somatici fanno parte dell’approccio microbiologico. L’idoneità va rivista secondo matrice, metodo, volume, ambito e procedura interna.' },
      { question: 'Come documentare catena di custodia, lotto e risultato?', answer: 'AquaVerify Cloud può aiutare a registrare richiesta, ricezione, punto di campionamento, catena di custodia, lotto, operatore, metodo, lettura, revisione tecnica, risultato e rapporto CoA. La profondità documentale dipende da configurazione, workflow e sistema qualità del laboratorio.' },
      { question: 'AquaVerify riduce da solo il tempo di risposta del laboratorio?', answer: 'Non va dato per scontato. Può aiutare a ridurre frizione amministrativa, trascrizione manuale e tempi di revisione documentale, ma l’impatto reale dipende da volume di campioni, metodo, matrice, personale, validazione interna, integrazioni e flusso operativo attuale.' },
      { question: 'Come si inserisce AquaVerify rispetto a ISO/IEC 17025?', answer: 'AquaVerify può supportare tracciabilità, registri, revisione, evidenze e rapporti dentro un sistema qualità. Non copre da solo l’accreditamento né amplia l’ambito del laboratorio; ogni uso deve allinearsi a metodi, validazioni, procedure e ambito documentato quando applicabile.' }
    ] }), {
      title: 'Come aiuta AquaVerify un laboratorio di analisi dell’acqua?',
      body: 'AquaVerify può aiutare i laboratori di analisi dell’acqua a combinare prodotti di microbiologia, flussi di screening o enumerazione, supporto operativo e tracciabilità digitale con AquaVerify Cloud. Il flusso può documentare campione, lotto, metodo, operatore, risultato, revisione e CoA. In contesti accreditati, ogni uso deve allinearsi a metodo, matrice, validazione e ambito del laboratorio.'
    }, {
      title: 'Esigenza del laboratorio e strato AquaVerify correlato',
      columns: ['Esigenza del laboratorio', 'Prodotto o strato', 'Evidenza documentabile', 'Nota prudente'],
      rows: [
        ['Screening', 'INDICA', 'Campione, lotto, risultato e azione', 'Dipende da metodo e procedura interna'],
        ['Enumerazione', 'ENUMERA', 'Lettura, risultato, revisione e CoA', 'Dipende da organismo, matrice e metodo'],
        ['Flussi con metodi di riferimento', 'Kit ISO/EPA', 'Metodo, controlli ed evidenza', 'Non implica accettazione regolatoria di per sé'],
        ['Operatività quotidiana', 'Lab Essentials', 'Inventario, lotto e SOP', 'Dipende dal sistema interno'],
        ['Reporting', 'AquaVerify Cloud', 'Audit trail, CoA e portale', 'Configurare secondo processo']
      ]
    }),
    ca: withAnswerLayer(locale('/ca/sectors/laboratoris-analisi-aigua', 'Laboratoris d’anàlisi d’aigua: més capacitat, traçabilitat i confiança en cada informe', 'AquaVerify connecta kits de microbiologia de l’aigua, control de colífags somàtics, fluxos digitals de mostra a informe, reporting CoA i portal client per a laboratoris que necessiten entregar resultats fiables sense afegir càrrega administrativa.', [
      section('El repte del laboratori d’anàlisi d’aigua', 'Els laboratoris d’anàlisi d’aigua reben més mostres, més matrius i més exigències documentals. La pressió apareix quan el volum creix, el TAT s’estreny i cada resultat ha de ser defensable davant clients, auditories i responsables tècnics.', ['Més volum amb el mateix equip: organitzar recepció, banc, revisió i entrega sense afegir coordinació manual.', 'Evidència dispersa entre banc, qualitat i informe: connectar mostra, mètode, lot, usuari, lectura i validació.', 'Clients que demanen més visibilitat: oferir estat, històric i entregables clars sense multiplicar correus operatius.', 'Cadena de custòdia i reporting CoA: fer cada resultat més fàcil de revisar, explicar i recuperar.']),
      section('Un flux connectat per a microbiologia de l’aigua', 'AquaVerify uneix producte, execució, dades i entrega al client en un sistema pràctic per a laboratoris que volen estandarditzar operacions, ampliar serveis i reduir fricció en l’emissió de resultats.', ['Direcció de laboratori: capacitat, temps de resposta i noves línies de servei.', 'Qualitat: registres per usuari, lot, mètode, mostra i revisió tècnica.', 'Microbiologia: kits, medis preparats i passos guiats.', 'Client B2B: estat, informes, històric i comunicació més clara.']),
      section('De la mostra a l’informe CoA', 'Cada etapa de l’anàlisi pot quedar connectada amb la següent perquè el laboratori treballi amb menys fricció i amb evidències preparades per a revisió tècnica.', ['Sol·licitud i alta: client, instal·lació, matriu, mètode i entregable previst.', 'Recepció i custòdia: estat de mostra, condicions, etiquetes i cadena de custòdia.', 'Preparació i assaig: kit, medi, lot, operador i flux de banc guiat.', 'Lectura i evidència: resultat, interpretació, traçabilitat i informació de suport.', 'Revisió tècnica: validació controlada abans de l’entrega al client.', 'Informe i portal: CoA, històric, accés client i comunicació.']),
      section('Què activar segons matriu, volum i tipus de client', 'El laboratori pot combinar kits, medis, traçabilitat digital i reporting segons el mètode, el volum de mostra i el nivell de servei promès al client.', ['Presència/absència: INDICA Soma 100 mL per a cribratge senzill.', 'Enumeració: ENUMERA Soma 100 mL per a rutines quantitatives àgils.', 'Placa: PLAQUE Soma 1 mL i 100 mL per a mètodes en placa.', 'Entrega digital: AquaVerify Cloud, App, CoA i portal per a reporting B2B.']),
      section('Roadmap per a un servei de laboratori més escalable', 'AquaVerify es pot adoptar per etapes: primer ordenar el flux, després digitalitzar evidències i finalment diferenciar l’entrega al client.', ['Diagnòstic del flux: mapar matrius, volums, mètodes, colls d’ampolla i necessitats del client.', 'Estandardització tècnica: alinear productes, medis, lots i passos operatius.', 'Registres digitals: connectar mostra, execució, lectura, revisió i informe.', 'Portal client: donar als clients B2B històric i entregables estructurats.', 'Escalat del servei: afegir nous serveis microbiològics sense multiplicar administració.']),
      section('Productes i mòduls per a laboratoris d’aigua', 'Els mòduls es poden adoptar progressivament: des de kits i medis fins a traçabilitat digital, reporting i portal client.', ['ENUMERA Soma 100 mL: flux quantitatiu per a colífags somàtics.', 'PLAQUE Soma 1 mL: flux en placa per a contextos concentrats.', 'PLAQUE Soma 100 mL: flux en placa per a escenaris de més volum.', 'INDICA Soma 100 mL: ruta de presència/absència.', 'MSA i MSB llestos per utilitzar: medis preparats per a rutina.', 'AquaVerify Cloud, App i CoA: flux digital de mostra, informe i client.']),
      section('Clients amb alta exigència de control hídric', 'La solució permet al laboratori respondre amb més claredat a clients que necessiten resultats traçables, repetibles i fàcils d’interpretar.', ['Utilities i administració pública: monitoratge rutinari, evidències i reporting.', 'Food & beverage: aigua de procés, plans d’higiene i programes de qualitat.', 'Tractament i reutilització: controls operatius, desviacions i seguiment.', 'Agricultura, aqüicultura i seafood: monitoratge preventiu i control del risc hídric.']),
      section('Traçabilitat compartida entre mostra, assaig i informe', 'Quan mostra, assaig i informe comparteixen traçabilitat, el laboratori redueix ambigüitat, organitza millor la revisió tècnica i entrega informació més consistent als clients.', ['Cadena de custòdia digital: estat, instal·lació, ubicació i manipulació.', 'Evidències d’execució: mètode, kit, lot, operador, lectura i comentaris.', 'Reporting CoA: entregables estructurats per a client i auditoria.', 'Portal client: històric, informes i comunicació en un sol lloc.', 'Adopció modular: començar amb un flux i ampliar quan sigui útil.'])
    ], { eyebrow: 'Laboratoris públics i privats d’anàlisi d’aigua', primaryCta: 'Sol·licitar diagnòstic tècnic', secondaryCta: 'Veure flux mostra-informe', seoTitle: 'Laboratoris d’anàlisi d’aigua | AquaVerify', seoDescription: 'Solucions per a laboratoris d’anàlisi d’aigua: kits microbiològics, colífags somàtics, traçabilitat digital, reporting CoA i portal client.', faqs: [
      { question: 'AquaVerify es pot integrar en un laboratori que ja té LIMS?', answer: 'Sí. AquaVerify Cloud pot complementar fluxos existents i connectar mostra, lot, operador, mètode, resultat, revisió, CoA i portal client. La integració o convivència amb un LIMS depèn de requisits, dades històriques, usuaris, validació interna, configuració i abast operatiu.' },
      { question: 'Quins productes són rellevants per a colifags somàtics en laboratori?', answer: 'Segons el flux i el producte concret, AquaVerify pot aportar famílies com ENUMERA, INDICA, PLAQUE i medis Lab Essentials per a programes on els colifags somàtics formen part de l’enfocament microbiològic. L’encaix s’ha de revisar segons matriu, mètode, volum, abast i procediment intern.' },
      { question: 'Com documentar cadena de custòdia, lot i resultat?', answer: 'AquaVerify Cloud pot ajudar a registrar sol·licitud, recepció, punt de mostreig, cadena de custòdia, lot, operador, mètode, lectura, revisió tècnica, resultat i informe CoA. La profunditat documental depèn de la configuració, el flux de treball i el sistema de qualitat del laboratori.' },
      { question: 'AquaVerify redueix per si sol el temps de resposta del laboratori?', answer: 'No s’ha de donar per fet. Pot ajudar a reduir fricció administrativa, transcripció manual i temps de revisió documental, però l’impacte real depèn del volum de mostres, mètode, matriu, personal, validació interna, integracions i flux operatiu actual.' },
      { question: 'Com encaixa AquaVerify amb ISO/IEC 17025?', answer: 'AquaVerify pot donar suport a traçabilitat, registres, revisió, evidències i informes dins d’un sistema de qualitat. No cobreix per si sol l’acreditació ni amplia l’abast del laboratori; cada ús s’ha d’alinear amb mètodes, validacions, procediments i abast documentat quan pertoqui.' }
    ] }), {
      title: 'Com ajuda AquaVerify un laboratori d’anàlisi d’aigua?',
      body: 'AquaVerify pot ajudar laboratoris d’anàlisi d’aigua a combinar productes de microbiologia, fluxos de cribratge o enumeració, suport operatiu i traçabilitat digital amb AquaVerify Cloud. El flux pot documentar mostra, lot, mètode, operador, resultat, revisió i CoA. En contextos acreditats, cada ús s’ha d’alinear amb mètode, matriu, validació i abast del laboratori.'
    }, {
      title: 'Necessitat del laboratori i capa AquaVerify relacionada',
      columns: ['Necessitat del laboratori', 'Producte o capa', 'Evidència que es pot documentar', 'Nota prudent'],
      rows: [
        ['Cribratge', 'INDICA', 'Mostra, lot, resultat i acció', 'Depèn del mètode i procediment intern'],
        ['Enumeració', 'ENUMERA', 'Lectura, resultat, revisió i CoA', 'Depèn d’organisme, matriu i mètode'],
        ['Fluxos amb mètodes de referència', 'Kits ISO/EPA', 'Mètode, controls i evidència', 'No implica acceptació reguladora per si mateix'],
        ['Operació diària', 'Lab Essentials', 'Inventari, lot i SOP', 'Depèn del sistema intern'],
        ['Reporting', 'AquaVerify Cloud', 'Audit trail, CoA i portal', 'Configurar segons procés']
      ]
    })
  }),
  page('water-quality-control', 'industries', 'contact', {
    ...WATER_QUALITY_CONTROL_PAGE
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
      en: 'Municipal water analysis with traceability from sample to decision',
      es: 'Análisis de agua municipal con trazabilidad de la muestra a la decisión',
      fr: "Analyse de l’eau municipale avec traçabilité de l’échantillon à la décision",
      it: "Analisi dell’acqua municipale con tracciabilità dal campione alla decisione",
      ca: "Anàlisi d’aigua municipal amb traçabilitat de la mostra a la decisió"
    },
    descriptions: {
      en: 'Solutions for municipal water analysis: somatic coliphages, microbiology kits, digital traceability, reporting and coordination between field teams, laboratories and water operators.',
      es: 'Soluciones para análisis de agua municipal: colífagos somáticos, kits microbiológicos, trazabilidad digital, reporting y coordinación entre campo, laboratorio y operador.',
      fr: "Solutions pour l’analyse de l’eau municipale : coliphages somatiques, kits de microbiologie, traçabilité numérique, rapports et coordination entre terrain, laboratoire et opérateur.",
      it: "Soluzioni per l’analisi dell’acqua municipale: colifagi somatici, kit microbiologici, tracciabilità digitale, reporting e coordinamento tra campo, laboratorio e operatore.",
      ca: "Solucions per a l’anàlisi d’aigua municipal: colífags somàtics, kits microbiològics, traçabilitat digital, informes i coordinació entre camp, laboratori i operador."
    },
    eyebrows: {
      en: 'Municipal water · Microbiological control · Traceable reporting',
      es: 'Agua municipal · Control microbiológico · Reporting trazable',
      fr: 'Eau municipale · Contrôle microbiologique · Reporting traçable',
      it: 'Acqua municipale · Controllo microbiologico · Reporting tracciabile',
      ca: 'Aigua municipal · Control microbiològic · Reporting traçable'
    },
    sections: {
      en: [
        section('Municipal water needs more than isolated results', 'When information lives in spreadsheets, emails, paper forms and disconnected systems, every incident takes longer to investigate. AquaVerify turns the control programme into a traceable chain from sampling point to action.', ['Variable source risk: Heavy rainfall, flow changes, agricultural pressure, discharges or climate events can alter microbiological load before water reaches treatment.', 'Field-lab coordination: One programme may involve sampling crews, public laboratories, external operators, municipal leadership and health authorities.', 'Evidence during deviations: Response requires history, batch, operator, date, time, location, method and documented corrective actions.', 'Institutional transparency: Public stakeholders need clear data, consistent reports and defensible traceability.']),
        section('An operational layer for municipal water analysis programmes', 'AquaVerify combines water microbiology products, digital workflows and technical reporting so every municipal sample can be planned, executed, reviewed and documented easily.', ['Sampling planning: Define points, matrices, frequency, owner, criticality, analysis type and reporting requirements by supply zone.', 'Digital chain of custody: Record location, date, time, operator, sample conditions, kit batch, status and evidence from field or laboratory.', 'Water microbiology: Integrate workflows for somatic coliphages, presence/absence, enumeration, ready-to-use media and technical reading.', 'Reports and follow-up: Generate technical reports, point history, sample traceability, internal alerts and documentation for review or audit.']),
        section('From sampling point to operational decision', 'The goal is not just to obtain a result. The goal is for every result to arrive with enough context to decide, communicate and act.', ['01. Control plan: Sources, treatment plant, tanks, network, sensitive points and sampling frequency.', '02. Registered sample: Location, owner, matrix, time, batch, conditions and transport status.', '03. Microbiological analysis: Kits, media and laboratory workflows connected to the unique sample identifier.', '04. Technical review: Reading, evidence, validation, technical note and comparison with historical data.', '05. Traceable report: Result, operational interpretation, attachments, history and stakeholder deliverable.', '06. Action and follow-up: Re-sampling, investigation, treatment adjustment, communication and documented closure.']),
        section('Built for the teams that keep public water services running', 'Municipal water control is a shared workflow between public service, field operations, laboratory, treatment engineering and compliance.', ['Municipality or public utility: Service continuity, decision traceability and clear documentation for citizens, boards and authorities.', 'Water quality manager: Turn data from source, treatment, network and laboratory into coherent evidence for control and improvement.', 'Treatment engineering: Verify barriers, adjust operational decisions and understand microbiological trends before incidents.', 'Public or partner laboratory: Receive samples with context, reduce manual transcription and deliver consistent reports.', 'Public health and compliance: Access verifiable information, action traceability and documentation for investigation and communication.']),
        section('Products and modules that can be combined by programme', 'Every municipality is different: network size, source water, available laboratory, regulatory pressure, technical resources and sampling frequency. AquaVerify lets you start with the most critical workflow and scale from there.', ['ENUMERA Soma 100 mL: Quantification of somatic coliphages in 100 mL samples within water microbiology programmes. Ideal: Treated water, networks, sources and scenarios requiring agile operational response.', 'PLAQUE Soma 100 mL: Plate workflow for enumeration in 100 mL, alignable with technical laboratory references. Ideal: Treatment verification, drinking water and low-count matrices.', 'PLAQUE Soma 1 mL: Double-layer workflow for 1 mL samples or dilutions. Ideal: Surface water, wastewater, process controls or higher-load matrices.', 'INDICA Soma 100 mL: Presence/absence of somatic coliphages in 100 mL. Ideal: Critical-point screening, verification campaigns and fast decisions.', 'MSA / MSB: Ready-to-use media for coliphage microbiology workflows. Ideal: Laboratories standardising preparation, reducing variability and organising consumables.', 'AquaVerify App & Cloud: Registration of samples, locations, operators, batches, readings, reviews and reports. Ideal: Multi-point municipalities, operators and laboratories.', 'Technical reporting and portal: Reports, point history, action documentation and deliverables. Ideal: Coordination between municipality, operator, laboratory, consultant and authority.', 'GIS, alerts and trends: Point map, location trends, deviations, priorities and follow-up status. Ideal: Distributed networks, recurring campaigns, incident investigation and committees.']),
        section('Municipal microbiological control matrix', 'One system can organise very different needs: routine control, treatment verification, incident investigation or institutional communication.', ['Source and raw water: Variable microbiological inputs, rainfall events, fecal contamination or catchment pressure. → Source-by-source programme, seasonal history, somatic coliphages and deviation alerts.', 'Treatment plant and barriers: Uncertainty about treatment performance, load changes or need for operational evidence. → Before/after samples, barrier comparison, technical report and action follow-up.', 'Tanks and distribution network: Loss of visibility between treatment and end user, sensitive points or local incidents. → Distributed sampling, point map, zone traceability and historical evolution.', 'Municipal or partner laboratory: Samples with incomplete context, manual reports and difficulty linking field data with results. → Chain of custody, technical review, CoA/report and query portal.', 'Incident or deviation: Time pressure, need for re-sampling, corrective actions and communication. → Investigation workflow, tasks, evidence, new results and documented closure.']),
        section('Maturity roadmap for municipal water control', 'AquaVerify lets you start with basic traceability and move towards a connected, measurable programme focused on preventive risk management.', ['1. Map: Inventory points, matrices, owners and actual sampling frequency.', '2. Digitise: Remove scattered records and connect sample, operator, location and method.', '3. Standardise: Unify kits, media, reading criteria, technical review and reports.', '4. Visualise: Analyse trends by source, treatment, tank, network and critical point.', '5. Prevent: Prioritise actions, investigate deviations and document continuous improvement.']),
        section('Aligned with risk-based control, traceability and continuous improvement', 'AquaVerify is designed to support drinking-water control programmes, water safety plans and laboratory workflows that require clear evidence. Requirements should be reviewed with the laboratory, operator and competent authority in each jurisdiction.'),
        section('Common use cases', 'Municipal teams can start with the most urgent control flow and extend it as sampling points, laboratories or reporting needs grow.', ['Recurring drinking-water programme: Plan, register and report periodic controls for defined points in a supply zone.', 'Treatment verification: Compare points before and after barriers to document performance and support operational decisions.', 'Network and sensitive-point control: Prioritise tanks, network ends, critical buildings or zones with deviation history.', 'Incident response: Record investigation, re-sampling, corrective actions, internal communication and closure.', 'Laboratory coordination: Connect sample, method, reading, validation and report without losing field context.', 'Committee and audit reporting: Turn scattered results into consistent reports with history and traceability.'])
      ],
      es: [
        section('El agua municipal exige más que resultados aislados', 'Cuando la información vive en hojas de cálculo, correos, formularios en papel y sistemas desconectados, cada incidencia tarda más en investigarse. AquaVerify convierte el programa de control en una cadena trazable desde punto de muestreo hasta acción.', ['Riesgo variable en captaciones: Lluvias intensas, cambios de caudal, presión agrícola, vertidos o eventos climáticos pueden alterar la carga microbiológica antes de que llegue a tratamiento.', 'Coordinación campo-laboratorio: Un mismo programa puede implicar brigadas de muestreo, laboratorio público, operador externo, responsable municipal y autoridad sanitaria.', 'Evidencia ante desviaciones: La respuesta necesita histórico, lote, operador, fecha, hora, ubicación, método aplicado y acciones correctoras documentadas.', 'Transparencia institucional: Los responsables públicos necesitan comunicar decisiones con datos claros, informes consistentes y trazabilidad defendible.']),
        section('Una capa operativa para programas municipales de análisis de agua', 'AquaVerify combina productos de microbiología del agua, flujos digitales y reporting técnico para que cada muestra municipal sea fácil de planificar, ejecutar, revisar y documentar.', ['Planificación de muestreo: Define puntos, matrices, frecuencia, responsable, criticidad, tipo de análisis y requisitos de reporting por zona de abastecimiento.', 'Cadena de custodia digital: Registra ubicación, fecha, hora, operador, condiciones de muestra, lote de kit, estado y evidencias desde campo o laboratorio.', 'Microbiología del agua: Integra flujos para colífagos somáticos, presencia/ausencia, enumeración, medios listos para usar y lectura técnica.', 'Informes y seguimiento: Genera informes técnicos, histórico por punto, trazabilidad por muestra, alertas internas y documentación para revisión o auditoría.']),
        section('De punto de muestreo a decisión operativa', 'El objetivo no es solo obtener un resultado. El objetivo es que cada resultado llegue con contexto suficiente para decidir, comunicar y actuar.', ['01. Plan de control: Puntos de captación, ETAP, depósitos, red, puntos sensibles y frecuencia de muestreo.', '02. Muestra registrada: Ubicación, responsable, matriz, hora, lote, condiciones y estado de transporte.', '03. Análisis microbiológico: Kits, medios y flujos de laboratorio conectados al identificador único de muestra.', '04. Revisión técnica: Lectura, evidencias, validación, comentario técnico y comparación con histórico.', '05. Informe trazable: Resultado, interpretación operativa, adjuntos, historial y entregable para stakeholders.', '06. Acción y seguimiento: Re-muestreo, investigación, ajuste de tratamiento, comunicación y cierre documentado.']),
        section('Diseñado para los equipos que sostienen el servicio público de agua', 'El control municipal del agua es un flujo compartido entre servicio público, campo, laboratorio, ingeniería de tratamiento y compliance.', ['Municipio o empresa pública: Continuidad del servicio, trazabilidad de decisiones y documentación clara para ciudadanos, juntas de gobierno y autoridades.', 'Responsable de calidad del agua: Convertir datos de captación, tratamiento, red y laboratorio en evidencia coherente para control y mejora.', 'Ingeniería de tratamiento: Verificar barreras, ajustar decisiones operativas y entender tendencias microbiológicas antes de incidencias.', 'Laboratorio público o partner: Recibir muestras con contexto, reducir transcripción manual y entregar informes consistentes.', 'Salud pública y compliance: Acceso a información verificable, trazabilidad de acciones y documentación para investigación y comunicación.']),
        section('Productos y módulos que pueden combinarse según el programa', 'Cada municipio tiene una realidad distinta: tamaño de red, fuente de agua, laboratorio disponible, presión regulatoria, recursos técnicos y frecuencia de muestreo. AquaVerify permite empezar por el flujo más crítico y escalar después.', ['ENUMERA Soma 100 mL: Cuantificación de colífagos somáticos en muestras de 100 mL dentro de programas microbiológicos de agua. Ideal: Agua tratada, red, captaciones y escenarios con necesidad de respuesta operativa ágil.', 'PLAQUE Soma 100 mL: Flujo de placa para enumeración en 100 mL, alineable con referencias técnicas de laboratorio. Ideal: Verificación de tratamiento, agua de consumo y matrices con bajo recuento esperado.', 'PLAQUE Soma 1 mL: Doble capa para muestras o diluciones de 1 mL. Ideal: Aguas superficiales, residuales, controles de proceso o matrices con carga esperada superior.', 'INDICA Soma 100 mL: Presencia/ausencia de colífagos somáticos en 100 mL. Ideal: Screening de puntos críticos, campañas de verificación y apoyo a decisiones rápidas.', 'MSA / MSB: Medios listos para flujos microbiológicos de colífagos. Ideal: Laboratorios que quieren estandarizar preparación, reducir variabilidad y ordenar consumibles.', 'AquaVerify App & Cloud: Registro de muestras, ubicaciones, operadores, lotes, lecturas, revisiones e informes. Ideal: Municipios, operadores y laboratorios con múltiples puntos de muestreo o equipos distribuidos.', 'Reporting técnico y portal: Informes, histórico por punto, documentación de acciones y entregables para responsables internos o externos. Ideal: Coordinación entre ayuntamiento, operador, laboratorio, consultor y autoridad competente.', 'GIS, alertas y tendencias: Mapa de puntos, evolución por ubicación, desviaciones, prioridades y estado del seguimiento. Ideal: Redes distribuidas, campañas recurrentes, investigación de incidencias y comités de seguimiento.']),
        section('Matriz municipal de control microbiológico', 'Un mismo sistema puede organizar necesidades muy diferentes: control rutinario, verificación de tratamiento, investigación de incidencia o comunicación institucional.', ['Captación y agua bruta: Entradas microbiológicas variables, eventos de lluvia, contaminación fecal o presión de cuenca. → Programa por fuente, histórico por temporada, colífagos somáticos y alertas por desviación.', 'ETAP y barreras de tratamiento: Dudas sobre eficacia de tratamiento, cambios de carga o necesidad de evidencia operativa. → Muestras antes/después, comparación por barrera, informe técnico y seguimiento de acciones.', 'Depósitos y red de distribución: Pérdida de visibilidad entre tratamiento y usuario final, puntos sensibles o incidencias locales. → Muestreo distribuido, mapa de puntos, trazabilidad por zona y evolución histórica.', 'Laboratorio municipal o partner: Muestras con contexto incompleto, informes manuales y dificultad para unir campo con resultado. → Cadena de custodia, revisión técnica, CoA/informe y portal de consulta.', 'Incidencia o desviación: Presión de tiempo, necesidad de re-muestreo, acciones correctoras y comunicación. → Flujo de investigación, tareas, evidencias, nuevos resultados y cierre documentado.']),
        section('Roadmap de madurez para el control hídrico municipal', 'AquaVerify permite empezar con trazabilidad básica y avanzar hacia un programa conectado, medible y orientado a gestión preventiva del riesgo.', ['1. Mapear: Inventariar puntos, matrices, responsables y frecuencia real de muestreo.', '2. Digitalizar: Eliminar registros dispersos y conectar muestra, operador, ubicación y método.', '3. Estandarizar: Unificar kits, medios, criterios de lectura, revisión técnica e informes.', '4. Visualizar: Analizar tendencias por fuente, tratamiento, depósito, red y punto crítico.', '5. Prevenir: Priorizar acciones, investigar desviaciones y documentar mejoras continuas.']),
        section('Alineado con un enfoque de riesgo, trazabilidad y mejora continua', 'AquaVerify está pensado para apoyar programas de control del agua de consumo, planes sanitarios del agua y flujos de laboratorio que necesitan evidencia clara. La aplicación concreta de requisitos debe revisarse con el laboratorio, el operador y la autoridad competente de cada jurisdicción.'),
        section('Casos de uso frecuentes', 'Los equipos municipales pueden empezar por el flujo de control más urgente y ampliarlo cuando crezcan puntos, laboratorios o necesidades de reporting.', ['Programa recurrente de agua de consumo: Planificar, registrar y reportar controles periódicos de puntos definidos en una zona de abastecimiento.', 'Verificación de tratamiento: Comparar puntos antes y después de barreras para documentar eficacia y apoyar decisiones operativas.', 'Control de red y puntos sensibles: Priorizar depósitos, finales de red, edificios críticos o zonas con historial de desviaciones.', 'Respuesta ante incidencia: Registrar investigación, re-muestreo, acciones correctoras, comunicación interna y cierre.', 'Coordinación con laboratorio: Conectar muestra, método, lectura, validación e informe sin perder contexto de campo.', 'Reporting para comités y auditorías: Transformar resultados dispersos en informes consistentes con histórico y trazabilidad.'])
      ],
      fr: [
        section("L’eau municipale exige plus que des résultats isolés", "Quand l’information vit dans des tableurs, emails, formulaires papier et systèmes déconnectés, chaque incident prend plus de temps à investiguer. AquaVerify transforme le programme de contrôle en chaîne traçable du point de prélèvement à l’action.", ['Risque variable au captage : Pluies intenses, variations de débit, pression agricole, rejets ou événements climatiques peuvent modifier la charge microbiologique avant le traitement.', 'Coordination terrain-laboratoire : Un même programme peut impliquer équipes de prélèvement, laboratoire public, opérateur externe, responsable municipal et autorité sanitaire.', 'Preuves en cas d’écart : La réponse exige historique, lot, opérateur, date, heure, lieu, méthode appliquée et actions correctives documentées.', 'Transparence institutionnelle : Les responsables publics doivent communiquer les décisions avec des données claires, des rapports cohérents et une traçabilité défendable.']),
        section("Une couche opérationnelle pour les programmes municipaux d’analyse de l’eau", "AquaVerify associe produits de microbiologie de l’eau, flux numériques et reporting technique afin que chaque échantillon municipal puisse être planifié, exécuté, revu et documenté facilement.", ['Planification des prélèvements : Définir points, matrices, fréquence, responsable, criticité, type d’analyse et exigences de reporting par zone de distribution.', 'Chaîne de traçabilité numérique : Enregistrer lieu, date, heure, opérateur, conditions de l’échantillon, lot de kit, statut et preuves depuis le terrain ou le laboratoire.', 'Microbiologie de l’eau : Intégrer les flux pour coliphages somatiques, présence/absence, dénombrement, milieux prêts à l’emploi et lecture technique.', 'Rapports et suivi : Générer rapports techniques, historique par point, traçabilité par échantillon, alertes internes et documentation pour revue ou audit.']),
        section('Du point de prélèvement à la décision opérationnelle', 'L’objectif n’est pas seulement d’obtenir un résultat. L’objectif est que chaque résultat arrive avec le contexte nécessaire pour décider, communiquer et agir.', ['01. Plan de contrôle : Captages, usine de traitement, réservoirs, réseau, points sensibles et fréquence de prélèvement.', '02. Échantillon enregistré : Lieu, responsable, matrice, heure, lot, conditions et état du transport.', '03. Analyse microbiologique : Kits, milieux et flux de laboratoire reliés à l’identifiant unique de l’échantillon.', '04. Revue technique : Lecture, preuves, validation, commentaire technique et comparaison avec l’historique.', '05. Rapport traçable : Résultat, interprétation opérationnelle, pièces jointes, historique et livrable pour parties prenantes.', '06. Action et suivi : Nouveau prélèvement, investigation, ajustement du traitement, communication et clôture documentée.']),
        section("Conçu pour les équipes qui assurent le service public de l’eau", "Le contrôle municipal de l’eau est un flux partagé entre service public, terrain, laboratoire, ingénierie de traitement et conformité.", ['Collectivité ou entreprise publique : Continuité du service, traçabilité des décisions et documentation claire pour citoyens, instances et autorités.', 'Responsable qualité de l’eau : Transformer les données de captage, traitement, réseau et laboratoire en preuves cohérentes.', 'Ingénierie de traitement : Vérifier les barrières, ajuster les décisions opérationnelles et comprendre les tendances microbiologiques.', 'Laboratoire public ou partenaire : Recevoir des échantillons contextualisés, réduire la saisie manuelle et livrer des rapports cohérents.', 'Santé publique et conformité : Accès à des informations vérifiables, traçabilité des actions et documentation pour investigation et communication.']),
        section('Produits et modules combinables selon le programme', 'Chaque collectivité a une réalité différente : taille du réseau, source d’eau, laboratoire disponible, pression réglementaire, ressources techniques et fréquence de prélèvement. AquaVerify permet de commencer par le flux le plus critique puis d’évoluer.', ['ENUMERA Soma 100 mL : Quantification des coliphages somatiques dans des échantillons de 100 mL dans les programmes de microbiologie de l’eau. Idéal : Eau traitée, réseau, captages et réponse opérationnelle agile.', 'PLAQUE Soma 100 mL : Flux de plaque pour dénombrement en 100 mL, alignable avec des références techniques de laboratoire. Idéal : Vérification du traitement, eau de consommation et faibles dénombrements attendus.', 'PLAQUE Soma 1 mL : Double couche pour échantillons ou dilutions de 1 mL. Idéal : Eaux de surface, eaux usées, contrôles de procédé ou matrices à charge plus élevée.', 'INDICA Soma 100 mL : Présence/absence de coliphages somatiques dans 100 mL. Idéal : Screening de points critiques, campagnes de vérification et décision rapide.', 'MSA / MSB : Milieux prêts à l’emploi pour les flux microbiologiques de coliphages. Idéal : Laboratoires souhaitant standardiser la préparation et réduire la variabilité.', 'AquaVerify App & Cloud : Enregistrement des échantillons, lieux, opérateurs, lots, lectures, revues et rapports. Idéal : Collectivités, opérateurs et laboratoires multi-points.', 'Reporting technique et portail : Rapports, historique par point, documentation des actions et livrables. Idéal : Coordination collectivité, opérateur, laboratoire, consultant et autorité.', 'SIG, alertes et tendances : Carte des points, évolution par lieu, écarts, priorités et état du suivi. Idéal : Réseaux distribués, campagnes récurrentes et investigation d’incidents.']),
        section('Matrice municipale de contrôle microbiologique', 'Un même système peut organiser des besoins très différents : contrôle de routine, vérification du traitement, investigation d’incident ou communication institutionnelle.', ['Captage et eau brute : Entrées microbiologiques variables, épisodes pluvieux, contamination fécale ou pression du bassin versant. → Programme par source, historique saisonnier, coliphages somatiques et alertes d’écart.', 'Usine de traitement et barrières : Doute sur l’efficacité du traitement, variations de charge ou besoin de preuves opérationnelles. → Échantillons avant/après, comparaison par barrière, rapport technique et suivi des actions.', 'Réservoirs et réseau de distribution : Perte de visibilité entre traitement et usager final, points sensibles ou incidents locaux. → Prélèvements distribués, carte des points, traçabilité par zone et évolution historique.', 'Laboratoire municipal ou partenaire : Échantillons avec contexte incomplet, rapports manuels et difficulté à relier terrain et résultat. → Chaîne de traçabilité, revue technique, CoA/rapport et portail de consultation.', 'Incident ou écart : Pression temporelle, besoin de nouveau prélèvement, actions correctives et communication. → Flux d’investigation, tâches, preuves, nouveaux résultats et clôture documentée.']),
        section('Feuille de route de maturité pour le contrôle hydrique municipal', 'AquaVerify permet de commencer par une traçabilité de base et d’évoluer vers un programme connecté, mesurable et orienté vers la gestion préventive des risques.', ['1. Cartographier : Inventorier points, matrices, responsables et fréquence réelle de prélèvement.', '2. Numériser : Supprimer les registres dispersés et relier échantillon, opérateur, lieu et méthode.', '3. Standardiser : Unifier kits, milieux, critères de lecture, revue technique et rapports.', '4. Visualiser : Analyser les tendances par source, traitement, réservoir, réseau et point critique.', '5. Prévenir : Prioriser les actions, investiguer les écarts et documenter l’amélioration continue.']),
        section('Aligné sur une approche par les risques, la traçabilité et l’amélioration continue', 'AquaVerify est conçu pour soutenir les programmes de contrôle de l’eau de consommation, les plans de sécurité de l’eau et les flux de laboratoire nécessitant des preuves claires.'),
        section('Cas d’usage fréquents', 'Les équipes municipales peuvent commencer par le flux le plus urgent et l’étendre quand les points, laboratoires ou besoins de reporting augmentent.', ['Programme récurrent d’eau de consommation : Planifier, enregistrer et reporter les contrôles périodiques des points définis.', 'Vérification du traitement : Comparer les points avant et après barrières pour documenter la performance.', 'Contrôle du réseau et des points sensibles : Prioriser réservoirs, fins de réseau, bâtiments critiques ou zones avec historique.', 'Réponse à incident : Enregistrer investigation, nouveau prélèvement, actions correctives, communication interne et clôture.', 'Coordination laboratoire : Relier échantillon, méthode, lecture, validation et rapport sans perdre le contexte terrain.', 'Reporting pour comités et audits : Transformer des résultats dispersés en rapports cohérents avec historique et traçabilité.'])
      ],
      it: [
        section("L’acqua municipale richiede più di risultati isolati", "Quando le informazioni vivono in fogli di calcolo, email, moduli cartacei e sistemi disconnessi, ogni incidente richiede più tempo per essere investigato. AquaVerify trasforma il programma di controllo in una catena tracciabile dal punto di campionamento all’azione.", ['Rischio variabile in captazione: Piogge intense, variazioni di portata, pressione agricola, scarichi o eventi climatici possono modificare il carico microbiologico prima del trattamento.', 'Coordinamento campo-laboratorio: Un programma può coinvolgere squadre di campionamento, laboratorio pubblico, operatore esterno, referente comunale e autorità sanitaria.', 'Evidenze in caso di deviazione: La risposta richiede storico, lotto, operatore, data, ora, luogo, metodo applicato e azioni correttive documentate.', 'Trasparenza istituzionale: I responsabili pubblici devono comunicare decisioni con dati chiari, rapporti coerenti e tracciabilità difendibile.']),
        section("Uno strato operativo per i programmi municipali di analisi dell’acqua", "AquaVerify combina prodotti di microbiologia dell’acqua, flussi digitali e reporting tecnico affinché ogni campione municipale sia facile da pianificare, eseguire, rivedere e documentare.", ['Pianificazione del campionamento: Definire punti, matrici, frequenza, responsabile, criticità, tipo di analisi e requisiti di reporting per zona di approvvigionamento.', 'Catena di custodia digitale: Registrare luogo, data, ora, operatore, condizioni del campione, lotto del kit, stato ed evidenze dal campo o dal laboratorio.', 'Microbiologia dell’acqua: Integrare flussi per colifagi somatici, presenza/assenza, enumerazione, terreni pronti all’uso e lettura tecnica.', 'Rapporti e follow-up: Generare rapporti tecnici, storico per punto, tracciabilità per campione, alert interni e documentazione per revisione o audit.']),
        section('Dal punto di campionamento alla decisione operativa', 'L’obiettivo non è solo ottenere un risultato. L’obiettivo è che ogni risultato arrivi con il contesto sufficiente per decidere, comunicare e agire.', ['01. Piano di controllo: Captazioni, impianto di trattamento, serbatoi, rete, punti sensibili e frequenza di campionamento.', '02. Campione registrato: Luogo, responsabile, matrice, ora, lotto, condizioni e stato del trasporto.', '03. Analisi microbiologica: Kit, terreni e flussi di laboratorio collegati all’identificativo univoco del campione.', '04. Revisione tecnica: Lettura, evidenze, validazione, nota tecnica e confronto con lo storico.', '05. Rapporto tracciabile: Risultato, interpretazione operativa, allegati, storico e deliverable per gli stakeholder.', '06. Azione e follow-up: Nuovo campionamento, investigazione, adeguamento del trattamento, comunicazione e chiusura documentata.']),
        section("Pensato per i team che garantiscono il servizio pubblico dell’acqua", "Il controllo municipale dell’acqua è un flusso condiviso tra servizio pubblico, campo, laboratorio, ingegneria di trattamento e compliance.", ['Comune o azienda pubblica: Continuità del servizio, tracciabilità delle decisioni e documentazione chiara per cittadini, organi decisionali e autorità.', 'Responsabile qualità dell’acqua: Trasformare dati da captazione, trattamento, rete e laboratorio in evidenze coerenti.', 'Ingegneria di trattamento: Verificare barriere, regolare decisioni operative e comprendere tendenze microbiologiche.', 'Laboratorio pubblico o partner: Ricevere campioni con contesto, ridurre trascrizione manuale e consegnare rapporti coerenti.', 'Sanità pubblica e compliance: Informazioni verificabili, tracciabilità delle azioni e documentazione per investigazione e comunicazione.']),
        section('Prodotti e moduli combinabili in base al programma', 'Ogni comune ha una realtà diversa: dimensione della rete, fonte d’acqua, laboratorio disponibile, pressione normativa, risorse tecniche e frequenza di campionamento. AquaVerify consente di iniziare dal flusso più critico e poi scalare.', ['ENUMERA Soma 100 mL: Quantificazione dei colifagi somatici in campioni da 100 mL nei programmi di microbiologia dell’acqua. Ideale: Acqua trattata, rete, captazioni e risposta operativa agile.', 'PLAQUE Soma 100 mL: Flusso su piastra per enumerazione in 100 mL, allineabile a riferimenti tecnici di laboratorio. Ideale: Verifica del trattamento, acqua potabile e conteggi attesi bassi.', 'PLAQUE Soma 1 mL: Doppio strato per campioni o diluizioni da 1 mL. Ideale: Acque superficiali, reflue, controlli di processo o matrici con carico superiore.', 'INDICA Soma 100 mL: Presenza/assenza di colifagi somatici in 100 mL. Ideale: Screening di punti critici, campagne di verifica e decisioni rapide.', 'MSA / MSB: Terreni pronti all’uso per flussi microbiologici di colifagi. Ideale: Laboratori che vogliono standardizzare preparazione e ridurre variabilità.', 'AquaVerify App & Cloud: Registrazione di campioni, luoghi, operatori, lotti, letture, revisioni e rapporti. Ideale: Comuni, gestori e laboratori multi-punto.', 'Reporting tecnico e portale: Rapporti, storico per punto, documentazione delle azioni e deliverable. Ideale: Coordinamento tra comune, gestore, laboratorio, consulente e autorità.', 'GIS, alert e trend: Mappa dei punti, evoluzione per luogo, deviazioni, priorità e stato del follow-up. Ideale: Reti distribuite, campagne ricorrenti e investigazione di incidenti.']),
        section('Matrice municipale di controllo microbiologico', 'Un unico sistema può organizzare esigenze molto diverse: controllo di routine, verifica del trattamento, investigazione di incidenti o comunicazione istituzionale.', ['Captazione e acqua grezza: Ingressi microbiologici variabili, eventi di pioggia, contaminazione fecale o pressione del bacino. → Programma per fonte, storico stagionale, colifagi somatici e alert di deviazione.', 'Impianto e barriere di trattamento: Dubbi sull’efficacia del trattamento, variazioni di carico o necessità di evidenze operative. → Campioni prima/dopo, confronto per barriera, rapporto tecnico e follow-up delle azioni.', 'Serbatoi e rete di distribuzione: Perdita di visibilità tra trattamento e utente finale, punti sensibili o incidenti locali. → Campionamento distribuito, mappa dei punti, tracciabilità per zona ed evoluzione storica.', 'Laboratorio municipale o partner: Campioni con contesto incompleto, rapporti manuali e difficoltà a collegare campo e risultato. → Catena di custodia, revisione tecnica, CoA/rapporto e portale di consultazione.', 'Incidente o deviazione: Pressione sui tempi, necessità di nuovo campionamento, azioni correttive e comunicazione. → Flusso di investigazione, attività, evidenze, nuovi risultati e chiusura documentata.']),
        section('Roadmap di maturità per il controllo idrico municipale', 'AquaVerify permette di iniziare con la tracciabilità di base e avanzare verso un programma connesso, misurabile e orientato alla gestione preventiva del rischio.', ['1. Mappare: Inventariare punti, matrici, responsabili e frequenza reale di campionamento.', '2. Digitalizzare: Eliminare registri dispersi e collegare campione, operatore, luogo e metodo.', '3. Standardizzare: Unificare kit, terreni, criteri di lettura, revisione tecnica e rapporti.', '4. Visualizzare: Analizzare trend per fonte, trattamento, serbatoio, rete e punto critico.', '5. Prevenire: Prioritizzare azioni, investigare deviazioni e documentare il miglioramento continuo.']),
        section('Allineato a un approccio basato sul rischio, sulla tracciabilità e sul miglioramento continuo', 'AquaVerify è pensato per supportare programmi di controllo dell’acqua potabile, piani di sicurezza dell’acqua e flussi di laboratorio che richiedono evidenze chiare.'),
        section('Casi d’uso frequenti', 'I team municipali possono iniziare dal flusso più urgente e ampliarlo quando crescono punti, laboratori o necessità di reporting.', ['Programma ricorrente di acqua potabile: Pianificare, registrare e riportare controlli periodici dei punti definiti.', 'Verifica del trattamento: Confrontare punti prima e dopo le barriere per documentare le prestazioni.', 'Controllo rete e punti sensibili: Prioritizzare serbatoi, estremità di rete, edifici critici o zone con storico.', 'Risposta a incidente: Registrare investigazione, nuovo campionamento, azioni correttive, comunicazione interna e chiusura.', 'Coordinamento laboratorio: Collegare campione, metodo, lettura, validazione e rapporto senza perdere contesto di campo.', 'Reporting per comitati e audit: Trasformare risultati dispersi in rapporti coerenti con storico e tracciabilità.'])
      ],
      ca: [
        section("L’aigua municipal exigeix més que resultats aïllats", "Quan la informació viu en fulls de càlcul, correus, formularis en paper i sistemes desconnectats, cada incidència triga més a investigar-se. AquaVerify converteix el programa de control en una cadena traçable des del punt de mostreig fins a l’acció.", ['Risc variable a les captacions: Pluges intenses, canvis de cabal, pressió agrícola, abocaments o episodis climàtics poden alterar la càrrega microbiològica abans del tractament.', 'Coordinació camp-laboratori: Un mateix programa pot implicar equips de mostreig, laboratori públic, operador extern, responsable municipal i autoritat sanitària.', 'Evidència davant desviacions: La resposta necessita històric, lot, operador, data, hora, ubicació, mètode aplicat i accions correctores documentades.', 'Transparència institucional: Els responsables públics han de comunicar decisions amb dades clares, informes consistents i traçabilitat defensable.']),
        section("Una capa operativa per a programes municipals d’anàlisi d’aigua", "AquaVerify combina productes de microbiologia de l’aigua, fluxos digitals i informes tècnics perquè cada mostra municipal sigui fàcil de planificar, executar, revisar i documentar.", ['Planificació del mostreig: Defineix punts, matrius, freqüència, responsable, criticitat, tipus d’anàlisi i requisits d’informe per zona d’abastament.', 'Cadena de custòdia digital: Registra ubicació, data, hora, operador, condicions de la mostra, lot del kit, estat i evidències des del camp o laboratori.', 'Microbiologia de l’aigua: Integra fluxos per a colífags somàtics, presència/absència, enumeració, medis llestos per usar i lectura tècnica.', 'Informes i seguiment: Genera informes tècnics, històric per punt, traçabilitat per mostra, alertes internes i documentació per a revisió o auditoria.']),
        section('Del punt de mostreig a la decisió operativa', 'L’objectiu no és només obtenir un resultat. L’objectiu és que cada resultat arribi amb prou context per decidir, comunicar i actuar.', ['01. Pla de control: Captacions, ETAP, dipòsits, xarxa, punts sensibles i freqüència de mostreig.', '02. Mostra registrada: Ubicació, responsable, matriu, hora, lot, condicions i estat del transport.', '03. Anàlisi microbiològica: Kits, medis i fluxos de laboratori connectats a l’identificador únic de mostra.', '04. Revisió tècnica: Lectura, evidències, validació, comentari tècnic i comparació amb l’històric.', '05. Informe traçable: Resultat, interpretació operativa, adjunts, històric i lliurable per a stakeholders.', '06. Acció i seguiment: Nou mostreig, investigació, ajust del tractament, comunicació i tancament documentat.']),
        section("Dissenyat per als equips que sostenen el servei públic d’aigua", "El control municipal de l’aigua és un flux compartit entre servei públic, camp, laboratori, enginyeria de tractament i compliance.", ['Ajuntament o empresa pública: Continuïtat del servei, traçabilitat de decisions i documentació clara per a ciutadania, òrgans de govern i autoritats.', 'Responsable de qualitat de l’aigua: Convertir dades de captació, tractament, xarxa i laboratori en evidència coherent.', 'Enginyeria de tractament: Verificar barreres, ajustar decisions operatives i entendre tendències microbiològiques.', 'Laboratori públic o partner: Rebre mostres amb context, reduir transcripció manual i entregar informes consistents.', 'Salut pública i compliance: Informació verificable, traçabilitat d’accions i documentació per a investigació i comunicació.']),
        section('Productes i mòduls combinables segons el programa', 'Cada municipi té una realitat diferent: mida de xarxa, font d’aigua, laboratori disponible, pressió reguladora, recursos tècnics i freqüència de mostreig. AquaVerify permet començar pel flux més crític i escalar després.', ['ENUMERA Soma 100 mL: Quantificació de colífags somàtics en mostres de 100 mL dins de programes microbiològics d’aigua. Ideal per a: Aigua tractada, xarxa, captacions i resposta operativa àgil.', 'PLAQUE Soma 100 mL: Flux de placa per a enumeració en 100 mL, alineable amb referències tècniques de laboratori. Ideal per a: Verificació de tractament, aigua de consum i recomptes baixos esperats.', 'PLAQUE Soma 1 mL: Doble capa per a mostres o dilucions d’1 mL. Ideal per a: Aigües superficials, residuals, controls de procés o matrius amb càrrega superior.', 'INDICA Soma 100 mL: Presència/absència de colífags somàtics en 100 mL. Ideal per a: Cribratge de punts crítics, campanyes de verificació i decisions ràpides.', 'MSA / MSB: Medis llestos per a fluxos microbiològics de colífags. Ideal per a: Laboratoris que volen estandarditzar preparació i reduir variabilitat.', 'AquaVerify App & Cloud: Registre de mostres, ubicacions, operadors, lots, lectures, revisions i informes. Ideal per a: Municipis, operadors i laboratoris multi-punt.', 'Reporting tècnic i portal: Informes, històric per punt, documentació d’accions i lliurables. Ideal per a: Coordinació entre ajuntament, operador, laboratori, consultor i autoritat.', 'GIS, alertes i tendències: Mapa de punts, evolució per ubicació, desviacions, prioritats i estat del seguiment. Ideal per a: Xarxes distribuïdes, campanyes recurrents i investigació d’incidències.']),
        section('Matriu municipal de control microbiològic', 'Un mateix sistema pot organitzar necessitats molt diferents: control rutinari, verificació de tractament, investigació d’incidència o comunicació institucional.', ['Captació i aigua bruta: Entrades microbiològiques variables, episodis de pluja, contaminació fecal o pressió de conca. → Programa per font, històric per temporada, colífags somàtics i alertes per desviació.', 'ETAP i barreres de tractament: Dubtes sobre eficàcia del tractament, canvis de càrrega o necessitat d’evidència operativa. → Mostres abans/després, comparació per barrera, informe tècnic i seguiment d’accions.', 'Dipòsits i xarxa de distribució: Pèrdua de visibilitat entre tractament i usuari final, punts sensibles o incidències locals. → Mostreig distribuït, mapa de punts, traçabilitat per zona i evolució històrica.', 'Laboratori municipal o partner: Mostres amb context incomplet, informes manuals i dificultat per unir camp amb resultat. → Cadena de custòdia, revisió tècnica, CoA/informe i portal de consulta.', 'Incidència o desviació: Pressió de temps, necessitat de nou mostreig, accions correctores i comunicació. → Flux d’investigació, tasques, evidències, nous resultats i tancament documentat.']),
        section('Full de ruta de maduresa per al control hídric municipal', 'AquaVerify permet començar amb traçabilitat bàsica i avançar cap a un programa connectat, mesurable i orientat a la gestió preventiva del risc.', ['1. Mapar: Inventariar punts, matrius, responsables i freqüència real de mostreig.', '2. Digitalitzar: Eliminar registres dispersos i connectar mostra, operador, ubicació i mètode.', '3. Estandarditzar: Unificar kits, medis, criteris de lectura, revisió tècnica i informes.', '4. Visualitzar: Analitzar tendències per font, tractament, dipòsit, xarxa i punt crític.', '5. Prevenir: Prioritzar accions, investigar desviacions i documentar millora contínua.']),
        section('Alineat amb un enfocament de risc, traçabilitat i millora contínua', 'AquaVerify està pensat per donar suport a programes de control de l’aigua de consum, plans sanitaris de l’aigua i fluxos de laboratori que necessiten evidència clara.'),
        section('Casos d’ús freqüents', 'Els equips municipals poden començar pel flux més urgent i ampliar-lo quan creixin punts, laboratoris o necessitats de reporting.', ['Programa recurrent d’aigua de consum: Planificar, registrar i informar controls periòdics de punts definits.', 'Verificació de tractament: Comparar punts abans i després de barreres per documentar eficàcia.', 'Control de xarxa i punts sensibles: Prioritzar dipòsits, finals de xarxa, edificis crítics o zones amb historial.', 'Resposta davant incidència: Registrar investigació, nou mostreig, accions correctores, comunicació interna i tancament.', 'Coordinació amb laboratori: Connectar mostra, mètode, lectura, validació i informe sense perdre context de camp.', 'Reporting per a comitès i auditories: Transformar resultats dispersos en informes consistents amb històric i traçabilitat.'])
      ]
    },
    ctas: {
      en: ['Request municipal diagnosis', 'See how it works'],
      es: ['Solicitar diagnóstico municipal', 'Ver cómo funciona'],
      fr: ['Demander diagnostic municipal', 'Voir le fonctionnement'],
      it: ['Richiedi diagnosi municipale', 'Vedi come funziona'],
      ca: ['Sol·licitar diagnòstic municipal', 'Veure com funciona']
    },
    directAnswers: {
      en: {
        title: 'How does AquaVerify help a municipal water operator?',
        body: 'AquaVerify can help municipal operators and water quality teams combine microbiology products, digital traceability, reporting and documentary evidence for control programmes. It may support documentation of samples, points, lots, methods, results, incidents and CoA. Regulatory use depends on country, sampling plan, method, laboratory, matrix and competent authority.'
      },
      es: {
        title: '¿Cómo ayuda AquaVerify a una operadora municipal de agua?',
        body: 'AquaVerify puede ayudar a operadoras municipales y equipos de calidad del agua a combinar productos de microbiología, trazabilidad digital, reporting y evidencia documental para programas de control. Puede apoyar la documentación de muestras, puntos, lotes, métodos, resultados, incidencias y CoA. El uso regulatorio depende del país, plan de muestreo, método, laboratorio, matriz y autoridad competente.'
      },
      fr: {
        title: 'Comment AquaVerify aide-t-il un opérateur municipal de l’eau ?',
        body: 'AquaVerify peut aider les opérateurs municipaux et les équipes qualité de l’eau à combiner produits de microbiologie, traçabilité numérique, reporting et preuves documentaires pour des programmes de contrôle. Il peut accompagner la documentation d’échantillons, points, lots, méthodes, résultats, incidents et CoA. L’usage réglementaire dépend du pays, plan de prélèvement, méthode, laboratoire, matrice et autorité compétente.'
      },
      it: {
        title: 'Come aiuta AquaVerify un gestore municipale dell’acqua?',
        body: 'AquaVerify può aiutare gestori municipali e team qualità dell’acqua a combinare prodotti di microbiologia, tracciabilità digitale, reporting ed evidenza documentale per programmi di controllo. Può supportare la documentazione di campioni, punti, lotti, metodi, risultati, incidenti e CoA. L’uso regolatorio dipende da paese, piano di campionamento, metodo, laboratorio, matrice e autorità competente.'
      },
      ca: {
        title: 'Com ajuda AquaVerify una operadora municipal d’aigua?',
        body: 'AquaVerify pot ajudar operadores municipals i equips de qualitat de l’aigua a combinar productes de microbiologia, traçabilitat digital, reporting i evidència documental per a programes de control. Pot donar suport a la documentació de mostres, punts, lots, mètodes, resultats, incidències i CoA. L’ús regulador depèn del país, pla de mostreig, mètode, laboratori, matriu i autoritat competent.'
      }
    },
    technicalTables: {
      en: {
        title: 'Municipal need and related AquaVerify layer',
        columns: ['Municipal need', 'AquaVerify layer', 'Evidence or action', 'Prudential note'],
        rows: [
          ['Control points', 'AquaVerify Cloud', 'Point, network, asset and status', 'Configure according to plan'],
          ['Screening', 'INDICA', 'Presence/absence and action', 'Does not replace confirmation when required'],
          ['Enumeration', 'ENUMERA', 'Comparable result and review', 'Depends on method and matrix'],
          ['Viral indicators', 'Kits/ENUMERA by product', 'Technical evidence and CoA', 'Review applicable regulation'],
          ['Reporting', 'Cloud and CoA', 'Report, incident and decision', 'Depends on competent authority']
        ]
      },
      es: {
        title: 'Necesidad municipal y capa AquaVerify relacionada',
        columns: ['Necesidad municipal', 'Capa AquaVerify', 'Evidencia o acción', 'Nota prudente'],
        rows: [
          ['Puntos de control', 'AquaVerify Cloud', 'Punto, red, activo y estado', 'Configurar según plan'],
          ['Screening', 'INDICA', 'Presencia/ausencia y acción', 'No sustituye confirmación si se requiere'],
          ['Enumeración', 'ENUMERA', 'Resultado comparable y revisión', 'Depende de método y matriz'],
          ['Indicadores virales', 'Kits/ENUMERA según producto', 'Evidencia técnica y CoA', 'Revisar normativa aplicable'],
          ['Reporting', 'Cloud y CoA', 'Informe, incidencia y decisión', 'Depende de autoridad competente']
        ]
      },
      fr: {
        title: 'Besoin municipal et couche AquaVerify associée',
        columns: ['Besoin municipal', 'Couche AquaVerify', 'Preuve ou action', 'Note prudente'],
        rows: [
          ['Points de contrôle', 'AquaVerify Cloud', 'Point, réseau, actif et statut', 'À configurer selon le plan'],
          ['Screening', 'INDICA', 'Présence/absence et action', 'Ne remplace pas une confirmation lorsque requise'],
          ['Dénombrement', 'ENUMERA', 'Résultat comparable et revue', 'Dépend de la méthode et de la matrice'],
          ['Indicateurs viraux', 'Kits/ENUMERA selon produit', 'Preuve technique et CoA', 'Revoir la réglementation applicable'],
          ['Reporting', 'Cloud et CoA', 'Rapport, incident et décision', 'Dépend de l’autorité compétente']
        ]
      },
      it: {
        title: 'Esigenza municipale e strato AquaVerify correlato',
        columns: ['Esigenza municipale', 'Strato AquaVerify', 'Evidenza o azione', 'Nota prudente'],
        rows: [
          ['Punti di controllo', 'AquaVerify Cloud', 'Punto, rete, asset e stato', 'Configurare secondo piano'],
          ['Screening', 'INDICA', 'Presenza/assenza e azione', 'Non sostituisce conferma quando richiesta'],
          ['Enumerazione', 'ENUMERA', 'Risultato comparabile e revisione', 'Dipende da metodo e matrice'],
          ['Indicatori virali', 'Kit/ENUMERA secondo prodotto', 'Evidenza tecnica e CoA', 'Rivedere normativa applicabile'],
          ['Reporting', 'Cloud e CoA', 'Rapporto, incidente e decisione', 'Dipende dall’autorità competente']
        ]
      },
      ca: {
        title: 'Necessitat municipal i capa AquaVerify relacionada',
        columns: ['Necessitat municipal', 'Capa AquaVerify', 'Evidència o acció', 'Nota prudent'],
        rows: [
          ['Punts de control', 'AquaVerify Cloud', 'Punt, xarxa, actiu i estat', 'Configurar segons pla'],
          ['Cribratge', 'INDICA', 'Presència/absència i acció', 'No substitueix confirmació quan calgui'],
          ['Enumeració', 'ENUMERA', 'Resultat comparable i revisió', 'Depèn de mètode i matriu'],
          ['Indicadors virals', 'Kits/ENUMERA segons producte', 'Evidència tècnica i CoA', 'Revisar normativa aplicable'],
          ['Reporting', 'Cloud i CoA', 'Informe, incidència i decisió', 'Depèn de l’autoritat competent']
        ]
      }
    },
    faqs: {
      en: [
        { question: 'Can AquaVerify support municipal sampling plans?', answer: 'It can be part of a planning, sampling, laboratory, review and reporting workflow for municipal water programmes. Fit depends on sampling plan, control points, matrix, frequency, laboratory, method and competent authority requirements.' },
        { question: 'How does AquaVerify help with somatic coliphages in drinking water?', answer: 'AquaVerify can provide products, media and digital traceability for workflows where somatic coliphages are used as a microbiological or viral indicator according to the programme. The concrete application should be reviewed according to regulation, method, matrix, country, laboratory and scope.' },
        { question: 'Can AquaVerify Cloud connect field, laboratory and report?', answer: 'Yes. AquaVerify Cloud can connect sampling point, operator, date, lot, method, reading, review, incident, CoA and history. Configuration should adapt to the operating model: internal laboratory, public laboratory, external laboratory or mixed model.' },
        { question: 'How should AquaVerify be evaluated in relation to RD 3/2023 or Directive (EU) 2020/2184?', answer: 'AquaVerify can help document processes, results, evidence and actions for water control programmes. Regulatory suitability depends on the control plan, applied method, laboratory, matrix, country, competent authority and operator responsibilities.' },
        { question: 'Can it be used by small municipalities or outsourced services?', answer: 'Yes, it can be configured for small municipalities, external operators or mixed models, starting with points, samples, results and reports. Scope should be defined according to available resources, laboratory involvement, sample volume, responsibilities and reporting needs.' }
      ],
      es: [
        { question: '¿AquaVerify sirve para planes de muestreo municipal?', answer: 'Puede formar parte de un flujo de planificación, toma de muestra, laboratorio, revisión e informe para programas municipales de agua. El encaje depende del plan de muestreo, puntos de control, matriz, frecuencia, laboratorio, método y requisitos de la autoridad competente.' },
        { question: '¿Cómo ayuda AquaVerify con colífagos somáticos en agua potable?', answer: 'AquaVerify puede aportar productos, medios y trazabilidad digital para flujos donde los colífagos somáticos se utilicen como indicador microbiológico o viral según el programa. La aplicación concreta debe revisarse según normativa, método, matriz, país, laboratorio y alcance.' },
        { question: '¿Puede AquaVerify Cloud conectar campo, laboratorio e informe?', answer: 'Sí. AquaVerify Cloud puede conectar punto de muestreo, operador, fecha, lote, método, lectura, revisión, incidencia, CoA e histórico. La configuración debe adaptarse al modelo operativo: laboratorio propio, público, externo o mixto.' },
        { question: '¿Cómo encaja AquaVerify con RD 3/2023 o Directiva UE 2020/2184?', answer: 'AquaVerify puede ayudar a documentar procesos, resultados, evidencias y acciones, pero el cumplimiento depende del plan de control, método aplicado, laboratorio, matriz, país, autoridad competente y responsabilidades del operador.' },
        { question: '¿Puede usarse en municipios pequeños o servicios externalizados?', answer: 'Sí, puede configurarse para municipios pequeños, operadores externos o modelos mixtos, empezando por puntos, muestras, resultados e informes. El alcance debe definirse según recursos disponibles, laboratorio implicado, volumen de muestras, responsabilidades y necesidades de reporting.' }
      ],
      fr: [
        { question: 'AquaVerify peut-il accompagner des plans de prélèvement municipaux ?', answer: 'Il peut faire partie d’un flux de planification, prélèvement, laboratoire, revue et rapport pour des programmes municipaux de l’eau. L’adéquation dépend du plan de prélèvement, des points de contrôle, de la matrice, de la fréquence, du laboratoire, de la méthode et des exigences de l’autorité compétente.' },
        { question: 'Comment AquaVerify aide-t-il avec les coliphages somatiques dans l’eau potable ?', answer: 'AquaVerify peut apporter produits, milieux et traçabilité numérique pour les flux où les coliphages somatiques sont utilisés comme indicateur microbiologique ou viral selon le programme. L’application concrète doit être revue selon réglementation, méthode, matrice, pays, laboratoire et portée.' },
        { question: 'AquaVerify Cloud peut-il relier terrain, laboratoire et rapport ?', answer: 'Oui. AquaVerify Cloud peut relier point de prélèvement, opérateur, date, lot, méthode, lecture, revue, incident, CoA et historique. La configuration doit s’adapter au modèle opérationnel : laboratoire interne, public, externe ou mixte.' },
        { question: 'Comment évaluer AquaVerify par rapport au RD 3/2023 ou à la Directive UE 2020/2184 ?', answer: 'AquaVerify peut aider à documenter processus, résultats, preuves et actions pour des programmes de contrôle de l’eau. L’adéquation réglementaire dépend du plan de contrôle, de la méthode appliquée, du laboratoire, de la matrice, du pays, de l’autorité compétente et des responsabilités de l’opérateur.' },
        { question: 'Peut-il être utilisé par de petites communes ou des services externalisés ?', answer: 'Oui, il peut être configuré pour de petites communes, des opérateurs externes ou des modèles mixtes, en commençant par points, échantillons, résultats et rapports. La portée doit être définie selon ressources disponibles, laboratoire impliqué, volume d’échantillons, responsabilités et besoins de reporting.' }
      ],
      it: [
        { question: 'AquaVerify serve per piani di campionamento municipali?', answer: 'Può far parte di un flusso di pianificazione, campionamento, laboratorio, revisione e report per programmi municipali dell’acqua. L’idoneità dipende da piano di campionamento, punti di controllo, matrice, frequenza, laboratorio, metodo e requisiti dell’autorità competente.' },
        { question: 'Come aiuta AquaVerify con i colifagi somatici nell’acqua potabile?', answer: 'AquaVerify può apportare prodotti, terreni e tracciabilità digitale per flussi in cui i colifagi somatici sono usati come indicatore microbiologico o virale secondo il programma. L’applicazione concreta va rivista secondo normativa, metodo, matrice, paese, laboratorio e ambito.' },
        { question: 'AquaVerify Cloud può collegare campo, laboratorio e rapporto?', answer: 'Sì. AquaVerify Cloud può collegare punto di campionamento, operatore, data, lotto, metodo, lettura, revisione, incidente, CoA e storico. La configurazione deve adattarsi al modello operativo: laboratorio interno, pubblico, esterno o misto.' },
        { question: 'Come valutare AquaVerify rispetto a RD 3/2023 o Direttiva UE 2020/2184?', answer: 'AquaVerify può aiutare a documentare processi, risultati, evidenze e azioni per programmi di controllo dell’acqua. L’idoneità regolatoria dipende da piano di controllo, metodo applicato, laboratorio, matrice, paese, autorità competente e responsabilità dell’operatore.' },
        { question: 'Può essere usato in piccoli comuni o servizi esternalizzati?', answer: 'Sì, può essere configurato per piccoli comuni, operatori esterni o modelli misti, iniziando da punti, campioni, risultati e rapporti. L’ambito va definito secondo risorse disponibili, laboratorio coinvolto, volume di campioni, responsabilità e necessità di reporting.' }
      ],
      ca: [
        { question: 'AquaVerify serveix per a plans de mostreig municipal?', answer: 'Pot formar part d’un flux de planificació, presa de mostra, laboratori, revisió i informe per a programes municipals d’aigua. L’encaix depèn del pla de mostreig, punts de control, matriu, freqüència, laboratori, mètode i requisits de l’autoritat competent.' },
        { question: 'Com ajuda AquaVerify amb colifags somàtics en aigua potable?', answer: 'AquaVerify pot aportar productes, medis i traçabilitat digital per a fluxos on els colifags somàtics s’utilitzin com a indicador microbiològic o viral segons el programa. L’aplicació concreta s’ha de revisar segons normativa, mètode, matriu, país, laboratori i abast.' },
        { question: 'AquaVerify Cloud pot connectar camp, laboratori i informe?', answer: 'Sí. AquaVerify Cloud pot connectar punt de mostreig, operador, data, lot, mètode, lectura, revisió, incidència, CoA i històric. La configuració s’ha d’adaptar al model operatiu: laboratori propi, públic, extern o mixt.' },
        { question: 'Com s’ha d’avaluar AquaVerify en relació amb el RD 3/2023 o la Directiva UE 2020/2184?', answer: 'AquaVerify pot ajudar a documentar processos, resultats, evidències i accions per a programes de control de l’aigua. La idoneïtat reguladora depèn del pla de control, mètode aplicat, laboratori, matriu, país, autoritat competent i responsabilitats de l’operador.' },
        { question: 'Es pot usar en municipis petits o serveis externalitzats?', answer: 'Sí, es pot configurar per a municipis petits, operadors externs o models mixtos, començant per punts, mostres, resultats i informes. L’abast s’ha de definir segons recursos disponibles, laboratori implicat, volum de mostres, responsabilitats i necessitats de reporting.' }
      ]
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
    id: 'agriculture-water',
    paths: {
      en: '/industries/agriculture-water-management',
      es: '/es/industrias/agricultura',
      fr: '/fr/industries/eau-agriculture',
      it: '/it/settori/acqua-agricoltura',
      ca: '/ca/sectors/aigua-agricultura'
    },
    titles: {
      en: 'Agricultural water control for irrigation and traceability',
      es: 'Control del agua agrícola para riego y trazabilidad',
      fr: 'Contrôle de l’eau agricole pour irrigation et traçabilité',
      it: 'Controllo dell’acqua agricola per irrigazione e tracciabilità',
      ca: 'Control de l’aigua agrícola per a reg i traçabilitat'
    },
    descriptions: {
      en: 'Coordinate agricultural water sampling, microbiological results, reclaimed water evidence and plot-level reporting for farms, greenhouses and cooperatives.',
      es: 'Coordina muestreo de agua agrícola, resultados microbiológicos, evidencias de agua regenerada y reporting por parcela para explotaciones, invernaderos y cooperativas.',
      fr: 'Coordonnez prélèvements d’eau agricole, résultats microbiologiques, preuves d’eau réutilisée et reporting par parcelle pour exploitations, serres et coopératives.',
      it: 'Coordina campionamento dell’acqua agricola, risultati microbiologici, evidenze acqua riutilizzata e reporting per parcella per aziende, serre e cooperative.',
      ca: 'Coordina mostreig d’aigua agrícola, resultats microbiològics, evidències d’aigua regenerada i reporting per parcel·la per a explotacions, hivernacles i cooperatives.'
    },
    sections: {
      en: [
        section('For farms, greenhouses and cooperatives', 'Agricultural teams need a traceable way to connect water sources, sampling points, plots, crops, results and actions.', ['Irrigation and reclaimed water control', 'Georeferenced sampling points', 'Laboratory and field coordination', 'Campaign history by plot']),
        section('From source to decision', 'AquaVerify Cloud keeps water quality evidence connected to source, plot, crop, campaign and report.')
      ],
      es: [
        section('Para explotaciones, invernaderos y cooperativas', 'Los equipos agrícolas necesitan conectar fuentes de agua, puntos de muestreo, parcelas, cultivos, resultados y acciones de forma trazable.', ['Control de riego y agua regenerada', 'Puntos de muestreo georreferenciados', 'Coordinación campo-laboratorio', 'Histórico por parcela y campaña']),
        section('De la fuente a la decisión', 'AquaVerify Cloud mantiene la evidencia de calidad del agua conectada con fuente, parcela, cultivo, campaña e informe.')
      ],
      fr: [
        section('Pour exploitations, serres et coopératives', 'Les équipes agricoles doivent relier sources d’eau, points de prélèvement, parcelles, cultures, résultats et actions de façon traçable.', ['Contrôle irrigation et eau réutilisée', 'Points de prélèvement géoréférencés', 'Coordination terrain-laboratoire', 'Historique par parcelle et campagne']),
        section('De la source à la décision', 'AquaVerify Cloud garde les preuves qualité eau reliées à source, parcelle, culture, campagne et rapport.')
      ],
      it: [
        section('Per aziende agricole, serre e cooperative', 'I team agricoli devono collegare fonti acqua, punti di campionamento, parcelle, colture, risultati e azioni in modo tracciabile.', ['Controllo irrigazione e acqua riutilizzata', 'Punti di campionamento georeferenziati', 'Coordinamento campo-laboratorio', 'Storico per parcella e campagna']),
        section('Dalla fonte alla decisione', 'AquaVerify Cloud mantiene l’evidenza qualità acqua collegata a fonte, parcella, coltura, campagna e report.')
      ],
      ca: [
        section('Per a explotacions, hivernacles i cooperatives', 'Els equips agrícoles necessiten connectar fonts d’aigua, punts de mostreig, parcel·les, cultius, resultats i accions de forma traçable.', ['Control de reg i aigua regenerada', 'Punts de mostreig georeferenciats', 'Coordinació camp-laboratori', 'Històric per parcel·la i campanya']),
        section('De la font a la decisió', 'AquaVerify Cloud manté l’evidència de qualitat de l’aigua connectada amb font, parcel·la, cultiu, campanya i informe.')
      ]
    },
    ctas: {
      en: ['Request agriculture water fit', 'View workflow'],
      es: ['Pedir encaje agrícola', 'Ver flujo'],
      fr: ['Demander cadrage agricole', 'Voir flux'],
      it: ['Chiedi inquadramento agricolo', 'Vedi flusso'],
      ca: ['Demanar encaix agrícola', 'Veure flux']
    }
  },
  {
    id: 'pharma-cosmetics-water',
    paths: {
      en: '/industries/pharmaceutical-cosmetics-water-quality',
      es: '/es/industrias/industria-farmaceutica-cosmetica',
      fr: '/fr/industries/qualite-eau-industrie-pharmaceutique-cosmetique',
      it: '/it/settori/qualita-acqua-industria-farmaceutica-cosmetica',
      ca: '/ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica'
    },
    titles: {
      en: 'Pharmaceutical and cosmetics water quality control',
      es: 'Control del agua para industria farmacéutica y cosmética',
      fr: 'Contrôle de l’eau pour industrie pharmaceutique et cosmétique',
      it: 'Controllo acqua per industria farmaceutica e cosmetica',
      ca: 'Control de l’aigua per a indústria farmacèutica i cosmètica'
    },
    descriptions: {
      en: 'Connect points of use, samples, methods, CoA, trends, deviations and batch-ready evidence for pharmaceutical and cosmetics manufacturing.',
      es: 'Conecta puntos de uso, muestras, métodos, CoA, tendencias, desviaciones y evidencia por lote para fabricación farmacéutica y cosmética.',
      fr: 'Reliez points d’utilisation, échantillons, méthodes, CoA, tendances, déviations et preuves par lot pour fabrication pharmaceutique et cosmétique.',
      it: 'Collega punti d’uso, campioni, metodi, CoA, trend, deviazioni ed evidenze per lotto per produzione farmaceutica e cosmetica.',
      ca: 'Connecta punts d’ús, mostres, mètodes, CoA, tendències, desviacions i evidència per lot per a fabricació farmacèutica i cosmètica.'
    },
    sections: {
      en: [section('Water control for regulated manufacturing', 'AquaVerify connects water systems, sampling points, batches, products and QA/QC review in one traceable workflow.')],
      es: [section('Control del agua para fabricación regulada', 'AquaVerify conecta sistemas de agua, puntos de muestreo, lotes, productos y revisión QA/QC en un flujo trazable.')],
      fr: [section('Contrôle de l’eau pour fabrication réglementée', 'AquaVerify relie systèmes d’eau, points de prélèvement, lots, produits et revue QA/QC dans un flux traçable.')],
      it: [section('Controllo acqua per produzione regolata', 'AquaVerify collega sistemi acqua, punti di campionamento, lotti, prodotti e revisione QA/QC in un flusso tracciabile.')],
      ca: [section('Control de l’aigua per a fabricació regulada', 'AquaVerify connecta sistemes d’aigua, punts de mostreig, lots, productes i revisió QA/QC en un flux traçable.')]
    },
    ctas: {
      en: ['Request water-control assessment', 'View quality workflow'],
      es: ['Solicitar diagnóstico de agua', 'Ver flujo de calidad'],
      fr: ['Demander un diagnostic eau', 'Voir le flux qualité'],
      it: ['Richiedi diagnosi acqua', 'Vedi flusso qualità'],
      ca: ['Sol·licitar diagnòstic d’aigua', 'Veure flux de qualitat']
    }
  },
  {
    id: 'hospitality-tourism-water',
    paths: {
      en: '/industries/hospitality-tourism-leisure-water-quality',
      es: '/es/industrias/hosteleria-turismo-ocio',
      fr: '/fr/industries/eau-hotellerie-tourisme-loisirs',
      it: '/it/settori/acqua-ospitalita-turismo-tempo-libero',
      ca: '/ca/sectors/aigua-hostaleria-turisme-oci'
    },
    titles: {
      en: 'Hospitality, tourism and leisure water management',
      es: 'Gestión del agua para hostelería, turismo y ocio',
      fr: 'Gestion de l’eau pour hôtellerie, tourisme et loisirs',
      it: 'Gestione dell’acqua per ospitalità, turismo e tempo libero',
      ca: 'Gestió de l’aigua per a hostaleria, turisme i oci'
    },
    descriptions: {
      en: 'Connect assets, sampling plans, laboratories, incidents, corrective actions and evidence for hotels, resorts, spas, pools, restaurants and leisure venues.',
      es: 'Conecta activos, planes de muestreo, laboratorio, incidencias, acciones correctoras y evidencias para hoteles, resorts, spas, piscinas, restauración y ocio.',
      fr: 'Reliez actifs, plans de prélèvement, laboratoires, incidents, actions correctives et preuves pour hôtels, resorts, spas, piscines, restauration et loisirs.',
      it: 'Collega asset, piani di campionamento, laboratori, incidenti, azioni correttive ed evidenze per hotel, resort, spa, piscine, ristorazione e leisure.',
      ca: 'Connecta actius, plans de mostreig, laboratoris, incidències, accions correctores i evidències per a hotels, resorts, spas, piscines, restauració i oci.'
    },
    sections: {
      en: [section('Water management for hospitality and leisure', 'AquaVerify connects facilities, assets, sampling points, suppliers and corrective actions in one traceable workflow.')],
      es: [section('Gestión del agua para hostelería y ocio', 'AquaVerify conecta instalaciones, activos, puntos de muestreo, proveedores y acciones correctoras en un flujo trazable.')],
      fr: [section('Gestion de l’eau pour hôtellerie et loisirs', 'AquaVerify relie installations, actifs, points de prélèvement, prestataires et actions correctives dans un flux traçable.')],
      it: [section('Gestione acqua per ospitalità e leisure', 'AquaVerify collega strutture, asset, punti di campionamento, fornitori e azioni correttive in un flusso tracciabile.')],
      ca: [section('Gestió de l’aigua per a hostaleria i oci', 'AquaVerify connecta instal·lacions, actius, punts de mostreig, proveïdors i accions correctores en un flux traçable.')]
    },
    ctas: {
      en: ['Request water programme assessment', 'View operational workflow'],
      es: ['Solicitar diagnóstico de agua', 'Ver flujo operativo'],
      fr: ['Demander un diagnostic eau', 'Voir le flux opérationnel'],
      it: ['Richiedi diagnosi acqua', 'Vedi flusso operativo'],
      ca: ['Sol·licitar diagnòstic d’aigua', 'Veure flux operatiu']
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
      { question: 'Does the workflow include digital traceability?', answer: 'Yes. AquaVerify Cloud can connect samples, operators, reports, customer context and follow-up history in one operational workflow.' }
    ],
    es: [
      { question: `¿Puede AquaVerify apoyar ${item.titles.es.toLowerCase()}?`, answer: item.descriptions.es },
      { question: '¿El flujo incluye trazabilidad digital?', answer: 'Sí. AquaVerify Cloud puede conectar muestras, operadores, informes, contexto de cliente e historial de seguimiento en un mismo flujo operativo.' }
    ],
    fr: [
      { question: `AquaVerify peut-il accompagner ${item.titles.fr.toLowerCase()} ?`, answer: item.descriptions.fr },
      { question: 'Le flux inclut-il la traçabilité numérique ?', answer: 'Oui. AquaVerify Cloud peut connecter échantillons, opérateurs, rapports, contexte client et historique de suivi dans un même flux opérationnel.' }
    ],
    it: [
      { question: `AquaVerify può supportare ${item.titles.it.toLowerCase()}?`, answer: item.descriptions.it },
      { question: 'Il flusso include tracciabilità digitale?', answer: 'Sì. AquaVerify Cloud può collegare campioni, operatori, report, contesto cliente e storico follow-up in un unico flusso operativo.' }
    ],
    ca: [
      { question: `AquaVerify pot donar suport a ${item.titles.ca.toLowerCase()}?`, answer: item.descriptions.ca },
      { question: 'El flux inclou traçabilitat digital?', answer: 'Sí. AquaVerify Cloud pot connectar mostres, operadors, informes, context de client i historial de seguiment en un mateix flux operatiu.' }
    ]
  };
  return common[lang] || common.en;
}

function buildIndustryPages() {
  return INDUSTRY_PAGE_DATA.map((item) => {
    if (item.id === 'food-beverage-water-quality') {
      return page(
        'food-beverage-water-quality',
        'industries',
        'contact',
        Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, FOOD_BEVERAGE_WATER_PAGE[lang]])),
        { parentId: 'water-quality-control' }
      );
    }

    if (item.id === 'industrial-process-water') {
      return page(
        'industrial-process-water',
        'industries',
        'contact',
        Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, INDUSTRIAL_PROCESS_WATER_PAGE[lang]])),
        { parentId: 'water-quality-control' }
      );
    }

    if (item.id === 'facility-water-risk') {
      return page(
        'facility-water-risk',
        'industries',
        'contact',
        Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, FACILITY_WATER_RISK_PAGE[lang]])),
        { parentId: 'water-quality-control' }
      );
    }

    if (item.id === 'agriculture-water') {
      return page(
        'agriculture-water',
        'industries',
        'contact',
        Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, AGRICULTURE_WATER_PAGE[lang]])),
        { parentId: 'water-quality-control' }
      );
    }

    if (item.id === 'pharma-cosmetics-water') {
      return page(
        'pharma-cosmetics-water',
        'industries',
        'contact',
        Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, PHARMA_COSMETICS_WATER_PAGE[lang]])),
        { parentId: 'water-quality-control' }
      );
    }

    if (item.id === 'hospitality-tourism-water') {
      return page(
        'hospitality-tourism-water',
        'industries',
        'contact',
        Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, HOSPITALITY_TOURISM_WATER_PAGE[lang]])),
        { parentId: 'water-quality-control' }
      );
    }

    return page(
      item.id,
      'industries',
      'contact',
      Object.fromEntries(MARKETING_LANGUAGES.map((lang) => [lang, withAnswerLayer(locale(
        item.paths[lang],
        item.titles[lang],
        item.descriptions[lang],
        item.sections[lang],
        {
          eyebrow: item.eyebrows?.[lang] || 'Industry',
          primaryCta: item.ctas[lang][0],
          secondaryCta: item.ctas[lang][1],
          seoTitle: `${item.titles[lang]} | AquaVerify`,
          seoDescription: item.descriptions[lang],
          faqs: item.faqs?.[lang] || buildIndustryFaqs(item, lang)
        }
      ), item.directAnswers?.[lang], item.technicalTables?.[lang])])),
      { parentId: 'water-quality-control' }
    );
  });
}

export const INDUSTRY_DETAIL_MARKETING_PAGES = buildIndustryPages();
export const INDUSTRY_MARKETING_PAGES = [
  ...INDUSTRY_ENTRY_MARKETING_PAGES,
  ...INDUSTRY_DETAIL_MARKETING_PAGES
];
