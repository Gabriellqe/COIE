---
type: roadmap
status: active
updated: 2026-08-18
---

# Roadmap

El roadmap está orientado a resultados, no a fechas arbitrarias. Cada fase avanza sólo cuando cumple su puerta de salida.

## Vista general

```text
Phase 0  Foundation
   ↓
Phase 1  Market Price Intelligence
   ↓
Phase 2  Resale Intelligence
   ↓
Phase 3  Replenishment Intelligence
   ↓
Phase 4  Sourcing Intelligence
   ↓
Phase 5  Experiments
   ↓
Phase 6  Learning
   ↓
Phase 7  Autonomous Discovery
```

## Phase 0 — Foundation

**Resultado:** repositorio documentado, decisiones básicas, arquitectura lógica, backlog, contratos, aislamiento multiusuario modelado y esqueleto técnico reproducible.

**Entregables:** documentos objetivo, Sprint 0, ADR, mercado/fuente inicial, stack, contratos de workspace, fixtures, validaciones y benchmark.

**Puerta de salida:**

- decisiones FND-006 a FND-008 aceptadas;
- esqueleto y tests básicos ejecutables;
- fixture canónico válido;
- historias P0 refinadas y primer incremento seleccionado;
- no existen contradicciones críticas entre PRD, datos y scoring.

El caso de referencia inicial es Chile/CLP y un repuesto usado asociado a NK150. Es una validación vertical, no una restricción permanente del producto.

## Phase 1 — Market Price Intelligence

**Resultado:** estimación trazable de valor de mercado para un producto.

**Incluye:** identidad, listings, observaciones, histórico, comparables y estadísticas.

**Puerta:** US-001, US-002 y US-003 cumplen Definition of Done con una fuente real autorizada y fixtures.

## Phase 2 — Resale Intelligence

**Resultado:** oportunidades `RESALE` ordenadas por economía, liquidez y riesgo.

**Incluye:** costos, contribución, señales básicas, scoring, explicación y estados.

**Puerta:** al menos un caso completo produce recomendación reproducible, supera revisión humana y define experimento mínimo.

## Phase 3 — Replenishment Intelligence

**Resultado:** oportunidades `REPLENISHMENT` con recurrencia y compatibilidad trazables.

**Incluye:** ecosistemas, producto base, compatibilidades, reposición y base instalada/proxies.

**Puerta:** al menos un ecosistema demuestra cobertura de compatibilidad y score con datos reales suficientes.

## Phase 4 — Sourcing Intelligence

**Resultado:** escenarios de abastecimiento y landed cost comparables.

**Incluye:** proveedores, ofertas, MOQ, lead time, impuestos/aduana y sensibilidad.

**Puerta:** economía base/adversa reproducible y riesgos críticos visibles para las oportunidades seleccionadas.

Parte de esta fase se adelanta al P0 cuando el cálculo del MVP necesita costos de proveedor.

## Phase 5 — Experiments

**Resultado:** pruebas comerciales acotadas con predicción y resultado.

**Incluye:** aprobación, stop conditions, métricas, decisión y auditoría.

**Puerta:** primer experimento cerrado conforme a [[EXPERIMENTATION]] y comparación con benchmark manual.

## Phase 6 — Learning

**Resultado:** calibración basada en resultados, no ajustes anecdóticos.

**Incluye:** cohortes, error, backtesting, nuevas versiones de reglas/pesos.

**Puerta:** evidencia fuera de muestra de mejora y decisión documentada.

## Phase 7 — Autonomous Discovery

**Resultado:** agentes supervisados proponen oportunidades sin iniciar acciones comerciales.

**Incluye:** orquestación, evaluaciones, límites de autoridad y monitoreo.

**Puerta:** calidad igual o superior al flujo asistido en un conjunto de evaluación, sin afirmaciones no trazables ni violaciones de límites.

## Indicadores por horizonte

| Horizonte | Indicador dominante |
|---|---|
| Foundation | cobertura de contratos y reproducibilidad |
| Price Intelligence | precisión/cobertura de precio comparable |
| Resale/Replenishment | calidad y utilidad del ranking |
| Experiments | tasa de oportunidades validadas |
| Learning | error de predicción y calibración |
| Negocio | capital en oportunidades rentables validadas |

## Revisión

Se revisa al cierre de cada sprint. Cambiar orden o puerta requiere registrar razón en [[CHANGELOG]] y, si afecta arquitectura o producto, un ADR.
