import React from 'react';

export interface ProductItem {
  name: string;
  detail?: string;
  icon?: React.ReactNode;
  // New fields for enhanced product view
  image?: string;
  images?: string[]; // Array of image URLs for galleries
  description?: string;
  specificUseCases?: string[];
  specs?: Record<string, string>;
}

export interface ProductFamily {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: ProductItem[];
  useCases: string[];
}