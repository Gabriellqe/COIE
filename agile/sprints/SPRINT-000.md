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
- [x] FND-007 — Comprobar el primer mecanismo real permitido, sus campos y retención. `DONE`; aporte manual `MANUAL_ONLY`, no autorización de plataforma.
- [x] FND-008 — Elegir stack, persistencia e interfaz inicial mediante ADR.

### Base técnica

- [x] FND-009 — Crear esqueleto ejecutable.
- [x] FND-010 — Crear fixture y perfil canónico parcial para Foundation.
- [x] FND-011 — Configurar formato, pruebas y validación documental.
- [x] FND-012 — Congelar protocolo de benchmark manual.

### MVP-A1 iniciado durante el bloqueo externo

- [x] MI-002 — Construir cohorte comparable explicada.
- [x] MI-003 — Calcular estadística robusta y suficiencia.
- [x] DA-001 — Contrato `CaptureRun` y recibo de importación versionado.
- [x] DA-002 / MI-001 — Importación manual persistente, append-only e idempotente.
- [x] MI-006 — Persistir históricamente `MarketPriceEstimate` DEMO.

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
- [x] Mercado, mecanismo de adquisición y stack iniciales tienen ADR aceptado.
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

La validación `pnpm check` del 2026-08-19 pasó: formato, ESLint, TypeScript, 33 pruebas, 58 archivos Markdown/12 IDs y build Next.js. El shell usa ahora `medianAskingPrice`, muestra la ausencia sin cero y mantiene Quick/Target/Premium, Maximum Buy y liquidez como no calculados.

MVP-A1 comenzó sin cerrar FND-007. La cohorte `comparable-cohort-v0.1.0` elige el último snapshot anterior al corte antes de aplicar condición, tipo de precio, moneda y calidad, evitando reactivar evidencia antigua. `MarketPriceEstimate v0.1.0` expone suficiencia, estimación central nullable, cuartiles/IQR, inputs, cobertura descriptiva y exclusiones; permanece `DEMO` y no constituye Market Value, precio realizable ni recomendación.

[[ADR-009]] añade el flujo `/market-evidence/new`: valida una carga exclusivamente DEMO, deriva workspace/fuente/método en servidor, registra `CaptureRun`, detecta reintentos/duplicados/conflictos, agrega snapshots y observaciones sin sobrescribir y persiste la estimación resultante. El almacén JSON local se valida completo, serializa escrituras y sobrevive reinicios; DA-001, DA-002, MI-001 y MI-006 quedan completados para el perfil local DEMO.

El 2026-08-19 el usuario aportó una extracción manual autorizada de Facebook Marketplace para kits de arrastre/transmisión NK150. [[ADR-010]] acepta el mecanismo `USER_PROVIDED_MANUAL_EXPORT → MANUAL_USER_ENTRY`, con Facebook sólo como procedencia `MANUAL_ONLY`. Se aislaron localmente 16 listings únicos, se suprimieron dos duplicados y se descartaron las URLs de imágenes. Ninguna fila es comparable todavía: condición, variante y cantidad permanecen desconocidas, y nueve precios son placeholders o anómalos. FND-007 queda completado sin habilitar `DA-003`, scraping ni conectores.

## Problems / Risks

- No existe autorización de plataforma para automatizar Mercado Libre Chile o Facebook Marketplace; sólo está permitido el aporte manual documentado.
- El proyecto Supabase existe y está saludable, pero no tiene schema/Auth/RLS integrados; MVP-A1 continúa con el adaptador local DEMO sin credenciales.
- Existe un caso NK150 real en cuarentena, pero faltan condición, variante, cantidad y precios revisados para ejecutar B1.
- El benchmark B0 está `PARTIAL`; faltan moneda alternativa, gates y economía desconocida antes de aprobar su matriz completa.
- Los pesos de scoring son una hipótesis sin calibración real.
- El fixture actual permite estadísticas `ASKING`, pero no Quick Sale, Maximum Buy, liquidez ni economía responsable.
- Sprint 0 continúa abierto hasta que el backlog del siguiente sprint cumpla Definition of Ready y se realice Review/Retrospective.

## Decisions

- [[ADR-001]] — Resale Intelligence es un módulo de COIE.
- [[ADR-002]] — Chile y `CLP` son el mercado inicial.
- [[ADR-003]] — La adquisición inicial es carga manual trazable.
- [[ADR-004]] — Next.js, TypeScript, Supabase/PostgreSQL y dashboard A+B.
- [[ADR-005]] — Autenticación y aislamiento mediante workspaces.
- [[ADR-006]] — Opportunity como agregado central y perfil MVP-A Resale.
- [[ADR-007]] — Evidencia de mercado, pricing y máximo de compra separados.
- [[ADR-008]] — Platform Access diferido del primer ciclo comercial.
- [[ADR-009]] — Persistencia local DEMO append-only para MVP-A1.
- [[ADR-010]] — Aporte manual real, aislamiento y retención mínima.

## Next Actions

1. Revisar condición, composición, variante, cantidad y precios del caso NK150 en cuarentena.
2. Completar la matriz B0 con gates y economía desconocida.
3. Diseñar DA-004 para correcciones/invalidation append-only antes de promover archivos externos.
4. Ejecutar B1 sólo cuando exista una cohorte real elegible y reproducible.
5. Preparar MVP-A2: PricingRecommendation, Maximum Buy y Economics Core manual.
6. Activar Platform Access antes de datos reales multiusuario y antes de persistir evidencia REAL en Supabase.

## Review

Pendiente.

## Retrospective

Pendiente; utilizar [[RETROSPECTIVES]].
