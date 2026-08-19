---
type: product-spec
status: planned
version: 0.1
updated: 2026-08-19
---

# Seasonality Intelligence

## Propósito

Responder:

- ¿qué debería venderse ahora?;
- ¿qué debe prepararse antes del próximo peak?;
- ¿qué productos o nichos son evergreen?

Seasonality es una capacidad transversal de mercado, pricing, abastecimiento e inventario. No se implementa en MVP-A.

## SeasonalityProfile objetivo

```text
id / workspaceId
subject: PRODUCT | NICHE
marketId / channel?
granularity: WEEK | MONTH
windowStart / windowEnd
baselineDefinition
buckets[]
classification
peakWindows
preparationLeadTimeDays?
confidence / coverage
methodVersion
evidenceMode
inputRefs
calculatedAt
```

Cada bucket contiene período, índice opcional, muestra y evidencia.

Clasificación:

```text
SEASONAL
EVERGREEN
INSUFFICIENT_DATA
```

## Fuentes posibles

- ventas históricas propias;
- ventas o rankings externos permitidos;
- búsquedas/tendencias con método permitido;
- inventario y velocidad;
- calendario y eventos;
- clima, cuando exista hipótesis causal documentada.

Precio `ASKING` histórico no demuestra por sí solo demanda estacional.

## Reglas

- ausencia de evidencia no implica `EVERGREEN`;
- índice ausente es `null`, no cero;
- peak y anticipación conservan ventana, método y lead time;
- promociones, clima y cambios de canal se registran como posibles confusores;
- no se agrega automáticamente al OpportunityScore universal;
- cualquier recomendación de preparación se combina con lead time y límite de capital.

## Puerta de activación

La implementación comienza sólo cuando exista:

- histórico suficiente para más de un ciclo relevante o una fuente externa justificable;
- método versionado de baseline;
- muestra y cobertura mínimas definidas;
- caso de decisión donde el timing cambie una acción.

## Referencias

- [[PRODUCT_VISION]]
- [[ROADMAP]]
- [[SCORING_MODEL]]
- [[DATA_MODEL]]
