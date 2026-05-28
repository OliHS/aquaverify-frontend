# AUDIT AEO/SEO AquaVerify

Fecha de auditoría: 2026-05-27  
Repositorio auditado: `/Users/prismadual/Documents/aquaverify-corporate-site`  
Dominio objetivo: `https://aquaverify.com`  
Alcance: auditoría técnica, SEO, AEO/GEO, arquitectura, contenido, performance, accesibilidad y schema.  
Estado: diagnóstico. No se han aplicado cambios de código ni diseño en esta fase.

## 1. Resumen Ejecutivo

AquaVerify tiene una base SEO sólida para un sitio B2B técnico: rutas multidioma, prerender estático, sitemap index funcional, robots correcto, 706 URLs públicas en sitemap, 700 rutas marketing auditadas con FAQ, canonical, Open Graph, Twitter cards y JSON-LD. La arquitectura actual ya cubre productos, plataforma, sectores, distribuidores, OEM, recursos y glosario.

Los principales riesgos detectados están en cuatro zonas:

1. **Indexación de rutas privadas/admin**: `/admin`, `/admin/login` y `/admin/pages` responden `200` con `index, follow` y metadata de la home. No aparecen en sitemap, pero si Google las descubre pueden indexarse.
2. **Datasheets publicables sin SEO técnico**: existen 180 fichas HTML bajo `/datasheets/products/*.html` sin `canonical`, sin `robots` y sin meta description. Pueden competir con páginas de producto.
3. **Schema estático de home insuficiente**: la home prerenderizada solo incluye `WebPage`; el código runtime puede añadir más JSON-LD, pero para motores que consumen HTML estático conviene incluir `Organization`, `WebSite`, `ItemList` y `FAQPage` directamente en prerender.
4. **Performance JavaScript**: hay bundles grandes, especialmente `marketingPageOverrides` (~2.2 MB), `DistributorsGlobe` (~1.7 MB), `MarketingRoutePage` (~484 KB) y main bundle (~428 KB). Hay lazy loading parcial, pero la arquitectura puede mejorar para Core Web Vitals y crawlers de IA.

## 2. Stack Técnico Detectado

| Área | Diagnóstico |
|---|---|
| Framework | React 19 + Vite 6 + TypeScript parcial |
| Routing | `react-router-dom` v7 con `BrowserRouter`; rutas públicas base en `PublicSite` y fallback `MarketingRoutePage` |
| Render | SPA con prerender estático posterior al build mediante `scripts/prerender-marketing-pages.js` |
| Deploy | Vercel, `vercel.json` con headers, redirects y rewrite catch-all a `/index.html` |
| Estilos | Tailwind CSS + `index.css`; componentes React con clases Tailwind |
| CMS | CMS propio con Supabase; editores en `/admin/pages` y `/admin/marketing-pages/:pageId/:language`; overrides se cargan por `fetchMarketingPageOverride` y se mezclan con `mergeMarketingContent` |
| Datos de contenido | Mezcla de módulos JS/TS en `utils/*Content.js`, `utils/marketingPages.js`, `utils/glossaryData.js`, `utils/whitepaperMarkdownRaw.js`, más overrides CMS |
| Titles/meta/canonical | Runtime: `utils/seo.ts`; estático: `scripts/prerender-marketing-pages.js` |
| Sitemap | `scripts/generate-sitemap.js` genera `public/sitemap.xml` y cinco sitemaps segmentados |
| Robots | `public/robots.txt` permite todo y declara `https://aquaverify.com/sitemap.xml` |
| Seguridad/performance headers | `vercel.json` define CSP, X-Frame-Options, Referrer-Policy, cache immutable para assets, imágenes y vídeos |

### Estructura de Carpetas Relevante

| Carpeta/archivo | Uso |
|---|---|
| `App.tsx` | Router principal, lazy loading de admin y marketing routes |
| `pages/PublicSite.tsx` | Home pública y SEO base por idioma |
| `pages/MarketingRoutePage.tsx` | Render genérico de páginas marketing y producto |
| `components/*Landing.tsx` | Landings específicas: industrias, recursos, glosario, OEM, distribuidores, productos |
| `utils/marketingPages.js` | Registro central de páginas marketing, rutas, metadatos, schemas, contenidos y generación dinámica de productos/glosario/whitepapers |
| `utils/seo.ts` | Aplicación runtime de title, meta, canonical, hreflang, Open Graph, Twitter y JSON-LD |
| `utils/glossaryContent.js` / `utils/glossaryData.js` | Hub glosario, términos, rutas y definiciones |
| `utils/resourcesHubContent.js` | Hub de recursos, filtros, whitepapers y checklists |
| `scripts/prerender-marketing-pages.js` | Genera HTML SEO estático en `dist` |
| `scripts/generate-sitemap.js` | Genera sitemap index y sub-sitemaps |
| `public/datasheets/products` | 180 fichas HTML imprimibles de productos |
| `public/resources/checklists` | PDFs descargables de checklists |

## 3. Inventario de Páginas Públicas

### Resumen de Rutas

- Home: 6 URLs: `/`, `/en`, `/es`, `/fr`, `/it`, `/ca`.
- Objetos de página marketing: 140.
- URLs marketing multidioma: 700.
- URLs totales en sitemap: 706.
- Sitemaps detectados: `sitemap-home.xml`, `sitemap-products.xml`, `sitemap-industries.xml`, `sitemap-resources.xml`, `sitemap-platform-partners.xml`.
- Categorías por objeto de página: `industries`: 10, `products`: 36, `platform`: 2, `partners`: 2, `resources`: 88, `company`: 2.
- Datasheets HTML públicos: 180, no incluidos en sitemap.
- PDFs públicos detectados: 50.

### Rutas Publicadas por Objeto de Página

Columnas por idioma: EN | ES | FR | IT | CA.

