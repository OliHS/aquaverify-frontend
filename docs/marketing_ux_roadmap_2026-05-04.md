# Roadmap Marketing y UX B2B

Fecha: 2026-05-04

Objetivo: convertir `aquaverify.com` en un site B2B orientado a captacion organica, distribuidores, laboratorios, empresas que necesitan analisis de calidad del agua y empresas biotech que buscan una plataforma SaaS todo en uno.

## Estado de Implementacion

Actualizado: 2026-05-04.

- Home, productos, industrias, OEM/distribuidores, SaaS, `Sobre nosotros`, sitemap, hreflang, canonical, JSON-LD y CMS de paginas marketing: implementado.
- Recursos tecnicos evergreen: implementados 6 articulos mas hub de recursos en 5 idiomas.
- Atribucion web corporativa -> plataforma/CRM y mensaje AquaChat Sales para nuevos signup: implementado.
- Analitica CRO first-party con consentimiento para page views, clicks a plataforma, cambios de idioma y acciones de distribuidores: implementado.
- Pendiente principal: validar claims/naming con equipo tecnico/legal, enriquecer contenido con assets reales, crear dashboard CRM de reporting y seguir limpiando el pipeline CI/CD de plataforma.

## Decision Estrategica

AquaVerify no debe posicionarse solo como "water testing" o solo como "LIMS". La propuesta ganadora es:

> Productos de microbiologia del agua con trazabilidad digital integrada.

La historia comercial debe conectar tres ofertas:

- Productos AquaVerify: ENUMERA, INDICA, Standard ISO/EPA Kits y Lab Essentials.
- Distribucion y OEM: la misma tecnologia disponible para distribuidores bajo marca AquaVerify u OEM.
- Plataforma digital: acceso a AquaVerify Cloud incluido/conectado al uso de productos, y tambien disponible como SaaS para biotech/laboratorios.

## Buyer Personas

1. Laboratorios de analisis de agua, publicos o privados.
   - Buscan kits fiables, metodologia clara, capacidad, trazabilidad, informes y eficiencia operativa.
   - CTA principal: solicitar cotizacion de productos / solicitar demo de flujo digital.

2. Distribuidores de material cientifico o diagnostico.
   - Buscan ampliar catalogo, diferenciacion, soporte, margen, recurrencia y marca blanca.
   - CTA principal: convertirse en distribuidor / hablar de OEM.

3. Empresas que necesitan control de calidad del agua.
   - Food & beverage, utilities, industria, facilities, hoteles, real estate, salud ambiental.
   - CTA principal: pedir recomendacion de solucion / encontrar laboratorio o distribuidor.

4. Empresas biotech o laboratorios que necesitan SaaS.
   - Buscan CRM, LIMS, trazabilidad, reporting, work management, portal cliente, inventario y compliance.
   - CTA principal: solicitar demo SaaS.

## Arquitectura URL Recomendada

La home debe seguir existiendo, pero el crecimiento SEO vendra de paginas indexables por producto, solucion, industria y recurso tecnico.

### Ingles

- `/`
- `/products`
- `/products/enumera`
- `/products/enumera-soma100`
- `/products/enumera-coli100`
- `/products/enumera-entero100`
- `/products/indica`
- `/products/standard-iso-epa-kits`
- `/products/lab-essentials`
- `/platform`
- `/saas/biotech-lims-platform`
- `/oem-water-testing-kits`
- `/distributors`
- `/industries/water-testing-laboratories`
- `/industries/water-quality-control`
- `/resources`
- `/resources/iso-10705-2-somatic-coliphages`
- `/resources/epa-1602-coliphage-testing`
- `/resources/coliphages-water-quality-indicators`
- `/resources/presence-absence-vs-enumeration`
- `/resources/water-sample-digital-traceability`
- `/resources/water-testing-kit-distributor-checklist`
- `/about`
- `/contact`

### Espanol de Espana

