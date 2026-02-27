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
import { supabase } from '../utils/supabase';

// Helper to map string family_ids to Lucide icons
const getFamilyIcon = (familyId: string) => {
  switch (familyId) {
    case 'equipment': return <Settings2 size={24} />;
    case 'micro': return <Microscope size={24} />;
    case 'media': return <FlaskConical size={24} />;
    case 'molecular': return <Dna size={24} />;
    case 'physchem': return <TestTube2 size={24} />;
    case 'services': return <GraduationCap size={24} />;
    default: return <Package size={24} />;
  }
};

export const ProductSection: React.FC = () => {
  const [productFamilies, setProductFamilies] = useState<ProductFamily[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  const [selectedFamily, setSelectedFamily] = useState<ProductFamily | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<{ product: ProductItem, familyTitle: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useLanguage();
  const { blocks } = usePageContent();
  const block = blocks['products'] || {};

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoadingDb(true);
      try {
        // Fetch visible families
        const { data: dbFamilies, error: famError } = await supabase
          .from('product_families')
          .select('*')
          .eq('is_hidden', false)
          .order('sort_order', { ascending: true });

        if (famError) throw famError;

        // Fetch visible products
        const { data: dbProducts, error: prodError } = await supabase
          .from('products')
          .select('*')
          .eq('is_hidden', false)
          .order('sort_order', { ascending: true });

        if (prodError) throw prodError;

        // Map DB schemas to the UI ProductFamily interface
        const formattedFamilies: ProductFamily[] = (dbFamilies || []).map(fam => {
          const familyProducts = (dbProducts || []).filter(p => p.family_id === fam.id);

          return {
            id: fam.family_id, // Map for backward compatibility with translations? We'll use the DB title though directly below
            title: fam.title,
            description: fam.description,
            icon: getFamilyIcon(fam.family_id),
            useCases: fam.use_cases || [],
            items: familyProducts.map(fp => ({
              name: fp.name,
              detail: fp.detail || undefined,
              // Use default icon for all products for now, or you could do a similar mapping
              icon: <Package size={16} />,
              image: fp.image || undefined,
              images: (fp.images && fp.images.length > 0) ? fp.images : undefined,
              description: fp.description || undefined,
              specificUseCases: (fp.specific_use_cases && fp.specific_use_cases.length > 0) ? fp.specific_use_cases : undefined,
              specs: (fp.specs && Object.keys(fp.specs).length > 0) ? fp.specs : undefined,
            }))
          };
        });

        setProductFamilies(formattedFamilies);
      } catch (err) {
        console.error("Error fetching catalog from Supabase:", err);
      } finally {
        setLoadingDb(false);
      }
    };

    fetchCatalog();
  }, []);


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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {loadingDb ? (
            <div className="col-span-full flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredFamilies.length > 0 ? (
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