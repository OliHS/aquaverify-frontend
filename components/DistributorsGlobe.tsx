import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export interface DistributorPartner {
  id: string;
  name: string;
  location: string;
  country: string;
  type: 'exclusive' | 'reseller' | 'service' | 'open';
  address: string;
  email: string;
  phone: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
}

interface GlobePoint extends DistributorPartner {
  isSelected: boolean;
  isDimmed: boolean;
}

interface DistributorsGlobeProps {
  partners: DistributorPartner[];
  selectedPartner: DistributorPartner | null;
  onSelectPartner: (partner: DistributorPartner) => void;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char] || char;
  });

export const DistributorsGlobe: React.FC<DistributorsGlobeProps> = ({
  partners,
  selectedPartner,
  onSelectPartner,
}) => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
      }
    }
  }, []);

  useEffect(() => {
    if (globeRef.current && selectedPartner) {
      globeRef.current.pointOfView({ lat: selectedPartner.lat, lng: selectedPartner.lng, altitude: 1.5 }, 1000);
    }
  }, [selectedPartner]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Globe
      ref={globeRef}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      htmlElementsData={partners.map((partner) => ({
        ...partner,
        isSelected: selectedPartner?.id === partner.id,
        isDimmed: Boolean(selectedPartner && selectedPartner.id !== partner.id),
      }))}
      htmlElement={(point: object) => {
        const data = point as GlobePoint;
        const el = document.createElement('div');
        const partner = partners.find((item) => item.id === data.id);
        const safeLocation = escapeHtml(data.location);

        el.innerHTML = `
          <div class="relative group/pin flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${data.isDimmed ? 'opacity-40 blur-[1px]' : 'opacity-100 z-20'} ${data.isSelected ? 'scale-125' : 'hover:scale-110'} cursor-pointer" style="pointer-events: auto;">
             ${data.isSelected ? '<span class="absolute inset-0 rounded-full bg-secondary/30 animate-ping"></span><span class="absolute -inset-2 rounded-full bg-secondary/10 animate-pulse delay-75"></span>' : ''}
             <svg xmlns="http://www.w3.org/2000/svg" width="${data.isSelected ? '42' : '28'}" height="${data.isSelected ? '42' : '28'}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter drop-shadow-md transition-colors ${data.isSelected ? 'text-secondary fill-secondary' : 'text-primary fill-[#AAD3DF] group-hover/pin:fill-secondary group-hover/pin:text-secondary'}"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-80 pointer-events-none"></div>
             <div class="${data.isDimmed ? 'hidden' : 'absolute'} bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                <div class="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded shadow-xl flex items-center gap-1">
                   <div class="w-2 h-2 rounded-full ${data.type === 'exclusive' ? 'bg-purple-500' : data.type === 'open' ? 'bg-green-500' : 'bg-blue-500'}"></div>
                   ${safeLocation}
                </div>
                <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/90 absolute left-1/2 -translate-x-1/2"></div>
             </div>
          </div>
        `;

        el.style.pointerEvents = 'none';
        const pinDiv = el.children[0] as HTMLElement | undefined;
        if (pinDiv && partner) {
          pinDiv.onclick = (event) => {
            event.stopPropagation();
            onSelectPartner(partner);
          };
        }

        return el;
      }}
    />
  );
};
