# AquaVerify Performance Bundle Plan

Fecha de auditoria: 2026-05-27

Alcance: Fase 4, analisis de bundles JavaScript. Este documento no propone cambios de diseno, contenido, rutas, schema ni sitemap. El objetivo es reducir JavaScript inicial y mejorar Core Web Vitals sin romper prerender SEO, rutas multidioma ni contenido marketing.

## Resumen Ejecutivo

El build actual contiene cuatro focos principales:

| Bundle | Tamano observado | Impacto principal | Diagnostico |
| --- | ---: | --- | --- |
| `marketingPageOverrides-*.js` | ~2.2 MB | Riesgo de descarga innecesaria en navegacion marketing/admin y dependencias publicas | Mezcla helpers ligeros con datasets y contenido marketing muy pesado. |
| `DistributorsGlobe-*.js` | ~1.7 MB | Alto coste en pagina de distribuidores o cuando se activa el mapa | `react-globe.gl` arrastra Three.js y dependencias 3D. |
| `MarketingRoutePage-*.js` | ~484 KB | Descarga temprana por preload idle desde `App.tsx` | Una sola pagina route-loader importa muchos renderers marketing internos. |
| `index-*.js` | ~428 KB | JavaScript inicial de la home | Incluye app shell, home completa, header, cookies, analytics, contexto CMS y mapa de chunks lazy. |

La home prerenderizada no depende de JavaScript para tener contenido SEO visible. El mayor quick win es evitar que la home descargue chunks internos tras idle si el usuario no navega, y separar helpers ligeros de datasets pesados para que `marketingPageOverrides` no se convierta en una dependencia transversal.

## Inventario De Carga

### Home

Se carga en la home inicial:

- `dist/assets/index-*.js`, bundle principal.
- `dist/assets/index-*.css`.
- `components/HomeEcosystemLanding.tsx`, importado de forma sincronica desde `pages/PublicSite.tsx`.
- `components/Header.tsx`, `components/CookieConsent.tsx`, `components/CorporateAnalytics.tsx`.
- `context/PageContentContext.tsx` y `utils/publicCms.ts`, que usan `fetch` REST ligero hacia Supabase, no `@supabase/supabase-js`.
- Mapa de dependencias lazy generado por Vite dentro del bundle principal.

Se descarga en home despues de idle:

- `MarketingRoutePage-*.js`, por el preload programado en `App.tsx`.
- Sus dependencias pueden acercar contenido interno a usuarios que solo visitan la home.
- Footer ya esta lazy/idle, con impacto menor.

No deberia cargarse en home inicial:

- `DistributorsGlobe-*.js`, salvo navegacion a distribuidores o activacion del mapa.
- Contenido completo de glosario, recursos y whitepapers.
- Renderers pesados de paginas internas.

### Paginas Internas

Se cargan en paginas internas:

- `MarketingRoutePage-*.js` para rutas marketing no-home.
- Componentes de sectores, productos, plataforma, recursos, glosario, distribuidores y OEM.
- `marketingPageOverrides-*.js` cuando se mezclan overrides CMS con contenido estatico.
- `DistributorsGlobe-*.js` en distribuidores o secciones con mapa 3D, cargado con `React.lazy`.

## 1. `marketingPageOverrides` (~2.2 MB)

### Causa Raiz

El chunk no es grande por el archivo fuente principal en si, sino por sus imports transitivos. `utils/marketingPageOverrides.js` mezcla:

- Normalizacion de overrides.
- Merge de contenido CMS con contenido estatico.
- Acceso a `MARKETING_PAGES`.
- Dependencias indirectas de contenido largo: recursos, whitepapers, glosario y paginas sectoriales.

Ademas, `utils/publicMarketingOverrides.ts` importa `normalizeMarketingOverride` desde `utils/marketingPageOverrides.js`. Aunque solo necesita un helper ligero, ese import puede asociarlo al modulo pesado.

### Archivos Implicados

- `utils/marketingPageOverrides.js`
- `utils/publicMarketingOverrides.ts`
- `pages/MarketingRoutePage.tsx`
- `utils/marketingPages.js`
- `utils/resourcesHubContent.js`
- `utils/whitepaperMarkdownRaw.js`
- `utils/whitepaperMarkdownContent.js`
- `utils/glossaryData.js`
- `utils/glossaryContent.js`
- `scripts/prerender-marketing-pages.js`
- paginas admin que importan overrides marketing

### Que Parte Se Carga En Home

La home no necesita el contenido completo de `MARKETING_PAGES`. El riesgo aparece por imports compartidos y por preload de `MarketingRoutePage`. Si `publicMarketingOverrides.ts` usa un helper desde el modulo pesado, el grafo de dependencias queda contaminado.

