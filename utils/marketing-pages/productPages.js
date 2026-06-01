import { getProductAssetOptions } from '../productAssets.js';
import { MARKETING_LANGUAGES, locale, page, section } from './shared.js';

const ENUMERA_GALLERY_ITEMS = {
  en: [
    { src: '/images/products/marketing/enumera.svg', alt: 'AquaVerify ENUMERA quantitative water microbiology kit family', title: 'ENUMERA family', body: 'A quantitative product family for water microbiology enumeration workflows.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'ENUMERA Coli 100 tray with yellow and green wells', title: 'ENUMERA Coli 100', body: 'Chromogenic visual reading for E. coli and total coliform workflows.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'ENUMERA Soma100 somatic coliphage kit visual', title: 'ENUMERA Soma100', body: 'Quantitative workflow for somatic coliphage analysis.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'ENUMERA Entero100 bacterial indicator kit visual', title: 'ENUMERA Entero100', body: 'Quantitative workflow for bacterial indicator routines.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'ENUMERA multipwell tray product visual', title: 'Multipwell tray', body: 'Tray format designed for repeatable enumeration and result interpretation.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'ENUMERA reader and workflow tools visual', title: 'Workflow tools', body: 'Accessories and workflow tools that support consistent laboratory operation.' }
  ],
  es: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Familia de kits cuantitativos AquaVerify ENUMERA para microbiología del agua', title: 'Familia ENUMERA', body: 'Familia cuantitativa para flujos de enumeración en microbiología del agua.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 con pocillos amarillos y verdes', title: 'ENUMERA Coli 100', body: 'Lectura cromogénica visual para flujos de E. coli y coliformes totales.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visual del kit ENUMERA Soma100 para colífagos somáticos', title: 'ENUMERA Soma100', body: 'Flujo cuantitativo para análisis de colífagos somáticos.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visual del kit ENUMERA Entero100 para indicadores bacterianos', title: 'ENUMERA Entero100', body: 'Flujo cuantitativo para rutinas de indicadores bacterianos.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visual del tray multipocillo ENUMERA', title: 'Tray multipocillo', body: 'Formato de tray pensado para enumeración repetible e interpretación de resultados.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visual de herramientas de lectura y flujo ENUMERA', title: 'Herramientas de flujo', body: 'Accesorios y herramientas que ayudan a estandarizar la operación del laboratorio.' }
  ],
  fr: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Famille de kits quantitatifs AquaVerify ENUMERA pour microbiologie de l’eau', title: 'Famille ENUMERA', body: 'Famille quantitative pour les flux de dénombrement en microbiologie de l’eau.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 avec puits jaunes et verts', title: 'ENUMERA Coli 100', body: 'Lecture chromogénique visuelle pour E. coli et coliformes totaux.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visuel kit ENUMERA Soma100 pour coliphages somatiques', title: 'ENUMERA Soma100', body: 'Flux quantitatif pour l’analyse des coliphages somatiques.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visuel kit ENUMERA Entero100 pour indicateurs bactériens', title: 'ENUMERA Entero100', body: 'Flux quantitatif pour routines d’indicateurs bactériens.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visuel tray multipuits ENUMERA', title: 'Tray multipuits', body: 'Format tray pensé pour un dénombrement répétable et l’interprétation des résultats.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visuel outils de lecture et workflow ENUMERA', title: 'Outils workflow', body: 'Accessoires et outils pour standardiser l’opération laboratoire.' }
  ],
  it: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Famiglia kit quantitativi AquaVerify ENUMERA per microbiologia dell’acqua', title: 'Famiglia ENUMERA', body: 'Famiglia quantitativa per workflow di enumerazione nella microbiologia dell’acqua.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 con pozzetti gialli e verdi', title: 'ENUMERA Coli 100', body: 'Lettura cromogenica visiva per flussi E. coli e coliformi totali.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visual kit ENUMERA Soma100 per colifagi somatici', title: 'ENUMERA Soma100', body: 'Workflow quantitativo per analisi dei colifagi somatici.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visual kit ENUMERA Entero100 per indicatori batterici', title: 'ENUMERA Entero100', body: 'Workflow quantitativo per routine di indicatori batterici.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visual tray multip pozzetto ENUMERA', title: 'Tray multiwell', body: 'Formato tray pensato per enumerazione ripetibile e interpretazione risultati.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visual strumenti lettura e workflow ENUMERA', title: 'Strumenti workflow', body: 'Accessori e strumenti per supportare operazioni di laboratorio coerenti.' }
  ],
  ca: [
    { src: '/images/products/marketing/enumera.svg', alt: 'Familia de kits quantitatius AquaVerify ENUMERA per a microbiologia de l’aigua', title: 'Familia ENUMERA', body: 'Familia quantitativa per a fluxos d’enumeració en microbiologia de l’aigua.' },
    { src: '/images/products/marketing/enumera-coli100.png', alt: 'Tray ENUMERA Coli 100 amb pous grocs i verds', title: 'ENUMERA Coli 100', body: 'Lectura cromogènica visual per a fluxos d’E. coli i coliformes totals.' },
    { src: '/images/products/marketing/enumera-soma100.svg', alt: 'Visual del kit ENUMERA Soma100 per a colífags somàtics', title: 'ENUMERA Soma100', body: 'Flux quantitatiu per a anàlisi de colífags somàtics.' },
    { src: '/images/products/marketing/enumera-entero100.svg', alt: 'Visual del kit ENUMERA Entero100 per a indicadors bacterians', title: 'ENUMERA Entero100', body: 'Flux quantitatiu per a rutines d’indicadors bacterians.' },
    { src: '/images/products/marketing/enumera-tray.svg', alt: 'Visual del tray multipou ENUMERA', title: 'Tray multipou', body: 'Format de tray pensat per a enumeració repetible i interpretació de resultats.' },
    { src: '/images/products/marketing/enumera-reader.svg', alt: 'Visual d’eines de lectura i flux ENUMERA', title: 'Eines de flux', body: 'Accessoris i eines que ajuden a estandarditzar l’operació del laboratori.' }
  ]
};

function enumeraGallery(lang) {
  return ENUMERA_GALLERY_ITEMS[lang] || ENUMERA_GALLERY_ITEMS.en;
}

const ENUMERA_HERO_VIDEO = '/videos/enumera-tray-video.mp4';

const ES_PRODUCT_ANSWER_LAYER = {
  products: {
    directAnswer: {
      title: '¿Qué productos ofrece AquaVerify para microbiología del agua?',
      body: 'AquaVerify ofrece familias de productos para microbiología del agua: ENUMERA para flujos de enumeración, INDICA para presencia/ausencia y screening, kits ISO/EPA para flujos técnicos alineables con métodos de referencia, Lab Essentials para soporte operativo y AquaVerify Cloud para trazabilidad, informes CoA y evidencia digital. La elección depende del organismo objetivo, matriz, método, país, alcance del laboratorio y uso previsto del resultado.'
    },
    faqs: [
      {
        question: '¿Cuándo usar ENUMERA frente a INDICA?',
        answer: 'ENUMERA encaja cuando se necesita un resultado cuantitativo o comparable para interpretar carga microbiológica, comparar puntos de muestreo o documentar tendencias. INDICA encaja mejor cuando se necesita screening de presencia/ausencia, control rutinario o una primera decisión operacional. La selección final depende del organismo, matriz, método y uso previsto del resultado.'
      },
      {
        question: '¿Qué producto usar para enumerar colífagos somáticos?',
        answer: 'Para flujos de enumeración de colífagos somáticos, la familia ENUMERA es la referencia comercial dentro de AquaVerify. Cuando el trabajo está vinculado a métodos normalizados o requisitos de autoridad competente, el laboratorio debe revisar matriz, documentación técnica, controles, alcance y uso previsto antes de emplear el resultado para decisiones reguladas.'
      },
      {
        question: '¿AquaVerify vende kits, software o ambos?',
        answer: 'AquaVerify combina productos de análisis microbiológico del agua con AquaVerify Cloud. Los productos ayudan a ejecutar el flujo analítico y la plataforma ayuda a registrar muestras, lotes, operadores, resultados, evidencias, CoA y documentación. Pueden usarse de forma conjunta o por fases según la operación del cliente.'
      },
      {
        question: '¿Qué familia conviene para control rutinario en campo o planta?',
        answer: 'Para control rutinario, screening o decisiones de presencia/ausencia, INDICA suele ser el punto de partida. Para seguimiento cuantitativo, comparación entre puntos o evidencia más detallada, ENUMERA puede ser más adecuado. En ambos casos conviene revisar el uso según matriz, método y procedimiento interno.'
      },
      {
        question: '¿Cómo deben usarse los productos AquaVerify en contextos regulados?',
        answer: 'No deben presentarse como garantía de aceptación regulatoria por sí mismos. AquaVerify puede ayudar a flujos alineables con métodos, documentación y trazabilidad, pero el cumplimiento depende del país, autoridad competente, matriz, método, controles, laboratorio y alcance concreto del uso.'
      }
    ],
    technicalTable: {
      title: 'Comparativa técnica de familias AquaVerify',
      columns: ['Familia', 'Tipo de resultado', 'Uso típico', 'Usuario recomendado', 'Conexión Cloud', 'Nota prudente'],
      rows: [
        ['ENUMERA', 'Cuantitativo o semicuantitativo', 'Enumeración microbiológica', 'Laboratorios, utilities y quality control', 'Registro de muestra, resultado, evidencia y CoA', 'Revisar matriz, organismo y método aplicable'],
        ['INDICA', 'Presencia/ausencia', 'Screening y control rutinario', 'Campo, planta y laboratorio interno', 'Registro de decisión, lote y trazabilidad', 'No sustituye automáticamente métodos regulados'],
        ['Kits ISO/EPA', 'Flujo técnico', 'Métodos regulados o de referencia', 'Laboratorios avanzados', 'Evidencia documental y audit trail', 'Requiere revisión según alcance y método'],
        ['Lab Essentials', 'Soporte operativo', 'Medios, reactivos y controles', 'Laboratorios de microbiología', 'Inventario, lote y documentación', 'Depende del SOP interno'],
        ['AquaVerify Cloud', 'Digital', 'LIMS, CoA, trazabilidad y portal', 'Labs, empresas y distribuidores', 'Capa digital principal', 'Configuración según proceso']
      ]
    }
  },
  enumera: {
    directAnswer: {
      title: '¿Qué es ENUMERA y cuándo se usa en microbiología del agua?',
      body: 'ENUMERA es la familia AquaVerify orientada a flujos de enumeración microbiológica del agua, pensada para laboratorios, utilities y equipos de calidad que necesitan interpretar resultados cuantitativos o comparables entre muestras. Puede conectarse con AquaVerify Cloud para documentar muestra, lote, operador, lectura, resultado e informe. Su uso debe evaluarse según organismo objetivo, matriz, método, país y alcance del laboratorio.'
    },
    faqs: [
      {
        question: '¿Cuándo usar ENUMERA frente a INDICA?',
        answer: 'ENUMERA se recomienda cuando el usuario necesita enumeración, comparación entre puntos, seguimiento de tendencias o evidencia cuantitativa. INDICA encaja mejor para screening de presencia/ausencia o controles rutinarios. La elección depende del objetivo analítico, matriz, organismo, método y uso previsto del resultado.'
      },
      {
        question: '¿ENUMERA sirve para colífagos somáticos?',
        answer: 'ENUMERA puede posicionarse para flujos de enumeración de colífagos somáticos cuando el producto concreto, la matriz y el método documentado lo soportan. En entornos regulados, el laboratorio debe confirmar alineación metodológica, controles, alcance y requisitos de la autoridad competente.'
      },
      {
        question: '¿Cómo se documenta un resultado ENUMERA en AquaVerify Cloud?',
        answer: 'AquaVerify Cloud puede ayudar a registrar muestra, lote, operador, método, lectura, resultado, revisión, evidencias y CoA. Esta capa digital mejora trazabilidad y auditabilidad, pero no sustituye por sí sola la revisión técnica del método ni el sistema de calidad del laboratorio.'
      },
      {
        question: '¿ENUMERA sustituye automáticamente un método ISO o EPA?',
        answer: 'No. ENUMERA debe describirse como producto o flujo que puede apoyar determinados procedimientos, no como sustitución automática de un método ISO/EPA. La equivalencia o aceptación depende del método, matriz, país, autoridad competente y alcance del laboratorio.'
      }
    ],
    technicalTable: {
      title: 'Resumen técnico de ENUMERA',
      columns: ['Campo', 'Propuesta ENUMERA'],
      rows: [
        ['Organismo objetivo', 'Depende del producto: bacterias, indicadores o colífagos según gama documentada'],
        ['Tipo de resultado', 'Cuantitativo o semicuantitativo según flujo'],
        ['Flujo de lectura', 'Preparación, incubación/lectura según producto, interpretación y documentación'],
        ['Matriz típica', 'Agua potable, proceso, instalación o matriz revisada por el laboratorio'],
        ['Usuario recomendado', 'Laboratorio de agua, utility, calidad industrial, laboratorio interno'],
        ['Conexión Cloud', 'Muestra, lote, operador, lectura, resultado, evidencia y CoA'],
        ['Referencias técnicas relacionadas', 'ISO/EPA solo cuando el producto y método documentado lo justifiquen'],
        ['Nota prudente', 'Evaluar según matriz, método, país, alcance y autoridad competente']
      ]
    }
  },
  indica: {
    directAnswer: {
      title: '¿Qué es INDICA y cuándo conviene usar presencia/ausencia?',
      body: 'INDICA es la familia AquaVerify orientada a flujos de presencia/ausencia y screening microbiológico del agua. Está pensada para controles rutinarios, campo, planta o laboratorios que necesitan una decisión inicial clara antes de escalar a enumeración, confirmación o investigación adicional. Puede conectarse con AquaVerify Cloud para documentar muestra, lote, resultado y acción tomada.'
    },
    faqs: [
      {
        question: '¿INDICA da un resultado cuantitativo?',
        answer: 'INDICA debe posicionarse como flujo de presencia/ausencia o screening, no como enumeración cuantitativa. Si el usuario necesita comparar cargas, tendencias o concentraciones, ENUMERA suele ser más adecuado. La decisión final depende del organismo objetivo, matriz y uso previsto.'
      },
      {
        question: '¿Cuándo conviene usar INDICA en campo o planta?',
        answer: 'INDICA puede ser útil cuando el equipo necesita una decisión operativa sobre presencia/ausencia, control rutinario o priorización de muestras. El resultado debe interpretarse dentro del procedimiento interno y, si aplica, complementarse con métodos confirmatorios o de enumeración.'
      },
      {
        question: '¿INDICA se puede documentar con AquaVerify Cloud?',
        answer: 'Sí. AquaVerify Cloud puede registrar muestra, punto, lote, operador, lectura, resultado, evidencia y acción asociada. Esto ayuda a mantener trazabilidad y reporting, especialmente cuando el screening forma parte de un programa de control más amplio.'
      },
      {
        question: '¿INDICA reemplaza un análisis de laboratorio acreditado?',
        answer: 'No debe presentarse como reemplazo automático. INDICA puede ayudar en screening o control rutinario, pero el uso para decisiones regulatorias depende del método, matriz, país, autoridad competente, laboratorio y alcance aplicable.'
      },
      {
        question: '¿Cuándo escalar de INDICA a ENUMERA?',
        answer: 'Conviene escalar cuando el screening indica presencia, cuando se necesita dimensionar la carga microbiológica, cuando hay investigación de causa raíz o cuando el plan de control exige evidencia cuantitativa.'
      }
    ],
    technicalTable: {
      title: 'Resumen técnico de INDICA',
      columns: ['Campo', 'Propuesta INDICA'],
      rows: [
        ['Tipo de resultado', 'Presencia/ausencia'],
        ['Uso recomendado', 'Screening, control rutinario y priorización'],
        ['Usuario recomendado', 'Campo, planta, laboratorio interno y control de calidad'],
        ['Conexión Cloud', 'Registro de muestra, lote, lectura, evidencia y acción'],
        ['Escalado habitual', 'ENUMERA, método confirmatorio o laboratorio externo'],
        ['Nota prudente', 'No afirmar equivalencia regulatoria sin revisión técnica y documental']
      ]
    }
  },
  standardKits: {
    directAnswer: {
      title: '¿Qué son los kits ISO/EPA de AquaVerify?',
      body: 'Los kits ISO/EPA de AquaVerify agrupan flujos técnicos pensados para laboratorios que trabajan con métodos normalizados, referencias documentales o requisitos de control microbiológico del agua. Pueden ayudar a organizar preparación, lectura, trazabilidad y evidencia digital con AquaVerify Cloud. No implican por sí solos aceptación regulatoria ni resultado conforme: el uso depende de matriz, método, documentación, país, autoridad competente y alcance del laboratorio.'
    },
    faqs: [
      {
        question: '¿Un kit ISO/EPA se acepta automáticamente para cumplimiento regulatorio?',
        answer: 'No. La referencia a ISO/EPA debe entenderse como alineación técnica o soporte de flujo cuando la documentación del producto lo justifique. La aceptación regulatoria depende de la autoridad competente, el método exacto, la matriz, los controles, el laboratorio y su alcance.'
      },
      {
        question: '¿Cómo ayuda AquaVerify Cloud en flujos ISO/EPA?',
        answer: 'AquaVerify Cloud puede ayudar a documentar muestra, lote, operador, método, resultado, evidencias, revisión y CoA. Esto facilita trazabilidad y auditoría documental, pero no sustituye los requisitos del sistema de calidad ni la revisión técnica del método.'
      },
      {
        question: '¿Qué relación tienen estos kits con ISO 10705-2 o EPA 1601/1602?',
        answer: 'Las referencias a ISO 10705-2, EPA 1601 o EPA 1602 deben usarse solo cuando el producto y la documentación técnica aplicable lo soporten. Para contenido público, conviene hablar de flujos alineables o relacionados con métodos de referencia, no de equivalencia automática.'
      },
      {
        question: '¿Qué necesita revisar un laboratorio antes de usar estos kits?',
        answer: 'Debe revisar organismo objetivo, matriz, procedimiento, controles, documentación técnica, requisitos de acreditación, autoridad competente y uso previsto. También conviene definir cómo se registran evidencias, lotes y revisiones.'
      },
      {
        question: '¿Pueden estos kits formar parte de un programa municipal o industrial?',
        answer: 'Pueden ayudar en programas de control cuando encajan con el plan de muestreo, el método y el alcance técnico. La decisión debe documentarse y revisarse dentro del marco aplicable al país, sector y laboratorio.'
      }
    ],
    technicalTable: {
      title: 'Resumen técnico de kits ISO/EPA',
      columns: ['Campo', 'Propuesta Kits ISO/EPA'],
      rows: [
        ['Tipo de flujo', 'Técnico, documentado y alineable con métodos de referencia'],
        ['Usuario recomendado', 'Laboratorios avanzados, utilities y control regulado'],
        ['Documentación clave', 'Método, matriz, lote, controles, resultado y CoA'],
        ['Conexión Cloud', 'Audit trail, CoA, revisión y trazabilidad documental'],
        ['Referencias relacionadas', 'ISO 10705-2, EPA 1601/1602 solo si aplica al producto concreto'],
        ['Nota prudente', 'No afirmar aceptación regulatoria ni resultado conforme por sí solo']
      ]
    }
  }
};