- `/es`
- `/es/productos`
- `/es/productos/enumera`
- `/es/productos/enumera-soma100`
- `/es/productos/enumera-coli100`
- `/es/productos/enumera-entero100`
- `/es/productos/indica`
- `/es/productos/kits-iso-epa`
- `/es/productos/lab-essentials`
- `/es/plataforma`
- `/es/saas/plataforma-lims-biotech`
- `/es/oem-kits-analisis-agua`
- `/es/distribuidores`
- `/es/industrias/laboratorios-analisis-agua`
- `/es/industrias/control-calidad-agua`
- `/es/recursos`
- `/es/recursos/iso-10705-2-colifagos-somaticos`
- `/es/recursos/epa-1602-colifagos`
- `/es/recursos/colifagos-indicadores-calidad-agua`
- `/es/recursos/presencia-ausencia-vs-enumeracion`
- `/es/recursos/trazabilidad-digital-muestras-agua`
- `/es/recursos/checklist-distribuidores-kits-analisis-agua`
- `/es/sobre-nosotros`
- `/es/contacto`

### Frances

- `/fr`
- `/fr/produits`
- `/fr/produits/enumera`
- `/fr/produits/indica`
- `/fr/produits/kits-iso-epa`
- `/fr/produits/lab-essentials`
- `/fr/plateforme`
- `/fr/saas/plateforme-lims-biotech`
- `/fr/oem-kits-analyse-eau`
- `/fr/distributeurs`
- `/fr/industries/laboratoires-analyse-eau`
- `/fr/ressources`
- `/fr/ressources/iso-10705-2-coliphages-somatiques`
- `/fr/ressources/epa-1602-coliphages`
- `/fr/ressources/coliphages-indicateurs-qualite-eau`
- `/fr/ressources/presence-absence-vs-denombrement`
- `/fr/ressources/tracabilite-numerique-echantillons-eau`
- `/fr/ressources/checklist-distributeurs-kits-analyse-eau`
- `/fr/a-propos`
- `/fr/contact`

### Italiano

- `/it`
- `/it/prodotti`
- `/it/prodotti/enumera`
- `/it/prodotti/indica`
- `/it/prodotti/kit-iso-epa`
- `/it/prodotti/lab-essentials`
- `/it/piattaforma`
- `/it/saas/piattaforma-lims-biotech`
- `/it/oem-kit-analisi-acqua`
- `/it/distributori`
- `/it/settori/laboratori-analisi-acqua`
- `/it/risorse`
- `/it/risorse/iso-10705-2-colifagi-somatici`
- `/it/risorse/epa-1602-colifagi`
- `/it/risorse/colifagi-indicatori-qualita-acqua`
- `/it/risorse/presenza-assenza-vs-enumerazione`
- `/it/risorse/tracciabilita-digitale-campioni-acqua`
- `/it/risorse/checklist-distributori-kit-analisi-acqua`
- `/it/chi-siamo`
- `/it/contatto`

### Catalan

- `/ca`
- `/ca/productes`
- `/ca/productes/enumera`
- `/ca/productes/indica`
- `/ca/productes/kits-iso-epa`
- `/ca/productes/lab-essentials`
- `/ca/plataforma`
- `/ca/saas/plataforma-lims-biotech`
- `/ca/oem-kits-analisi-aigua`
- `/ca/distribuidors`
- `/ca/sectors/laboratoris-analisi-aigua`
- `/ca/recursos`
- `/ca/recursos/iso-10705-2-colifags-somatics`
- `/ca/recursos/epa-1602-colifags`
- `/ca/recursos/colifags-indicadors-qualitat-aigua`
- `/ca/recursos/presencia-absencia-vs-enumeracio`
- `/ca/recursos/tracabilitat-digital-mostres-aigua`
- `/ca/recursos/checklist-distribuidors-kits-analisi-aigua`
- `/ca/sobre-nosaltres`
- `/ca/contacte`

## Es Importante Tener "Sobre Nosotros"?

Si. No sera la pagina que mas trafico organico genere, pero es importante para confianza B2B, distribuidores, laboratorios publicos, compras tecnicas y validacion de marca.