| Categoría | ID | Schema actual | EN | ES | FR | IT | CA |
|---|---:|---|---|---|---|---|---|
| home | home | WebPage | /en | /es | /fr | /it | /ca |
| industries | industries-hub | industries | /industries | /es/industrias | /fr/industries | /it/settori | /ca/sectors |
| products | products | products | /products | /es/productos | /fr/produits | /it/prodotti | /ca/productes |
| products | enumera | products | /products/enumera | /es/productos/enumera | /fr/produits/enumera | /it/prodotti/enumera | /ca/productes/enumera |
| products | indica | products | /products/indica | /es/productos/indica | /fr/produits/indica | /it/prodotti/indica | /ca/productes/indica |
| products | standard-kits | products | /products/standard-iso-epa-kits | /es/productos/kits-iso-epa | /fr/produits/kits-iso-epa | /it/prodotti/kit-iso-epa | /ca/productes/kits-iso-epa |
| products | lab-essentials | products | /products/lab-essentials | /es/productos/lab-essentials | /fr/produits/lab-essentials | /it/prodotti/lab-essentials | /ca/productes/lab-essentials |
| platform | platform | platform | /platform | /es/plataforma | /fr/plateforme | /it/piattaforma | /ca/plataforma |
| platform | saas-biotech | platform | /saas/biotech-lims-platform | /es/saas/plataforma-lims-biotech | /fr/saas/plateforme-lims-biotech | /it/saas/piattaforma-lims-biotech | /ca/saas/plataforma-lims-biotech |
| partners | oem | partners | /oem-water-testing-kits | /es/oem-kits-analisis-agua | /fr/oem-kits-analyse-eau | /it/oem-kit-analisi-acqua | /ca/oem-kits-analisi-aigua |
| partners | distributors | partners | /distributors | /es/distribuidores | /fr/distributeurs | /it/distributori | /ca/distribuidors |
| industries | water-testing-labs | industries | /industries/water-testing-laboratories | /es/industrias/laboratorios-analisis-agua | /fr/industries/laboratoires-analyse-eau | /it/settori/laboratori-analisi-acqua | /ca/sectors/laboratoris-analisi-aigua |
| industries | water-quality-control | industries | /industries/water-quality-control | /es/industrias/control-calidad-agua | /fr/industries/controle-qualite-eau | /it/settori/controllo-qualita-acqua | /ca/sectors/control-qualitat-aigua |
| resources | resources | resourcesHub | /resources | /es/recursos | /fr/ressources | /it/risorse | /ca/recursos |
| resources | iso-10705-2 | resources | /resources/iso-10705-2-somatic-coliphages | /es/recursos/iso-10705-2-colifagos-somaticos | /fr/ressources/iso-10705-2-coliphages-somatiques | /it/risorse/iso-10705-2-colifagi-somatici | /ca/recursos/iso-10705-2-colifags-somatics |
| resources | epa-1602 | resources | /resources/epa-1602-coliphage-testing | /es/recursos/epa-1602-colifagos | /fr/ressources/epa-1602-coliphages | /it/risorse/epa-1602-colifagi | /ca/recursos/epa-1602-colifags |
| resources | coliphages-indicators | TechArticle | /resources/coliphages-water-quality-indicators | /es/recursos/colifagos-indicadores-calidad-agua | /fr/ressources/coliphages-indicateurs-qualite-eau | /it/risorse/colifagi-indicatori-qualita-acqua | /ca/recursos/colifags-indicadors-qualitat-aigua |
| resources | presence-vs-enumeration | resources | /resources/presence-absence-vs-enumeration | /es/recursos/presencia-ausencia-vs-enumeracion | /fr/ressources/presence-absence-vs-denombrement | /it/risorse/presenza-assenza-vs-enumerazione | /ca/recursos/presencia-absencia-vs-enumeracio |
| resources | sample-traceability | resources | /resources/water-sample-digital-traceability | /es/recursos/trazabilidad-digital-muestras-agua | /fr/ressources/tracabilite-numerique-echantillons-eau | /it/risorse/tracciabilita-digitale-campioni-acqua | /ca/recursos/tracabilitat-digital-mostres-aigua |
| resources | distributor-checklist | resources | /resources/water-testing-kit-distributor-checklist | /es/recursos/checklist-distribuidores-kits-analisis-agua | /fr/ressources/checklist-distributeurs-kits-analyse-eau | /it/risorse/checklist-distributori-kit-analisi-acqua | /ca/recursos/checklist-distribuidors-kits-analisi-aigua |
| resources | eu-drinking-water-directive-coliphages | TechArticle | /resources/eu-drinking-water-directive-coliphages | /es/recursos/directiva-europea-agua-potable-colifagos | /fr/ressources/directive-europeenne-eau-potable-coliphages | /it/risorse/direttiva-europea-acqua-potabile-colifagi | /ca/recursos/directiva-europea-aigua-potable-colifags |
| resources | water-compliance-software-guide | TechArticle | /resources/water-compliance-software-guide | /es/recursos/software-cumplimiento-calidad-agua | /fr/ressources/logiciel-conformite-qualite-eau | /it/risorse/software-conformita-qualita-acqua | /ca/recursos/software-compliment-qualitat-aigua |
| resources | us-drinking-water-compliance-coliform-rule | TechArticle | /resources/us-drinking-water-compliance-coliform-rule | /es/recursos/eeuu-cumplimiento-agua-potable-regla-coliformes | /fr/ressources/etats-unis-conformite-eau-potable-coliformes | /it/risorse/stati-uniti-conformita-acqua-potabile-coliformi | /ca/recursos/estats-units-compliment-aigua-potable-coliformes |
| company | about | company | /about | /es/sobre-nosotros | /fr/a-propos | /it/chi-siamo | /ca/sobre-nosaltres |
| company | contact | company | /contact | /es/contacto | /fr/contact | /it/contatto | /ca/contacte |
| industries | municipal-water-testing | industries | /industries/municipal-water-testing | /es/industrias/analisis-agua-municipal | /fr/industries/analyse-eau-municipale | /it/settori/analisi-acqua-municipale | /ca/sectors/analisi-aigua-municipal |
| industries | food-beverage-water-quality | industries | /industries/food-beverage-water-quality | /es/industrias/calidad-agua-alimentacion-bebidas | /fr/industries/qualite-eau-agroalimentaire | /it/settori/qualita-acqua-alimenti-bevande | /ca/sectors/qualitat-aigua-alimentacio-begudes |
| industries | industrial-process-water | industries | /industries/industrial-process-water | /es/industrias/agua-proceso-industrial | /fr/industries/eau-process-industriel | /it/settori/acqua-processo-industriale | /ca/sectors/aigua-proces-industrial |
| industries | agriculture-water | industries | /industries/agriculture-water-management | /es/industrias/agricultura | /fr/industries/eau-agriculture | /it/settori/acqua-agricoltura | /ca/sectors/aigua-agricultura |
| industries | pharma-cosmetics-water | industries | /industries/pharmaceutical-cosmetics-water-quality | /es/industrias/industria-farmaceutica-cosmetica | /fr/industries/qualite-eau-industrie-pharmaceutique-cosmetique | /it/settori/qualita-acqua-industria-farmaceutica-cosmetica | /ca/sectors/qualitat-aigua-industria-farmaceutica-cosmetica |
| industries | hospitality-tourism-water | industries | /industries/hospitality-tourism-leisure-water-quality | /es/industrias/hosteleria-turismo-ocio | /fr/industries/eau-hotellerie-tourisme-loisirs | /it/settori/acqua-ospitalita-turismo-tempo-libero | /ca/sectors/aigua-hostaleria-turisme-oci |
| industries | facility-water-risk | industries | /industries/facility-water-risk-management | /es/industrias/gestion-riesgo-agua-instalaciones | /fr/industries/gestion-risque-eau-batiments | /it/settori/gestione-rischio-acqua-strutture | /ca/sectors/gestio-risc-aigua-installacions |
| products | enumera-soma100 | Product | /products/enumera-soma100 | /es/productos/enumera-soma100 | /fr/produits/enumera-soma100 | /it/prodotti/enumera-soma100 | /ca/productes/enumera-soma100 |
| products | enumera-coli100 | Product | /products/enumera-coli100 | /es/productos/enumera-coli100 | /fr/produits/enumera-coli100 | /it/prodotti/enumera-coli100 | /ca/productes/enumera-coli100 |
| products | enumera-entero100 | Product | /products/enumera-entero100 | /es/productos/enumera-entero100 | /fr/produits/enumera-entero100 | /it/prodotti/enumera-entero100 | /ca/productes/enumera-entero100 |
| products | soma-bottle-100 | Product | /products/soma-bottle-100 | /es/productos/soma-bottle-100 | /fr/produits/soma-bottle-100 | /it/prodotti/soma-bottle-100 | /ca/productes/soma-bottle-100 |
| products | coli-bottle-100 | Product | /products/coli-bottle-100 | /es/productos/coli-bottle-100 | /fr/produits/coli-bottle-100 | /it/prodotti/coli-bottle-100 | /ca/productes/coli-bottle-100 |
| products | entero-bottle-100 | Product | /products/entero-bottle-100 | /es/productos/entero-bottle-100 | /fr/produits/entero-bottle-100 | /it/prodotti/entero-bottle-100 | /ca/productes/entero-bottle-100 |
| products | enumera-sealer | Product | /products/enumera-sealer | /es/productos/enumera-sealer | /fr/produits/enumera-sealer | /it/prodotti/enumera-sealer | /ca/productes/enumera-sealer |
| products | enumera-mould | Product | /products/enumera-mould | /es/productos/enumera-mould | /fr/produits/enumera-mould | /it/prodotti/enumera-mould | /ca/productes/enumera-mould |
| products | enumera-comparator | Product | /products/enumera-comparator | /es/productos/enumera-comparator | /fr/produits/enumera-comparator | /it/prodotti/enumera-comparator | /ca/productes/enumera-comparator |
| products | enumera-reader | Product | /products/enumera-reader | /es/productos/enumera-reader | /fr/produits/enumera-reader | /it/prodotti/enumera-reader | /ca/productes/enumera-reader |
| products | enumera-tray | Product | /products/enumera-tray | /es/productos/enumera-tray | /fr/produits/enumera-tray | /it/prodotti/enumera-tray | /ca/productes/enumera-tray |
| products | enumera-mat | Product | /products/enumera-mat | /es/productos/enumera-mat | /fr/produits/enumera-mat | /it/prodotti/enumera-mat | /ca/productes/enumera-mat |
| products | indica-soma | Product | /products/indica-soma | /es/productos/indica-soma | /fr/produits/indica-soma | /it/prodotti/indica-soma | /ca/productes/indica-soma |
| products | indica-coli | Product | /products/indica-coli | /es/productos/indica-coli | /fr/produits/indica-coli | /it/prodotti/indica-coli | /ca/productes/indica-coli |
| products | indica-entero | Product | /products/indica-entero | /es/productos/indica-entero | /fr/produits/indica-entero | /it/prodotti/indica-entero | /ca/productes/indica-entero |
| products | indica-match | Product | /products/indica-match | /es/productos/indica-match | /fr/produits/indica-match | /it/prodotti/indica-match | /ca/productes/indica-match |
| products | plaque-soma-1ml | Product | /products/plaque-soma-1ml | /es/productos/plaque-soma-1ml | /fr/produits/plaque-soma-1ml | /it/prodotti/plaque-soma-1ml | /ca/productes/plaque-soma-1ml |
| products | plaque-soma-100ml | Product | /products/plaque-soma-100ml | /es/productos/plaque-soma-100ml | /fr/produits/plaque-soma-100ml | /it/prodotti/plaque-soma-100ml | /ca/productes/plaque-soma-100ml |
| products | epa-soma | Product | /products/epa-soma | /es/productos/epa-soma | /fr/produits/epa-soma | /it/prodotti/epa-soma | /ca/productes/epa-soma |
| products | epa-f-plus | Product | /products/epa-f-plus | /es/productos/epa-f-plus | /fr/produits/epa-f-plus | /it/prodotti/epa-f-plus | /ca/productes/epa-f-plus |
| products | msa-semi-solido | Product | /products/msa-semi-solido | /es/productos/msa-semi-solido | /fr/produits/msa-semi-solido | /it/prodotti/msa-semi-solido | /ca/productes/msa-semi-solido |
| products | msa-plate | Product | /products/msa-plate | /es/productos/msa-plate | /fr/produits/msa-plate | /it/prodotti/msa-plate | /ca/productes/msa-plate |
| products | msb | Product | /products/msb | /es/productos/msb | /fr/produits/msb | /it/prodotti/msb | /ca/productes/msb |
| products | msa | Product | /products/msa | /es/productos/msa | /fr/produits/msa | /it/prodotti/msa | /ca/productes/msa |
| products | soma-control-1ml | Product | /products/soma-control-1ml | /es/productos/soma-control-1ml | /fr/produits/soma-control-1ml | /it/prodotti/soma-control-1ml | /ca/productes/soma-control-1ml |
| products | soma-control-100ml | Product | /products/soma-control-100ml | /es/productos/soma-control-100ml | /fr/produits/soma-control-100ml | /it/prodotti/soma-control-100ml | /ca/productes/soma-control-100ml |
| products | wr5-host-strain | Product | /products/wr5-host-strain | /es/productos/wr5-host-strain | /fr/produits/wr5-host-strain | /it/prodotti/wr5-host-strain | /ca/productes/wr5-host-strain |
| products | gr8f | Product | /products/gr8f | /es/productos/gr8f | /fr/produits/gr8f | /it/prodotti/gr8f | /ca/productes/gr8f |
| products | gr8f-ultra | Product | /products/gr8f-ultra | /es/productos/gr8f-ultra | /fr/produits/gr8f-ultra | /it/prodotti/gr8f-ultra | /ca/productes/gr8f-ultra |
| products | indica-control-100 | Product | /products/indica-control-100 | /es/productos/indica-control-100 | /fr/produits/indica-control-100 | /it/prodotti/indica-control-100 | /ca/productes/indica-control-100 |
| products | indica-control-1000 | Product | /products/indica-control-1000 | /es/productos/indica-control-1000 | /fr/produits/indica-control-1000 | /it/prodotti/indica-control-1000 | /ca/productes/indica-control-1000 |
| resources | aquaverify-product-selection-guide | TechArticle | /resources/choose-aquaverify-product-water-microbiology | /es/recursos/guia-elegir-producto-aquaverify | /fr/ressources/choisir-produit-aquaverify-microbiologie-eau | /it/risorse/scegliere-prodotto-aquaverify-microbiologia-acqua | /ca/recursos/triar-producte-aquaverify-microbiologia-aigua |
| resources | rd-3-2023-somatic-coliphages-guide | TechArticle | /resources/rd-3-2023-somatic-coliphages-water-operators | /es/recursos/rd-3-2023-colifagos-somaticos | /fr/ressources/rd-3-2023-coliphages-somatiques-operateurs-eau | /it/risorse/rd-3-2023-colifagi-somatici-operatori-acqua | /ca/recursos/rd-3-2023-colifags-somatics-operadors-aigua |
| resources | iso-17025-water-laboratories-guide | TechArticle | /resources/iso-17025-water-laboratories-chain-of-custody-coa | /es/recursos/iso-17025-laboratorios-analisis-agua | /fr/ressources/iso-17025-laboratoires-eau-chaine-custodie-coa | /it/risorse/iso-17025-laboratori-acqua-catena-custodia-coa | /ca/recursos/iso-17025-laboratoris-aigua-cadena-custodia-coa |
| resources | water-safety-plans-traceable-control | TechArticle | /resources/water-safety-plans-traceable-control-program | /es/recursos/water-safety-plans-calidad-agua | /fr/ressources/water-safety-plans-programme-controle-tracable | /it/risorse/water-safety-plans-programma-controllo-tracciabile | /ca/recursos/water-safety-plans-programa-control-tracable |
| resources | food-beverage-water-microbiology-guide | TechArticle | /resources/food-beverage-water-microbiological-control-cip-audit | /es/recursos/agua-industria-alimentaria-rd-3-2023 | /fr/ressources/eau-alimentation-boissons-controle-microbiologique-cip-audit | /it/risorse/acqua-alimenti-bevande-controllo-microbiologico-cip-audit | /ca/recursos/aigua-alimentacio-begudes-control-microbiologic-cip-auditoria |
| resources | legionella-facility-water-risk-guide | TechArticle | /resources/legionella-water-risk-management-facilities | /es/recursos/legionella-gestion-riesgo-instalaciones | /fr/ressources/legionella-gestion-risque-eau-installations | /it/risorse/legionella-gestione-rischio-acqua-strutture | /ca/recursos/legionella-gestio-risc-aigua-instalacions |
| resources | iso-19458-water-microbiological-sampling | TechArticle | /resources/iso-19458-water-microbiological-sampling | /es/recursos/iso-19458-muestreo-microbiologico-agua | /fr/ressources/iso-19458-echantillonnage-microbiologique-eau | /it/risorse/iso-19458-campionamento-microbiologico-acqua | /ca/recursos/iso-19458-mostreig-microbiologic-aigua |
| resources | excel-to-lims-water-analysis | TechArticle | /resources/excel-to-lims-water-analysis | /es/recursos/excel-a-lims-analisis-agua | /fr/ressources/excel-vers-lims-analyse-eau | /it/risorse/da-excel-a-lims-analisi-acqua | /ca/recursos/excel-a-lims-analisi-aigua |
| resources | oem-white-label-water-testing-kits | TechArticle | /resources/oem-white-label-water-testing-kits | /es/recursos/oem-kits-analisis-agua-marca-blanca | /fr/ressources/oem-marque-blanche-kits-analyse-eau | /it/risorse/oem-white-label-kit-analisi-acqua | /ca/recursos/oem-marca-blanca-kits-analisi-aigua |
| resources | glossary | DefinedTermSet | /en/glossary | /es/glosario | /fr/glossaire | /it/glossario | /ca/glossari |
| resources | glossary-term-2 | DefinedTerm | /en/glossary/bacteriophage | /es/glosario/bacteriofago | /fr/glossaire/bacteriophage | /it/glossario/batteriofago | /ca/glossari/bacteriofag |
| resources | glossary-term-3 | DefinedTerm | /en/glossary/biofilm | /es/glosario/biofilm | /fr/glossaire/biofilm | /it/glossario/biofilm | /ca/glossari/biofilm |
| resources | glossary-term-5 | DefinedTerm | /en/glossary/host-strain | /es/glosario/cepa-huesped | /fr/glossaire/souche-hote | /it/glossario/ceppo-ospite | /ca/glossari/soca-hoste |
| resources | glossary-term-6 | DefinedTerm | /en/glossary/total-coliforms | /es/glosario/coliformes-totales | /fr/glossaire/coliformes-totaux | /it/glossario/coliformi-totali | /ca/glossari/coliformes-totals |
| resources | glossary-term-8 | DefinedTerm | /en/glossary/f-specific-coliphages | /es/glosario/colifagos-f-especificos | /fr/glossaire/coliphages-f-specifiques | /it/glossario/colifagi-f-specifici | /ca/glossari/colifags-f-especifics |
| resources | glossary-term-9 | DefinedTerm | /en/glossary/somatic-coliphages | /es/glosario/colifagos-somaticos | /fr/glossaire/coliphages-somatiques | /it/glossario/colifagi-somatici | /ca/glossari/colifags-somatics |
| resources | glossary-term-10 | DefinedTerm | /en/glossary/fecal-contamination | /es/glosario/contaminacion-fecal | /fr/glossaire/contamination-fecale | /it/glossario/contaminazione-fecale | /ca/glossari/contaminacio-fecal |
| resources | glossary-term-11 | DefinedTerm | /en/glossary/intestinal-enterococci | /es/glosario/enterococos-intestinales | /fr/glossaire/enterocoques-intestinaux | /it/glossario/enterococchi-intestinali | /ca/glossari/enterococs-intestinals |
| resources | glossary-term-12 | DefinedTerm | /en/glossary/escherichia-coli-e-coli | /es/glosario/escherichia-coli-e-coli | /fr/glossaire/escherichia-coli-e-coli | /it/glossario/escherichia-coli-e-coli | /ca/glossari/escherichia-coli-e-coli |
| resources | glossary-term-13 | DefinedTerm | /en/glossary/legionella | /es/glosario/legionella | /fr/glossaire/legionella | /it/glossario/legionella | /ca/glossari/legionella |
| resources | glossary-term-15 | DefinedTerm | /en/glossary/indicator-microorganism | /es/glosario/microorganismo-indicador | /fr/glossaire/micro-organisme-indicateur | /it/glossario/microorganismo-indicatore | /ca/glossari/microorganisme-indicador |
| resources | glossary-term-19 | DefinedTerm | /en/glossary/pfu-plaque-forming-units | /es/glosario/ufp-pfu | /fr/glossaire/ufp-pfu | /it/glossario/ufp-pfu | /ca/glossari/ufp-pfu |
| resources | glossary-term-20 | DefinedTerm | /en/glossary/enteric-viruses | /es/glosario/virus-entericos | /fr/glossaire/virus-enteriques | /it/glossario/virus-enterici | /ca/glossari/virus-enterics |
| resources | glossary-term-21 | DefinedTerm | /en/glossary/directiva-ue-2020-2184 | /es/glosario/directiva-ue-2020-2184 | /fr/glossaire/directiva-ue-2020-2184 | /it/glossario/directiva-ue-2020-2184 | /ca/glossari/directiva-ue-2020-2184 |
| resources | glossary-term-25 | DefinedTerm | /en/glossary/iso-10705-1 | /es/glosario/iso-10705-1 | /fr/glossaire/iso-10705-1 | /it/glossario/iso-10705-1 | /ca/glossari/iso-10705-1 |
| resources | glossary-term-26 | DefinedTerm | /en/glossary/iso-10705-2 | /es/glosario/iso-10705-2 | /fr/glossaire/iso-10705-2 | /it/glossario/iso-10705-2 | /ca/glossari/iso-10705-2 |
| resources | glossary-term-28 | DefinedTerm | /en/glossary/iso-19458 | /es/glosario/iso-19458 | /fr/glossaire/iso-19458 | /it/glossario/iso-19458 | /ca/glossari/iso-19458 |
| resources | glossary-term-32 | DefinedTerm | /en/glossary/iso-9308 | /es/glosario/iso-9308 | /fr/glossaire/iso-9308 | /it/glossario/iso-9308 | /ca/glossari/iso-9308 |
| resources | glossary-term-33 | DefinedTerm | /en/glossary/iso-iec-17025 | /es/glosario/iso-iec-17025 | /fr/glossaire/iso-iec-17025 | /it/glossario/iso-iec-17025 | /ca/glossari/iso-iec-17025 |
| resources | glossary-term-34 | DefinedTerm | /en/glossary/water-safety-plan | /es/glosario/plan-sanitario-del-agua | /fr/glossaire/plan-de-securite-sanitaire-de-leau | /it/glossario/water-safety-plan | /ca/glossari/pla-sanitari-de-laigua |
| resources | glossary-term-35 | DefinedTerm | /en/glossary/royal-decree-3-2023 | /es/glosario/real-decreto-3-2023 | /fr/glossaire/decret-royal-3-2023 | /it/glossario/regio-decreto-3-2023 | /ca/glossari/reial-decret-3-2023 |
| resources | glossary-term-36 | DefinedTerm | /en/glossary/royal-decree-487-2022 | /es/glosario/real-decreto-487-2022 | /fr/glossaire/decret-royal-487-2022 | /it/glossario/regio-decreto-487-2022 | /ca/glossari/reial-decret-487-2022 |
| resources | glossary-term-38 | DefinedTerm | /en/glossary/regulation-eu-2020-741 | /es/glosario/reglamento-ue-2020-741 | /fr/glossaire/reglement-ue-2020-741 | /it/glossario/regolamento-ue-2020-741 | /ca/glossari/reglament-ue-2020-741 |
| resources | glossary-term-40 | DefinedTerm | /en/glossary/water-safety-plan-2 | /es/glosario/water-safety-plan | /fr/glossaire/water-safety-plan | /it/glossario/water-safety-plan-2 | /ca/glossari/water-safety-plan |
| resources | glossary-term-47 | DefinedTerm | /en/glossary/plaque-assay | /es/glosario/ensayo-en-placa | /fr/glossaire/essai-en-plaque | /it/glossario/saggio-in-placca | /ca/glossari/assaig-en-placa |
| resources | glossary-term-48 | DefinedTerm | /en/glossary/membrane-filtration | /es/glosario/filtracion-por-membrana | /fr/glossaire/filtration-sur-membrane | /it/glossario/filtrazione-su-membrana | /ca/glossari/filtracio-per-membrana |
| resources | glossary-term-50 | DefinedTerm | /en/glossary/cell-lysis | /es/glosario/lisis-celular | /fr/glossaire/lyse-cellulaire | /it/glossario/lisi-cellulare | /ca/glossari/lisi-cellular |
| resources | glossary-term-52 | DefinedTerm | /en/glossary/limit-of-detection-lod | /es/glosario/limite-de-deteccion-lod | /fr/glossaire/limite-de-detection-lod | /it/glossario/limite-di-rilevazione-lod | /ca/glossari/limit-de-deteccio-lod |
| resources | glossary-term-53 | DefinedTerm | /en/glossary/matrix | /es/glosario/matriz | /fr/glossaire/matrice | /it/glossario/matrice | /ca/glossari/matriu |
| resources | glossary-term-57 | DefinedTerm | /en/glossary/oos-out-of-specification | /es/glosario/oos-fuera-de-especificacion | /fr/glossaire/oos-hors-specification | /it/glossario/oos-fuori-specifica | /ca/glossari/oos-fora-despecificacio |
| resources | glossary-term-58 | DefinedTerm | /en/glossary/sampling-point | /es/glosario/punto-de-muestreo | /fr/glossaire/point-de-prelevement | /it/glossario/punto-di-campionamento | /ca/glossari/punt-de-mostreig |
| resources | glossary-term-63 | DefinedTerm | /en/glossary/ttr-time-to-result | /es/glosario/ttr-tiempo-de-respuesta | /fr/glossaire/ttr-temps-de-reponse | /it/glossario/ttr-tempo-di-risposta | /ca/glossari/ttr-temps-de-resposta |
| resources | glossary-term-66 | DefinedTerm | /en/glossary/aqualab | /es/glosario/aqualab | /fr/glossaire/aqualab | /it/glossario/aqualab | /ca/glossari/aqualab |
| resources | glossary-term-67 | DefinedTerm | /en/glossary/aquaverify-cloud | /es/glosario/aquaverify-cloud | /fr/glossaire/aquaverify-cloud | /it/glossario/aquaverify-cloud | /ca/glossari/aquaverify-cloud |
| resources | glossary-term-68 | DefinedTerm | /en/glossary/audit-trail | /es/glosario/audit-trail | /fr/glossaire/audit-trail | /it/glossario/audit-trail | /ca/glossari/audit-trail |
| resources | glossary-term-69 | DefinedTerm | /en/glossary/digital-chain-of-custody | /es/glosario/cadena-de-custodia-digital | /fr/glossaire/chaine-de-custodie-digitale | /it/glossario/catena-di-custodia-digitale | /ca/glossari/cadena-de-custodia-digital |
| resources | glossary-term-70 | DefinedTerm | /en/glossary/coa-certificate-of-analysis | /es/glosario/coa-certificado-de-analisis | /fr/glossaire/coa-certificat-danalyse | /it/glossario/coa-certificato-di-analisi | /ca/glossari/coa-certificat-danalisi |
| resources | glossary-term-73 | DefinedTerm | /en/glossary/eln | /es/glosario/eln | /fr/glossaire/eln | /it/glossario/eln | /ca/glossari/eln |
| resources | glossary-term-76 | DefinedTerm | /en/glossary/worksheet | /es/glosario/hoja-de-trabajo | /fr/glossaire/feuille-de-travail | /it/glossario/foglio-di-lavoro | /ca/glossari/full-de-treball |
| resources | glossary-term-77 | DefinedTerm | /en/glossary/lims | /es/glosario/lims | /fr/glossaire/lims | /it/glossario/lims | /ca/glossari/lims |
| resources | glossary-term-78 | DefinedTerm | /en/glossary/customer-portal | /es/glosario/portal-cliente | /fr/glossaire/portail-client | /it/glossario/portale-cliente | /ca/glossari/portal-client |
| resources | glossary-term-79 | DefinedTerm | /en/glossary/saas | /es/glosario/saas | /fr/glossaire/saas | /it/glossario/saas | /ca/glossari/saas |
| resources | glossary-term-82 | DefinedTerm | /en/glossary/tat-turnaround-time | /es/glosario/tat-turnaround-time | /fr/glossaire/tat-turnaround-time | /it/glossario/tat-turnaround-time | /ca/glossari/tat-turnaround-time |
| resources | glossary-term-84 | DefinedTerm | /en/glossary/analytical-traceability | /es/glosario/trazabilidad-analitica | /fr/glossaire/tracabilite-analytique | /it/glossario/tracciabilita-analitica | /ca/glossari/tracabilitat-analitica |
| resources | glossary-term-88 | DefinedTerm | /en/glossary/internal-quality-control | /es/glosario/control-de-calidad-interno | /fr/glossaire/controle-qualite-interne | /it/glossario/controllo-qualita-interno | /ca/glossari/control-de-qualitat-intern |
| resources | glossary-term-89 | DefinedTerm | /en/glossary/enumera | /es/glosario/enumera | /fr/glossaire/enumera | /it/glossario/enumera | /ca/glossari/enumera |
| resources | glossary-term-90 | DefinedTerm | /en/glossary/indica | /es/glosario/indica | /fr/glossaire/indica | /it/glossario/indica | /ca/glossari/indica |
| resources | glossary-term-91 | DefinedTerm | /en/glossary/rapid-detection-kit | /es/glosario/kit-de-deteccion-rapida | /fr/glossaire/kit-de-detection-rapide | /it/glossario/kit-di-rilevazione-rapida | /ca/glossari/kit-de-deteccio-rapida |
| resources | glossary-term-92 | DefinedTerm | /en/glossary/kits-iso-epa | /es/glosario/kits-iso-epa | /fr/glossaire/kits-iso-epa | /it/glossario/kits-iso-epa | /ca/glossari/kits-iso-epa |
| resources | glossary-term-93 | DefinedTerm | /en/glossary/lab-essentials | /es/glosario/lab-essentials | /fr/glossaire/lab-essentials | /it/glossario/lab-essentials | /ca/glossari/lab-essentials |
| resources | glossary-term-94 | DefinedTerm | /en/glossary/kit-lot | /es/glosario/lote-de-kit | /fr/glossaire/lot-de-kit | /it/glossario/lotto-kit | /ca/glossari/lot-de-kit |
| resources | glossary-term-95 | DefinedTerm | /en/glossary/culture-medium | /es/glosario/medio-de-cultivo | /fr/glossaire/milieu-de-culture | /it/glossario/terreno-di-coltura | /ca/glossari/medi-de-cultiu |
| resources | glossary-term-98 | DefinedTerm | /en/glossary/dhw-domestic-hot-water | /es/glosario/acs-agua-caliente-sanitaria | /fr/glossaire/ecs-eau-chaude-sanitaire | /it/glossario/acs-acqua-calda-sanitaria | /ca/glossari/acs-aigua-calenta-sanitaria |
| resources | glossary-term-100 | DefinedTerm | /en/glossary/raw-water | /es/glosario/agua-bruta | /fr/glossaire/eau-brute | /it/glossario/acqua-grezza | /ca/glossari/aigua-bruta |
| resources | glossary-term-101 | DefinedTerm | /en/glossary/drinking-water | /es/glosario/agua-de-consumo | /fr/glossaire/eau-potable | /it/glossario/acqua-potabile | /ca/glossari/aigua-de-consum |
| resources | glossary-term-102 | DefinedTerm | /en/glossary/process-water | /es/glosario/agua-de-proceso | /fr/glossaire/eau-de-process | /it/glossario/acqua-di-processo | /ca/glossari/aigua-de-proces |
| resources | glossary-term-103 | DefinedTerm | /en/glossary/reclaimed-water | /es/glosario/agua-regenerada | /fr/glossaire/eau-regeneree | /it/glossario/acqua-rigenerata | /ca/glossari/aigua-regenerada |
| resources | glossary-term-105 | DefinedTerm | /en/glossary/cip | /es/glosario/cip | /fr/glossaire/cip | /it/glossario/cip | /ca/glossari/cip |
| resources | glossary-term-110 | DefinedTerm | /en/glossary/agricultural-irrigation | /es/glosario/riego-agricola | /fr/glossaire/irrigation-agricole | /it/glossario/irrigazione-agricola | /ca/glossari/reg-agricola |
| resources | glossary-term-116 | DefinedTerm | /en/glossary/deviation | /es/glosario/desviacion | /fr/glossaire/deviation | /it/glossario/deviazione | /ca/glossari/desviacio |
| resources | glossary-term-118 | DefinedTerm | /en/glossary/validation-dossier | /es/glosario/dossier-de-validacion | /fr/glossaire/dossier-de-validation | /it/glossario/dossier-di-validazione | /ca/glossari/dossier-de-validacio |
| resources | glossary-term-120 | DefinedTerm | /en/glossary/technical-review | /es/glosario/revision-tecnica | /fr/glossaire/revue-technique | /it/glossario/revisione-tecnica | /ca/glossari/revisio-tecnica |
| resources | glossary-term-121 | DefinedTerm | /en/glossary/sop | /es/glosario/sop | /fr/glossaire/sop | /it/glossario/sop | /ca/glossari/sop |
| resources | glossary-term-123 | DefinedTerm | /en/glossary/method-validation | /es/glosario/validacion-de-metodo | /fr/glossaire/validation-de-methode | /it/glossario/validazione-del-metodo | /ca/glossari/validacio-de-metode |
| resources | glossary-term-124 | DefinedTerm | /en/glossary/method-verification | /es/glosario/verificacion-de-metodo | /fr/glossaire/verification-de-methode | /it/glossario/verifica-del-metodo | /ca/glossari/verificacio-de-metode |
| resources | glossary-term-126 | DefinedTerm | /en/glossary/authorized-distributor | /es/glosario/distribuidor-autorizado | /fr/glossaire/distributeur-autorise | /it/glossario/distributore-autorizzato | /ca/glossari/distribuidor-autoritzat |
| resources | glossary-term-129 | DefinedTerm | /en/glossary/white-label | /es/glosario/marca-blanca | /fr/glossaire/marque-blanche | /it/glossario/white-label | /ca/glossari/marca-blanca |
| resources | glossary-term-130 | DefinedTerm | /en/glossary/oem | /es/glosario/oem | /fr/glossaire/oem | /it/glossario/oem | /ca/glossari/oem |