const PRODUCT_ANSWER_LAYER = {
  en: {
    products: {
      directAnswer: {
        title: 'What products does AquaVerify offer for water microbiology?',
        body: 'AquaVerify offers product families for water microbiology: ENUMERA for enumeration workflows, INDICA for presence/absence screening, ISO/EPA kits for technical workflows aligned with reference methods, Lab Essentials for operational support and AquaVerify Cloud for traceability, CoA reporting and digital evidence. The right choice depends on target organism, matrix, method, country, laboratory scope and intended result use.'
      },
      faqs: [
        {
          question: 'When should I use ENUMERA instead of INDICA?',
          answer: 'ENUMERA fits workflows that need quantitative or comparable results for interpreting microbiological load, comparing sampling points or documenting trends. INDICA fits presence/absence screening, routine control or an initial operational decision. The final selection depends on organism, matrix, method and intended use.'
        },
        {
          question: 'Which product should I use to enumerate somatic coliphages?',
          answer: 'For somatic coliphage enumeration workflows, ENUMERA is the relevant AquaVerify product family. When work is linked to reference methods or competent authority requirements, the laboratory should review matrix, technical documentation, controls, scope and intended use before relying on the result for regulated decisions.'
        },
        {
          question: 'Does AquaVerify sell kits, software or both?',
          answer: 'AquaVerify combines water microbiology products with AquaVerify Cloud. Products support the analytical workflow, while the platform helps record samples, batches, operators, results, evidence, CoA reports and documentation. They can be used together or introduced in phases.'
        },
        {
          question: 'Which family fits routine control in the field or plant?',
          answer: 'For routine control, screening or presence/absence decisions, INDICA is often the starting point. For quantitative follow-up, point comparison or more detailed evidence, ENUMERA may be more suitable. In both cases, use should be reviewed against matrix, method and internal procedure.'
        },
        {
          question: 'How should AquaVerify products be used in regulated contexts?',
          answer: 'They should not be presented as automatic regulatory compliance. AquaVerify can support workflows aligned with methods, documentation and traceability, but compliance depends on country, competent authority, matrix, method, controls, laboratory and the specific scope of use.'
        }
      ],
      technicalTable: {
        title: 'Technical comparison of AquaVerify families',
        columns: ['Family', 'Result type', 'Typical use', 'Recommended user', 'Cloud connection', 'Prudent note'],
        rows: [
          ['ENUMERA', 'Quantitative or semi-quantitative', 'Microbiological enumeration', 'Laboratories, utilities and quality control', 'Sample, result, evidence and CoA record', 'Review matrix, organism and applicable method'],
          ['INDICA', 'Presence/absence', 'Screening and routine control', 'Field, plant and internal laboratory teams', 'Decision, batch and traceability record', 'Does not automatically replace regulated methods'],
          ['ISO/EPA kits', 'Technical workflow', 'Regulated or reference-method workflows', 'Advanced laboratories', 'Documentary evidence and audit trail', 'Requires review against scope and method'],
          ['Lab Essentials', 'Operational support', 'Media, reagents and controls', 'Microbiology laboratories', 'Inventory, batch and documentation', 'Depends on internal SOP'],
          ['AquaVerify Cloud', 'Digital', 'LIMS, CoA, traceability and portal', 'Labs, companies and distributors', 'Main digital layer', 'Configured according to process']
        ]
      }
    },
    enumera: {
      directAnswer: {
        title: 'What is ENUMERA and when is it used in water microbiology?',
        body: 'ENUMERA is the AquaVerify family oriented to water microbiology enumeration workflows, designed for laboratories, utilities and quality teams that need quantitative or comparable results across samples. It can connect with AquaVerify Cloud to document sample, batch, operator, reading, result and report. Use should be evaluated by target organism, matrix, method, country and laboratory scope.'
      },
      faqs: [
        {
          question: 'When should I use ENUMERA instead of INDICA?',
          answer: 'ENUMERA is recommended when the user needs enumeration, point-to-point comparison, trend follow-up or quantitative evidence. INDICA is better suited to presence/absence screening or routine checks. The choice depends on analytical objective, matrix, organism, method and intended result use.'
        },
        {
          question: 'Can ENUMERA be used for somatic coliphages?',
          answer: 'ENUMERA can be positioned for somatic coliphage enumeration workflows when the specific product, matrix and documented method support that use. In regulated environments, the laboratory should confirm method alignment, controls, scope and competent authority requirements.'
        },
        {
          question: 'How is an ENUMERA result documented in AquaVerify Cloud?',
          answer: 'AquaVerify Cloud can help record sample, batch, operator, method, reading, result, review, evidence and CoA. This digital layer improves traceability and auditability, but it does not replace technical method review or the laboratory quality system.'
        },
        {
          question: 'Does ENUMERA automatically replace an ISO or EPA method?',
          answer: 'No. ENUMERA should be described as a product or workflow that can support certain procedures, not as an automatic replacement for an ISO/EPA method. Equivalence or acceptance depends on method, matrix, country, competent authority and laboratory scope.'
        }
      ],
      technicalTable: {
        title: 'ENUMERA technical summary',
        columns: ['Field', 'ENUMERA proposal'],
        rows: [
          ['Target organism', 'Depends on product: bacteria, indicators or coliphages according to documented range'],
          ['Result type', 'Quantitative or semi-quantitative depending on workflow'],
          ['Reading workflow', 'Preparation, incubation/reading according to product, interpretation and documentation'],
          ['Typical matrix', 'Drinking water, process water, facility water or matrix reviewed by the laboratory'],
          ['Recommended user', 'Water laboratory, utility, industrial quality team, internal laboratory'],
          ['Cloud connection', 'Sample, batch, operator, reading, result, evidence and CoA'],
          ['Related technical references', 'ISO/EPA only when product and documented method justify it'],
          ['Prudent note', 'Evaluate according to matrix, method, country, scope and competent authority']
        ]
      }
    },
    indica: {
      directAnswer: {
        title: 'What is INDICA and when should presence/absence be used?',
        body: 'INDICA is the AquaVerify family oriented to presence/absence workflows and water microbiology screening. It is designed for routine checks, field, plant or laboratory teams that need a clear initial decision before escalating to enumeration, confirmation or further investigation. It can connect with AquaVerify Cloud to document sample, batch, result and action taken.'
      },
      faqs: [
        {
          question: 'Does INDICA provide a quantitative result?',
          answer: 'INDICA should be positioned as a presence/absence or screening workflow, not as quantitative enumeration. If the user needs to compare loads, trends or concentrations, ENUMERA is usually more appropriate. The final decision depends on target organism, matrix and intended use.'
        },
        {
          question: 'When is INDICA useful in the field or plant?',
          answer: 'INDICA can be useful when the team needs an operational decision on presence/absence, routine control or sample prioritization. The result should be interpreted within the internal procedure and, where relevant, complemented by confirmatory or enumeration methods.'
        },
        {
          question: 'Can INDICA be documented with AquaVerify Cloud?',
          answer: 'Yes. AquaVerify Cloud can record sample, point, batch, operator, reading, result, evidence and related action. This helps maintain traceability and reporting, especially when screening is part of a broader control program.'
        },
        {
          question: 'Does INDICA replace accredited laboratory analysis?',
          answer: 'It should not be presented as an automatic replacement. INDICA can support screening or routine control, but use for regulatory decisions depends on method, matrix, country, competent authority, laboratory and applicable scope.'
        },
        {
          question: 'When should a team escalate from INDICA to ENUMERA?',
          answer: 'Escalation is useful when screening indicates presence, when microbiological load needs to be estimated, when root-cause investigation is required or when the control plan calls for quantitative evidence.'
        }
      ],
      technicalTable: {
        title: 'INDICA technical summary',
        columns: ['Field', 'INDICA proposal'],
        rows: [
          ['Result type', 'Presence/absence'],
          ['Recommended use', 'Screening, routine control and prioritization'],
          ['Recommended user', 'Field, plant, internal laboratory and quality control teams'],
          ['Cloud connection', 'Sample, batch, reading, evidence and action record'],
          ['Typical escalation', 'ENUMERA, confirmatory method or external laboratory'],
          ['Prudent note', 'Do not claim regulatory equivalence without technical and documentary review']
        ]
      }
    },
    standardKits: {
      directAnswer: {
        title: 'What are AquaVerify ISO/EPA kits?',
        body: 'AquaVerify ISO/EPA kits group technical workflows for laboratories working with standardized methods, documentary references or water microbiology control requirements. They can help organize preparation, reading, traceability and digital evidence with AquaVerify Cloud. They do not by themselves determine regulatory acceptance or suitability for a specific regulated use: use depends on matrix, method, documentation, country, competent authority and laboratory scope.'
      },
      faqs: [
        {
          question: 'Is an ISO/EPA kit automatically accepted for regulatory use?',
          answer: 'No. ISO/EPA references should be understood as technical alignment or workflow support when product documentation justifies it. Regulatory acceptance depends on the competent authority, exact method, matrix, controls, laboratory and scope.'
        },
        {
          question: 'How does AquaVerify Cloud help with ISO/EPA workflows?',
          answer: 'AquaVerify Cloud can help document sample, batch, operator, method, result, evidence, review and CoA. This supports traceability and documentary auditability, but it does not replace quality-system requirements or technical method review.'
        },
        {
          question: 'How are these kits related to ISO 10705-2 or EPA 1601/1602?',
          answer: 'References to ISO 10705-2, EPA 1601 or EPA 1602 should be used only when the product and applicable technical documentation support them. Public content should speak about workflows aligned with or related to reference methods, not automatic equivalence.'
        },
        {
          question: 'What should a laboratory review before using these kits?',
          answer: 'The laboratory should review target organism, matrix, procedure, controls, technical documentation, accreditation requirements, competent authority and intended use. It should also define how evidence, batches and reviews are recorded.'
        },
        {
          question: 'Can these kits be part of a municipal or industrial program?',
          answer: 'They can support control programs when they fit the sampling plan, method and technical scope. The decision should be documented and reviewed within the framework applicable to the country, sector and laboratory.'
        }
      ],
      technicalTable: {
        title: 'ISO/EPA kits technical summary',
        columns: ['Field', 'ISO/EPA kits proposal'],
        rows: [
          ['Workflow type', 'Technical, documented and aligned with reference methods'],
          ['Recommended user', 'Advanced laboratories, utilities and regulated-control teams'],
          ['Key documentation', 'Method, matrix, batch, controls, result and CoA'],
          ['Cloud connection', 'Audit trail, CoA, review and documentary traceability'],
          ['Related references', 'ISO 10705-2, EPA 1601/1602 only if applicable to the specific product'],
          ['Prudent note', 'Do not claim regulatory acceptance by default']
        ]
      }
    }
  },
  es: ES_PRODUCT_ANSWER_LAYER,
  fr: {
    products: {
      directAnswer: {
        title: 'Quels produits AquaVerify propose-t-il pour la microbiologie de l’eau?',
        body: 'AquaVerify propose des familles de produits pour la microbiologie de l’eau: ENUMERA pour les flux de dénombrement, INDICA pour la présence/absence et le dépistage, les kits ISO/EPA pour des flux techniques alignés avec des méthodes de référence, Lab Essentials pour le support opérationnel et AquaVerify Cloud pour la traçabilité, les rapports CoA et la preuve numérique. Le choix dépend de l’organisme cible, de la matrice, de la méthode, du pays, du périmètre du laboratoire et de l’usage prévu du résultat.'
      },
      faqs: [
        {
          question: 'Quand utiliser ENUMERA plutôt qu’INDICA?',
          answer: 'ENUMERA convient lorsqu’un résultat quantitatif ou comparable est nécessaire pour interpréter une charge microbiologique, comparer des points d’échantillonnage ou documenter des tendances. INDICA convient mieux au dépistage présence/absence, au contrôle routinier ou à une première décision opérationnelle. Le choix final dépend de l’organisme, de la matrice, de la méthode et de l’usage prévu.'
        },
        {
          question: 'Quel produit utiliser pour dénombrer les coliphages somatiques?',
          answer: 'Pour les flux de dénombrement des coliphages somatiques, ENUMERA est la famille AquaVerify pertinente. Lorsque le travail est lié à des méthodes de référence ou à des exigences d’autorité compétente, le laboratoire doit revoir matrice, documentation technique, contrôles, périmètre et usage prévu avant d’utiliser le résultat pour des décisions réglementées.'
        },
        {
          question: 'AquaVerify vend-il des kits, du logiciel ou les deux?',
          answer: 'AquaVerify combine des produits de microbiologie de l’eau avec AquaVerify Cloud. Les produits soutiennent le flux analytique et la plateforme aide à enregistrer échantillons, lots, opérateurs, résultats, preuves, rapports CoA et documentation. Ils peuvent être utilisés ensemble ou déployés par étapes.'
        },
        {
          question: 'Quelle famille convient au contrôle routinier sur le terrain ou en usine?',
          answer: 'Pour le contrôle routinier, le dépistage ou les décisions de présence/absence, INDICA est souvent le point de départ. Pour le suivi quantitatif, la comparaison de points ou une preuve plus détaillée, ENUMERA peut être plus adapté. Dans les deux cas, l’usage doit être revu selon la matrice, la méthode et la procédure interne.'
        },
        {
          question: 'Comment utiliser les produits AquaVerify dans des contextes réglementés?',
          answer: 'Ils ne doivent pas être présentés comme une conformité réglementaire automatique. AquaVerify peut soutenir des flux alignés avec des méthodes, la documentation et la traçabilité, mais la conformité dépend du pays, de l’autorité compétente, de la matrice, de la méthode, des contrôles, du laboratoire et du périmètre concret d’usage.'
        }
      ],
      technicalTable: {
        title: 'Comparatif technique des familles AquaVerify',
        columns: ['Famille', 'Type de résultat', 'Usage typique', 'Utilisateur recommandé', 'Connexion Cloud', 'Note prudente'],
        rows: [
          ['ENUMERA', 'Quantitatif ou semi-quantitatif', 'Dénombrement microbiologique', 'Laboratoires, utilities et contrôle qualité', 'Enregistrement échantillon, résultat, preuve et CoA', 'Revoir matrice, organisme et méthode applicable'],
          ['INDICA', 'Présence/absence', 'Dépistage et contrôle routinier', 'Terrain, usine et laboratoire interne', 'Enregistrement décision, lot et traçabilité', 'Ne remplace pas automatiquement des méthodes réglementées'],
          ['Kits ISO/EPA', 'Flux technique', 'Méthodes réglementées ou de référence', 'Laboratoires avancés', 'Preuve documentaire et audit trail', 'Requiert une revue selon périmètre et méthode'],
          ['Lab Essentials', 'Support opérationnel', 'Milieux, réactifs et contrôles', 'Laboratoires de microbiologie', 'Inventaire, lot et documentation', 'Dépend de la SOP interne'],
          ['AquaVerify Cloud', 'Numérique', 'LIMS, CoA, traçabilité et portail', 'Labs, entreprises et distributeurs', 'Couche numérique principale', 'Configuration selon le processus']
        ]
      }
    },
    enumera: {
      directAnswer: {
        title: 'Qu’est-ce qu’ENUMERA et quand l’utiliser en microbiologie de l’eau?',
        body: 'ENUMERA est la famille AquaVerify orientée vers les flux de dénombrement en microbiologie de l’eau, destinée aux laboratoires, utilities et équipes qualité qui ont besoin de résultats quantitatifs ou comparables entre échantillons. Elle peut se connecter à AquaVerify Cloud pour documenter échantillon, lot, opérateur, lecture, résultat et rapport. Son usage doit être évalué selon l’organisme cible, la matrice, la méthode, le pays et le périmètre du laboratoire.'
      },
      faqs: [
        {
          question: 'Quand utiliser ENUMERA plutôt qu’INDICA?',
          answer: 'ENUMERA est recommandé lorsqu’il faut un dénombrement, une comparaison entre points, un suivi de tendance ou une preuve quantitative. INDICA convient mieux au dépistage présence/absence ou aux contrôles routiniers. Le choix dépend de l’objectif analytique, de la matrice, de l’organisme, de la méthode et de l’usage prévu.'
        },
        {
          question: 'ENUMERA peut-il servir pour les coliphages somatiques?',
          answer: 'ENUMERA peut être positionné pour des flux de dénombrement de coliphages somatiques lorsque le produit concret, la matrice et la méthode documentée le permettent. En environnement réglementé, le laboratoire doit confirmer alignement méthodologique, contrôles, périmètre et exigences de l’autorité compétente.'
        },
        {
          question: 'Comment documenter un résultat ENUMERA dans AquaVerify Cloud?',
          answer: 'AquaVerify Cloud peut aider à enregistrer échantillon, lot, opérateur, méthode, lecture, résultat, revue, preuves et CoA. Cette couche numérique améliore la traçabilité et l’auditabilité, mais ne remplace pas la revue technique de la méthode ni le système qualité du laboratoire.'
        },
        {
          question: 'ENUMERA remplace-t-il automatiquement une méthode ISO ou EPA?',
          answer: 'Non. ENUMERA doit être décrit comme un produit ou flux pouvant soutenir certaines procédures, et non comme un remplacement automatique d’une méthode ISO/EPA. L’équivalence ou l’acceptation dépend de la méthode, de la matrice, du pays, de l’autorité compétente et du périmètre du laboratoire.'
        }
      ],
      technicalTable: {
        title: 'Résumé technique ENUMERA',
        columns: ['Champ', 'Proposition ENUMERA'],
        rows: [
          ['Organisme cible', 'Dépend du produit: bactéries, indicateurs ou coliphages selon la gamme documentée'],
          ['Type de résultat', 'Quantitatif ou semi-quantitatif selon le flux'],
          ['Flux de lecture', 'Préparation, incubation/lecture selon produit, interprétation et documentation'],
          ['Matrice typique', 'Eau potable, eau de process, installation ou matrice revue par le laboratoire'],
          ['Utilisateur recommandé', 'Laboratoire eau, utility, qualité industrielle, laboratoire interne'],
          ['Connexion Cloud', 'Échantillon, lot, opérateur, lecture, résultat, preuve et CoA'],
          ['Références techniques liées', 'ISO/EPA seulement lorsque le produit et la méthode documentée le justifient'],
          ['Note prudente', 'Évaluer selon matrice, méthode, pays, périmètre et autorité compétente']
        ]
      }
    },
    indica: {
      directAnswer: {
        title: 'Qu’est-ce qu’INDICA et quand utiliser la présence/absence?',
        body: 'INDICA est la famille AquaVerify orientée vers les flux de présence/absence et le dépistage microbiologique de l’eau. Elle est conçue pour les contrôles routiniers, le terrain, l’usine ou les laboratoires qui ont besoin d’une décision initiale claire avant de passer au dénombrement, à la confirmation ou à une investigation complémentaire. Elle peut se connecter à AquaVerify Cloud pour documenter échantillon, lot, résultat et action menée.'
      },
      faqs: [
        {
          question: 'INDICA donne-t-il un résultat quantitatif?',
          answer: 'INDICA doit être positionné comme un flux de présence/absence ou de dépistage, non comme un dénombrement quantitatif. Si l’utilisateur doit comparer charges, tendances ou concentrations, ENUMERA est généralement plus adapté. La décision finale dépend de l’organisme cible, de la matrice et de l’usage prévu.'
        },
        {
          question: 'Quand INDICA est-il utile sur le terrain ou en usine?',
          answer: 'INDICA peut être utile lorsque l’équipe doit prendre une décision opérationnelle sur présence/absence, contrôle routinier ou priorisation d’échantillons. Le résultat doit être interprété dans la procédure interne et, si nécessaire, complété par des méthodes confirmatoires ou de dénombrement.'
        },
        {
          question: 'INDICA peut-il être documenté avec AquaVerify Cloud?',
          answer: 'Oui. AquaVerify Cloud peut enregistrer échantillon, point, lot, opérateur, lecture, résultat, preuve et action associée. Cela aide à maintenir traçabilité et reporting, surtout lorsque le dépistage fait partie d’un programme de contrôle plus large.'
        },
        {
          question: 'INDICA remplace-t-il une analyse de laboratoire accrédité?',
          answer: 'Il ne doit pas être présenté comme un remplacement automatique. INDICA peut aider au dépistage ou au contrôle routinier, mais l’usage pour des décisions réglementaires dépend de la méthode, de la matrice, du pays, de l’autorité compétente, du laboratoire et du périmètre applicable.'
        },
        {
          question: 'Quand passer d’INDICA à ENUMERA?',
          answer: 'Il est utile de passer à ENUMERA lorsque le dépistage indique une présence, lorsqu’il faut dimensionner la charge microbiologique, lorsqu’une recherche de cause racine est nécessaire ou lorsque le plan de contrôle demande une preuve quantitative.'
        }
      ],
      technicalTable: {
        title: 'Résumé technique INDICA',
        columns: ['Champ', 'Proposition INDICA'],
        rows: [
          ['Type de résultat', 'Présence/absence'],
          ['Usage recommandé', 'Dépistage, contrôle routinier et priorisation'],
          ['Utilisateur recommandé', 'Terrain, usine, laboratoire interne et contrôle qualité'],
          ['Connexion Cloud', 'Enregistrement échantillon, lot, lecture, preuve et action'],
          ['Escalade habituelle', 'ENUMERA, méthode confirmatoire ou laboratoire externe'],
          ['Note prudente', 'Ne pas revendiquer d’équivalence réglementaire sans revue technique et documentaire']
        ]
      }
    },
    standardKits: {
      directAnswer: {
        title: 'Que sont les kits ISO/EPA d’AquaVerify?',
        body: 'Les kits ISO/EPA d’AquaVerify regroupent des flux techniques pour les laboratoires travaillant avec des méthodes normalisées, des références documentaires ou des exigences de contrôle microbiologique de l’eau. Ils peuvent aider à organiser préparation, lecture, traçabilité et preuve numérique avec AquaVerify Cloud. Ils n’impliquent pas à eux seuls une acceptation réglementaire ni une conformité automatique: l’usage dépend de la matrice, de la méthode, de la documentation, du pays, de l’autorité compétente et du périmètre du laboratoire.'
      },
      faqs: [
        {
          question: 'Un kit ISO/EPA est-il automatiquement accepté pour un usage réglementaire?',
          answer: 'Non. Les références ISO/EPA doivent être comprises comme un alignement technique ou un support de flux lorsque la documentation produit le justifie. L’acceptation réglementaire dépend de l’autorité compétente, de la méthode exacte, de la matrice, des contrôles, du laboratoire et de son périmètre.'
        },
        {
          question: 'Comment AquaVerify Cloud aide-t-il les flux ISO/EPA?',
          answer: 'AquaVerify Cloud peut aider à documenter échantillon, lot, opérateur, méthode, résultat, preuves, revue et CoA. Cela soutient la traçabilité et l’auditabilité documentaire, mais ne remplace pas les exigences du système qualité ni la revue technique de la méthode.'
        },
        {
          question: 'Quel lien avec ISO 10705-2 ou EPA 1601/1602?',
          answer: 'Les références à ISO 10705-2, EPA 1601 ou EPA 1602 doivent être utilisées seulement lorsque le produit et la documentation technique applicable les soutiennent. Le contenu public doit parler de flux alignés ou liés à des méthodes de référence, pas d’équivalence automatique.'
        },
        {
          question: 'Que doit revoir un laboratoire avant d’utiliser ces kits?',
          answer: 'Il doit revoir organisme cible, matrice, procédure, contrôles, documentation technique, exigences d’accréditation, autorité compétente et usage prévu. Il convient aussi de définir comment preuves, lots et revues sont enregistrés.'
        },
        {
          question: 'Ces kits peuvent-ils faire partie d’un programme municipal ou industriel?',
          answer: 'Ils peuvent soutenir des programmes de contrôle lorsqu’ils correspondent au plan d’échantillonnage, à la méthode et au périmètre technique. La décision doit être documentée et revue dans le cadre applicable au pays, au secteur et au laboratoire.'
        }
      ],
      technicalTable: {
        title: 'Résumé technique des kits ISO/EPA',
        columns: ['Champ', 'Proposition kits ISO/EPA'],
        rows: [
          ['Type de flux', 'Technique, documenté et aligné avec des méthodes de référence'],
          ['Utilisateur recommandé', 'Laboratoires avancés, utilities et contrôle réglementé'],
          ['Documentation clé', 'Méthode, matrice, lot, contrôles, résultat et CoA'],
          ['Connexion Cloud', 'Audit trail, CoA, revue et traçabilité documentaire'],
          ['Références liées', 'ISO 10705-2, EPA 1601/1602 seulement si applicable au produit concret'],
          ['Note prudente', 'Ne pas revendiquer d’acceptation réglementaire ni de conformité automatique']
        ]
      }
    }
  },
  it: {
    products: {
      directAnswer: {
        title: 'Quali prodotti offre AquaVerify per la microbiologia dell’acqua?',
        body: 'AquaVerify offre famiglie di prodotti per la microbiologia dell’acqua: ENUMERA per workflow di enumerazione, INDICA per presenza/assenza e screening, kit ISO/EPA per flussi tecnici allineabili a metodi di riferimento, Lab Essentials per supporto operativo e AquaVerify Cloud per tracciabilità, report CoA ed evidenza digitale. La scelta dipende da organismo target, matrice, metodo, paese, ambito del laboratorio e uso previsto del risultato.'
      },
      faqs: [
        {
          question: 'Quando usare ENUMERA invece di INDICA?',
          answer: 'ENUMERA è indicato quando serve un risultato quantitativo o comparabile per interpretare la carica microbiologica, confrontare punti di campionamento o documentare trend. INDICA è più adatto a screening presenza/assenza, controllo di routine o prima decisione operativa. La selezione finale dipende da organismo, matrice, metodo e uso previsto.'
        },
        {
          question: 'Quale prodotto usare per enumerare i colifagi somatici?',
          answer: 'Per workflow di enumerazione dei colifagi somatici, ENUMERA è la famiglia AquaVerify pertinente. Quando il lavoro è legato a metodi di riferimento o requisiti dell’autorità competente, il laboratorio deve rivedere matrice, documentazione tecnica, controlli, ambito e uso previsto prima di impiegare il risultato per decisioni regolate.'
        },
        {
          question: 'AquaVerify vende kit, software o entrambi?',
          answer: 'AquaVerify combina prodotti per microbiologia dell’acqua con AquaVerify Cloud. I prodotti supportano il workflow analitico e la piattaforma aiuta a registrare campioni, lotti, operatori, risultati, evidenze, report CoA e documentazione. Possono essere usati insieme o introdotti per fasi.'
        },
        {
          question: 'Quale famiglia conviene per controllo di routine in campo o impianto?',
          answer: 'Per controllo di routine, screening o decisioni di presenza/assenza, INDICA è spesso il punto di partenza. Per follow-up quantitativo, confronto tra punti o evidenza più dettagliata, ENUMERA può essere più adatto. In entrambi i casi l’uso va rivisto rispetto a matrice, metodo e procedura interna.'
        },
        {
          question: 'Come usare i prodotti AquaVerify in contesti regolati?',
          answer: 'Non devono essere presentati come conformità regolatoria automatica. AquaVerify può supportare flussi allineabili a metodi, documentazione e tracciabilità, ma la conformità dipende da paese, autorità competente, matrice, metodo, controlli, laboratorio e ambito concreto d’uso.'
        }
      ],
      technicalTable: {
        title: 'Confronto tecnico delle famiglie AquaVerify',
        columns: ['Famiglia', 'Tipo di risultato', 'Uso tipico', 'Utente consigliato', 'Connessione Cloud', 'Nota prudente'],
        rows: [
          ['ENUMERA', 'Quantitativo o semi-quantitativo', 'Enumerazione microbiologica', 'Laboratori, utility e controllo qualità', 'Registro di campione, risultato, evidenza e CoA', 'Rivedere matrice, organismo e metodo applicabile'],
          ['INDICA', 'Presenza/assenza', 'Screening e controllo di routine', 'Campo, impianto e laboratorio interno', 'Registro di decisione, lotto e tracciabilità', 'Non sostituisce automaticamente metodi regolati'],
          ['Kit ISO/EPA', 'Flusso tecnico', 'Metodi regolati o di riferimento', 'Laboratori avanzati', 'Evidenza documentale e audit trail', 'Richiede revisione secondo ambito e metodo'],
          ['Lab Essentials', 'Supporto operativo', 'Terreni, reagenti e controlli', 'Laboratori di microbiologia', 'Inventario, lotto e documentazione', 'Dipende dalla SOP interna'],
          ['AquaVerify Cloud', 'Digitale', 'LIMS, CoA, tracciabilità e portale', 'Labs, aziende e distributori', 'Layer digitale principale', 'Configurazione secondo processo']
        ]
      }
    },
    enumera: {
      directAnswer: {
        title: 'Che cos’è ENUMERA e quando si usa nella microbiologia dell’acqua?',
        body: 'ENUMERA è la famiglia AquaVerify orientata ai workflow di enumerazione microbiologica dell’acqua, pensata per laboratori, utility e team qualità che devono interpretare risultati quantitativi o comparabili tra campioni. Può collegarsi ad AquaVerify Cloud per documentare campione, lotto, operatore, lettura, risultato e report. L’uso deve essere valutato secondo organismo target, matrice, metodo, paese e ambito del laboratorio.'
      },
      faqs: [
        {
          question: 'Quando usare ENUMERA invece di INDICA?',
          answer: 'ENUMERA è consigliato quando servono enumerazione, confronto tra punti, monitoraggio di trend o evidenza quantitativa. INDICA è più adatto a screening presenza/assenza o controlli di routine. La scelta dipende da obiettivo analitico, matrice, organismo, metodo e uso previsto del risultato.'
        },
        {
          question: 'ENUMERA serve per i colifagi somatici?',
          answer: 'ENUMERA può essere posizionato per flussi di enumerazione dei colifagi somatici quando il prodotto concreto, la matrice e il metodo documentato lo supportano. In ambienti regolati, il laboratorio deve confermare allineamento metodologico, controlli, ambito e requisiti dell’autorità competente.'
        },
        {
          question: 'Come si documenta un risultato ENUMERA in AquaVerify Cloud?',
          answer: 'AquaVerify Cloud può aiutare a registrare campione, lotto, operatore, metodo, lettura, risultato, revisione, evidenze e CoA. Questo layer digitale migliora tracciabilità e auditabilità, ma non sostituisce la revisione tecnica del metodo né il sistema qualità del laboratorio.'
        },
        {
          question: 'ENUMERA sostituisce automaticamente un metodo ISO o EPA?',
          answer: 'No. ENUMERA va descritto come prodotto o flusso che può supportare determinate procedure, non come sostituzione automatica di un metodo ISO/EPA. Equivalenza o accettazione dipendono da metodo, matrice, paese, autorità competente e ambito del laboratorio.'
        }
      ],
      technicalTable: {
        title: 'Sintesi tecnica ENUMERA',
        columns: ['Campo', 'Proposta ENUMERA'],
        rows: [
          ['Organismo target', 'Dipende dal prodotto: batteri, indicatori o colifagi secondo gamma documentata'],
          ['Tipo di risultato', 'Quantitativo o semi-quantitativo secondo il flusso'],
          ['Flusso di lettura', 'Preparazione, incubazione/lettura secondo prodotto, interpretazione e documentazione'],
          ['Matrice tipica', 'Acqua potabile, processo, installazione o matrice rivista dal laboratorio'],
          ['Utente consigliato', 'Laboratorio acque, utility, qualità industriale, laboratorio interno'],
          ['Connessione Cloud', 'Campione, lotto, operatore, lettura, risultato, evidenza e CoA'],
          ['Riferimenti tecnici correlati', 'ISO/EPA solo quando prodotto e metodo documentato lo giustificano'],
          ['Nota prudente', 'Valutare secondo matrice, metodo, paese, ambito e autorità competente']
        ]
      }
    },
    indica: {
      directAnswer: {
        title: 'Che cos’è INDICA e quando conviene usare presenza/assenza?',
        body: 'INDICA è la famiglia AquaVerify orientata a flussi di presenza/assenza e screening microbiologico dell’acqua. È pensata per controlli di routine, campo, impianto o laboratori che richiedono una decisione iniziale chiara prima di passare a enumerazione, conferma o indagine aggiuntiva. Può collegarsi ad AquaVerify Cloud per documentare campione, lotto, risultato e azione intrapresa.'
      },
      faqs: [
        {
          question: 'INDICA dà un risultato quantitativo?',
          answer: 'INDICA va posizionato come flusso di presenza/assenza o screening, non come enumerazione quantitativa. Se l’utente deve confrontare cariche, trend o concentrazioni, ENUMERA è di solito più adatto. La decisione finale dipende da organismo target, matrice e uso previsto.'
        },
        {
          question: 'Quando conviene usare INDICA in campo o impianto?',
          answer: 'INDICA può essere utile quando il team necessita una decisione operativa su presenza/assenza, controllo di routine o priorità dei campioni. Il risultato deve essere interpretato dentro la procedura interna e, se applicabile, completato con metodi confermativi o di enumerazione.'
        },
        {
          question: 'INDICA si può documentare con AquaVerify Cloud?',
          answer: 'Sì. AquaVerify Cloud può registrare campione, punto, lotto, operatore, lettura, risultato, evidenza e azione associata. Questo aiuta a mantenere tracciabilità e reporting, soprattutto quando lo screening fa parte di un programma di controllo più ampio.'
        },
        {
          question: 'INDICA sostituisce un’analisi di laboratorio accreditato?',
          answer: 'Non deve essere presentato come sostituzione automatica. INDICA può aiutare nello screening o nel controllo di routine, ma l’uso per decisioni regolatorie dipende da metodo, matrice, paese, autorità competente, laboratorio e ambito applicabile.'
        },
        {
          question: 'Quando passare da INDICA a ENUMERA?',
          answer: 'Conviene passare a ENUMERA quando lo screening indica presenza, quando serve dimensionare la carica microbiologica, quando è necessaria un’indagine di causa radice o quando il piano di controllo richiede evidenza quantitativa.'
        }
      ],
      technicalTable: {
        title: 'Sintesi tecnica INDICA',
        columns: ['Campo', 'Proposta INDICA'],
        rows: [
          ['Tipo di risultato', 'Presenza/assenza'],
          ['Uso consigliato', 'Screening, controllo di routine e prioritizzazione'],
          ['Utente consigliato', 'Campo, impianto, laboratorio interno e controllo qualità'],
          ['Connessione Cloud', 'Registro di campione, lotto, lettura, evidenza e azione'],
          ['Escalation abituale', 'ENUMERA, metodo confermativo o laboratorio esterno'],
          ['Nota prudente', 'Non rivendicare equivalenza regolatoria senza revisione tecnica e documentale']
        ]
      }
    },
    standardKits: {
      directAnswer: {
        title: 'Che cosa sono i kit ISO/EPA di AquaVerify?',
        body: 'I kit ISO/EPA di AquaVerify raggruppano flussi tecnici pensati per laboratori che lavorano con metodi normalizzati, riferimenti documentali o requisiti di controllo microbiologico dell’acqua. Possono aiutare a organizzare preparazione, lettura, tracciabilità ed evidenza digitale con AquaVerify Cloud. Non implicano da soli accettazione regolatoria né conformità automatica: l’uso dipende da matrice, metodo, documentazione, paese, autorità competente e ambito del laboratorio.'
      },
      faqs: [
        {
          question: 'Un kit ISO/EPA è automaticamente accettato per uso regolatorio?',
          answer: 'No. I riferimenti ISO/EPA vanno intesi come allineamento tecnico o supporto di flusso quando la documentazione del prodotto lo giustifica. L’accettazione regolatoria dipende dall’autorità competente, dal metodo esatto, dalla matrice, dai controlli, dal laboratorio e dal suo ambito.'
        },
        {
          question: 'Come aiuta AquaVerify Cloud nei flussi ISO/EPA?',
          answer: 'AquaVerify Cloud può aiutare a documentare campione, lotto, operatore, metodo, risultato, evidenze, revisione e CoA. Questo facilita tracciabilità e auditabilità documentale, ma non sostituisce i requisiti del sistema qualità né la revisione tecnica del metodo.'
        },
        {
          question: 'Che relazione hanno questi kit con ISO 10705-2 o EPA 1601/1602?',
          answer: 'I riferimenti a ISO 10705-2, EPA 1601 o EPA 1602 devono essere usati solo quando il prodotto e la documentazione tecnica applicabile li supportano. Il contenuto pubblico deve parlare di flussi allineabili o correlati a metodi di riferimento, non di equivalenza automatica.'
        },
        {
          question: 'Cosa deve rivedere un laboratorio prima di usare questi kit?',
          answer: 'Deve rivedere organismo target, matrice, procedura, controlli, documentazione tecnica, requisiti di accreditamento, autorità competente e uso previsto. Conviene anche definire come registrare evidenze, lotti e revisioni.'
        },
        {
          question: 'Questi kit possono far parte di un programma municipale o industriale?',
          answer: 'Possono supportare programmi di controllo quando sono coerenti con piano di campionamento, metodo e ambito tecnico. La decisione deve essere documentata e rivista nel quadro applicabile a paese, settore e laboratorio.'
        }
      ],
      technicalTable: {
        title: 'Sintesi tecnica dei kit ISO/EPA',
        columns: ['Campo', 'Proposta kit ISO/EPA'],
        rows: [
          ['Tipo di flusso', 'Tecnico, documentato e allineabile a metodi di riferimento'],
          ['Utente consigliato', 'Laboratori avanzati, utility e controllo regolato'],
          ['Documentazione chiave', 'Metodo, matrice, lotto, controlli, risultato e CoA'],
          ['Connessione Cloud', 'Audit trail, CoA, revisione e tracciabilità documentale'],
          ['Riferimenti correlati', 'ISO 10705-2, EPA 1601/1602 solo se applicabili al prodotto concreto'],
          ['Nota prudente', 'Non rivendicare accettazione regolatoria né conformità automatica']
        ]
      }
    }
  },
  ca: {
    products: {
      directAnswer: {
        title: 'Quins productes ofereix AquaVerify per a microbiologia de l’aigua?',
        body: 'AquaVerify ofereix famílies de productes per a microbiologia de l’aigua: ENUMERA per a fluxos d’enumeració, INDICA per a presència/absència i cribratge, kits ISO/EPA per a fluxos tècnics alineables amb mètodes de referència, Lab Essentials per a suport operatiu i AquaVerify Cloud per a traçabilitat, informes CoA i evidència digital. L’elecció depèn de l’organisme objectiu, matriu, mètode, país, abast del laboratori i ús previst del resultat.'
      },
      faqs: [
        {
          question: 'Quan usar ENUMERA en lloc d’INDICA?',
          answer: 'ENUMERA encaixa quan cal un resultat quantitatiu o comparable per interpretar càrrega microbiològica, comparar punts de mostreig o documentar tendències. INDICA encaixa millor per a cribratge de presència/absència, control rutinari o una primera decisió operativa. La selecció final depèn d’organisme, matriu, mètode i ús previst.'
        },
        {
          question: 'Quin producte usar per enumerar colífags somàtics?',
          answer: 'Per a fluxos d’enumeració de colífags somàtics, ENUMERA és la família AquaVerify pertinent. Quan el treball està vinculat a mètodes de referència o requisits d’autoritat competent, el laboratori ha de revisar matriu, documentació tècnica, controls, abast i ús previst abans d’emprar el resultat per a decisions regulades.'
        },
        {
          question: 'AquaVerify ven kits, software o tots dos?',
          answer: 'AquaVerify combina productes de microbiologia de l’aigua amb AquaVerify Cloud. Els productes ajuden a executar el flux analític i la plataforma ajuda a registrar mostres, lots, operadors, resultats, evidències, informes CoA i documentació. Es poden utilitzar conjuntament o per fases.'
        },
        {
          question: 'Quina família convé per al control rutinari al camp o planta?',
          answer: 'Per a control rutinari, cribratge o decisions de presència/absència, INDICA sol ser el punt de partida. Per a seguiment quantitatiu, comparació entre punts o evidència més detallada, ENUMERA pot ser més adequat. En tots dos casos convé revisar l’ús segons matriu, mètode i procediment intern.'
        },
        {
          question: 'Com s’han d’usar els productes AquaVerify en contextos regulats?',
          answer: 'No s’han de presentar com a compliment regulatori automàtic. AquaVerify pot ajudar a fluxos alineables amb mètodes, documentació i traçabilitat, però el compliment depèn del país, autoritat competent, matriu, mètode, controls, laboratori i abast concret d’ús.'
        }
      ],
      technicalTable: {
        title: 'Comparativa tècnica de famílies AquaVerify',
        columns: ['Família', 'Tipus de resultat', 'Ús típic', 'Usuari recomanat', 'Connexió Cloud', 'Nota prudent'],
        rows: [
          ['ENUMERA', 'Quantitatiu o semiquantitatiu', 'Enumeració microbiològica', 'Laboratoris, utilities i control de qualitat', 'Registre de mostra, resultat, evidència i CoA', 'Revisar matriu, organisme i mètode aplicable'],
          ['INDICA', 'Presència/absència', 'Cribratge i control rutinari', 'Camp, planta i laboratori intern', 'Registre de decisió, lot i traçabilitat', 'No substitueix automàticament mètodes regulats'],
          ['Kits ISO/EPA', 'Flux tècnic', 'Mètodes regulats o de referència', 'Laboratoris avançats', 'Evidència documental i audit trail', 'Requereix revisió segons abast i mètode'],
          ['Lab Essentials', 'Suport operatiu', 'Medis, reactius i controls', 'Laboratoris de microbiologia', 'Inventari, lot i documentació', 'Depèn de la SOP interna'],
          ['AquaVerify Cloud', 'Digital', 'LIMS, CoA, traçabilitat i portal', 'Labs, empreses i distribuïdors', 'Capa digital principal', 'Configuració segons procés']
        ]
      }
    },
    enumera: {
      directAnswer: {
        title: 'Què és ENUMERA i quan s’usa en microbiologia de l’aigua?',
        body: 'ENUMERA és la família AquaVerify orientada a fluxos d’enumeració microbiològica de l’aigua, pensada per a laboratoris, utilities i equips de qualitat que necessiten interpretar resultats quantitatius o comparables entre mostres. Es pot connectar amb AquaVerify Cloud per documentar mostra, lot, operador, lectura, resultat i informe. L’ús s’ha d’avaluar segons organisme objectiu, matriu, mètode, país i abast del laboratori.'
      },
      faqs: [
        {
          question: 'Quan usar ENUMERA en lloc d’INDICA?',
          answer: 'ENUMERA es recomana quan l’usuari necessita enumeració, comparació entre punts, seguiment de tendències o evidència quantitativa. INDICA encaixa millor per a cribratge de presència/absència o controls rutinaris. L’elecció depèn de l’objectiu analític, matriu, organisme, mètode i ús previst del resultat.'
        },
        {
          question: 'ENUMERA serveix per a colífags somàtics?',
          answer: 'ENUMERA es pot posicionar per a fluxos d’enumeració de colífags somàtics quan el producte concret, la matriu i el mètode documentat ho suporten. En entorns regulats, el laboratori ha de confirmar alineació metodològica, controls, abast i requisits de l’autoritat competent.'
        },
        {
          question: 'Com es documenta un resultat ENUMERA a AquaVerify Cloud?',
          answer: 'AquaVerify Cloud pot ajudar a registrar mostra, lot, operador, mètode, lectura, resultat, revisió, evidències i CoA. Aquesta capa digital millora traçabilitat i auditabilitat, però no substitueix la revisió tècnica del mètode ni el sistema de qualitat del laboratori.'
        },
        {
          question: 'ENUMERA substitueix automàticament un mètode ISO o EPA?',
          answer: 'No. ENUMERA s’ha de descriure com a producte o flux que pot donar suport a determinats procediments, no com a substitució automàtica d’un mètode ISO/EPA. L’equivalència o acceptació depèn del mètode, matriu, país, autoritat competent i abast del laboratori.'
        }
      ],
      technicalTable: {
        title: 'Resum tècnic d’ENUMERA',
        columns: ['Camp', 'Proposta ENUMERA'],
        rows: [
          ['Organisme objectiu', 'Depèn del producte: bacteris, indicadors o colífags segons gamma documentada'],
          ['Tipus de resultat', 'Quantitatiu o semiquantitatiu segons flux'],
          ['Flux de lectura', 'Preparació, incubació/lectura segons producte, interpretació i documentació'],
          ['Matriu típica', 'Aigua potable, procés, instal·lació o matriu revisada pel laboratori'],
          ['Usuari recomanat', 'Laboratori d’aigua, utility, qualitat industrial, laboratori intern'],
          ['Connexió Cloud', 'Mostra, lot, operador, lectura, resultat, evidència i CoA'],
          ['Referències tècniques relacionades', 'ISO/EPA només quan el producte i el mètode documentat ho justifiquin'],
          ['Nota prudent', 'Avaluar segons matriu, mètode, país, abast i autoritat competent']
        ]
      }
    },
    indica: {
      directAnswer: {
        title: 'Què és INDICA i quan convé usar presència/absència?',
        body: 'INDICA és la família AquaVerify orientada a fluxos de presència/absència i cribratge microbiològic de l’aigua. Està pensada per a controls rutinaris, camp, planta o laboratoris que necessiten una decisió inicial clara abans d’escalar a enumeració, confirmació o investigació addicional. Es pot connectar amb AquaVerify Cloud per documentar mostra, lot, resultat i acció presa.'
      },
      faqs: [
        {
          question: 'INDICA dona un resultat quantitatiu?',
          answer: 'INDICA s’ha de posicionar com a flux de presència/absència o cribratge, no com a enumeració quantitativa. Si l’usuari necessita comparar càrregues, tendències o concentracions, ENUMERA sol ser més adequat. La decisió final depèn de l’organisme objectiu, matriu i ús previst.'
        },
        {
          question: 'Quan convé usar INDICA al camp o planta?',
          answer: 'INDICA pot ser útil quan l’equip necessita una decisió operativa sobre presència/absència, control rutinari o priorització de mostres. El resultat s’ha d’interpretar dins del procediment intern i, si aplica, complementar-se amb mètodes confirmatoris o d’enumeració.'
        },
        {
          question: 'INDICA es pot documentar amb AquaVerify Cloud?',
          answer: 'Sí. AquaVerify Cloud pot registrar mostra, punt, lot, operador, lectura, resultat, evidència i acció associada. Això ajuda a mantenir traçabilitat i reporting, especialment quan el cribratge forma part d’un programa de control més ampli.'
        },
        {
          question: 'INDICA reemplaça una anàlisi de laboratori acreditat?',
          answer: 'No s’ha de presentar com a reemplaçament automàtic. INDICA pot ajudar en cribratge o control rutinari, però l’ús per a decisions regulatòries depèn del mètode, matriu, país, autoritat competent, laboratori i abast aplicable.'
        },
        {
          question: 'Quan escalar d’INDICA a ENUMERA?',
          answer: 'Convé escalar quan el cribratge indica presència, quan cal dimensionar la càrrega microbiològica, quan hi ha investigació de causa arrel o quan el pla de control exigeix evidència quantitativa.'
        }
      ],
      technicalTable: {
        title: 'Resum tècnic d’INDICA',
        columns: ['Camp', 'Proposta INDICA'],
        rows: [
          ['Tipus de resultat', 'Presència/absència'],
          ['Ús recomanat', 'Cribratge, control rutinari i priorització'],
          ['Usuari recomanat', 'Camp, planta, laboratori intern i control de qualitat'],
          ['Connexió Cloud', 'Registre de mostra, lot, lectura, evidència i acció'],
          ['Escalat habitual', 'ENUMERA, mètode confirmatori o laboratori extern'],
          ['Nota prudent', 'No reivindicar equivalència regulatòria sense revisió tècnica i documental']
        ]
      }
    },
    standardKits: {
      directAnswer: {
        title: 'Què són els kits ISO/EPA d’AquaVerify?',
        body: 'Els kits ISO/EPA d’AquaVerify agrupen fluxos tècnics pensats per a laboratoris que treballen amb mètodes normalitzats, referències documentals o requisits de control microbiològic de l’aigua. Poden ajudar a organitzar preparació, lectura, traçabilitat i evidència digital amb AquaVerify Cloud. No impliquen per si sols acceptació regulatòria ni compliment automàtic: l’ús depèn de matriu, mètode, documentació, país, autoritat competent i abast del laboratori.'
      },
      faqs: [
        {
          question: 'Un kit ISO/EPA s’accepta automàticament per a ús regulatori?',
          answer: 'No. Les referències ISO/EPA s’han d’entendre com a alineació tècnica o suport de flux quan la documentació del producte ho justifica. L’acceptació regulatòria depèn de l’autoritat competent, mètode exacte, matriu, controls, laboratori i abast.'
        },
        {
          question: 'Com ajuda AquaVerify Cloud en fluxos ISO/EPA?',
          answer: 'AquaVerify Cloud pot ajudar a documentar mostra, lot, operador, mètode, resultat, evidències, revisió i CoA. Això facilita traçabilitat i auditabilitat documental, però no substitueix els requisits del sistema de qualitat ni la revisió tècnica del mètode.'
        },
        {
          question: 'Quina relació tenen aquests kits amb ISO 10705-2 o EPA 1601/1602?',
          answer: 'Les referències a ISO 10705-2, EPA 1601 o EPA 1602 s’han d’usar només quan el producte i la documentació tècnica aplicable ho suporten. El contingut públic ha de parlar de fluxos alineables o relacionats amb mètodes de referència, no d’equivalència automàtica.'
        },
        {
          question: 'Què necessita revisar un laboratori abans d’usar aquests kits?',
          answer: 'Ha de revisar organisme objectiu, matriu, procediment, controls, documentació tècnica, requisits d’acreditació, autoritat competent i ús previst. També convé definir com es registren evidències, lots i revisions.'
        },
        {
          question: 'Aquests kits poden formar part d’un programa municipal o industrial?',
          answer: 'Poden ajudar en programes de control quan encaixen amb el pla de mostreig, el mètode i l’abast tècnic. La decisió s’ha de documentar i revisar dins del marc aplicable al país, sector i laboratori.'
        }
      ],
      technicalTable: {
        title: 'Resum tècnic de kits ISO/EPA',
        columns: ['Camp', 'Proposta Kits ISO/EPA'],
        rows: [
          ['Tipus de flux', 'Tècnic, documentat i alineable amb mètodes de referència'],
          ['Usuari recomanat', 'Laboratoris avançats, utilities i control regulat'],
          ['Documentació clau', 'Mètode, matriu, lot, controls, resultat i CoA'],
          ['Connexió Cloud', 'Audit trail, CoA, revisió i traçabilitat documental'],
          ['Referències relacionades', 'ISO 10705-2, EPA 1601/1602 només si aplica al producte concret'],
          ['Nota prudent', 'No reivindicar acceptació regulatòria ni compliment automàtic']
        ]
      }
    }
  }
};