### Que Parte Se Carga Solo En Internas

El merge completo entre CMS y contenido estatico solo deberia cargarse en:

- paginas marketing internas
- admin/CMS
- prerender de marketing
- scripts de validacion o generacion

### Riesgo SEO / Prerender

Bajo si el refactor separa helpers sin cambiar salida HTML. Medio si se divide `MARKETING_PAGES` o se hace dynamic import por ruta, porque el prerender necesita seguir resolviendo todas las paginas completas.

### Plan

Quick win:

- Extraer `normalizeMarketingOverride` a un modulo puro y pequeno, sin imports de `MARKETING_PAGES`.
- Hacer que `utils/publicMarketingOverrides.ts` use ese modulo ligero.
- Mantener `utils/marketingPageOverrides.js` como capa pesada solo para merge completo.

Cambio medio:

- Separar un indice ligero de rutas marketing: slug, idioma, categoria, id, canonical.
- Cargar el contenido largo solo despues de identificar la ruta.

Mayor riesgo:

- Generar modulos por pagina o por familia de contenido para que recursos, glosario y sectores no vivan en el mismo grafo.

## 2. `DistributorsGlobe` (~1.7 MB)

### Causa Raiz

`components/DistributorsGlobe.tsx` importa `react-globe.gl`, que arrastra Three.js y dependencias 3D. Es una experiencia visual pesada y no necesaria para indexacion.

### Archivos Implicados

- `components/DistributorsGlobe.tsx`
- `components/DistributorsLanding.tsx`
- `components/DistributorsSection.tsx`
- `package.json`
- `vite.config.ts`, solo si se decide aislar manualmente vendor 3D

### Que Parte Se Carga En Home

No deberia cargarse en el render inicial de home. En el bundle principal solo aparece como dependencia lazy en el mapa de chunks de Vite.

### Que Parte Se Carga Solo En Internas

- Pagina de distribuidores.
- Secciones que activan el mapa de distribuidores.
- Carga bajo demanda cuando el usuario interactua, segun el componente actual.

### Riesgo SEO / Prerender

Bajo si se mantiene un fallback HTML/CSS indexable y el globo sigue siendo enhancement visual. Alto si el contenido principal de distribuidores dependiera del canvas 3D, pero no deberia ser el caso.

### Plan

Quick win:

- Confirmar que no hay preload automatico de `DistributorsGlobe`.
- Mantener fallback estatico accesible con paises, regiones o red global.
- Cargar el globo solo con interaccion explicita o cuando el bloque entre en viewport.

Cambio medio:

- Envolver el import 3D en un boton tipo "Ver mapa interactivo" para que no descargue en scroll pasivo.
- Usar `IntersectionObserver` con `rootMargin` conservador y conexion rapida si se quiere mantener auto-load.

Mayor riesgo:

- Sustituir `react-globe.gl` por un mapa SVG/canvas propio mucho mas ligero, manteniendo la experiencia de red global.

## 3. `MarketingRoutePage` (~484 KB)

### Causa Raiz

`pages/MarketingRoutePage.tsx` funciona como router universal para muchas paginas internas. Importa de forma sincronica numerosos componentes y datasets:

- productos
- plataforma
- sectores
- distribuidores
- OEM
- recursos
- glosario
- whitepapers
- paginas legales/marketing

Ademas, `App.tsx` lo pre-carga tras idle aunque el usuario permanezca en la home.

### Archivos Implicados

- `App.tsx`
- `pages/MarketingRoutePage.tsx`
- `components/MarketingRouteFallback.tsx`, si existe o se crea para suspense
- componentes internos de paginas marketing
- `utils/marketingPages.js`
- `utils/marketingPageOverrides.js`

### Que Parte Se Carga En Home

No es necesaria para pintar la home. Actualmente se descarga despues de idle por esta estrategia:

- `loadMarketingRoutePage = () => import('./pages/MarketingRoutePage')`
- `requestIdleCallback(preload, { timeout: 2500 })`
- fallback `setTimeout(preload, 1200)`

Esto puede empeorar TBT, JS transfer y competencia de red justo despues del primer render.

### Que Parte Se Carga Solo En Internas

Todo el renderer de rutas marketing internas deberia cargarse solo al visitar:

- `/es/productos`
- `/es/plataforma`
- `/es/industrias`
- `/es/recursos`
- `/es/glosario`
- `/es/distribuidores`
- `/es/oem-kits-analisis-agua`
- equivalentes multidioma

### Riesgo SEO / Prerender

Bajo para eliminar preload idle, porque el prerender ya genera HTML y React puede cargar la ruta cuando sea necesaria.

