---
type: backlog
status: active
updated: 2026-08-19
---

# Backlog

## Convenciones

- Prioridad: `P0` fundamental, `P1` importante, `P2` expansión.
- Estado: `DONE`, `IN_PROGRESS`, `READY`, `PLANNED`, `BLOCKED`.
- Todo trabajo se vincula a Foundation, una épica o una historia.

## Foundation — Sprint 0

| ID | Trabajo | Prioridad | Estado | Criterio de salida |
|---|---|---:|---|---|
| FND-001 | Separar documento maestro | P0 | DONE | documentos operativos enlazados |
| FND-002 | Navegación y convenciones | P0 | DONE | README/contexto/Obsidian |
| FND-003 | Decision Log | P0 | DONE | ADR y registro disponibles |
| FND-004 | Arquitectura y datos | P0 | DONE | límites y modelos documentados |
| FND-005 | Scoring candidato | P0 | DONE | pesos/gates/cobertura no calibrados |
| FND-006 | Mercado/moneda | P0 | DONE | Chile/CLP aceptado |
| FND-007 | Primera fuente permitida | P0 | IN_PROGRESS | acceso/campos/retención comprobados |
| FND-008 | Stack/persistencia | P0 | DONE | ADR aceptado |
| FND-009 | Esqueleto ejecutable | P0 | DONE | shell A+B y comandos |
| FND-010 | Fixture/perfil Foundation | P0 | DONE | DEMO parcial validado |
| FND-011 | Calidad automática | P0 | DONE | check/test/docs/build |
| FND-012 | Benchmark manual | P0 | DONE | protocolo congelado |
| FND-013 | Reconciliar concepto y alcance MVP-A | P0 | DONE | ADR-006/007/008, docs, código semántico y backlog alineados |

## MVP-A1 — Market Evidence

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| DA-001 | EPIC-01 / US-002 | Contrato `CaptureRun` | DONE |
| DA-002 | EPIC-01 / US-001 | Importación manual estructurada | DONE |
| DA-003 | EPIC-01 / US-001 | Primer conector autorizado | BLOCKED |
| DA-004 | EPIC-01 / US-002 | Correcciones/invalidation append-only | PLANNED |
| PI-001 | EPIC-02 / US-001 | Entidad Product y aliases | PLANNED |
| PI-002 | EPIC-02 / US-003 | Normalizar marca/modelo/variante | PLANNED |
| PI-003 | EPIC-02 / US-003 | Matching con confianza/revisión | PLANNED |
| MI-001 | EPIC-03 / US-001 | Persistir listing/snapshot/precio | DONE |
| MI-002 | EPIC-03 / US-001 | Construir cohorte comparable | DONE |
| MI-003 | EPIC-03 / US-001 | Estadística robusta y suficiencia | DONE |
| MI-006 | EPIC-03 / US-001 | Materializar `MarketPriceEstimate` | DONE |

## MVP-A2 — Resale Decision

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| PR-001 | EPIC-12 / US-011 | Contrato/escenarios PricingRecommendation | PLANNED |
| PR-002 | EPIC-12 / US-012 | MaximumBuyPrice + gates | PLANNED |
| MI-004 | EPIC-03 / US-005 | Señal/proxy de demanda | PLANNED |
| MI-005 | EPIC-03 / US-005 | Señal de competencia | PLANNED |
| MI-007 | EPIC-03 / US-013 | LiquidityEstimate/proxy | PLANNED |
| EC-001 | EPIC-07 / US-004 | Economics Core con costos manuales | PLANNED |
| EC-002 | EPIC-07 / US-004 | ROI/capital efficiency | PLANNED |
| SC-001 | EPIC-08 / US-007 | Normalización versionada | PLANNED |
| SC-002 | EPIC-08 / US-007 | Score/risk/confidence/coverage | PLANNED |
| SC-003 | EPIC-08 / US-007 | Gates y explicación | PLANNED |
| OP-001 | EPIC-04 / US-008 | Ciclo/transiciones auditables | PLANNED |
| OP-002 | EPIC-04 / US-010 | Caso de uso Resale Decision | PLANNED |

## MVP-A3 — Experimentation Lite

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| EX-001 | EPIC-09 / US-030 | Crear/aprobar experimento Lite | PLANNED |
| EX-002 | EPIC-09 / US-031 | Observaciones manuales append-only | PLANNED |
| EX-003 | EPIC-09 / US-031 | Comparar predicción/resultado | PLANNED |
| EX-004 | EPIC-09 / US-008 | INCONCLUSIVE/MODIFY → RESEARCHING | PLANNED |

## MVP-B — Sourcing + Economics ampliado

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| SO-001 | EPIC-07 / US-004 | Supplier y SupplierOffer | PLANNED |
| SO-002 | EPIC-07 | MOQ, lead time y landed cost | PLANNED |
| SO-003 | EPIC-07 | SupplyRoute para Import/Arbitrage | PLANNED |

## MVP-C/D y capacidades posteriores

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| RP-001 | EPIC-05 / US-020 | ProductEcosystem/BaseProduct | PLANNED |
| RP-002 | EPIC-05 / US-021 | Compatibility/evidencia | PLANNED |
| RP-003 | EPIC-05 / US-020 | Ciclo/score de reposición | PLANNED |
| PG-001 | EPIC-14 / US-022 | ProductRelationship v1 | PLANNED |
| ND-001 | EPIC-06 | Niche analyzer asistido | PLANNED |
| CX-001 | EPIC-06 / US-022 | Catálogo/cross-sell/bundles | PLANNED |
| SE-001 | EPIC-13 / US-040 | SeasonalityProfile | BLOCKED |
| LR-001 | EPIC-10 / US-031 | Calibración por cohortes | BLOCKED |
| AG-001 | EPIC-06 | Autonomous Discovery | PLANNED |

`SE-001` requiere histórico suficiente; `LR-001`, resultados reales; `AG-001`, flujo asistido evaluado.

## Experiencia y plataforma

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| UI-001 | EPIC-08 / US-006 | Dashboard funcional después de A2 | PLANNED |
| CH-001 | EPIC-12 / US-041 | Comparación de canales | PLANNED |
| AU-001 | EPIC-11 / US-009 | Supabase Auth/workspace/RLS | PLANNED |

AU-001 se activa antes de datos reales multiusuario, no bloquea A1–A3 DEMO/manual.

## Criterio de priorización

1. cerrar el ciclo de decisión más corto;
2. reducir incertidumbre crítica;
3. preservar trazabilidad y seguridad;
4. validar valor antes de ampliar infraestructura;
5. activar capacidades dependientes sólo cuando existan sus datos.
