import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe as GlobeIcon, X, MapPin, Mail, Phone, CheckCircle2, Radar, ArrowRight, Package, Search, ChevronDown, UserPlus, Droplet } from 'lucide-react';
import Globe from 'react-globe.gl';
import { useLanguage } from '../context/LanguageContext';
import { usePageContent } from '../context/PageContentContext';
import { EditableText } from './admin/EditableText';

interface Partner {
  id: string;
  name: string;
  location: string;
  country: string;
  type: 'exclusive' | 'reseller' | 'service';
  address: string;
  email: string;
  phone: string;
  x: number; // Percentage X
  y: number; // Percentage Y
  lat: number;
  lng: number;
}

// Comprehensive list of countries for the dropdown
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil",
  "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece",
  "India", "Indonesia", "Iran", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
  "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
  "Portugal", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

export const DistributorsSection: React.FC = () => {
  const { t } = useLanguage();
  const { blocks } = usePageContent();
  const block = blocks['distributors'] || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [missingCountry, setMissingCountry] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  // Globe Hooks
  useEffect(() => {
    if (globeRef.current && isModalOpen) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (globeRef.current && selectedPartner) {
      globeRef.current.pointOfView({ lat: selectedPartner.lat, lng: selectedPartner.lng, altitude: 1.5 }, 1000);
    }
  }, [selectedPartner]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Updated Partners Data with 'country', 'lat' and 'lng' fields
  const partners: Partner[] = [
    { id: '1', name: "AquaTech Solutions NY", location: "New York, USA", country: "United States", type: 'exclusive', address: "1200 Broadway, Suite 400, NY 10001", email: "sales.ny@aquatech.com", phone: "+1 212 555 0199", x: 29.5, y: 34, lat: 40.71, lng: -74.00 },
    { id: '2', name: "EuroLab Supplies", location: "London, UK", country: "United Kingdom", type: 'exclusive', address: "15 Baker Street, London W1U 8AE", email: "info@eurolab.co.uk", phone: "+44 20 7946 0958", x: 49.5, y: 26, lat: 51.50, lng: -0.12 },
    { id: '3', name: "Nippon Biotech", location: "Tokyo, Japan", country: "Japan", type: 'reseller', address: "Shinjuku City, Tokyo 160-0022", email: "contact@nipponbio.jp", phone: "+81 3 1234 5678", x: 86, y: 36, lat: 35.68, lng: 139.65 },
    { id: '4', name: "BioSur Ltda", location: "Sao Paulo, Brazil", country: "Brazil", type: 'service', address: "Av. Paulista, 1578, Sao Paulo", email: "suporte@biosur.com.br", phone: "+55 11 98765 4321", x: 34, y: 72, lat: -23.55, lng: -46.63 },
    { id: '5', name: "Oceanic Science", location: "Sydney, Australia", country: "Australia", type: 'reseller', address: "200 George St, Sydney NSW 2000", email: "sales@oceanic.com.au", phone: "+61 2 9876 5432", x: 91, y: 78, lat: -33.86, lng: 151.20 },
    { id: '6', name: "Berlin Diagnostics", location: "Berlin, Germany", country: "Germany", type: 'service', address: "Alexanderplatz 1, 10178 Berlin", email: "service@berlindm.de", phone: "+49 30 1234567", x: 53, y: 25, lat: 52.52, lng: 13.40 },
  ];

  const handleContact = () => {
    setTimeout(() => {
      setRequestSent(true);
      setTimeout(() => setRequestSent(false), 3000);
    }, 1000);
  };

  const handleCountrySelect = (country: string) => {
    setSearchQuery(country);
    setIsDropdownOpen(false);

    // Logic to find partner
    const partner = partners.find(p => p.country.toLowerCase() === country.toLowerCase());
    if (partner) {
      setSelectedPartner(partner);
      setMissingCountry(null);
    } else {
      setSelectedPartner(null);
      setMissingCountry(country);
    }
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'exclusive': return t.distributors.partnerType.exclusive;
      case 'reseller': return t.distributors.partnerType.reseller;
      case 'service': return t.distributors.partnerType.service;
      default: return type;
    }
  };

  return (
    <section id="distributors" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 text-center">
        <EditableText
          as="span"
          sectionId="distributors"
          field="badge"
          fallback={t.distributors.badge}
          className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block"
        />
        <EditableText
          as="h2"
          sectionId="distributors"
          field="title"
          fallback={t.distributors.title}
          className="font-heading font-bold text-3xl md:text-5xl text-primary mb-6"
        />
        <EditableText
          as="p"
          sectionId="distributors"
          field="subtitle"
          fallback={t.distributors.subtitle}
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 block"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-secondary transition-all transform hover:-translate-y-1 flex items-center justify-center mx-auto gap-3"
        >
          <GlobeIcon size={20} />
          <EditableText sectionId="distributors" field="cta" fallback={t.distributors.cta} />
        </button>
      </div>

      {/* Interactive Map Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-gray-900 w-full max-w-6xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[700px]"
            >
              {/* Close Btn */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all transform hover:scale-105"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Left: Map Area (Top on Mobile) */}
              <div className="relative w-full h-1/2 md:h-full md:w-2/3 bg-[#050B14] overflow-hidden flex items-center justify-center group flex-shrink-0">
                {/* Rotating 3D World Map */}
                <div className="relative w-full h-full flex flex-col items-center justify-center cursor-move">
                  {isModalOpen && typeof window !== 'undefined' && (
                    <Globe
                      ref={globeRef}
                      backgroundColor="rgba(0,0,0,0)"
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                      htmlElementsData={partners.map(p => ({ ...p, isSelected: selectedPartner?.id === p.id, isDimmed: selectedPartner && selectedPartner.id !== p.id }))}
                      htmlElement={(d: any) => {
                        const el = document.createElement('div');
                        const isSelected = d.isSelected;
                        const isDimmed = d.isDimmed;

                        el.innerHTML = `
                            <div class="relative group/pin flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isDimmed ? 'opacity-40 blur-[1px]' : 'opacity-100 z-20'} ${isSelected ? 'scale-125' : 'hover:scale-110'} cursor-pointer" style="pointer-events: auto;">
                               ${isSelected ? '<span class="absolute inset-0 rounded-full bg-secondary/30 animate-ping"></span><span class="absolute -inset-2 rounded-full bg-secondary/10 animate-pulse delay-75"></span>' : ''}
                               <svg xmlns="http://www.w3.org/2000/svg" width="${isSelected ? '42' : '28'}" height="${isSelected ? '42' : '28'}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter drop-shadow-md transition-colors ${isSelected ? 'text-secondary fill-secondary' : 'text-primary fill-[#AAD3DF] group-hover/pin:fill-secondary group-hover/pin:text-secondary'}"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
                               <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-80 pointer-events-none"></div>
                               <div class="${isDimmed ? 'hidden' : 'absolute'} bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                                  <div class="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded shadow-xl flex items-center gap-1">
                                     <div class="w-2 h-2 rounded-full ${d.type === 'exclusive' ? 'bg-purple-500' : 'bg-blue-500'}"></div>
                                     ${d.location}
                                  </div>
                                  <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/90 absolute left-1/2 -translate-x-1/2"></div>
                               </div>
                            </div>
                          `;

                        el.style.pointerEvents = 'none';
                        const pinDiv = el.children[0] as HTMLElement;
                        if (pinDiv) {
                          pinDiv.onclick = (e) => {
                            e.stopPropagation();
                            setSelectedPartner(partners.find(p => p.id === d.id) || null);
                            setMissingCountry(null);
                            setSearchQuery(d.country);
                          };
                        }

                        return el;
                      }}
                    />
                  )}
                </div>

                <div className="absolute bottom-6 left-6 flex items-center gap-4 text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-mono shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div> Exclusive
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Reseller
                  </div>
                </div>
              </div>

              {/* Right: Details Panel (Bottom on Mobile) */}
              <div className="w-full h-1/2 md:h-full md:w-1/3 bg-white flex flex-col relative z-20">
                {/* Header & Search */}
                <div className="p-6 md:p-8 flex-shrink-0 border-b border-gray-100 relative bg-white z-30">
                  <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2 flex items-center gap-2">
                    <Radar className="text-primary" />
                    <EditableText
                      sectionId="distributors"
                      field="modalTitle"
                      fallback={t.distributors.modalTitle}
                    />
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {partners.length} authorized nodes active
                  </p>

                  {/* Country Search/Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Select Country..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsDropdownOpen(true);
                          if (e.target.value === '') {
                            setSelectedPartner(null);
                            setMissingCountry(null);
                          }
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                      />
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </div>

                    {/* Search Button (CTA) */}
                    <button
                      onClick={() => handleCountrySelect(searchQuery)}
                      className="absolute right-0 top-0 h-full w-12 flex items-center justify-center opacity-0 pointer-events-none"
                      aria-label="Search"
                    >
                      {/* Hidden but functionality integrated into dropdown selection for better UX */}
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-50"
                        >
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map(country => (
                              <button
                                key={country}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                                onClick={() => handleCountrySelect(country)}
                              >
                                {country}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {selectedPartner ? (
                      <motion.div
                        key={selectedPartner.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full"
                      >
                        <div className="mb-6">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${selectedPartner.type === 'exclusive' ? 'bg-purple-100 text-purple-700' :
                            selectedPartner.type === 'service' ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                            {getPartnerTypeLabel(selectedPartner.type)}
                          </span>
                          <h4 className="text-2xl font-bold text-primary mb-1">{selectedPartner.name}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1" /> {selectedPartner.location}
                          </div>
                        </div>

                        <div className="space-y-4 mb-8 bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-inner">
                          <div className="flex items-start">
                            <MapPin size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-700 text-sm font-medium">{selectedPartner.address}</p>
                          </div>
                          <div className="flex items-center">
                            <Mail size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                            <a href={`mailto:${selectedPartner.email}`} className="text-secondary text-sm hover:underline">{selectedPartner.email}</a>
                          </div>
                          <div className="flex items-center">
                            <Phone size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                            <p className="text-gray-700 text-sm">{selectedPartner.phone}</p>
                          </div>
                        </div>

                        <div className="mt-auto">
                          {requestSent ? (
                            <motion.div
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              className="bg-green-50 text-green-700 px-4 py-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 border border-green-200 shadow-sm"
                            >
                              <CheckCircle2 size={20} />
                              {t.distributors.contactSuccess}
                            </motion.div>
                          ) : (
                            <div className="space-y-3">
                              <button
                                onClick={handleContact}
                                className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-bold shadow-lg transition-colors flex items-center justify-center gap-2 group"
                              >
                                <Mail size={18} className="group-hover:animate-bounce" />
                                {t.distributors.contactBtn} via Platform
                              </button>
                              <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                                <CheckCircle2 size={10} /> Secure communication via AquaVerify
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : missingCountry ? (
                      // Missing Partner State
                      <motion.div
                        key="missing-state"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center text-center h-full"
                      >
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                          <UserPlus size={40} className="text-orange-500" />
                        </div>

                        <h4 className="font-heading font-bold text-xl text-gray-900 mb-2">
                          No Partner in {missingCountry}
                        </h4>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                          We currently don't have a local distributor in this region. However, we can ship directly to you.
                        </p>

                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group">
                          <Mail size={18} className="text-white group-hover:scale-110 transition-transform" />
                          Request Contact
                        </button>
                      </motion.div>
                    ) : (
                      // Default Empty State
                      <motion.div
                        key="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center h-full py-4"
                      >
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                          <GlobeIcon size={40} className="text-primary" />
                        </div>

                        <h4 className="font-heading font-bold text-xl text-gray-900 mb-3">
                          Global Reach, Local Support
                        </h4>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                          AquaVerify delivers scientific solutions to over 140 countries. Select a partner on the map or search for your country.
                        </p>

                        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group">
                          <Package size={18} className="text-secondary group-hover:scale-110 transition-transform" />
                          Request Global Quote
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};