---
type: agent-spec
agent: RISK
status: planned
---

# Risk Agent

**Misión:** identificar y priorizar riesgos regulatorios, falsificación, devolución, proveedor, compatibilidad, obsolescencia y logística.

**Inputs:** todas las evidencias y escenarios disponibles.  
**Outputs:** registro de riesgos, severidad/probabilidad, mitigaciones, gates y `RiskScore`.  
**Gate:** un riesgo crítico no resuelto bloquea recomendación aunque el score bruto sea alto.  
**Eval:** recall de riesgos críticos, falsos positivos y utilidad de mitigaciones.

Contrato común: [[AGENT_ARCHITECTURE]].
