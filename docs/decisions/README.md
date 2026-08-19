# Decision Log

Las decisiones que cambian arquitectura, alcance, datos, seguridad o forma de trabajo se registran como ADR.

## Índice

- [[ADR-001]] — Resale Intelligence pasa a ser un módulo de COIE — `Accepted`.
- [[ADR-002]] — Mercado inicial Chile y moneda CLP — `Accepted`.
- [[ADR-003]] — Adquisición inicial mediante carga manual trazable — `Accepted`.
- [[ADR-004]] — Stack e interfaz web inicial — `Accepted`.
- [[ADR-005]] — Autenticación e aislamiento mediante espacios de trabajo — `Accepted`; secuencia modificada por [[ADR-008]].
- [[ADR-006]] — Opportunity como agregado central y perfil MVP-A Resale — `Accepted`; reemplaza el alcance MVP de [[ADR-001]].
- [[ADR-007]] — Separar evidencia de mercado, pricing y precio máximo de compra — `Accepted`.
- [[ADR-008]] — Diferir Platform Access del primer ciclo comercial — `Accepted`.
- [[ADR-009]] — Persistencia local DEMO append-only para MVP-A1 — `Accepted`.
- [[ADR-010]] — Evidencia real aportada manualmente con retención mínima — `Accepted`.

## Estados

- `Proposed`: en discusión.
- `Accepted`: vigente.
- `Deprecated`: ya no se recomienda, pero puede seguir existiendo.
- `Superseded`: reemplazada por otro ADR.
- `Rejected`: evaluada y descartada.

## Plantilla

```markdown
---
type: decision
id: ADR-NNN
status: proposed
date: YYYY-MM-DD
---

# ADR-NNN — Título

## Contexto

## Decisión

## Alternativas consideradas

## Consecuencias

## Criterio de revisión
```

Un ADR aceptado no se edita para cambiar su decisión: se crea otro que lo reemplaza.