Medio para dividir renderers internos con `React.lazy`, porque hay que evitar pantallas en blanco durante hidratacion y asegurar que el prerender Node sigue generando contenido completo.

### Plan

Quick win:

- Retirar o condicionar el preload idle de `MarketingRoutePage` en `App.tsx`.
- Prefetch solo en `pointerenter`, `focus` o navegacion real desde links del header/footer.

Cambio medio:

- Separar `MarketingRoutePage` en loaders por familia:
  - productos
  - plataforma
  - industrias
  - recursos
  - glosario
  - distribuidores/OEM
- Mantener un shell ligero de route matching.

Mayor riesgo:

- Reestructurar contenido marketing como imports dinamicos por pagina o por idioma.

## 4. `main bundle` / `index` (~428 KB)

### Causa Raiz

El bundle principal incluye el app shell y una home muy completa:

- `components/HomeEcosystemLanding.tsx` con copy multidioma, hero, cards, comparativas, carousel, industrias, FAQs y CTAs.
- iconos `lucide-react` usados en muchos bloques.
- header, cookies, analytics y contexto CMS.
- mapa de chunks lazy de Vite.

El componente de home pesa ~91 KB como fuente TSX, pero su efecto real aumenta por iconos y utilidades compartidas.

### Archivos Implicados

- `index.tsx`
- `App.tsx`
- `pages/PublicSite.tsx`
- `components/HomeEcosystemLanding.tsx`
- `components/Header.tsx`
- `components/CookieConsent.tsx`
- `components/CorporateAnalytics.tsx`
- `context/PageContentContext.tsx`
- `utils/publicCms.ts`
- `utils/corporateAnalytics.ts`
- `utils/homeContent.js` o equivalente

### Que Parte Se Carga En Home

- Home completa en cliente.
- Header y language routing.
- Cookie banner/modal.
- Analytics corporativo.
- CMS public content REST.

### Que Parte Se Carga Solo En Internas

Idealmente nada de recursos/glosario/distribuidores/OEM deberia entrar en el main bundle, salvo mapas de lazy chunks.

### Riesgo SEO / Prerender

Medio si se divide la home, porque hay que mantener el HTML prerenderizado completo y evitar cambios de contenido entre prerender e hidratacion. Bajo si se limita a diferir componentes no visibles despues del primer viewport.

### Plan

Quick win:

- Evitar preload idle de rutas internas.
- Revisar imports de iconos y componentes no visibles above-the-fold.
- Asegurar que analytics no ejecuta trabajo pesado antes de idle.

Cambio medio:

- Dividir `HomeEcosystemLanding.tsx` en:
  - `HomeHero`
  - `HomeInnovation`
  - `HomeProducts`
  - `HomePlatform`
  - `HomeIndustries`
  - `HomePartners`
  - `HomeFaq`
- Mantener hero sincronico y diferir secciones below-the-fold con lazy/hydration cuidadosa.

Mayor riesgo:

- Generar contenido home por idioma en modulos separados.
- Reemplazar partes dinamicas por islands ligeras manteniendo HTML prerender.

## Refactor Por Fases

### Fase 4A: Quick Wins Seguros

1. Eliminar o condicionar preload idle de `MarketingRoutePage` en `App.tsx`.
2. Extraer normalizador de overrides a modulo ligero sin imports pesados.
3. Actualizar `publicMarketingOverrides.ts` para no depender del modulo pesado.
4. Mantener `DistributorsGlobe` como lazy y confirmar que no se descarga sin interaccion o viewport.
5. Medir de nuevo build, transferencia JS y Lighthouse mobile.

Impacto esperado:

- Menos JS descargado despues de entrar en home.
- Menos competencia de red y CPU post-load.
- Menor riesgo de TBT alto.

Riesgo:

- Bajo si las rutas internas siguen cargando por import dinamico al navegar.

### Fase 4B: Cambios Medios

1. Dividir `MarketingRoutePage` por familias de paginas.
2. Crear indice ligero de rutas marketing.
3. Cargar recursos, glosario y whitepapers solo cuando la ruta lo necesita.
4. Separar home en componentes internos y diferir below-the-fold sin cambiar HTML prerender.
5. Revisar import de `lucide-react` en bloques masivos para evitar arrastre innecesario.

Impacto esperado:

- Reduccion notable de `MarketingRoutePage`.
- Mejor cacheabilidad por familia de pagina.
- Menor JS parse/execute en rutas internas.

Riesgo:

- Medio. Requiere validar prerender, rutas multidioma y ausencia de flicker.

### Fase 4C: Cambios De Mayor Riesgo

