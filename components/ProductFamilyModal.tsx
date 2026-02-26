import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2, BookOpen, CheckCircle2, Box, Info, ArrowRight, Maximize2, Search, ArrowLeftRight, CheckSquare, Square, Trash2, ArrowLeft, AlertCircle, MousePointerClick } from 'lucide-react';
import { ProductFamily, ProductItem } from '../types';
import { Lightbox } from './Lightbox';
import { useLanguage } from '../context/LanguageContext';
import { EditableImage } from './admin/EditableImage';
import { usePageContent } from '../context/PageContentContext';

interface ProductFamilyModalProps {
  family: ProductFamily;
  onClose: () => void;
  onOpenProductDetail: (product: ProductItem) => void;
}

export const ProductFamilyModal: React.FC<ProductFamilyModalProps> = ({ family, onClose, onOpenProductDetail }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const { isEditing, blocks } = usePageContent();
  const productBlocks = blocks['products'] || {};

  // Comparison State
  const [compareList, setCompareList] = useState<ProductItem[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  // Filter products based on search query
  const filteredProducts = family.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.detail && item.detail.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper to get image array, prioritizing CMS uploads over hardcoded fallbacks
  const getCmsImages = (item: ProductItem | null) => {
    if (!item) return [];

    const cmsField = `family_${family.id}_item_${item.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_image`;
    const cmsOverrideUrl = productBlocks[cmsField];

    if (item.images && item.images.length > 0) {
      return [cmsOverrideUrl || item.images[0], ...item.images.slice(1)];
    }
    return [cmsOverrideUrl || item.image || "https://picsum.photos/400/300?grayscale"];
  };

  const productImages = getCmsImages(selectedProduct);

  // Comparison Logic
  const toggleCompare = (e: React.MouseEvent, item: ProductItem) => {
    e.stopPropagation();
    const isSelected = compareList.some(i => i.name === item.name);

    if (isSelected) {
      setCompareList(prev => prev.filter(i => i.name !== item.name));
    } else {
      if (compareList.length >= 3) return;
      setCompareList(prev => [...prev, item]);
    }
  };

  const startComparison = () => {
    if (compareList.length > 0) setIsComparing(true);
  };

  const exitComparison = () => setIsComparing(false);

  const getAllSpecKeys = () => {
    const keys = new Set<string>();
    compareList.forEach(p => {
      if (p.specs) Object.keys(p.specs).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  };

  return (
    <>
      <style>{`
        .custom-scrollbar {
          scrollbar-width: auto;
          scrollbar-color: #94a3b8 #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 14px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-left: 1px solid #e2e8f0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
          border-radius: 10px;
          border: 3px solid #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #64748b;
        }
      `}</style>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-primary text-white p-6 md:p-8 flex justify-between items-start flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm hidden sm:block">
                {family.icon}
              </div>
              <div>
                <span className="text-blue-200 text-sm font-bold uppercase tracking-wider">{t.products.modal.familyLabel}</span>
                <h3 className="font-heading font-bold text-xl md:text-3xl mt-1">{family.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Body Content - Single Scroll Area */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
            <AnimatePresence mode="wait">
              {isComparing ? (
                /* === COMPARISON VIEW === */
                <motion.div
                  key="compare-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-xl flex items-center">
                      <ArrowLeftRight className="mr-3 text-secondary" />
                      {t.products.modal.compareTitle.replace('{n}', compareList.length.toString())}
                    </h4>
                    <button
                      onClick={exitComparison}
                      className="text-gray-500 hover:text-primary font-medium flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowLeft size={16} /> {t.products.modal.back}
                    </button>
                  </div>

                  <div className="overflow-x-auto pb-24">
                    <table className="w-full min-w-[800px] border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
                      <thead>
                        <tr>
                          <th className="p-4 bg-gray-100/50 border-b border-gray-200 text-left w-1/4">{t.products.modal.feature}</th>
                          {compareList.map((product, idx) => (
                            <th key={idx} className="p-4 bg-gray-100/50 border-b border-gray-200 text-left w-1/4 align-top">
                              <div className="flex flex-col gap-3">
                                <div className="h-32 bg-white rounded-lg border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
                                  <EditableImage
                                    sectionId="products"
                                    field={`family_${family.id}_item_${product.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_image`}
                                    fallbackSrc={product.image || "https://picsum.photos/200/200?grayscale"}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div>
                                  <h5 className="font-bold text-primary">{product.name}</h5>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50/30">{t.products.modal.description}</td>
                          {compareList.map((product, idx) => (
                            <td key={idx} className="p-4 text-sm text-gray-600 leading-relaxed align-top">
                              {product.description || product.detail}
                            </td>
                          ))}
                        </tr>
                        {getAllSpecKeys().map((key) => (
                          <tr key={key} className="border-b border-gray-100 hover:bg-blue-50/20 transition-colors">
                            <td className="p-4 font-medium text-gray-600 bg-gray-50/30">{key}</td>
                            {compareList.map((product, idx) => (
                              <td key={idx} className="p-4 text-sm font-semibold text-gray-800 align-top">
                                {product.specs?.[key] || <span className="text-gray-400 text-xs italic flex items-center gap-1"><AlertCircle size={10} /> {t.products.modal.na}</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr>
                          <td className="p-4 font-bold text-gray-700 bg-gray-50/30 align-top">{t.products.modal.applications}</td>
                          {compareList.map((product, idx) => (
                            <td key={idx} className="p-4 align-top">
                              <ul className="space-y-2">
                                {(product.specificUseCases || []).map((uc, i) => (
                                  <li key={i} className="text-xs text-gray-600 flex items-start">
                                    <CheckCircle2 size={12} className="text-secondary mr-2 mt-0.5 flex-shrink-0" />
                                    {uc}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-gray-100 p-4 -mx-6 -mb-6 md:-mx-8 md:-mb-8 flex justify-end z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                    <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center">
                      {t.products.modal.combinedQuote} <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* === STANDARD SPLIT VIEW === */
                <motion.div
                  key="split-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col md:flex-row gap-8"
                >

                  {/* LEFT COLUMN - Product List */}
                  <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0">
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed border-l-4 border-secondary pl-4">
                      {family.description}
                    </p>

                    <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                      <span className="flex items-center">
                        <Settings2 size={18} className="text-primary mr-2" />
                        {t.products.modal.catalog}
                      </span>
                      {compareList.length > 0 && (
                        <span className="text-xs font-normal text-secondary bg-blue-50 px-2 py-1 rounded-full">
                          {t.products.modal.compareCount.replace('{n}', compareList.length.toString())}
                        </span>
                      )}
                    </h4>

                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder={t.products.modal.search}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-all"
                      />
                    </div>

                    <div className="grid gap-3">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((item, idx) => {
                          const isSelected = selectedProduct?.name === item.name;
                          const isInCompare = compareList.some(c => c.name === item.name);

                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedProduct(item)}
                              className={`group relative p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-4 ${isSelected
                                ? 'bg-blue-50 border-secondary ring-1 ring-secondary'
                                : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                              <div className={`p-2 rounded-md shadow-sm flex-shrink-0 ${isSelected ? 'bg-white text-secondary' : 'bg-gray-50 text-primary'}`}>
                                {item.icon || <Box size={16} />}
                              </div>
                              <div className="flex-grow">
                                <h5 className={`font-bold text-sm ${isSelected ? 'text-secondary' : 'text-gray-800'}`}>{item.name}</h5>
                                {item.detail && <p className="text-xs text-gray-500 mt-1">{item.detail}</p>}
                              </div>

                              <button
                                onClick={(e) => toggleCompare(e, item)}
                                className={`p-1 rounded transition-colors z-20 ${isInCompare ? 'text-secondary hover:text-red-500' : 'text-gray-300 hover:text-secondary opacity-0 group-hover:opacity-100'
                                  }`}
                                title={isInCompare ? "Remove from comparison" : "Add to comparison"}
                              >
                                {isInCompare ? <CheckSquare size={18} /> : <Square size={18} />}
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 text-center py-4 text-sm">{t.products.modal.noResults}</p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Details */}
                  <div className="w-full md:w-7/12 lg:w-8/12">
                    <div className="bg-surface rounded-2xl p-6 md:p-8 min-h-[500px] border border-gray-100 h-full flex flex-col">
                      {selectedProduct ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={selectedProduct.name}
                          className="flex flex-col h-full"
                        >
                          <div
                            className={`aspect-video w-full bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden relative group ${!isEditing ? 'cursor-pointer' : ''}`}
                            onClick={() => !isEditing && setIsLightboxOpen(true)}
                          >
                            <EditableImage
                              sectionId="products"
                              field={`family_${family.id}_item_${selectedProduct.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_image`}
                              fallbackSrc={productImages[0] || "https://picsum.photos/400/300?grayscale"}
                              alt={selectedProduct.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {!isEditing && (
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                                <div className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-bold text-xs flex items-center shadow-lg">
                                  <Maximize2 size={14} className="mr-2" /> {t.products.modal.viewImage}
                                </div>
                              </div>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">{selectedProduct.name}</h3>
                          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            {selectedProduct.description || t.products.modal.fallbackDesc}
                          </p>

                          <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center">
                            <BookOpen size={16} className="text-primary mr-2" />
                            {t.products.modal.applications}
                          </h4>
                          <ul className="space-y-2 mb-8 flex-grow">
                            {(selectedProduct.specificUseCases || ["General Laboratory Use", "Quality Control", "Research"]).map((useCase, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <CheckCircle2 className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{useCase}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex gap-3 mt-auto">
                            <button
                              onClick={() => onOpenProductDetail(selectedProduct)}
                              className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-bold shadow-sm hover:bg-gray-50 hover:text-primary hover:border-primary transition-all text-sm flex items-center justify-center gap-2"
                            >
                              <Info size={16} /> {t.products.modal.moreDetails}
                            </button>
                            <button className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-bold shadow hover:bg-opacity-90 transition-all text-sm flex items-center justify-center gap-2">
                              {t.products.modal.quote} <ArrowRight size={16} />
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        // Enhanced "No Product Selected" State
                        <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-white/50 rounded-xl">
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md border border-gray-100 text-primary">
                            {React.cloneElement(family.icon as React.ReactElement<any>, { size: 40 })}
                          </div>

                          <h3 className="font-heading font-bold text-3xl text-gray-900 mb-4">{family.title}</h3>

                          <p className="text-gray-600 mb-12 max-w-md mx-auto leading-relaxed text-base">
                            {family.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
                            {/* Instruction 1: Select Product */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left hover:border-primary/30 transition-all hover:shadow-md group">
                              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <MousePointerClick size={24} />
                              </div>
                              <h5 className="font-bold text-gray-900 mb-2 text-lg">{t.products.modal.emptyViewDetails}</h5>
                              <p className="text-sm text-gray-500 leading-relaxed">
                                {t.products.modal.emptyViewDetailsDesc}
                              </p>
                            </div>

                            {/* Instruction 2: Compare */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-left hover:border-secondary/30 transition-all hover:shadow-md group">
                              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                                <ArrowLeftRight size={24} />
                              </div>
                              <h5 className="font-bold text-gray-900 mb-2 text-lg">{t.products.modal.emptyCompare}</h5>
                              <p className="text-sm text-gray-500 leading-relaxed">
                                {t.products.modal.emptyCompareDesc}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Comparison Bar */}
          <AnimatePresence>
            {!isComparing && compareList.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white pl-6 pr-2 py-2 rounded-full shadow-2xl flex items-center gap-6 border border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{t.products.modal.selectedCount.replace('{n}', compareList.length.toString())}</span>
                  <button
                    onClick={() => setCompareList([])}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Trash2 size={14} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                <button
                  onClick={startComparison}
                  disabled={compareList.length < 2}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${compareList.length < 2
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-secondary text-white hover:bg-secondary/90 shadow-lg'
                    }`}
                >
                  {t.products.modal.compareBtn} <ArrowRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && selectedProduct && (
          <Lightbox
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            images={productImages}
            initialIndex={0}
          />
        )}
      </AnimatePresence>
    </>
  );
};