import React from 'react';
import { FlaskConical, CloudLightning, Handshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableText } from './admin/EditableText';

const FeatureCard = ({ icon, title, desc, index }: { icon: React.ReactNode, title: string, desc: string, index: number }) => (
  <div className="bg-surface p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all group">
    <div className="text-secondary mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <EditableText as="h3" sectionId="valueProps" field={`feature_${index}_title`} fallback={title} className="font-heading font-bold text-xl mb-3 text-primary block" />
    <EditableText as="p" sectionId="valueProps" field={`feature_${index}_desc`} fallback={desc} className="text-gray-600 block" />
  </div>
);

export const ValueProps: React.FC = () => {
  const { t } = useLanguage();
  const { blocks } = usePageContent();
  const vpBlock = blocks['valueProps'] || {};

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <EditableText
            as="h2"
            sectionId="valueProps"
            field="title"
            fallback={t.valueProps.title}
            className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4"
          />
          <EditableText
            as="p"
            sectionId="valueProps"
            field="subtitle"
            fallback={t.valueProps.subtitle}
            className="text-gray-600 text-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FlaskConical size={32} />}
            title={t.valueProps.cards.bio.title}
            desc={t.valueProps.cards.bio.desc}
            index={0}
          />
          <FeatureCard
            icon={<CloudLightning size={32} />}
            title={t.valueProps.cards.cloud.title}
            desc={t.valueProps.cards.cloud.desc}
            index={1}
          />
          <FeatureCard
            icon={<Handshake size={32} />}
            title={t.valueProps.cards.oem.title}
            desc={t.valueProps.cards.oem.desc}
            index={2}
          />
        </div>
      </div>
    </section>
  );
};