export const MARKETING_OVERRIDE_SECTION_ID = 'marketing_page';
const PENDING_PARAMETER_VALIDATION_PATHS = [
  'enumera-entero100'
];

const LEGACY_COLIPHAGE_INDICATOR_TITLES = new Set([
  'Coliphages as viral indicators for water quality',
  'Colífagos como indicadores virales de calidad del agua',
  'Coliphages comme indicateurs viraux de qualité de l’eau',
  'Colifagi come indicatori virali di qualità dell’acqua',
  'Colífags com a indicadors virals de qualitat de l’aigua'
]);

const PUBLIC_COPY_REPLACEMENTS = [
  ['CRM attribution from web leads to partner conversations', 'Qualified web enquiries connected to partner conversations'],
  ['Whitepaper on software evidence, audit trails, sample traceability and CRM attribution for water quality compliance workflows.', 'Whitepaper on software evidence, audit trails, sample traceability and customer follow-up for water quality compliance workflows.'],
  ['Whitepaper sobre evidencia software, audit trail, trazabilidad de muestras y atribución CRM para flujos de cumplimiento en calidad del agua.', 'Whitepaper sobre evidencia software, audit trail, trazabilidad de muestras y seguimiento de clientes para flujos de cumplimiento en calidad del agua.'],
  ['Whitepaper sur preuve logicielle, piste d’audit, traçabilité échantillons et attribution CRM pour flux conformité qualité eau.', 'Whitepaper sur preuve logicielle, piste d’audit, traçabilité échantillons et suivi client pour flux conformité qualité eau.'],
  ['Whitepaper su evidenza software, audit trail, tracciabilità campioni e attribuzione CRM per flussi conformità qualità acqua.', 'Whitepaper su evidenza software, audit trail, tracciabilità campioni e follow-up cliente per flussi conformità qualità acqua.'],
  ['Whitepaper sobre evidència software, audit trail, traçabilitat de mostres i atribució CRM per a fluxos de compliment en qualitat de l’aigua.', 'Whitepaper sobre evidència software, audit trail, traçabilitat de mostres i seguiment de clients per a fluxos de compliment en qualitat de l’aigua.'],
  ['Whitepaper on using connected software to organize samples, methods, audit trails, reports and CRM follow-up for water quality teams.', 'Whitepaper on using connected software to organize samples, methods, audit trails, reports and customer follow-up for water quality teams.'],
  ['Whitepaper sobre cómo usar software conectado para organizar muestras, métodos, auditoría, informes y seguimiento CRM en equipos de calidad del agua.', 'Whitepaper sobre cómo usar software conectado para organizar muestras, métodos, auditoría, informes y seguimiento de clientes en equipos de calidad del agua.'],
  ['Whitepaper sur l’utilisation d’un logiciel connecté pour organiser échantillons, méthodes, piste d’audit, rapports et suivi CRM en qualité eau.', 'Whitepaper sur l’utilisation d’un logiciel connecté pour organiser échantillons, méthodes, piste d’audit, rapports et suivi client en qualité eau.'],
  ['Whitepaper sull’uso di software collegato per organizzare campioni, metodi, audit trail, report e follow-up CRM nei team qualità acqua.', 'Whitepaper sull’uso di software collegato per organizzare campioni, metodi, audit trail, report e follow-up cliente nei team qualità acqua.'],
  ['Whitepaper sobre com usar software connectat per organitzar mostres, mètodes, auditoria, informes i seguiment CRM en equips de qualitat de l’aigua.', 'Whitepaper sobre com usar software connectat per organitzar mostres, mètodes, auditoria, informes i seguiment de clients en equips de qualitat de l’aigua.'],
  ['Customer communication and CRM attribution', 'Customer communication and follow-up history'],
  ['Comunicación cliente y atribución CRM', 'Comunicación cliente e historial de seguimiento'],
  ['Communication client et attribution CRM', 'Communication client et historique de suivi'],
  ['Comunicazione cliente e attribuzione CRM', 'Comunicazione cliente e storico follow-up'],
  ['Comunicació client i atribució CRM', 'Comunicació client i historial de seguiment'],
  ['Dashboards for pipeline, product interest and recurring demand', 'Dashboards for product interest, workload and recurring demand'],
  ['Dashboards de pipeline, interés de producto y demanda recurrente', 'Paneles de interés de producto, carga de trabajo y demanda recurrente'],
  ['Dashboards pipeline, intérêt produit et demande récurrente', 'Tableaux de bord pour intérêt produit, charge de travail et demande récurrente'],
  ['Dashboard per pipeline, interesse prodotto e domanda ricorrente', 'Dashboard per interesse prodotto, carico di lavoro e domanda ricorrente'],
  ['Dashboards de pipeline, interès de producte i demanda recurrent', 'Panells d’interès de producte, càrrega de treball i demanda recurrent'],
  ['AquaVerify Cloud can connect either workflow to sample context, operators, customer communication and CRM attribution.', 'AquaVerify Cloud can connect either workflow to sample context, operators, customer communication and follow-up history.'],
  ['AquaVerify Cloud puede conectar ambos flujos con contexto de muestra, operadores, comunicación cliente y atribución CRM.', 'AquaVerify Cloud puede conectar ambos flujos con contexto de muestra, operadores, comunicación cliente e historial de seguimiento.'],
  ['AquaVerify Cloud peut connecter les deux flux au contexte échantillon, aux opérateurs, à la communication client et à l’attribution CRM.', 'AquaVerify Cloud peut connecter les deux flux au contexte échantillon, aux opérateurs, à la communication client et à l’historique de suivi.'],
  ['AquaVerify Cloud può collegare entrambi i flussi a contesto campione, operatori, comunicazione cliente e attribuzione CRM.', 'AquaVerify Cloud può collegare entrambi i flussi a contesto campione, operatori, comunicazione cliente e storico follow-up.'],
  ['AquaVerify Cloud pot connectar tots dos fluxos amb context de mostra, operadors, comunicació client i atribució CRM.', 'AquaVerify Cloud pot connectar tots dos fluxos amb context de mostra, operadors, comunicació client i historial de seguiment.'],
  ['Yes. AquaVerify Cloud can connect samples, operators, reports, customer context and CRM attribution in one operational workflow.', 'Yes. AquaVerify Cloud can connect samples, operators, reports, customer context and follow-up history in one operational workflow.'],
  ['Sí. AquaVerify Cloud puede conectar muestras, operadores, informes, contexto de cliente y atribución CRM en un mismo flujo operativo.', 'Sí. AquaVerify Cloud puede conectar muestras, operadores, informes, contexto de cliente e historial de seguimiento en un mismo flujo operativo.'],
  ['Oui. AquaVerify Cloud peut connecter échantillons, opérateurs, rapports, contexte client et attribution CRM dans un même flux opérationnel.', 'Oui. AquaVerify Cloud peut connecter échantillons, opérateurs, rapports, contexte client et historique de suivi dans un même flux opérationnel.'],
  ['Sì. AquaVerify Cloud può collegare campioni, operatori, report, contesto cliente e attribuzione CRM in un unico flusso operativo.', 'Sì. AquaVerify Cloud può collegare campioni, operatori, report, contesto cliente e storico follow-up in un unico flusso operativo.'],
  ['Sí. AquaVerify Cloud pot connectar mostres, operadors, informes, context de client i atribució CRM en un mateix flux operatiu.', 'Sí. AquaVerify Cloud pot connectar mostres, operadors, informes, context de client i historial de seguiment en un mateix flux operatiu.'],
  ['How AquaVerify turns interest into pipeline', 'How AquaVerify turns interest into a clear next step'],
  ['Cómo AquaVerify convierte interés en pipeline', 'Cómo AquaVerify convierte interés en un siguiente paso claro'],
  ['Comment AquaVerify transforme l’intérêt en pipeline', 'Comment AquaVerify transforme l’intérêt en prochaine étape claire'],
  ['Come AquaVerify trasforma interesse in pipeline', 'Come AquaVerify trasforma interesse in un prossimo passo chiaro'],
  ['Com AquaVerify converteix interès en pipeline', 'Com AquaVerify converteix interès en un següent pas clar'],
  ['AquaVerify can connect US-oriented educational content with product pages, datasheets, demo requests and CRM attribution so qualified visitors arrive in Sales with page, intent, product and campaign context.', 'AquaVerify connects US-oriented educational content with product pages, datasheets and demo requests so visitors can move from research to a structured product, platform or distributor conversation.'],
  ['AquaVerify conecta contenido educativo orientado a Estados Unidos con páginas de producto, datasheets, solicitudes de demo y atribución CRM para que los visitantes cualificados lleguen a Sales con contexto de página, intención, producto y campaña.', 'AquaVerify conecta contenido educativo orientado a Estados Unidos con páginas de producto, datasheets y solicitudes de demo para que el visitante pase de la investigación a una conversación estructurada de producto, plataforma o distribución.'],
  ['AquaVerify relie le contenu éducatif orienté États-Unis aux pages produit, datasheets, demandes de démo et attribution CRM afin que les visiteurs qualifiés arrivent aux ventes avec contexte page, intention, produit et campagne.', 'AquaVerify relie le contenu éducatif orienté États-Unis aux pages produit, datasheets et demandes de démo afin que le visiteur passe de la recherche à une discussion structurée produit, plateforme ou distribution.'],
  ['AquaVerify collega contenuto educativo orientato Stati Uniti con pagine prodotto, datasheet, richieste demo e attribuzione CRM affinché i visitatori qualificati arrivino alle vendite con contesto di pagina, intento, prodotto e campagna.', 'AquaVerify collega contenuto educativo orientato Stati Uniti con pagine prodotto, datasheet e richieste demo affinché il visitatore passi dalla ricerca a una conversazione strutturata su prodotto, piattaforma o distribuzione.'],
  ['AquaVerify connecta contingut educatiu orientat als Estats Units amb pàgines de producte, datasheets, sol·licituds de demo i atribució CRM perquè els visitants qualificats arribin a Sales amb context de pàgina, intenció, producte i campanya.', 'AquaVerify connecta contingut educatiu orientat als Estats Units amb pàgines de producte, datasheets i sol·licituds de demo perquè el visitant passi de la recerca a una conversa estructurada de producte, plataforma o distribució.'],
  ['How should US leads use this resource?', 'How should US teams use this resource?'],
  ['¿Cómo debería usar este recurso un lead de Estados Unidos?', '¿Cómo debería usar este recurso un equipo de Estados Unidos?'],
  ['Comment un lead américain doit-il utiliser cette ressource?', 'Comment une équipe américaine doit-elle utiliser cette ressource?'],
  ['Come dovrebbe usare questa risorsa un lead statunitense?', 'Come dovrebbe usare questa risorsa un team statunitense?'],
  ['Com hauria d’usar aquest recurs un lead dels Estats Units?', 'Com hauria d’usar aquest recurs un equip dels Estats Units?'],
  ['Use it to prepare a conversation about monitoring workflow, products, method readiness, evidence records and whether AquaVerify Cloud should support reporting and CRM follow-up.', 'Use it to prepare a conversation about monitoring workflow, products, method readiness, evidence records and whether AquaVerify Cloud should support reporting and customer follow-up.'],
  ['Para preparar una conversación sobre flujo de monitorización, productos, preparación metodológica, registros de evidencia y si AquaVerify Cloud debe apoyar reporting y seguimiento CRM.', 'Para preparar una conversación sobre flujo de monitorización, productos, preparación metodológica, registros de evidencia y si AquaVerify Cloud debe apoyar reporting y seguimiento de clientes.'],
  ['Pour préparer une discussion sur flux de surveillance, produits, préparation méthode, preuves et éventuel support AquaVerify Cloud pour reporting et suivi CRM.', 'Pour préparer une discussion sur flux de surveillance, produits, préparation méthode, preuves et éventuel support AquaVerify Cloud pour reporting et suivi client.'],
  ['Per preparare una conversazione su flusso di monitoraggio, prodotti, preparazione metodo, registri di evidenza e se AquaVerify Cloud debba supportare reporting e follow-up CRM.', 'Per preparare una conversazione su flusso di monitoraggio, prodotti, preparazione metodo, registri di evidenza e se AquaVerify Cloud debba supportare reporting e follow-up cliente.'],
  ['Per preparar una conversa sobre flux de monitoratge, productes, preparació metodològica, registres d’evidència i si AquaVerify Cloud ha de donar suport a reporting i seguiment CRM.', 'Per preparar una conversa sobre flux de monitoratge, productes, preparació metodològica, registres d’evidència i si AquaVerify Cloud ha de donar suport a reporting i seguiment de clients.']
];

