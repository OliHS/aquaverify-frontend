import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose }) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={onClose}>
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-[160]"
      >
        <X size={32} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)); }}
            className="absolute left-6 text-white/70 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-md z-[160]"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)); }}
            className="absolute right-6 text-white/70 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-md z-[160]"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
         <AnimatePresence mode='wait'>
            <motion.img
              key={index}
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full object-contain rounded shadow-2xl select-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) {
                    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                } else if (swipe > 50) {
                    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                }
              }}
            />
         </AnimatePresence>
         
         {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[160]">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                ))}
            </div>
         )}
      </div>
    </div>
  );
};