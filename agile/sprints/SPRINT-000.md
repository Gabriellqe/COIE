---
type: sprint
id: SPRINT-000
status: in_progress
created: 2026-08-12
updated: 2026-08-19
---

# Sprint 0 — Project Foundation

## Goal

Preparar una base documental y técnica coherente para comenzar MVP-A Resale Decision sin perder el ciclo completo de Opportunity.

## Alcance seleccionado

### Documentación y dominio

- [x] FND-001 — Separar el documento maestro.
- [x] FND-002 — Crear navegación y convenciones.
- [x] FND-003 — Registrar decisiones iniciales.
- [x] FND-004 — Definir arquitectura lógica y modelo de datos.
- [x] FND-005 — Definir scoring v0.1.0.
- [x] FND-013 — Reconciliar síntesis históricas, modelo Opportunity y secuencia MVP-A.

### Decisiones del primer incremento

- [x] FND-006 — Elegir mercado, país y moneda base.
- [ ] FND-007 — Elegir primera fuente autorizada y comprobar acceso/campos. `IN_PROGRESS`
- [x] FND-008 — Elegir stack, persistencia e interfaz inicial mediante ADR.

### Base técnica

- [x] FND-009 — Crear esqueleto ejecutable.
- [x] FND-010 — Crear fixture y perfil canónico parcial para Foundation.
- [x] FND-011 — Configurar formato, pruebas y validación documental.
- [x] FND-012 — Congelar protocolo de benchmark manual.

### MVP-A1 iniciado durante el bloqueo externo

- [x] MI-002 — Construir cohorte comparable explicada.
- [x] MI-003 — Calcular estadística robusta y suficiencia.
- [ ] MI-006 — Persistir históricamente `MarketPriceEstimate`. `IN_PROGRESS`
- [ ] DA-002 / MI-001 — Importación manual append-only e idempotente.

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

- [x] Todos los enlaces internos críticos resuelven.
- [x] No hay contradicciones críticas entre PRD, arquitectura, datos y scoring.
- [ ] Mercado, fuente y stack iniciales tienen ADR aceptado.
- [x] El proyecto se instala/ejecuta con instrucciones reproducibles.
- [x] Los tests básicos y validadores pasan desde un entorno limpio.
- [x] El fixture cubre producto, listing, observación de precio y oportunidad.
- [x] El benchmark manual está definido antes de ejecutar el MVP.
- [ ] El backlog del siguiente sprint cumple Definition of Ready.

## Technical Notes

- No introducir arquitectura distribuida sin evidencia de necesidad.
- Mantener adquisición y reglas de dominio desacopladas.
- Crear lógica de cálculo pura y testeable antes de integrar fuentes reales.
- No almacenar credenciales ni capturas cuyo uso/retención no esté permitido.
- Chile, `CLP` y `America/Santiago` definen el primer mercado; los timestamps se persisten en UTC.
- El primer caso es `RESALE` de un repuesto usado asociado a NK150; los datos Foundation son `DEMO` y no afirman compatibilidad real.
- La ejecución local usa un adaptador DEMO sin red hasta integrar Supabase.
- El dashboard combina el listado operativo A con el detalle analítico B.
- `workspace_id` forma parte de los contratos desde Foundation para evitar una migración transversal posterior.
- El schema `0.1.0` es un perfil Foundation `RESALE + PRODUCT`, no el modelo objetivo completo.
- Market evidence, Commercial Pricing y Maximum Buy son contratos separados.
- Autenticación real/RLS se difieren; `workspace_id` permanece según [[ADR-008]].

## Results

Al inicio del sprint se completó la separación documental y se establecieron contratos lógicos. El 2026-08-18 se preservó la línea base en Git y se aceptaron las decisiones de mercado, adquisición manual, stack, interfaz y aislamiento multiusuario. Se congeló el benchmark manual v0.1.0.

Se creó una aplicación Next.js ejecutable con dashboard A, detalle B, puerto de repositorio y adaptador DEMO. El perfil canónico parcial de Foundation conserva workspace, mercado, fuentes candidatas, ejecuciones de captura, producto, aliases, listings, histórico, observaciones y oportunidad; no sustituye todavía el modelo canónico completo. La estadística actual selecciona el último precio elegible por listing, mercado, workspace y fecha de corte sin mezclar `USED`, `NEW`, `UNKNOWN`, `ASKING` o `SOLD`.

