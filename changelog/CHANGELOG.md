# Changelog

Los cambios materiales del proyecto se registran por fecha. El documento sigue una estructura inspirada en Keep a Changelog, sin asumir todavía versiones de software publicadas.

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

### Changed

- el primer caso vertical se define como `RESALE` de un repuesto usado asociado a NK150;
- Mercado Libre Chile y Facebook Marketplace quedan como fuentes candidatas, no como accesos autorizados;
- el modelo incorpora `Workspace`, membresías y `workspace_id`;
- el método inicial de adquisición es carga manual trazable;
- el dashboard principal sigue el concepto A y el detalle el concepto B.
- FND-009, FND-010 y FND-011 pasan validación automatizada y revisión en navegador local.

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
