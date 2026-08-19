---
type: agent-spec
agent: COMMERCIAL_PRICING
status: planned
---

# Commercial Pricing Agent

**Misión:** proponer escenarios `QUICK`, `TARGET` y `PREMIUM` a partir de evidencia y objetivos explícitos.

**Inputs:** MarketPriceEstimate, canal, condición, economía, demanda/liquidez y objetivo.
**Outputs:** `PricingRecommendation`, disponibilidad por escenario, supuestos, confianza y cobertura.
**Gate:** sin evidencia de ventas/velocidad no afirma Quick Sale; no publica automáticamente.
**Eval:** error frente a precio/velocidad reales y tasa de recomendaciones bloqueadas correctamente.

Modelo: [[PRICING_MODEL]]. Contrato común: [[AGENT_ARCHITECTURE]].
