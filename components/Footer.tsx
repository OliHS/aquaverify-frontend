import React from 'react';
import { Droplet, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      const headerOffset = 85; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
               <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-full">
                <Droplet className="w-5 h-5 text-primary fill-current" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">AquaVerify</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t.footer.solutions}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-secondary">Testing Kits</a></li>
              <li><a href="#" className="hover:text-secondary">LIMS Software</a></li>
              <li><a href="#" className="hover:text-secondary">Mobile App</a></li>
              <li><a href="#" className="hover:text-secondary">OEM Program</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-secondary">About Us</a></li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => handleSmoothScroll(e, 'products')}
                  className="hover:text-secondary"
                >
                  Scientific Validation
                </a>
              </li>
              <li><a href="#" className="hover:text-secondary">Careers</a></li>
              <li><a href="#" className="hover:text-secondary">{t.footer.contact}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>123 Science Park Drive</li>
              <li>Innovation District, CA 90210</li>
              <li className="pt-2">hello@aquaverify.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white">{t.footer.terms}</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};