# Product Claims Registry

Fecha: 2026-05-04

Objetivo: mantener una tabla maestra de producto y claims para que la web corporativa pueda crecer en SEO sin publicar claims regulatorios, certificaciones o promesas tecnicas no aprobadas.

## Reglas de Wording Publico

- Usar: `oriented to`, `supports workflows using`, `for laboratories working with`, `method-aligned workflow`.
- Evitar hasta aprobacion tecnico/legal: `certified`, `ISO-compliant`, `EPA compliant`, `according to ISO/EPA`, `patented`, `guaranteed`, `fully compliant`.
- Las referencias ISO/EPA deben leerse como alineacion de workflow salvo aprobacion explicita por producto y mercado.
- Las fichas de producto deben separar claramente descripcion comercial, metodo objetivo, parametro, volumen y evidencia disponible.

## Bloqueos Activos

- Auditor automatico: `npm run claims:audit`.
- Auditor de contenido CMS vivo: `npm run cms:claims:audit`.
- Incluido en release local: `npm run check:local`.
- Escanea copy publico en `components`, `pages`, `utils`, `src`, `App.tsx`, `index.tsx` y metadatos prerender.
- Los editores de marketing, visual builder y productos bloquean guardado con wording sensible.
- La proyeccion publica del catalogo sanea terminos legacy de producto que aun estan protegidos por RLS en Supabase.

## Puntos a Validar

- `ENUMERAColi100` aparece en el documento de gama como "Enterocci in 100 mL of water".
- `ENUMERAEntero100` aparece en el documento de gama como "Escherichia coli and total coliforms in 100 mL of water".
- Antes de cerrar naming publico definitivo, confirmar si los nombres o las descripciones estan invertidos.
- Confirmar si se puede usar `Smart Cap`, `Smart Cap System` y cualquier claim de propiedad intelectual.

## Tabla Maestra Inicial

