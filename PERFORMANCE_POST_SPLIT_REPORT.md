# AquaVerify Performance Post-Split Report

Fecha: 2026-05-28

Rama: `redesign-arquitectura-comercial`

Objetivo: medir el impacto real del split por familias de rutas marketing, confirmar que no hay regresiones SEO/runtime y decidir si hace falta una fase adicional.

## 1. Resumen ejecutivo

El split por familias queda validado para las rutas medidas:

- La home (`/` y `/es`) no descarga `MarketingRoutePage`, `LegacyMarketingRoute`, `marketingPages`, `resourcePages`, `glossaryPages` ni `DistributorsGlobe` tras carga inicial + 5 segundos idle.
- Products, platform, partners/company, industries, resources y glossary cargan sus chunks de familia sin descargar el legacy global.
- `marketingPages` legacy queda reducido a un chunk pequeño de aproximadamente 1.9 KB generado, y no aparece en las rutas públicas normales medidas.
- `DistributorsGlobe` sigue siendo grande, pero no se descarga temprano en home ni en `/es/distribuidores` durante las pruebas de carga inicial/navegación.
- El prerender sigue generando 706 rutas HTML SEO.
- Las auditorías obligatorias pasan.
- Lighthouse no está instalado localmente, así que no se ejecutó ni se instaló.

Veredicto: listo para deploy desde el punto de vista del split runtime medido. Las optimizaciones pendientes son incrementales, no bloqueantes.

## 2. Estado Git

Antes de medir:

```txt
On branch redesign-arquitectura-comercial
Your branch is based on 'origin/redesign-arquitectura-comercial', but the upstream is gone.
nothing to commit, working tree clean
```

Nota: el upstream remoto de esta rama ya no existe, pero no afecta a la validación local.

## 3. Baseline conocido

| Chunk / área | Estado inicial conocido |
| --- | ---: |
| `marketingPageOverrides` / `marketingOverrideNormalize` | ~2.2 MB antes del desacoplamiento |
| `MarketingRoutePage` | ~484 KB antes del split |
| `marketingPages` legacy después de resources | ~472 KB |
| `marketingPages` legacy después de glossary | ~1.9 KB |
| `DistributorsGlobe` | ~1.7 MB |
| `index` main bundle | ~428 KB |

## 4. After actual: assets principales

Salida relevante de `du -h dist/assets/* | sort -hr | head -50`:

| Asset | Tamaño disco |
| --- | ---: |
| `DistributorsGlobe-D9pMyhVk.js` | 1.7M |
| `resourcePages-DRkomE8_.js` | 836K |
| `industryPages-CHrNv83D.js` | 588K |
| `glossaryPages-DI60zQ7r.js` | 472K |
| `index-YID4mTOt.js` | 428K |
| `IndustriesHubLanding-CDwrzLVi.js` | 340K |
| `supabase-COhfOqgG.js` | 172K |
| `partnerPages-B4c7wQhI.js` | 136K |
| `productPages-CxAIsKVH.js` | 92K |
| `index-BRhZzWrI.css` | 92K |
| `platformPages-DlyzU0Lr.js` | 52K |
| `OEMKitsLanding-B4FL7_aS.js` | 52K |
| `marketingPages-BG05DIlq.js` | 4K |

Salida relevante de Vite:

| Asset | Gzip |
| --- | ---: |
| `DistributorsGlobe-D9pMyhVk.js` 1,823.08 kB | 518.14 kB |
| `resourcePages-DRkomE8_.js` 854.71 kB | 187.75 kB |
| `industryPages-CHrNv83D.js` 599.75 kB | 174.16 kB |
| `glossaryPages-DI60zQ7r.js` 479.92 kB | 72.66 kB |
| `index-YID4mTOt.js` 437.47 kB | 131.83 kB |
| `IndustriesHubLanding-CDwrzLVi.js` 346.23 kB | 73.53 kB |
| `supabase-COhfOqgG.js` 173.38 kB | 45.77 kB |
| `partnerPages-B4c7wQhI.js` 138.12 kB | 39.34 kB |
| `productPages-CxAIsKVH.js` 91.29 kB | 24.46 kB |
| `index-BRhZzWrI.css` 91.35 kB | 14.33 kB |
| `platformPages-DlyzU0Lr.js` 51.13 kB | 14.70 kB |
| `marketingPages-BG05DIlq.js` 1.92 kB | 0.82 kB |

