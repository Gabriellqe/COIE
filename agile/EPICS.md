---
type: epic-index
status: active
updated: 2026-08-19
---

# Épicas

## Mapa

| ID | Épica | Resultado | Horizonte | Depende de |
|---|---|---|---|---|
| EPIC-01 | Data Acquisition | evidencia externa canónica y permitida | A1 | Foundation |
| EPIC-02 | Product Intelligence | identidad/variantes normalizadas | A1 | EPIC-01 |
| EPIC-03 | Market Evidence | cohortes y MarketPriceEstimate | A1 | EPIC-01, EPIC-02 |
| EPIC-12 | Commercial Pricing | Quick/Target/Premium con suficiencia | A2 | EPIC-03 |
| EPIC-07 | Economics & Sourcing | Economics Core A2; sourcing completo B | A2/B | EPIC-02 |
| EPIC-08 | Opportunity Evaluation | score, riesgo, confianza, gates | A2 | EPIC-03, EPIC-07, EPIC-12 |
| EPIC-04 | Resale Decision | decisión de compra/reventa explicable | A2 | EPIC-08 |
| EPIC-09 | Experimentation | prueba Lite y resultados medibles | A3 | EPIC-04 |
| EPIC-05 | Replenishment Intelligence | recurrencia y ecosistemas | C | EPIC-02, EPIC-03, EPIC-07 |
| EPIC-14 | Product & Catalog Relations | relaciones, compatibilidad y bundles | C/D | EPIC-02 |
| EPIC-06 | Niche & Catalog Discovery | nichos/catálogo priorizados | D | EPIC-03, EPIC-05, EPIC-14 |
| EPIC-13 | Seasonality Intelligence | timing y preparación temporal | posterior | histórico suficiente |
| EPIC-10 | Learning | calibración con resultados reales | posterior | EPIC-09 |
| EPIC-11 | Platform Access | identidad/workspaces/RLS | soporte posterior | ADR-008 |

## EPIC-01 — Data Acquisition

Incorporar datos mediante carga manual o conectores permitidos, preservando fuente, fecha, método, histórico, idempotencia y errores.

**Salida A1:** carga manual estructurada y al menos una fuente real permitida o gate explícito.

## EPIC-02 — Product Intelligence

Resolver identidad, marca, modelo, variante, condición y aliases sin fusionar ambigüedades críticas.

**Salida A1:** publicaciones comparables asignadas al producto/variante correcto con confianza y revisión.

## EPIC-03 — Market Evidence

Construir cohortes comparables y `MarketPriceEstimate` sin confundir precio pedido con valor realizable.

**Salida A1:** muestra, estadísticas, fecha, cobertura, confianza, exclusiones y suficiencia reproducibles.

## EPIC-12 — Commercial Pricing

Separar escenarios `QUICK`, `TARGET`, `PREMIUM` y `MaximumBuyPrice` conforme a [[PRICING_MODEL]].

**Salida A2:** cada escenario se calcula con soporte o permanece desconocido con motivo; no publica ni compra.

## EPIC-07 — Economics & Sourcing

### Economics Core A2

Costos manuales, contribución, margen, ROI, reservas y máximo de compra.

### Sourcing Intelligence B

Proveedores, ofertas, MOQ, lead time, landed cost, rutas y sensibilidad.

**Salida:** escenarios económicos reproducibles sin costos desconocidos convertidos en cero.

## EPIC-08 — Opportunity Evaluation

Producir score, riesgo, confianza, cobertura, gates y explicación versionados. Los pesos iniciales permanecen `UNCALIBRATED`.

## EPIC-04 — Resale Decision

Evaluar una publicación/producto usado y decidir investigar, descartar, negociar externamente o preseleccionar una prueba.

**Salida A2:** decisión reproducible con evidencia, pricing, economía, liquidez, riesgo y límites.

## EPIC-09 — Experimentation

Congelar hipótesis/predicciones, aprobar una prueba acotada, registrar resultados y decidir validar, rechazar o modificar.

**Salida A3:** experimento Lite cerrado y comparado con benchmark.

## EPIC-05 — Replenishment Intelligence

Evaluar consumibles/repuestos mediante ciclo de reposición, base instalada, compatibilidad, demanda, economía y recurrencia.

## EPIC-14 — Product & Catalog Relations

Representar accesorios, consumibles, reemplazos, sustitutos, complementos y bundles con evidencia append-only. Compatibility conserva reglas especializadas.

## EPIC-06 — Niche & Catalog Discovery

Analizar nichos, profundidad de SKU, catálogo y bundles sin depender inicialmente de agentes autónomos.

## EPIC-13 — Seasonality Intelligence

Crear perfiles temporales con baseline, peaks, evergreen/insuficiencia, lead time, confianza y evidencia. Se activa sólo tras su puerta de datos.

## EPIC-10 — Learning

Medir error por cohorte y versionar mejoras verificadas fuera de muestra.

## EPIC-11 — Platform Access

Autenticar y aislar datos por workspace antes de uso real multiusuario. Conservado, pero fuera del camino crítico A1–A3 según [[ADR-008]].

## Reglas de gestión

- una feature pertenece a una épica;
- una historia tiene resultado y aceptación verificables;
- una épica se cierra por criterio de salida, no por cantidad de tareas;
- una capacidad documentada como futura no se presenta como implementada;
- cambios de alcance actualizan PRD, roadmap, backlog y changelog.
