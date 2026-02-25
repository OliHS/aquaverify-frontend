import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductFamily } from '../types';

interface ProductFamilyCardProps {
  family: ProductFamily;
  onClick: (family: ProductFamily) => void;
}

export const ProductFamilyCard: React.FC<ProductFamilyCardProps> = ({ family, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-8 cursor-pointer transition-all duration-300 group relative overflow-hidden"
      onClick={() => onClick(family)}
    >
      {/* Decor */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 group-hover:bg-blue-100/50"></div>

      <div className="relative z-10">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors duration-300">
          {family.icon}
        </div>
        
        <h3 className="font-heading font-bold text-xl text-gray-800 mb-3 group-hover:text-primary transition-colors">
          {family.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {family.description}
        </p>

        <div className="flex items-center text-secondary font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Explore Family <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </motion.div>
  );
};