---
type: product-spec
status: accepted
version: 0.1
updated: 2026-08-19
---

# Modelo de Opportunity

## Propósito

Definir el agregado central de COIE y evitar que estrategias, sujetos y capacidades se conviertan en sistemas independientes.

## Dimensiones

### Strategy

Describe la forma de explotar la ineficiencia:

```text
RESALE
REPLENISHMENT
IMPORT
ARBITRAGE
NICHE_DISCOVERY
CATALOG_EXPANSION
BUNDLE_OPPORTUNITY
```

### Subject

Describe qué se analiza:

```text
PRODUCT
LISTING
NICHE
SUPPLY_ROUTE
PRODUCT_SET
```

### Capabilities

Aportan evidencia o decisiones: Product Intelligence, Market/Price Intelligence, Commercial Pricing, Demand, Competition, Sourcing, Economics, Compatibility, Product Relations, Seasonality, Risk, Scoring, Experimentation y Learning.

## Aggregate objetivo

```text
Opportunity
├── id / workspaceId / marketId
├── strategy
├── subject
├── hypothesis
├── status
├── currentMarketPriceEstimateId?
├── currentPricingRecommendationId?
├── currentMaximumBuyPriceId?
├── currentEconomicsRunId?
├── currentScoreRunId?
├── ownerId?
├── rejectionReason?
└── timestamps
```

Los cálculos y experimentos son históricos separados. La oportunidad mantiene punteros a versiones vigentes y gobierna ciclo y decisiones.

## Compatibilidad Strategy–Subject

| Strategy | Subjects permitidos en el modelo objetivo |
|---|---|
| `RESALE` | `PRODUCT`, `LISTING` |
| `REPLENISHMENT` | `PRODUCT` |
| `IMPORT` | `PRODUCT`, `SUPPLY_ROUTE` |
| `ARBITRAGE` | `PRODUCT`, `SUPPLY_ROUTE` |
| `NICHE_DISCOVERY` | `NICHE` |
| `CATALOG_EXPANSION` | `PRODUCT`, `PRODUCT_SET` |
| `BUNDLE_OPPORTUNITY` | `PRODUCT_SET` |

## Ciclo

```text
DISCOVERED
  ↓
RESEARCHING
  ↓
SHORTLISTED
  ↓
TESTING
  ├── VALIDATED → SCALING
  ├── REJECTED
  └── INCONCLUSIVE / MODIFY → RESEARCHING
```

`INCONCLUSIVE` es resultado de experimento, no un éxito débil. `MODIFY` crea una nueva versión de hipótesis/plan y conserva el historial.

## Invariantes

- strategy y subject son obligatorios y compatibles;
- un sujeto no cambia silenciosamente;
- todas las referencias privadas pertenecen al mismo workspace;
- evidencia, derivados y decisiones conservan versión y fecha;
- ningún score cambia estado o capital por sí solo;
- oportunidades distintas pueden compartir producto sin compartir hipótesis/economía.

## Perfil Foundation / MVP-A

El schema `0.1.0` implementa:

```text
opportunityType = RESALE
productId       = sujeto PRODUCT implícito
```

No implementa todavía `strategy + subject` nativo. La migración futura será:

```text
opportunityType → strategy
productId       → subject { kind: PRODUCT, productId }
```

El adaptador deberá leer `0.1.0`; el contrato nativo utilizará otra versión y no reinterpretará datos sin migración.

## Persistencia futura

Evitar un `subject_type + subject_id` sin integridad. Preferir una relación exclusiva con claves foráneas tipadas por sujeto o tablas de asociación especializadas. La decisión física se registrará al activar el primer sujeto no-producto.

## Referencias

- [[ADR-006]]
- [[OPPORTUNITY_TYPES]]
- [[DATA_MODEL]]
- [[PRD]]