## 5. Comandos ejecutados

### Build inicial

```txt
npm run build
✓ 2288 modules transformed.
✓ built in 1m 16s
Prerendered 706 SEO HTML routes.
```

No apareció `Skipping marketing CMS overrides: TypeError: fetch failed`.

### Auditorías obligatorias

```txt
npm run marketing:routes:audit
{
  "ok": true,
  "checkedRoutes": 700,
  "mismatches": 0,
  "sampleMismatches": []
}
```

```txt
npm run marketing:faqs:audit
{
  "ok": true,
  "expectedUrls": 700,
  "urlsWithFaqs": 700,
  "missingFaqs": 0,
  "sampleMissingFaqs": []
}
```

```txt
npm run cms:links:audit
{
  "ok": true,
  "mode": "audit",
  "staleLinks": [],
  "invalidLinks": [],
  "fixes": []
}
```

```txt
npm run cms:assets:audit
{
  "ok": true,
  "expectedUrls": 700,
  "productUrls": 180,
  "heroImages": 195,
  "ogImages": 195,
  "productDatasheets": 180,
  "productHeroFiles": 180,
  "productDatasheetFiles": 180,
  "productAssetReady": 180,
  "missingProductAssets": 0,
  "sampleMissingProductAssets": []
}
```

```txt
npm run claims:audit
Product naming review warnings:
- components/EnumeraModal.tsx:60 [enumera_entero100_mapping_review] Review Entero100 parameter mapping against the approved product master.
- utils/marketingOverrideNormalize.js:63 [enumera_coli100_mapping_review] Review Coli100 copy if it is mapped to enterococci instead of E. coli and total coliforms.
- utils/marketingOverrideNormalize.js:68 [enumera_entero100_mapping_review] Review Entero100 parameter mapping against the approved product master.
OK product claim audit (118 files scanned)
```

Los avisos de `claims:audit` son conocidos y no bloquean el build.

### Build final

```txt
npm run build
✓ built in 30.85s
Prerendered 706 SEO HTML routes.
```

No reapareció `Skipping marketing CMS overrides: TypeError: fetch failed`; en esta medición no fue reproducible.

## 6. Prerender y rutas SEO

`MARKETING_ROUTE_INDEX`:

```json
{
  "total": 700,
  "counts": {
    "products": 180,
    "platform": 10,
    "partners": 10,
    "industries": 50,
    "resources": 95,
    "company": 10,
    "glossary": 345
  }
}
```

Se verificó existencia en `dist` y 1 H1 en:

- `/`
- `/es`
- `/es/productos`
- `/es/productos/enumera`
- `/es/plataforma`
- `/es/saas/plataforma-lims-biotech`
- `/es/distribuidores`
- `/es/oem-kits-analisis-agua`
- `/es/sobre-nosotros`
- `/es/contacto`
- `/es/industrias`
- `/es/industrias/laboratorios-analisis-agua`
- `/es/recursos`
- `/es/recursos/excel-a-lims-analisis-agua`
- `/es/glosario`
- `/es/glosario/bacteriofago`
- `/fr/produits`
- `/it/prodotti`
- `/ca/productes`

## 7. HTML inicial de home

Archivos revisados:

- `dist/index.html`
- `dist/es/index.html`
- `dist/en/index.html`

Resultado:

- Sin `modulepreload` hacia `MarketingRoutePage`.
- Sin `modulepreload` hacia `LegacyMarketingRoute`.
- Sin `modulepreload` hacia `marketingPages`.
- Sin `modulepreload` hacia `MarketingPageDocument`.
- Sin `modulepreload` hacia `resourcePages`.
- Sin `modulepreload` hacia `glossaryPages`.
- Sin `modulepreload` hacia `DistributorsGlobe`.
- Script directo esperado: `/assets/index-YID4mTOt.js`.
- JSON-LD `home-graph` presente con `Organization`, `WebSite`, `WebPage`, `ItemList` y `FAQPage`.

## 8. Medición de red: carga directa + 5 segundos idle

Medido con preview local + Chrome/CDP.