Debe existir una URL indexable:

- Ingles: `/about`
- Espanol: `/es/sobre-nosotros`
- Frances: `/fr/a-propos`
- Italiano: `/it/chi-siamo`
- Catalan: `/ca/sobre-nosaltres`

Contenido recomendado:

- Quienes somos.
- Mision: hacer verificable la calidad del agua con productos y datos trazables.
- Origen cientifico/biotecnologico.
- Relacion producto + plataforma.
- Compromiso con laboratorios, distribuidores e industria.
- Calidad, cumplimiento y soporte tecnico.
- Red de partners y vision internacional.
- CTA: hablar con AquaVerify / convertirse en partner / solicitar demo.

La pagina debe estar en footer y en una seccion "Company". No es necesario que ocupe espacio principal en la navegacion si eso compite con Products, Platform y OEM.

## Roadmap de Implementacion

### Fase 0 - Validacion de Producto y Claims

Duracion estimada: 1-2 dias.

Tareas:

- Validar naming exacto de productos del documento de gama.
- Resolver la posible confusion en el DOCX:
  - `ENUMERAColi100` aparece descrito como Enterococci.
  - `ENUMERAEntero100` aparece descrito como E. coli y coliformes totales.
- Definir que claims son comerciales y cuales pueden ser regulatorios.
- Validar si se pueden mencionar ISO/EPA como "according to", "based on", "compatible with" o "for use with".
- Recopilar fotos reales, renders, datasheets, certificados, manuales y packaging.

Criterio de cierre:

- Tabla maestra aprobada con familia, subfamilia, nombre, descripcion, metodo, parametros, uso, CTA y restricciones de claim.

### Fase 1 - Reposicionamiento de Home

Duracion estimada: 3-5 dias.

Tareas:

- Reescribir H1, subtitulo, claims y CTAs.
- Cambiar la home para que segmente por comprador en el primer scroll.
- Sustituir "Safe Water for a better World" por un H1 comercial mas especifico.
- Limpiar CMS: eliminar textos de prueba, imagenes heredadas y bloques genericos.
- Ajustar CTAs con intents CRM:
  - `quote`
  - `demo`
  - `oem`
  - `distributor`
  - `saas`
  - `contact`

Estructura recomendada de home:

1. Hero: productos de microbiologia del agua + plataforma digital.
2. Selector de perfil: laboratorio, distribuidor, empresa, biotech SaaS.
3. Gama AquaVerify: ENUMERA, INDICA, Standard ISO/EPA, Lab Essentials.
4. Plataforma conectada a productos.
5. OEM y distribuidores.
6. Industrias.
7. Recursos tecnicos.
8. CTA final segmentado.

Criterio de cierre:

- Home clara en menos de 5 segundos.
- Cada CTA llega a plataforma con intent correcto.
- SEO title y meta description alineados con el nuevo posicionamiento.

### Fase 2 - Paginas Indexables de Producto

Duracion estimada: 1-2 semanas.

Tareas:

- Crear rutas publicas SEO para familias y productos.
- Evitar que la informacion critica viva solo en modales.
- Ampliar modelo CMS/productos:
  - slug por idioma
  - meta title
  - meta description
  - H1
  - parametro analitico
  - metodo asociado
  - formato
  - volumen de muestra
  - CTA principal
  - FAQ
  - datasheet
  - imagen OG
- Generar sitemap dinamico.
- Generar JSON-LD:
  - Product
  - Organization
  - FAQPage
  - BreadcrumbList

Criterio de cierre:

- Cada familia/producto prioritario tiene URL indexable.
- Cada URL tiene title/meta/canonical/hreflang.
- El sitemap incluye todas las rutas.

### Fase 3 - Contenido Multilingue

Duracion estimada: 1-2 semanas para primera version.

Idiomas obligatorios:

- Espanol de Espana
- Ingles
- Frances
- Italiano
- Catalan

Proceso recomendado:

1. Crear master copy tecnico en Espanol de Espana.
2. Traducir/adaptar a Ingles para mercado internacional.
3. Localizar a Frances, Italiano y Catalan.
4. Revisar glosario tecnico para que no haya inconsistencias.

Glosario base:

- Water microbiology: microbiologia del agua / microbiologie de l'eau / microbiologia dell'acqua / microbiologia de l'aigua.
- Somatic coliphages: colifagos somaticos / coliphages somatiques / colifagi somatici / colifags somatics.
- Presence/absence: presencia/ausencia / presence/absence / presenza/assenza / presencia/absencia.
- Enumeration: enumeracion / enumeration / enumerazione / enumeracio.
- Water quality control: control de calidad del agua / controle qualite de l'eau / controllo qualita dell'acqua / control de qualitat de l'aigua.
- Traceability: trazabilidad / tracabilite / tracciabilita / tracabilitat.
- Distributor: distribuidor / distributeur / distributore / distribuïdor.
- OEM / white label: OEM / marque blanche / private label / marca blanca.

Criterio de cierre:

- No hay mezcla de idiomas en componentes, CMS ni botones.
- Cada idioma tiene URLs propias y `hreflang`.
- Los CTAs mantienen el mismo intent de CRM en todos los idiomas.

### Fase 4 - Funnel OEM y Distribuidores

Duracion estimada: 3-5 dias.

Tareas:

- Crear landing especifica OEM/distribuidores.
- Explicar dos modelos:
  - AquaVerify branded distribution.
  - OEM / white label.
- Mostrar beneficios:
  - catalogo listo para vender
  - productos + plataforma digital
  - soporte tecnico
  - recurrencia por consumibles
  - onboarding y formacion
  - posibilidad de territorio o partner local
- Crear formulario/CTA con preguntas utiles:
  - pais
  - tipo de empresa
  - portfolio actual
  - interes en marca AquaVerify u OEM
  - volumen estimado
  - canal de venta

Criterio de cierre:

- Todo lead OEM/distributor entra en CRM con intent, pais, campana, URL origen y mensaje AquaChat Sales.

### Fase 5 - Funnel Plataforma y SaaS Biotech

Duracion estimada: 3-5 dias.

Tareas:

- Separar dos mensajes:
  - Plataforma incluida/conectada a productos AquaVerify.
  - Plataforma SaaS independiente para biotech/labs.
- Crear pagina SaaS con modulos:
  - CRM
  - LIMS
  - Work
  - Inventory/WMS
  - Finance
  - Portal cliente
  - Reporting/compliance
- Mostrar screenshots reales de plataforma.
- CTA: solicitar demo SaaS.

Criterio de cierre:

- El usuario entiende que AquaVerify vende productos fisicos y una plataforma digital, y que la plataforma tambien puede contratarse como SaaS.

### Fase 6 - Recursos SEO Tecnicos

Duracion inicial: 1 semana. Luego continuo.

Primeros recursos recomendados:

- Guia ISO 10705-2 para colifagos somaticos.
- Guia EPA 1602 para colifagos.
- Por que los colifagos son indicadores virales en agua.
- Presencia/ausencia vs enumeracion en microbiologia del agua.
- Como digitalizar la trazabilidad de muestras de agua.
- Checklist para distribuidores de kits de analisis de agua.

Criterio de cierre:

- Minimo 6 articulos evergreen publicados.
- Cada articulo enlaza a productos y CTAs relevantes.
- Cada articulo tiene FAQ schema.

### Fase 7 - Confianza y Prueba Comercial

Duracion estimada: 3-5 dias.

Tareas:

- Crear `Sobre nosotros`.
- Crear pagina de calidad/soporte tecnico si hay contenido suficiente.
- Crear FAQs comerciales y tecnicas.
- Preparar casos de uso:
  - laboratorio privado
  - laboratorio publico
  - distribuidor
  - industria con control de calidad de agua
  - biotech SaaS
- Preparar landing "Compare AquaVerify" solo si se puede hacer sin claims agresivos contra competidores.

