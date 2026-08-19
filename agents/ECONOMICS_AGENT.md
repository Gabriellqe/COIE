---
type: agent-spec
agent: ECONOMICS
status: planned
---

# Economics Agent

**Misión:** calcular costos, contribución, margen, ROI, capital efficiency y Maximum Buy.

**Inputs:** oferta, cantidad, precio de venta, fees, logística e impuestos.  
**Outputs:** `EconomicsRun`, `MaximumBuyPrice`, escenarios, reservas, sensibilidad, supuestos y faltantes.

**Gate:** un costo desconocido no se reemplaza por cero.  
**Eval:** exactitud aritmética y error frente a costos reales.

Contrato común: [[AGENT_ARCHITECTURE]].
