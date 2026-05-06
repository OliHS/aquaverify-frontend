import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Zap, Microscope, Leaf, ArrowRight } from 'lucide-react';
import { EditableText } from './admin/EditableText';
import { useLanguage } from '../context/LanguageContext';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import type { Language } from '../utils/translations';

interface EnumeraModalProps {
    onClose: () => void;
}

type EnumeraModalCopy = {
    productRangeLabel: string;
    subtitle: string;
    introTitle: string;
    introText: string;
    innovTitle: string;
    innovText: string;
    innov1stTitle: string;
    innov1stText: string;
    innov2ndTitle: string;
    innov2ndText: string;
    kitsTitle: string;
    kitsText: string;
    kit1Title: string;
    kit1Text: string;
    kit2Title: string;
    kit2Text: string;
    kit3Title: string;
    kit3Text: string;
    whyTitle: string;
    why1Title: string;
    why1Text: string;
    why2Title: string;
    why2Text: string;
    why3Title: string;
    why3Text: string;
    why4Title: string;
    why4Text: string;
    quoteCta: string;
};

const ENUMERA_MODAL_COPY: Record<Language, EnumeraModalCopy> = {
    en: {
        productRangeLabel: 'Product range',
        subtitle: "The range brings together <span class='text-primary font-bold'>ENUMERA Soma100</span>, <span class='text-primary font-bold'>ENUMERA Coli100</span> and <span class='text-primary font-bold'>ENUMERA Entero100</span> for connected water microbiology workflows.",
        introTitle: 'Next-generation chromogenic technology',
        introText: 'AquaVerify combines Smart Cap reagent delivery with chromogenic color-changing chemistry to simplify field and laboratory water microbiology workflows while keeping sample context ready for digital traceability.',
        innovTitle: 'Smart Cap and UV-free visual workflow',
        innovText: 'Traditional workflows often require manual reagent handling and UV-dependent reading steps. The ENUMERA concept reduces those friction points through two practical innovations:',
        innov1stTitle: 'Twist & Mix workflow',
        innov1stText: 'The <strong>Twist & Mix</strong> reagent delivery system is integrated into the sample bottle cap, helping operators release the culture medium without reopening the bottle after the sample is added.',
        innov2ndTitle: 'UV-free visual readout',
        innov2ndText: 'Chromogenic substrates generate a visible color change under ambient light, reducing dependence on UV lamps for routine visual interpretation.',
        kitsTitle: 'The ENUMERA range: one concept, multiple parameters',
        kitsText: 'The product family applies the same Smart Cap and chromogenic approach across specialised kits for quantitative water microbiology workflows.',
        kit1Title: 'ENUMERA Coli100',
        kit1Text: 'Designed for bacterial indicator workflows where clear visual interpretation and connected traceability are important for laboratories and quality teams.',
        kit2Title: 'ENUMERA Entero100',
        kit2Text: 'Uses the same Smart Cap and chromogenic concept for enterococci-oriented workflows, with a practical format for repeatable field or lab routines.',
        kit3Title: 'ENUMERA Soma100',
        kit3Text: 'Supports somatic coliphage-oriented workflows where teams need structured sample handling, visual reading and digital reporting context.',
        whyTitle: 'Why choose ENUMERA technology?',
        why1Title: 'Safer routine handling',
        why1Text: 'Reducing UV-dependent steps helps laboratories limit unnecessary exposure points during routine interpretation.',
        why2Title: 'Operational efficiency',
        why2Text: 'Smart Cap delivery removes separate sachet handling steps and helps reduce spills or cross-contamination during reagent addition.',
        why3Title: 'Clear visual interpretation',
        why3Text: 'Chromogenic color change supports direct visual reading and reduces ambiguity compared with weak fluorescence signals.',
        why4Title: 'Lower workflow waste',
        why4Text: 'Integrated reagent delivery can reduce secondary packaging and UV lamp dependency in recurring testing workflows.',
        quoteCta: 'Request ENUMERA quote'
    },
    es: {
        productRangeLabel: 'Gama de producto',
        subtitle: "La gama reúne <span class='text-primary font-bold'>ENUMERA Soma100</span>, <span class='text-primary font-bold'>ENUMERA Coli100</span> y <span class='text-primary font-bold'>ENUMERA Entero100</span> para flujos conectados de microbiología del agua.",
        introTitle: 'Tecnología cromogénica de nueva generación',
        introText: 'AquaVerify combina la dosificación de reactivos Smart Cap con química cromogénica de cambio de color para simplificar flujos de microbiología del agua en campo y laboratorio, manteniendo el contexto de muestra preparado para trazabilidad digital.',
        innovTitle: 'Smart Cap y flujo visual sin UV',
        innovText: 'Los flujos tradicionales suelen exigir manipulación manual de reactivos y pasos de lectura dependientes de UV. El concepto ENUMERA reduce esos puntos de fricción mediante dos innovaciones prácticas:',
        innov1stTitle: 'Flujo Twist & Mix',
        innov1stText: 'El sistema de dosificación <strong>Twist & Mix</strong> se integra en el tapón de la botella de muestra, ayudando al operador a liberar el medio de cultivo sin reabrir la botella después de añadir la muestra.',
        innov2ndTitle: 'Lectura visual sin UV',
        innov2ndText: 'Los sustratos cromogénicos generan un cambio de color visible con luz ambiente, reduciendo la dependencia de lámparas UV para la interpretación visual rutinaria.',
        kitsTitle: 'La gama ENUMERA: un concepto, varios parámetros',
        kitsText: 'La familia aplica el mismo enfoque Smart Cap y cromogénico en kits especializados para flujos cuantitativos de microbiología del agua.',
        kit1Title: 'ENUMERA Coli100',
        kit1Text: 'Diseñado para flujos de indicadores bacterianos donde la interpretación visual clara y la trazabilidad conectada son importantes para laboratorios y equipos de calidad.',
        kit2Title: 'ENUMERA Entero100',
        kit2Text: 'Utiliza el mismo concepto Smart Cap y cromogénico para flujos orientados a enterococos, con un formato práctico para rutinas repetibles en campo o laboratorio.',
        kit3Title: 'ENUMERA Soma100',
        kit3Text: 'Apoya flujos orientados a colífagos somáticos cuando el equipo necesita manipulación estructurada de muestra, lectura visual y contexto de informe digital.',
        whyTitle: '¿Por qué elegir la tecnología ENUMERA?',
        why1Title: 'Manipulación rutinaria más segura',
        why1Text: 'Reducir pasos dependientes de UV ayuda a limitar puntos de exposición innecesarios durante la interpretación rutinaria.',
        why2Title: 'Eficiencia operativa',
        why2Text: 'La dosificación Smart Cap evita pasos separados de manipulación de sobres y ayuda a reducir derrames o contaminación cruzada al añadir el reactivo.',
        why3Title: 'Interpretación visual clara',
        why3Text: 'El cambio de color cromogénico facilita una lectura visual directa y reduce la ambigüedad frente a señales fluorescentes débiles.',
        why4Title: 'Menos residuos de flujo',
        why4Text: 'La dosificación integrada puede reducir embalajes secundarios y dependencia de lámparas UV en flujos recurrentes de análisis.',
        quoteCta: 'Solicitar cotización ENUMERA'
    },
    fr: {
        productRangeLabel: 'Gamme de produits',
        subtitle: "La gamme réunit <span class='text-primary font-bold'>ENUMERA Soma100</span>, <span class='text-primary font-bold'>ENUMERA Coli100</span> et <span class='text-primary font-bold'>ENUMERA Entero100</span> pour des flux connectés de microbiologie de l’eau.",
        introTitle: 'Technologie chromogène de nouvelle génération',
        introText: 'AquaVerify combine la délivrance de réactifs Smart Cap avec une chimie chromogène à changement de couleur afin de simplifier les flux de microbiologie de l’eau sur le terrain et au laboratoire, tout en préparant le contexte d’échantillon pour la traçabilité numérique.',
        innovTitle: 'Smart Cap et flux visuel sans UV',
        innovText: 'Les flux traditionnels nécessitent souvent une manipulation manuelle des réactifs et des étapes de lecture dépendantes des UV. Le concept ENUMERA réduit ces frictions grâce à deux innovations pratiques :',
        innov1stTitle: 'Flux Twist & Mix',
        innov1stText: 'Le système de délivrance <strong>Twist & Mix</strong> est intégré au bouchon du flacon d’échantillon, aidant l’opérateur à libérer le milieu de culture sans rouvrir le flacon après ajout de l’échantillon.',
        innov2ndTitle: 'Lecture visuelle sans UV',
        innov2ndText: 'Les substrats chromogènes génèrent un changement de couleur visible à la lumière ambiante, réduisant la dépendance aux lampes UV pour l’interprétation visuelle courante.',
        kitsTitle: 'La gamme ENUMERA : un concept, plusieurs paramètres',
        kitsText: 'La famille applique la même approche Smart Cap et chromogène à des kits spécialisés pour les flux quantitatifs de microbiologie de l’eau.',
        kit1Title: 'ENUMERA Coli100',
        kit1Text: 'Pensé pour les flux d’indicateurs bactériens où une interprétation visuelle claire et une traçabilité connectée sont importantes pour les laboratoires et les équipes qualité.',
        kit2Title: 'ENUMERA Entero100',
        kit2Text: 'Utilise le même concept Smart Cap et chromogène pour les flux orientés entérocoques, avec un format pratique pour les routines terrain ou laboratoire.',
        kit3Title: 'ENUMERA Soma100',
        kit3Text: 'Soutient les flux orientés coliphages somatiques lorsque les équipes ont besoin d’une manipulation structurée, d’une lecture visuelle et d’un contexte de rapport numérique.',
        whyTitle: 'Pourquoi choisir la technologie ENUMERA ?',
        why1Title: 'Manipulation de routine plus sûre',
        why1Text: 'Réduire les étapes dépendantes des UV aide les laboratoires à limiter les points d’exposition inutiles pendant l’interprétation courante.',
        why2Title: 'Efficacité opérationnelle',
        why2Text: 'La délivrance Smart Cap supprime des étapes séparées de manipulation de sachets et aide à réduire les déversements ou contaminations croisées.',
        why3Title: 'Interprétation visuelle claire',
        why3Text: 'Le changement de couleur chromogène facilite une lecture visuelle directe et réduit l’ambiguïté liée aux signaux fluorescents faibles.',
        why4Title: 'Moins de déchets de flux',
        why4Text: 'La délivrance intégrée peut réduire les emballages secondaires et la dépendance aux lampes UV dans les flux d’analyse récurrents.',
        quoteCta: 'Demander un devis ENUMERA'
    },
    it: {
        productRangeLabel: 'Gamma prodotti',
        subtitle: "La gamma riunisce <span class='text-primary font-bold'>ENUMERA Soma100</span>, <span class='text-primary font-bold'>ENUMERA Coli100</span> ed <span class='text-primary font-bold'>ENUMERA Entero100</span> per workflow connessi di microbiologia dell’acqua.",
        introTitle: 'Tecnologia cromogenica di nuova generazione',
        introText: 'AquaVerify combina il rilascio reagente Smart Cap con chimica cromogenica a cambio colore per semplificare i workflow di microbiologia dell’acqua in campo e in laboratorio, mantenendo il contesto del campione pronto per la tracciabilità digitale.',
        innovTitle: 'Smart Cap e workflow visivo senza UV',
        innovText: 'I workflow tradizionali richiedono spesso manipolazione manuale dei reagenti e passaggi di lettura dipendenti da UV. Il concetto ENUMERA riduce questi attriti con due innovazioni pratiche:',
        innov1stTitle: 'Workflow Twist & Mix',
        innov1stText: 'Il sistema di rilascio <strong>Twist & Mix</strong> è integrato nel tappo della bottiglia campione, aiutando l’operatore a rilasciare il terreno senza riaprire la bottiglia dopo l’aggiunta del campione.',
        innov2ndTitle: 'Lettura visiva senza UV',
        innov2ndText: 'I substrati cromogenici generano un cambio colore visibile con luce ambiente, riducendo la dipendenza da lampade UV per l’interpretazione visiva di routine.',
        kitsTitle: 'La gamma ENUMERA: un concetto, più parametri',
        kitsText: 'La famiglia applica lo stesso approccio Smart Cap e cromogenico a kit specializzati per workflow quantitativi di microbiologia dell’acqua.',
        kit1Title: 'ENUMERA Coli100',
        kit1Text: 'Pensato per workflow di indicatori batterici dove interpretazione visiva chiara e tracciabilità connessa sono importanti per laboratori e team qualità.',
        kit2Title: 'ENUMERA Entero100',
        kit2Text: 'Utilizza lo stesso concetto Smart Cap e cromogenico per workflow orientati agli enterococchi, con un formato pratico per routine ripetibili in campo o laboratorio.',
        kit3Title: 'ENUMERA Soma100',
        kit3Text: 'Supporta workflow orientati ai colifagi somatici quando i team richiedono gestione strutturata del campione, lettura visiva e contesto di report digitale.',
        whyTitle: 'Perché scegliere la tecnologia ENUMERA?',
        why1Title: 'Gestione routine più sicura',
        why1Text: 'Ridurre i passaggi dipendenti da UV aiuta i laboratori a limitare punti di esposizione non necessari durante l’interpretazione di routine.',
        why2Title: 'Efficienza operativa',
        why2Text: 'Il rilascio Smart Cap elimina passaggi separati di manipolazione delle bustine e aiuta a ridurre versamenti o contaminazioni crociate.',
        why3Title: 'Interpretazione visiva chiara',
        why3Text: 'Il cambio colore cromogenico supporta una lettura visiva diretta e riduce l’ambiguità rispetto a segnali fluorescenti deboli.',
        why4Title: 'Meno rifiuti di workflow',
        why4Text: 'Il rilascio integrato può ridurre imballaggi secondari e dipendenza da lampade UV nei workflow ricorrenti di analisi.',
        quoteCta: 'Richiedi preventivo ENUMERA'
    },
    ca: {
        productRangeLabel: 'Gamma de producte',
        subtitle: "La gamma reuneix <span class='text-primary font-bold'>ENUMERA Soma100</span>, <span class='text-primary font-bold'>ENUMERA Coli100</span> i <span class='text-primary font-bold'>ENUMERA Entero100</span> per a fluxos connectats de microbiologia de l’aigua.",
        introTitle: 'Tecnologia cromogènica de nova generació',
        introText: 'AquaVerify combina la dosificació de reactius Smart Cap amb química cromogènica de canvi de color per simplificar fluxos de microbiologia de l’aigua en camp i laboratori, mantenint el context de mostra preparat per a traçabilitat digital.',
        innovTitle: 'Smart Cap i flux visual sense UV',
        innovText: 'Els fluxos tradicionals sovint exigeixen manipulació manual de reactius i passos de lectura dependents d’UV. El concepte ENUMERA redueix aquests punts de fricció mitjançant dues innovacions pràctiques:',
        innov1stTitle: 'Flux Twist & Mix',
        innov1stText: 'El sistema de dosificació <strong>Twist & Mix</strong> s’integra al tap de l’ampolla de mostra, ajudant l’operador a alliberar el medi de cultiu sense reobrir l’ampolla després d’afegir la mostra.',
        innov2ndTitle: 'Lectura visual sense UV',
        innov2ndText: 'Els substrats cromogènics generen un canvi de color visible amb llum ambient, reduint la dependència de làmpades UV per a la interpretació visual rutinària.',
        kitsTitle: 'La gamma ENUMERA: un concepte, diversos paràmetres',
        kitsText: 'La família aplica el mateix enfocament Smart Cap i cromogènic en kits especialitzats per a fluxos quantitatius de microbiologia de l’aigua.',
        kit1Title: 'ENUMERA Coli100',
        kit1Text: 'Dissenyat per a fluxos d’indicadors bacterians on la interpretació visual clara i la traçabilitat connectada són importants per a laboratoris i equips de qualitat.',
        kit2Title: 'ENUMERA Entero100',
        kit2Text: 'Utilitza el mateix concepte Smart Cap i cromogènic per a fluxos orientats a enterococs, amb un format pràctic per a rutines repetibles en camp o laboratori.',
        kit3Title: 'ENUMERA Soma100',
        kit3Text: 'Dona suport a fluxos orientats a colífags somàtics quan l’equip necessita manipulació estructurada de mostra, lectura visual i context d’informe digital.',
        whyTitle: 'Per què triar la tecnologia ENUMERA?',
        why1Title: 'Manipulació rutinària més segura',
        why1Text: 'Reduir passos dependents d’UV ajuda els laboratoris a limitar punts d’exposició innecessaris durant la interpretació rutinària.',
        why2Title: 'Eficiència operativa',
        why2Text: 'La dosificació Smart Cap evita passos separats de manipulació de sobres i ajuda a reduir vessaments o contaminació creuada en afegir el reactiu.',
        why3Title: 'Interpretació visual clara',
        why3Text: 'El canvi de color cromogènic facilita una lectura visual directa i redueix l’ambigüitat respecte a senyals fluorescents febles.',
        why4Title: 'Menys residus de flux',
        why4Text: 'La dosificació integrada pot reduir embalatges secundaris i dependència de làmpades UV en fluxos recurrents d’anàlisi.',
        quoteCta: 'Sol·licitar pressupost ENUMERA'
    }
};