### Datasheets Públicos Detectados

Estas fichas son accesibles por URL directa, no están en sitemap, pero actualmente no tienen `robots`, `canonical` ni meta description propia.

<details>
<summary>Ver 180 datasheets</summary>

- `/datasheets/products/coli-bottle-100-ca.html`
- `/datasheets/products/coli-bottle-100-en.html`
- `/datasheets/products/coli-bottle-100-es.html`
- `/datasheets/products/coli-bottle-100-fr.html`
- `/datasheets/products/coli-bottle-100-it.html`
- `/datasheets/products/entero-bottle-100-ca.html`
- `/datasheets/products/entero-bottle-100-en.html`
- `/datasheets/products/entero-bottle-100-es.html`
- `/datasheets/products/entero-bottle-100-fr.html`
- `/datasheets/products/entero-bottle-100-it.html`
- `/datasheets/products/enumera-ca.html`
- `/datasheets/products/enumera-coli100-ca.html`
- `/datasheets/products/enumera-coli100-en.html`
- `/datasheets/products/enumera-coli100-es.html`
- `/datasheets/products/enumera-coli100-fr.html`
- `/datasheets/products/enumera-coli100-it.html`
- `/datasheets/products/enumera-comparator-ca.html`
- `/datasheets/products/enumera-comparator-en.html`
- `/datasheets/products/enumera-comparator-es.html`
- `/datasheets/products/enumera-comparator-fr.html`
- `/datasheets/products/enumera-comparator-it.html`
- `/datasheets/products/enumera-en.html`
- `/datasheets/products/enumera-entero100-ca.html`
- `/datasheets/products/enumera-entero100-en.html`
- `/datasheets/products/enumera-entero100-es.html`
- `/datasheets/products/enumera-entero100-fr.html`
- `/datasheets/products/enumera-entero100-it.html`
- `/datasheets/products/enumera-es.html`
- `/datasheets/products/enumera-fr.html`
- `/datasheets/products/enumera-it.html`
- `/datasheets/products/enumera-mat-ca.html`
- `/datasheets/products/enumera-mat-en.html`
- `/datasheets/products/enumera-mat-es.html`
- `/datasheets/products/enumera-mat-fr.html`
- `/datasheets/products/enumera-mat-it.html`
- `/datasheets/products/enumera-mould-ca.html`
- `/datasheets/products/enumera-mould-en.html`
- `/datasheets/products/enumera-mould-es.html`
- `/datasheets/products/enumera-mould-fr.html`
- `/datasheets/products/enumera-mould-it.html`
- `/datasheets/products/enumera-reader-ca.html`
- `/datasheets/products/enumera-reader-en.html`
- `/datasheets/products/enumera-reader-es.html`
- `/datasheets/products/enumera-reader-fr.html`
- `/datasheets/products/enumera-reader-it.html`
- `/datasheets/products/enumera-sealer-ca.html`
- `/datasheets/products/enumera-sealer-en.html`
- `/datasheets/products/enumera-sealer-es.html`
- `/datasheets/products/enumera-sealer-fr.html`
- `/datasheets/products/enumera-sealer-it.html`
- `/datasheets/products/enumera-soma100-ca.html`
- `/datasheets/products/enumera-soma100-en.html`
- `/datasheets/products/enumera-soma100-es.html`
- `/datasheets/products/enumera-soma100-fr.html`
- `/datasheets/products/enumera-soma100-it.html`
- `/datasheets/products/enumera-tray-ca.html`
- `/datasheets/products/enumera-tray-en.html`
- `/datasheets/products/enumera-tray-es.html`
- `/datasheets/products/enumera-tray-fr.html`
- `/datasheets/products/enumera-tray-it.html`
- `/datasheets/products/epa-f-plus-ca.html`
- `/datasheets/products/epa-f-plus-en.html`
- `/datasheets/products/epa-f-plus-es.html`
- `/datasheets/products/epa-f-plus-fr.html`
- `/datasheets/products/epa-f-plus-it.html`
- `/datasheets/products/epa-soma-ca.html`
- `/datasheets/products/epa-soma-en.html`
- `/datasheets/products/epa-soma-es.html`
- `/datasheets/products/epa-soma-fr.html`
- `/datasheets/products/epa-soma-it.html`
- `/datasheets/products/gr8f-ca.html`
- `/datasheets/products/gr8f-en.html`
- `/datasheets/products/gr8f-es.html`
- `/datasheets/products/gr8f-fr.html`
- `/datasheets/products/gr8f-it.html`
- `/datasheets/products/gr8f-ultra-ca.html`
- `/datasheets/products/gr8f-ultra-en.html`
- `/datasheets/products/gr8f-ultra-es.html`
- `/datasheets/products/gr8f-ultra-fr.html`
- `/datasheets/products/gr8f-ultra-it.html`
- `/datasheets/products/indica-ca.html`
- `/datasheets/products/indica-coli-ca.html`
- `/datasheets/products/indica-coli-en.html`
- `/datasheets/products/indica-coli-es.html`
- `/datasheets/products/indica-coli-fr.html`
- `/datasheets/products/indica-coli-it.html`
- `/datasheets/products/indica-control-100-ca.html`
- `/datasheets/products/indica-control-100-en.html`
- `/datasheets/products/indica-control-100-es.html`
- `/datasheets/products/indica-control-100-fr.html`
- `/datasheets/products/indica-control-100-it.html`
- `/datasheets/products/indica-control-1000-ca.html`
- `/datasheets/products/indica-control-1000-en.html`
- `/datasheets/products/indica-control-1000-es.html`
- `/datasheets/products/indica-control-1000-fr.html`
- `/datasheets/products/indica-control-1000-it.html`
- `/datasheets/products/indica-en.html`
- `/datasheets/products/indica-entero-ca.html`
- `/datasheets/products/indica-entero-en.html`
- `/datasheets/products/indica-entero-es.html`
- `/datasheets/products/indica-entero-fr.html`
- `/datasheets/products/indica-entero-it.html`
- `/datasheets/products/indica-es.html`
- `/datasheets/products/indica-fr.html`
- `/datasheets/products/indica-it.html`
- `/datasheets/products/indica-match-ca.html`
- `/datasheets/products/indica-match-en.html`
- `/datasheets/products/indica-match-es.html`
- `/datasheets/products/indica-match-fr.html`
- `/datasheets/products/indica-match-it.html`
- `/datasheets/products/indica-soma-ca.html`
- `/datasheets/products/indica-soma-en.html`
- `/datasheets/products/indica-soma-es.html`
- `/datasheets/products/indica-soma-fr.html`
- `/datasheets/products/indica-soma-it.html`
- `/datasheets/products/lab-essentials-ca.html`
- `/datasheets/products/lab-essentials-en.html`
- `/datasheets/products/lab-essentials-es.html`
- `/datasheets/products/lab-essentials-fr.html`
- `/datasheets/products/lab-essentials-it.html`
- `/datasheets/products/msa-ca.html`
- `/datasheets/products/msa-en.html`
- `/datasheets/products/msa-es.html`
- `/datasheets/products/msa-fr.html`
- `/datasheets/products/msa-it.html`
- `/datasheets/products/msa-plate-ca.html`
- `/datasheets/products/msa-plate-en.html`
- `/datasheets/products/msa-plate-es.html`
- `/datasheets/products/msa-plate-fr.html`
- `/datasheets/products/msa-plate-it.html`
- `/datasheets/products/msa-semi-solido-ca.html`
- `/datasheets/products/msa-semi-solido-en.html`
- `/datasheets/products/msa-semi-solido-es.html`
- `/datasheets/products/msa-semi-solido-fr.html`
- `/datasheets/products/msa-semi-solido-it.html`
- `/datasheets/products/msb-ca.html`
- `/datasheets/products/msb-en.html`
- `/datasheets/products/msb-es.html`
- `/datasheets/products/msb-fr.html`
- `/datasheets/products/msb-it.html`
- `/datasheets/products/plaque-soma-100ml-ca.html`
- `/datasheets/products/plaque-soma-100ml-en.html`
- `/datasheets/products/plaque-soma-100ml-es.html`
- `/datasheets/products/plaque-soma-100ml-fr.html`
- `/datasheets/products/plaque-soma-100ml-it.html`
- `/datasheets/products/plaque-soma-1ml-ca.html`
- `/datasheets/products/plaque-soma-1ml-en.html`
- `/datasheets/products/plaque-soma-1ml-es.html`
- `/datasheets/products/plaque-soma-1ml-fr.html`
- `/datasheets/products/plaque-soma-1ml-it.html`
- `/datasheets/products/products-ca.html`
- `/datasheets/products/products-en.html`
- `/datasheets/products/products-es.html`
- `/datasheets/products/products-fr.html`
- `/datasheets/products/products-it.html`
- `/datasheets/products/soma-bottle-100-ca.html`
- `/datasheets/products/soma-bottle-100-en.html`
- `/datasheets/products/soma-bottle-100-es.html`
- `/datasheets/products/soma-bottle-100-fr.html`
- `/datasheets/products/soma-bottle-100-it.html`
- `/datasheets/products/soma-control-100ml-ca.html`
- `/datasheets/products/soma-control-100ml-en.html`
- `/datasheets/products/soma-control-100ml-es.html`
- `/datasheets/products/soma-control-100ml-fr.html`
- `/datasheets/products/soma-control-100ml-it.html`
- `/datasheets/products/soma-control-1ml-ca.html`
- `/datasheets/products/soma-control-1ml-en.html`
- `/datasheets/products/soma-control-1ml-es.html`
- `/datasheets/products/soma-control-1ml-fr.html`
- `/datasheets/products/soma-control-1ml-it.html`
- `/datasheets/products/standard-kits-ca.html`
- `/datasheets/products/standard-kits-en.html`
- `/datasheets/products/standard-kits-es.html`
- `/datasheets/products/standard-kits-fr.html`
- `/datasheets/products/standard-kits-it.html`
- `/datasheets/products/wr5-host-strain-ca.html`
- `/datasheets/products/wr5-host-strain-en.html`
- `/datasheets/products/wr5-host-strain-es.html`
- `/datasheets/products/wr5-host-strain-fr.html`
- `/datasheets/products/wr5-host-strain-it.html`

