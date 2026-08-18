---
type: backlog
status: active
updated: 2026-08-18
---

# Backlog

## Convenciones

- Prioridad: `P0` fundamental, `P1` importante, `P2` expansión.
- Estado: `DONE`, `IN_PROGRESS`, `READY`, `PLANNED`, `BLOCKED`.
- Todo elemento nuevo debe vincularse a una épica, historia o entregable de Foundation.

## Foundation — Sprint 0

| ID | Trabajo | Prioridad | Estado | Criterio de salida |
|---|---|---:|---|---|
| FND-001 | Separar documento maestro | P0 | DONE | diez documentos objetivo creados y enlazados |
| FND-002 | Crear navegación y convenciones | P0 | DONE | README, contexto y estructura Obsidian disponibles |
| FND-003 | Registrar decisiones iniciales | P0 | DONE | ADR-001 y log de decisiones creados |
| FND-004 | Definir arquitectura lógica | P0 | DONE | límites, flujo, datos y agentes documentados |
| FND-005 | Definir scoring v0.1.0 | P0 | DONE | pesos, gates, cobertura y explicación documentados |
| FND-006 | Definir mercado/moneda inicial | P0 | DONE | ADR aceptado con alcance y razones |
| FND-007 | Seleccionar primera fuente autorizada | P0 | IN_PROGRESS | acceso, límites y campos comprobados |
| FND-008 | Seleccionar stack y persistencia | P0 | DONE | ADR aceptado con opciones y consecuencias |
| FND-009 | Crear esqueleto ejecutable | P0 | DONE | aplicación, pruebas y comandos básicos operativos |
| FND-010 | Crear fixture y perfil canónico Foundation | P0 | DONE | dataset DEMO parcial, reproducible y validado |
| FND-011 | Configurar calidad automática | P0 | DONE | formato, pruebas y revisión de enlaces ejecutables |
| FND-012 | Acordar benchmark manual del MVP | P0 | DONE | protocolo y métricas congelados |

## P0 — Flujo vertical MVP

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| DA-001 | EPIC-01 / US-002 | Implementar contrato de conector y `CaptureRun` | PLANNED |
| DA-002 | EPIC-01 / US-002 | Implementar importación manual estructurada | PLANNED |
| DA-003 | EPIC-01 / US-002 | Implementar primer conector autorizado | PLANNED |
| PI-001 | EPIC-02 / US-001 | Crear entidad `Product` y aliases | PLANNED |
| PI-002 | EPIC-02 / US-003 | Normalizar nombre, marca, modelo y variante | PLANNED |
| PI-003 | EPIC-02 / US-003 | Resolver coincidencias con confianza y revisión | PLANNED |
| MI-001 | EPIC-03 / US-001 | Persistir listing, snapshot y precio | PLANNED |
| MI-002 | EPIC-03 / US-001 | Construir conjunto comparable por condición | PLANNED |
| MI-003 | EPIC-03 / US-001 | Calcular estadísticas robustas de precio | PLANNED |
| MI-004 | EPIC-03 / US-005 | Crear señal inicial de demanda | PLANNED |
| MI-005 | EPIC-03 / US-005 | Crear señal inicial de competencia | PLANNED |
| SO-001 | EPIC-07 / US-004 | Registrar proveedor y oferta | PLANNED |
| EC-001 | EPIC-07 / US-004 | Calcular landed cost y contribución | PLANNED |
| EC-002 | EPIC-07 / US-004 | Calcular ROI y capital efficiency | PLANNED |
| SC-001 | EPIC-08 / US-007 | Implementar normalización versionada | PLANNED |
| SC-002 | EPIC-08 / US-007 | Calcular score, riesgo, confianza y cobertura | PLANNED |
| SC-003 | EPIC-08 / US-007 | Implementar gates y explicación | PLANNED |
| OP-001 | EPIC-04 / US-008 | Crear oportunidad y máquina de estados | PLANNED |
| OP-002 | EPIC-04 / US-006 | Entregar listado/ranking inicial | PLANNED |
| AU-001 | EPIC-11 / US-009 | Implementar login, workspace personal y aislamiento RLS | PLANNED |

## P1 — Reposición, tablero y experimentación

| ID | Épica / historia | Trabajo | Estado |
|---|---|---|---|
| RP-001 | EPIC-05 / US-020 | Modelar `ProductEcosystem` y `BaseProduct` | PLANNED |
| RP-002 | EPIC-05 / US-021 | Registrar compatibilidades y evidencia | PLANNED |
| RP-003 | EPIC-05 / US-020 | Estimar intervalo y score de reposición | PLANNED |
| UI-001 | EPIC-08 / US-006 | Dashboard A operativo con detalle analítico B | PLANNED |
| EX-001 | EPIC-09 / US-030 | Crear y aprobar experimentos | PLANNED |
| EX-002 | EPIC-09 / US-031 | Registrar métricas reales | PLANNED |
| EX-003 | EPIC-09 / US-031 | Comparar predicción y resultado | PLANNED |

## P2 — Expansión

| ID | Épica | Trabajo | Estado |
|---|---|---|---|
| AG-001 | EPIC-06 | Orquestación de agentes especializados | PLANNED |
| ND-001 | EPIC-06 | Descubrimiento automático de nichos | PLANNED |
| CX-001 | EPIC-06 | Recomendaciones cross-sell y bundles | PLANNED |
| LR-001 | EPIC-10 | Calibración con cohortes reales | PLANNED |
| AL-001 | EPIC-10 | Alertas y automatización avanzada | PLANNED |

## Criterio de priorización

El orden se decide por:

1. reducción de incertidumbre crítica;
2. habilitación del flujo vertical;
3. valor demostrable para el MVP;
4. dependencia y riesgo técnico;
5. esfuerzo y reversibilidad.

No se prioriza P2 hasta que el flujo P0 produzca decisiones trazables y exista evidencia de que la automatización adicional resuelve un cuello de botella real.