La validación `pnpm check` pasó el 2026-08-18: formato, ESLint, TypeScript, 13 pruebas, 48 archivos Markdown/8 IDs y build Next.js. La navegación `/` → detalle se verificó en navegador local sin errores de consola.

Se investigaron las fuentes candidatas de Chile: Mercado Libre ofrece API oficial, pero la finalidad de inteligencia comercial requiere confirmación contractual escrita; Facebook Marketplace exige permiso escrito expreso para cualquier recolección automatizada. No se habilitó ningún scraper ni conector y [[ADR-003]] se mantiene vigente.

El 2026-08-19 se revisaron tres síntesis históricas del origen de COIE. La reconciliación confirmó el núcleo `DISCOVER → EVALUATE → TEST → MEASURE → SCALE/REJECT/MODIFY` y detectó brechas en Opportunity, Commercial Pricing, Maximum Buy, Seasonality y secuenciación. FND-013 integra [[ADR-006]], [[ADR-007]] y [[ADR-008]] sin modificar el maestro histórico.

La validación `pnpm check` del 2026-08-19 pasó: formato, ESLint, TypeScript, 22 pruebas, 57 archivos Markdown/11 IDs y build Next.js. El shell usa ahora `medianAskingPrice`, muestra la ausencia sin cero y mantiene Quick/Target/Premium, Maximum Buy y liquidez como no calculados.

MVP-A1 comenzó sin cerrar FND-007. La cohorte `comparable-cohort-v0.1.0` elige el último snapshot anterior al corte antes de aplicar condición, tipo de precio, moneda y calidad, evitando reactivar evidencia antigua. `MarketPriceEstimate v0.1.0` expone suficiencia, estimación central nullable, cuartiles/IQR, inputs, cobertura descriptiva y exclusiones; permanece `DEMO` y no constituye Market Value, precio realizable ni recomendación. MI-002 y MI-003 quedan completados; MI-006 sigue en progreso hasta persistir su histórico.

## Problems / Risks

- Mercado Libre Chile y Facebook Marketplace son fuentes candidatas, pero falta comprobar un mecanismo autorizado, términos, campos y retención.
- No existe todavía proyecto Supabase; Foundation utiliza un adaptador DEMO sin credenciales.
- Falta un repuesto/variante NK150 real para ejecutar el benchmark B1.
- El benchmark B0 está `PARTIAL`; faltan moneda alternativa, gates y economía desconocida antes de aprobar su matriz completa.
- Los pesos de scoring son una hipótesis sin calibración real.
- El fixture actual permite estadísticas `ASKING`, pero no Quick Sale, Maximum Buy, liquidez ni economía responsable.
- Sprint 0 no puede cerrarse mientras FND-007 y las puertas asociadas a una fuente real permitida sigan pendientes.

## Decisions

- [[ADR-001]] — Resale Intelligence es un módulo de COIE.
- [[ADR-002]] — Chile y `CLP` son el mercado inicial.
- [[ADR-003]] — La adquisición inicial es carga manual trazable.
- [[ADR-004]] — Next.js, TypeScript, Supabase/PostgreSQL y dashboard A+B.
- [[ADR-005]] — Autenticación y aislamiento mediante workspaces.
- [[ADR-006]] — Opportunity como agregado central y perfil MVP-A Resale.
- [[ADR-007]] — Evidencia de mercado, pricing y máximo de compra separados.
- [[ADR-008]] — Platform Access diferido del primer ciclo comercial.

## Next Actions

1. Comprobar una fuente real permitida para cerrar FND-007.
2. Refinar DA-002, MI-001 y MI-006 para dejar MVP-A1 en Definition of Ready.
3. Persistir importación manual y ejecuciones `MarketPriceEstimate` sin reinterpretar el schema Foundation `0.1.0`.
4. Seleccionar el caso real y ejecutar B1 cuando exista evidencia permitida.
5. Activar Platform Access antes de datos reales multiusuario, no antes del primer ciclo DEMO/manual.

## Review

Pendiente.

## Retrospective

Pendiente; utilizar [[RETROSPECTIVES]].
