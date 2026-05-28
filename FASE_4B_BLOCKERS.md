# Fase 4B-1 Blockers

Fecha: 2026-05-27

Resultado: fase detenida antes de modificar codigo de runtime. No se implemento el split porque la solucion segura incumple las condiciones de parada: requiere tocar mas de 8 archivos y no es posible crear un shell ligero que renderice las rutas completas sin separar primero el contenido pesado de `utils/marketingPages.js`.

## Baseline Build

Comando:

```bash
npm run build
du -h dist/assets/* | sort -hr | head -30
```

Resultado:

```text
npm run build: OK
Prerendered 706 SEO HTML routes.

2.2M  dist/assets/marketingOverrideNormalize-D-x0aIbi.js
1.7M  dist/assets/DistributorsGlobe-V1UBWYE1.js
488K  dist/assets/MarketingRoutePage-DAqs69WL.js
428K  dist/assets/index-D0G3hr_-.js
172K  dist/assets/supabase-COhfOqgG.js
92K   dist/assets/index-BRhZzWrI.css
32K   dist/assets/MarketingPageEditor-Hb04NeQZ.js
24K   dist/assets/VisualBuilder-BGvUyHMi.js
24K   dist/assets/PageEditor-CJYdjsxS.js
20K   dist/assets/ProductManager-C652d_PQ.js
20K   dist/assets/MarketingPagesList-CgFmB5d3.js
12K   dist/assets/Footer-CtklONji.js
12K   dist/assets/DistributorsManager--AbUk0hj.js
```

## Baseline Red Local

Metodo: `npm run preview` + Chrome headless con CDP. Se midieron cargas directas y navegacion SPA desde `/es`.

### Cargas directas

| Ruta | JS descargado relevante | MarketingRoutePage | Chunk 2.2M | DistributorsGlobe |
| --- | --- | --- | --- | --- |
| `/es/productos` | `index`, `Footer`, `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |
| `/es/recursos` | `index`, `Footer`, `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |
| `/es/glosario` | `index`, `Footer`, `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |
| `/es/distribuidores` | `index`, `Footer`, `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |

### Navegacion SPA desde `/es`