| Ruta | JS transfer aprox. | Chunks principales | Legacy | Observación |
| --- | ---: | --- | --- | --- |
| `/` | 131.8 KB | `index`, `Footer` | No | Home no carga rutas internas |
| `/es` | 131.8 KB | `index`, `Footer` | No | Home ES no carga rutas internas |
| `/es/productos` | 129.2 KB | `index` | No | Prerender directo no pidió lazy chunk en esta medición; SPA sí valida products |
| `/es/productos/enumera` | 129.2 KB | `index` | No | Igual que products directo |
| `/es/plataforma` | 226.7 KB | `index`, `supabase`, `platformPages`, `createCommercial`, `OEMKitsLanding` | No | Platform aislado |
| `/es/distribuidores` | 250.8 KB | `index`, `supabase`, `partnerPages`, `createCommercial`, `OEMKitsLanding` | No | Sin `DistributorsGlobe` temprano |
| `/es/industrias` | 392.6 KB | `index`, `industryPages`, `IndustriesHubLanding` | No | Industries aislado |
| `/es/recursos` | 343.5 KB | `index`, `resourcePages`, `ResourcesMarketingRoute`, `ResourcesHubLanding` | No | Resources aislado |
| `/es/recursos/excel-a-lims-analisis-agua` | 343.5 KB | `index`, `resourcePages`, `ResourcesMarketingRoute`, `ResourcesHubLanding` | No | Recurso individual aislado |
| `/es/glosario` | 223.8 KB | `index`, `glossaryPages`, `GlossaryMarketingRoute`, `GlossaryLanding` | No | Glossary aislado |
| `/es/glosario/bacteriofago` | 223.8 KB | `index`, `glossaryPages`, `GlossaryMarketingRoute`, `GlossaryLanding` | No | Término aislado |

No aparecieron:

- `LegacyMarketingRoute`
- `marketingPages`
- `MarketingPageDocument` legacy
- `DistributorsGlobe`
- chunks de familias cruzadas fuera de su familia

## 9. Medición de red: navegación SPA desde `/es`

| Navegación | JS transfer aprox. | Chunks nuevos | Resultado |
| --- | ---: | --- | --- |
| `/es` → `/es/productos` | 52.9 KB | `productPages`, `ProductHubLanding`, `ProductsMarketingRoute`, normalizador ligero | OK, sin legacy |
| `/es` → `/es/productos/enumera` | 52.9 KB | `productPages`, `ProductHubLanding`, `ProductsMarketingRoute`, normalizador ligero | OK, sin legacy |
| `/es` → `/es/plataforma` | 94.9 KB | `platformPages`, `supabase`, `OEMKitsLanding`, `createCommercial` | OK, sin legacy |
| `/es` → `/es/distribuidores` | 119.0 KB | `partnerPages`, `supabase`, `OEMKitsLanding`, `createCommercial` | OK, sin legacy y sin globo temprano |
| `/es` → `/es/industrias` | 260.7 KB | `industryPages`, `IndustriesHubLanding` | OK, sin legacy |
| `/es` → `/es/recursos` | 211.7 KB | `resourcePages`, `ResourcesMarketingRoute`, `ResourcesHubLanding` | OK, sin legacy/glossary |
| `/es` → `/es/glosario` | 223.8 KB | `glossaryPages`, `GlossaryMarketingRoute`, `GlossaryLanding` | OK, sin legacy/resources |

## 10. Criterios de éxito

| Criterio | Estado |
| --- | --- |
| Home no descarga rutas internas tras 5 segundos idle | OK |
| Products solo descarga chunks de products | OK en navegación SPA; directo prerender no descargó chunks extra |
| Platform solo descarga platform/commercial | OK |
| Partners/distribuidores solo descarga partners/commercial | OK |
| Company solo descarga company/commercial | No medido en red en esta ronda, pero prerender y split previo siguen OK |
| Industries solo descarga industries | OK |
| Resources solo descarga resources/whitepapers | OK |
| Glossary solo descarga glossary | OK |
| `DistributorsGlobe` no se descarga temprano | OK |
| `LegacyMarketingRoute` no se descarga en rutas públicas normales | OK |
| `marketingPages` legacy no se descarga en rutas públicas normales | OK |
| Sin pantalla blanca al navegar | OK en navegación CDP |
| Prerender y auditorías siguen OK | OK |