</details>

### Páginas Legales

No se detectan páginas legales corporativas indexables propias en `aquaverify.com`. El footer y el banner de cookies enlazan a rutas legales de plataforma mediante `utils/platformLinks.ts`, por ejemplo `https://app.aquaverify.com/legal/privacy`, `/legal/terms`, `/legal/cookies`.

### Páginas No Enlazadas o con Riesgo

| Ruta/área | Estado | Riesgo |
|---|---|---|
| `/admin`, `/admin/login`, `/admin/pages` | Responden 200 con `index, follow` y title de home | Pueden indexarse si se descubren |
| `/datasheets/products/*.html` | 180 HTML públicos, no sitemap, sin canonical/meta robots | Contenido duplicado o débil frente a páginas producto |
| `/saas/biotech-lims-platform` y equivalentes | Página platform secundaria | Puede solaparse con `/platform` si no se diferencia claramente intención SaaS vs Cloud general |
| `public 2/` | Carpeta stale/duplicada en repo | No debería entrar en build, pero conviene revisar y limpiar fuera del despliegue |
| Redirects legacy OEM/industries | Bien definidos en `vercel.json` | Mantener y auditar al añadir nuevas rutas |

## 4. SEO Técnico

### Validaciones Correctas

| Check | Resultado |
|---|---|
| `robots.txt` live | 200, permite todo, declara sitemap |
| `sitemap.xml` live | 200, sitemap index válido |
| Sub-sitemaps live | 200 |
| Sitemap vs rutas esperadas | 706 esperadas, 706 en sitemap, 0 missing, 0 extra |
| Prerender dist | 706 HTML indexables |
| H1 | 0 páginas sin H1, 0 con múltiples H1 en `dist` |
| Meta description | 0 faltantes en `dist` |
| Canonical | 0 faltantes en `dist` |
| Robots meta | 0 faltantes en `dist` |
| Open Graph/Twitter | 0 faltantes en `dist` |
| JSON-LD | 0 faltantes en `dist` |
| Imágenes sin alt en `dist` | 0 detectadas |
| FAQ por ruta marketing | 700/700 con FAQ |
| Assets de producto | 180/180 listos |