export function getMarketingOverrideSlug(pageId, lang) {
  return `marketing-${pageId}-${lang}`;
}

function cleanText(value) {
  return typeof value === 'string' ? sanitizePendingParameterCopy(value) : '';
}

function sanitizePendingParameterCopy(value) {
  const cleaned = value
    .replace(/\bENUMERA\s+Coli100\s+for\s+enterococci\s+workflows\b/gi, 'ENUMERA Coli100 for bacterial indicator workflows')
    .replace(/\bENUMERA\s+Entero100\s+for\s+enterococci\s+workflows\b/gi, 'ENUMERA Entero100 for bacterial indicator workflows')
    .replace(/\bENUMERA\s+Coli100\s+para\s+enterococos\b/gi, 'ENUMERA Coli100 para indicadores bacterianos')
    .replace(/\bENUMERA\s+Entero100\s+para\s+enterococos\b/gi, 'ENUMERA Entero100 para indicadores bacterianos')
    .replace(/\bENUMERA\s+Coli100\s+pour\s+les\s+entérocoques\b/gi, 'ENUMERA Coli100 pour les indicateurs bactériens')
    .replace(/\bENUMERA\s+Entero100\s+pour\s+les\s+entérocoques\b/gi, 'ENUMERA Entero100 pour les indicateurs bactériens')
    .replace(/\bENUMERA\s+Coli100\s+per\s+enterococchi\b/gi, 'ENUMERA Coli100 per indicatori batterici')
    .replace(/\bENUMERA\s+Entero100\s+per\s+enterococchi\b/gi, 'ENUMERA Entero100 per indicatori batterici')
    .replace(/\bENUMERA\s+Coli100\s+per\s+a\s+enterococs\b/gi, 'ENUMERA Coli100 per a indicadors bacterians')
    .replace(/\bENUMERA\s+Entero100\s+per\s+a\s+enterococs\b/gi, 'ENUMERA Entero100 per a indicadors bacterians');

  return PUBLIC_COPY_REPLACEMENTS.reduce(
    (text, [from, to]) => text.split(from).join(to),
    cleaned
  );
}