1. Codegen por pagina o por idioma para contenido marketing.
2. Migrar datasets largos a JSON estatico cargado por ruta.
3. Reemplazar globo 3D por alternativa ligera o cargarlo con confirmacion explicita del usuario.
4. Ajustar `manualChunks` en `vite.config.ts` despues de medir el efecto real.

Impacto esperado:

- Mejor separacion de contenido.
- Menor transferencia para usuarios que visitan una sola familia de paginas.

Riesgo:

- Medio/alto. Puede afectar prerender, rutas de CMS y auditorias de contenido si no se cubre con tests.

## Medicion Antes / Despues

### Build Output

Comandos recomendados:

```bash
npm run build
du -h dist/assets/* | sort -hr | head -30
```

Registrar:

- tamano bruto por chunk
- gzip/brotli si el pipeline los muestra
- numero de chunks generados
- si `MarketingRoutePage`, `marketingPageOverrides` o `DistributorsGlobe` aparecen como dependencias tempranas

### Lighthouse / PageSpeed

Medir mobile y desktop en:

- `https://aquaverify.com/`
- `https://aquaverify.com/es`
- `https://aquaverify.com/es/productos`
- `https://aquaverify.com/es/plataforma`
- `https://aquaverify.com/es/industrias`
- `https://aquaverify.com/es/recursos`
- `https://aquaverify.com/es/glosario`
- `https://aquaverify.com/es/distribuidores`

Metricas:

- Performance score
- LCP
- INP, si hay datos de campo
- TBT
- FCP
- CLS
- Speed Index
- JS transfer size
- unused JavaScript

### Navegador / DevTools

Medir en Network y Coverage:

- JS transferido antes de interaccion.
- JS descargado por idle despues de entrar en home.
- JS parse/execute.
- requests de `MarketingRoutePage`, `marketingPageOverrides`, `DistributorsGlobe`.
- tiempo hasta que el main thread queda estable.

### RUM / Produccion

Si GA4 o Search Console ya tienen datos:

- Core Web Vitals por URL.
- Mobile LCP p75.
- INP p75.
- consultas y landing pages afectadas.

## Archivos Que Tocaria

Quick wins:

- `App.tsx`
- `utils/publicMarketingOverrides.ts`
- `utils/marketingPageOverrides.js`
- nuevo modulo ligero, por ejemplo `utils/marketingOverrideNormalize.js`
- `pages/MarketingRoutePage.tsx`, solo si requiere ajustar imports tras separar helpers

Cambios medios:

- `pages/MarketingRoutePage.tsx`
- `utils/marketingPages.js`
- nuevo `utils/marketingRouteIndex.js` o equivalente
- `utils/resourcesHubContent.js`
- `utils/whitepaperMarkdownRaw.js`
- `utils/whitepaperMarkdownContent.js`
- `utils/glossaryData.js`
- `utils/glossaryContent.js`
- `components/HomeEcosystemLanding.tsx`
- nuevos subcomponentes home bajo `components/home/`

Distributors:

- `components/DistributorsLanding.tsx`
- `components/DistributorsSection.tsx`
- `components/DistributorsGlobe.tsx`

Build/chunking, solo si las fases anteriores no bastan:

- `vite.config.ts`

Validacion relacionada:

- `scripts/prerender-marketing-pages.js`
- scripts de auditoria existentes solo si fallan por el refactor

## Validaciones Obligatorias Antes De Implementar

Antes:

```bash
npm run build
du -h dist/assets/* | sort -hr | head -30
```

Despues de cada fase:

```bash
npm run marketing:routes:audit
npm run marketing:faqs:audit
npm run cms:links:audit
npm run cms:assets:audit
npm run claims:audit
npm run build
du -h dist/assets/* | sort -hr | head -30
```

Comprobaciones manuales:

- Home prerenderizada mantiene contenido SEO completo.
- No aparece pantalla en blanco al navegar desde header.
- Rutas multidioma siguen resolviendo.
- Recursos y glosario cargan su contenido completo.
- Distribuidores mantiene fallback visible aunque el globo no cargue.
- No se modifican schema, sitemap, rutas ni contenido visual.

## Recomendacion De Ejecucion

Prioridad recomendada:

1. Aplicar Fase 4A.
2. Medir build y Lighthouse mobile.
3. Si el main bundle y el JS post-load siguen altos, aplicar Fase 4B sobre `MarketingRoutePage`.
4. Solo abordar Fase 4C si hay evidencia de que los datasets largos siguen entrando en rutas donde no corresponden.

La ruta mas segura es empezar por preload y separacion de helpers. Es reversible, no altera diseno y reduce la probabilidad de descargar contenido interno en una visita simple a la home.
