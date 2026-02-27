import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, ShieldCheck, Zap, Microscope, FlaskConical, Dna, TestTube2, Settings2, GraduationCap,
  Filter, RotateCw, LayoutGrid, Bug, Droplets, Fish, Sprout, Package, Beaker, Snowflake, MapPin, Gauge,
  Atom, Headphones, FileCheck, Wrench, Activity, ArrowRight, Search, X
} from 'lucide-react';
import { Tooltip } from './Tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductFamily, ProductItem } from '../types';
import { ProductFamilyCard } from './ProductFamilyCard';
import { ProductFamilyModal } from './ProductFamilyModal';
import { ProductDetailModal } from './ProductDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableImage } from './admin/EditableImage';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';

export const ProductSection: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<ProductFamily | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<{ product: ProductItem, familyTitle: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const { blocks } = usePageContent();
  const block = blocks['products'] || {};

  // Dynamic Product Data Generator
  const productFamilies: ProductFamily[] = [
    {
      id: 'equipment',
      title: t.products.families.equipment.title,
      icon: <Settings2 size={24} />,
      description: t.products.families.equipment.desc,
      items: [
        {
          name: "Magnetic Filtration Ramps",
          detail: "Disposable, low-cost rails, magnetically adjusted",
          icon: <Filter size={16} />,
          image: "https://picsum.photos/600/400?random=101",
          images: [
            "https://picsum.photos/800/600?random=101",
            "https://picsum.photos/800/600?random=1011",
            "https://picsum.photos/800/600?random=1012"
          ],
          description: "A revolutionary filtration manifold using magnetic couplings for single-handed funnel attachment. Eliminates O-ring wear and guarantees leak-proof seals.",
          specificUseCases: ["High-throughput water filtration", "Field laboratories", "Simultaneous multi-sample processing"],
          specs: { "Material": "Stainless Steel 316L", "Funnel Capacity": "300ml / 500ml", "Positions": "3 or 6 place manifold" }
        },
        {
          name: "Automatic Filter Dispensers",
          detail: "Hands-free sterile dispensing",
          icon: <Settings2 size={16} />,
          image: "https://picsum.photos/600/400?random=102",
          images: [
            "https://picsum.photos/800/600?random=102",
            "https://picsum.photos/800/600?random=1021"
          ],
          description: "Touchless membrane dispenser that uses optical sensors to present a sterile filter membrane automatically when forceps approach.",
          specificUseCases: ["Sterile technique maintenance", "Reducing cross-contamination", "Speeding up plating workflow"],
          specs: { "Speed": "<1 second dispense", "Power": "Rechargeable Li-ion", "Compatibility": "Continuous rolled membranes" }
        },
        { name: "Digital Turbidimeters", detail: "Easy-to-use, high precision", icon: <Activity size={16} /> },
        { name: "Conductivity Probes", detail: "Robust sensing for field use", icon: <Zap size={16} /> },
        { name: "Tube Threaders", detail: "Automated cap handling", icon: <RotateCw size={16} /> },
        { name: "MPN Trays", detail: "Modular Most Probable Number setups", icon: <LayoutGrid size={16} /> }
      ],
      useCases: [
        "Standardizing filtration workflows across multiple lab sites",
        "Reducing repetitive strain injuries for high-volume technicians",
        "Automating data entry via IoT-connected instruments"
      ]
    },
    {
      id: 'micro',
      title: t.products.families.micro.title,
      icon: <Microscope size={24} />,
      description: t.products.families.micro.desc,
      items: [
        {
          name: "E. coli & Enterococci",
          detail: "Rapid enumeration kits",
          icon: <Bug size={16} />,
          image: "https://picsum.photos/600/400?random=103",
          description: "Chromogenic media kits designed for the simultaneous detection and enumeration of E. coli and coliform bacteria in water samples.",
          specificUseCases: ["Drinking water compliance", "Well water testing", "Network maintenance verification"],
          specs: { "Incubation": "24 hours @ 37°C", "Limit of Detection": "1 CFU/100mL", "Shelf Life": "18 months" }
        },
        {
          name: "Pseudomonas Control",
          detail: "For recreational waters",
          icon: <Droplets size={16} />,
          image: "https://picsum.photos/600/400?random=104",
          description: "Specific detection of P. aeruginosa using membrane filtration or MPN formats. Critical for hospital water systems and spas.",
          specificUseCases: ["Hospital water safety plans", "Swimming pools & spas", "Bottled water Q.C."],
          specs: { "Method": "Membrane Filtration", "Volume": "100mL / 250mL", "Standard": "ISO 16266" }
        },
        { name: "Marine Vibrio Control", detail: "Specialized for fish farms", icon: <Fish size={16} /> },
        { name: "Somatic Coliphages", detail: "1-5 mL and 100 mL variants", icon: <Dna size={16} /> },
        { name: "Legionella", detail: "Culture vs. molecular options", icon: <Activity size={16} /> },
        { name: "Cryptosporidium & Giardia", detail: "Complete assay reagents", icon: <ShieldCheck size={16} /> },
        { name: "Fungi, Yeasts & Staphylococci", detail: "Broad spectrum detection", icon: <Microscope size={16} /> },
        { name: "Algal Control", detail: "Early bloom detection", icon: <Sprout size={16} /> }
      ],
      useCases: [
        "Rapid detection of fecal contamination in drinking water",
        "Regulatory compliance testing (ISO/EPA standards)",
        "Recreational water safety monitoring (beaches & pools)"
      ]
    },
    {
      id: 'media',
      title: t.products.families.media.title,
      icon: <FlaskConical size={24} />,
      description: t.products.families.media.desc,
      items: [
        { name: "Dehydrated Media", detail: "MSA, MSB, R2A formulations", icon: <Package size={16} /> },
        { name: "RTU Culture Media", detail: "Pre-mixed, sterile solutions", icon: <FlaskConical size={16} /> },
        { name: "Thiosulfate Bottles", detail: "Chlorine neutralization for collection", icon: <Beaker size={16} /> },
        { name: "Strain Maintenance", detail: "Preservation & freezing media", icon: <Snowflake size={16} /> },
        { name: "MEVAG Medium", detail: "For glycoside pathway study", icon: <TestTube2 size={16} /> },
        { name: "MUG Test", detail: "Rapid enzymatic detection", icon: <Zap size={16} /> }
      ],
      useCases: [
        "Streamlining media preparation in busy labs",
        "Ensuring sample integrity during transport with thiosulfate",
        "Long-term strain banking for research and validation"
      ]
    },
    {
      id: 'molecular',
      title: t.products.families.molecular.title,
      icon: <Dna size={24} />,
      description: t.products.families.molecular.desc,
      items: [
        { name: "MST Tracking", detail: "qPCR kits for Human, Swine, Bovine, Avian", icon: <MapPin size={16} /> },
        { name: "ARG Determination", detail: "Antibiotic Resistant Gene detection", icon: <ShieldCheck size={16} /> },
        { name: "Molecular Legionella", detail: "Rapid DNA-based quantification", icon: <Dna size={16} /> }
      ],
      useCases: [
        "Identifying the specific source of pollution (Microbial Source Tracking)",
        "Monitoring antimicrobial resistance in wastewater",
        "Rapid outbreak investigation where culture methods are too slow"
      ]
    },
    {
      id: 'physchem',
      title: t.products.families.physchem.title,
      icon: <TestTube2 size={24} />,
      description: t.products.families.physchem.desc,
      items: [
        { name: "Chemical Detection Kits", detail: "Anxiolytes, narcotics, trace residues", icon: <FlaskConical size={16} /> },
        { name: "Physicochemical Sensors", detail: "pH, Dissolved Oxygen, Nitrates", icon: <Gauge size={16} /> },
        { name: "Heavy Metals", detail: "Rapid field tests", icon: <Atom size={16} /> },
        { name: "Certified Standards", detail: "Reference materials for calibration", icon: <CheckCircle2 size={16} /> }
      ],
      useCases: [
        "Comprehensive environmental impact assessments",
        "Real-time monitoring of industrial effluent",
        "Detecting emerging contaminants like pharmaceuticals"
      ]
    },
    {
      id: 'services',
      title: t.products.families.services.title,
      icon: <GraduationCap size={24} />,
      description: t.products.families.services.desc,
      items: [
        { name: "AquaVerify Academy™", detail: "Certified user training programs", icon: <GraduationCap size={16} /> },
        { name: "Technical Support", detail: "Personalized client troubleshooting", icon: <Headphones size={16} /> },
        { name: "Method Validation", detail: "Consulting for ISO/EPA accreditation", icon: <FileCheck size={16} /> },
        { name: "After-sales Support", detail: "Maintenance and calibration services", icon: <Wrench size={16} /> }
      ],
      useCases: [
        "Onboarding new lab staff with certified training",
        "Assistance with ISO 17025 accreditation processes",
        "Optimizing lab workflows for efficiency and compliance"
      ]
    }
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedFamily || selectedProductDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFamily, selectedProductDetail]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFamily(null);
        setSelectedProductDetail(null);
      }
    };
    if (selectedFamily || selectedProductDetail) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFamily, selectedProductDetail]);

  const handleOpenProductDetail = (product: ProductItem, family: ProductFamily) => {
    setSelectedFamily(null); // Close family modal
    setTimeout(() => {
      setSelectedProductDetail({ product, familyTitle: family.title });
    }, 100); // Small delay for smoother transition
  };

  const filteredFamilies = productFamilies.filter(family => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;

    // Check if family title or description matches
    if (family.title.toLowerCase().includes(query) || family.description.toLowerCase().includes(query)) {
      return true;
    }

    // Check if any product within the family matches
    return family.items.some(item =>
      item.name.toLowerCase().includes(query) ||
      (item.detail && item.detail.toLowerCase().includes(query))
    );
  });

  return (
    <section id="products" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <EditableText
            as="span"
            sectionId="products"
            field="badge"
            fallback={t.products.badge}
            className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
          />
          <EditableText
            as="h2"
            sectionId="products"
            field="title"
            fallback={t.products.title}
            className="font-heading font-bold text-4xl lg:text-5xl text-primary mb-6 block"
          />
          <EditableText
            as="p"
            sectionId="products"
            field="subtitle"
            fallback={t.products.subtitle}
            className="text-gray-600 text-lg leading-relaxed block"
          />
        </div>

        {/* Flagship Hero Product - Card Style */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12 mb-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <EditableImage
                  sectionId="products"
                  field="flagshipImage"
                  fallbackSrc="https://picsum.photos/800/800?random=2"
                  alt="AquaVerify Smart Cap technology"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 block"
                />
                <div className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur px-5 py-2 rounded-full shadow-lg border border-white/20">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Zap size={14} className="text-secondary" /> Flagship Innovation
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <EditableText
                as="h3"
                sectionId="products"
                field="flagshipTitle"
                fallback={t.products.flagship}
                className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6 block"
              />

              <EditableText
                as="p"
                sectionId="products"
                field="flagshipDesc"
                fallback={t.products.flagshipDesc}
                className="text-gray-600 text-lg mb-8 leading-relaxed block"
              />

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-lg mr-4 text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <EditableText as="h4" sectionId="products" field="flagshipFeature1Title" fallback={t.products.zeroContam} className="font-bold text-gray-800 text-sm block" />
                    <EditableText as="p" sectionId="products" field="flagshipFeature1Desc" fallback="Sealed delivery system." className="text-xs text-gray-500 mt-1 block" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-50 p-2 rounded-lg mr-4 text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <EditableText as="h4" sectionId="products" field="flagshipFeature2Title" fallback={t.products.noUV} className="font-bold text-gray-800 text-sm block" />
                    <EditableText as="p" sectionId="products" field="flagshipFeature2Desc" fallback="Visual color metrics." className="text-xs text-gray-500 mt-1 block" />
                  </div>
                </div>
              </div>

              <EditableLinkWrapper sectionId="products" field="flagshipDownloadLink" fallback="#contact">
                <a href="#contact" className="inline-flex bg-primary text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all font-bold items-center gap-3 w-fit">
                  <EditableText sectionId="products" field="flagshipDownloadBtn" fallback={t.products.download} /> <ArrowRight size={18} />
                </a>
              </EditableLinkWrapper>
            </div>
          </div>
        </div>

        {/* Portfolio Catalog Divider/Header */}
        <div id="catalog" className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-heading font-bold text-2xl text-gray-800">{t.nav.catalog}</h3>
            <p className="text-gray-500 text-sm mt-1">Explore our 6 distinct product families</p>
          </div>
          <div className="h-1 flex-grow mx-8 bg-gray-100 rounded-full hidden md:block"></div>
          <button className="text-primary font-semibold text-sm hover:text-secondary transition-colors whitespace-nowrap hidden md:block">
            {t.nav.viewPdf}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-11 py-4 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-base shadow-sm transition-all"
            placeholder={t.nav.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFamilies.length > 0 ? (
            filteredFamilies.map((family) => (
              <ProductFamilyCard
                key={family.id}
                family={family}
                onClick={setSelectedFamily}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16 bg-white/50 rounded-2xl border border-dashed border-gray-300"
            >
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No product families found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-primary font-bold hover:underline"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Family Detail Modal */}
      <AnimatePresence>
        {selectedFamily && (
          <ProductFamilyModal
            family={selectedFamily}
            onClose={() => setSelectedFamily(null)}
            onOpenProductDetail={(product) => handleOpenProductDetail(product, selectedFamily)}
          />
        )}
      </AnimatePresence>

      {/* Full Product Detail Modal */}
      <AnimatePresence>
        {selectedProductDetail && (
          <ProductDetailModal
            product={selectedProductDetail.product}
            familyTitle={selectedProductDetail.familyTitle}
            onClose={() => setSelectedProductDetail(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};