function normalizeBullets(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanText(item).trim())
    .filter(Boolean);
}

function normalizeSections(value) {
  if (!Array.isArray(value)) return null;
  const sections = value
    .map((item) => ({
      title: cleanText(item?.title),
      body: cleanText(item?.body),
      bullets: normalizeBullets(item?.bullets)
    }))
    .filter((item) => item.title || item.body || item.bullets.length > 0);
  return sections.length > 0 ? sections : null;
}

function normalizeFaqs(value) {
  if (!Array.isArray(value)) return null;
  const faqs = value
    .map((item) => ({
      question: cleanText(item?.question),
      answer: cleanText(item?.answer)
    }))
    .filter((item) => item.question && item.answer);
  return faqs.length > 0 ? faqs : null;
}

function normalizeGallery(value) {
  if (!Array.isArray(value)) return null;
  const gallery = value
    .map((item) => ({
      src: cleanText(item?.src),
      alt: cleanText(item?.alt),
      title: cleanText(item?.title),
      body: cleanText(item?.body)
    }))
    .filter((item) => item.src && item.alt);
  return gallery.length > 0 ? gallery : null;
}

export function normalizeMarketingOverride(value) {
  if (!value || typeof value !== 'object') return null;

  const override = {
    path: cleanText(value.path),
    title: cleanText(value.title),
    description: cleanText(value.description),
    eyebrow: cleanText(value.eyebrow),
    primaryCta: cleanText(value.primaryCta),
    secondaryCta: cleanText(value.secondaryCta),
    heroImage: cleanText(value.heroImage),
    heroImageAlt: cleanText(value.heroImageAlt),
    heroVideo: cleanText(value.heroVideo),
    ogImage: cleanText(value.ogImage),
    datasheetUrl: cleanText(value.datasheetUrl),
    datasheetLabel: cleanText(value.datasheetLabel),
    seoTitle: cleanText(value.seoTitle),
    seoDescription: cleanText(value.seoDescription),
    sections: normalizeSections(value.sections),
    faqs: normalizeFaqs(value.faqs),
    gallery: normalizeGallery(value.gallery)
  };

  return Object.fromEntries(
    Object.entries(override).filter(([, item]) => {
      if (Array.isArray(item)) return item.length > 0;
      return item !== null && item !== '';
    })
  );
}