export const EnumeraModal: React.FC<EnumeraModalProps> = ({ onClose }) => {
    const { lang } = useLanguage();
    const copy = ENUMERA_MODAL_COPY[lang] || ENUMERA_MODAL_COPY.en;
    const quoteUrl = getPlatformSignupUrl({
        intent: 'quote',
        family: 'micro',
        product: 'enumera'
    }, lang);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 mb-10 mt-10">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-full overflow-hidden relative z-10 flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-100 bg-gray-50 shrink-0">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">
                            <Microscope size={14} />
                            <span className="text-xs font-bold tracking-wide uppercase">{copy.productRangeLabel}</span>
                        </div>
                        <EditableText as="h2" sectionId="enumera" field="title" fallback="ENUMERA" className="text-3xl font-heading font-extrabold text-primary block" />
                        <EditableText as="p" sectionId="enumera" field="subtitle" allowHtml fallback={copy.subtitle} className="text-gray-500 mt-2 font-medium block" />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-800"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 sm:p-8 overflow-y-auto">

                    {/* Intro Section */}
                    <div className="mb-10">
                        <div className="text-xl font-bold text-gray-800 mb-4 flex items-center text-primary">
                            <Zap className="mr-2 text-secondary" size={20} />
                            <EditableText as="span" sectionId="enumera" field="introTitle" fallback={copy.introTitle} />
                        </div>
                        <EditableText as="p" sectionId="enumera" field="introText" fallback={copy.introText} className="text-gray-600 leading-relaxed block" />
                    </div>

                    <hr className="border-gray-100 mb-10" />

                    {/* Core Innovation */}
                    <div className="mb-10">
                        <div className="text-xl font-bold text-gray-800 mb-6 flex items-center text-primary">
                            <ShieldCheck className="mr-2 text-secondary" size={20} />
                            <EditableText as="span" sectionId="enumera" field="innovTitle" fallback={copy.innovTitle} />
                        </div>
                        <EditableText as="p" sectionId="enumera" field="innovText" fallback={copy.innovText} className="text-gray-600 leading-relaxed mb-6 block" />
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <EditableText as="h4" sectionId="enumera" field="innov1stTitle" fallback={copy.innov1stTitle} className="font-bold text-primary mb-3 block" />
                                <EditableText as="p" sectionId="enumera" field="innov1stText" allowHtml fallback={copy.innov1stText} className="text-sm text-gray-600 leading-relaxed block" />
                            </div>
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <EditableText as="h4" sectionId="enumera" field="innov2ndTitle" fallback={copy.innov2ndTitle} className="font-bold text-primary mb-3 block" />
                                <EditableText as="p" sectionId="enumera" field="innov2ndText" fallback={copy.innov2ndText} className="text-sm text-gray-600 leading-relaxed block" />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 mb-10" />

                    {/* The Kits */}
                    <div className="mb-10">
                        <div className="text-xl font-bold text-gray-800 mb-6 flex items-center text-primary">
                            <CheckCircle2 className="mr-2 text-secondary" size={20} />
                            <EditableText as="span" sectionId="enumera" field="kitsTitle" fallback={copy.kitsTitle} />
                        </div>
                        <EditableText as="p" sectionId="enumera" field="kitsText" fallback={copy.kitsText} className="text-gray-600 leading-relaxed mb-6 block" />
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1.5 rounded-full mr-4 mt-1 shrink-0"><CheckCircle2 size={16} className="text-green-600" /></div>
                                <div>
                                    <EditableText as="h4" sectionId="enumera" field="kit1Title" fallback={copy.kit1Title} className="font-bold text-gray-800 block" />
                                    <EditableText as="p" sectionId="enumera" field="kit1Text" fallback={copy.kit1Text} className="text-gray-600 mt-1 text-sm leading-relaxed block" />
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1.5 rounded-full mr-4 mt-1 shrink-0"><CheckCircle2 size={16} className="text-green-600" /></div>
                                <div>
                                    <EditableText as="h4" sectionId="enumera" field="kit2Title" fallback={copy.kit2Title} className="font-bold text-gray-800 block" />
                                    <EditableText as="p" sectionId="enumera" field="kit2Text" fallback={copy.kit2Text} className="text-gray-600 mt-1 text-sm leading-relaxed block" />
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-100 p-1.5 rounded-full mr-4 mt-1 shrink-0"><CheckCircle2 size={16} className="text-green-600" /></div>
                                <div>
                                    <EditableText as="h4" sectionId="enumera" field="kit3Title" fallback={copy.kit3Title} className="font-bold text-gray-800 block" />
                                    <EditableText as="p" sectionId="enumera" field="kit3Text" fallback={copy.kit3Text} className="text-gray-600 mt-1 text-sm leading-relaxed block" />
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-primary text-white p-8 rounded-3xl shadow-inner mt-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10"><Leaf size={200} /></div>
                        <EditableText as="h3" sectionId="enumera" field="whyTitle" fallback={copy.whyTitle} className="text-2xl font-bold mb-6 relative z-10 block" />
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <EditableText as="h4" sectionId="enumera" field="why1Title" fallback={copy.why1Title} className="font-bold text-secondary text-lg mb-2 block" />
                                <EditableText as="p" sectionId="enumera" field="why1Text" fallback={copy.why1Text} className="text-gray-300 text-sm block" />
                            </div>
                            <div>
                                <EditableText as="h4" sectionId="enumera" field="why2Title" fallback={copy.why2Title} className="font-bold text-secondary text-lg mb-2 block" />
                                <EditableText as="p" sectionId="enumera" field="why2Text" fallback={copy.why2Text} className="text-gray-300 text-sm block" />
                            </div>
                            <div>
                                <EditableText as="h4" sectionId="enumera" field="why3Title" fallback={copy.why3Title} className="font-bold text-secondary text-lg mb-2 block" />
                                <EditableText as="p" sectionId="enumera" field="why3Text" fallback={copy.why3Text} className="text-gray-300 text-sm block" />
                            </div>
                            <div>
                                <EditableText as="h4" sectionId="enumera" field="why4Title" fallback={copy.why4Title} className="font-bold text-secondary text-lg mb-2 block" />
                                <EditableText as="p" sectionId="enumera" field="why4Text" fallback={copy.why4Text} className="text-gray-300 text-sm block" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <a
                            href={quoteUrl}
                            className="inline-flex items-center rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-secondary"
                        >
                            {copy.quoteCta} <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};
