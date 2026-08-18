---
type: product-spec
status: accepted
version: 0.1
updated: 2026-08-12
---

# Tipos de oportunidad

## Taxonomía

| Código | Unidad de análisis | Valor buscado | Estado |
|---|---|---|---|
| `RESALE` | artículo/listing usado | descuento frente a valor realizable | MVP |
| `REPLENISHMENT` | consumible/repuesto | demanda recurrente y compatible | MVP |
| `IMPORT` | SKU + ruta de abastecimiento | margen después de landed cost | futuro |
| `ARBITRAGE` | SKU + dos mercados | brecha de precio sostenible | futuro |
| `NICHE_DISCOVERY` | nicho/ecosistema | demanda desatendida y profundidad | futuro |
| `CATALOG_EXPANSION` | SKU + catálogo existente | venta incremental/cross-sell | futuro |
| `BUNDLE_OPPORTUNITY` | conjunto de SKU | mayor valor, conversión o margen | futuro |

## Reglas comunes

Toda oportunidad define:

- mercado y fecha de evaluación;
- hipótesis falsable;
- sujeto y tipo;
- evidencia a favor y en contra;
- economía y capital requerido;
- score, confianza y cobertura;
- riesgos y gates;
- próximo paso o experimento mínimo.

## `RESALE`

Pregunta: **¿puede adquirirse un artículo por debajo de su valor realizable y venderse con contribución suficiente dentro de un plazo razonable?**

Inputs mínimos:

- precio y condición de compra;
- referencias comparables por condición;
- costos de adquisición, reparación, comisiones y entrega;
- demanda/liquidez estimada;
- riesgo de defecto, fraude, devolución y tiempo de venta.

La diferencia entre precio pedido y precio vendido debe ser explícita.

## `REPLENISHMENT`

Pregunta: **¿existe una demanda de reposición recurrente, compatible y rentable?**

Inputs mínimos:

- producto base o ecosistema;
- intervalo o causa de reposición;
- compatibilidades y calidad de evidencia;
- base instalada o proxy;
- oferta, competencia y alternativas;
- landed cost, margen y logística.

No se presume demanda cautiva si existen sustitutos universales o si la compatibilidad no está verificada.

## Separación de tipos

Una misma identidad de producto puede originar varias oportunidades en mercados o tipos distintos. Cada oportunidad mantiene score, hipótesis, economía, estado y evidencia independientes.

## Referencias

- [[PRODUCT_VISION]]
- [[PRD]]
- [[SCORING_MODEL]]
