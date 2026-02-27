import React, { useState } from 'react';
import { Smartphone, PieChart, FileText, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableImage } from './admin/EditableImage';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';

type Tab = 'mobile' | 'lims' | 'compliance';

export const SaaSPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('lims');
  const { t } = useLanguage();
  const { blocks } = usePageContent();
  const block = blocks['saas'] || {};

  const tabs = [
    { id: 'mobile', label: t.saas.tabs.mobile, icon: <Smartphone size={18} /> },
    { id: 'lims', label: t.saas.tabs.lims, icon: <PieChart size={18} /> },
    { id: 'compliance', label: t.saas.tabs.compliance, icon: <FileText size={18} /> },
  ];

  const content = {
    mobile: {
      title: t.saas.mobile.title,
      desc: t.saas.mobile.desc,
      imgAlt: "Smartphone displaying AquaVerify mobile app interface scanning a test kit QR code, held by a technician in a sterile glove.",
      features: ["Offline capability", "GPS Geo-tagging", "QR Code Scanning"]
    },
    lims: {
      title: t.saas.lims.title,
      desc: t.saas.lims.desc,
      imgAlt: "Wide screenshot of AquaVerify Web Dashboard showing analytical graphs, heatmaps of water quality, and user management tables.",
      features: ["Real-time Analytics", "Multi-site Management", "API Integration"]
    },
    compliance: {
      title: t.saas.compliance.title,
      desc: t.saas.compliance.desc,
      imgAlt: "Preview of a generated PDF report with charts and certified data stamps, floating over a blurred interface background.",
      features: ["1-Click Export", "Audit Logs", "Custom Templates"]
    }
  };

  return (
    <section id="platform" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 transform origin-top-right z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <EditableText
            as="span"
            sectionId="saas"
            field="badge"
            fallback={t.saas.badge}
            className="text-secondary font-bold tracking-wider uppercase text-sm block"
          />
          <EditableText
            as="h2"
            sectionId="saas"
            field="title"
            fallback={t.saas.title}
            className="font-heading font-bold text-3xl md:text-4xl text-primary mt-2"
          />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 border ${activeTab === tab.id
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-12 items-center"
              >
                <div className="md:w-1/2 space-y-6">
                  <EditableText
                    as="h3"
                    sectionId="saas"
                    field={`tab_${activeTab}_title`}
                    fallback={content[activeTab].title}
                    className="text-2xl font-heading font-bold text-gray-800 block"
                  />
                  <EditableText
                    as="p"
                    sectionId="saas"
                    field={`tab_${activeTab}_desc`}
                    fallback={content[activeTab].desc}
                    className="text-gray-600 leading-relaxed block"
                  />
                  <ul className="space-y-3">
                    {content[activeTab].features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 font-medium">
                        <Layers size={16} className="text-secondary mr-3" />
                        <EditableText
                          as="span"
                          sectionId="saas"
                          field={`tab_${activeTab}_feature_${idx}`}
                          fallback={feature}
                          className="block"
                        />
                      </li>
                    ))}
                  </ul>
                  <EditableLinkWrapper sectionId="saas" field={`learnMore_link_${activeTab}`} fallback="#contact">
                    <a href="#contact" className="text-secondary font-bold hover:text-primary transition-colors flex items-center mt-4 w-fit">
                      <EditableText sectionId="saas" field={`learnMore_text_${activeTab}`} fallback={`${t.saas.learnMore} ${content[activeTab].title.split(' ')[0]}`} /> <span className="ml-1">→</span>
                    </a>
                  </EditableLinkWrapper>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 aspect-video shadow-inner flex items-center justify-center relative">
                    <EditableImage
                      sectionId="saas"
                      field={`image_${activeTab}`}
                      fallbackSrc={`https://picsum.photos/600/400?random=${activeTab === 'mobile' ? 10 : activeTab === 'lims' ? 11 : 12}`}
                      alt={content[activeTab].imgAlt}
                      className="w-full h-full object-cover block"
                    />
                    {/* Overlay to simulate UI */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-xs font-mono uppercase opacity-80">System Status</p>
                        <p className="font-bold">Online • Synced</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};