### Problemas y Observaciones

| Prioridad | Problema | Evidencia | Impacto | Esfuerzo | Solución recomendada | Archivos afectados |
|---|---|---|---|---|---|---|
| Critical | Rutas admin indexables | `/admin`, `/admin/login`, `/admin/pages` devuelven `index, follow` y title de home | Riesgo de indexación de CMS/admin, señal pobre de marca y seguridad percibida | Bajo | Añadir `X-Robots-Tag: noindex, nofollow` para `/admin/(.*)`, bloquear en `robots.txt`, y/o aplicar meta noindex en rutas admin | `vercel.json`, `public/robots.txt`, `App.tsx`/admin layout si se quiere refuerzo runtime |
| Critical | Auditor de claims falla | `npm run claims:audit` detecta `certification_claim` en CoA / Certificado de análisis | Puede bloquear releases y mezcla falsos positivos con claims reales | Bajo-Medio | Ajustar allowlist del auditor para `Certificate of Analysis / Certificado de análisis / CoA`, o cambiar copy si se prefiere evitar la palabra certificado en glosario | `scripts/audit-product-claims.js`, `utils/glossaryContent.js`, `utils/glossaryData.js`, `utils/glossaryRoutes.js` |
| High | Datasheets sin canonical/meta robots/meta description | 180/180 datasheets sin canonical, robots ni description | Duplicidad y thin pages frente a páginas producto | Medio | Si son imprimibles: añadir canonical a página principal o `noindex, follow`; añadir meta description y link de retorno | Generador de datasheets en `scripts/generate-product-assets.js`, `public/datasheets/products/*.html` |
| High | Home estática solo con `WebPage` schema | `dist/index.html` y `dist/es/index.html` tienen 1 JSON-LD: WebPage | Menos entidad/citation readiness para IA y crawlers sin JS | Bajo | Inyectar en prerender `Organization`, `WebSite`, `ItemList` productos, `ItemList` sectores y `FAQPage` | `scripts/prerender-marketing-pages.js`, posiblemente `utils/seo.ts` para paridad runtime |
| High | Bundles grandes | `marketingPageOverrides` 2.2 MB; `DistributorsGlobe` 1.7 MB; main 428 KB; route 484 KB | LCP/INP/TBT potencial, especialmente móvil | Medio-Alto | Dividir contenido por categoría/idioma, lazy import de glosario/whitepapers/product detail, cargar globe solo al entrar en viewport | `utils/marketingPages.js`, `pages/MarketingRoutePage.tsx`, `components/DistributorsGlobe.tsx`, Vite manual chunks |
| Medium | Duplicidad de schema en glosario | Hubs y términos tienen schema genérico + schema especializado duplicado | Ruido semántico, validadores pueden reportar redundancia | Bajo | Evitar schema marketing genérico cuando la página ya emite `DefinedTerm`/`DefinedTermSet` específico, o usar `@graph` unificado | `scripts/prerender-marketing-pages.js`, `utils/seo.ts` |
| Medium | Lastmod hardcoded | `scripts/generate-sitemap.js` usa `LASTMOD = 2026-05-20` | Search Console puede recibir señales imprecisas | Bajo | Calcular lastmod por fecha de build/git o fecha de contenido | `scripts/generate-sitemap.js` |
| Medium | Sitemap sin hreflang XML | Hreflang está en HTML, no en sitemap | No bloquea, pero sitemap multidioma sería más explícito | Medio | Añadir namespace `xhtml` y alternates por grupo de traducciones | `scripts/generate-sitemap.js` |
| Medium | Meta descriptions débiles en familias/productos secundarios | Varias descripciones <120 caracteres y titles genéricos tipo `ENUMERA Reader | AquaVerify ENUMERA` | Menor CTR y diferenciación long-tail | Medio | Enriquecer titles/descriptions con intención: organismo, método, matriz, workflow y CTA | `utils/marketingPages.js`, generadores de producto |
| Medium | Rutas legales corporativas ausentes | Footer enlaza a app subdomain | Puede afectar confianza y coherencia indexable corporativa | Medio | Crear páginas corporativas ligeras o canonicalizadas para privacidad, términos y cookies, o documentar decisión de mantener legal en app | `utils/marketingPages.js`, `Footer.tsx`, `utils/platformLinks.ts` |
| Low | `public 2/` duplicada | Carpeta stale en repo | Confusión operativa | Bajo | Revisar y eliminar en una limpieza controlada, no automática | `public 2/` |
| Low | Root live depende de prerender estático + SPA | Correcto, pero hay historial de refresh visual | Riesgo UX si fallback vuelve a aparecer | Medio | Mantener shell prerender consistente con diseño final y evitar lazy boundaries visibles en rutas críticas | `App.tsx`, `scripts/prerender-marketing-pages.js`, CSS |