function answerSections(key, lang = 'es') {
  const layer = PRODUCT_ANSWER_LAYER[lang]?.[key] || PRODUCT_ANSWER_LAYER.es[key];
  return [
    {
      kind: 'directAnswer',
      title: layer.directAnswer.title,
      body: layer.directAnswer.body,
      bullets: []
    },
    {
      kind: 'technicalTable',
      title: layer.technicalTable.title,
      body: '',
      bullets: [],
      table: layer.technicalTable
    }
  ];
}

export const PRODUCT_FAMILY_MARKETING_PAGES = [
  page('products', 'products', 'quote', {
    en: locale('/products', 'AquaVerify products for water microbiology and result traceability', 'Kits, presence/absence tests, ISO/EPA-oriented workflows, lab essentials and AquaVerify Cloud to turn each water sample into a documented, reviewable and actionable result.', [
      ...answerSections('products', 'en'),
      section('Choose by technical need', 'Start from the question your team needs to answer and move directly to the right product family.', ['Need to count or enumerate microorganisms: ENUMERA', 'Need a clear presence/absence answer: INDICA', 'Need ISO/EPA-oriented technical workflows: ISO/EPA kits', 'Need media, controls and daily materials: Lab Essentials', 'Need traceability, CoA and customer portal: AquaVerify Cloud']),
      section('Products connected to sectors and digital workflow', 'AquaVerify can connect product, sample, batch, operator, reading, review and report so laboratories, companies and distributors work with less ambiguity.', ['Laboratories: ENUMERA, ISO/EPA kits, Lab Essentials and AquaVerify Cloud', 'Quality teams: ENUMERA, INDICA and AquaVerify Cloud', 'Municipal water: ENUMERA, INDICA, ISO/EPA kits and reporting', 'Food, process water and facilities: screening, verification and traceability'])
    ], { eyebrow: 'Products', primaryCta: 'Request product recommendation', secondaryCta: 'Compare families', seoTitle: 'AquaVerify Water Microbiology Products | ENUMERA, INDICA, ISO/EPA Kits and Cloud', seoDescription: 'Compare AquaVerify water microbiology products: ENUMERA, INDICA, ISO/EPA-oriented kits, Lab Essentials and AquaVerify Cloud for traceable sample-to-report workflows.', ...getProductAssetOptions('products', 'en', 'AquaVerify water microbiology product ecosystem'), faqs: PRODUCT_ANSWER_LAYER.en.products.faqs }),
    es: locale('/es/productos', 'Productos AquaVerify para microbiología del agua y trazabilidad de resultados', 'Kits cuantitativos, pruebas de presencia/ausencia, flujos orientados a ISO/EPA, medios de laboratorio y AquaVerify Cloud para convertir cada muestra de agua en un resultado documentado, revisable y accionable.', [
      ...answerSections('products', 'es'),
      section('Elegir por necesidad técnica', 'Empieza por la pregunta que necesita responder tu equipo y llega directamente a la familia de producto adecuada.', ['Necesito contar o enumerar microorganismos: ENUMERA', 'Necesito una respuesta clara presencia/ausencia: INDICA', 'Necesito flujos técnicos orientados a ISO/EPA: kits ISO/EPA', 'Necesito medios, controles y materiales diarios: Lab Essentials', 'Necesito trazabilidad, CoA y portal cliente: AquaVerify Cloud']),
      section('Productos conectados a sectores y flujo digital', 'AquaVerify puede conectar producto, muestra, lote, operador, lectura, revisión e informe para que laboratorios, empresas y distribuidores trabajen con menos ambigüedad.', ['Laboratorios: ENUMERA, kits ISO/EPA, Lab Essentials y AquaVerify Cloud', 'Equipos de calidad: ENUMERA, INDICA y AquaVerify Cloud', 'Agua municipal: ENUMERA, INDICA, kits ISO/EPA y reporting', 'Alimentación, proceso e instalaciones: cribado, verificación y trazabilidad'])
    ], { eyebrow: 'Productos', primaryCta: 'Solicitar recomendación técnica', secondaryCta: 'Comparar familias', seoTitle: 'Productos AquaVerify para microbiología del agua | ENUMERA, INDICA, ISO/EPA y Cloud', seoDescription: 'Compara productos AquaVerify para microbiología del agua: ENUMERA, INDICA, kits orientados a ISO/EPA, Lab Essentials y AquaVerify Cloud para trazabilidad de muestra a informe.', ...getProductAssetOptions('products', 'es', 'Ecosistema de productos AquaVerify para microbiologia del agua'), faqs: ES_PRODUCT_ANSWER_LAYER.products.faqs }),
    fr: locale('/fr/produits', 'Produits AquaVerify pour la microbiologie de l’eau et la traçabilité des résultats', 'Kits quantitatifs, tests présence/absence, flux orientés ISO/EPA, essentiels de laboratoire et AquaVerify Cloud pour transformer chaque échantillon d’eau en résultat documenté, révisable et exploitable.', [
      ...answerSections('products', 'fr'),
      section('Choisir selon le besoin technique', 'Commencez par la question à laquelle votre équipe doit répondre et accédez directement à la bonne gamme.', ['Besoin de compter ou dénombrer des micro-organismes: ENUMERA', 'Besoin d’une réponse présence/absence claire: INDICA', 'Besoin de flux techniques orientés ISO/EPA: kits ISO/EPA', 'Besoin de milieux, contrôles et matériaux quotidiens: Lab Essentials', 'Besoin de traçabilité, CoA et portail client: AquaVerify Cloud']),
      section('Produits connectés aux secteurs et au flux numérique', 'AquaVerify peut relier produit, échantillon, lot, opérateur, lecture, revue et rapport afin que laboratoires, entreprises et distributeurs travaillent avec moins d’ambiguïté.', ['Laboratoires: ENUMERA, kits ISO/EPA, Lab Essentials et AquaVerify Cloud', 'Équipes qualité: ENUMERA, INDICA et AquaVerify Cloud', 'Eau municipale: ENUMERA, INDICA, kits ISO/EPA et reporting', 'Agroalimentaire, process et bâtiments: dépistage, vérification et traçabilité'])
    ], { eyebrow: 'Produits', primaryCta: 'Demander une recommandation technique', secondaryCta: 'Comparer les gammes', seoTitle: 'Produits AquaVerify pour microbiologie de l’eau | ENUMERA, INDICA, ISO/EPA et Cloud', seoDescription: 'Comparez les produits AquaVerify pour microbiologie de l’eau: ENUMERA, INDICA, kits orientés ISO/EPA, Lab Essentials et AquaVerify Cloud pour la traçabilité échantillon-rapport.', ...getProductAssetOptions('products', 'fr', 'Ecosysteme de produits AquaVerify pour microbiologie de l eau'), faqs: PRODUCT_ANSWER_LAYER.fr.products.faqs }),
    it: locale('/it/prodotti', 'Prodotti AquaVerify per microbiologia dell’acqua e tracciabilità dei risultati', 'Kit quantitativi, test presenza/assenza, flussi orientati ISO/EPA, materiali essenziali di laboratorio e AquaVerify Cloud per trasformare ogni campione d’acqua in un risultato documentato, revisionabile e azionabile.', [
      ...answerSections('products', 'it'),
      section('Scegliere per esigenza tecnica', 'Parti dalla domanda a cui il tuo team deve rispondere e vai direttamente alla famiglia prodotto corretta.', ['Devo contare o enumerare microrganismi: ENUMERA', 'Mi serve una risposta presenza/assenza chiara: INDICA', 'Mi servono flussi tecnici orientati ISO/EPA: kit ISO/EPA', 'Mi servono terreni, controlli e materiali quotidiani: Lab Essentials', 'Mi serve tracciabilità, CoA e portale clienti: AquaVerify Cloud']),
      section('Prodotti collegati a settori e flusso digitale', 'AquaVerify può collegare prodotto, campione, lotto, operatore, lettura, revisione e report affinché laboratori, aziende e distributori lavorino con meno ambiguità.', ['Laboratori: ENUMERA, kit ISO/EPA, Lab Essentials e AquaVerify Cloud', 'Team qualità: ENUMERA, INDICA e AquaVerify Cloud', 'Acqua municipale: ENUMERA, INDICA, kit ISO/EPA e reporting', 'Food, processo e strutture: screening, verifica e tracciabilità'])
    ], { eyebrow: 'Prodotti', primaryCta: 'Richiedi raccomandazione tecnica', secondaryCta: 'Confronta le gamme', seoTitle: 'Prodotti AquaVerify per microbiologia dell’acqua | ENUMERA, INDICA, ISO/EPA e Cloud', seoDescription: 'Confronta i prodotti AquaVerify per microbiologia dell’acqua: ENUMERA, INDICA, kit orientati ISO/EPA, Lab Essentials e AquaVerify Cloud per tracciabilità campione-report.', ...getProductAssetOptions('products', 'it', 'Ecosistema prodotti AquaVerify per microbiologia dell acqua'), faqs: PRODUCT_ANSWER_LAYER.it.products.faqs }),
    ca: locale('/ca/productes', 'Productes AquaVerify per a microbiologia de l’aigua i traçabilitat de resultats', 'Kits quantitatius, proves de presència/absència, fluxos orientats a ISO/EPA, medis de laboratori i AquaVerify Cloud per convertir cada mostra d’aigua en un resultat documentat, revisable i accionable.', [
      ...answerSections('products', 'ca'),
      section('Triar per necessitat tècnica', 'Comença per la pregunta que necessita respondre el teu equip i arriba directament a la família de producte adequada.', ['Necessito comptar o enumerar microorganismes: ENUMERA', 'Necessito una resposta clara presència/absència: INDICA', 'Necessito fluxos tècnics orientats a ISO/EPA: kits ISO/EPA', 'Necessito medis, controls i materials diaris: Lab Essentials', 'Necessito traçabilitat, CoA i portal client: AquaVerify Cloud']),
      section('Productes connectats a sectors i flux digital', 'AquaVerify pot connectar producte, mostra, lot, operador, lectura, revisió i informe perquè laboratoris, empreses i distribuïdors treballin amb menys ambigüitat.', ['Laboratoris: ENUMERA, kits ISO/EPA, Lab Essentials i AquaVerify Cloud', 'Equips de qualitat: ENUMERA, INDICA i AquaVerify Cloud', 'Aigua municipal: ENUMERA, INDICA, kits ISO/EPA i reporting', 'Alimentació, procés i instal·lacions: cribratge, verificació i traçabilitat'])
    ], { eyebrow: 'Productes', primaryCta: 'Sol·licitar recomanació tècnica', secondaryCta: 'Comparar famílies', seoTitle: 'Productes AquaVerify per microbiologia de l’aigua | ENUMERA, INDICA, ISO/EPA i Cloud', seoDescription: 'Compara productes AquaVerify per microbiologia de l’aigua: ENUMERA, INDICA, kits orientats a ISO/EPA, Lab Essentials i AquaVerify Cloud per traçabilitat de mostra a informe.', ...getProductAssetOptions('products', 'ca', 'Ecosistema de productes AquaVerify per microbiologia de l aigua'), faqs: PRODUCT_ANSWER_LAYER.ca.products.faqs })
  }),
  page('enumera', 'products', 'quote', {
    en: locale('/products/enumera', 'ENUMERA quantitative water microbiology kits', 'ENUMERA is the AquaVerify family for enumeration workflows in water microbiology.', [
      ...answerSections('enumera', 'en'),
      section('Built for counting, not guessing', 'ENUMERA is designed for quantitative workflows where laboratories need clear, repeatable and traceable results.', ['ENUMERA Soma100 for somatic coliphage workflows', 'ENUMERA Coli100 for bacterial indicator workflows', 'ENUMERA Entero100 for bacterial indicator workflows', 'Refills and tools for repeatable operation']),
      section('Connected to AquaVerify Cloud', 'Results, operators, sample context and reporting can be linked to the digital platform.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Request ENUMERA quote', secondaryCta: 'View all products', ...getProductAssetOptions('enumera', 'en', 'AquaVerify ENUMERA quantitative kit family'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('en'), faqs: PRODUCT_ANSWER_LAYER.en.enumera.faqs }),
    es: locale('/es/productos/enumera', 'Kits cuantitativos ENUMERA para microbiología del agua', 'ENUMERA es la familia AquaVerify para flujos de enumeración en microbiología del agua.', [
      ...answerSections('enumera', 'es'),
      section('Diseñada para contar, no para adivinar', 'ENUMERA está pensada para flujos cuantitativos donde el laboratorio necesita resultados claros, repetibles y trazables.', ['ENUMERA Soma100 para flujos de colífagos somáticos', 'ENUMERA Coli100 para indicadores bacterianos', 'ENUMERA Entero100 para indicadores bacterianos', 'Refills y herramientas para operación repetible']),
      section('Conectada a AquaVerify Cloud', 'Resultados, operadores, contexto de muestra e informes pueden vincularse a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Solicitar cotización ENUMERA', secondaryCta: 'Ver productos', ...getProductAssetOptions('enumera', 'es', 'Familia de kits cuantitativos AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('es'), faqs: ES_PRODUCT_ANSWER_LAYER.enumera.faqs }),
    fr: locale('/fr/produits/enumera', 'Kits quantitatifs ENUMERA pour la microbiologie de l’eau', 'ENUMERA est la famille AquaVerify dédiée aux flux de dénombrement en microbiologie de l’eau.', [
      ...answerSections('enumera', 'fr'),
      section('Conçu pour compter, pas pour deviner', 'ENUMERA répond aux flux quantitatifs où le laboratoire a besoin de résultats clairs, reproductibles et traçables.', ['ENUMERA Soma100 pour les coliphages somatiques', 'ENUMERA Coli100 pour les indicateurs bactériens', 'ENUMERA Entero100 pour les indicateurs bactériens', 'Recharges et outils pour une opération répétable']),
      section('Connecté à AquaVerify Cloud', 'Résultats, opérateurs, contexte d’échantillon et rapports peuvent être reliés à la plateforme numérique.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Demander un devis ENUMERA', secondaryCta: 'Voir les produits', ...getProductAssetOptions('enumera', 'fr', 'Famille de kits quantitatifs AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('fr'), faqs: PRODUCT_ANSWER_LAYER.fr.enumera.faqs }),
    it: locale('/it/prodotti/enumera', 'Kit quantitativi ENUMERA per microbiologia dell’acqua', 'ENUMERA è la famiglia AquaVerify per flussi di enumerazione nella microbiologia dell’acqua.', [
      ...answerSections('enumera', 'it'),
      section('Creato per contare, non per indovinare', 'ENUMERA è pensato per flussi quantitativi in cui il laboratorio richiede risultati chiari, ripetibili e tracciabili.', ['ENUMERA Soma100 per colifagi somatici', 'ENUMERA Coli100 per indicatori batterici', 'ENUMERA Entero100 per indicatori batterici', 'Refill e strumenti per operazioni ripetibili']),
      section('Collegato ad AquaVerify Cloud', 'Risultati, operatori, contesto del campione e report possono essere collegati alla piattaforma digitale.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Richiedi preventivo ENUMERA', secondaryCta: 'Vedi prodotti', ...getProductAssetOptions('enumera', 'it', 'Famiglia kit quantitativi AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('it'), faqs: PRODUCT_ANSWER_LAYER.it.enumera.faqs }),
    ca: locale('/ca/productes/enumera', 'Kits quantitatius ENUMERA per a microbiologia de l’aigua', 'ENUMERA és la família AquaVerify per a fluxos d’enumeració en microbiologia de l’aigua.', [
      ...answerSections('enumera', 'ca'),
      section('Dissenyada per comptar, no per endevinar', 'ENUMERA està pensada per a fluxos quantitatius on el laboratori necessita resultats clars, repetibles i traçables.', ['ENUMERA Soma100 per a colífags somàtics', 'ENUMERA Coli100 per a indicadors bacterians', 'ENUMERA Entero100 per a indicadors bacterians', 'Refills i eines per a operació repetible']),
      section('Connectada a AquaVerify Cloud', 'Resultats, operadors, context de mostra i informes es poden vincular a la plataforma digital.')
    ], { eyebrow: 'ENUMERA', primaryCta: 'Sol·licitar pressupost ENUMERA', secondaryCta: 'Veure productes', ...getProductAssetOptions('enumera', 'ca', 'Familia de kits quantitatius AquaVerify ENUMERA'), heroVideo: ENUMERA_HERO_VIDEO, gallery: enumeraGallery('ca'), faqs: PRODUCT_ANSWER_LAYER.ca.enumera.faqs })
  }),
  page('indica', 'products', 'quote', {
    en: locale('/products/indica', 'INDICA presence/absence water testing kits', 'INDICA is designed for fast qualitative water microbiology workflows where the answer must be clear: present or absent.', [
      ...answerSections('indica', 'en'),
      section('Clear screening workflows', 'INDICA supports rapid decision making for laboratories, field teams and quality control teams.', ['Somatic coliphage presence/absence', 'E. coli presence/absence', 'Enterococci presence/absence', 'Colorimetric matching tools']),
      section('From test to traceable record', 'INDICA workflows can feed AquaVerify Cloud so each result is linked to sample, site, operator and report.')
    ], { eyebrow: 'INDICA', primaryCta: 'Request INDICA quote', secondaryCta: 'Explore platform', ...getProductAssetOptions('indica', 'en', 'AquaVerify INDICA presence absence kit family'), faqs: PRODUCT_ANSWER_LAYER.en.indica.faqs }),
    es: locale('/es/productos/indica', 'Kits INDICA de presencia/ausencia para análisis de agua', 'INDICA está diseñada para flujos cualitativos rápidos en microbiología del agua donde la respuesta debe ser clara: presente o ausente.', [
      ...answerSections('indica', 'es'),
      section('Cribado claro y operativo', 'INDICA ayuda a tomar decisiones rápidas en laboratorios, equipos de campo y control de calidad.', ['Presencia/ausencia de colífagos somáticos', 'Presencia/ausencia de E. coli', 'Presencia/ausencia de enterococos', 'Herramientas de comparación colorimétrica']),
      section('Del test al registro trazable', 'Los flujos INDICA pueden alimentar AquaVerify Cloud para vincular resultado, muestra, punto, operador e informe.')
    ], { eyebrow: 'INDICA', primaryCta: 'Solicitar cotización INDICA', secondaryCta: 'Explorar plataforma', ...getProductAssetOptions('indica', 'es', 'Familia de kits presencia ausencia AquaVerify INDICA'), faqs: ES_PRODUCT_ANSWER_LAYER.indica.faqs }),
    fr: locale('/fr/produits/indica', 'Kits INDICA présence/absence pour l’analyse de l’eau', 'INDICA est conçu pour les flux qualitatifs rapides en microbiologie de l’eau où la réponse doit être claire: présent ou absent.', [
      ...answerSections('indica', 'fr'),
      section('Des flux de dépistage clairs', 'INDICA aide les laboratoires, équipes terrain et équipes qualité à décider rapidement.', ['Présence/absence de coliphages somatiques', 'Présence/absence d’E. coli', 'Présence/absence d’entérocoques', 'Outils de comparaison colorimétrique']),
      section('Du test au registre traçable', 'Les flux INDICA peuvent alimenter AquaVerify Cloud afin de relier résultat, échantillon, site, opérateur et rapport.')
    ], { eyebrow: 'INDICA', primaryCta: 'Demander un devis INDICA', secondaryCta: 'Explorer la plateforme', ...getProductAssetOptions('indica', 'fr', 'Famille de kits presence absence AquaVerify INDICA'), faqs: PRODUCT_ANSWER_LAYER.fr.indica.faqs }),
    it: locale('/it/prodotti/indica', 'Kit INDICA presenza/assenza per analisi dell’acqua', 'INDICA è progettata per flussi qualitativi rapidi in microbiologia dell’acqua, dove la risposta deve essere chiara: presente o assente.', [
      ...answerSections('indica', 'it'),
      section('Workflow di screening chiari', 'INDICA supporta decisioni rapide per laboratori, squadre sul campo e controllo qualità.', ['Presenza/assenza di colifagi somatici', 'Presenza/assenza di E. coli', 'Presenza/assenza di enterococchi', 'Strumenti di confronto colorimetrico']),
      section('Dal test al record tracciabile', 'I flussi INDICA possono alimentare AquaVerify Cloud collegando risultato, campione, sito, operatore e report.')
    ], { eyebrow: 'INDICA', primaryCta: 'Richiedi preventivo INDICA', secondaryCta: 'Esplora piattaforma', ...getProductAssetOptions('indica', 'it', 'Famiglia kit presenza assenza AquaVerify INDICA'), faqs: PRODUCT_ANSWER_LAYER.it.indica.faqs }),
    ca: locale('/ca/productes/indica', 'Kits INDICA de presència/absència per a anàlisi d’aigua', 'INDICA està dissenyada per a fluxos qualitatius ràpids en microbiologia de l’aigua on la resposta ha de ser clara: present o absent.', [
      ...answerSections('indica', 'ca'),
      section('Cribratge clar i operatiu', 'INDICA ajuda a prendre decisions ràpides en laboratoris, equips de camp i control de qualitat.', ['Presència/absència de colífags somàtics', 'Presència/absència d’E. coli', 'Presència/absència d’enterococs', 'Eines de comparació colorimètrica']),
      section('Del test al registre traçable', 'Els fluxos INDICA poden alimentar AquaVerify Cloud per vincular resultat, mostra, punt, operador i informe.')
    ], { eyebrow: 'INDICA', primaryCta: 'Sol·licitar pressupost INDICA', secondaryCta: 'Explorar plataforma', ...getProductAssetOptions('indica', 'ca', 'Familia de kits presencia absencia AquaVerify INDICA'), faqs: PRODUCT_ANSWER_LAYER.ca.indica.faqs })
  }),
  page('standard-kits', 'products', 'quote', {
    en: locale('/products/standard-iso-epa-kits', 'Standard ISO and EPA coliphage testing kits', 'AquaVerify standard kits support laboratories working with ISO 10705-2 and EPA coliphage testing workflows.', [
      ...answerSections('standardKits', 'en'),
      section('For regulated microbiology workflows', 'The standard kit range is built for teams that need method alignment, repeatability and technical confidence.', ['Somatic coliphage kits for ISO 10705-2 workflows', 'EPA-oriented somatic coliphage workflows', 'F-specific coliphage workflows', 'Support for method validation and training']),
      section('Keep the method, improve the workflow', 'AquaVerify helps laboratories connect technical methods with digital sample and report traceability.')
    ], { eyebrow: 'Standard Kits', primaryCta: 'Request standard kit quote', secondaryCta: 'Read ISO guide', ...getProductAssetOptions('standard-kits', 'en', 'AquaVerify standard ISO and EPA kit family'), faqs: PRODUCT_ANSWER_LAYER.en.standardKits.faqs }),
    es: locale('/es/productos/kits-iso-epa', 'Kits estándar ISO y EPA para análisis de colífagos', 'Los kits estándar AquaVerify apoyan a laboratorios que trabajan con flujos ISO 10705-2 y EPA para colífagos.', [
      ...answerSections('standardKits', 'es'),
      section('Para flujos de microbiología regulada', 'La gama estándar está pensada para equipos que necesitan alineación metodológica, repetibilidad y confianza técnica.', ['Kits de colífagos somáticos para flujos ISO 10705-2', 'Flujos de colífagos somáticos orientados a EPA', 'Flujos de colífagos F-específicos', 'Soporte para validación y formación']),
      section('Mantener el método, mejorar el flujo', 'AquaVerify ayuda a conectar métodos técnicos con trazabilidad digital de muestra e informe.')
    ], { eyebrow: 'Kits estándar', primaryCta: 'Solicitar cotización', secondaryCta: 'Leer guía ISO', ...getProductAssetOptions('standard-kits', 'es', 'Familia de kits estandar ISO y EPA AquaVerify'), faqs: ES_PRODUCT_ANSWER_LAYER.standardKits.faqs }),
    fr: locale('/fr/produits/kits-iso-epa', 'Kits standard ISO et EPA pour l’analyse des coliphages', 'Les kits standard AquaVerify accompagnent les laboratoires travaillant avec les flux ISO 10705-2 et EPA pour les coliphages.', [
      ...answerSections('standardKits', 'fr'),
      section('Pour les flux de microbiologie réglementée', 'La gamme standard est pensée pour les équipes qui recherchent alignement méthodologique, répétabilité et confiance technique.', ['Kits coliphages somatiques pour flux ISO 10705-2', 'Flux coliphages somatiques orientés EPA', 'Flux coliphages F-spécifiques', 'Support de validation et formation']),
      section('Garder la méthode, améliorer le flux', 'AquaVerify aide à connecter les méthodes techniques avec la traçabilité numérique des échantillons et rapports.')
    ], { eyebrow: 'Kits standard', primaryCta: 'Demander un devis', secondaryCta: 'Lire le guide ISO', ...getProductAssetOptions('standard-kits', 'fr', 'Famille de kits standard ISO et EPA AquaVerify'), faqs: PRODUCT_ANSWER_LAYER.fr.standardKits.faqs }),
    it: locale('/it/prodotti/kit-iso-epa', 'Kit standard ISO ed EPA per analisi dei colifagi', 'I kit standard AquaVerify supportano i laboratori che lavorano con flussi ISO 10705-2 ed EPA per colifagi.', [
      ...answerSections('standardKits', 'it'),
      section('Per flussi di microbiologia regolata', 'La gamma standard è pensata per team che richiedono allineamento metodologico, ripetibilità e fiducia tecnica.', ['Kit colifagi somatici per flussi ISO 10705-2', 'Flussi colifagi somatici orientati EPA', 'Flussi colifagi F-specifici', 'Supporto per validazione e formazione']),
      section('Mantenere il metodo, migliorare il flusso', 'AquaVerify aiuta a collegare metodi tecnici con tracciabilità digitale di campioni e report.')
    ], { eyebrow: 'Kit standard', primaryCta: 'Richiedi preventivo', secondaryCta: 'Leggi guida ISO', ...getProductAssetOptions('standard-kits', 'it', 'Famiglia kit standard ISO ed EPA AquaVerify'), faqs: PRODUCT_ANSWER_LAYER.it.standardKits.faqs }),
    ca: locale('/ca/productes/kits-iso-epa', 'Kits estàndard ISO i EPA per a anàlisi de colífags', 'Els kits estàndard AquaVerify donen suport a laboratoris que treballen amb fluxos ISO 10705-2 i EPA per a colífags.', [
      ...answerSections('standardKits', 'ca'),
      section('Per a fluxos de microbiologia regulada', 'La gamma estàndard està pensada per a equips que necessiten alineació metodològica, repetibilitat i confiança tècnica.', ['Kits de colífags somàtics per a fluxos ISO 10705-2', 'Fluxos de colífags somàtics orientats a EPA', 'Fluxos de colífags F-específics', 'Suport per a validació i formació']),
      section('Mantenir el mètode, millorar el flux', 'AquaVerify ajuda a connectar mètodes tècnics amb traçabilitat digital de mostra i informe.')
    ], { eyebrow: 'Kits estàndard', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Llegir guia ISO', ...getProductAssetOptions('standard-kits', 'ca', 'Familia de kits estandard ISO i EPA AquaVerify'), faqs: PRODUCT_ANSWER_LAYER.ca.standardKits.faqs })
  }),
  page('lab-essentials', 'products', 'quote', {
    en: locale('/products/lab-essentials', 'Lab Essentials for water microbiology laboratories', 'Culture media, reagents, controls and biological materials for daily water microbiology operations.', [
      section('The operational core of the laboratory', 'Lab Essentials supports the daily work behind reliable water microbiology results.', ['Culture media and reagents', 'Positive controls', 'Host strains', 'Prepared and frozen biological materials']),
      section('Designed for repeatability', 'Pair essentials with kits and the digital platform to standardize purchasing, execution and reporting.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Request lab essentials quote', secondaryCta: 'View products', ...getProductAssetOptions('lab-essentials', 'en', 'AquaVerify Lab Essentials product family') }),
    es: locale('/es/productos/lab-essentials', 'Lab Essentials para laboratorios de microbiología del agua', 'Medios de cultivo, reactivos, controles y materiales biológicos para la operación diaria de microbiología del agua.', [
      section('El corazón operativo del laboratorio', 'Lab Essentials da soporte al trabajo diario que hay detrás de resultados fiables en microbiología del agua.', ['Medios de cultivo y reactivos', 'Controles positivos', 'Cepas huésped', 'Materiales biológicos preparados y congelados']),
      section('Pensado para la repetibilidad', 'Combina essentials con kits y plataforma digital para estandarizar compra, ejecución e informes.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Solicitar cotización', secondaryCta: 'Ver productos', ...getProductAssetOptions('lab-essentials', 'es', 'Familia de productos AquaVerify Lab Essentials') }),
    fr: locale('/fr/produits/lab-essentials', 'Lab Essentials pour laboratoires de microbiologie de l’eau', 'Milieux de culture, réactifs, contrôles et matériaux biologiques pour les opérations quotidiennes de microbiologie de l’eau.', [
      section('Le cœur opérationnel du laboratoire', 'Lab Essentials soutient le travail quotidien nécessaire à des résultats fiables en microbiologie de l’eau.', ['Milieux de culture et réactifs', 'Contrôles positifs', 'Souches hôtes', 'Matériaux biologiques préparés et congelés']),
      section('Pensé pour la répétabilité', 'Associez essentiels, kits et plateforme numérique pour standardiser achat, exécution et rapports.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Demander un devis', secondaryCta: 'Voir les produits', ...getProductAssetOptions('lab-essentials', 'fr', 'Famille de produits AquaVerify Lab Essentials') }),
    it: locale('/it/prodotti/lab-essentials', 'Lab Essentials per laboratori di microbiologia dell’acqua', 'Terreni di coltura, reagenti, controlli e materiali biologici per le operazioni quotidiane di microbiologia dell’acqua.', [
      section('Il cuore operativo del laboratorio', 'Lab Essentials supporta il lavoro quotidiano dietro risultati affidabili in microbiologia dell’acqua.', ['Terreni di coltura e reagenti', 'Controlli positivi', 'Ceppi ospiti', 'Materiali biologici preparati e congelati']),
      section('Pensato per la ripetibilità', 'Abbina essentials, kit e piattaforma digitale per standardizzare acquisti, esecuzione e report.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Richiedi preventivo', secondaryCta: 'Vedi prodotti', ...getProductAssetOptions('lab-essentials', 'it', 'Famiglia prodotti AquaVerify Lab Essentials') }),
    ca: locale('/ca/productes/lab-essentials', 'Lab Essentials per a laboratoris de microbiologia de l’aigua', 'Medis de cultiu, reactius, controls i materials biològics per a l’operació diària de microbiologia de l’aigua.', [
      section('El cor operatiu del laboratori', 'Lab Essentials dona suport al treball diari que hi ha darrere de resultats fiables en microbiologia de l’aigua.', ['Medis de cultiu i reactius', 'Controls positius', 'Soques hoste', 'Materials biològics preparats i congelats']),
      section('Pensat per a la repetibilitat', 'Combina essentials amb kits i plataforma digital per estandarditzar compra, execució i informes.')
    ], { eyebrow: 'Lab Essentials', primaryCta: 'Sol·licitar pressupost', secondaryCta: 'Veure productes', ...getProductAssetOptions('lab-essentials', 'ca', 'Familia de productes AquaVerify Lab Essentials') })
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
    disclaimer: 'Method references should be read as workflow alignment unless a final regulatory claim is formally documented for the specific market.'
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
    disclaimer: 'Las referencias a métodos deben leerse como alineación de flujo salvo que exista una claim regulatoria final documentada para el mercado concreto.'
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
    disclaimer: 'Les références aux méthodes doivent être lues comme un alignement de flux sauf claim réglementaire finale documentée pour le marché concerné.'
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
    disclaimer: 'I riferimenti ai metodi vanno letti come allineamento del flusso salvo claim regolatoria finale documentata per il mercato specifico.'
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
    disclaimer: 'Les referències a mètodes s’han de llegir com alineació de flux tret que hi hagi una claim regulatòria final documentada per al mercat concret.'
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
    en: 'bacterial indicator workflows for validated laboratory routines',
    es: 'flujos de indicadores bacterianos para rutinas de laboratorio validadas',
    fr: 'flux d’indicateurs bactériens pour routines de laboratoire validées',
    it: 'flussi di indicatori batterici per routine di laboratorio validate',
    ca: 'fluxos d’indicadors bacterians per a rutines de laboratori validades'
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

export const PRODUCT_DETAIL_DATA = [
  { id: 'enumera-soma100', parentId: 'enumera', slug: 'enumera-soma100', name: 'ENUMERA Soma100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.somaticColiphages, method: 'ENUMERA quantitative workflow', volume: '100 mL', format: 'Kit' },
  { id: 'enumera-coli100', parentId: 'enumera', slug: 'enumera-coli100', name: 'ENUMERA Coli100', type: PRODUCT_TYPE.quantitativeKit, subFamily: 'ENUMERA Kits', parameter: COMMON.ecoliColiforms, method: 'UV-free chromogenic MPN tray workflow', volume: '100 mL', format: 'Kit' },
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

const ENUMERA_COLI100_PRODUCT_IMAGE = '/images/products/marketing/enumera-coli100.png';

function enumeraColi100Assets(lang) {
  return {
    ...getProductAssetOptions('enumera-coli100', lang, 'ENUMERA Coli 100 chromogenic tray with yellow and green wells'),
    heroImage: ENUMERA_COLI100_PRODUCT_IMAGE,
    heroImageAlt: 'ENUMERA Coli 100 tray showing yellow total coliform wells and green E. coli wells',
    heroImageFit: 'contain',
    ogImage: ENUMERA_COLI100_PRODUCT_IMAGE,
    gallery: [
      {
        src: ENUMERA_COLI100_PRODUCT_IMAGE,
        alt: 'ENUMERA Coli 100 multiwell tray with visible chromogenic results',
        title: {
          en: 'Visible chromogenic readout',
          es: 'Lectura cromogénica visible',
          fr: 'Lecture chromogène visible',
          it: 'Lettura cromogenica visibile',
          ca: 'Lectura cromogènica visible'
        }[lang],
        body: {
          en: 'Yellow wells indicate total coliforms. Green or blue-green wells indicate E. coli and are also counted as total coliforms.',
          es: 'Los pocillos amarillos indican coliformes totales. Los pocillos verdes o azul verdoso indican E. coli y también se cuentan como coliformes totales.',
          fr: 'Les puits jaunes indiquent les coliformes totaux. Les puits verts ou bleu-vert indiquent E. coli et sont également comptés comme coliformes totaux.',
          it: 'I pozzetti gialli indicano coliformi totali. I pozzetti verdi o verde-blu indicano E. coli e si contano anche come coliformi totali.',
          ca: 'Els pous grocs indiquen coliformes totals. Els pous verds o verd blavós indiquen E. coli i també es compten com a coliformes totals.'
        }[lang]
      }
    ]
  };
}

function enumeraColi100Whitepaper(lang) {
  const contentByLang = {
    en: {
      eyebrow: 'Product workflow brief',
      title: 'UV-free E. coli and total coliform workflow',
      intro: 'ENUMERA Coli 100 combines Smart Cap reagent release, a 100 mL sample workflow, multiwell MPN enumeration and visible chromogenic reading so laboratories can remove UV interpretation from routine E. coli and total coliform analysis.',
      metrics: [
        ['Sample', '100 mL', 'Designed around the standard 100 mL water sample routine used by many water microbiology laboratories.', 'cyan'],
        ['Incubation', '18 h / 35 °C', 'The expected product protocol uses incubation at 35 °C for 18 hours before visual reading.', 'indigo'],
        ['Readout', 'No UV', 'Results are interpreted under normal laboratory lighting: yellow for total coliforms, green for E. coli.', 'emerald']
      ],
      comparisonTitle: 'From fluorescence to visible colour',
      comparison: [
        ['Traditional fluorogenic workflow', 'Yellow plus UV fluorescence', 'Requires a UV lamp or cabinet, controlled reading conditions and periodic attention to lamp output.', 58, 'slate'],
        ['ENUMERA Coli 100 workflow', 'Yellow plus green visible colour', 'Uses a chromogenic reaction that makes E. coli visible as green or blue-green wells under normal light.', 92, 'emerald']
      ],
      flowTitle: 'Sample-to-result workflow',
      flow: [
        ['Add the sample', 'Introduce the water sample into the analysis bottle following the kit protocol and target volume.'],
        ['Close the Smart Cap bottle', 'The integrated reagent contacts the sample when the bottle is closed, reducing manual reagent handling.'],
        ['Mix and fill the tray', 'Distribute the prepared sample across the multiwell tray for MPN enumeration.'],
        ['Incubate', 'Incubate at 35 °C for 18 hours following the current product datasheet.'],
        ['Read and count', 'Count yellow plus green wells for total coliforms, and green wells for E. coli, then consult the MPN table.']
      ],
      timelineTitle: 'Where it fits',
      timeline: [
        ['1', 'Municipal', 'Water utilities', 'Routine E. coli and total coliform control without UV reading hardware.'],
        ['2', 'Laboratory', 'Environmental labs', 'High-volume sample batches with fewer repetitive reagent-handling steps.'],
        ['3', 'Industrial', 'Food and beverage', 'Water used as process water, ingredient water, ice, rinsing or hygiene control.'],
        ['4', 'Operations', 'Treatment plants', 'Clear visual checks to support treatment verification and deviation follow-up.']
      ],
      sourceLabel: 'Technical note',
      note: 'Use the product within the matrices, protocols and validation requirements accepted by each laboratory quality system and jurisdiction.'
    },
    es: {
      eyebrow: 'Resumen visual del producto',
      title: 'Flujo sin UV para E. coli y coliformes totales',
      intro: 'ENUMERA Coli 100 combina liberación de reactivo Smart Cap, flujo de muestra de 100 mL, enumeración NMP en tray multipocillo y lectura cromogénica visible para eliminar la interpretación UV de la rutina de E. coli y coliformes totales.',
      metrics: [
        ['Muestra', '100 mL', 'Pensado para la rutina de muestra de 100 mL habitual en muchos laboratorios de microbiología del agua.', 'cyan'],
        ['Incubación', '18 h / 35 °C', 'El protocolo previsto del producto utiliza incubación a 35 °C durante 18 horas antes de la lectura visual.', 'indigo'],
        ['Lectura', 'Sin UV', 'Los resultados se interpretan bajo luz normal: amarillo para coliformes totales y verde para E. coli.', 'emerald']
      ],
      comparisonTitle: 'De fluorescencia a color visible',
      comparison: [
        ['Flujo fluorogénico tradicional', 'Amarillo más fluorescencia UV', 'Requiere lámpara o cabina UV, condiciones de lectura controladas y atención periódica al estado de la fuente UV.', 58, 'slate'],
        ['Flujo ENUMERA Coli 100', 'Amarillo más verde visible', 'Utiliza una reacción cromogénica que hace visible E. coli como pocillos verdes o azul verdoso bajo luz normal.', 92, 'emerald']
      ],
      flowTitle: 'Flujo de muestra a resultado',
      flow: [
        ['Añadir la muestra', 'Introduce la muestra de agua en el bote de análisis siguiendo el protocolo y el volumen objetivo del kit.'],
        ['Cerrar el bote Smart Cap', 'El reactivo integrado entra en contacto con la muestra al cerrar el bote, reduciendo la manipulación manual de reactivos.'],
        ['Mezclar y llenar el tray', 'Distribuye la muestra preparada en el tray multipocillo para la enumeración mediante NMP.'],
        ['Incubar', 'Incuba a 35 °C durante 18 horas siguiendo la ficha técnica vigente del producto.'],
        ['Leer y contar', 'Cuenta pocillos amarillos más verdes para coliformes totales, y pocillos verdes para E. coli; después consulta la tabla NMP.']
      ],
      timelineTitle: 'Dónde encaja',
      timeline: [
        ['1', 'Municipal', 'Empresas de agua', 'Control rutinario de E. coli y coliformes totales sin hardware de lectura UV.'],
        ['2', 'Laboratorio', 'Laboratorios ambientales', 'Lotes con alto volumen de muestras y menos pasos repetitivos de manipulación de reactivo.'],
        ['3', 'Industrial', 'Alimentación y bebidas', 'Agua de proceso, agua ingrediente, hielo, enjuagues o control higiénico.'],
        ['4', 'Operaciones', 'Plantas de tratamiento', 'Comprobaciones visuales claras para verificar tratamiento y seguir desviaciones.']
      ],
      sourceLabel: 'Nota técnica',
      note: 'Utiliza el producto dentro de las matrices, protocolos y requisitos de validación aceptados por el sistema de calidad y la jurisdicción de cada laboratorio.'
    },
    fr: {
      eyebrow: 'Résumé visuel produit',
      title: 'Flux sans UV pour E. coli et coliformes totaux',
      intro: 'ENUMERA Coli 100 associe libération de réactif Smart Cap, flux échantillon 100 mL, énumération NPP en plateau multipuits et lecture chromogène visible afin de retirer l’interprétation UV de la routine E. coli et coliformes totaux.',
      metrics: [
        ['Échantillon', '100 mL', 'Conçu autour de la routine 100 mL utilisée par de nombreux laboratoires de microbiologie de l’eau.', 'cyan'],
        ['Incubation', '18 h / 35 °C', 'Le protocole produit prévu utilise une incubation à 35 °C pendant 18 heures avant lecture visuelle.', 'indigo'],
        ['Lecture', 'Sans UV', 'Les résultats se lisent sous lumière normale: jaune pour coliformes totaux, vert pour E. coli.', 'emerald']
      ],
      comparisonTitle: 'De la fluorescence à la couleur visible',
      comparison: [
        ['Flux fluorogène traditionnel', 'Jaune plus fluorescence UV', 'Nécessite lampe ou cabine UV, conditions de lecture contrôlées et suivi périodique de la source UV.', 58, 'slate'],
        ['Flux ENUMERA Coli 100', 'Jaune plus vert visible', 'Utilise une réaction chromogène qui rend E. coli visible en puits verts ou bleu-vert sous lumière normale.', 92, 'emerald']
      ],
      flowTitle: 'Flux de l’échantillon au résultat',
      flow: [
        ['Ajouter l’échantillon', 'Introduisez l’échantillon d’eau dans le flacon d’analyse selon le protocole et le volume cible du kit.'],
        ['Fermer le flacon Smart Cap', 'Le réactif intégré entre en contact avec l’échantillon à la fermeture, réduisant la manipulation manuelle de réactifs.'],
        ['Mélanger et remplir le plateau', 'Répartissez l’échantillon préparé dans le plateau multipuits pour l’énumération NPP.'],
        ['Incuber', 'Incubez à 35 °C pendant 18 heures selon la fiche technique en vigueur.'],
        ['Lire et compter', 'Comptez les puits jaunes plus verts pour les coliformes totaux, et les puits verts pour E. coli; consultez ensuite la table NPP.']
      ],
      timelineTitle: 'Où il s’intègre',
      timeline: [
        ['1', 'Municipal', 'Services d’eau', 'Contrôle routinier E. coli et coliformes totaux sans matériel de lecture UV.'],
        ['2', 'Laboratoire', 'Laboratoires environnementaux', 'Lots à volume élevé avec moins d’étapes répétitives de manipulation du réactif.'],
        ['3', 'Industriel', 'Agroalimentaire', 'Eau de procédé, eau ingrédient, glace, rinçages ou contrôle hygiène.'],
        ['4', 'Opérations', 'Stations de traitement', 'Contrôles visuels clairs pour vérifier le traitement et suivre les écarts.']
      ],
      sourceLabel: 'Note technique',
      note: 'Utilisez le produit dans les matrices, protocoles et exigences de validation acceptés par le système qualité et la juridiction du laboratoire.'
    },
    it: {
      eyebrow: 'Sintesi visiva prodotto',
      title: 'Workflow senza UV per E. coli e coliformi totali',
      intro: 'ENUMERA Coli 100 combina rilascio reagente Smart Cap, workflow campione da 100 mL, enumerazione MPN in tray multipietto e lettura cromogenica visibile per eliminare l’interpretazione UV dalla routine E. coli e coliformi totali.',
      metrics: [
        ['Campione', '100 mL', 'Pensato per la routine da 100 mL usata in molti laboratori di microbiologia dell’acqua.', 'cyan'],
        ['Incubazione', '18 h / 35 °C', 'Il protocollo previsto usa incubazione a 35 °C per 18 ore prima della lettura visiva.', 'indigo'],
        ['Lettura', 'Senza UV', 'I risultati si interpretano con luce normale: giallo per coliformi totali, verde per E. coli.', 'emerald']
      ],
      comparisonTitle: 'Dalla fluorescenza al colore visibile',
      comparison: [
        ['Workflow fluorogenico tradizionale', 'Giallo più fluorescenza UV', 'Richiede lampada o cabina UV, condizioni di lettura controllate e attenzione periodica alla sorgente UV.', 58, 'slate'],
        ['Workflow ENUMERA Coli 100', 'Giallo più verde visibile', 'Usa una reazione cromogenica che rende E. coli visibile come pozzetti verdi o verde-blu con luce normale.', 92, 'emerald']
      ],
      flowTitle: 'Workflow dal campione al risultato',
      flow: [
        ['Aggiungi il campione', 'Inserisci il campione d’acqua nel flacone di analisi seguendo protocollo e volume target del kit.'],
        ['Chiudi il flacone Smart Cap', 'Il reagente integrato entra in contatto con il campione alla chiusura, riducendo la manipolazione manuale dei reagenti.'],
        ['Miscela e riempi il tray', 'Distribuisci il campione preparato nel tray multipietto per l’enumerazione MPN.'],
        ['Incuba', 'Incuba a 35 °C per 18 ore seguendo la scheda tecnica vigente.'],
        ['Leggi e conta', 'Conta i pozzetti gialli più verdi per i coliformi totali, e i verdi per E. coli; poi consulta la tabella MPN.']
      ],
      timelineTitle: 'Dove si inserisce',
      timeline: [
        ['1', 'Municipale', 'Utility idriche', 'Controllo routinario di E. coli e coliformi totali senza hardware di lettura UV.'],
        ['2', 'Laboratorio', 'Laboratori ambientali', 'Lotti ad alto volume con meno passaggi ripetitivi di manipolazione reagente.'],
        ['3', 'Industriale', 'Food & beverage', 'Acqua di processo, acqua ingrediente, ghiaccio, risciacqui o controllo igienico.'],
        ['4', 'Operazioni', 'Impianti di trattamento', 'Controlli visivi chiari per verificare il trattamento e seguire deviazioni.']
      ],
      sourceLabel: 'Nota tecnica',
      note: 'Usare il prodotto entro matrici, protocolli e requisiti di validazione accettati dal sistema qualità e dalla giurisdizione del laboratorio.'
    },
    ca: {
      eyebrow: 'Resum visual del producte',
      title: 'Flux sense UV per a E. coli i coliformes totals',
      intro: 'ENUMERA Coli 100 combina alliberament de reactiu Smart Cap, flux de mostra de 100 mL, enumeració NMP en tray multipou i lectura cromogènica visible per eliminar la interpretació UV de la rutina d’E. coli i coliformes totals.',
      metrics: [
        ['Mostra', '100 mL', 'Pensat per a la rutina de mostra de 100 mL habitual en molts laboratoris de microbiologia de l’aigua.', 'cyan'],
        ['Incubació', '18 h / 35 °C', 'El protocol previst utilitza incubació a 35 °C durant 18 hores abans de la lectura visual.', 'indigo'],
        ['Lectura', 'Sense UV', 'Els resultats s’interpreten amb llum normal: groc per a coliformes totals i verd per a E. coli.', 'emerald']
      ],
      comparisonTitle: 'De fluorescència a color visible',
      comparison: [
        ['Flux fluorogènic tradicional', 'Groc més fluorescència UV', 'Requereix làmpada o cabina UV, condicions de lectura controlades i atenció periòdica a la font UV.', 58, 'slate'],
        ['Flux ENUMERA Coli 100', 'Groc més verd visible', 'Utilitza una reacció cromogènica que fa visible E. coli com a pous verds o verd blavós amb llum normal.', 92, 'emerald']
      ],
      flowTitle: 'Flux de mostra a resultat',
      flow: [
        ['Afegir la mostra', 'Introdueix la mostra d’aigua al pot d’anàlisi seguint el protocol i el volum objectiu del kit.'],
        ['Tancar el pot Smart Cap', 'El reactiu integrat entra en contacte amb la mostra en tancar el pot, reduint la manipulació manual de reactius.'],
        ['Homogeneïtzar i omplir el tray', 'Distribueix la mostra preparada al tray multipou per a l’enumeració mitjançant NMP.'],
        ['Incubar', 'Incuba a 35 °C durant 18 hores seguint la fitxa tècnica vigent.'],
        ['Llegir i comptar', 'Compta pous grocs més verds per a coliformes totals, i pous verds per a E. coli; després consulta la taula NMP.']
      ],
      timelineTitle: 'On encaixa',
      timeline: [
        ['1', 'Municipal', 'Empreses d’aigua', 'Control rutinari d’E. coli i coliformes totals sense maquinari de lectura UV.'],
        ['2', 'Laboratori', 'Laboratoris ambientals', 'Lots amb alt volum de mostres i menys passos repetitius de manipulació de reactiu.'],
        ['3', 'Industrial', 'Alimentació i begudes', 'Aigua de procés, aigua ingredient, gel, esbandides o control higiènic.'],
        ['4', 'Operacions', 'Plantes de tractament', 'Comprovacions visuals clares per verificar tractament i seguir desviacions.']
      ],
      sourceLabel: 'Nota tècnica',
      note: 'Utilitza el producte dins de les matrius, protocols i requisits de validació acceptats pel sistema de qualitat i la jurisdicció de cada laboratori.'
    }
  };
  const content = contentByLang[lang] || contentByLang.en;

  return {
    eyebrow: content.eyebrow,
    title: content.title,
    intro: content.intro,
    metrics: content.metrics.map(([label, value, body, tone]) => ({ label, value, body, tone })),
    comparisonTitle: content.comparisonTitle,
    comparison: content.comparison.map(([label, title, body, valuePercent, tone]) => ({ label, title, body, valuePercent, tone })),
    flowTitle: content.flowTitle,
    flow: content.flow.map(([title, body]) => ({ title, body })),
    timelineTitle: content.timelineTitle,
    timeline: content.timeline.map(([year, region, sector, body]) => ({ year, region, sector, body })),
    sourceLabel: content.sourceLabel,
    note: content.note
  };
}

function buildEnumeraColi100Locale(lang) {
  const assets = enumeraColi100Assets(lang);
  const copyByLang = {
    en: {
      path: '/products/enumera-coli100',
      title: 'ENUMERA® Coli 100: E. coli and total coliform counts without UV',
      description: 'ENUMERA® Coli 100 simplifies water microbiology with Smart Cap reagent release, chromogenic colour reading and multiwell MPN enumeration for Escherichia coli and total coliforms.',
      cta: 'Request a demonstration',
      secondary: 'View ENUMERA range',
      datasheet: 'Request technical datasheet',
      seoTitle: 'ENUMERA Coli 100 | E. coli and total coliform water testing without UV',
      seoDescription: 'ENUMERA Coli 100 is an AquaVerify chromogenic kit for E. coli and total coliform enumeration in 100 mL water samples, with visual reading and Smart Cap reagent delivery.',
      sections: [
        ['What is ENUMERA® Coli 100?', 'ENUMERA® Coli 100 is a water analysis system for detecting and enumerating E. coli and total coliforms in 100 mL samples. It is designed for laboratories, water operators, food and beverage companies and quality teams that need a practical routine with clear visual interpretation.', ['Chromogenic colour change instead of UV fluorescence', 'Multiwell tray format for MPN enumeration', 'Smart Cap reagent delivery integrated into the bottle closure', 'Built to connect sample context, operator and result in AquaVerify Cloud']],
        ['How it works', 'The workflow is intentionally simple: add sample, close the Smart Cap bottle, mix, fill the multiwell tray, incubate and read the colours under normal laboratory lighting.', ['Add the water sample to the analysis bottle', 'Close the Smart Cap so the integrated reagent contacts the sample', 'Homogenise and distribute into the multiwell tray', 'Incubate at 35 °C for 18 hours following the current product datasheet', 'Read visible colours and use the MPN table for enumeration']],
        ['Visible interpretation', 'ENUMERA® Coli 100 replaces weak fluorescence searches with direct colour interpretation. The technician reads the tray under normal lab light and counts the wells according to colour.', ['Clear or no colour change: negative well', 'Yellow well: total coliform positive', 'Green or blue-green well: E. coli positive and also total coliform positive', 'Total coliforms = yellow + green wells; E. coli = green wells']],
        ['Smart Cap reagent delivery', 'The Smart Cap incorporates the reagent in the bottle closure. The technician no longer needs to open sachets, pour powder manually or manage separate reagent waste for each sample.', ['Fewer repetitive preparation steps', 'Less exposure to loose powder or reagent spills', 'More consistent activation step across technicians', 'Simpler stock and routine handling for high-volume laboratories']],
        ['Use cases by industry', 'The product is suited to teams that need routine bacterial indicator monitoring with clear results and a workflow that can scale across repeated sample batches.', ['Municipal water utilities: routine E. coli and total coliform control', 'Environmental laboratories: productivity in high-volume sample batches', 'Treatment plants: verification and deviation follow-up', 'Food and beverage: process water, ingredient water, rinsing, ice and hygiene programmes', 'Agricultural, reclaimed and aquaculture water: preventive microbiological monitoring within validated matrices']],
        ['Quality and regulatory use', 'ENUMERA® Coli 100 should be used within the matrices, protocols and acceptance criteria defined by each laboratory quality system. For regulatory reporting, confirm method acceptance in the applicable jurisdiction and accreditation scope.', ['Designed for 100 mL water microbiology workflows', 'Validation evidence can support matrix, inclusivity, exclusivity, LOD and correlation discussions', 'Use the current product datasheet as the operational reference', 'Somatic coliphages require specific methods and are not detected by this kit']]
      ],
      faqs: [
        ['Does ENUMERA® Coli 100 require UV light?', 'No. Results are read by visible colour under normal laboratory lighting.'],
        ['What does a green well mean?', 'A green or blue-green well indicates E. coli. For counting purposes, it is also counted as a total coliform positive well.'],
        ['How are total coliforms counted?', 'Count all yellow and green wells, then consult the corresponding MPN table. E. coli is counted from the green wells.'],
        ['What incubation time does the workflow use?', 'The expected product protocol is 18 hours at 35 °C. Always follow the current product datasheet.'],
        ['What does Smart Cap add?', 'The reagent is integrated into the bottle closure and contacts the sample when the bottle is closed, reducing manual reagent addition steps.'],
        ['Does it detect somatic coliphages?', 'No. ENUMERA® Coli 100 is designed for E. coli and total coliforms. Somatic coliphages require specific methods.'],
        ['Can it replace another regulatory method?', 'Use depends on the matrices, protocols and validation requirements accepted by each laboratory and jurisdiction. Confirm acceptance before regulatory reporting.']
      ]
    },
    es: {
      path: '/es/productos/enumera-coli100',
      title: 'ENUMERA® Coli 100: recuento de E. coli y coliformes totales sin UV',
      description: 'ENUMERA® Coli 100 simplifica la microbiología del agua con liberación de reactivo Smart Cap, lectura cromogénica por colores y enumeración NMP en tray multipocillo para Escherichia coli y coliformes totales.',
      cta: 'Pedir una demostración',
      secondary: 'Ver gama ENUMERA',
      datasheet: 'Solicitar ficha técnica',
      seoTitle: 'ENUMERA Coli 100 | E. coli y coliformes totales en agua sin UV',
      seoDescription: 'ENUMERA Coli 100 es un kit cromogénico AquaVerify para enumerar E. coli y coliformes totales en muestras de agua de 100 mL, con lectura visual y Smart Cap.',
      sections: [
        ['¿Qué es ENUMERA® Coli 100?', 'ENUMERA® Coli 100 es un sistema de análisis para detectar y enumerar E. coli y coliformes totales en muestras de agua de 100 mL. Está diseñado para laboratorios, operadores de agua, industrias alimentarias y equipos de calidad que necesitan una rutina práctica con interpretación visual clara.', ['Cambio de color cromogénico en lugar de fluorescencia UV', 'Formato multipocillo para enumeración mediante NMP', 'Dosificación Smart Cap integrada en el cierre del bote', 'Preparado para conectar contexto de muestra, operador y resultado en AquaVerify Cloud']],
        ['Cómo funciona', 'El flujo es deliberadamente simple: añadir muestra, cerrar el bote Smart Cap, mezclar, llenar el tray multipocillo, incubar y leer los colores bajo luz normal de laboratorio.', ['Añadir la muestra de agua al bote de análisis', 'Cerrar el Smart Cap para que el reactivo integrado contacte con la muestra', 'Homogeneizar y distribuir en el tray multipocillo', 'Incubar a 35 °C durante 18 horas siguiendo la ficha técnica vigente', 'Leer colores visibles y usar la tabla NMP para la enumeración']],
        ['Interpretación visible', 'ENUMERA® Coli 100 sustituye la búsqueda de fluorescencias débiles por una interpretación directa por color. El técnico lee el tray bajo luz normal y cuenta los pocillos según el color.', ['Transparente o sin cambio de color: pocillo negativo', 'Pocillo amarillo: coliformes totales positivos', 'Pocillo verde o azul verdoso: E. coli positivo y también coliforme total positivo', 'Coliformes totales = pocillos amarillos + verdes; E. coli = pocillos verdes']],
        ['Smart Cap: reactivo integrado', 'El Smart Cap incorpora el reactivo en el propio cierre del bote. El técnico ya no necesita abrir sobres, verter polvo manualmente ni gestionar residuos de reactivo separados por cada muestra.', ['Menos pasos repetitivos de preparación', 'Menor exposición a polvo suelto o derrames de reactivo', 'Activación más consistente entre técnicos', 'Stock y rutina más simples para laboratorios con alto volumen']],
        ['Casos de uso por industria', 'El producto encaja en equipos que necesitan control rutinario de indicadores bacterianos con resultados claros y un flujo escalable a lotes repetidos de muestras.', ['Empresas municipales de agua: control rutinario de E. coli y coliformes totales', 'Laboratorios ambientales: productividad en lotes con alto volumen de muestras', 'Plantas de tratamiento: verificación y seguimiento de desviaciones', 'Alimentación y bebidas: agua de proceso, agua ingrediente, enjuagues, hielo y programas higiénicos', 'Agua agrícola, regenerada y acuicultura: seguimiento microbiológico preventivo dentro de matrices validadas']],
        ['Calidad y uso regulatorio', 'ENUMERA® Coli 100 debe utilizarse dentro de las matrices, protocolos y criterios de aceptación definidos por el sistema de calidad de cada laboratorio. Para reporting regulatorio, confirma la aceptación del método en la jurisdicción y alcance de acreditación aplicables.', ['Diseñado para flujos de microbiología del agua con muestra de 100 mL', 'La evidencia de validación puede apoyar conversaciones sobre matrices, inclusividad, exclusividad, LOD y correlación', 'La ficha técnica vigente debe ser la referencia operativa', 'Los colífagos somáticos requieren métodos específicos y no son detectados por este kit']]
      ],
      faqs: [
        ['¿ENUMERA® Coli 100 necesita luz ultravioleta?', 'No. La lectura se realiza por color visible bajo luz normal de laboratorio.'],
        ['¿Qué significa un pocillo verde?', 'Un pocillo verde o azul verdoso indica presencia de E. coli. A efectos de recuento, también se contabiliza como coliforme total positivo.'],
        ['¿Cómo se cuentan los coliformes totales?', 'Se suman todos los pocillos amarillos y verdes. Después se consulta la tabla NMP correspondiente. E. coli se cuenta a partir de los pocillos verdes.'],
        ['¿Cuál es el tiempo de incubación?', 'El protocolo previsto es 18 horas a 35 °C. Debe seguirse siempre la ficha técnica vigente del producto.'],
        ['¿Qué aporta el tapón Smart Cap?', 'El reactivo está integrado en el tapón del bote y entra en contacto con la muestra al cerrar, reduciendo pasos de adición manual de reactivo.'],
        ['¿Detecta colífagos somáticos?', 'No. ENUMERA® Coli 100 está diseñado para E. coli y coliformes totales. Los colífagos somáticos requieren métodos específicos.'],
        ['¿Sustituye a otros métodos regulatorios?', 'Depende de las matrices, protocolos y requisitos de validación aceptados por cada laboratorio y jurisdicción. Confirma la aceptación antes de reporting regulatorio.']
      ]
    },
    fr: {
      path: '/fr/produits/enumera-coli100',
      title: 'ENUMERA® Coli 100: énumération E. coli et coliformes totaux sans UV',
      description: 'ENUMERA® Coli 100 simplifie la microbiologie de l’eau avec libération de réactif Smart Cap, lecture chromogène par couleurs et énumération NPP en plateau multipuits pour Escherichia coli et coliformes totaux.',
      cta: 'Demander une démonstration',
      secondary: 'Voir la gamme ENUMERA',
      datasheet: 'Demander la fiche technique',
      seoTitle: 'ENUMERA Coli 100 | E. coli et coliformes totaux dans l’eau sans UV',
      seoDescription: 'ENUMERA Coli 100 est un kit chromogène AquaVerify pour énumérer E. coli et coliformes totaux dans des échantillons d’eau de 100 mL, avec lecture visible et Smart Cap.',
      sections: [
        ['Qu’est-ce qu’ENUMERA® Coli 100 ?', 'ENUMERA® Coli 100 est un système d’analyse pour détecter et énumérer E. coli et les coliformes totaux dans des échantillons d’eau de 100 mL. Il s’adresse aux laboratoires, opérateurs d’eau, industries agroalimentaires et équipes qualité qui recherchent une routine pratique avec lecture visuelle claire.', ['Changement de couleur chromogène au lieu de fluorescence UV', 'Format multipuits pour énumération NPP', 'Dosage Smart Cap intégré dans la fermeture du flacon', 'Prêt à relier contexte échantillon, opérateur et résultat dans AquaVerify Cloud']],
        ['Fonctionnement', 'Le flux est volontairement simple: ajouter l’échantillon, fermer le flacon Smart Cap, mélanger, remplir le plateau multipuits, incuber et lire les couleurs sous lumière normale de laboratoire.', ['Ajouter l’échantillon d’eau au flacon d’analyse', 'Fermer le Smart Cap pour mettre le réactif intégré en contact avec l’échantillon', 'Homogénéiser et répartir dans le plateau multipuits', 'Incuber à 35 °C pendant 18 heures selon la fiche technique en vigueur', 'Lire les couleurs visibles et utiliser la table NPP pour l’énumération']],
        ['Interprétation visible', 'ENUMERA® Coli 100 remplace la recherche de fluorescences faibles par une interprétation directe par couleur. Le technicien lit le plateau sous lumière normale et compte les puits selon leur couleur.', ['Transparent ou sans changement de couleur: puits négatif', 'Puits jaune: coliformes totaux positifs', 'Puits vert ou bleu-vert: E. coli positif et également coliforme total positif', 'Coliformes totaux = puits jaunes + verts; E. coli = puits verts']],
        ['Smart Cap: réactif intégré', 'Le Smart Cap incorpore le réactif dans la fermeture du flacon. Le technicien n’a plus besoin d’ouvrir des sachets, de verser de la poudre manuellement ou de gérer des déchets de réactif séparés pour chaque échantillon.', ['Moins d’étapes répétitives de préparation', 'Moins d’exposition aux poudres libres ou déversements de réactif', 'Activation plus cohérente entre techniciens', 'Stock et routine simplifiés pour laboratoires à haut volume']],
        ['Cas d’usage par secteur', 'Le produit convient aux équipes qui doivent réaliser un contrôle routinier d’indicateurs bactériens avec résultats clairs et flux extensible à des lots répétés.', ['Services d’eau municipaux: contrôle routinier E. coli et coliformes totaux', 'Laboratoires environnementaux: productivité sur lots à volume élevé', 'Stations de traitement: vérification et suivi des écarts', 'Agroalimentaire: eau de procédé, eau ingrédient, rinçages, glace et programmes hygiène', 'Eaux agricoles, réutilisées et aquaculture: suivi microbiologique préventif dans matrices validées']],
        ['Qualité et usage réglementaire', 'ENUMERA® Coli 100 doit être utilisé dans les matrices, protocoles et critères d’acceptation définis par le système qualité du laboratoire. Pour reporting réglementaire, confirmez l’acceptation de la méthode dans la juridiction et le périmètre d’accréditation applicables.', ['Conçu pour flux de microbiologie de l’eau avec échantillon 100 mL', 'Les preuves de validation peuvent soutenir les discussions sur matrices, inclusivité, exclusivité, LOD et corrélation', 'La fiche technique en vigueur reste la référence opérationnelle', 'Les coliphages somatiques exigent des méthodes spécifiques et ne sont pas détectés par ce kit']]
      ],
      faqs: [
        ['ENUMERA® Coli 100 nécessite-t-il une lumière UV ?', 'Non. La lecture se fait par couleur visible sous lumière normale de laboratoire.'],
        ['Que signifie un puits vert ?', 'Un puits vert ou bleu-vert indique E. coli. Pour le comptage, il est aussi compté comme coliforme total positif.'],
        ['Comment compter les coliformes totaux ?', 'Additionnez tous les puits jaunes et verts, puis consultez la table NPP correspondante. E. coli est compté à partir des puits verts.'],
        ['Quel est le temps d’incubation ?', 'Le protocole prévu est de 18 heures à 35 °C. Suivez toujours la fiche technique en vigueur.'],
        ['Qu’apporte le Smart Cap ?', 'Le réactif est intégré dans le bouchon du flacon et entre en contact avec l’échantillon à la fermeture, réduisant les étapes d’ajout manuel.'],
        ['Détecte-t-il les coliphages somatiques ?', 'Non. ENUMERA® Coli 100 est conçu pour E. coli et coliformes totaux. Les coliphages somatiques nécessitent des méthodes spécifiques.'],
        ['Remplace-t-il d’autres méthodes réglementaires ?', 'Cela dépend des matrices, protocoles et exigences de validation acceptés par chaque laboratoire et juridiction. Confirmez l’acceptation avant reporting réglementaire.']
      ]
    },
    it: {
      path: '/it/prodotti/enumera-coli100',
      title: 'ENUMERA® Coli 100: conteggio E. coli e coliformi totali senza UV',
      description: 'ENUMERA® Coli 100 semplifica la microbiologia dell’acqua con rilascio reagente Smart Cap, lettura cromogenica a colori ed enumerazione MPN in tray multipietto per Escherichia coli e coliformi totali.',
      cta: 'Richiedi una demo',
      secondary: 'Vedi gamma ENUMERA',
      datasheet: 'Richiedi scheda tecnica',
      seoTitle: 'ENUMERA Coli 100 | E. coli e coliformi totali in acqua senza UV',
      seoDescription: 'ENUMERA Coli 100 è un kit cromogenico AquaVerify per enumerare E. coli e coliformi totali in campioni d’acqua da 100 mL, con lettura visiva e Smart Cap.',
      sections: [
        ['Che cos’è ENUMERA® Coli 100?', 'ENUMERA® Coli 100 è un sistema di analisi per rilevare ed enumerare E. coli e coliformi totali in campioni d’acqua da 100 mL. È progettato per laboratori, operatori idrici, industrie alimentari e team qualità che necessitano di una routine pratica con interpretazione visiva chiara.', ['Cambio colore cromogenico invece di fluorescenza UV', 'Formato multipietto per enumerazione MPN', 'Dosaggio Smart Cap integrato nella chiusura del flacone', 'Pronto a collegare contesto campione, operatore e risultato in AquaVerify Cloud']],
        ['Come funziona', 'Il workflow è volutamente semplice: aggiungere il campione, chiudere il flacone Smart Cap, miscelare, riempire il tray multipietto, incubare e leggere i colori con luce normale di laboratorio.', ['Aggiungi il campione d’acqua al flacone di analisi', 'Chiudi lo Smart Cap affinché il reagente integrato contatti il campione', 'Omogeneizza e distribuisci nel tray multipietto', 'Incuba a 35 °C per 18 ore seguendo la scheda tecnica vigente', 'Leggi i colori visibili e usa la tabella MPN per l’enumerazione']],
        ['Interpretazione visibile', 'ENUMERA® Coli 100 sostituisce la ricerca di fluorescenze deboli con un’interpretazione diretta per colore. Il tecnico legge il tray con luce normale e conta i pozzetti in base al colore.', ['Trasparente o senza cambio colore: pozzetto negativo', 'Pozzetto giallo: coliformi totali positivi', 'Pozzetto verde o verde-blu: E. coli positivo e anche coliforme totale positivo', 'Coliformi totali = pozzetti gialli + verdi; E. coli = pozzetti verdi']],
        ['Smart Cap: reagente integrato', 'Lo Smart Cap integra il reagente nella chiusura del flacone. Il tecnico non deve più aprire bustine, versare polvere manualmente o gestire rifiuti di reagente separati per ogni campione.', ['Meno passaggi ripetitivi di preparazione', 'Minore esposizione a polveri libere o versamenti di reagente', 'Attivazione più coerente tra tecnici', 'Stock e routine più semplici per laboratori ad alto volume']],
        ['Casi d’uso per settore', 'Il prodotto si adatta a team che richiedono monitoraggio routinario di indicatori batterici con risultati chiari e workflow scalabile su lotti ripetuti.', ['Utility idriche municipali: controllo routinario E. coli e coliformi totali', 'Laboratori ambientali: produttività in lotti ad alto volume', 'Impianti di trattamento: verifica e follow-up delle deviazioni', 'Food & beverage: acqua di processo, acqua ingrediente, risciacqui, ghiaccio e programmi igienici', 'Acque agricole, rigenerate e acquacoltura: monitoraggio microbiologico preventivo in matrici validate']],
        ['Qualità e uso regolatorio', 'ENUMERA® Coli 100 deve essere usato entro matrici, protocolli e criteri di accettazione definiti dal sistema qualità di ciascun laboratorio. Per reporting regolatorio, confermare l’accettazione del metodo nella giurisdizione e nello scopo di accreditamento applicabili.', ['Progettato per workflow di microbiologia dell’acqua con campione da 100 mL', 'Le evidenze di validazione possono supportare discussioni su matrici, inclusività, esclusività, LOD e correlazione', 'La scheda tecnica vigente resta il riferimento operativo', 'I colifagi somatici richiedono metodi specifici e non sono rilevati da questo kit']]
      ],
      faqs: [
        ['ENUMERA® Coli 100 richiede luce ultravioletta?', 'No. La lettura avviene per colore visibile con luce normale di laboratorio.'],
        ['Cosa significa un pozzetto verde?', 'Un pozzetto verde o verde-blu indica E. coli. Ai fini del conteggio, va contato anche come coliforme totale positivo.'],
        ['Come si contano i coliformi totali?', 'Si sommano tutti i pozzetti gialli e verdi, poi si consulta la tabella MPN corrispondente. E. coli si conta dai pozzetti verdi.'],
        ['Qual è il tempo di incubazione?', 'Il protocollo previsto è 18 ore a 35 °C. Seguire sempre la scheda tecnica vigente.'],
        ['Cosa aggiunge lo Smart Cap?', 'Il reagente è integrato nel tappo del flacone ed entra in contatto con il campione alla chiusura, riducendo i passaggi di aggiunta manuale.'],
        ['Rileva colifagi somatici?', 'No. ENUMERA® Coli 100 è progettato per E. coli e coliformi totali. I colifagi somatici richiedono metodi specifici.'],
        ['Sostituisce altri metodi regolatori?', 'Dipende da matrici, protocolli e requisiti di validazione accettati da ciascun laboratorio e giurisdizione. Confermare l’accettazione prima del reporting regolatorio.']
      ]
    },
    ca: {
      path: '/ca/productes/enumera-coli100',
      title: 'ENUMERA® Coli 100: recompte d’E. coli i coliformes totals sense UV',
      description: 'ENUMERA® Coli 100 simplifica la microbiologia de l’aigua amb alliberament de reactiu Smart Cap, lectura cromogènica per colors i enumeració NMP en tray multipou per a Escherichia coli i coliformes totals.',
      cta: 'Demanar una demostració',
      secondary: 'Veure gamma ENUMERA',
      datasheet: 'Sol·licitar fitxa tècnica',
      seoTitle: 'ENUMERA Coli 100 | E. coli i coliformes totals en aigua sense UV',
      seoDescription: 'ENUMERA Coli 100 és un kit cromogènic AquaVerify per enumerar E. coli i coliformes totals en mostres d’aigua de 100 mL, amb lectura visual i Smart Cap.',
      sections: [
        ['Què és ENUMERA® Coli 100?', 'ENUMERA® Coli 100 és un sistema d’anàlisi per detectar i enumerar E. coli i coliformes totals en mostres d’aigua de 100 mL. Està dissenyat per a laboratoris, operadors d’aigua, indústries alimentàries i equips de qualitat que necessiten una rutina pràctica amb interpretació visual clara.', ['Canvi de color cromogènic en lloc de fluorescència UV', 'Format multipou per a enumeració mitjançant NMP', 'Dosificació Smart Cap integrada al tancament del pot', 'Preparat per connectar context de mostra, operador i resultat a AquaVerify Cloud']],
        ['Com funciona', 'El flux és deliberadament simple: afegir mostra, tancar el pot Smart Cap, barrejar, omplir el tray multipou, incubar i llegir els colors amb llum normal de laboratori.', ['Afegir la mostra d’aigua al pot d’anàlisi', 'Tancar l’Smart Cap perquè el reactiu integrat contacti amb la mostra', 'Homogeneïtzar i distribuir al tray multipou', 'Incubar a 35 °C durant 18 hores seguint la fitxa tècnica vigent', 'Llegir colors visibles i usar la taula NMP per a l’enumeració']],
        ['Interpretació visible', 'ENUMERA® Coli 100 substitueix la recerca de fluorescències febles per una interpretació directa per color. El tècnic llegeix el tray amb llum normal i compta els pous segons el color.', ['Transparent o sense canvi de color: pou negatiu', 'Pou groc: coliformes totals positius', 'Pou verd o verd blavós: E. coli positiu i també coliforme total positiu', 'Coliformes totals = pous grocs + verds; E. coli = pous verds']],
        ['Smart Cap: reactiu integrat', 'L’Smart Cap incorpora el reactiu al tancament del pot. El tècnic ja no necessita obrir sobres, abocar pols manualment ni gestionar residus de reactiu separats per cada mostra.', ['Menys passos repetitius de preparació', 'Menor exposició a pols solta o vessaments de reactiu', 'Activació més consistent entre tècnics', 'Estoc i rutina més simples per a laboratoris amb alt volum']],
        ['Casos d’ús per indústria', 'El producte encaixa en equips que necessiten control rutinari d’indicadors bacterians amb resultats clars i un flux escalable a lots repetits de mostres.', ['Empreses municipals d’aigua: control rutinari d’E. coli i coliformes totals', 'Laboratoris ambientals: productivitat en lots amb alt volum de mostres', 'Plantes de tractament: verificació i seguiment de desviacions', 'Alimentació i begudes: aigua de procés, aigua ingredient, esbandides, gel i programes higiènics', 'Aigua agrícola, regenerada i aqüicultura: seguiment microbiològic preventiu dins de matrius validades']],
        ['Qualitat i ús regulatori', 'ENUMERA® Coli 100 s’ha d’utilitzar dins de les matrius, protocols i criteris d’acceptació definits pel sistema de qualitat de cada laboratori. Per a reporting regulatori, confirma l’acceptació del mètode a la jurisdicció i abast d’acreditació aplicables.', ['Dissenyat per a fluxos de microbiologia de l’aigua amb mostra de 100 mL', 'L’evidència de validació pot donar suport a converses sobre matrius, inclusivitat, exclusivitat, LOD i correlació', 'La fitxa tècnica vigent ha de ser la referència operativa', 'Els colífags somàtics requereixen mètodes específics i no són detectats per aquest kit']]
      ],
      faqs: [
        ['ENUMERA® Coli 100 necessita llum ultraviolada?', 'No. La lectura es fa per color visible amb llum normal de laboratori.'],
        ['Què significa un pou verd?', 'Un pou verd o verd blavós indica presència d’E. coli. A efectes de recompte, també es comptabilitza com a coliforme total positiu.'],
        ['Com es compten els coliformes totals?', 'Se sumen tots els pous grocs i verds. Després es consulta la taula NMP corresponent. E. coli es compta a partir dels pous verds.'],
        ['Quin és el temps d’incubació?', 'El protocol previst és 18 hores a 35 °C. Cal seguir sempre la fitxa tècnica vigent del producte.'],
        ['Què aporta el tap Smart Cap?', 'El reactiu està integrat al tap del pot i entra en contacte amb la mostra en tancar, reduint passos d’addició manual de reactiu.'],
        ['Detecta colífags somàtics?', 'No. ENUMERA® Coli 100 està dissenyat per a E. coli i coliformes totals. Els colífags somàtics requereixen mètodes específics.'],
        ['Substitueix altres mètodes regulatoris?', 'Depèn de les matrius, protocols i requisits de validació acceptats per cada laboratori i jurisdicció. Confirma l’acceptació abans del reporting regulatori.']
      ]
    }
  };
  const copy = copyByLang[lang] || copyByLang.en;

  return locale(
    copy.path,
    copy.title,
    copy.description,
    copy.sections.map(([title, body, bullets]) => section(title, body, bullets)),
    {
      eyebrow: 'ENUMERA',
      primaryCta: copy.cta,
      secondaryCta: copy.secondary,
      datasheetLabel: copy.datasheet,
      seoTitle: copy.seoTitle,
      seoDescription: copy.seoDescription,
      faqs: copy.faqs.map(([question, answer]) => ({ question, answer })),
      whitepaper: enumeraColi100Whitepaper(lang),
      ...assets
    }
  );
}

function buildProductLocale(product, lang) {
  if (product.id === 'enumera-coli100') {
    return buildEnumeraColi100Locale(lang);
  }

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
      faqs: buildProductFaqs(product, lang),
      ...getProductAssetOptions(product.id, lang, `${product.name} AquaVerify product visual`)
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

export const PRODUCT_DETAIL_MARKETING_PAGES = buildProductDetailPages();
export const PRODUCT_MARKETING_PAGES = [
  ...PRODUCT_FAMILY_MARKETING_PAGES,
  ...PRODUCT_DETAIL_MARKETING_PAGES
];
