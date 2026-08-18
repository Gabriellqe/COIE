---
type: epic-index
status: active
updated: 2026-08-12
---

# Épicas

## Mapa

| ID | Épica | Resultado | Prioridad MVP | Depende de |
|---|---|---|---|---|
| EPIC-01 | Data Acquisition | evidencia externa canónica y trazable | P0 | Foundation |
| EPIC-02 | Product Intelligence | identidad y variantes normalizadas | P0 | EPIC-01 |
| EPIC-03 | Market Intelligence | precio, demanda y competencia | P0 | EPIC-01, EPIC-02 |
| EPIC-04 | Resale Intelligence | ranking de oportunidades usadas | P0 | EPIC-03, EPIC-08 |
| EPIC-05 | Replenishment Intelligence | recurrencia y ecosistemas | P1 | EPIC-02, EPIC-03 |
| EPIC-06 | Niche Discovery | candidatos de nicho priorizados | P2 | EPIC-03, EPIC-05 |
| EPIC-07 | Sourcing Intelligence | ofertas y landed cost | P0/P1 | EPIC-02 |
| EPIC-08 | Opportunity Scoring | ranking explicable y versionado | P0 | EPIC-03, EPIC-07 |
| EPIC-09 | Experimentation | pruebas y resultados medibles | P1 | EPIC-08 |
| EPIC-10 | Learning | calibración con resultados reales | P2 | EPIC-09 |

## EPIC-01 — Data Acquisition

**Problema:** la evidencia está distribuida y cambia con el tiempo.

**Objetivo:** incorporar datos permitidos mediante conectores reemplazables, preservando fuente, fecha, histórico y errores.

**Incluye:** contrato de conector, capturas, validación, deduplicación, idempotencia, observabilidad y carga manual estructurada.

**Criterio de salida:** una ejecución reproducible incorpora observaciones de al menos una fuente real autorizada y fixtures de ejemplo sin duplicar ni sobrescribir historia.

## EPIC-02 — Product Intelligence

**Problema:** títulos y catálogos distintos describen el mismo producto o variantes incompatibles.

**Objetivo:** crear identidades canónicas con aliases, atributos, condición y confianza de coincidencia.

**Incluye:** normalización, resolución, revisión de coincidencias ambiguas y fusión auditable.

**Criterio de salida:** publicaciones comparables se asignan correctamente a producto/variante y las ambigüedades no se fusionan en silencio.

## EPIC-03 — Market Intelligence

**Problema:** un precio aislado no representa valor de mercado ni liquidez.

**Objetivo:** estimar precio, demanda, oferta y competencia con ventanas, cobertura y limitaciones visibles.

**Incluye:** conjuntos comparables, estadísticas robustas, segmentación por condición, señales y frescura.

**Criterio de salida:** un producto muestra referencias, media, mediana, rango, dispersión, muestra, fuente y estimaciones explicadas.

## EPIC-04 — Resale Intelligence

**Problema:** revisar manualmente artículos usados infravalorados no escala.

**Objetivo:** evaluar compra, valor realizable, contribución, velocidad y riesgo de oportunidades `RESALE`.

**Criterio de salida:** una oportunidad puede analizarse, compararse, preseleccionarse o rechazarse con razones y límites de prueba.

## EPIC-05 — Replenishment Intelligence

**Problema:** productos de reposición atractivos requieren comprender recurrencia, base instalada y compatibilidad.

**Objetivo:** evaluar consumibles/repuestos y su demanda recurrente dentro de un ecosistema.

**Incluye:** `ProductEcosystem`, `BaseProduct`, intervalo de reposición, compatibilidad y scores específicos.

**Criterio de salida:** una oportunidad `REPLENISHMENT` explica recurrencia, cobertura compatible, economía y riesgos.

## EPIC-06 — Niche Discovery

**Problema:** las mejores oportunidades pueden estar en nichos no evidentes.

**Objetivo:** proponer y priorizar nichos con demanda, recurrencia, competencia favorable y profundidad de catálogo.

**Criterio de salida:** un candidato de nicho tiene hipótesis, evidencia, `NicheScore`, productos iniciales y plan de investigación.

## EPIC-07 — Sourcing Intelligence

**Problema:** precio de proveedor sin logística, MOQ, impuestos y confiabilidad produce márgenes ficticios.

**Objetivo:** comparar ofertas y calcular landed cost con supuestos trazables.

**Criterio de salida:** cada escenario económico relevante identifica oferta, moneda, cantidad, costos, lead time y riesgos.

## EPIC-08 — Opportunity Scoring

**Problema:** oportunidades heterogéneas no son comparables y los rankings opacos inducen falsa precisión.

**Objetivo:** normalizar indicadores y producir score, riesgo, confianza, cobertura, gates y explicación versionados.

**Criterio de salida:** los mismos inputs/versión reproducen el resultado y cada recomendación expone factores dominantes y faltantes.

## EPIC-09 — Experimentation

**Problema:** una investigación prometedora no demuestra demanda real.

**Objetivo:** diseñar pruebas acotadas y comparar predicción con resultado.

**Criterio de salida:** una oportunidad recorre `SHORTLISTED → TESTING → VALIDATED/REJECTED` con criterios previos, métricas y decisión.

## EPIC-10 — Learning

**Problema:** sin calibración, el sistema repite sesgos y errores.

**Objetivo:** medir error por cohorte y versionar mejoras de reglas y pesos.

**Criterio de salida:** existe suficiente historial, una evaluación retrospectiva y un cambio versionado que mejora métricas fuera de muestra.

## Reglas de gestión

- Una feature debe pertenecer a una épica.
- Una historia debe identificar resultado observable y criterios de aceptación.
- Una épica no se cierra por cantidad de tareas, sino por su criterio de salida.
- Cambios de alcance se reflejan en [[PRD]], [[ROADMAP]] y [[CHANGELOG]] cuando corresponda.