| Familia | Subfamilia | Producto | Descripcion fuente | Wording publico seguro | Estado |
| --- | --- | --- | --- | --- | --- |
| ENUMERA | ENUMERA KITS | ENUMERA Soma100 | Enumeration of somatic coliphages in 100 mL water | Quantitative kit for somatic coliphage enumeration workflows in 100 mL water samples. | Revisar evidencia |
| ENUMERA | ENUMERA KITS | ENUMERA Coli100 | Enumeration of Enterocci in 100 mL water | Quantitative kit for bacterial indicator enumeration workflows. Parameter mapping pending validation. | Naming/descripcion pendiente |
| ENUMERA | ENUMERA KITS | ENUMERA Entero100 | Enumeration of E. coli and total coliforms in 100 mL water | Quantitative kit for bacterial indicator enumeration workflows. Parameter mapping pending validation. | Naming/descripcion pendiente |
| ENUMERA | ENUMERA REFILL | Soma Bottle 100 | Bottle with MCB10 Medium | Refill bottle for ENUMERA Soma workflows. | Revisar evidencia |
| ENUMERA | ENUMERA REFILL | Coli Bottle 100 | Bottle with Coli Medium | Refill bottle for ENUMERA bacterial indicator workflows. | Revisar evidencia |
| ENUMERA | ENUMERA REFILL | Entero Bottle 100 | Bottle with Entero medium | Refill bottle for ENUMERA bacterial indicator workflows. | Revisar evidencia |
| ENUMERA | ENUMERA TOOLS | ENUMERA SEALER | Electronic device to seal ENUMERA Testing tray | Sealing device for ENUMERA testing trays. | Revisar assets |
| ENUMERA | ENUMERA TOOLS | ENUMERA Mould | Silicone shape for ENUMERA tray and SEALER | Silicone mould for consistent ENUMERA tray handling. | Revisar assets |
| ENUMERA | ENUMERA TOOLS | ENUMERA Comparator | Colorimetric comparator | Colorimetric comparator for threshold result reading. | Revisar assets |
| ENUMERA | ENUMERA TOOLS | ENUMERA Reader | Box to help picture purpose | Imaging support box for ENUMERA result capture. | Revisar descripcion |
| ENUMERA | ENUMERA TOOLS | ENUMERA Tray | ENUMERA testing tray | Testing tray for ENUMERA workflows. | Revisar assets |
| ENUMERA | ENUMERA TOOLS | ENUMERA MAT | Dark mat for picture purpose | Dark mat for consistent image capture. | Revisar assets |
| STANDARD KITS | ISO KITS | Plaque Soma 1ml | Somatic coliphages ISO 10705-2 DAL | Kit for laboratories working with ISO 10705-2 double agar layer workflows. | Validar wording ISO |
| STANDARD KITS | ISO KITS | Plaque Soma 100 ml | Somatic coliphages ISO 10705-2 SAL | Kit for laboratories working with single agar layer somatic coliphage workflows. | Validar wording ISO |
| STANDARD KITS | EPA KITS | Epa Soma | Somatic coliphages US-EPA 1602, 1642, 1643 | Kit for laboratories working with EPA-oriented somatic coliphage workflows. | Validar wording EPA |
| STANDARD KITS | EPA KITS | Epa F-Plus | F-specific coliphages US-EPA 1602, 1642, 1643 | Kit for laboratories working with EPA-oriented F-specific coliphage workflows. | Validar wording EPA |
| INDICA | INDICA KITS | Indica Soma | Soma presence/absence in 100 mL | Presence/absence kit for somatic coliphage screening workflows. | Revisar evidencia |
| INDICA | INDICA KITS | Indica Coli | E. coli presence/absence in 100 mL | Presence/absence kit for E. coli screening workflows. | Revisar evidencia |
| INDICA | INDICA KITS | Indica Entero | Entero presence/absence in 100 mL | Presence/absence kit for enterococci screening workflows. | Revisar evidencia |
| INDICA | INDICA TOOLS | Indica Match | Colorimetric comparator for SPA | Colorimetric comparator for INDICA workflows. | Revisar nombre legacy SPA |
| LAB ESSENTIALS | Culture Media & Reagents | MSA Semi solido | 100 mL ssMSA prepared | Prepared semi-solid MSA medium for lab workflows. | Revisar ficha |
| LAB ESSENTIALS | Culture Media & Reagents | MSA Plate | 90 mm plates containing MSA layer | Prepared MSA plates for lab workflows. | Revisar ficha |
| LAB ESSENTIALS | Culture Media & Reagents | MSB | Modified Scholten's Broth | Modified Scholten's Broth for microbiology workflows. | Revisar ficha |
| LAB ESSENTIALS | Culture Media & Reagents | MSA | Modified Scholten's Agar | Modified Scholten's Agar for microbiology workflows. | Revisar ficha |
| LAB ESSENTIALS | Biological Materials | Soma Control 1ml | Positive control for somatic coliphages | Positive control for somatic coliphage workflows. | Validar condiciones |
| LAB ESSENTIALS | Biological Materials | Soma Control 100ml | Positive control for somatic coliphages | Positive control for somatic coliphage workflows. | Validar condiciones |
| LAB ESSENTIALS | Biological Materials | WR5 | Bacterial host strain | Host strain for somatic coliphage workflows. | Validar condiciones |
| LAB ESSENTIALS | Biological Materials | GR8F | GR8 somatic coliphage filterable at -20 C | GR8 biological material for somatic coliphage workflows. | Validar condiciones |
| LAB ESSENTIALS | Biological Materials | Gr8F-Ultra | GR8 somatic coliphage filterable at -70 C | GR8 ultra-low-temperature biological material. | Validar condiciones |
| LAB ESSENTIALS | Biological Materials | Indica Control 100 | PHIX174 100 pfu/vial | PHIX174 control material for INDICA workflows. | Validar condiciones |
| LAB ESSENTIALS | Biological Materials | Indica Control 1000 | PHIX174 1000 pfu/vial | PHIX174 control material for INDICA workflows. | Validar condiciones |

## Assets Reales Necesarios

- Foto packshot de cada familia prioritaria.
- Foto o render de ENUMERA tray, sealer, comparator y reader.
- Imagen clara de flujo producto -> captura -> AquaVerify Cloud.
- Datasheet PDF por familia o producto prioritario.
- Certificados/validaciones/documentacion de metodo, si existen.

## Estado

- Public copy de la web ajustado a wording seguro el 2026-05-04.
- CMS auditado contra contenido vivo en Supabase; bloques editables de home limpiados el 2026-05-04.
- Pendiente operativo: corregir en admin autenticado los registros legacy de catalogo `Certified Standards`, `AquaVerify Academy` y `services.use_cases`.
- Falta aprobacion tecnico/legal final de naming, claims y referencias ISO/EPA.