## 11. Lighthouse

Lighthouse no está instalado localmente y no se instaló, siguiendo la restricción de no añadir herramientas sin permiso.

Comandos sugeridos para ejecutar manualmente si se instala Lighthouse:

```bash
npx lighthouse http://127.0.0.1:4174/ --preset=desktop --output=html --output-path=./lighthouse-home-desktop.html
npx lighthouse http://127.0.0.1:4174/es --preset=desktop --output=html --output-path=./lighthouse-es-desktop.html
npx lighthouse http://127.0.0.1:4174/es/productos --preset=desktop --output=html --output-path=./lighthouse-productos-desktop.html
npx lighthouse http://127.0.0.1:4174/es/plataforma --preset=desktop --output=html --output-path=./lighthouse-plataforma-desktop.html
npx lighthouse http://127.0.0.1:4174/es/industrias --preset=desktop --output=html --output-path=./lighthouse-industrias-desktop.html
npx lighthouse http://127.0.0.1:4174/es/recursos --preset=desktop --output=html --output-path=./lighthouse-recursos-desktop.html
npx lighthouse http://127.0.0.1:4174/es/glosario --preset=desktop --output=html --output-path=./lighthouse-glosario-desktop.html
npx lighthouse http://127.0.0.1:4174/es/distribuidores --preset=desktop --output=html --output-path=./lighthouse-distribuidores-desktop.html
```

Para mobile, repetir con:

```bash
--preset=experimental
```

o usar PageSpeed Insights contra producción después de deploy.

## 12. Coverage

Se intentó medir JS coverage mediante Chrome DevTools Protocol en:

- `/es`
- `/es/productos`
- `/es/recursos`
- `/es/glosario`

El resultado bruto no fue fiable porque la agregación de rangos V8 devolvió `usedKB` superior a `totalKB` en algunos scripts, señal de solapamiento/doble conteo en rangos. Por tanto, no se usa para decisiones.

Recomendación: usar DevTools Coverage manual o Lighthouse para estimar unused JavaScript antes de una fase de micro-optimización.

## 13. Riesgos pendientes

| Riesgo | Estado | Recomendación |
| --- | --- | --- |
| `resourcePages` grande | 836K disco / 183.8 KB transfer medido | No bloqueante. Futuro split hub/detail o markdown por artículo. |
| `industryPages` grande | 588K disco / 170.6 KB transfer medido | No bloqueante. Futuro split hub/sector si Lighthouse lo justifica. |
| `glossaryPages` grande | 472K disco / 71.4 KB transfer medido | No bloqueante. Futuro split hub/term si el glosario crece más. |
| `DistributorsGlobe` grande | 1.7M disco | Correctamente lazy en mediciones. Mantener vigilancia. |
| `index` main bundle | 428K disco / 129.2 KB transfer | Candidato a revisión futura de dependencias globales y home. |
| `supabase` en platform/partners | 45.1 KB transfer | Revisar en fase futura si esas rutas necesitan cliente runtime. |
| Warnings `claims:audit` | 3 avisos conocidos | Revisar copy técnico/product master, no bloquea performance. |
| Warning CMS fetch | No reproducible en esta ronda | Tratar como transitorio salvo que reaparezca. |

## 14. Recomendación de siguiente fase

No recomiendo bloquear deploy por más optimización de bundles. El split real está conseguido para las familias medidas y no hay señales de carga temprana del legacy pesado.

Opciones futuras, por prioridad:

1. Medir Lighthouse/PageSpeed en producción después del deploy.
2. Si `resourcePages` penaliza `/es/recursos`, dividir resources hub vs artículo/whitepaper.
3. Si `glossaryPages` penaliza `/es/glosario`, dividir glossary hub vs término.
4. Revisar por qué `supabase` se carga en platform/partners si no hay necesidad interactiva inmediata.
5. Mantener `DistributorsGlobe` lazy; solo optimizarlo si aparece en una interacción crítica o en Lighthouse.
6. Auditar `index` main bundle si la home mobile sigue marcando TBT/INP alto.

## 15. Veredicto

Listo para deploy.

El split fue real, no solo un cambio de nombres de chunks: las rutas medidas cargan sus familias aisladas y no descargan `LegacyMarketingRoute` ni `marketingPages` legacy en condiciones normales.
