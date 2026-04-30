import React, { Suspense, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe as GlobeIcon, MapPin, Mail, Phone, CheckCircle2, Radar, Package, Search, ChevronDown, UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EditableText } from './admin/EditableText';
import { supabase } from '../utils/supabase';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import type { DistributorPartner } from './DistributorsGlobe';

const DistributorsGlobe = React.lazy(() =>
  import('./DistributorsGlobe').then((module) => ({ default: module.DistributorsGlobe }))
);

// Comprehensive list of countries for the dropdown
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil",
  "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece",
  "India", "Indonesia", "Iran", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
  "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
  "Portugal", "Principality of Andorra", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

export const DistributorsSection: React.FC = () => {
  const { t, lang } = useLanguage();

  const [selectedPartner, setSelectedPartner] = useState<DistributorPartner | null>(null);
  const [isGlobeEnabled, setIsGlobeEnabled] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [missingCountry, setMissingCountry] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Polling Map Coordinate Data from Supabase
  const [partners, setPartners] = useState<DistributorPartner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase.from('distributors').select('*');
        if (!error && data) {
          if (data.length > 0) {
            setPartners(data.map((p: any) => ({ ...p, x: 0, y: 0 })));
          } else {
            setPartners([]);
          }
        } else if (error?.code === '42P01') {
          // Graceful fallback to static payload if the SQL Schema has not been initialized yet
          setPartners([
            { id: '1', name: "AquaTech Solutions NY", location: "New York, USA", country: "United States", type: 'exclusive', address: "1200 Broadway, Suite 400, NY 10001", email: "sales.ny@aquatech.com", phone: "+1 212 555 0199", x: 29.5, y: 34, lat: 40.71, lng: -74.00 },
            { id: '2', name: "EuroLab Supplies", location: "London, UK", country: "United Kingdom", type: 'exclusive', address: "15 Baker Street, London W1U 8AE", email: "info@eurolab.co.uk", phone: "+44 20 7946 0958", x: 49.5, y: 26, lat: 51.50, lng: -0.12 },
            { id: '3', name: "Nippon Biotech", location: "Tokyo, Japan", country: "Japan", type: 'reseller', address: "Shinjuku City, Tokyo 160-0022", email: "contact@nipponbio.jp", phone: "+81 3 1234 5678", x: 86, y: 36, lat: 35.68, lng: 139.65 },
            { id: '4', name: "BioSur Ltda", location: "Sao Paulo, Brazil", country: "Brazil", type: 'service', address: "Av. Paulista, 1578, Sao Paulo", email: "suporte@biosur.com.br", phone: "+55 11 98765 4321", x: 34, y: 72, lat: -23.55, lng: -46.63 },
            { id: '5', name: "Oceanic Science", location: "Sydney, Australia", country: "Australia", type: 'reseller', address: "200 George St, Sydney NSW 2000", email: "sales@oceanic.com.au", phone: "+61 2 9876 5432", x: 91, y: 78, lat: -33.86, lng: 151.20 },
            { id: '6', name: "Berlin Diagnostics", location: "Berlin, Germany", country: "Germany", type: 'service', address: "Alexanderplatz 1, 10178 Berlin", email: "service@berlindm.de", phone: "+49 30 1234567", x: 53, y: 25, lat: 52.52, lng: 13.40 },
          ]);
        }
      } catch (err) {
        console.error("Failed to load map data", err);
      }
    };
    fetchPartners();
  }, []);

  const openPlatformSignup = (params: Record<string, string | undefined>) => {
    window.location.assign(getPlatformSignupUrl(params, lang));
  };

  const handleContact = () => {
    if (!selectedPartner) return;
    openPlatformSignup({
      intent: selectedPartner.type === 'open' ? 'distributor-opportunity' : 'partner-contact',
      distributor: selectedPartner.id,
      distributorName: selectedPartner.name,
      country: selectedPartner.country
    });
  };

  const handleMissingCountryContact = () => {
    openPlatformSignup({
      intent: 'direct-shipping',
      country: missingCountry || undefined
    });
  };

  const handleGlobalQuote = () => {
    openPlatformSignup({
      intent: 'global-quote'
    });
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

  const handlePartnerSelect = (partner: DistributorPartner) => {
    setSelectedPartner(partner);
    setMissingCountry(null);
    setSearchQuery(partner.country);
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'exclusive': return t.distributors.partnerType.exclusive;
      case 'reseller': return t.distributors.partnerType.reseller;
      case 'service': return t.distributors.partnerType.service;
      case 'open': return "Open For Distribution";
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
          className="text-gray-600 text-lg max-w-2xl mx-auto block"
        />
      </div>

      <div className="container mx-auto px-6 mt-16 max-w-7xl">
        <div className="bg-gray-900 w-full rounded-2xl shadow-2xl shadow-primary/10 relative z-10 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[700px] border border-gray-100">
          {/* Left: Map Area (Top on Mobile) */}
          <div className="relative w-full h-1/2 md:h-full md:w-2/3 bg-[#050B14] overflow-hidden flex items-center justify-center group flex-shrink-0">
            {isGlobeEnabled ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center cursor-move">
                <Suspense
                  fallback={
                    <div className="h-20 w-20 animate-pulse rounded-full border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_80px_rgba(34,211,238,0.18)]" />
                  }
                >
                  <DistributorsGlobe
                    partners={partners}
                    selectedPartner={selectedPartner}
                    onSelectPartner={handlePartnerSelect}
                  />
                </Suspense>
              </div>
            ) : (
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-8 text-center text-white">
                <div className="absolute inset-0 bg-[#071521]" />
                <div className="relative mx-auto flex max-w-lg flex-col items-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 shadow-lg">
                    <GlobeIcon size={42} className="text-cyan-200" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold md:text-4xl">Interactive distributor map</h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-cyan-50/75">
                    Search by country on the right, or load the 3D globe when you want the full interactive view.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan-100/80">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{partners.length} nodes</span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">140+ countries</span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">Local support</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGlobeEnabled(true)}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    <GlobeIcon size={18} />
                    Load interactive globe
                  </button>
                </div>
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 hidden flex-wrap items-center gap-3 text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-mono shadow-sm md:right-auto md:flex md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div> Exclusive
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Reseller
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Open for New Distributor
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
                          selectedPartner.type === 'open' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                        {getPartnerTypeLabel(selectedPartner.type)}
                      </span>
                      <h4 className="text-2xl font-bold text-primary mb-1">{selectedPartner.name}</h4>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin size={14} className="mr-1" /> {selectedPartner.location}
                      </div>
                    </div>

                    {selectedPartner.type === 'open' ? (
                      <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-inner mb-8 mt-4">
                        <p className="text-green-800 text-sm font-medium leading-relaxed">
                          If you are interested in distributing our products in {selectedPartner.country}, please contact us to discuss partnership opportunities.
                        </p>
                      </div>
                    ) : (
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
                    )}

                    <div className="mt-auto space-y-3">
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

                    <button
                      onClick={handleMissingCountryContact}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
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

                    <button
                      onClick={handleGlobalQuote}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <Package size={18} className="text-secondary group-hover:scale-110 transition-transform" />
                      Request Global Quote
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
