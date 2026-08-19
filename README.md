# Commerce Opportunity Intelligence Engine (COIE)

Motor de inteligencia comercial para detectar, analizar, validar y priorizar oportunidades basadas en evidencia.

> Estado: **Sprint 0 — Project Foundation (`IN_PROGRESS`)**
> Fase del producto: **Foundation / reconciliación conceptual con esqueleto ejecutable**

## Propósito

COIE transforma una hipótesis comercial en una `Opportunity` evaluada, probada y aprendida. Organiza el recorrido `DISCOVER → EVALUATE → TEST → MEASURE → SCALE / REJECT / MODIFY` y ayuda a responder qué vender, si vale la pena, dónde comprar, cómo vender y si conviene continuar.

## Alcance inicial — MVP-A Resale Decision

El primer vertical implementa únicamente:

- estrategia `RESALE`;
- sujeto efectivo `PRODUCT` respaldado por publicaciones;
- evidencia de mercado, decisión de reventa y Experimentation Lite por incrementos.

`REPLENISHMENT`, sourcing completo, nichos, catálogo, bundles, estacionalidad y learning permanecen en el roadmap, no en el perfil ejecutable actual.

El primer caso vertical usa Chile, `CLP` y un repuesto usado asociado a NK150 con datos totalmente sintéticos. Mercado Libre Chile y Facebook Marketplace son fuentes candidatas; no existe todavía un conector autorizado.

## Aplicación local

El Sprint 0 incluye un shell web A+B:

- dashboard operativo A en `/`;
- detalle analítico B en `/opportunities/opportunity-demo-001`;
- formulario de carga manual DEMO en `/market-evidence/new`;
- fixture canónico DEMO sin credenciales ni red;
- Market Evidence DEMO con cohorte explicada, suficiencia, IQR, inputs y exclusiones;
- persistencia local append-only en `.data/demo-evidence.json`;
- validación de contratos, documentación y build.

El shell materializa y conserva históricamente un `MarketPriceEstimate` DEMO `USED/ASKING/CLP`; no lo presenta como valor realizable y todavía no calcula Quick/Target/Premium, Maximum Buy, liquidez, economía ni score calibrado. El almacén local sobrevive reinicios, pero no es apto para Vercel, multiproceso ni datos reales.

### Requisitos

- Node.js 24 o superior;
- pnpm 11.19.0.

### Ejecutar

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Abrir `http://localhost:3000`.

### Validar

```powershell
pnpm check
```

El comando ejecuta formato, lint, tipos, pruebas, enlaces documentales y build de producción. Sprint 0 funciona sin Supabase; el proyecto remoto existe, pero su integración se difiere hasta activar Auth/RLS.

## Documentación principal

- [[PRODUCT_VISION]] — visión, principios y métricas de éxito.
- [[PRD]] — requisitos del MVP y criterios de aceptación.
- [[ROADMAP]] — fases, resultados y puertas de avance.
- [[BACKLOG]] — trabajo priorizado y trazable.
- [[CONTEXT]] — contexto operativo para Codex y colaboradores.
- [[AGENTS]] — reglas permanentes para Codex y subagentes.
- [[SYSTEM_ARCHITECTURE]] — límites, componentes y flujo del sistema.
- [[DATA_MODEL]] — entidades, relaciones y reglas de datos.
- [[AGENT_ARCHITECTURE]] — responsabilidades y contratos de agentes.
- [[SCORING_MODEL]] — scores, fórmula inicial y explicabilidad.
- [[OPPORTUNITY_MODEL]] — strategy, subject y ciclo de decisión.
- [[PRICING_MODEL]] — market evidence, pricing y maximum buy.
- [[SEASONALITY]] — timing futuro y puerta de activación.
- [[EPICS]] — épicas del producto.
- [[USER_STORIES]] — historias iniciales y aceptación.
- [[SPRINTS]] — índice y reglas de sprints.

## Estructura

```text
.
├── README.md
├── Commerce_Opportunity_Intelligence_Engine_MASTER.md
├── PRODUCT_VISION.md
├── PRD.md
├── ROADMAP.md
├── BACKLOG.md
├── CONTEXT.md
├── AGENTS.md
├── package.json
├── src/
├── fixtures/
├── tests/
├── scripts/
├── docs/
│   ├── architecture/
│   ├── product/
│   ├── research/
│   └── decisions/
├── agile/
│   └── sprints/
├── agents/
├── experiments/
├── ideas/
└── changelog/
```

## Forma de trabajo

1. Registrar una idea antes de incorporarla al alcance.
2. Clasificarla como `Idea`, `Research`, `Decision`, `Epic`, `Feature`, `User Story`, `Experiment` o `Architecture`.
3. Vincular toda tarea a una historia o a una actividad explícita del Sprint 0.
4. Exigir procedencia y fecha a toda evidencia externa.
5. Probar con poco capital antes de escalar.
6. Registrar predicción y resultado para cerrar el ciclo de aprendizaje.

## Principios

- **Evidence before inventory**.
- **Test before scale**.
- **Capital efficiency**.
- **Data accumulation**.
- **Explainable recommendations**.
- **Modular architecture**.

## Fuente

El archivo [[Commerce_Opportunity_Intelligence_Engine_MASTER]] conserva el planteamiento original. Los documentos separados son la referencia operativa y deben actualizarse junto con [[CHANGELOG]] cuando una decisión cambie el producto.
