---
type: agent-spec
agent: SCORING
status: planned
---

# Scoring Agent

**Misión:** validar componentes y aplicar una versión aprobada del modelo.

**Inputs:** scores componentes, riesgos, cobertura, calidad y versión.  
**Outputs:** `OpportunityScore`, `RiskScore`, confianza, coverage, gates y explicación.  
**Gate:** no cambia pesos, no oculta inputs desfavorables y etiqueta el perfil MVP-A como `UNCALIBRATED`.

**Eval:** reproducibilidad, completitud de explicación y calibración posterior.

Modelo: [[SCORING_MODEL]]. Contrato común: [[AGENT_ARCHITECTURE]].
