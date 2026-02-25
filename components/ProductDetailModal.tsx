import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, FileText, Zap, ChevronRight, ChevronLeft, Box, Maximize2 } from 'lucide-react';
import { ProductItem } from '../types';
import { Lightbox } from './Lightbox';

interface ProductDetailModalProps {
  product: ProductItem;
  familyTitle: string;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, familyTitle, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Normalize images
  const images = (product.images && product.images.length > 0) 
    ? product.images 
    : (product.image ? [product.image] : ["https://picsum.photos/600/400?grayscale"]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-20 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-10">
            <div>
              <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1 block">{familyTitle}</span>
              <h2 className="font-heading font-bold text-2xl text-primary flex items-center gap-3">
                {product.icon || <Box size={24} />}
                {product.name}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Image Gallery Column */}
              <div>
                  {/* Main Image */}
                  <div 
                    className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm border border-gray-200 relative group cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <AnimatePresence mode='wait'>
                        <motion.img 
                          key={activeImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          src={images[activeImageIndex]} 
                          alt={`${product.name} view ${activeImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    
                    {/* Hover Overlay with Maximize Icon */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                        <div className="opacity-0 group-hover:opacity-100 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-opacity">
                            <Maximize2 size={24} />
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                      <span className="bg-secondary/90 px-2 py-1 rounded text-xs font-bold shadow-sm">Official Product</span>
                    </div>
                  </div>

                  {/* Thumbnails (Carousel) */}
                  {images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {images.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className={`relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                    activeImageIndex === idx ? 'border-secondary ring-2 ring-secondary/30' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                  <img src={img} alt="" className="w-full h-full object-cover" />
                              </button>
                          ))}
                      </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <FileText size={18} className="mr-2 text-primary" />
                      Description
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {product.description || product.detail || "High-performance solution designed for optimal precision in laboratory environments. Fully compliant with international safety standards."}
                    </p>
                  </div>
              </div>

              {/* Specs & Use Cases */}
              <div>
                  {product.specs && (
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Zap size={18} className="mr-2 text-primary" />
                        Technical Specifications
                      </h4>
                      <div className="bg-surface rounded-lg p-4 border border-gray-100">
                        <table className="w-full text-sm">
                          <tbody>
                            {Object.entries(product.specs).map(([key, value], idx) => (
                              <tr key={key} className={idx !== Object.entries(product.specs!).length - 1 ? "border-b border-gray-200" : ""}>
                                <td className="py-2 text-gray-500 font-medium">{key}</td>
                                <td className="py-2 text-gray-900 font-semibold text-right">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Applications</h4>
                    <ul className="space-y-3">
                        {(product.specificUseCases || ["General Laboratory Analysis", "Quality Control", "Research & Development"]).map((useCase, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <CheckCircle2 size={16} className="text-secondary mr-2 mt-0.5 flex-shrink-0" />
                            {useCase}
                          </li>
                        ))}
                    </ul>
                  </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-primary">Ready to order?</h4>
                <p className="text-sm text-blue-800">Get a custom quote including volume discounts.</p>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center">
                Request Quote <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox 
            images={images} 
            initialIndex={activeImageIndex}
            onClose={() => setIsLightboxOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};