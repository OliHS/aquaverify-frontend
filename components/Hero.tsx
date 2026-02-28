import React from 'react';
import { ArrowRight, Activity, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableImage } from './admin/EditableImage';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { blocks } = usePageContent();

  const heroBlock = blocks['hero'] || {};
  const heroTitleHtml = heroBlock.title || `${t.hero.titleStart} <span class="text-secondary">${t.hero.titleEnd}</span>.`;
  const heroSubtitleHtml = heroBlock.subtitle || t.hero.subtitle;
  const heroDescHtml = heroBlock.desc || 'AquaVerify bridges the gap between physical water analysis and digital truth. From our advanced biotech consumable kits to our immutable cloud platform, we deliver the world\'s most reliable decentralized water quality data.';
  const heroBtnText = heroBlock.btn_text || t.hero.explore || 'Explore Solutions';

  return (
    <section className="relative pt-24 min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">

      {/* Left: Biotech / Physical World */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="lg:w-1/2 bg-primary text-white px-8 lg:px-20 py-20 flex flex-col justify-center relative"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -left-20 top-20 w-96 h-96">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.8,58.8C22.5,66.2,9.8,72.5,-3.6,78.7C-17,84.9,-31.1,91,-44.5,84.8C-57.9,78.6,-70.6,60.1,-77.8,41.2C-85,22.3,-86.7,3,-81.7,-13.6C-76.7,-30.2,-65,-44.1,-52.1,-51.7C-39.2,-59.3,-25.1,-60.6,-11.5,-60.8C2.1,-61,15.7,-60.1,30.5,-83.6" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Activity size={16} className="text-secondary" />
            <span className="text-sm font-medium tracking-wide">{t.hero.badge}</span>
          </div>

          <EditableText
            as="h1"
            sectionId="hero"
            field="title"
            fallback={heroTitleHtml}
            allowHtml={true}
            className="font-heading font-extrabold text-4xl lg:text-6xl leading-tight mb-6 [&_span]:text-secondary [&_p]:m-0"
          />

          <EditableText
            as="div"
            sectionId="hero"
            field="desc"
            fallback={heroDescHtml}
            allowHtml={true}
            className="text-lg text-gray-200 mb-10 leading-relaxed font-light [&_p]:mb-4 last:[&_p]:mb-0 block"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <EditableLinkWrapper sectionId="hero" field="primaryBtnLink" fallback="#products">
              <a href="#products" className="bg-secondary text-white px-8 py-3 rounded hover:bg-white hover:text-primary transition-all font-semibold shadow-lg flex items-center justify-center group">
                <EditableText sectionId="hero" field="primaryBtn" fallback={heroBtnText} />
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </EditableLinkWrapper>

            <EditableLinkWrapper sectionId="hero" field="secondaryBtnLink" fallback="#saas">
              <a href="#saas" className="px-8 py-3 rounded border border-white/30 hover:bg-white/10 transition-all font-semibold text-white flex items-center justify-center">
                <EditableText sectionId="hero" field="secondaryBtn" fallback={t.hero.data} />
              </a>
            </EditableLinkWrapper>
          </div>
        </div>
      </motion.div>

      {/* Right: Digital / SaaS World */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="lg:w-1/2 bg-surface px-8 lg:px-20 py-20 flex flex-col justify-center relative"
      >
        <div className="absolute top-10 right-10 opacity-5">
          <Database size={200} />
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col h-full justify-center">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 flex-1 flex flex-col min-h-[300px]">
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center space-x-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs text-gray-400 font-mono">dashboard.aquaverify.cloud</div>
            </div>
            <div className="p-0 relative flex-1 bg-white">
              <EditableImage
                sectionId="hero"
                field="image"
                fallbackSrc="https://picsum.photos/800/600?random=1"
                alt="AquaVerify LIMS dashboard"
                className="absolute inset-0 w-full h-full object-contain object-center block"
              />
            </div>
          </div>

          <div className="mt-8 text-right lg:text-left shrink-0">
            <EditableText
              as="h2"
              sectionId="hero"
              field="limsTitle"
              fallback={t.hero.limsTitle}
              className="text-2xl font-heading font-bold text-primary mb-2 block"
            />
            <EditableText
              as="p"
              sectionId="hero"
              field="limsDesc"
              fallback={t.hero.limsDesc}
              className="text-gray-600 block"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};