function isLegacyColiphageIndicatorOverride(baseContent, override) {
  const basePath = String(baseContent?.path || '');
  const overrideTitle = String(override?.title || '');
  const sections = Array.isArray(override?.sections) ? override.sections : [];
  const firstSection = `${String(sections[0]?.title || '')} ${String(sections[0]?.body || '')}`;
  const isColiphageIndicatorPath = [
    '/resources/coliphages-water-quality-indicators',
    '/recursos/colifagos-indicadores-calidad-agua',
    '/ressources/coliphages-indicateurs-qualite-eau',
    '/risorse/colifagi-indicatori-qualita-acqua',
    '/recursos/colifags-indicadors-qualitat-aigua'
  ].some((path) => basePath.includes(path));

  return isColiphageIndicatorPath
    && LEGACY_COLIPHAGE_INDICATOR_TITLES.has(overrideTitle)
    && sections.length <= 2
    && /indicator|indicador|indicateur|indicatore/i.test(firstSection);
}

export function mergeMarketingContent(baseContent, overrideContent) {
  const override = normalizeMarketingOverride(overrideContent);
  if (!override) return baseContent;

  if (isLegacyColiphageIndicatorOverride(baseContent, override)) {
    return {
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      heroVideo: override.heroVideo || baseContent.heroVideo,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      primaryCta: override.primaryCta || baseContent.primaryCta,
      secondaryCta: override.secondaryCta || baseContent.secondaryCta,
      gallery: override.gallery || baseContent.gallery || [],
      path: baseContent.path
    };
  }

  if (PENDING_PARAMETER_VALIDATION_PATHS.some((path) => baseContent.path?.includes(path))) {
    return {
      ...baseContent,
      heroImage: override.heroImage || baseContent.heroImage,
      heroImageAlt: override.heroImageAlt || baseContent.heroImageAlt,
      heroVideo: override.heroVideo || baseContent.heroVideo,
      ogImage: override.ogImage || baseContent.ogImage,
      datasheetUrl: override.datasheetUrl || baseContent.datasheetUrl,
      datasheetLabel: override.datasheetLabel || baseContent.datasheetLabel,
      primaryCta: override.primaryCta || baseContent.primaryCta,
      secondaryCta: override.secondaryCta || baseContent.secondaryCta,
      gallery: override.gallery || baseContent.gallery || [],
      path: baseContent.path
    };
  }

  return {
    ...baseContent,
    ...override,
    path: baseContent.path,
    sections: override.sections || baseContent.sections,
    faqs: override.faqs || baseContent.faqs || [],
    gallery: override.gallery || baseContent.gallery || []
  };
}