## 5. Hreflang, Canonical y Multidioma

- Idiomas soportados: `en`, `es`, `fr`, `it`, `ca`.
- Hreflang HTML bidireccional presente en rutas prerenderizadas.
- `x-default` apunta normalmente a inglés para páginas marketing, y a `/` para home.
- Canonical propio por idioma presente en las 706 páginas prerenderizadas.
- Convención de slugs no es simétrica por idioma: inglés omite `/en` en muchas rutas principales (ej. `/products`, `/platform`, `/industries`), pero glosario usa `/en/glossary`. Es válido si se mantiene consistente en sitemap/hreflang, aunque conviene documentar la regla.

## 6. AEO/GEO para Motores de IA

### Fortalezas

- Glosario técnico con 135 términos por idioma y páginas individuales prioritarias.
- Recursos/whitepapers con TOC, FAQ, tablas, referencias oficiales y CTA.
- Sectores con enfoque por problema operativo.
- Productos conectados a sectores y plataforma.
- FAQ presente en todas las rutas marketing auditadas.
- Entidades principales presentes: AquaVerify, AquaVerify Cloud, ENUMERA, INDICA, ISO/EPA, LIMS, CoA, colífagos, E. coli, coliformes, Enterococcus, laboratorios, distribuidores, OEM.