| Ruta | JS descargado relevante | MarketingRoutePage | Chunk 2.2M | DistributorsGlobe |
| --- | --- | --- | --- | --- |
| `/es/productos` | `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |
| `/es/recursos` | `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |
| `/es/glosario` | `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |
| `/es/distribuidores` | `MarketingRoutePage`, `marketingOverrideNormalize`, `supabase`, icon chunks | Si | Si | No |

Nota: los nombres `resourcesHubContent`, `glossaryData`, `glossaryContent`, `whitepaperMarkdownRaw` y `whitepaperMarkdownContent` no aparecen como chunks independientes porque estan agrupados dentro de `marketingOverrideNormalize-D-x0aIbi.js`.

## Inspeccion De Codigo

### `pages/MarketingRoutePage.tsx`

El archivo importa sincronicamente:

- todos los landings especiales de industrias
- `DistributorsLanding`
- `OEMKitsLanding`
- `ProductHubLanding`
- `ResourcesHubLanding`
- `GlossaryLanding`
- `mergeMarketingContent` desde `utils/marketingPageOverrides.js`
- `findMarketingPageByPath`, `getMarketingAlternates`, `getMarketingPagePath`, `getMarketingPageSummary`, `getRelatedMarketingPages`, `MARKETING_PAGES` desde `utils/marketingPages.js`

Tambien exporta `MarketingPagePreview`, usado por el admin:

- `pages/admin/MarketingPageEditor.tsx` importa `MarketingPagePreview` desde `pages/MarketingRoutePage.tsx`

Esto acopla el renderer publico, el preview CMS y el contenido completo en un unico grafo.

### `utils/marketingPages.js`

El modulo construye el arbol completo de paginas y al cargarse importa contenido de todas las familias:

- `resourcesHubContent.js`
- `whitepaperMarkdownContent.js`
- `glossaryContent.js`
- contenidos de industrias
- contenido de productos
- rutas, relaciones, summaries, alternates y helpers

El problema central es que `MARKETING_PAGES` se crea en top-level. Cualquier import de `findMarketingPageByPath`, `getMarketingPageSummary`, `getRelatedMarketingPages` o `MARKETING_PAGES` carga todo el grafo.

### `utils/marketingRoutes.js`

Ya existe un indice ligero de rutas. Ventaja:

- contiene rutas por idioma
- no contiene copy largo
- ya lo usan header, footer, home y componentes

Limitacion para 4B-1:

- no contiene categoria/familia suficiente para decidir renderer
- no contiene contenido, SEO, FAQs, gallery, markdown, parentId, schemaType ni relaciones
- no puede reemplazar `MARKETING_PAGES` para render sin crear nuevos modulos de contenido por familia

## Condiciones De Parada Activadas

### 1. Mas de 8 archivos

Un split real requiere, como minimo:

1. `pages/MarketingRoutePage.tsx`
2. nuevo shell o reescritura del shell en `pages/MarketingRoutePage.tsx`
3. `pages/marketing-routes/ProductsMarketingRoute.tsx`
4. `pages/marketing-routes/IndustriesMarketingRoute.tsx`
5. `pages/marketing-routes/ResourcesMarketingRoute.tsx`
6. `pages/marketing-routes/GlossaryMarketingRoute.tsx`
7. `pages/marketing-routes/PlatformPartnersMarketingRoute.tsx`
8. un modulo compartido para layout/SEO/generic document
9. un modulo para extraer `MarketingPagePreview` usado por admin
10. `pages/admin/MarketingPageEditor.tsx`
11. `utils/marketingRoutes.js` o nuevo indice con familia/categoria
12. modulos de contenido por familia o refactor de `utils/marketingPages.js`
13. scripts/audits/prerender si se cambia la fuente canonica de paginas

Esto supera el limite de 8 archivos.

### 2. Shell ligero sin `marketingPages.js`

El shell puede usar `utils/marketingRoutes.js` para detectar path, pero no puede renderizar contenido completo sin importar `utils/marketingPages.js` o sin crear nuevos modulos de contenido por familia.

Si un renderer de familia importa `utils/marketingPages.js`, la ruta vuelve a descargar el chunk pesado completo. Eso seria un split cosmetico y no cumpliria el objetivo.

### 3. Riesgo prerender/admin

El prerender genera HTML completo desde `scripts/prerender-marketing-pages.js`, pero el runtime tambien debe renderizar la misma pagina al hidratar/navegar. Si se separa el runtime sin una fuente de contenido equivalente por familia, hay riesgo de:

- diferencias entre prerender y runtime
- preview del CMS roto
- rutas internas con contenido parcial
- auditorias de 700 rutas fallando

## Plan Seguro Para Una Fase Posterior

Para conseguir el objetivo real, la siguiente fase deberia ser una fase preparatoria antes del split:

1. Separar `MarketingPagePreview` del route runtime para desacoplar admin de `MarketingRoutePage`.
2. Promover `utils/marketingRoutes.js` a indice ligero con `id`, `lang`, `path`, `category`, `family`, `parentId` y flags minimos.
3. Extraer helpers compartidos de `MarketingRoutePage` a un modulo ligero de UI/SEO que no importe contenido pesado.
4. Dividir `utils/marketingPages.js` en fuentes por familia:
   - productos
   - industrias
   - plataforma/partners/company
   - recursos/whitepapers
   - glosario
5. Mantener un agregador `MARKETING_PAGES` solo para scripts, admin y prerender.
6. Hacer que los renderers runtime importen solo su familia.
7. Validar que `npm run marketing:routes:audit` sigue comprobando 700 rutas.
8. Despues de esa preparacion, implementar el shell lazy por familia.

## Veredicto

Fase 4B-1 no implementada.

Motivo: no se puede cumplir el objetivo real con cambios pequenos y reversibles sin tocar mas de 8 archivos o sin hacer un split superficial que seguiria descargando el chunk de 2.2 MB en `/es/productos`, `/es/plataforma` e `/es/industrias`.

Recomendacion: no pasar aun a un split de renderers. Primero hacer una Fase 4B-0 de desacoplamiento de contenido y preview CMS.
