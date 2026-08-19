---
type: product-spec
status: accepted
version: 0.1
updated: 2026-08-19
---

# Modelo de decisiones de precio

## Propósito

Separar tres preguntas con evidencia y fórmulas diferentes:

1. ¿Qué muestran los precios observados?
2. ¿A cuánto conviene ofrecer el producto?
3. ¿Cuánto puedo pagar como máximo?

Decisión: [[ADR-007]].

## 1. MarketPriceEstimate

Describe evidencia de mercado, no una recomendación.

```text
id
workspaceId
productId
marketId
condition
priceType: ASKING | SOLD
currency
asOf / window
comparableSetDefinition
sampleSize
statistics
centralEstimate?
status: CALCULATED | INSUFFICIENT_DATA
confidence / coverage
calculationVersion
inputRefs / exclusions
evidenceMode: DEMO | REAL | MIXED
calculatedAt
```

Reglas:

- cohortes `ASKING` y `SOLD` separadas;
- sin muestra suficiente, `centralEstimate=null`;
- DEMO siempre visible;
- una mediana `ASKING` se etiqueta como tal y no como valor realizable;
- outliers permanecen en histórico y su exclusión se explica.

## 2. PricingRecommendation

Responde «¿cómo venderlo?» por canal y objetivo.

```text
id
opportunityId
marketPriceEstimateIds
channel
condition
scenarios[]
basis / assumptions
status
calibrationStatus
confidence / coverage
calculationVersion
inputRefs
requiresHumanApproval: true
calculatedAt
```

### Escenarios

| Escenario | Pregunta | Evidencia mínima |
|---|---|---|
| `QUICK` | ¿Qué precio favorece una venta más rápida? | ventas/tiempo o proxy explícito |
| `TARGET` | ¿Qué precio equilibra contribución y velocidad? | mercado + economía + objetivo |
| `PREMIUM` | ¿Existe soporte para cobrar diferenciación? | condición/características/demanda |

Cada escenario tiene precio y días esperados opcionales. Si falta evidencia, permanece `unknown`; no se deriva como percentil arbitrario.

Estados de calibración:

```text
UNCALIBRATED
EXPERT_RULE
EMPIRICALLY_CALIBRATED
```

## 3. MaximumBuyPrice

```text
MaximumBuyPrice =
  ExpectedSalePrice
  - SellingFees
  - AcquisitionIndependentCosts
  - MinimumRequiredContribution
  - RiskReserve
  - HoldingCapitalReserve
```

Contrato:

```text
id
opportunityId
pricingRecommendationId
selectedScenario
expectedSalePrice
costInputs
minimumRequiredContribution
riskReserve
holdingCapitalReserve
maximumBuyPrice?
status / gates
calculationVersion
inputRefs / assumptions
evidenceMode
calculatedAt
```

Si un costo depende del precio de compra, se resuelve mediante una función versionada. Un input crítico ausente produce gate y `maximumBuyPrice=null`.

## LiquidityEstimate

Liquidez no es sinónimo de demanda. Puede combinar ventas observadas, tiempo hasta venta, desaparición de listings o proxies de interacción. Debe conservar método, ventana, evidencia, confianza y cobertura.

Con sólo publicaciones activas no se afirma velocidad de venta.

## Relación con economía y scoring

- `EconomicsRun` referencia el escenario de precio elegido.
- `acquisition_cost` es real o hipotético y se etiqueta.
- `MaximumBuyPrice` es un límite, no el costo observado.
- el scoring consume outputs; no reemplaza los contratos.
- ningún resultado ejecuta publicación, negociación o compra.

## Perfil Foundation

El shell actual sólo calcula estadísticas de una cohorte DEMO `USED/ASKING/CLP`. No calcula Market Value realizable, Quick, Target, Premium, Maximum Buy ni Liquidity.

## Referencias

- [[ADR-007]]
- [[SCORING_MODEL]]
- [[DATA_MODEL]]
- [[PRD]]