### Brechas AEO/GEO

| Prioridad | Brecha | Impacto | Recomendación |
|---|---|---|---|
| High | Falta bloque de respuesta directa uniforme al inicio de muchas páginas | Los motores de IA prefieren definiciones y respuestas extraíbles en 40-80 palabras | Añadir `Respuesta corta` o `Qué es / Para quién / Cuándo usar` en productos, sectores y plataforma |
| High | Home no expone entidad completa en JSON-LD estático | Peor entity extraction para crawlers sin JS | Añadir Organization/WebSite/ItemList/FAQPage en prerender |
| Medium | Tablas comparativas existen, pero no todas las páginas de producto tienen tabla `cuando usar / no usar` | Menor respuesta a búsquedas comparativas | Añadir tabla `ENUMERA vs INDICA vs ISO/EPA vs Cloud` y tablas específicas por producto |
| Medium | Casos de uso no tienen hub dedicado `/use-cases/` | Pérdida de long-tail por intención transversal | Crear hub de use cases o mapearlo explícitamente dentro de sectores |
| Medium | Referencias oficiales aparecen en muchos contenidos, pero no hay patrón visual/citation uniforme | Menos citation-ready | Estandarizar bloque `Referencias oficiales` con nombre, entidad, año, URL y nota de alcance |
| Low | FAQ genéricas de 2 preguntas en varias páginas producto | FAQ puede parecer mínimo para AEO | Elevar a 4-6 preguntas específicas por intención |

## 7. Schema JSON-LD

### Estado Detectado

| Schema | Estado |
|---|---|
| Organization | Presente como `publisher` dentro de schemas marketing; no como entidad independiente en home estática |
| WebSite | Presente como `isPartOf`; no como entidad independiente con SearchAction |
| Product | Presente en 155 rutas producto |
| SoftwareApplication | Presente en 10 rutas plataforma |
| FAQPage | Presente en 700 rutas marketing |
| BreadcrumbList | Presente en 700 rutas marketing |
| Article / TechArticle | Presente en recursos y whitepapers |
| ItemList | Presente en recursos hub; home no lo tiene en prerender estático |
| DefinedTermSet / DefinedTerm | Presente en glosario; con duplicados por doble emisión |
| HowTo | No detectado; aplicaría solo en procedimientos claros tipo muestreo, lectura de kit o flujo de laboratorio |

### Recomendaciones de Schema tras aprobación

1. Home: añadir `Organization`, `WebSite` con `SearchAction`, `ItemList` de productos, `ItemList` de sectores, `FAQPage` en prerender.
2. Productos individuales: reforzar `Product` con `category`, `brand`, `isRelatedTo`, `audience`, `additionalProperty`; evitar claims regulatorios no aprobados.
3. Plataforma: `SoftwareApplication` + `Service` complementario para AquaVerify Cloud, con módulos como `featureList`.
4. Recursos: mantener `TechArticle` y añadir `citation`/`references` cuando se pueda mapear a fuentes oficiales.
5. Glosario: consolidar `DefinedTerm`/`DefinedTermSet` para evitar duplicados.
6. HowTo: usar solo para páginas con pasos estables: `ISO 19458 sampling`, `ENUMERA Coli 100 workflow`, `Excel a LIMS`.

## 8. Contenido y Copy

### Páginas con Copy o Metadata Débil

