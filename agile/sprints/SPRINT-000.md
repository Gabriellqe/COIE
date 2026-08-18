---
type: sprint
id: SPRINT-000
status: in_progress
created: 2026-08-12
updated: 2026-08-12
---

# Sprint 0 — Project Foundation

## Goal

Preparar una base documental y técnica coherente, reproducible y suficientemente decidida para comenzar el desarrollo iterativo del primer flujo de Market Price Intelligence.

## Alcance seleccionado

### Documentación y dominio

- [x] FND-001 — Separar el documento maestro.
- [x] FND-002 — Crear navegación y convenciones.
- [x] FND-003 — Registrar decisiones iniciales.
- [x] FND-004 — Definir arquitectura lógica y modelo de datos.
- [x] FND-005 — Definir scoring v0.1.0.

### Decisiones del primer incremento

- [ ] FND-006 — Elegir mercado, país y moneda base.
- [ ] FND-007 — Elegir primera fuente autorizada y comprobar acceso/campos.
- [ ] FND-008 — Elegir stack, persistencia e interfaz inicial mediante ADR.

### Base técnica

- [ ] FND-009 — Crear esqueleto ejecutable.
- [ ] FND-010 — Crear fixtures y esquema canónico.
- [ ] FND-011 — Configurar formato, pruebas y validación documental.
- [ ] FND-012 — Congelar protocolo de benchmark manual.

## Entregables

- diez documentos objetivo del maestro;
- README y navegación Obsidian;
- arquitectura, datos, agentes y scoring;
- épicas, historias, backlog y roadmap;
- ADR-001, changelog y plantillas;
- decisiones de alcance inicial;
- esqueleto ejecutable con test de humo;
- fixtures válidos y comandos documentados;
- siguiente sprint propuesto.

## Criterios de salida

- [ ] Todos los enlaces internos críticos resuelven.
- [ ] No hay contradicciones críticas entre PRD, arquitectura, datos y scoring.
- [ ] Mercado, fuente y stack iniciales tienen ADR aceptado.
- [ ] El proyecto se instala/ejecuta con instrucciones reproducibles.
- [ ] Los tests básicos y validadores pasan desde un entorno limpio.
- [ ] El fixture cubre producto, listing, observación de precio y oportunidad.
- [ ] El benchmark manual está definido antes de ejecutar el MVP.
- [ ] El backlog del siguiente sprint cumple Definition of Ready.

## Technical Notes

- No introducir arquitectura distribuida sin evidencia de necesidad.
- Mantener adquisición y reglas de dominio desacopladas.
- Crear lógica de cálculo pura y testeable antes de integrar fuentes reales.
- No almacenar credenciales ni capturas cuyo uso/retención no esté permitido.

## Results

Al inicio del sprint se completó la separación documental y se establecieron contratos lógicos. Los resultados técnicos se completarán durante el sprint.

## Problems / Risks

- El maestro no define mercado ni moneda inicial.
- No existe decisión sobre fuente y método de acceso.
- El stack técnico no está seleccionado.
- Los pesos de scoring son una hipótesis sin calibración real.

## Decisions

- [[ADR-001]] — Resale Intelligence es un módulo de COIE.

## Next Actions

1. Resolver FND-006, FND-007 y FND-008.
2. Construir FND-009 a FND-011 con fixtures, sin depender de red.
3. Refinar US-001, US-002 y US-003 para el Sprint 1.
4. Definir FND-012 y seleccionar un caso de referencia.

## Review

Pendiente.

## Retrospective

Pendiente; utilizar [[RETROSPECTIVES]].
