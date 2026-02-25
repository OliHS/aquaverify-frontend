import React from 'react';
import { FlaskConical, CloudLightning, Handshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-surface p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all group">
    <div className="text-secondary mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="font-heading font-bold text-xl mb-3 text-primary">{title}</h3>
    <p className="text-gray-600">{desc}</p>
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
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
            {vpBlock.title || t.valueProps.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {vpBlock.subtitle || t.valueProps.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FlaskConical size={32} />}
            title={vpBlock.cards?.bio?.title || t.valueProps.cards.bio.title}
            desc={vpBlock.cards?.bio?.desc || t.valueProps.cards.bio.desc}
          />
          <FeatureCard
            icon={<CloudLightning size={32} />}
            title={vpBlock.cards?.cloud?.title || t.valueProps.cards.cloud.title}
            desc={vpBlock.cards?.cloud?.desc || t.valueProps.cards.cloud.desc}
          />
          <FeatureCard
            icon={<Handshake size={32} />}
            title={vpBlock.cards?.oem?.title || t.valueProps.cards.oem.title}
            desc={vpBlock.cards?.oem?.desc || t.valueProps.cards.oem.desc}
          />
        </div>
      </div>
    </section>
  );
};