| Tipo | Ejemplos | Problema | Recomendación |
|---|---|---|---|
| Familias producto | `/products/enumera`, `/products/standard-iso-epa-kits` | Meta descriptions cortas y poco orientadas a búsqueda | Añadir organismo/método/matriz/intención y cloud traceability |
| Producto secundario | `ENUMERA Reader`, `ENUMERA Sealer`, `Soma Bottle 100` | Titles muy genéricos | Crear patrón: `[Producto] para [workflow] | [familia] AquaVerify` |
| Company | `/about`, `/contact` | Titles muy cortos y meta descriptions mejorables | Optimizar para marca, distribución, OEM y contacto comercial |
| Datasheets | 180 fichas | Sin meta description/canonical; contenido resumido | Tratar como imprimibles no indexables o canonicalizar |
| SaaS secundaria | `/saas/biotech-lims-platform` | Puede competir con `/platform` | Diferenciar intención: SaaS operativo biotech vs AquaVerify Cloud para water quality |

### Propuestas de H1 / Titles SEO Prioritarias

| Ruta | H1/Title recomendado |
|---|---|
| `/products/enumera` | `ENUMERA: quantitative kits for microbiological water enumeration` |
| `/es/productos/enumera` | `ENUMERA: kits cuantitativos para enumeración microbiológica del agua` |
| `/products/indica` | `INDICA: presence/absence water testing kits for rapid microbiological screening` |
| `/products/standard-iso-epa-kits` | `ISO/EPA-oriented coliphage testing kits for technical water microbiology workflows` |
| `/products/lab-essentials` | `Lab Essentials for water microbiology: media, controls and prepared materials` |
| `/platform` | `AquaVerify Cloud: LIMS, CRM, CoA and traceability for water quality operations` |
| `/resources` | `Water microbiology knowledge hub: whitepapers, checklists, standards and glossary` |
| `/contact` | `Contact AquaVerify for water testing products, Cloud demos, distributors and OEM programs` |

### FAQ / Respuesta Directa Recomendada

Patrón propuesto para páginas B2B:

- **Qué es**: definición en 40-70 palabras.
- **Para quién es**: laboratorio, utility, industria, distribuidor, OEM.
- **Cuándo usarlo**: señales de decisión.
- **Qué conecta con AquaVerify Cloud**: muestra, lote, operador, resultado, CoA, portal.
- **Limitación prudente**: aceptación regulatoria depende de matriz, método, país, alcance y sistema de calidad.

## 9. Arquitectura Recomendada

La arquitectura actual ya existe en gran parte, pero puede formalizarse así:

### `/products/`

- `/products` hub de decisión.
- `/products/enumera`, `/products/indica`, `/products/standard-iso-epa-kits`, `/products/lab-essentials` como familias.
- Productos individuales bajo `/products/[slug]`.
- Añadir comparativas y filtros por organismo, método, matriz, lectura, output y conexión cloud.

### `/sectors/` o `/industries/`

- Mantener `/industries` como canonical inglés actual.
- La palabra del menú puede ser `Sectors`, pero la ruta actual `/industries` está consolidada.
- Añadir enlaces desde cada sector a productos y recursos específicos.

### `/use-cases/`

No existe como hub dedicado. Recomendación:

- Crear solo si se quiere capturar intención transversal no sectorial: `sample traceability`, `coliphage monitoring`, `E. coli enumeration`, `water testing distributor program`, `Excel to LIMS migration`.
- Alternativa más conservadora: añadir bloques `Casos de uso` dentro de `/resources`, `/products` y `/industries` antes de crear rutas nuevas.

### `/knowledge/`

Actualmente la intención está en `/resources`. Recomendación:

- Mantener `/resources` como canonical en inglés por estabilidad.
- Usar `Knowledge Hub` como etiqueta visible, no necesariamente como ruta nueva.
- Si se crea `/knowledge`, redirigir o canonicalizar a `/resources` para evitar duplicidad.

### `/glossary/`

- Actual: `/en/glossary`, `/es/glosario`, `/fr/glossaire`, `/it/glossario`, `/ca/glossari`.
- Recomendación: mantener, ampliar términos long-tail y consolidar schema duplicado.

### `/oem-white-label/`

- Actual canonical inglés: `/oem-water-testing-kits`.
- Recomendación: no crear otra ruta competidora sin redirect. Usar `OEM and white label` como copy, y mantener canonical actual.

### `/aquaverify-cloud/`

- Actual canonical inglés: `/platform`.
- Recomendación: mantener `/platform` si ya está enlazado y en sitemap. Crear `/aquaverify-cloud` solo como redirect 301 a `/platform` o como alias no indexable.

## 10. Archivos que Tocaría si Apruebas Cambios

No se ha tocado ninguno en esta auditoría salvo la creación de este informe. Para implementar mejoras propondría tocar, por fases:

### Fase 1: Indexabilidad y release gate

- `vercel.json`: headers `X-Robots-Tag: noindex, nofollow` para `/admin/(.*)`.
- `public/robots.txt`: `Disallow: /admin/`.
- `scripts/audit-product-claims.js`: allowlist para CoA/Certificate of Analysis o ajuste del detector.
- `utils/glossaryContent.js`, `utils/glossaryData.js`, `utils/glossaryRoutes.js`: solo si se decide cambiar copy del término CoA en vez del auditor.

### Fase 2: Datasheets

- `scripts/generate-product-assets.js`: generar canonical/robots/meta description en todas las fichas.
- `public/datasheets/products/*.html`: salida generada, no edición manual recomendable.
- `scripts/generate-sitemap.js`: confirmar exclusión o inclusión según política.

### Fase 3: Schema y AEO

- `scripts/prerender-marketing-pages.js`: home schema estático, schema `@graph`, evitar duplicados glosario, HowTo selectivo.
- `utils/seo.ts`: mantener paridad runtime con prerender.
- `utils/homeContent.ts`: entidad, productos, sectores, FAQ si se quiere compartir fuente.
- `utils/resourcesHubContent.js`, `utils/glossaryContent.js`, `utils/whitepaperMarkdownContent.js`: referencias/citations y definiciones directas.

### Fase 4: Performance

- `utils/marketingPages.js`: dividir contenido pesado por categorías/idiomas.
- `pages/MarketingRoutePage.tsx`: imports dinámicos por tipo de landing/recurso.
- `components/DistributorsGlobe.tsx`, `components/DistributorsLanding.tsx`, `components/DistributorsSection.tsx`: lazy deeper / viewport load.
- `vite.config.ts`: manual chunks si procede.
- `index.css`: revisar CSS crítico/no crítico.

### Fase 5: Contenido

- `utils/marketingPages.js`: titles/descriptions de productos secundarios y family pages.
- `utils/*Content.js`: bloques de respuesta directa y FAQs específicas por sector.
- `components/*Landing.tsx`: solo si el contenido no puede resolverse desde data modules.
- `components/Header.tsx`, `components/Footer.tsx`: solo si se aprueba nueva arquitectura de navegación.

## 11. Plan Recomendado por Prioridad

| Fase | Prioridad | Acción | Resultado esperado |
|---|---|---|---|
| 1 | Critical | Noindex/admin + auditor claims | Evitar indexación accidental y recuperar release gate limpio |
| 2 | High | Canonical/noindex de datasheets | Reducir duplicidad y thin content |
| 3 | High | Home JSON-LD estático completo | Mejor entity extraction para Google/IA |
| 4 | High | Dividir bundles grandes | Mejorar CWV móvil y reducir JS inicial |
| 5 | Medium | Consolidar schema glosario | JSON-LD más limpio y validable |
| 6 | Medium | Enriquecer metadata débil | Mejor CTR y long-tail |
| 7 | Medium | Sitemap hreflang + lastmod real | Mejor señales técnicas a Search Console |
| 8 | Medium | Bloques respuesta directa | Mejor AEO/GEO y citabilidad |
| 9 | Low | Revisar `public 2/` | Limpieza de repositorio |

## 12. Comandos Ejecutados en Auditoría

- `npm run marketing:routes:audit` → OK, 700 rutas, 0 mismatches.
- `npm run marketing:faqs:audit` → OK, 700 URLs con FAQ.
- `npm run cms:links:audit` → OK, 0 stale/invalid links.
- `npm run cms:assets:audit` → OK, 180/180 assets producto listos.
- `npm run claims:audit` → FAIL por `certification_claim` relacionado con CoA/Certificado de análisis y 1 warning de mapping Entero100.
- Fetch live de `robots.txt`, `sitemap.xml`, sub-sitemaps y páginas representativas → 200 OK.
- Scan local de `dist`: 706 páginas, 0 sin H1, 0 con H1 múltiple, 0 sin canonical, 0 sin description, 0 sin robots, 0 sin OG/Twitter, 0 sin JSON-LD, 0 imágenes sin alt.

## 13. Conclusión

La base del sitio está bastante por encima de una web corporativa media: prerender SEO, sitemaps segmentados, glosario multilingüe, recursos técnicos, sectores y productos ya están conectados. El siguiente salto para SEO/AEO/GEO no requiere rediseñar visualmente, sino cerrar riesgos técnicos y hacer el contenido más extractable por motores de IA.

Orden recomendado antes de tocar diseño:

1. Bloquear indexación de `/admin/*`.
2. Resolver auditor de claims para CoA.
3. Definir política de datasheets: canonical a producto o noindex.
4. Añadir schema estático completo en home.
5. Reducir bundles grandes.
6. Enriquecer metadata y respuesta directa en productos/sectores clave.
