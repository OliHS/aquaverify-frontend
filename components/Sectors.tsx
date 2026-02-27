import React, { useState, useEffect } from 'react';
import { Factory, Droplets, Building2, FlaskRound, ArrowRight, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableImage } from './admin/EditableImage';
import { EditableText } from './admin/EditableText';

// --- Data & Types ---
interface Sector {
  id: string;
  title: string;
  icon: React.ReactNode;
  image: string;
  shortDesc: string;
  fullDescription: string;
  useCases: string[];
  benefits: string[];
}

// --- Components ---

const SectorCard: React.FC<{ sector: Sector; onClick: (s: Sector) => void }> = ({ sector, onClick }) => (
  <div
    onClick={() => onClick(sector)}
    className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    role="button"
    tabIndex={0}
    aria-label={`View details for ${sector.title}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(sector);
      }
    }}
  >
    <div className="absolute inset-0 z-0">
      <EditableImage
        sectionId="sectors"
        field={`sector_${sector.id}_image`}
        fallbackSrc={sector.image}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-primary/70 group-hover:bg-primary/50 transition-colors duration-500"></div>
    </div>

    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
      <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-md border border-white/10 group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:scale-110 group-hover:text-white">
        {sector.icon}
      </div>

      <EditableText
        as="h3"
        sectionId="sectors"
        field={`sector_${sector.id}_title`}
        fallback={sector.title}
        className="font-heading font-bold text-2xl mb-1 drop-shadow-md tracking-tight group-hover:-translate-y-1 transition-transform duration-300 block"
      />

      {/* Prominent CTA Button */}
      <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
        <span className="bg-white text-primary hover:bg-secondary hover:text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center gap-2">
          View Use Cases <ArrowRight size={14} />
        </span>
      </div>
    </div>
  </div>
);

export const Sectors: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const { t } = useLanguage();
  const { blocks } = usePageContent();
  const block = blocks['sectors'] || {};

  const sectors: Sector[] = [
    {
      id: 'municipal',
      title: t.sectors.list.municipal.title,
      icon: <Droplets size={32} />,
      image: 'https://picsum.photos/400/600?random=20',
      shortDesc: t.sectors.list.municipal.desc,
      fullDescription: t.sectors.list.municipal.full,
      useCases: ['Distribution network monitoring', 'Pipe repair commissioning', 'Emergency response tracing', 'Regulatory compliance (EPA)'],
      benefits: ['Real-time contamination alerts', 'Reduced public health risk', 'Data-driven infrastructure planning']
    },
    {
      id: 'fnb',
      title: t.sectors.list.fnb.title,
      icon: <Factory size={32} />,
      image: 'https://picsum.photos/400/600?random=21',
      shortDesc: t.sectors.list.fnb.desc,
      fullDescription: t.sectors.list.fnb.full,
      useCases: ['Source water verification', 'CIP (Clean-in-Place) validation', 'Finished product lot release', 'HACCP critical control points'],
      benefits: ['Zero production downtime', 'Audit-ready compliance logs', 'Brand equity protection']
    },
    {
      id: 'labs',
      title: t.sectors.list.labs.title,
      icon: <FlaskRound size={32} />,
      image: 'https://picsum.photos/400/600?random=22',
      shortDesc: t.sectors.list.labs.desc,
      fullDescription: t.sectors.list.labs.full,
      useCases: ['Field sampling expansion', 'Remote client monitoring', 'Overflow testing management', 'Digital certificate generation'],
      benefits: ['Paperless workflow', 'Instant client reporting', 'Higher daily sample throughput']
    },
    {
      id: 'realestate',
      title: t.sectors.list.realestate.title,
      icon: <Building2 size={32} />,
      image: 'https://picsum.photos/400/600?random=23',
      shortDesc: t.sectors.list.realestate.desc,
      fullDescription: t.sectors.list.realestate.full,
      useCases: ['Cooling tower screening', 'Swimming pool & spa safety', 'Tenant water quality assurance', 'ASHRAE 188 compliance'],
      benefits: ['Liability reduction', 'Tenant confidence', 'Proactive maintenance scheduling']
    }
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedSector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSector]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSector(null);
      }
    };

    if (selectedSector) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSector]);

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <EditableText
            as="span"
            sectionId="sectors"
            field="badge"
            fallback={t.sectors.badge}
            className="text-secondary font-bold tracking-wider uppercase text-sm block"
          />
          <EditableText
            as="h2"
            sectionId="sectors"
            field="title"
            fallback={t.sectors.title}
            className="font-heading font-bold text-3xl md:text-4xl text-primary mt-2"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              onClick={setSelectedSector}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSector && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSector(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSector(null)}
                className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200 p-2 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Image Column */}
              <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                <EditableImage
                  sectionId="sectors"
                  field={`sector_${selectedSector.id}_image`}
                  fallbackSrc={selectedSector.image}
                  alt={selectedSector.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent md:hidden"></div>

                {/* Mobile Title Overlay */}
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <div className="flex items-center space-x-2 mb-1">
                    {selectedSector.icon}
                    <h3 className="font-heading font-bold text-xl">{selectedSector.title}</h3>
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto bg-white">
                <div className="hidden md:flex items-center space-x-3 mb-6">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
                    {selectedSector.icon}
                  </div>
                  <EditableText
                    as="h3"
                    id="modal-title"
                    sectionId="sectors"
                    field={`sector_${selectedSector.id}_title`}
                    fallback={selectedSector.title}
                    className="font-heading font-bold text-3xl text-primary block"
                  />
                </div>

                <div className="prose prose-blue mb-8">
                  <EditableText
                    as="p"
                    sectionId="sectors"
                    field={`sector_${selectedSector.id}_full_desc`}
                    fallback={selectedSector.fullDescription}
                    className="text-gray-600 leading-relaxed text-lg block"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Key Applications */}
                  <div className="bg-surface rounded-xl p-5 border border-gray-100">
                    <h4 className="font-bold text-primary mb-3 text-xs uppercase tracking-wide flex items-center">
                      <span className="w-1 h-4 bg-secondary mr-2 rounded-full"></span>
                      {t.sectors.applications}
                    </h4>
                    <ul className="space-y-2">
                      {selectedSector.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle2 className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <EditableText as="span" sectionId="sectors" field={`sector_${selectedSector.id}_useCase_${idx}`} fallback={useCase} className="text-gray-700 block" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                    <h4 className="font-bold text-primary mb-3 text-xs uppercase tracking-wide flex items-center">
                      <ShieldCheck className="w-4 h-4 text-primary mr-2" />
                      {t.sectors.advantage}
                    </h4>
                    <ul className="space-y-2">
                      {selectedSector.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1.5 flex-shrink-0"></div>
                          <EditableText as="span" sectionId="sectors" field={`sector_${selectedSector.id}_benefit_${idx}`} fallback={benefit} className="text-gray-700 block" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end items-center gap-4">
                  <button
                    onClick={() => setSelectedSector(null)}
                    className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors px-4 py-2"
                  >
                    {t.sectors.close}
                  </button>
                  <button className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:bg-secondary transition-all transform hover:-translate-y-0.5 text-sm font-bold flex items-center justify-center">
                    {t.sectors.request}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};