Criterio de cierre:

- Un comprador tecnico puede validar rapidamente quien es AquaVerify, que vende, para quien sirve y como pedir informacion.

### Fase 8 - Analitica y CRO

Duracion estimada: 2-3 dias.

Tareas:

- Medir eventos respetando consentimiento de cookies.
- Eventos recomendados:
  - CTA click
  - language switch
  - product view
  - datasheet click
  - quote start
  - signup complete
  - distributor country search
  - OEM form start
- Enviar UTMs e intent a plataforma.
- Crear dashboard CRM por fuente, idioma, pais, producto e intent.

Criterio de cierre:

- Se puede saber que paginas generan leads y que segmento convierte mejor.

### Fase 9 - SEO Tecnico y Renderizado

Duracion estimada: 3-7 dias segun alcance.

Tareas:

- Evaluar prerender/SSG para paginas publicas.
- Asegurar que contenido critico no dependa solo de modales o carga client-side.
- Sitemap dinamico.
- Robots correcto.
- Canonicals por idioma.
- OG images especificas por familia/producto.
- Breadcrumbs.
- Performance por pagina.

Criterio de cierre:

- Paginas comerciales y tecnicas son rastreables, indexables y rapidas.

## Contenido a Producir

### Home

- H1, subtitulo, 3 CTAs.
- Bloque "elige tu perfil".
- Resumen de gama.
- Resumen plataforma.
- Resumen OEM.
- Industrias.
- Recursos.
- CTA final.

### Producto

Para cada familia:

- Descripcion comercial.
- Para quien es.
- Parametros/microorganismos.
- Metodo o referencia.
- Beneficios operativos.
- Productos incluidos.
- CTA.
- FAQ.

Familias prioritarias:

- ENUMERA
- INDICA
- Standard ISO/EPA Kits
- Lab Essentials
- OEM / White Label

### Producto Individual

Para cada producto prioritario:

- H1.
- Descripcion corta.
- Uso principal.
- Formato.
- Metodo relacionado.
- Volumen.
- Beneficios.
- Especificaciones.
- Productos relacionados.
- FAQ.
- CTA.

### OEM / Distribuidores

- Hero.
- Modelos de colaboracion.
- Beneficios para distribuidor.
- Beneficios para cliente final.
- Plataforma incluida.
- Proceso de onboarding.
- FAQ.
- CTA.

### SaaS

- Hero.
- Modulos.
- Casos de uso.
- Diferencia entre plataforma conectada a productos y SaaS independiente.
- Screenshots.
- FAQ.
- CTA demo.

### Sobre Nosotros

- Quienes somos.
- Vision.
- Ciencia y tecnologia.
- Productos + plataforma.
- Partners.
- Calidad y soporte.
- CTA.

## Orden Recomendado

1. Validar naming y claims.
2. Reescribir home.
3. Crear nueva estructura CMS/productos.
4. Crear rutas SEO para productos y familias.
5. Crear contenido en Espanol e Ingles.
6. Traducir/localizar Frances, Italiano y Catalan.
7. Publicar OEM y SaaS.
8. Publicar recursos tecnicos.
9. Activar analitica avanzada y dashboard CRM.

## Riesgos

- Publicar claims ISO/EPA sin validacion legal o tecnica.
- Mantener productos importantes solo en modales.
- Crear muchas URLs sin contenido suficiente.
- Traducir literalmente sin adaptar terminos tecnicos.
- Mezclar mensajes de producto fisico y SaaS sin segmentacion.

## Proximo Sprint Recomendado

Sprint 1: reposicionamiento y arquitectura.

Entregables:

- Nuevo H1 y hero en 5 idiomas.
- Nuevo mapa de navegacion.
- Nuevos slugs por idioma.
- Tabla maestra de productos.
- Wireframe textual de home.
- Definicion tecnica de rutas SEO y modelo CMS.

Despues de ese sprint se puede empezar la implementacion real sin improvisar contenido ni romper el CMS.
