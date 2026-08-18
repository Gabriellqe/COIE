---
type: agent-spec
agent: COMPATIBILITY
status: planned
---

# Compatibility Agent

**Misión:** relacionar SKU con marcas, modelos y variantes compatibles.

**Inputs:** producto, candidatos de producto base y fuentes.  
**Outputs:** relaciones `CLAIMED/VERIFIED/CONFLICTED/REJECTED`, cobertura y evidencia.  
**Gate:** una afirmación del vendedor no se convierte sola en `VERIFIED`.  
**Eval:** precisión por modelo, conflictos detectados y devoluciones posteriores.

Contrato común: [[AGENT_ARCHITECTURE]].
