# Workflow Advisor Agriculture Regression

Se incorporo una regresion real de agricultura para evitar salidas pobres como:
- `50 to 199 month`
- `connect water source to crop risk`
- `manage reclaimed water evidence`
- `improve audit evidence`
- `Screening INDICA`
- `module.crm`
- `product.indica-screening`

Fixture principal:
- `aquaverify-cloud/test-vectors/workflow-advisor/agriculture-water-report-v2.json`

Artefactos historicos conservados:
- `aquaverify-cloud/test-vectors/workflow-advisor/user-regression/agriculture-water-bad-output.json`
- `aquaverify-cloud/test-vectors/workflow-advisor/user-regression/agriculture-water-bad-output.pdf`

Salida esperada en ES:
- muestra `50-199 muestras/mes`
- explica que el metodo no esta definido
- no cierra recomendacion de producto
- evalua INDICA, ENUMERA, PLAQUE o kits ISO/EPA solo como candidatos a revision tecnica
- enlaza recursos sectoriales/glosario, no la pagina del diagnostico
