import React, { useState } from 'react';
import { Package, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableText } from './admin/EditableText';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';

export const OEMSection: React.FC = () => {
  // ROI State
  const [testsPerMonth, setTestsPerMonth] = useState(500);
  const [laborCostPerHour, setLaborCostPerHour] = useState(25);
  const [minutesSavedPerTest, setMinutesSavedPerTest] = useState(15);
  const { t, lang } = useLanguage();
  const { blocks } = usePageContent();
  const block = blocks['oem'] || {};

  // Determine currency symbol based on language
  const currencySymbol = lang === 'en' ? '$' : '€';

  // Calculation
  const monthlySavings = (testsPerMonth * minutesSavedPerTest / 60) * laborCostPerHour;
  const annualSavings = monthlySavings * 12;
  const hoursSavedAnnually = (testsPerMonth * minutesSavedPerTest * 12) / 60;

  return (
    <section id="oem" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-50/30 -skew-x-12 origin-top-right"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Top Section: Header & Features */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Header */}
          <div>
            <EditableText
              as="span"
              sectionId="oem"
              field="badge"
              fallback={t.oem.badge}
              className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block"
            />
            <EditableText
              as="h2"
              sectionId="oem"
              field="title"
              fallback={t.oem.title}
              className="font-heading font-bold text-3xl md:text-5xl mt-6 mb-6 text-gray-900 block"
            />
            <EditableText
              as="p"
              sectionId="oem"
              field="desc"
              fallback={t.oem.desc}
              className="text-gray-600 text-lg leading-relaxed block"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4">
              <Package size={24} />
            </div>
            <EditableText as="h4" sectionId="oem" field="feature1Title" fallback={t.oem.packaging} className="font-bold text-gray-900 mb-2 block" />
            <EditableText as="p" sectionId="oem" field="feature1Desc" fallback={t.oem.packagingDesc} className="text-sm text-gray-500 block" />
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-4">
              <RefreshCw size={24} />
            </div>
            <EditableText as="h4" sectionId="oem" field="feature2Title" fallback={t.oem.revenue} className="font-bold text-gray-900 mb-2 block" />
            <EditableText as="p" sectionId="oem" field="feature2Desc" fallback={t.oem.revenueDesc} className="text-sm text-gray-500 block" />
          </div>
        </div>
      </div>

      {/* ROI Calculator - Styled according to request */}
      <div className="rounded-[2rem] p-8 md:p-12 bg-gradient-to-br from-primary to-[#0d6ba0] text-white shadow-2xl mt-4">
        <EditableText
          sectionId="oem"
          field="calculatorTitle"
          as="h3"
          fallback={t.oem.calculatorTitle}
          className="text-center font-heading font-bold text-2xl md:text-3xl mb-2 text-white block"
        />
        <EditableText
          as="p"
          sectionId="oem"
          field="calculatorDesc"
          fallback="Estimate your potential return on investment by integrating AquaVerify into your workflow."
          className="text-center text-white/70 text-sm mb-10 max-w-2xl mx-auto block"
        />

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-9">
          {/* Input 1 */}
          <div className="flex flex-col">
            <EditableText as="label" sectionId="oem" field="testsLabel" fallback={t.oem.testsLabel} className="block text-xs font-heading font-bold text-white/70 uppercase tracking-widest mb-2" />
            <input
              type="number"
              value={testsPerMonth}
              onChange={(e) => setTestsPerMonth(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white font-heading font-bold text-lg outline-none transition-all focus:border-secondary focus:bg-white/15 placeholder-white/50"
            />
          </div>

          {/* Input 2 */}
          <div className="flex flex-col">
            <label className="block text-xs font-heading font-bold text-white/70 uppercase tracking-widest mb-2">
              {t.oem.laborLabel}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">{currencySymbol}</span>
              <input
                type="number"
                value={laborCostPerHour}
                onChange={(e) => setLaborCostPerHour(Number(e.target.value))}
                className="w-full px-4 py-3 pl-8 bg-white/10 border-2 border-white/20 rounded-lg text-white font-heading font-bold text-lg outline-none transition-all focus:border-secondary focus:bg-white/15 placeholder-white/50"
              />
            </div>
          </div>

          {/* Input 3 */}
          <div className="flex flex-col">
            <label className="block text-xs font-heading font-bold text-white/70 uppercase tracking-widest mb-2">
              Time Saved / Test
            </label>
            <select
              value={minutesSavedPerTest}
              onChange={(e) => setMinutesSavedPerTest(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white font-heading font-bold text-lg outline-none transition-all focus:border-secondary focus:bg-white/15 appearance-none cursor-pointer"
            >
              <option value={5} className="bg-primary text-white">5 Minutes</option>
              <option value={10} className="bg-primary text-white">10 Minutes</option>
              <option value={15} className="bg-primary text-white">15 Minutes (Avg)</option>
              <option value={30} className="bg-primary text-white">30 Minutes</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-black/15 rounded-xl p-7 border border-white/10">
          <div className="text-center">
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-secondary leading-none mb-1.5">
              {currencySymbol}{Math.round(monthlySavings).toLocaleString()}
            </div>
            <div className="text-xs text-white/65 font-medium uppercase tracking-wide">Monthly Savings</div>
          </div>

          <div className="text-center md:border-l border-white/10 pt-6 md:pt-0 border-t md:border-t-0 mt-6 md:mt-0">
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-secondary leading-none mb-1.5">
              {currencySymbol}{Math.round(annualSavings).toLocaleString()}
            </div>
            <div className="text-xs text-white/65 font-medium uppercase tracking-wide">{t.oem.annualSavings}</div>
          </div>

          <div className="text-center md:border-l border-white/10 pt-6 md:pt-0 border-t md:border-t-0 mt-6 md:mt-0">
            <div className="font-heading font-extrabold text-3xl md:text-4xl text-secondary leading-none mb-1.5">
              {Math.round(hoursSavedAnnually).toLocaleString()}
            </div>
            <div className="text-xs text-white/65 font-medium uppercase tracking-wide">Hours Saved / Year</div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <EditableLinkWrapper sectionId="oem" field="partnerBtnLink" fallback="#contact">
            <a href="#contact" className="inline-block bg-white text-primary hover:bg-secondary hover:text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all transform hover:-translate-y-1">
              <EditableText sectionId="oem" field="partnerBtn" fallback={t.oem.partnerBtn} />
            </a>
          </EditableLinkWrapper>
        </div>

      </div>
    </section>
  );
};