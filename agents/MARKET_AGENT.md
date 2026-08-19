---
type: agent-spec
agent: MARKET
status: planned
---

# Market Agent

**Misión:** medir demanda, oferta, liquidez/proxies, tendencia y estabilidad para un mercado/ventana.

**Inputs:** producto, mercado, ventana, fuentes permitidas.  
**Outputs:** señales normalizadas, `LiquidityEstimate` cuando proceda, evidencia, frescura, cobertura y conflictos.

**Gate:** un proxy se etiqueta; nunca se presenta como venta exacta sin soporte.  
**Eval:** precisión de extracción, cobertura, calibración y distinción entre ventas/proxies.

Contrato común: [[AGENT_ARCHITECTURE]].
