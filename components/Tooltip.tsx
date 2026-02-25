import React from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, showIcon = false, className = '' }) => {
  return (
    <span className={`group relative inline-flex items-center ${className}`}>
      {children && (
        <span className={showIcon ? "" : "cursor-help border-b border-dotted border-gray-400 hover:border-secondary transition-colors"}>
          {children}
        </span>
      )}
      {showIcon && (
        <Info 
          size={14} 
          className={`text-gray-400 hover:text-secondary cursor-help transition-colors ${children ? 'ml-1.5' : ''}`} 
        />
      )}
      
      {/* Tooltip Body */}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 text-center pointer-events-none leading-relaxed font-normal normal-case tracking-normal">
        {content}
        {/* Arrow */}
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></span>
      </span>
    </span>
  );
};