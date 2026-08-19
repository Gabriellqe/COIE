# Changelog

Los cambios materiales del proyecto se registran por fecha. El documento sigue una estructura inspirada en Keep a Changelog, sin asumir todavía versiones de software publicadas.

## 2026-08-19 — Reconciliación conceptual y MVP-A

### Added

- [[ADR-006]]: Opportunity como agregado central y perfil MVP-A Resale;
- [[ADR-007]]: MarketPriceEstimate, PricingRecommendation y MaximumBuyPrice separados;
- [[ADR-008]]: Platform Access diferido del primer ciclo comercial;
- [[OPPORTUNITY_MODEL]], [[PRICING_MODEL]] y [[SEASONALITY]];
- investigación [[COIE-CONCEPT-RECONCILIATION-2026-08-19]];
- épicas de Commercial Pricing, Seasonality y Product/Catalog Relations;
- historias para Resale Decision, escenarios de venta, máximo de compra, liquidez, relaciones y estacionalidad.
- cohorte comparable A1 con exclusiones explícitas, último snapshot antes del corte y procedencia limitada a inputs usados;
- `MarketPriceEstimate v0.1.0` DEMO con suficiencia, estimación nullable, cuartiles/IQR, cobertura descriptiva e inputs versionados;
- pruebas de cohortes vacías/insuficientes, exclusiones, moneda incompatible y no reactivación de precios antiguos.
- [[ADR-009]] y almacén JSON local DEMO versionado, validado y atómico;
- formulario `/market-evidence/new`, recibos `CaptureRun`, idempotencia y persistencia append-only;
- materialización histórica de `MarketPriceEstimate` y lectura dinámica desde el mismo store.
- [[ADR-010]] y registro minimizado de una captura manual real de Facebook Marketplace para kits NK150;
- política `MANUAL_ONLY`, cuarentena local, deduplicación y retención de 90 días para evidencia aportada por el usuario.

### Changed

- COIE se organiza por `DISCOVER → EVALUATE → TEST → MEASURE → SCALE/REJECT/MODIFY` y cinco preguntas comerciales;
- el primer alcance pasa de `RESALE + REPLENISHMENT` a MVP-A `RESALE`, sin eliminar Replenishment del roadmap;
- el roadmap se reordena en A1 Market Evidence, A2 Resale Decision y A3 Experimentation Lite;
- Economics Core se separa de Sourcing Intelligence completo;
- Experimentation Lite se adelanta para cerrar el primer ciclo;
- Supabase Auth/RLS deja de bloquear MVP-A, manteniendo `workspace_id` y la arquitectura objetivo;
- el shell renombra `medianMarketPrice` a `medianAskingPrice` y deja de mostrar cero por ausencia;
- `TESTING → RESEARCHING` permite resultados inconclusos o reformulación;
- scoring `RESALE` permanece candidato no calibrado; Replenishment queda como perfil futuro.
- el detalle analítico muestra Market Evidence, fecha de corte, inputs y exclusiones sin presentar ASKING como valor realizable.
- FND-007 se cierra como primer mecanismo real permitido de aporte manual; no como autorización de Meta ni de un conector.

### Not implemented

- sujetos Opportunity no-producto;
- Quick/Target/Premium, Maximum Buy, liquidez y economía calculados;
- ProductRelationship, Seasonality, Replenishment, Learning y agentes autónomos;
- Supabase Auth/RLS y conectores reales.
- persistencia Supabase/PostgreSQL, Auth/RLS y operación multiproceso.

### Open

- revisión de condición, variante, cantidad y precios del caso real NK150 en cuarentena;
- B1: caso NK150 real;
- inputs y política para Maximum Buy;
- evidencia de velocidad/liquidez y límites de experimento.

## 2026-08-18 — Sprint 0 en ejecución

### Added

- ADR de mercado Chile/CLP, carga manual, stack web A+B y aislamiento por workspaces;
- `AGENTS.md` con reglas permanentes de trabajo, validación documental y coordinación multiagente;
- historia y épica de autenticación, membresía y aislamiento de datos;
- investigación inicial de Chile y de repuestos usados asociados a NK150;
- protocolo de benchmark manual v0.1.0 con niveles B0 DEMO y B1 real.
- aplicación Next.js/TypeScript ejecutable con dashboard operativo A y detalle analítico B;
- fixture canónico DEMO de NK150 con histórico, segmentación y procedencia;
- puerto de lectura y repositorio DEMO desacoplados de Supabase;
- estadística versionada de comparables actuales mediante último precio por listing;
- configuración de pnpm, Tailwind, Vitest, ESLint, Prettier, TypeScript y CI;
- validador de enlaces Obsidian e IDs documentales.
- investigación fechada de adquisición de datos para Chile: API, costos publicados, límites, retención, cumplimiento y gates de autorización para Mercado Libre y Facebook Marketplace.

### Changed

- el primer caso vertical se define como `RESALE` de un repuesto usado asociado a NK150;
- Mercado Libre Chile y Facebook Marketplace quedan como fuentes candidatas, no como accesos autorizados;
- el modelo incorpora `Workspace`, membresías y `workspace_id`;
- el método inicial de adquisición es carga manual trazable;
- el dashboard principal sigue el concepto A y el detalle el concepto B.
- FND-009, FND-010 y FND-011 pasan validación automatizada y revisión en navegador local.
- FND-007 conserva estado `IN_PROGRESS`: la API de Mercado Libre es candidata, pero falta autorización contractual para la finalidad analítica; Facebook Marketplace no queda autorizado para automatización.

### Open

- primera fuente real con mecanismo permitido y campos comprobados;
- creación e integración del proyecto Supabase;
- pieza/variante NK150 real para ejecutar el benchmark B1;
- calibración de umbrales comerciales y scoring.

## 2026-08-12 — Foundation

### Added

- documentos separados de visión, PRD, arquitectura, datos, agentes, scoring, épicas, backlog, roadmap y contexto;
- especificaciones de tipos de oportunidad y experimentación;
- Sprint 0 con alcance, criterios de salida, riesgos y próximas acciones;
- historias de usuario y Definition of Ready/Done;
- `ProductEcosystem`, compatibilidad, procedencia, histórico y contratos de observación;
- fórmulas iniciales `RESALE` y `REPLENISHMENT` para scoring v0.1.0;
- confianza, cobertura y gates como salidas separadas;
- Decision Log, Research Log, Idea Log, plantillas y fichas de agentes;
- navegación compatible con Obsidian.

### Changed

- el documento maestro pasa a ser fuente histórica; los documentos separados son referencia operativa;
- Resale Intelligence se define como módulo de COIE mediante [[ADR-001]];
- el MVP se limita explícitamente a `RESALE` y `REPLENISHMENT`;
- el riesgo alto se modela con dirección opuesta a los componentes favorables.

### Removed

- ninguno.

### Open

- mercado, país y moneda del primer incremento;
- primera fuente autorizada;
- stack, persistencia e interfaz inicial;
- benchmark y umbrales comerciales.
