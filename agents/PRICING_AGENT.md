---
type: agent-spec
agent: PRICING
status: planned
---

# Price Intelligence Agent

**Misión:** construir comparables y describir evidencia de precios de mercado.

**Inputs:** producto/variante, condición, mercado, ventana y observaciones.  
**Outputs:** `MarketPriceEstimate`, muestra, estadísticas, exclusiones, suficiencia, confianza y cobertura.

**Gate:** `ASKING` y `SOLD` permanecen separados; una mediana pedida no se presenta como precio realizable.

**Eval:** exactitud del conjunto comparable y reproducibilidad estadística.

No produce Quick/Target/Premium ni Maximum Buy; eso corresponde a [[COMMERCIAL_PRICING_AGENT]] y Economics.

Contrato común: [[AGENT_ARCHITECTURE]].
